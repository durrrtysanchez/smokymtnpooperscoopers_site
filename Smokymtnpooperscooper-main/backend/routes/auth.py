from fastapi import APIRouter, HTTPException, status, Response, Request, Header
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.user import User, UserSession
from datetime import datetime, timezone, timedelta
from typing import Optional
import logging
import httpx
import uuid

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["auth"])


def get_auth_router(db: AsyncIOMotorDatabase) -> APIRouter:
    
    async def get_session_token(request: Request, authorization: Optional[str] = Header(None)) -> Optional[str]:
        """Get session token from cookie (preferred) or Authorization header (fallback)"""
        # Check cookie first
        session_token = request.cookies.get("session_token")
        if session_token:
            return session_token
        
        # Fallback to Authorization header
        if authorization and authorization.startswith("Bearer "):
            return authorization.replace("Bearer ", "")
        
        return None

    async def get_current_user(request: Request, authorization: Optional[str] = Header(None)) -> User:
        """Authenticate user from session token"""
        session_token = await get_session_token(request, authorization)
        
        if not session_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated"
            )
        
        # Find session in database
        session_doc = await db.user_sessions.find_one(
            {"session_token": session_token},
            {"_id": 0}
        )
        
        if not session_doc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid session"
            )
        
        # Check expiry with timezone awareness
        expires_at = session_doc["expires_at"]
        if isinstance(expires_at, str):
            expires_at = datetime.fromisoformat(expires_at)
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        
        if expires_at < datetime.now(timezone.utc):
            # Delete expired session
            await db.user_sessions.delete_one({"session_token": session_token})
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session expired"
            )
        
        # Get user data
        user_doc = await db.users.find_one(
            {"user_id": session_doc["user_id"]},
            {"_id": 0}
        )
        
        if not user_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return User(**user_doc)

    @router.post("/session")
    async def create_session(request: dict, response: Response):
        """
        Exchange session_id for session_token and user data
        Frontend calls this with session_id from URL fragment
        """
        try:
            session_id = request.get("session_id")
            
            if not session_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="session_id is required"
                )
            
            # Call Emergent Auth to get user data and session token
            async with httpx.AsyncClient() as client:
                auth_response = await client.get(
                    "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                    headers={"X-Session-ID": session_id},
                    timeout=10.0
                )
            
            if auth_response.status_code != 200:
                logger.error(f"Emergent Auth error: {auth_response.status_code} - {auth_response.text}")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid session_id"
                )
            
            auth_data = auth_response.json()
            session_token = auth_data.get("session_token")
            
            # Check if user exists by email
            existing_user = await db.users.find_one(
                {"email": auth_data["email"]},
                {"_id": 0}
            )
            
            if existing_user:
                # Update existing user data
                user_id = existing_user["user_id"]
                await db.users.update_one(
                    {"user_id": user_id},
                    {"$set": {
                        "name": auth_data.get("name", existing_user.get("name")),
                        "picture": auth_data.get("picture", existing_user.get("picture"))
                    }}
                )
                user = User(**existing_user)
            else:
                # Create new user
                user = User(
                    email=auth_data["email"],
                    name=auth_data.get("name", ""),
                    picture=auth_data.get("picture")
                )
                await db.users.insert_one(user.dict())
                user_id = user.user_id
            
            # Create session with 7-day expiry
            expires_at = datetime.now(timezone.utc) + timedelta(days=7)
            user_session = UserSession(
                user_id=user_id,
                session_token=session_token,
                expires_at=expires_at
            )
            
            # Delete any existing sessions for this user
            await db.user_sessions.delete_many({"user_id": user_id})
            
            # Store new session
            await db.user_sessions.insert_one(user_session.dict())
            
            # Set httpOnly cookie
            response.set_cookie(
                key="session_token",
                value=session_token,
                httponly=True,
                secure=True,
                samesite="none",
                path="/",
                max_age=7*24*60*60  # 7 days in seconds
            )
            
            logger.info(f"User authenticated: {user.email}")
            
            return {
                "success": True,
                "user": user.dict()
            }
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Session creation error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create session"
            )

    @router.get("/me")
    async def get_me(request: Request, authorization: Optional[str] = Header(None)):
        """
        Get current authenticated user
        Checks session token from cookie or Authorization header
        """
        user = await get_current_user(request, authorization)
        return user.dict()

    @router.post("/logout")
    async def logout(request: Request, response: Response, authorization: Optional[str] = Header(None)):
        """
        Logout user and clear session
        """
        try:
            session_token = await get_session_token(request, authorization)
            
            if session_token:
                # Delete session from database
                await db.user_sessions.delete_one({"session_token": session_token})
            
            # Clear cookie
            response.delete_cookie(
                key="session_token",
                path="/",
                secure=True,
                samesite="none"
            )
            
            return {"success": True, "message": "Logged out successfully"}
            
        except Exception as e:
            logger.error(f"Logout error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to logout"
            )

    return router

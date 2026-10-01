from fastapi import APIRouter, HTTPException, status
from models.contact import Contact, ContactCreate
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])


def get_contact_router(db: AsyncIOMotorDatabase) -> APIRouter:
    @router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
    async def create_contact(contact_data: ContactCreate):
        """
        Create a new contact form submission
        """
        try:
            # Create Contact object with generated ID and timestamp
            contact = Contact(**contact_data.dict())
            
            # Insert into database
            result = await db.contacts.insert_one(contact.dict())
            
            if result.inserted_id:
                logger.info(f"Contact submission created: {contact.id}")
                return {
                    "success": True,
                    "message": "Thank you! We'll contact you within 24 hours.",
                    "id": contact.id
                }
            else:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to save contact submission"
                )
                
        except Exception as e:
            logger.error(f"Error creating contact: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while processing your submission"
            )

    @router.get("/", response_model=dict)
    async def get_contacts():
        """
        Retrieve all contact submissions (for admin use)
        """
        try:
            # Fetch only required fields with limit for better performance
            contacts = await db.contacts.find(
                {},
                {"_id": 1, "id": 1, "name": 1, "email": 1, "phone": 1, "message": 1, "createdAt": 1}
            ).sort("createdAt", -1).limit(100).to_list(100)
            
            # Convert ObjectId to string for JSON serialization
            for contact in contacts:
                contact['_id'] = str(contact['_id'])
            
            return {
                "success": True,
                "contacts": contacts
            }
            
        except Exception as e:
            logger.error(f"Error retrieving contacts: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve contacts"
            )

    return router

# API Contracts - Smoky Mountain Pooper Scoopers Landing Page

## Current Mock Data in Frontend

### Static Display Data (No Backend Needed)
- `testimonials` - Customer reviews (static content)
- `faqs` - Frequently asked questions (static content)
- `services` - Service plans and pricing (static content)
- `stats` - Business statistics (static content)

These remain in `mock.js` as they are display-only content.

## Backend Implementation Required

### Contact Form Submissions

**Current Mock Behavior (Landing.jsx line ~330):**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Mock form submission
  toast.success('Thank you! We\'ll contact you within 24 hours.');
  setFormData({ name: '', email: '', phone: '', message: '' });
};
```

**New Backend Integration:**

#### API Endpoint: POST /api/contact
**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "message": "string (required)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you! We'll contact you within 24 hours.",
  "id": "submission_id"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message description"
}
```

#### API Endpoint: GET /api/contacts
For future admin panel to view submissions.

**Success Response (200):**
```json
{
  "success": true,
  "contacts": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "message": "string",
      "createdAt": "ISO date string"
    }
  ]
}
```

## MongoDB Schema

### Contact Model
```python
{
  "id": "auto-generated uuid",
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string",
  "createdAt": "datetime"
}
```

Collection name: `contacts`

## Frontend Changes Required

### File: /app/frontend/src/pages/Landing.jsx

**Update handleSubmit function:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    
    if (response.data.success) {
      toast.success(response.data.message);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
  }
};
```

**Add API constant at top of component:**
```javascript
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
```

## Backend Files to Create/Modify

1. **Create:** `/app/backend/models/contact.py` - Contact model definition
2. **Create:** `/app/backend/routes/contact.py` - Contact API routes
3. **Modify:** `/app/backend/server.py` - Include contact routes

## Implementation Steps

1. ✅ Create contracts.md (this file)
2. Create Contact model in backend
3. Create contact API routes (POST and GET)
4. Register routes in server.py
5. Update frontend to call real API
6. Test contact form submission
7. Verify data is saved to MongoDB

## Notes

- Email validation required on backend
- Consider adding rate limiting for contact form submissions
- Future enhancement: Email notifications when form is submitted

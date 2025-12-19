"""
Contact API Routes

PUBLIC endpoints for contact form submissions.
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.contact_service import ContactService
from app.schemas.contact import ContactCreate, ContactSubmissionResponse
from app.schemas.common import MessageResponse

router = APIRouter()


@router.post("/submit", response_model=ContactSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(
    data: ContactCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Submit contact form.
    
    This endpoint handles general inquiries, partnership requests, etc.
    
    The submission will be:
    1. Validated for required fields
    2. Checked for spam indicators
    3. Saved to database
    4. Trigger notification to admin (future)
    """
    service = ContactService(db)
    
    # Get request metadata
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    referrer = request.headers.get("referer")
    
    # Check rate limit
    if ip_address and not service.check_rate_limit(ip_address):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions. Please try again later."
        )
    
    try:
        contact = service.create_contact(
            data=data,
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer
        )
        
        # Check if marked as spam
        if contact.is_spam:
            # Still return success to not reveal spam detection
            return ContactSubmissionResponse(
                success=True,
                message="Thank you for your message. We will review it and get back to you soon."
            )
        
        return ContactSubmissionResponse(
            success=True,
            message="Thank you for reaching out! We will respond within 24-48 hours."
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact form. Please try again."
        )


@router.get("/types")
def get_contact_types():
    """
    Get available contact types.
    
    Returns list of inquiry types for the contact form.
    """
    return {
        "contact_types": [
            {
                "id": "general",
                "name": "General Inquiry",
                "description": "General questions about our services"
            },
            {
                "id": "audit_request",
                "name": "Audit Request",
                "description": "Request for AI/ML system audit"
            },
            {
                "id": "partnership",
                "name": "Partnership",
                "description": "Partnership and collaboration opportunities"
            },
            {
                "id": "employment",
                "name": "Employment",
                "description": "Career and job opportunities"
            },
            {
                "id": "press",
                "name": "Press/Media",
                "description": "Press and media inquiries"
            }
        ]
    }

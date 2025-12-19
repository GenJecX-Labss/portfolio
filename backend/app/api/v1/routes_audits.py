"""
Audit Request API Routes

PUBLIC endpoints for audit/review service requests.
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.audit_service import AuditService
from app.schemas.audit import (
    AuditRequestCreate,
    AuditRequestPublicResponse,
    AuditRequestSubmissionResponse
)
from app.schemas.common import MessageResponse

router = APIRouter()


@router.post("/request", response_model=AuditRequestSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_audit_request(
    data: AuditRequestCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Submit a new audit request.
    
    This is the main CTA endpoint for clients requesting an audit.
    
    The request will be:
    1. Validated for required fields
    2. Scored for lead qualification
    3. Saved to database
    4. Trigger notification to admin (future)
    """
    service = AuditService(db)
    
    # Get request metadata
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    referrer = request.headers.get("referer")
    
    # Check rate limit
    if ip_address and not service.check_rate_limit(ip_address):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later."
        )
    
    try:
        audit_request = service.create_audit_request(
            data=data,
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer
        )
        
        return AuditRequestSubmissionResponse(
            success=True,
            message="Your audit request has been submitted successfully. We will review it and get back to you within 24-48 hours.",
            request_id=audit_request.id
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit audit request. Please try again."
        )


@router.get("/types")
def get_audit_types():
    """
    Get available audit types.
    
    Returns list of audit services offered.
    """
    return {
        "audit_types": [
            {
                "id": "ml_model_review",
                "name": "ML Model Review",
                "description": "Comprehensive review of your machine learning models for accuracy, bias, and performance."
            },
            {
                "id": "architecture_review",
                "name": "Architecture Review",
                "description": "Analysis of your AI/ML system architecture for scalability, reliability, and best practices."
            },
            {
                "id": "code_review",
                "name": "Code Review",
                "description": "In-depth review of your AI/ML codebase for quality, maintainability, and efficiency."
            },
            {
                "id": "performance_audit",
                "name": "Performance Audit",
                "description": "Performance analysis and optimization recommendations for your AI systems."
            },
            {
                "id": "security_audit",
                "name": "Security Audit",
                "description": "Security assessment of your ML pipelines and model deployment."
            },
            {
                "id": "custom",
                "name": "Custom Audit",
                "description": "Tailored audit based on your specific requirements."
            }
        ]
    }


@router.get("/check-status/{request_id}", response_model=AuditRequestPublicResponse)
def check_request_status(
    request_id: int,
    email: str,
    db: Session = Depends(get_db)
):
    """
    Check status of an audit request.
    
    Requires matching email for verification.
    """
    service = AuditService(db)
    audit_request = service.get_audit_request(request_id)
    
    if not audit_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Audit request not found"
        )
    
    # Verify email matches
    if audit_request.contact_email.lower() != email.lower():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email does not match request"
        )
    
    return AuditRequestPublicResponse.model_validate(audit_request, from_attributes=True)

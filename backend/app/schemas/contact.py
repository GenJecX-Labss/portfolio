"""
Contact Schemas

Pydantic models for contact form API.
"""

from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

from app.core.constants import ContactType, ContactStatus


class ContactBase(BaseModel):
    """Base contact schema"""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    company: Optional[str] = Field(None, max_length=200)
    contact_type: ContactType
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactCreate(ContactBase):
    """Schema for creating contact submission"""
    pass


class ContactUpdate(BaseModel):
    """Schema for updating contact (admin only)"""
    status: Optional[ContactStatus] = None
    internal_notes: Optional[str] = None
    assigned_to: Optional[str] = None


class ContactResponse(ContactBase):
    """Full contact response (admin)"""
    id: int
    status: ContactStatus
    internal_notes: Optional[str] = None
    assigned_to: Optional[str] = None
    responded_at: Optional[datetime] = None
    ip_address: Optional[str] = None
    spam_score: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ContactSubmissionResponse(BaseModel):
    """Response after submitting contact form"""
    success: bool
    message: str


class ContactStats(BaseModel):
    """Contact statistics"""
    total_contacts: int
    new_count: int
    read_count: int
    responded_count: int
    spam_count: int
    avg_response_time_hours: Optional[float] = None

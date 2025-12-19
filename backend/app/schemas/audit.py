"""
Audit Request Schemas

Pydantic models for audit request API.
"""

from typing import List, Optional
from pydantic import BaseModel, Field, EmailStr, HttpUrl
from datetime import datetime

from app.core.constants import AuditRequestStatus, AuditType, AuditPriority


class AuditRequestBase(BaseModel):
    """Base audit request schema"""
    company_name: str = Field(..., min_length=1, max_length=200)
    contact_name: str = Field(..., min_length=1, max_length=100)
    contact_email: EmailStr
    contact_phone: Optional[str] = Field(None, max_length=50)
    company_website: Optional[str] = Field(None, max_length=500)
    
    audit_type: AuditType
    project_description: str = Field(..., min_length=50, max_length=5000)
    current_challenges: Optional[str] = Field(None, max_length=2000)
    desired_outcomes: Optional[str] = Field(None, max_length=2000)
    
    tech_stack: List[str] = Field(default_factory=list)
    team_size: Optional[int] = Field(None, ge=1)
    project_stage: Optional[str] = Field(None, max_length=100)
    
    preferred_timeline: Optional[str] = Field(None, max_length=100)
    budget_range: Optional[str] = Field(None, max_length=100)
    urgency_notes: Optional[str] = Field(None, max_length=500)


class AuditRequestCreate(AuditRequestBase):
    """Schema for creating audit request"""
    pass


class AuditRequestUpdate(BaseModel):
    """Schema for updating audit request (admin only)"""
    status: Optional[AuditRequestStatus] = None
    priority: Optional[AuditPriority] = None
    internal_notes: Optional[str] = None
    qualification_score: Optional[int] = Field(None, ge=0, le=100)
    assigned_to: Optional[str] = None
    scheduled_date: Optional[datetime] = None


class AuditRequestResponse(AuditRequestBase):
    """Full audit request response (admin)"""
    id: int
    status: AuditRequestStatus
    priority: AuditPriority
    internal_notes: Optional[str] = None
    qualification_score: Optional[int] = None
    assigned_to: Optional[str] = None
    ip_address: Optional[str] = None
    scheduled_date: Optional[datetime] = None
    completed_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class AuditRequestPublicResponse(BaseModel):
    """Public audit request response (limited fields)"""
    id: int
    company_name: str
    audit_type: AuditType
    status: AuditRequestStatus
    created_at: datetime
    scheduled_date: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class AuditRequestSubmissionResponse(BaseModel):
    """Response after submitting audit request"""
    success: bool
    message: str
    request_id: Optional[int] = None


class AuditRequestStats(BaseModel):
    """Audit request statistics"""
    total_requests: int
    pending_count: int
    qualified_count: int
    scheduled_count: int
    completed_count: int
    rejected_count: int
    avg_qualification_score: Optional[float] = None
    conversion_rate: Optional[float] = None

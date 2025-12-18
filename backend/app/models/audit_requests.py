"""
Audit Request Model

Represents client audit/review requests.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLEnum, JSON
from sqlalchemy.sql import func

from app.core.database import Base
from app.core.constants import AuditRequestStatus, AuditType, AuditPriority


class AuditRequest(Base):
    """
    Audit request model.
    
    Captures client inquiries for ML/AI system audits and reviews.
    """
    __tablename__ = "audit_requests"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Client Information
    company_name = Column(String(200), nullable=False)
    contact_name = Column(String(100), nullable=False)
    contact_email = Column(String(255), nullable=False, index=True)
    contact_phone = Column(String(50), nullable=True)
    company_website = Column(String(500), nullable=True)
    
    # Audit Details
    audit_type = Column(SQLEnum(AuditType), nullable=False, index=True)
    priority = Column(
        SQLEnum(AuditPriority),
        default=AuditPriority.MEDIUM,
        nullable=False,
        index=True
    )
    status = Column(
        SQLEnum(AuditRequestStatus),
        default=AuditRequestStatus.PENDING,
        nullable=False,
        index=True
    )
    
    # Project Description
    project_description = Column(Text, nullable=False)
    current_challenges = Column(Text, nullable=True)
    desired_outcomes = Column(Text, nullable=True)
    
    # Technical Context
    tech_stack = Column(JSON, default=list)  # Technologies being used
    team_size = Column(Integer, nullable=True)
    project_stage = Column(String(100), nullable=True)  # e.g., "prototype", "production"
    
    # Timeline & Budget
    preferred_timeline = Column(String(100), nullable=True)
    budget_range = Column(String(100), nullable=True)
    urgency_notes = Column(Text, nullable=True)
    
    # Internal Notes
    internal_notes = Column(Text, nullable=True)  # Admin-only notes
    qualification_score = Column(Integer, nullable=True)  # Lead scoring
    assigned_to = Column(String(100), nullable=True)  # Team member assigned
    
    # Tracking
    ip_address = Column(String(45), nullable=True)  # IPv4 or IPv6
    user_agent = Column(String(500), nullable=True)
    referrer = Column(String(500), nullable=True)
    
    # Dates
    scheduled_date = Column(DateTime, nullable=True)
    completed_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<AuditRequest(id={self.id}, company='{self.company_name}', status='{self.status}')>"
    
    @property
    def is_qualified(self) -> bool:
        """Check if lead is qualified"""
        return self.status in [
            AuditRequestStatus.QUALIFIED,
            AuditRequestStatus.SCHEDULED,
            AuditRequestStatus.IN_PROGRESS
        ]
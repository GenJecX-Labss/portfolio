"""
Audit Request Service

Business logic for audit request management and lead qualification.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime

from app.repositories.audit_repo import AuditRequestRepository
from app.models.audit_requests import AuditRequest
from app.schemas.audit import AuditRequestCreate, AuditRequestUpdate, AuditRequestStats
from app.core.constants import AuditRequestStatus, AuditPriority
from app.workflows.audit_workflow import AuditWorkflow


class AuditService:
    """
    Audit request business logic.
    
    Business rules:
    - Lead qualification scoring
    - Rate limiting by IP
    - Priority assignment
    - Status transitions
    """
    
    def __init__(self, db: Session):
        self.repo = AuditRequestRepository(db)
        self.workflow = AuditWorkflow(db)
        self.db = db
    
    def create_audit_request(
        self,
        data: AuditRequestCreate,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None
    ) -> AuditRequest:
        """
        Create new audit request with automatic qualification.
        
        Business rules:
        - Automatically qualify based on scoring
        - Assign priority based on qualification
        - Track submission metadata
        """
        # Create audit request
        audit_request = AuditRequest(**data.dict())
        audit_request.ip_address = ip_address
        audit_request.user_agent = user_agent
        audit_request.referrer = referrer
        audit_request.status = AuditRequestStatus.PENDING
        audit_request.priority = AuditPriority.MEDIUM
        
        # Save first
        audit_request = self.repo.create(audit_request)
        
        # Run qualification workflow
        self.workflow.qualify_lead(audit_request)
        self.db.commit()
        
        return audit_request
    
    def check_rate_limit(self, ip_address: str, hours: int = 24) -> bool:
        """
        Check if IP has exceeded rate limit.
        
        Business rule: Maximum 3 audit requests per 24 hours per IP.
        """
        recent_requests = self.repo.get_recent_by_ip(ip_address, hours)
        return len(recent_requests) < 3
    
    def get_audit_request(self, audit_id: int) -> Optional[AuditRequest]:
        """Get single audit request"""
        return self.repo.get_by_id(audit_id)
    
    def get_all_requests(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[AuditRequestStatus] = None,
        priority: Optional[AuditPriority] = None
    ) -> List[AuditRequest]:
        """Get all audit requests with filters"""
        return self.repo.get_all(skip, limit, status, priority)
    
    def get_pending_requests(self, limit: int = 50) -> List[AuditRequest]:
        """Get pending requests for review"""
        return self.repo.get_pending(limit)
    
    def get_qualified_requests(self, limit: int = 50) -> List[AuditRequest]:
        """Get qualified leads"""
        return self.repo.get_qualified(limit)
    
    def update_audit_request(
        self,
        audit_id: int,
        data: AuditRequestUpdate
    ) -> Optional[AuditRequest]:
        """Update audit request (admin only)"""
        audit_request = self.repo.get_by_id(audit_id)
        if not audit_request:
            return None
        
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(audit_request, field, value)
        
        return self.repo.update(audit_request)
    
    def qualify_request(self, audit_id: int) -> Optional[AuditRequest]:
        """
        Manually qualify an audit request.
        
        Business rule: Move from pending to qualified.
        """
        audit_request = self.repo.get_by_id(audit_id)
        if not audit_request:
            return None
        
        audit_request.status = AuditRequestStatus.QUALIFIED
        if not audit_request.qualification_score:
            # Run automatic qualification
            self.workflow.qualify_lead(audit_request)
        
        return self.repo.update(audit_request)
    
    def reject_request(
        self,
        audit_id: int,
        reason: Optional[str] = None
    ) -> Optional[AuditRequest]:
        """Reject an audit request"""
        audit_request = self.repo.get_by_id(audit_id)
        if not audit_request:
            return None
        
        audit_request.status = AuditRequestStatus.REJECTED
        if reason:
            audit_request.internal_notes = (
                f"{audit_request.internal_notes or ''}\n\nRejection reason: {reason}"
            )
        
        return self.repo.update(audit_request)
    
    def schedule_audit(
        self,
        audit_id: int,
        scheduled_date: datetime,
        assigned_to: Optional[str] = None
    ) -> Optional[AuditRequest]:
        """
        Schedule an audit.
        
        Business rule: Only qualified requests can be scheduled.
        """
        audit_request = self.repo.get_by_id(audit_id)
        if not audit_request:
            return None
        
        if audit_request.status != AuditRequestStatus.QUALIFIED:
            return None
        
        self.workflow.schedule_audit(audit_request, scheduled_date)
        
        if assigned_to:
            audit_request.assigned_to = assigned_to
        
        return self.repo.update(audit_request)
    
    def mark_in_progress(self, audit_id: int) -> Optional[AuditRequest]:
        """Mark audit as in progress"""
        audit_request = self.repo.get_by_id(audit_id)
        if not audit_request:
            return None
        
        if audit_request.status == AuditRequestStatus.SCHEDULED:
            audit_request.status = AuditRequestStatus.IN_PROGRESS
            return self.repo.update(audit_request)
        
        return audit_request
    
    def complete_audit(self, audit_id: int) -> Optional[AuditRequest]:
        """Mark audit as completed"""
        audit_request = self.repo.get_by_id(audit_id)
        if not audit_request:
            return None
        
        audit_request.status = AuditRequestStatus.COMPLETED
        audit_request.completed_date = datetime.utcnow()
        
        return self.repo.update(audit_request)
    
    def get_statistics(self) -> AuditRequestStats:
        """
        Get audit request statistics.
        
        Business intelligence for dashboard.
        """
        status_counts = self.repo.count_by_status()
        avg_score = self.repo.get_avg_qualification_score()
        
        return AuditRequestStats(
            total_requests=sum(status_counts.values()),
            pending_count=status_counts.get(AuditRequestStatus.PENDING, 0),
            qualified_count=status_counts.get(AuditRequestStatus.QUALIFIED, 0),
            scheduled_count=status_counts.get(AuditRequestStatus.SCHEDULED, 0),
            completed_count=status_counts.get(AuditRequestStatus.COMPLETED, 0),
            rejected_count=status_counts.get(AuditRequestStatus.REJECTED, 0),
            avg_qualification_score=avg_score
        )
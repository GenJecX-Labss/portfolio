"""
Audit Request Repository

Data access layer for audit/review requests.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, desc
from datetime import datetime, timedelta

from app.models.audit_requests import AuditRequest
from app.core.constants import AuditRequestStatus, AuditPriority


class AuditRequestRepository:
    """Audit request data access layer - NO business logic"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, audit_id: int) -> Optional[AuditRequest]:
        """Get audit request by ID"""
        return self.db.query(AuditRequest).filter(AuditRequest.id == audit_id).first()
    
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[AuditRequestStatus] = None,
        priority: Optional[AuditPriority] = None
    ) -> List[AuditRequest]:
        """Get all audit requests with optional filters"""
        query = self.db.query(AuditRequest)
        
        if status:
            query = query.filter(AuditRequest.status == status)
        
        if priority:
            query = query.filter(AuditRequest.priority == priority)
        
        return query.order_by(desc(AuditRequest.created_at)).offset(skip).limit(limit).all()
    
    def get_pending(self, limit: int = 50) -> List[AuditRequest]:
        """Get pending requests"""
        return self.db.query(AuditRequest).filter(
            AuditRequest.status == AuditRequestStatus.PENDING
        ).order_by(desc(AuditRequest.created_at)).limit(limit).all()
    
    def get_qualified(self, limit: int = 50) -> List[AuditRequest]:
        """Get qualified requests"""
        return self.db.query(AuditRequest).filter(
            AuditRequest.status == AuditRequestStatus.QUALIFIED
        ).order_by(desc(AuditRequest.created_at)).limit(limit).all()
    
    def get_recent_by_ip(self, ip_address: str, hours: int = 24) -> List[AuditRequest]:
        """Get recent requests from IP for rate limiting"""
        cutoff_time = datetime.utcnow() - timedelta(hours=hours)
        
        return self.db.query(AuditRequest).filter(
            and_(
                AuditRequest.ip_address == ip_address,
                AuditRequest.created_at >= cutoff_time
            )
        ).all()
    
    def count_pending(self) -> int:
        """Count pending requests"""
        return self.db.query(AuditRequest).filter(
            AuditRequest.status == AuditRequestStatus.PENDING
        ).count()
    
    def count_by_status(self, status: AuditRequestStatus) -> int:
        """Count requests by status"""
        return self.db.query(AuditRequest).filter(
            AuditRequest.status == status
        ).count()
    
    def count_by_status(self) -> dict:
        """Count requests by all statuses"""
        from sqlalchemy import func
        
        results = self.db.query(
            AuditRequest.status,
            func.count(AuditRequest.id)
        ).group_by(AuditRequest.status).all()
        
        return {status: count for status, count in results}
    
    def get_avg_qualification_score(self) -> Optional[float]:
        """Get average qualification score"""
        from sqlalchemy import func
        
        result = self.db.query(
            func.avg(AuditRequest.qualification_score)
        ).filter(
            AuditRequest.qualification_score.isnot(None)
        ).scalar()
        
        return result

    
    def update(self, audit_request: AuditRequest) -> AuditRequest:
        """Update existing audit request"""
        self.db.commit()
        self.db.refresh(audit_request)
        return audit_request
    
    def delete(self, audit_request: AuditRequest):
        """Delete audit request"""
        self.db.delete(audit_request)
        self.db.commit()

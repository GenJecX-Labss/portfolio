"""
Audit Request Workflow

Multi-step business process for handling audit requests.
"""

from sqlalchemy.orm import Session
from datetime import datetime

from app.models.audit_request import AuditRequest
from app.core.constants import AuditRequestStatus, AuditPriority
from app.core.logging import get_logger

logger = get_logger(__name__)


class AuditWorkflow:
    """
    Audit request lifecycle management.
    
    Handles:
    - Lead qualification
    - Priority assignment
    - Status transitions
    - Scheduling
    """
    
    def __init__(self, db: Session):
        self.db = db
    
    def qualify_lead(self, audit_request: AuditRequest) -> bool:
        """
        Determine if audit request should be qualified.
        
        Business rules:
        - Score based on multiple factors
        - Auto-qualify if score >= 5
        - Assign priority based on score
        
        Returns:
            True if qualified, False otherwise
        """
        score = 0
        
        # Company website provided (+2 points)
        if audit_request.company_website:
            score += 2
        
        # Budget range specified (+2 points)
        if audit_request.budget_range:
            score += 2
        
        # Detailed project description (+1 point)
        if len(audit_request.project_description) > 200:
            score += 1
        
        # Team size indicates established company (+2 points)
        if audit_request.team_size and audit_request.team_size > 5:
            score += 2
        
        # Tech stack provided shows preparation (+1 point)
        if audit_request.tech_stack and len(audit_request.tech_stack) > 0:
            score += 1
        
        # Specific timeline indicates seriousness (+1 point)
        if audit_request.preferred_timeline:
            score += 1
        
        # Challenges described shows thoughtfulness (+1 point)
        if audit_request.current_challenges and len(audit_request.current_challenges) > 100:
            score += 1
        
        # Save qualification score
        audit_request.qualification_score = score
        
        # Auto-qualify based on score
        if score >= 5:
            audit_request.status = AuditRequestStatus.QUALIFIED
            
            # Assign priority
            if score >= 8:
                audit_request.priority = AuditPriority.HIGH
            elif score >= 6:
                audit_request.priority = AuditPriority.MEDIUM
            else:
                audit_request.priority = AuditPriority.LOW
            
            logger.info(
                "audit_request_auto_qualified",
                audit_id=audit_request.id,
                score=score,
                priority=audit_request.priority
            )
            
            return True
        else:
            # Keep as pending for manual review
            logger.info(
                "audit_request_pending_review",
                audit_id=audit_request.id,
                score=score
            )
            
            return False
    
    def schedule_audit(
        self,
        audit_request: AuditRequest,
        scheduled_date: datetime
    ):
        """
        Schedule a qualified audit.
        
        Business rule: Can only schedule qualified requests.
        """
        if audit_request.status != AuditRequestStatus.QUALIFIED:
            logger.warning(
                "attempt_schedule_unqualified_audit",
                audit_id=audit_request.id,
                status=audit_request.status
            )
            return False
        
        audit_request.status = AuditRequestStatus.SCHEDULED
        audit_request.scheduled_date = scheduled_date
        
        self.db.commit()
        
        logger.info(
            "audit_scheduled",
            audit_id=audit_request.id,
            scheduled_date=scheduled_date
        )
        
        return True
    
    def start_audit(self, audit_request: AuditRequest):
        """Mark audit as in progress"""
        if audit_request.status != AuditRequestStatus.SCHEDULED:
            return False
        
        audit_request.status = AuditRequestStatus.IN_PROGRESS
        self.db.commit()
        
        logger.info(
            "audit_started",
            audit_id=audit_request.id
        )
        
        return True
    
    def complete_audit(self, audit_request: AuditRequest):
        """Mark audit as completed"""
        if audit_request.status != AuditRequestStatus.IN_PROGRESS:
            return False
        
        audit_request.status = AuditRequestStatus.COMPLETED
        audit_request.completed_date = datetime.utcnow()
        self.db.commit()
        
        logger.info(
            "audit_completed",
            audit_id=audit_request.id
        )
        
        return True
    
    def reject_audit(self, audit_request: AuditRequest, reason: str = None):
        """Reject audit request"""
        audit_request.status = AuditRequestStatus.REJECTED
        
        if reason:
            audit_request.internal_notes = (
                f"{audit_request.internal_notes or ''}\n\n"
                f"Rejected: {reason}"
            )
        
        self.db.commit()
        
        logger.info(
            "audit_rejected",
            audit_id=audit_request.id,
            reason=reason
        )
        
        return True
"""
Audit Logging

Track admin actions for security and compliance.
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.orm import Session

from app.core.database import Base
from app.core.logging import get_logger

logger = get_logger(__name__)


class AuditLog(Base):
    """
    Audit log model for tracking admin actions.
    """
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, nullable=True, index=True)
    admin_email = Column(String(255), nullable=True, index=True)
    action = Column(String(100), nullable=False, index=True)
    resource_type = Column(String(50), nullable=True, index=True)
    resource_id = Column(Integer, nullable=True)
    details = Column(JSON, default=dict)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    
    def __repr__(self):
        return f"<AuditLog(action='{self.action}', admin='{self.admin_email}')>"


def log_admin_action(
    db: Session,
    action: str,
    admin_id: Optional[int] = None,
    admin_email: Optional[str] = None,
    resource_type: Optional[str] = None,
    resource_id: Optional[int] = None,
    details: Optional[dict] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
):
    """
    Log admin action to database.
    
    Usage:
    ```
    log_admin_action(
        db=db,
        action="project_created",
        admin_email=current_admin["email"],
        resource_type="project",
        resource_id=project.id,
        details={"title": project.title}
    )
    ```
    
    Args:
        db: Database session
        action: Action performed
        admin_id: Admin user ID
        admin_email: Admin email
        resource_type: Type of resource affected
        resource_id: ID of resource affected
        details: Additional details
        ip_address: Client IP
        user_agent: Client user agent
    """
    try:
        audit_log = AuditLog(
            admin_id=admin_id,
            admin_email=admin_email,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            details=details or {},
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        db.add(audit_log)
        db.commit()
        
        logger.info(
            "audit_log_created",
            action=action,
            admin_email=admin_email,
            resource_type=resource_type,
            resource_id=resource_id
        )
    
    except Exception as e:
        logger.error(
            "audit_log_failed",
            error=str(e),
            action=action,
            exc_info=True
        )
        db.rollback()


def get_audit_logs(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    admin_email: Optional[str] = None,
    action: Optional[str] = None,
    resource_type: Optional[str] = None
) -> list:
    """
    Retrieve audit logs with filters.
    
    Args:
        db: Database session
        skip: Number of records to skip
        limit: Maximum records to return
        admin_email: Filter by admin email
        action: Filter by action
        resource_type: Filter by resource type
    
    Returns:
        List of audit log records
    """
    query = db.query(AuditLog)
    
    if admin_email:
        query = query.filter(AuditLog.admin_email == admin_email)
    
    if action:
        query = query.filter(AuditLog.action == action)
    
    if resource_type:
        query = query.filter(AuditLog.resource_type == resource_type)
    
    return query.order_by(AuditLog.created_at.desc()).offset(skip).limit(limit).all()
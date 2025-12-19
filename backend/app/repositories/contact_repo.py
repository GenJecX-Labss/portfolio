"""
Contact Repository

Data access layer for contact form submissions.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, desc
from datetime import datetime, timedelta

from app.models.contact import Contact
from app.core.constants import ContactStatus


class ContactRepository:
    """Contact data access layer - NO business logic"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, contact_id: int) -> Optional[Contact]:
        """Get contact by ID"""
        return self.db.query(Contact).filter(Contact.id == contact_id).first()
    
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[ContactStatus] = None
    ) -> List[Contact]:
        """Get all contacts"""
        query = self.db.query(Contact)
        
        if status:
            query = query.filter(Contact.status == status)
        
        return query.order_by(desc(Contact.created_at)).offset(skip).limit(limit).all()
    
    def get_non_spam(
        self,
        skip: int = 0,
        limit: int = 100
    ) -> List[Contact]:
        """Get contacts excluding spam"""
        return self.db.query(Contact).filter(
            Contact.status != ContactStatus.SPAM
        ).order_by(desc(Contact.created_at)).offset(skip).limit(limit).all()
    
    def get_new(self, limit: int = 50) -> List[Contact]:
        """Get unread contacts"""
        return self.db.query(Contact).filter(
            Contact.status == ContactStatus.NEW
        ).order_by(desc(Contact.created_at)).limit(limit).all()
    
    def get_recent_by_ip(self, ip_address: str, hours: int = 1) -> List[Contact]:
        """Get recent contacts from IP for rate limiting"""
        cutoff_time = datetime.utcnow() - timedelta(hours=hours)
        
        return self.db.query(Contact).filter(
            and_(
                Contact.ip_address == ip_address,
                Contact.created_at >= cutoff_time
            )
        ).all()
    
    def count_new(self) -> int:
        """Count new/unread contacts"""
        return self.db.query(Contact).filter(
            Contact.status == ContactStatus.NEW
        ).count()
    
    def create(self, contact: Contact) -> Contact:
        """Create new contact"""
        self.db.add(contact)
        self.db.commit()
        self.db.refresh(contact)
        return contact
    
    def update(self, contact: Contact) -> Contact:
        """Update existing contact"""
        self.db.commit()
        self.db.refresh(contact)
        return contact
    
    def delete(self, contact: Contact):
        """Delete contact"""
        self.db.delete(contact)
        self.db.commit()
    
    def mark_as_read(self, contact_id: int) -> Optional[Contact]:
        """Mark contact as read"""
        contact = self.get_by_id(contact_id)
        if contact:
            contact.status = ContactStatus.READ
            self.db.commit()
            self.db.refresh(contact)
        return contact
    
    def mark_as_spam(self, contact_id: int) -> Optional[Contact]:
        """Mark contact as spam"""
        contact = self.get_by_id(contact_id)
        if contact:
            contact.status = ContactStatus.SPAM
            self.db.commit()
            self.db.refresh(contact)
        return contact
    
    def count_by_status(self) -> dict:
        """Count contacts by status"""
        from sqlalchemy import func
        
        results = self.db.query(
            Contact.status,
            func.count(Contact.id)
        ).group_by(Contact.status).all()
        
        return {status: count for status, count in results}
    
    def get_avg_response_time(self) -> Optional[float]:
        """Get average response time in hours"""
        from sqlalchemy import func
        
        result = self.db.query(
            func.avg(
                func.extract('epoch', Contact.responded_at - Contact.created_at) / 3600
            )
        ).filter(
            Contact.responded_at.isnot(None)
        ).scalar()
        
        return result

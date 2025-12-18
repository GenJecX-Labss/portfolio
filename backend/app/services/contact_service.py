"""
Contact Service

Business logic for contact form submissions.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime

from app.repositories.contact_repo import ContactRepository
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate, ContactStats
from app.core.constants import ContactStatus


class ContactService:
    """
    Contact form business logic.
    
    Business rules:
    - Spam detection
    - Rate limiting
    - Status management
    """
    
    def __init__(self, db: Session):
        self.repo = ContactRepository(db)
    
    def create_contact(
        self,
        data: ContactCreate,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None
    ) -> Contact:
        """
        Create new contact submission.
        
        Business rules:
        - Apply spam scoring
        - Track submission metadata
        """
        contact = Contact(**data.dict())
        contact.ip_address = ip_address
        contact.user_agent = user_agent
        contact.referrer = referrer
        contact.status = ContactStatus.NEW
        
        # Apply basic spam detection
        contact.spam_score = self._calculate_spam_score(data)
        
        # Auto-mark as spam if score is high
        if contact.spam_score > 7:
            contact.status = ContactStatus.SPAM
        
        return self.repo.create(contact)
    
    def _calculate_spam_score(self, data: ContactCreate) -> int:
        """
        Calculate spam score (0-10).
        
        Business rule: Simple heuristics for spam detection.
        """
        score = 0
        
        # Check for suspicious patterns
        message_lower = data.message.lower()
        
        # Spam keywords
        spam_keywords = ['viagra', 'casino', 'lottery', 'click here', 'buy now', 'offer']
        for keyword in spam_keywords:
            if keyword in message_lower:
                score += 2
        
        # Too many links
        if message_lower.count('http') > 2:
            score += 3
        
        # All caps message
        if data.message.isupper() and len(data.message) > 20:
            score += 2
        
        # Very short message
        if len(data.message) < 20:
            score += 1
        
        # No company name (for business inquiries)
        if not data.company:
            score += 1
        
        return min(score, 10)
    
    def check_rate_limit(self, ip_address: str, hours: int = 1) -> bool:
        """
        Check if IP has exceeded rate limit.
        
        Business rule: Maximum 3 submissions per hour per IP.
        """
        recent_contacts = self.repo.get_recent_by_ip(ip_address, hours)
        return len(recent_contacts) < 3
    
    def get_contact(self, contact_id: int) -> Optional[Contact]:
        """Get single contact"""
        return self.repo.get_by_id(contact_id)
    
    def get_all_contacts(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[ContactStatus] = None,
        exclude_spam: bool = True
    ) -> List[Contact]:
        """Get all contacts with filters"""
        if exclude_spam:
            return self.repo.get_non_spam(skip, limit)
        
        return self.repo.get_all(skip, limit, status)
    
    def get_new_contacts(self, limit: int = 50) -> List[Contact]:
        """Get unread contacts"""
        return self.repo.get_new(limit)
    
    def update_contact(
        self,
        contact_id: int,
        data: ContactUpdate
    ) -> Optional[Contact]:
        """Update contact (admin only)"""
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            return None
        
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(contact, field, value)
        
        return self.repo.update(contact)
    
    def mark_as_read(self, contact_id: int) -> Optional[Contact]:
        """Mark contact as read"""
        return self.repo.mark_as_read(contact_id)
    
    def mark_as_responded(
        self,
        contact_id: int,
        assigned_to: Optional[str] = None
    ) -> Optional[Contact]:
        """Mark contact as responded"""
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            return None
        
        contact.status = ContactStatus.RESPONDED
        contact.responded_at = datetime.utcnow()
        
        if assigned_to:
            contact.assigned_to = assigned_to
        
        return self.repo.update(contact)
    
    def mark_as_spam(self, contact_id: int) -> Optional[Contact]:
        """Mark contact as spam"""
        return self.repo.mark_as_spam(contact_id)
    
    def archive_contact(self, contact_id: int) -> Optional[Contact]:
        """Archive contact"""
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            return None
        
        contact.status = ContactStatus.ARCHIVED
        return self.repo.update(contact)
    
    def get_statistics(self) -> ContactStats:
        """
        Get contact form statistics.
        
        Business intelligence for dashboard.
        """
        status_counts = self.repo.count_by_status()
        avg_response_time = self.repo.get_avg_response_time()
        
        return ContactStats(
            total_contacts=sum(status_counts.values()),
            new_count=status_counts.get(ContactStatus.NEW, 0),
            read_count=status_counts.get(ContactStatus.READ, 0),
            responded_count=status_counts.get(ContactStatus.RESPONDED, 0),
            spam_count=status_counts.get(ContactStatus.SPAM, 0),
            avg_response_time_hours=avg_response_time
        )
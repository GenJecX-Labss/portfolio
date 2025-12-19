"""
Contact Model

Represents general contact form submissions.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func

from app.core.database import Base
from app.core.constants import ContactType, ContactStatus


class Contact(Base):
    """
    Contact form submission model.
    
    Captures general inquiries, partnership requests, etc.
    """
    __tablename__ = "contacts"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Contact Information
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company = Column(String(200), nullable=True)
    
    # Message Details
    contact_type = Column(SQLEnum(ContactType), nullable=False, index=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    
    # Status
    status = Column(
        SQLEnum(ContactStatus),
        default=ContactStatus.NEW,
        nullable=False,
        index=True
    )
    
    # Internal Management
    internal_notes = Column(Text, nullable=True)
    assigned_to = Column(String(100), nullable=True)
    responded_at = Column(DateTime, nullable=True)
    
    # Tracking & Anti-Spam
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    referrer = Column(String(500), nullable=True)
    spam_score = Column(Integer, default=0)  # Simple spam scoring
    
    # Dates
    created_at = Column(DateTime, default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Contact(id={self.id}, name='{self.name}', type='{self.contact_type}')>"
    
    @property
    def is_new(self) -> bool:
        """Check if contact is unread"""
        return self.status == ContactStatus.NEW
    
    @property
    def is_spam(self) -> bool:
        """Check if marked as spam"""
        return self.status == ContactStatus.SPAM or self.spam_score > 5
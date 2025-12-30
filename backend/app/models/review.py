"""
Review Database Model
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from app.core.database import Base


class Review(Base):
    """Client review/testimonial model"""
    
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=True)
    company = Column(String(100), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    email = Column(String(255), nullable=True)  # For verification, not displayed
    is_approved = Column(Boolean, default=False)  # Admin approval required
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Review(id={self.id}, name='{self.name}', company='{self.company}')>"

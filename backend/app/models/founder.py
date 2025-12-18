"""
Founder Model

Represents founding team members for the About page.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from sqlalchemy.sql import func

from app.core.database import Base


class Founder(Base):
    """
    Founder/team member model.
    
    Displays team profiles on About page.
    """
    __tablename__ = "founders"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Profile Information
    name = Column(String(100), nullable=False)
    title = Column(String(100), nullable=False)  # e.g., "Co-Founder & CTO"
    bio = Column(Text, nullable=False)
    short_bio = Column(String(500), nullable=True)  # For card displays
    
    # Media
    profile_image_url = Column(String(500), nullable=True)
    
    # Links
    linkedin_url = Column(String(500), nullable=True)
    twitter_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    personal_website = Column(String(500), nullable=True)
    
    # Expertise
    expertise_areas = Column(JSON, default=list)  # List of specializations
    
    # Display
    is_public = Column(Boolean, default=True, nullable=False)
    display_order = Column(Integer, default=0, nullable=False, index=True)
    
    # Dates
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Founder(id={self.id}, name='{self.name}', title='{self.title}')>"
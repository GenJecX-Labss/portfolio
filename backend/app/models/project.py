"""
Project Model

Represents AI/ML projects in the portfolio.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLEnum, Boolean, JSON
from sqlalchemy.sql import func
from datetime import datetime

from app.core.database import Base
from app.core.constants import ProjectStatus, ProjectVisibility, ProjectCategory


class Project(Base):
    """
    Project database model.
    
    Stores portfolio projects with controlled visibility.
    """
    __tablename__ = "projects"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Core Information
    title = Column(String(200), nullable=False, index=True)
    slug = Column(String(250), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=True)
    
    # Categorization
    category = Column(SQLEnum(ProjectCategory), nullable=False, index=True)
    tags = Column(JSON, default=list)  # List of strings
    
    # Status & Visibility
    status = Column(
        SQLEnum(ProjectStatus),
        default=ProjectStatus.DRAFT,
        nullable=False,
        index=True
    )
    visibility = Column(
        SQLEnum(ProjectVisibility),
        default=ProjectVisibility.PRIVATE,
        nullable=False,
        index=True
    )
    
    # Media
    thumbnail_url = Column(String(500), nullable=True)
    images = Column(JSON, default=list)  # List of image URLs
    demo_url = Column(String(500), nullable=True)
    video_url = Column(String(500), nullable=True)
    
    # Technical Details
    tech_stack = Column(JSON, default=list)  # List of technologies
    github_url = Column(String(500), nullable=True)
    
    # Metrics
    view_count = Column(Integer, default=0)
    featured = Column(Boolean, default=False, index=True)
    sort_order = Column(Integer, default=0, index=True)
    
    # Dates
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Project(id={self.id}, title='{self.title}', status='{self.status}')>"
    
    @property
    def is_public(self) -> bool:
        """Check if project is publicly visible"""
        return (
            self.status == ProjectStatus.PUBLISHED and
            self.visibility in [ProjectVisibility.PUBLIC, ProjectVisibility.SHOWCASE]
        )
    
    @property
    def is_featured(self) -> bool:
        """Check if project should be featured"""
        return self.featured and self.is_public
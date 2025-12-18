"""
Project Schemas

Pydantic models for project API requests and responses.
"""

from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl, validator
from datetime import datetime

from app.core.constants import ProjectStatus, ProjectVisibility, ProjectCategory
from app.schemas.common import TimestampMixin


class ProjectBase(BaseModel):
    """Base project schema with common fields"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    long_description: Optional[str] = None
    category: ProjectCategory
    tags: List[str] = Field(default_factory=list)
    tech_stack: List[str] = Field(default_factory=list)
    
    @validator('tags', 'tech_stack')
    def validate_list_length(cls, v):
        if len(v) > 20:
            raise ValueError('Maximum 20 items allowed')
        return v


class ProjectCreate(ProjectBase):
    """Schema for creating a new project"""
    slug: str = Field(..., min_length=1, max_length=250)
    thumbnail_url: Optional[HttpUrl] = None
    demo_url: Optional[HttpUrl] = None
    video_url: Optional[HttpUrl] = None
    github_url: Optional[HttpUrl] = None
    images: List[HttpUrl] = Field(default_factory=list)
    
    visibility: ProjectVisibility = ProjectVisibility.PRIVATE
    featured: bool = False


class ProjectUpdate(BaseModel):
    """Schema for updating a project (all fields optional)"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=10, max_length=2000)
    long_description: Optional[str] = None
    category: Optional[ProjectCategory] = None
    tags: Optional[List[str]] = None
    tech_stack: Optional[List[str]] = None
    status: Optional[ProjectStatus] = None
    visibility: Optional[ProjectVisibility] = None
    featured: Optional[bool] = None
    thumbnail_url: Optional[HttpUrl] = None
    demo_url: Optional[HttpUrl] = None
    video_url: Optional[HttpUrl] = None
    github_url: Optional[HttpUrl] = None
    images: Optional[List[HttpUrl]] = None


class ProjectResponse(ProjectBase, TimestampMixin):
    """Schema for project responses"""
    id: int
    slug: str
    status: ProjectStatus
    visibility: ProjectVisibility
    thumbnail_url: Optional[str] = None
    images: List[str]
    demo_url: Optional[str] = None
    video_url: Optional[str] = None
    github_url: Optional[str] = None
    view_count: int
    featured: bool
    published_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ProjectListResponse(BaseModel):
    """Minimal project schema for list views"""
    id: int
    title: str
    slug: str
    description: str
    category: ProjectCategory
    tags: List[str]
    thumbnail_url: Optional[str] = None
    featured: bool
    view_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ProjectPublicResponse(BaseModel):
    """Public-facing project schema (hides internal fields)"""
    id: int
    title: str
    slug: str
    description: str
    long_description: Optional[str] = None
    category: ProjectCategory
    tags: List[str]
    tech_stack: List[str]
    thumbnail_url: Optional[str] = None
    images: List[str]
    demo_url: Optional[str] = None
    video_url: Optional[str] = None
    github_url: Optional[str] = None
    published_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
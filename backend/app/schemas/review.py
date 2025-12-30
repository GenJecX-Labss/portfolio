"""
Review Schemas
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator


class ReviewBase(BaseModel):
    """Base review schema"""
    name: str = Field(..., min_length=2, max_length=100)
    role: Optional[str] = Field(None, max_length=100)
    company: Optional[str] = Field(None, max_length=100)
    content: str = Field(..., min_length=10, max_length=1000)
    rating: int = Field(default=5, ge=1, le=5)


class ReviewCreate(ReviewBase):
    """Schema for creating a review"""
    email: Optional[str] = Field(None, max_length=255)


class ReviewUpdate(BaseModel):
    """Schema for updating a review"""
    is_approved: Optional[bool] = None
    is_featured: Optional[bool] = None


class ReviewResponse(ReviewBase):
    """Schema for review response (public)"""
    id: int
    is_featured: bool
    created_at: datetime
    
    model_config = {"from_attributes": True}


class ReviewAdminResponse(ReviewResponse):
    """Schema for admin review response"""
    email: Optional[str]
    is_approved: bool
    updated_at: datetime
    
    model_config = {"from_attributes": True}


class ReviewListResponse(BaseModel):
    """Schema for list of reviews"""
    reviews: List[ReviewResponse]
    total: int
    page: int
    per_page: int

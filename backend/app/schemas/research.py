"""
Research Schemas

Pydantic models for research content API.
"""

from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl, validator
from datetime import datetime

from app.core.constants import ResearchType, ResearchStatus
from app.schemas.common import TimestampMixin


class ResearchBase(BaseModel):
    """Base research schema"""
    title: str = Field(..., min_length=1, max_length=200)
    abstract: str = Field(..., min_length=50)
    content: Optional[str] = None
    research_type: ResearchType
    authors: List[str] = Field(default_factory=list)
    affiliations: List[str] = Field(default_factory=list)
    keywords: List[str] = Field(default_factory=list)
    topics: List[str] = Field(default_factory=list)
    
    @validator('authors', 'keywords', 'topics')
    def validate_list_length(cls, v):
        if len(v) > 50:
            raise ValueError('Maximum 50 items allowed')
        return v


class ResearchCreate(ResearchBase):
    """Schema for creating research content"""
    slug: str = Field(..., min_length=1, max_length=250)
    publication_venue: Optional[str] = Field(None, max_length=200)
    publication_date: Optional[datetime] = None
    doi: Optional[str] = Field(None, max_length=100)
    arxiv_id: Optional[str] = Field(None, max_length=50)
    pdf_url: Optional[HttpUrl] = None
    external_url: Optional[HttpUrl] = None
    github_url: Optional[HttpUrl] = None
    is_public: bool = False
    featured: bool = False


class ResearchUpdate(BaseModel):
    """Schema for updating research (all fields optional)"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    abstract: Optional[str] = Field(None, min_length=50)
    content: Optional[str] = None
    research_type: Optional[ResearchType] = None
    status: Optional[ResearchStatus] = None
    authors: Optional[List[str]] = None
    affiliations: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    topics: Optional[List[str]] = None
    publication_venue: Optional[str] = None
    publication_date: Optional[datetime] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None
    pdf_url: Optional[HttpUrl] = None
    external_url: Optional[HttpUrl] = None
    github_url: Optional[HttpUrl] = None
    is_public: Optional[bool] = None
    featured: Optional[bool] = None


class ResearchResponse(ResearchBase, TimestampMixin):
    """Full research response with all fields"""
    id: int
    slug: str
    status: ResearchStatus
    publication_venue: Optional[str] = None
    publication_date: Optional[datetime] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None
    pdf_url: Optional[str] = None
    external_url: Optional[str] = None
    github_url: Optional[str] = None
    is_public: bool
    featured: bool
    download_count: int
    view_count: int
    citation_count: int
    published_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ResearchListResponse(BaseModel):
    """Minimal research schema for list views"""
    id: int
    title: str
    slug: str
    abstract: str
    research_type: ResearchType
    authors: List[str]
    keywords: List[str]
    featured: bool
    view_count: int
    publication_date: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class ResearchPublicResponse(BaseModel):
    """Public-facing research schema"""
    id: int
    title: str
    slug: str
    abstract: str
    content: Optional[str] = None
    research_type: ResearchType
    authors: List[str]
    affiliations: List[str]
    keywords: List[str]
    topics: List[str]
    publication_venue: Optional[str] = None
    publication_date: Optional[datetime] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None
    pdf_url: Optional[str] = None
    external_url: Optional[str] = None
    github_url: Optional[str] = None
    citation_count: int
    published_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
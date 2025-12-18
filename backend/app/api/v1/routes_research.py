"""
Research API Routes

PUBLIC endpoints for research content.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.research_service import ResearchService
from app.schemas.research import ResearchPublicResponse, ResearchListResponse
from app.schemas.common import PaginationParams, PaginatedResponse, MessageResponse

router = APIRouter()


@router.get("/", response_model=List[ResearchPublicResponse])
def list_research(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    research_type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Get public research content.
    
    - **skip**: Number of items to skip
    - **limit**: Maximum number of items to return
    - **research_type**: Filter by research type (optional)
    """
    service = ResearchService(db)
    research_items = service.get_public_research(skip, limit, research_type)
    
    return [ResearchPublicResponse.from_orm(r) for r in research_items]


@router.get("/featured", response_model=List[ResearchPublicResponse])
def get_featured_research(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """
    Get featured research for homepage.
    
    - **limit**: Maximum number of featured items
    """
    service = ResearchService(db)
    research_items = service.get_featured_research(limit)
    
    return [ResearchPublicResponse.from_orm(r) for r in research_items]


@router.get("/search", response_model=List[ResearchPublicResponse])
def search_research(
    q: str = Query(..., min_length=2, description="Search query"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Search research content.
    
    - **q**: Search query (title, abstract, keywords)
    - **skip**: Number of items to skip
    - **limit**: Maximum number of items to return
    """
    service = ResearchService(db)
    research_items = service.search_research(q, skip, limit)
    
    return [ResearchPublicResponse.from_orm(r) for r in research_items]


@router.get("/{slug}", response_model=ResearchPublicResponse)
def get_research(
    slug: str,
    db: Session = Depends(get_db)
):
    """
    Get single research item by slug.
    
    - **slug**: Research URL slug
    
    Note: View count is automatically incremented.
    """
    service = ResearchService(db)
    research = service.get_research_by_slug(slug, track_view=True)
    
    if not research or not research.is_published:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Research not found"
        )
    
    return ResearchPublicResponse.from_orm(research)


@router.post("/{research_id}/download", response_model=MessageResponse)
def track_download(
    research_id: int,
    db: Session = Depends(get_db)
):
    """
    Track research download event.
    
    Call this endpoint when user downloads a PDF or paper.
    """
    service = ResearchService(db)
    research = service.get_research_by_slug(str(research_id))
    
    if not research:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Research not found"
        )
    
    service.track_download(research_id)
    
    return MessageResponse(
        message="Download tracked successfully",
        success=True
    )
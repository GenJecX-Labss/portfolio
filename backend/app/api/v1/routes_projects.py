"""
Projects API Routes

PUBLIC endpoints for portfolio projects.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.project_service import ProjectService
from app.schemas.project import ProjectPublicResponse, ProjectListResponse, ProjectResponse
from app.schemas.common import MessageResponse

router = APIRouter()


@router.get("/", response_model=List[ProjectListResponse])
def list_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Get public portfolio projects.
    
    - **skip**: Number of items to skip
    - **limit**: Maximum number of items to return
    - **category**: Filter by project category (optional)
    """
    service = ProjectService(db)
    projects = service.get_public_projects(skip, limit, category)
    
    return [ProjectListResponse.model_validate(p, from_attributes=True) for p in projects]


@router.get("/featured", response_model=List[ProjectListResponse])
def get_featured_projects(
    limit: int = Query(6, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """
    Get featured projects for homepage.
    
    - **limit**: Maximum number of featured items
    """
    service = ProjectService(db)
    projects = service.get_featured_projects(limit)
    
    return [ProjectListResponse.model_validate(p, from_attributes=True) for p in projects]


@router.get("/categories", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    """
    Get all available project categories.
    """
    service = ProjectService(db)
    return service.get_categories()


@router.get("/search", response_model=List[ProjectListResponse])
def search_projects(
    q: str = Query(..., min_length=2, description="Search query"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Search projects.
    
    - **q**: Search query (title, description, tags)
    - **skip**: Number of items to skip
    - **limit**: Maximum number of items to return
    """
    service = ProjectService(db)
    projects = service.search_projects(q, skip, limit)
    
    return [ProjectListResponse.model_validate(p, from_attributes=True) for p in projects]


@router.get("/{slug}", response_model=ProjectPublicResponse)
def get_project(
    slug: str,
    db: Session = Depends(get_db)
):
    """
    Get single project by slug.
    
    - **slug**: Project URL slug
    
    Note: View count is automatically incremented.
    """
    service = ProjectService(db)
    project = service.get_project_by_slug(slug, track_view=True)
    
    if not project or not project.is_public:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return ProjectPublicResponse.model_validate(project, from_attributes=True)


@router.post("/{project_id}/view", response_model=MessageResponse)
def track_project_view(
    project_id: int,
    db: Session = Depends(get_db)
):
    """
    Track project view event.
    
    Call this endpoint when user views a project detail page.
    """
    service = ProjectService(db)
    project = service.get_project_by_id(project_id)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    service.track_view(project_id)
    
    return MessageResponse(
        message="View tracked successfully",
        success=True
    )

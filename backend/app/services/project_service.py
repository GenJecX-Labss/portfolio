"""
Project Service

Business logic for portfolio project management.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime

from app.repositories.project_repo import ProjectRepository
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.core.constants import ProjectStatus, ProjectVisibility, ProjectCategory


class ProjectService:
    """
    Project business logic.
    
    Business rules:
    - What projects are publicly visible
    - View tracking
    - Featured project selection
    """
    
    def __init__(self, db: Session):
        self.repo = ProjectRepository(db)
    
    def get_public_projects(
        self,
        skip: int = 0,
        limit: int = 20,
        category: Optional[str] = None
    ) -> List[Project]:
        """
        Get publicly visible projects.
        
        Business rule: Only published + public/showcase visibility.
        """
        return self.repo.get_public_projects(skip, limit, category)
    
    def get_featured_projects(self, limit: int = 6) -> List[Project]:
        """
        Get featured projects for homepage.
        
        Business rule: Featured flag + public + published.
        """
        return self.repo.get_featured(limit)
    
    def get_project_by_slug(self, slug: str, track_view: bool = True) -> Optional[Project]:
        """
        Get single project by slug.
        
        Business rule: Increment view count only for public projects.
        """
        project = self.repo.get_by_slug(slug)
        
        if project and project.is_public and track_view:
            self.repo.increment_view_count(project.id)
        
        return project
    
    def get_project_by_id(self, project_id: int) -> Optional[Project]:
        """Get project by ID"""
        return self.repo.get_by_id(project_id)
    
    def search_projects(
        self,
        query: str,
        skip: int = 0,
        limit: int = 20
    ) -> List[Project]:
        """Search projects"""
        return self.repo.search(query, skip, limit)
    
    def get_categories(self) -> List[str]:
        """Get all available project categories"""
        return [category.value for category in ProjectCategory]
    
    def create_project(self, data: ProjectCreate) -> Project:
        """
        Create new project.
        
        Business rule: New projects start as draft.
        """
        project = Project(**data.dict())
        project.status = ProjectStatus.DRAFT
        
        return self.repo.create(project)
    
    def update_project(
        self,
        project_id: int,
        data: ProjectUpdate
    ) -> Optional[Project]:
        """Update existing project"""
        project = self.repo.get_by_id(project_id)
        if not project:
            return None
        
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(project, field, value)
        
        return self.repo.update(project)
    
    def publish_project(self, project_id: int) -> Optional[Project]:
        """
        Publish project.
        
        Business rule: Set published timestamp and make public.
        """
        project = self.repo.get_by_id(project_id)
        if not project:
            return None
        
        if project.status != ProjectStatus.PUBLISHED:
            project.status = ProjectStatus.PUBLISHED
            project.published_at = datetime.utcnow()
            project.visibility = ProjectVisibility.PUBLIC
            return self.repo.update(project)
        
        return project
    
    def archive_project(self, project_id: int) -> Optional[Project]:
        """Archive project (hide from public)"""
        project = self.repo.get_by_id(project_id)
        if not project:
            return None
        
        project.status = ProjectStatus.ARCHIVED
        project.visibility = ProjectVisibility.PRIVATE
        
        return self.repo.update(project)
    
    def toggle_featured(self, project_id: int) -> Optional[Project]:
        """Toggle featured status"""
        project = self.repo.get_by_id(project_id)
        if not project:
            return None
        
        project.featured = not project.featured
        return self.repo.update(project)
    
    def track_view(self, project_id: int):
        """Track project view"""
        self.repo.increment_view_count(project_id)
    
    def delete_project(self, project_id: int) -> bool:
        """Delete project"""
        project = self.repo.get_by_id(project_id)
        if not project:
            return False
        
        self.repo.delete(project)
        return True
    
    def get_all_projects(
        self,
        skip: int = 0,
        limit: int = 100
    ) -> List[Project]:
        """Get all projects (admin)"""
        return self.repo.get_all(skip, limit)

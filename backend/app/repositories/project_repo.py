"""
Project Repository

Data access layer for portfolio projects.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc

from app.models.project import Project
from app.core.constants import ProjectStatus, ProjectVisibility


class ProjectRepository:
    """Project data access layer - NO business logic"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, project_id: int) -> Optional[Project]:
        """Get project by ID"""
        return self.db.query(Project).filter(Project.id == project_id).first()
    
    def get_by_slug(self, slug: str) -> Optional[Project]:
        """Get project by slug"""
        return self.db.query(Project).filter(Project.slug == slug).first()
    
    def get_public_projects(
        self,
        skip: int = 0,
        limit: int = 20,
        category: Optional[str] = None
    ) -> List[Project]:
        """Get published and public projects"""
        query = self.db.query(Project).filter(
            and_(
                Project.status == ProjectStatus.PUBLISHED,
                Project.visibility.in_([ProjectVisibility.PUBLIC, ProjectVisibility.SHOWCASE])
            )
        )
        
        if category:
            query = query.filter(Project.category == category)
        
        return query.order_by(
            desc(Project.featured),
            desc(Project.sort_order),
            desc(Project.published_at)
        ).offset(skip).limit(limit).all()
    
    def get_featured(self, limit: int = 6) -> List[Project]:
        """Get featured projects"""
        return self.db.query(Project).filter(
            and_(
                Project.featured == True,
                Project.status == ProjectStatus.PUBLISHED,
                Project.visibility.in_([ProjectVisibility.PUBLIC, ProjectVisibility.SHOWCASE])
            )
        ).order_by(desc(Project.sort_order), desc(Project.published_at)).limit(limit).all()
    
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[ProjectStatus] = None
    ) -> List[Project]:
        """Get all projects (admin)"""
        query = self.db.query(Project)
        
        if status:
            query = query.filter(Project.status == status)
        
        return query.order_by(desc(Project.created_at)).offset(skip).limit(limit).all()
    
    def search(
        self,
        query_text: str,
        skip: int = 0,
        limit: int = 20
    ) -> List[Project]:
        """Search projects by title, description, or tags"""
        search_pattern = f"%{query_text}%"
        
        return self.db.query(Project).filter(
            and_(
                Project.status == ProjectStatus.PUBLISHED,
                Project.visibility.in_([ProjectVisibility.PUBLIC, ProjectVisibility.SHOWCASE]),
                or_(
                    Project.title.ilike(search_pattern),
                    Project.description.ilike(search_pattern)
                )
            )
        ).offset(skip).limit(limit).all()
    
    def count_public(self) -> int:
        """Count public projects"""
        return self.db.query(Project).filter(
            and_(
                Project.status == ProjectStatus.PUBLISHED,
                Project.visibility.in_([ProjectVisibility.PUBLIC, ProjectVisibility.SHOWCASE])
            )
        ).count()
    
    def create(self, project: Project) -> Project:
        """Create new project"""
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project
    
    def update(self, project: Project) -> Project:
        """Update existing project"""
        self.db.commit()
        self.db.refresh(project)
        return project
    
    def delete(self, project: Project):
        """Delete project"""
        self.db.delete(project)
        self.db.commit()
    
    def increment_view_count(self, project_id: int):
        """Increment view counter"""
        project = self.get_by_id(project_id)
        if project:
            project.view_count += 1
            self.db.commit()

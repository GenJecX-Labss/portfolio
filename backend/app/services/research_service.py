"""
Research Service

Business logic for research content management.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime

from app.repositories.research_repo import ResearchRepository
from app.models.research import Research
from app.schemas.research import ResearchCreate, ResearchUpdate
from app.core.constants import ResearchStatus


class ResearchService:
    """
    Research business logic.
    
    This is where decisions happen about:
    - What research is public
    - How research is categorized
    - View tracking logic
    """
    
    def __init__(self, db: Session):
        self.repo = ResearchRepository(db)
    
    def get_public_research(
        self,
        skip: int = 0,
        limit: int = 20,
        research_type: Optional[str] = None
    ) -> List[Research]:
        """
        Get publicly visible research.
        
        Business rule: Only published AND public research is shown.
        """
        return self.repo.get_public_research(skip, limit, research_type)
    
    def get_featured_research(self, limit: int = 5) -> List[Research]:
        """
        Get featured research for homepage.
        
        Business rule: Featured flag + public + published.
        """
        return self.repo.get_featured(limit)
    
    def get_research_by_slug(self, slug: str, track_view: bool = True) -> Optional[Research]:
        """
        Get single research item by slug.
        
        Business rule: Increment view count only for public research.
        """
        research = self.repo.get_by_slug(slug)
        
        if research and research.is_published and track_view:
            self.repo.increment_view_count(research.id)
        
        return research
    
    def search_research(
        self,
        query: str,
        skip: int = 0,
        limit: int = 20
    ) -> List[Research]:
        """Search research content"""
        return self.repo.search(query, skip, limit)
    
    def create_research(self, data: ResearchCreate) -> Research:
        """
        Create new research item.
        
        Business rule: New research starts as draft.
        """
        research = Research(**data.dict())
        research.status = ResearchStatus.DRAFT
        
        return self.repo.create(research)
    
    def update_research(
        self,
        research_id: int,
        data: ResearchUpdate
    ) -> Optional[Research]:
        """Update existing research"""
        research = self.repo.get_by_id(research_id)
        if not research:
            return None
        
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(research, field, value)
        
        return self.repo.update(research)
    
    def publish_research(self, research_id: int) -> Optional[Research]:
        """
        Publish research.
        
        Business rule: Set published timestamp when transitioning to published.
        """
        research = self.repo.get_by_id(research_id)
        if not research:
            return None
        
        if research.status != ResearchStatus.PUBLISHED:
            research.status = ResearchStatus.PUBLISHED
            research.published_at = datetime.utcnow()
            research.is_public = True
            return self.repo.update(research)
        
        return research
    
    def archive_research(self, research_id: int) -> Optional[Research]:
        """Archive research (hide from public)"""
        research = self.repo.get_by_id(research_id)
        if not research:
            return None
        
        research.status = ResearchStatus.ARCHIVED
        research.is_public = False
        
        return self.repo.update(research)
    
    def toggle_featured(self, research_id: int) -> Optional[Research]:
        """Toggle featured status"""
        research = self.repo.get_by_id(research_id)
        if not research:
            return None
        
        research.featured = not research.featured
        return self.repo.update(research)
    
    def track_download(self, research_id: int):
        """Track research download"""
        self.repo.increment_download_count(research_id)
    
    def delete_research(self, research_id: int) -> bool:
        """
        Delete research.
        
        Business rule: Only delete if not published or after archival.
        """
        research = self.repo.get_by_id(research_id)
        if not research:
            return False
        
        # Safety check: don't delete published research directly
        if research.status == ResearchStatus.PUBLISHED:
            return False
        
        self.repo.delete(research)
        return True
    
    def get_all_admin(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[ResearchStatus] = None
    ) -> List[Research]:
        """Get all research for admin panel"""
        return self.repo.get_all(skip, limit, status)
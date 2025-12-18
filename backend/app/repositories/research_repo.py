"""
Research Repository

Data access layer for research content.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc

from app.models.research import Research
from app.core.constants import ResearchStatus


class ResearchRepository:
    """Research data access layer - NO business logic"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, research_id: int) -> Optional[Research]:
        """Get research by ID"""
        return self.db.query(Research).filter(Research.id == research_id).first()
    
    def get_by_slug(self, slug: str) -> Optional[Research]:
        """Get research by slug"""
        return self.db.query(Research).filter(Research.slug == slug).first()
    
    def get_public_research(
        self,
        skip: int = 0,
        limit: int = 20,
        research_type: Optional[str] = None
    ) -> List[Research]:
        """Get published and public research"""
        query = self.db.query(Research).filter(
            and_(
                Research.status == ResearchStatus.PUBLISHED,
                Research.is_public == True
            )
        )
        
        if research_type:
            query = query.filter(Research.research_type == research_type)
        
        return query.order_by(
            desc(Research.featured),
            desc(Research.publication_date),
            desc(Research.created_at)
        ).offset(skip).limit(limit).all()
    
    def get_featured(self, limit: int = 5) -> List[Research]:
        """Get featured research"""
        return self.db.query(Research).filter(
            and_(
                Research.featured == True,
                Research.is_public == True,
                Research.status == ResearchStatus.PUBLISHED
            )
        ).order_by(desc(Research.publication_date)).limit(limit).all()
    
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[ResearchStatus] = None
    ) -> List[Research]:
        """Get all research (admin)"""
        query = self.db.query(Research)
        
        if status:
            query = query.filter(Research.status == status)
        
        return query.order_by(desc(Research.created_at)).offset(skip).limit(limit).all()
    
    def search(
        self,
        query_text: str,
        skip: int = 0,
        limit: int = 20
    ) -> List[Research]:
        """Search research by title, abstract, or keywords"""
        search_pattern = f"%{query_text}%"
        
        return self.db.query(Research).filter(
            and_(
                Research.is_public == True,
                Research.status == ResearchStatus.PUBLISHED,
                or_(
                    Research.title.ilike(search_pattern),
                    Research.abstract.ilike(search_pattern)
                )
            )
        ).offset(skip).limit(limit).all()
    
    def count_public(self) -> int:
        """Count public research items"""
        return self.db.query(Research).filter(
            and_(
                Research.is_public == True,
                Research.status == ResearchStatus.PUBLISHED
            )
        ).count()
    
    def create(self, research: Research) -> Research:
        """Create new research"""
        self.db.add(research)
        self.db.commit()
        self.db.refresh(research)
        return research
    
    def update(self, research: Research) -> Research:
        """Update existing research"""
        self.db.commit()
        self.db.refresh(research)
        return research
    
    def delete(self, research: Research):
        """Delete research"""
        self.db.delete(research)
        self.db.commit()
    
    def increment_view_count(self, research_id: int):
        """Increment view counter"""
        research = self.get_by_id(research_id)
        if research:
            research.view_count += 1
            self.db.commit()
    
    def increment_download_count(self, research_id: int):
        """Increment download counter"""
        research = self.get_by_id(research_id)
        if research:
            research.download_count += 1
            self.db.commit()
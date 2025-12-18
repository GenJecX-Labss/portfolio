"""
Research Model

Represents research papers, technical reports, and case studies.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLEnum, Boolean, JSON
from sqlalchemy.sql import func

from app.core.database import Base
from app.core.constants import ResearchType, ResearchStatus


class Research(Base):
    """
    Research content model.
    
    Stores academic papers, technical reports, architecture diagrams, case studies.
    """
    __tablename__ = "research"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Core Information
    title = Column(String(200), nullable=False, index=True)
    slug = Column(String(250), unique=True, nullable=False, index=True)
    abstract = Column(Text, nullable=False)
    content = Column(Text, nullable=True)  # Full content or summary
    
    # Classification
    research_type = Column(SQLEnum(ResearchType), nullable=False, index=True)
    status = Column(
        SQLEnum(ResearchStatus),
        default=ResearchStatus.DRAFT,
        nullable=False,
        index=True
    )
    
    # Authors & Affiliations
    authors = Column(JSON, default=list)  # List of author names
    affiliations = Column(JSON, default=list)  # List of institutions
    
    # Publication Details
    publication_venue = Column(String(200), nullable=True)  # Journal/Conference name
    publication_date = Column(DateTime, nullable=True)
    doi = Column(String(100), nullable=True)
    arxiv_id = Column(String(50), nullable=True)
    
    # Files & Links
    pdf_url = Column(String(500), nullable=True)
    external_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    
    # Categorization
    keywords = Column(JSON, default=list)  # Research keywords
    topics = Column(JSON, default=list)  # Broad topic areas
    
    # Visibility
    is_public = Column(Boolean, default=False, index=True)
    featured = Column(Boolean, default=False, index=True)
    
    # Metrics
    download_count = Column(Integer, default=0)
    view_count = Column(Integer, default=0)
    citation_count = Column(Integer, default=0)
    
    # Dates
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Research(id={self.id}, title='{self.title}', type='{self.research_type}')>"
    
    @property
    def is_published(self) -> bool:
        """Check if research is published and public"""
        return self.status == ResearchStatus.PUBLISHED and self.is_public
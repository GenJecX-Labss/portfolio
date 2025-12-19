"""
Metric Event Model

Tracks analytics and user behavior.
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum, JSON
from sqlalchemy.sql import func

from app.core.database import Base
from app.core.constants import MetricEventType


class MetricEvent(Base):
    """
    Analytics event model.
    
    Tracks page views, interactions, and engagement metrics.
    """
    __tablename__ = "metric_events"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Event Information
    event_type = Column(SQLEnum(MetricEventType), nullable=False, index=True)
    event_name = Column(String(100), nullable=False, index=True)
    
    # Context
    path = Column(String(500), nullable=True, index=True)
    resource_type = Column(String(50), nullable=True)  # e.g., "project", "research"
    resource_id = Column(Integer, nullable=True, index=True)
    
    # Additional Data
    metadata = Column(JSON, default=dict)  # Flexible event-specific data
    
    # User Tracking (Anonymous)
    session_id = Column(String(100), nullable=True, index=True)
    user_id = Column(String(100), nullable=True, index=True)  # Future: authenticated users
    
    # Technical Details
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    referrer = Column(String(500), nullable=True)
    country_code = Column(String(2), nullable=True)
    
    # Dates
    created_at = Column(DateTime, default=func.now(), nullable=False, index=True)
    
    def __repr__(self):
        return f"<MetricEvent(id={self.id}, type='{self.event_type}', name='{self.event_name}')>"
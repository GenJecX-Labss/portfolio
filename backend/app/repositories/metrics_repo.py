"""
Metrics Repository

Data access layer for analytics events.
"""

from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta

from app.models.metric_event import MetricEvent
from app.core.constants import MetricEventType


class MetricsRepository:
    """Metrics data access layer - NO business logic"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, event: MetricEvent) -> MetricEvent:
        """Create new metric event"""
        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)
        return event
    
    def create_batch(self, events: List[MetricEvent]):
        """Create multiple events (bulk insert)"""
        self.db.bulk_save_objects(events)
        self.db.commit()
    
    def get_by_id(self, event_id: int) -> Optional[MetricEvent]:
        """Get event by ID"""
        return self.db.query(MetricEvent).filter(MetricEvent.id == event_id).first()
    
    def get_by_session(self, session_id: str, limit: int = 100) -> List[MetricEvent]:
        """Get all events for a session"""
        return self.db.query(MetricEvent).filter(
            MetricEvent.session_id == session_id
        ).order_by(MetricEvent.created_at).limit(limit).all()
    
    def get_by_type(
        self,
        event_type: MetricEventType,
        days: int = 7,
        limit: int = 1000
    ) -> List[MetricEvent]:
        """Get events by type within date range"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        return self.db.query(MetricEvent).filter(
            MetricEvent.event_type == event_type,
            MetricEvent.created_at >= start_date
        ).order_by(desc(MetricEvent.created_at)).limit(limit).all()
    
    def count_page_views(self, days: int = 7) -> int:
        """Count total page views"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        return self.db.query(MetricEvent).filter(
            MetricEvent.event_type == MetricEventType.PAGE_VIEW,
            MetricEvent.created_at >= start_date
        ).count()
    
    def count_unique_sessions(self, days: int = 7) -> int:
        """Count unique sessions"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        return self.db.query(func.count(func.distinct(MetricEvent.session_id))).filter(
            MetricEvent.created_at >= start_date,
            MetricEvent.session_id.isnot(None)
        ).scalar()
    
    def get_top_pages(self, days: int = 7, limit: int = 10) -> List[Dict[str, Any]]:
        """Get most viewed pages"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        results = self.db.query(
            MetricEvent.path,
            func.count(MetricEvent.id).label('view_count')
        ).filter(
            MetricEvent.event_type == MetricEventType.PAGE_VIEW,
            MetricEvent.created_at >= start_date,
            MetricEvent.path.isnot(None)
        ).group_by(MetricEvent.path).order_by(desc('view_count')).limit(limit).all()
        
        return [
            {"path": path, "view_count": count}
            for path, count in results
        ]
    
    def get_views_by_day(self, days: int = 30) -> List[Dict[str, Any]]:
        """Get page views grouped by day"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        results = self.db.query(
            func.date(MetricEvent.created_at).label('date'),
            func.count(MetricEvent.id).label('view_count')
        ).filter(
            MetricEvent.event_type == MetricEventType.PAGE_VIEW,
            MetricEvent.created_at >= start_date
        ).group_by(func.date(MetricEvent.created_at)).order_by('date').all()
        
        return [
            {"date": str(date), "view_count": count}
            for date, count in results
        ]
    
    def get_project_metrics(
        self,
        project_id: int,
        days: int = 30
    ) -> Dict[str, Any]:
        """Get metrics for specific project"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        view_count = self.db.query(func.count(MetricEvent.id)).filter(
            MetricEvent.event_type == MetricEventType.PROJECT_VIEW,
            MetricEvent.resource_id == project_id,
            MetricEvent.created_at >= start_date
        ).scalar()
        
        unique_visitors = self.db.query(
            func.count(func.distinct(MetricEvent.session_id))
        ).filter(
            MetricEvent.event_type == MetricEventType.PROJECT_VIEW,
            MetricEvent.resource_id == project_id,
            MetricEvent.created_at >= start_date,
            MetricEvent.session_id.isnot(None)
        ).scalar()
        
        return {
            "project_id": project_id,
            "view_count": view_count or 0,
            "unique_visitors": unique_visitors or 0,
            "period_days": days
        }
    
    def get_top_projects(self, days: int = 30, limit: int = 10) -> List[Dict[str, Any]]:
        """Get most viewed projects"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        results = self.db.query(
            MetricEvent.resource_id,
            func.count(MetricEvent.id).label('view_count')
        ).filter(
            MetricEvent.event_type == MetricEventType.PROJECT_VIEW,
            MetricEvent.resource_id.isnot(None),
            MetricEvent.created_at >= start_date
        ).group_by(MetricEvent.resource_id).order_by(desc('view_count')).limit(limit).all()
        
        return [
            {"project_id": project_id, "view_count": count}
            for project_id, count in results
        ]
    
    def delete_old_events(self, days: int = 90):
        """Delete events older than specified days"""
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        
        self.db.query(MetricEvent).filter(
            MetricEvent.created_at < cutoff_date
        ).delete()
        
        self.db.commit()
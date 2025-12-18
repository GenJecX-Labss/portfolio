"""
Analytics Service

Business logic for tracking and analyzing user behavior.
"""

from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session

from app.repositories.metrics_repo import MetricsRepository
from app.models.metric_event import MetricEvent
from app.core.constants import MetricEventType
from app.schemas.metrics import (
    PageViewMetrics,
    EngagementMetrics,
    DashboardMetrics
)


class AnalyticsService:
    """
    Analytics and metrics business logic.
    
    Business rules:
    - What events to track
    - How to aggregate metrics
    - Privacy considerations
    """
    
    def __init__(self, db: Session):
        self.repo = MetricsRepository(db)
    
    def track_event(
        self,
        event_type: MetricEventType,
        event_name: str,
        path: Optional[str] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[int] = None,
        metadata: Optional[Dict[str, Any]] = None,
        session_id: Optional[str] = None,
        user_id: Optional[str] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None
    ):
        """
        Track analytics event.
        
        Business rule: Anonymize user data for privacy.
        """
        event = MetricEvent(
            event_type=event_type,
            event_name=event_name,
            path=path,
            resource_type=resource_type,
            resource_id=resource_id,
            metadata=metadata or {},
            session_id=session_id,
            user_id=user_id,
            ip_address=self._anonymize_ip(ip_address),  # Privacy
            user_agent=user_agent,
            referrer=referrer
        )
        
        return self.repo.create(event)
    
    def _anonymize_ip(self, ip_address: Optional[str]) -> Optional[str]:
        """
        Anonymize IP address for privacy compliance.
        
        Business rule: Mask last octet of IPv4 addresses.
        """
        if not ip_address:
            return None
        
        # IPv4 anonymization
        if '.' in ip_address:
            parts = ip_address.split('.')
            if len(parts) == 4:
                return f"{parts[0]}.{parts[1]}.{parts[2]}.0"
        
        return ip_address
    
    def track_page_view(
        self,
        path: str,
        session_id: str,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None
    ):
        """Track page view (simplified)"""
        return self.track_event(
            event_type=MetricEventType.PAGE_VIEW,
            event_name="page_view",
            path=path,
            session_id=session_id,
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer
        )
    
    def track_project_view(
        self,
        project_id: int,
        session_id: str
    ):
        """Track project view"""
        return self.track_event(
            event_type=MetricEventType.PROJECT_VIEW,
            event_name="project_view",
            resource_type="project",
            resource_id=project_id,
            session_id=session_id
        )
    
    def get_page_view_metrics(self, days: int = 7) -> PageViewMetrics:
        """
        Get page view statistics.
        
        Business intelligence for understanding traffic.
        """
        total_views = self.repo.count_page_views(days)
        unique_sessions = self.repo.count_unique_sessions(days)
        top_pages = self.repo.get_top_pages(days, limit=10)
        views_by_day = self.repo.get_views_by_day(days)
        
        return PageViewMetrics(
            total_views=total_views,
            unique_sessions=unique_sessions,
            top_pages=top_pages,
            views_by_day=views_by_day
        )
    
    def get_engagement_metrics(self, days: int = 30) -> EngagementMetrics:
        """
        Get overall engagement metrics.
        
        Business intelligence for dashboard.
        """
        page_views = self.repo.count_page_views(days)
        unique_visitors = self.repo.count_unique_sessions(days)
        
        # Project views
        project_view_count = len(self.repo.get_by_type(
            MetricEventType.PROJECT_VIEW,
            days
        ))
        
        # Research downloads
        download_count = len(self.repo.get_by_type(
            MetricEventType.RESEARCH_DOWNLOAD,
            days
        ))
        
        # These would come from other services in real implementation
        audit_requests = 0  # From AuditService
        contact_submissions = 0  # From ContactService
        
        return EngagementMetrics(
            total_page_views=page_views,
            total_unique_visitors=unique_visitors,
            total_projects_viewed=project_view_count,
            total_research_downloads=download_count,
            total_audit_requests=audit_requests,
            total_contact_submissions=contact_submissions
        )
    
    def get_top_projects(self, days: int = 30, limit: int = 10) -> List[Dict]:
        """Get most viewed projects"""
        return self.repo.get_top_projects(days, limit)
    
    def cleanup_old_events(self, days: int = 90):
        """
        Remove old analytics events.
        
        Business rule: Keep data for 90 days by default.
        """
        self.repo.delete_old_events(days)
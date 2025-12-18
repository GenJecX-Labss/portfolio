"""
Metrics and Analytics Schemas

Pydantic models for analytics events and metrics.
"""

from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

from app.core.constants import MetricEventType


class MetricEventCreate(BaseModel):
    """Schema for creating analytics event"""
    event_type: MetricEventType
    event_name: str = Field(..., max_length=100)
    path: Optional[str] = Field(None, max_length=500)
    resource_type: Optional[str] = Field(None, max_length=50)
    resource_id: Optional[int] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    session_id: Optional[str] = Field(None, max_length=100)
    user_id: Optional[str] = Field(None, max_length=100)


class MetricEventResponse(BaseModel):
    """Metric event response"""
    id: int
    event_type: MetricEventType
    event_name: str
    path: Optional[str] = None
    resource_type: Optional[str] = None
    resource_id: Optional[int] = None
    metadata: Dict[str, Any]
    session_id: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class PageViewMetrics(BaseModel):
    """Page view statistics"""
    total_views: int
    unique_sessions: int
    top_pages: list[Dict[str, Any]]
    views_by_day: list[Dict[str, Any]]


class ProjectMetrics(BaseModel):
    """Project-specific metrics"""
    project_id: int
    project_title: str
    view_count: int
    unique_visitors: int
    avg_time_on_page: Optional[float] = None
    conversion_rate: Optional[float] = None  # e.g., clicks to demo


class AuditMetrics(BaseModel):
    """Audit request metrics"""
    total_requests: int
    requests_this_month: int
    conversion_rate: float
    avg_qualification_score: Optional[float] = None
    top_audit_types: list[Dict[str, Any]]


class EngagementMetrics(BaseModel):
    """Overall engagement metrics"""
    total_page_views: int
    total_unique_visitors: int
    total_projects_viewed: int
    total_research_downloads: int
    total_audit_requests: int
    total_contact_submissions: int
    bounce_rate: Optional[float] = None
    avg_session_duration: Optional[float] = None


class DashboardMetrics(BaseModel):
    """Comprehensive dashboard metrics"""
    page_views: PageViewMetrics
    engagement: EngagementMetrics
    audit_metrics: AuditMetrics
    top_projects: list[ProjectMetrics]
    period: str  # e.g., "last_7_days", "last_30_days"
    generated_at: datetime = Field(default_factory=datetime.utcnow)
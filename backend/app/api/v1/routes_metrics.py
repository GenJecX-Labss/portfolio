"""
Metrics API Routes

PUBLIC endpoint for analytics tracking.
"""

from fastapi import APIRouter, Depends, Request, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.analytics_service import AnalyticsService
from app.schemas.metrics import MetricEventCreate
from app.schemas.common import MessageResponse

router = APIRouter()


@router.post("/track", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def track_event(
    data: MetricEventCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Track analytics event.
    
    Use this to track:
    - Page views
    - Project views
    - CTA clicks
    - Research downloads
    
    The frontend should call this for important user interactions.
    """
    service = AnalyticsService(db)
    
    # Enrich event data with request info
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    referrer = request.headers.get("referer")
    
    service.track_event(
        event_type=data.event_type,
        event_name=data.event_name,
        path=data.path,
        resource_type=data.resource_type,
        resource_id=data.resource_id,
        event_metadata=data.metadata,
        session_id=data.session_id,
        user_id=data.user_id,
        ip_address=ip_address,
        user_agent=user_agent,
        referrer=referrer
    )
    
    return MessageResponse(
        message="Event tracked successfully",
        success=True
    )


@router.post("/page-view", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def track_page_view(
    request: Request,
    path: str = Query(..., description="Page path"),
    session_id: str = Query(..., description="Session ID"),
    db: Session = Depends(get_db)
):
    """
    Track page view (simplified endpoint).
    
    - **path**: Page path (e.g., "/projects/my-project")
    - **session_id**: User session ID (from client)
    """
    service = AnalyticsService(db)
    
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    referrer = request.headers.get("referer")
    
    service.track_page_view(
        path=path,
        session_id=session_id,
        ip_address=ip_address,
        user_agent=user_agent,
        referrer=referrer
    )
    
    return MessageResponse(
        message="Page view tracked",
        success=True
    )
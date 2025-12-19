"""
Rate Limiting

Request rate limiting to prevent abuse.
"""

from typing import Optional, Dict
from datetime import datetime, timedelta
from collections import defaultdict
from fastapi import Request, HTTPException, status

from app.core.logging import get_logger

logger = get_logger(__name__)


class InMemoryRateLimiter:
    """
    Simple in-memory rate limiter.
    
    For production, use Redis-based rate limiting.
    """
    
    def __init__(self):
        # Store: {key: [(timestamp, count), ...]}
        self.requests: Dict[str, list] = defaultdict(list)
        self.cleanup_interval = timedelta(hours=1)
        self.last_cleanup = datetime.utcnow()
    
    def _cleanup_old_requests(self):
        """Remove old request records"""
        if datetime.utcnow() - self.last_cleanup < self.cleanup_interval:
            return
        
        cutoff = datetime.utcnow() - timedelta(hours=24)
        
        for key in list(self.requests.keys()):
            self.requests[key] = [
                (ts, count) for ts, count in self.requests[key]
                if ts > cutoff
            ]
            
            if not self.requests[key]:
                del self.requests[key]
        
        self.last_cleanup = datetime.utcnow()
    
    def check_rate_limit(
        self,
        key: str,
        max_requests: int,
        window_seconds: int
    ) -> bool:
        """
        Check if request is within rate limit.
        
        Args:
            key: Unique identifier (IP, user ID, etc.)
            max_requests: Maximum requests allowed
            window_seconds: Time window in seconds
        
        Returns:
            True if within limit, False if exceeded
        """
        self._cleanup_old_requests()
        
        now = datetime.utcnow()
        cutoff = now - timedelta(seconds=window_seconds)
        
        # Count recent requests
        recent_requests = [
            count for ts, count in self.requests[key]
            if ts > cutoff
        ]
        
        current_count = sum(recent_requests)
        
        if current_count >= max_requests:
            logger.warning(
                "rate_limit_exceeded",
                key=key,
                current_count=current_count,
                max_requests=max_requests
            )
            return False
        
        # Record this request
        self.requests[key].append((now, 1))
        
        return True
    
    def get_remaining(
        self,
        key: str,
        max_requests: int,
        window_seconds: int
    ) -> int:
        """Get remaining requests in current window"""
        now = datetime.utcnow()
        cutoff = now - timedelta(seconds=window_seconds)
        
        recent_requests = [
            count for ts, count in self.requests[key]
            if ts > cutoff
        ]
        
        current_count = sum(recent_requests)
        return max(0, max_requests - current_count)


# Global rate limiter instance
rate_limiter = InMemoryRateLimiter()


def check_rate_limit(
    request: Request,
    max_per_minute: int = 60,
    max_per_hour: int = 1000
):
    """
    Rate limit middleware/dependency.
    
    Usage in routes:
    ```
    @router.post("/endpoint")
    def endpoint(request: Request):
        check_rate_limit(request)
        ...
    ```
    
    Args:
        request: FastAPI request
        max_per_minute: Max requests per minute
        max_per_hour: Max requests per hour
    
    Raises:
        HTTPException: If rate limit exceeded
    """
    # Get client identifier
    client_ip = request.client.host if request.client else "unknown"
    
    # Check per-minute limit
    if not rate_limiter.check_rate_limit(
        f"{client_ip}:minute",
        max_per_minute,
        60
    ):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded: {max_per_minute} requests per minute"
        )
    
    # Check per-hour limit
    if not rate_limiter.check_rate_limit(
        f"{client_ip}:hour",
        max_per_hour,
        3600
    ):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded: {max_per_hour} requests per hour"
        )


def check_endpoint_rate_limit(
    request: Request,
    endpoint: str,
    max_requests: int,
    window_seconds: int
):
    """
    Rate limit specific endpoint.
    
    Args:
        request: FastAPI request
        endpoint: Endpoint identifier
        max_requests: Max requests allowed
        window_seconds: Time window
    
    Raises:
        HTTPException: If rate limit exceeded
    """
    client_ip = request.client.host if request.client else "unknown"
    key = f"{client_ip}:{endpoint}"
    
    if not rate_limiter.check_rate_limit(key, max_requests, window_seconds):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded for {endpoint}"
        )
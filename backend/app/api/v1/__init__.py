"""
API v1 Routes

All API route modules are imported here for easy access in main.py
"""

from app.api.v1 import routes_projects
from app.api.v1 import routes_research
from app.api.v1 import routes_audits
from app.api.v1 import routes_contact
from app.api.v1 import routes_metrics
from app.api.v1 import routes_admin
from app.api.v1 import routes_reviews

__all__ = [
    "routes_projects",
    "routes_research",
    "routes_audits",
    "routes_contact",
    "routes_metrics",
    "routes_admin",
    "routes_reviews",
]

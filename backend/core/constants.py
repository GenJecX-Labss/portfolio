"""
Application Constants

All hardcoded values and enums used across the application.
"""

from enum import Enum


# ============================================================================
# PROJECT CONSTANTS
# ============================================================================

class ProjectStatus(str, Enum):
    """Project lifecycle status"""
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class ProjectVisibility(str, Enum):
    """Project visibility level"""
    PUBLIC = "public"
    PRIVATE = "private"
    SHOWCASE = "showcase"  # Featured on homepage


class ProjectCategory(str, Enum):
    """Project categories"""
    COMPUTER_VISION = "computer_vision"
    NLP = "nlp"
    REINFORCEMENT_LEARNING = "reinforcement_learning"
    GENERATIVE_AI = "generative_ai"
    TIME_SERIES = "time_series"
    OPTIMIZATION = "optimization"
    OTHER = "other"


# ============================================================================
# RESEARCH CONSTANTS
# ============================================================================

class ResearchType(str, Enum):
    """Type of research content"""
    PAPER = "paper"
    TECHNICAL_REPORT = "technical_report"
    ARCHITECTURE_DIAGRAM = "architecture_diagram"
    CASE_STUDY = "case_study"
    WHITE_PAPER = "white_paper"


class ResearchStatus(str, Enum):
    """Research publication status"""
    DRAFT = "draft"
    UNDER_REVIEW = "under_review"
    PUBLISHED = "published"
    ARCHIVED = "archived"


# ============================================================================
# AUDIT CONSTANTS
# ============================================================================

class AuditRequestStatus(str, Enum):
    """Status of audit requests"""
    PENDING = "pending"
    QUALIFIED = "qualified"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REJECTED = "rejected"


class AuditType(str, Enum):
    """Type of audit service"""
    ML_MODEL_REVIEW = "ml_model_review"
    ARCHITECTURE_REVIEW = "architecture_review"
    CODE_REVIEW = "code_review"
    PERFORMANCE_AUDIT = "performance_audit"
    SECURITY_AUDIT = "security_audit"
    CUSTOM = "custom"


class AuditPriority(str, Enum):
    """Priority level for audit requests"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


# ============================================================================
# CONTACT CONSTANTS
# ============================================================================

class ContactType(str, Enum):
    """Type of contact inquiry"""
    GENERAL = "general"
    AUDIT_REQUEST = "audit_request"
    PARTNERSHIP = "partnership"
    EMPLOYMENT = "employment"
    PRESS = "press"


class ContactStatus(str, Enum):
    """Status of contact form submissions"""
    NEW = "new"
    READ = "read"
    RESPONDED = "responded"
    SPAM = "spam"
    ARCHIVED = "archived"


# ============================================================================
# METRICS CONSTANTS
# ============================================================================

class MetricEventType(str, Enum):
    """Types of analytics events"""
    PAGE_VIEW = "page_view"
    PROJECT_VIEW = "project_view"
    RESEARCH_DOWNLOAD = "research_download"
    AUDIT_REQUEST_VIEW = "audit_request_view"
    CONTACT_FORM_VIEW = "contact_form_view"
    CTA_CLICK = "cta_click"


# ============================================================================
# USER/ADMIN CONSTANTS
# ============================================================================

class UserRole(str, Enum):
    """User roles"""
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"


# ============================================================================
# VALIDATION CONSTANTS
# ============================================================================

# Email validation
MAX_EMAIL_LENGTH = 255
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

# Text field lengths
MAX_TITLE_LENGTH = 200
MAX_DESCRIPTION_LENGTH = 2000
MAX_URL_LENGTH = 500
MAX_NAME_LENGTH = 100

# Pagination
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100

# Rate limiting
RATE_LIMIT_WINDOW_SECONDS = 60
CONTACT_FORM_RATE_LIMIT = 3  # Per hour per IP


# ============================================================================
# FILE CONSTANTS
# ============================================================================

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg"}
ALLOWED_DOCUMENT_EXTENSIONS = {".pdf", ".docx", ".md"}
MAX_FILE_SIZE_MB = 10
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024


# ============================================================================
# HTTP STATUS MESSAGES
# ============================================================================

SUCCESS_MESSAGES = {
    "project_created": "Project created successfully",
    "project_updated": "Project updated successfully",
    "project_deleted": "Project deleted successfully",
    "audit_submitted": "Audit request submitted successfully",
    "contact_submitted": "Contact form submitted successfully",
}

ERROR_MESSAGES = {
    "not_found": "Resource not found",
    "unauthorized": "Unauthorized access",
    "forbidden": "Access forbidden",
    "validation_error": "Validation error",
    "rate_limit": "Rate limit exceeded",
    "server_error": "Internal server error",
}
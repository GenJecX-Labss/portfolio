"""
Admin API Routes

PROTECTED endpoints for admin dashboard.
Requires JWT authentication.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.admin_service import AdminService
from app.services.project_service import ProjectService
from app.services.research_service import ResearchService
from app.services.audit_service import AuditService
from app.services.contact_service import ContactService
from app.schemas.admin import AdminLogin, TokenResponse, AdminUserResponse
from app.schemas.project import ProjectResponse, ProjectCreate, ProjectUpdate
from app.schemas.research import ResearchResponse, ResearchCreate, ResearchUpdate
from app.schemas.audit import AuditRequestResponse, AuditRequestUpdate, AuditRequestStats
from app.schemas.contact import ContactResponse, ContactUpdate, ContactStats
from app.security.auth import get_current_admin
from app.core.logging import get_logger

router = APIRouter()
logger = get_logger(__name__)


# ============================================================================
# AUTHENTICATION
# ============================================================================

@router.post("/login", response_model=TokenResponse)
def admin_login(
    credentials: AdminLogin,
    db: Session = Depends(get_db)
):
    """
    Admin login endpoint.
    
    Returns JWT token for authenticated requests.
    """
    service = AdminService(db)
    
    try:
        token_data = service.authenticate(
            credentials.email,
            credentials.password
        )
        
        if not token_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        logger.info(
            "admin_login_success",
            email=credentials.email
        )
        
        return token_data
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(
            "admin_login_failed",
            email=credentials.email,
            error=str(e),
            exc_info=True
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@router.get("/me", response_model=AdminUserResponse)
def get_current_user(
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get current admin user info"""
    service = AdminService(db)
    admin = service.get_admin_by_email(current_admin["email"])
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin user not found"
        )
    
    return AdminUserResponse.model_validate(admin, from_attributes=True)


# ============================================================================
# PROJECT MANAGEMENT
# ============================================================================

@router.get("/projects", response_model=List[ProjectResponse])
def list_all_projects(
    skip: int = 0,
    limit: int = 100,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get all projects (including drafts and private)"""
    service = ProjectService(db)
    projects = service.get_all_projects(skip, limit)
    return [ProjectResponse.model_validate(p, from_attributes=True) for p in projects]


@router.post("/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    data: ProjectCreate,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create new project"""
    service = ProjectService(db)
    project = service.create_project(data)
    
    logger.info(
        "project_created",
        project_id=project.id,
        title=project.title,
        admin_email=current_admin["email"]
    )
    
    return ProjectResponse.model_validate(project, from_attributes=True)


@router.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    data: ProjectUpdate,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update existing project"""
    service = ProjectService(db)
    project = service.update_project(project_id, data)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    logger.info(
        "project_updated",
        project_id=project.id,
        admin_email=current_admin["email"]
    )
    
    return ProjectResponse.model_validate(project, from_attributes=True)


@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Delete project"""
    service = ProjectService(db)
    success = service.delete_project(project_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    logger.info(
        "project_deleted",
        project_id=project_id,
        admin_email=current_admin["email"]
    )


# ============================================================================
# RESEARCH MANAGEMENT
# ============================================================================

@router.get("/research", response_model=List[ResearchResponse])
def list_all_research(
    skip: int = 0,
    limit: int = 100,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get all research (including drafts)"""
    service = ResearchService(db)
    research_items = service.get_all_admin(skip, limit)
    return [ResearchResponse.model_validate(r, from_attributes=True) for r in research_items]


@router.post("/research", response_model=ResearchResponse, status_code=status.HTTP_201_CREATED)
def create_research(
    data: ResearchCreate,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create new research"""
    service = ResearchService(db)
    research = service.create_research(data)
    
    logger.info(
        "research_created",
        research_id=research.id,
        title=research.title,
        admin_email=current_admin["email"]
    )
    
    return ResearchResponse.model_validate(research, from_attributes=True)


# ============================================================================
# AUDIT REQUEST MANAGEMENT
# ============================================================================

@router.get("/audits", response_model=List[AuditRequestResponse])
def list_audit_requests(
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get all audit requests"""
    service = AuditService(db)
    audits = service.get_all_requests(skip, limit, status)
    return [AuditRequestResponse.model_validate(a, from_attributes=True) for a in audits]


@router.get("/audits/stats", response_model=AuditRequestStats)
def get_audit_stats(
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get audit request statistics"""
    service = AuditService(db)
    return service.get_statistics()


@router.put("/audits/{audit_id}", response_model=AuditRequestResponse)
def update_audit_request(
    audit_id: int,
    data: AuditRequestUpdate,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update audit request"""
    service = AuditService(db)
    audit = service.update_audit_request(audit_id, data)
    
    if not audit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Audit request not found"
        )
    
    return AuditRequestResponse.model_validate(audit, from_attributes=True)


# ============================================================================
# CONTACT MANAGEMENT
# ============================================================================

@router.get("/contacts", response_model=List[ContactResponse])
def list_contacts(
    skip: int = 0,
    limit: int = 100,
    exclude_spam: bool = True,
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get all contact submissions"""
    service = ContactService(db)
    contacts = service.get_all_contacts(skip, limit, exclude_spam=exclude_spam)
    return [ContactResponse.model_validate(c, from_attributes=True) for c in contacts]


@router.get("/contacts/stats", response_model=ContactStats)
def get_contact_stats(
    current_admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get contact form statistics"""
    service = ContactService(db)
    return service.get_statistics()
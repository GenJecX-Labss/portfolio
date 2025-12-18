"""
Permissions and Role-Based Access Control

Define permissions for different user roles.
"""

from enum import Enum
from typing import List
from fastapi import HTTPException, status

from app.core.constants import UserRole


class Permission(str, Enum):
    """System permissions"""
    # Project permissions
    VIEW_PROJECTS = "view_projects"
    CREATE_PROJECT = "create_project"
    EDIT_PROJECT = "edit_project"
    DELETE_PROJECT = "delete_project"
    PUBLISH_PROJECT = "publish_project"
    
    # Research permissions
    VIEW_RESEARCH = "view_research"
    CREATE_RESEARCH = "create_research"
    EDIT_RESEARCH = "edit_research"
    DELETE_RESEARCH = "delete_research"
    PUBLISH_RESEARCH = "publish_research"
    
    # Audit permissions
    VIEW_AUDITS = "view_audits"
    EDIT_AUDITS = "edit_audits"
    QUALIFY_AUDITS = "qualify_audits"
    SCHEDULE_AUDITS = "schedule_audits"
    
    # Contact permissions
    VIEW_CONTACTS = "view_contacts"
    MANAGE_CONTACTS = "manage_contacts"
    
    # Analytics permissions
    VIEW_ANALYTICS = "view_analytics"
    EXPORT_ANALYTICS = "export_analytics"
    
    # Admin permissions
    MANAGE_USERS = "manage_users"
    MANAGE_SETTINGS = "manage_settings"
    VIEW_LOGS = "view_logs"


# Role-based permission mappings
ROLE_PERMISSIONS = {
    UserRole.VIEWER: [
        Permission.VIEW_PROJECTS,
        Permission.VIEW_RESEARCH,
        Permission.VIEW_AUDITS,
        Permission.VIEW_CONTACTS,
        Permission.VIEW_ANALYTICS,
    ],
    UserRole.EDITOR: [
        # All viewer permissions
        Permission.VIEW_PROJECTS,
        Permission.VIEW_RESEARCH,
        Permission.VIEW_AUDITS,
        Permission.VIEW_CONTACTS,
        Permission.VIEW_ANALYTICS,
        # Editor-specific permissions
        Permission.CREATE_PROJECT,
        Permission.EDIT_PROJECT,
        Permission.CREATE_RESEARCH,
        Permission.EDIT_RESEARCH,
        Permission.EDIT_AUDITS,
        Permission.MANAGE_CONTACTS,
    ],
    UserRole.ADMIN: [
        # All editor permissions
        Permission.VIEW_PROJECTS,
        Permission.VIEW_RESEARCH,
        Permission.VIEW_AUDITS,
        Permission.VIEW_CONTACTS,
        Permission.VIEW_ANALYTICS,
        Permission.CREATE_PROJECT,
        Permission.EDIT_PROJECT,
        Permission.CREATE_RESEARCH,
        Permission.EDIT_RESEARCH,
        Permission.EDIT_AUDITS,
        Permission.MANAGE_CONTACTS,
        # Admin-specific permissions
        Permission.DELETE_PROJECT,
        Permission.PUBLISH_PROJECT,
        Permission.DELETE_RESEARCH,
        Permission.PUBLISH_RESEARCH,
        Permission.QUALIFY_AUDITS,
        Permission.SCHEDULE_AUDITS,
        Permission.EXPORT_ANALYTICS,
        Permission.MANAGE_USERS,
        Permission.MANAGE_SETTINGS,
        Permission.VIEW_LOGS,
    ],
}


def get_role_permissions(role: UserRole) -> List[Permission]:
    """
    Get all permissions for a role.
    
    Args:
        role: User role
    
    Returns:
        List of permissions
    """
    return ROLE_PERMISSIONS.get(role, [])


def has_permission(role: UserRole, permission: Permission) -> bool:
    """
    Check if role has specific permission.
    
    Args:
        role: User role
        permission: Permission to check
    
    Returns:
        True if role has permission
    """
    return permission in get_role_permissions(role)


def require_permission(current_admin: dict, permission: Permission):
    """
    Verify admin has required permission.
    
    Use this in route handlers:
    ```
    @router.post("/projects")
    def create_project(current_admin: dict = Depends(get_current_admin)):
        require_permission(current_admin, Permission.CREATE_PROJECT)
        ...
    ```
    
    Args:
        current_admin: Admin data from token
        permission: Required permission
    
    Raises:
        HTTPException: If admin lacks permission
    """
    role = current_admin.get("role")
    
    if not role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No role assigned"
        )
    
    # Superusers bypass all permission checks
    if current_admin.get("is_superuser"):
        return
    
    # Check role permissions
    role_enum = UserRole(role)
    if not has_permission(role_enum, permission):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Permission denied: {permission.value}"
        )


def require_any_permission(
    current_admin: dict,
    permissions: List[Permission]
):
    """
    Verify admin has at least one of the required permissions.
    
    Args:
        current_admin: Admin data from token
        permissions: List of acceptable permissions
    
    Raises:
        HTTPException: If admin lacks all permissions
    """
    role = current_admin.get("role")
    
    if not role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No role assigned"
        )
    
    # Superusers bypass all permission checks
    if current_admin.get("is_superuser"):
        return
    
    # Check if has any of the permissions
    role_enum = UserRole(role)
    has_any = any(
        has_permission(role_enum, perm)
        for perm in permissions
    )
    
    if not has_any:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied: insufficient privileges"
        )
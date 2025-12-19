"""
Admin User Service

Business logic for admin authentication and management.
"""

from typing import Optional
from datetime import timedelta
from sqlalchemy.orm import Session

from app.models.admin_user import AdminUser
from app.schemas.admin import TokenResponse, AdminUserResponse, AdminUserCreate
from app.security.auth import verify_password, hash_password, create_access_token
from app.core.config import settings
from app.core.constants import UserRole


class AdminService:
    """Admin user management business logic"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def authenticate(
        self,
        email: str,
        password: str
    ) -> Optional[TokenResponse]:
        """
        Authenticate admin user and return JWT token.
        
        Business rules:
        - Verify email and password
        - Check if user is active
        - Track login attempt
        - Create JWT token with user data
        """
        # Find admin user
        admin = self.db.query(AdminUser).filter(
            AdminUser.email == email
        ).first()
        
        if not admin:
            return None
        
        # Verify password
        if not verify_password(password, admin.hashed_password):
            # Track failed login
            admin.failed_login_attempts += 1
            self.db.commit()
            return None
        
        # Check if account is active
        if not admin.is_active:
            return None
        
        # Check if account is locked
        if admin.is_locked:
            return None
        
        # Reset failed attempts on successful login
        admin.failed_login_attempts = 0
        admin.last_login_at = None  # Set in route
        self.db.commit()
        
        # Create access token
        access_token_expires = timedelta(
            minutes=settings.ADMIN_TOKEN_EXPIRE_MINUTES
        )
        
        access_token = create_access_token(
            data={
                "sub": admin.email,
                "user_id": admin.id,
                "role": admin.role,
                "is_superuser": admin.is_superuser
            },
            expires_delta=access_token_expires
        )
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.ADMIN_TOKEN_EXPIRE_MINUTES * 60,
            user=AdminUserResponse.model_validate(admin, from_attributes=True)
        )
    
    def get_admin_by_id(self, admin_id: int) -> Optional[AdminUser]:
        """Get admin user by ID"""
        return self.db.query(AdminUser).filter(
            AdminUser.id == admin_id
        ).first()
    
    def get_admin_by_email(self, email: str) -> Optional[AdminUser]:
        """Get admin user by email"""
        return self.db.query(AdminUser).filter(
            AdminUser.email == email
        ).first()
    
    def create_admin(self, data: AdminUserCreate) -> AdminUser:
        """
        Create new admin user.
        
        Business rule: Hash password before storing.
        """
        admin = AdminUser(
            email=data.email,
            hashed_password=hash_password(data.password),
            full_name=data.full_name,
            role=data.role,
            is_active=data.is_active,
            is_superuser=data.is_superuser
        )
        
        self.db.add(admin)
        self.db.commit()
        self.db.refresh(admin)
        
        return admin
    
    def update_password(
        self,
        admin_id: int,
        new_password: str
    ) -> Optional[AdminUser]:
        """Update admin password"""
        admin = self.get_admin_by_id(admin_id)
        if not admin:
            return None
        
        admin.hashed_password = hash_password(new_password)
        self.db.commit()
        self.db.refresh(admin)
        
        return admin
    
    def deactivate_admin(self, admin_id: int) -> Optional[AdminUser]:
        """Deactivate admin user"""
        admin = self.get_admin_by_id(admin_id)
        if not admin:
            return None
        
        admin.is_active = False
        self.db.commit()
        
        return admin
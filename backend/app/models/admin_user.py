"""
Admin User Model

Represents internal team members with admin access.
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum, Boolean
from sqlalchemy.sql import func

from app.core.database import Base
from app.core.constants import UserRole


class AdminUser(Base):
    """
    Admin user model.
    
    Internal team members with access to admin dashboard.
    """
    __tablename__ = "admin_users"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Authentication
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    
    # Profile
    full_name = Column(String(100), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.VIEWER, nullable=False, index=True)
    
    # Status
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    is_superuser = Column(Boolean, default=False, nullable=False)
    
    # Activity Tracking
    last_login_at = Column(DateTime, nullable=True)
    last_login_ip = Column(String(45), nullable=True)
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime, nullable=True)
    
    # Dates
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<AdminUser(id={self.id}, email='{self.email}', role='{self.role}')>"
    
    @property
    def can_edit(self) -> bool:
        """Check if user can edit content"""
        return self.role in [UserRole.ADMIN, UserRole.EDITOR] and self.is_active
    
    @property
    def can_delete(self) -> bool:
        """Check if user can delete content"""
        return self.role == UserRole.ADMIN and self.is_active
    
    @property
    def is_locked(self) -> bool:
        """Check if account is locked"""
        if self.locked_until and self.locked_until > func.now():
            return True
        return False
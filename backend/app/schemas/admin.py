"""
Admin Schemas

Pydantic models for admin authentication and management.
"""

from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

from app.core.constants import UserRole


class AdminLogin(BaseModel):
    """Admin login credentials"""
    email: EmailStr
    password: str = Field(..., min_length=8)


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds
    user: "AdminUserResponse"


class AdminUserBase(BaseModel):
    """Base admin user schema"""
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=100)
    role: UserRole = UserRole.ADMIN


class AdminUserCreate(AdminUserBase):
    """Schema for creating admin user"""
    password: str = Field(..., min_length=8)
    is_active: bool = True
    is_superuser: bool = False


class AdminUserUpdate(BaseModel):
    """Schema for updating admin user"""
    email: Optional[EmailStr] = None
    full_name: Optional[str] = Field(None, min_length=1, max_length=100)
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class AdminUserResponse(AdminUserBase):
    """Admin user response"""
    id: int
    is_active: bool
    is_superuser: bool
    last_login_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ChangePassword(BaseModel):
    """Change password schema"""
    current_password: str = Field(..., min_length=8)
    new_password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)


# Update forward reference
TokenResponse.model_rebuild()

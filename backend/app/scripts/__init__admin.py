#!/usr/bin/env python3
"""
Initialize Admin User

Creates the first admin user from environment variables.
Run this after database setup.
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, init_db
from app.models.admin_user import AdminUser
from app.security.auth import hash_password
from app.core.config import settings
from app.core.constants import UserRole


def create_initial_admin():
    """Create initial admin user from environment variables"""
    print("Initializing database...")
    init_db()
    
    db: Session = SessionLocal()
    
    try:
        # Check if admin already exists
        existing_admin = db.query(AdminUser).filter(
            AdminUser.email == settings.ADMIN_EMAIL
        ).first()
        
        if existing_admin:
            print(f"✓ Admin user already exists: {settings.ADMIN_EMAIL}")
            print(f"  Role: {existing_admin.role}")
            print(f"  Active: {existing_admin.is_active}")
            return
        
        # Create admin user
        print(f"\nCreating admin user...")
        print(f"  Email: {settings.ADMIN_EMAIL}")
        print(f"  Password: {settings.ADMIN_PASSWORD}")
        
        admin = AdminUser(
            email=settings.ADMIN_EMAIL,
            hashed_password=hash_password(settings.ADMIN_PASSWORD),
            full_name="System Administrator",
            role=UserRole.ADMIN,
            is_superuser=True,
            is_active=True
        )
        
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        print(f"\n✓ Admin user created successfully!")
        print(f"  ID: {admin.id}")
        print(f"  Email: {admin.email}")
        print(f"  Role: {admin.role}")
        print(f"\n⚠️  IMPORTANT: Change the admin password after first login!")
        
    except Exception as e:
        print(f"\n✗ Error creating admin user: {e}")
        db.rollback()
        sys.exit(1)
    
    finally:
        db.close()


if __name__ == "__main__":
    print("="*60)
    print("GenJecX Backend - Admin User Initialization")
    print("="*60)
    
    create_initial_admin()
    
    print("\n" + "="*60)
    print("Initialization complete!")
    print("="*60)
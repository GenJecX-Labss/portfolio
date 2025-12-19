"""
Test Configuration

Pytest fixtures and test database setup.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator

from app.main import app
from app.core.database import Base, get_db
from app.models import *  # Import all models
from app.security.auth import create_access_token

# Test database URL (in-memory SQLite)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create test engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create test session factory
TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


@pytest.fixture(scope="function")
def db() -> Generator:
    """
    Create a fresh database for each test.
    """
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Create session
    db = TestingSessionLocal()
    
    try:
        yield db
    finally:
        db.close()
    
    # Drop tables
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db) -> Generator:
    """
    Create a test client with overridden database dependency.
    """
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()


@pytest.fixture
def admin_token() -> str:
    """
    Create admin JWT token for testing protected endpoints.
    """
    return create_access_token(
        data={
            "sub": "test@admin.com",
            "user_id": 1,
            "role": "admin",
            "is_superuser": True
        }
    )


@pytest.fixture
def auth_headers(admin_token: str) -> dict:
    """
    Create authorization headers for testing.
    """
    return {
        "Authorization": f"Bearer {admin_token}"
    }
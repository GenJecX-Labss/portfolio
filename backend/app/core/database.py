"""
Database Configuration Module

SQLAlchemy engine, session management, and base model.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

from app.core.config import settings

# Create SQLAlchemy engine
# Handle SQLite vs PostgreSQL differently
if settings.DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        settings.DATABASE_URL,
        echo=settings.DB_ECHO,
        connect_args={"check_same_thread": False}  # Required for SQLite with FastAPI
    )
else:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_size=settings.DB_POOL_SIZE,
        max_overflow=settings.DB_MAX_OVERFLOW,
        echo=settings.DB_ECHO,
        pool_pre_ping=True,  # Verify connections before using
        pool_recycle=3600,  # Recycle connections after 1 hour
    )

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    Database session dependency.
    
    Use this in FastAPI route dependencies:
    ```
    @router.get("/items")
    def get_items(db: Session = Depends(get_db)):
        ...
    ```
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    Initialize database (create all tables).
    Use migrations in production instead.
    """
    Base.metadata.create_all(bind=engine)


def drop_db():
    """
    Drop all tables (DANGEROUS - development only).
    """
    if not settings.is_development:
        raise RuntimeError("Cannot drop database in production")
    Base.metadata.drop_all(bind=engine)
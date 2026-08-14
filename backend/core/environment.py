"""
Environment Detection and Configuration

Utilities for detecting and managing different environments.
"""

import os
from enum import Enum


class Environment(str, Enum):
    """Application environment types"""
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"
    TESTING = "testing"


def get_environment() -> Environment:
    """
    Detect current environment from ENV variable.
    
    Returns:
        Environment enum value
    """
    env_str = os.getenv("ENVIRONMENT", "development").lower()
    
    env_mapping = {
        "dev": Environment.DEVELOPMENT,
        "development": Environment.DEVELOPMENT,
        "stage": Environment.STAGING,
        "staging": Environment.STAGING,
        "prod": Environment.PRODUCTION,
        "production": Environment.PRODUCTION,
        "test": Environment.TESTING,
        "testing": Environment.TESTING,
    }
    
    return env_mapping.get(env_str, Environment.DEVELOPMENT)


def is_production() -> bool:
    """Check if running in production"""
    return get_environment() == Environment.PRODUCTION


def is_development() -> bool:
    """Check if running in development"""
    return get_environment() == Environment.DEVELOPMENT


def is_testing() -> bool:
    """Check if running tests"""
    return get_environment() == Environment.TESTING


def get_database_url() -> str:
    """
    Get appropriate database URL for current environment.
    
    Returns:
        Database connection string
    """
    env = get_environment()
    
    if env == Environment.TESTING:
        return os.getenv(
            "TEST_DATABASE_URL",
            "postgresql://genjecx_user:genjecx_password@localhost:5432/genjecx_test"
        )
    
    return os.getenv(
        "DATABASE_URL",
        "postgresql://genjecx_user:genjecx_password@localhost:5432/genjecx_db"
    )


def get_cors_origins() -> list:
    """
    Get CORS origins based on environment.
    
    Returns:
        List of allowed origins
    """
    env = get_environment()
    
    if env == Environment.PRODUCTION:
        return [
            "https://genjecxlabs.com",
            "https://www.genjecxlabs.com",
        ]
    elif env == Environment.STAGING:
        return [
            "https://staging.genjecxlabs.com",
            "http://localhost:3000",
        ]
    else:  # Development/Testing
        return [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:8080",
        ]


class FeatureFlags:
    """
    Feature flags for environment-specific functionality.
    """
    
    def __init__(self):
        self.env = get_environment()
    
    @property
    def enable_docs(self) -> bool:
        """Enable API documentation"""
        return self.env != Environment.PRODUCTION
    
    @property
    def enable_analytics(self) -> bool:
        """Enable analytics tracking"""
        return self.env in [Environment.STAGING, Environment.PRODUCTION]
    
    @property
    def enable_rate_limiting(self) -> bool:
        """Enable rate limiting"""
        return self.env in [Environment.STAGING, Environment.PRODUCTION]
    
    @property
    def enable_email_notifications(self) -> bool:
        """Enable email notifications"""
        return self.env == Environment.PRODUCTION
    
    @property
    def strict_validation(self) -> bool:
        """Enable strict input validation"""
        return self.env in [Environment.STAGING, Environment.PRODUCTION]


# Global feature flags instance
feature_flags = FeatureFlags()
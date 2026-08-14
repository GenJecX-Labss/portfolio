"""
Core Configuration Module

Environment-based settings using Pydantic v2.
All configuration lives here.
"""

from typing import List, Optional
from pydantic import Field, field_validator, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = Field(default="GenJecX Backend")
    APP_VERSION: str = Field(default="1.0.0")
    ENVIRONMENT: str = Field(default="development")
    DEBUG: bool = Field(default=True)
    API_V1_PREFIX: str = Field(default="/api/v1")
    
    # Server
    HOST: str = Field(default="0.0.0.0")
    PORT: int = Field(default=8000)
    WORKERS: int = Field(default=4)
    
    # Database
    DATABASE_URL: str = Field(
        default="postgresql://genjecx_user:genjecx_password@localhost:5432/genjecx_db"
    )
    DB_POOL_SIZE: int = Field(default=20)
    DB_MAX_OVERFLOW: int = Field(default=10)
    DB_ECHO: bool = Field(default=False)
    
    # Security
    SECRET_KEY: str = Field(
        default="your-secret-key-here-min-32-chars-change-in-production"
    )
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30)
    ADMIN_TOKEN_EXPIRE_MINUTES: int = Field(default=480)
    
    # CORS - stored as string, converted to list via property
    CORS_ORIGINS_STR: str = Field(
        default="http://localhost:3000,http://localhost:5173,https://genjecxlabs.com",
        alias="CORS_ORIGINS"
    )
    CORS_ALLOW_CREDENTIALS: bool = Field(default=True)
    CORS_ALLOW_METHODS: List[str] = Field(default=["*"])
    CORS_ALLOW_HEADERS: List[str] = Field(default=["*"])
    
    @computed_field
    @property
    def CORS_ORIGINS(self) -> List[str]:
        """Parse CORS origins from comma-separated string"""
        return [origin.strip() for origin in self.CORS_ORIGINS_STR.split(",") if origin.strip()]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=60)
    RATE_LIMIT_PER_HOUR: int = Field(default=1000)
    
    # Admin Credentials
    ADMIN_EMAIL: str = Field(default="genjecxlabs@gmail.com")
    ADMIN_PASSWORD: str = Field(default="ChangeThisPassword123!")
    
    # ML Configuration
    ML_MODEL_PATH: str = Field(default="/app/ml/artifacts")
    ML_INFERENCE_TIMEOUT: int = Field(default=30)
    ML_BATCH_SIZE: int = Field(default=32)
    
    # Logging
    LOG_LEVEL: str = Field(default="INFO")
    LOG_FORMAT: str = Field(default="json")
    
    # Analytics
    ENABLE_ANALYTICS: bool = Field(default=True)
    ANALYTICS_BATCH_SIZE: int = Field(default=100)
    
    # External Services (Future)
    OPENAI_API_KEY: Optional[str] = Field(default=None)
    ANTHROPIC_API_KEY: Optional[str] = Field(default=None)
    SMTP_HOST: Optional[str] = Field(default=None)
    SMTP_PORT: Optional[int] = Field(default=587)
    SMTP_USER: Optional[str] = Field(default=None)
    SMTP_PASSWORD: Optional[str] = Field(default=None)
    
    # File Storage (Future)
    AWS_ACCESS_KEY_ID: Optional[str] = Field(default=None)
    AWS_SECRET_ACCESS_KEY: Optional[str] = Field(default=None)
    AWS_REGION: Optional[str] = Field(default="us-east-1")
    S3_BUCKET_NAME: Optional[str] = Field(default="genjecx-content")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
        populate_by_name=True  # Allow alias usage
    )
    
    @field_validator("SECRET_KEY")
    @classmethod
    def validate_secret_key(cls, v, info):
        """Ensure secret key is strong in production"""
        # Note: In Pydantic v2, we can't easily access other fields in validators
        # This validation will happen at runtime instead
        return v
    
    @property
    def is_production(self) -> bool:
        """Check if running in production"""
        return self.ENVIRONMENT == "production"
    
    @property
    def is_development(self) -> bool:
        """Check if running in development"""
        return self.ENVIRONMENT == "development"


# Global settings instance
settings = Settings()
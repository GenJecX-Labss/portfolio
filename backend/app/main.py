"""
GenJecX Backend - Main Application Entry Point

This is the application initialization file. It contains:
- App configuration
- Middleware setup
- Router registration
- Startup/shutdown events

NO business logic, NO database queries, NO model logic.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import structlog
import time
import uuid

from app.core.config import settings
from app.core.database import engine, Base
from app.core.logging import setup_logging
from app.api.v1 import (
    routes_projects,
    routes_research,
    routes_audits,
    routes_contact,
    routes_metrics,
    routes_admin
)

# Initialize structured logging
setup_logging()
logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("application_starting", environment=settings.ENVIRONMENT)
    
    # Create database tables (in production, use migrations)
    if settings.DEBUG:
        Base.metadata.create_all(bind=engine)
        logger.info("database_tables_created")
    
    yield
    
    # Shutdown
    logger.info("application_shutting_down")


# Initialize FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    description="Enterprise-grade backend for AI/ML research portfolio and client acquisition",
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan,
)


# ============================================================================
# MIDDLEWARE CONFIGURATION
# ============================================================================

# CORS Middleware - Development mode allows all localhost ports
if settings.is_development:
    # In development, allow all localhost origins
    cors_origins = [
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:3002",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:5173",
    ]
else:
    cors_origins = settings.CORS_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "X-Process-Time"],
)


# Request Timing and ID Middleware (combined to ensure request_id is always set first)
@app.middleware("http")
async def request_middleware(request: Request, call_next):
    """Add request ID and log all requests with timing information"""
    # Set request ID first
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    
    start_time = time.time()
    
    logger.info(
        "request_started",
        method=request.method,
        path=request.url.path,
        request_id=request_id
    )
    
    response = await call_next(request)
    
    process_time = time.time() - start_time
    
    logger.info(
        "request_completed",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        duration_ms=round(process_time * 1000, 2),
        request_id=request_id
    )
    
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = str(process_time)
    
    return response


# ============================================================================
# EXCEPTION HANDLERS
# ============================================================================

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    request_id = getattr(request.state, 'request_id', 'unknown')
    logger.warning(
        "validation_error",
        path=request.url.path,
        errors=exc.errors(),
        request_id=request_id
    )
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": exc.errors(),
            "request_id": request_id
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected errors"""
    request_id = getattr(request.state, 'request_id', 'unknown')
    logger.error(
        "unhandled_exception",
        path=request.url.path,
        error=str(exc),
        request_id=request_id,
        exc_info=True
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "request_id": request_id
        }
    )


# ============================================================================
# HEALTH CHECK & ROOT ENDPOINTS
# ============================================================================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "operational",
        "environment": settings.ENVIRONMENT
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": settings.APP_VERSION
    }


# ============================================================================
# ROUTER REGISTRATION
# ============================================================================

# API v1 Routes
app.include_router(
    routes_projects.router,
    prefix=f"{settings.API_V1_PREFIX}/projects",
    tags=["Projects"]
)

app.include_router(
    routes_research.router,
    prefix=f"{settings.API_V1_PREFIX}/research",
    tags=["Research"]
)

app.include_router(
    routes_audits.router,
    prefix=f"{settings.API_V1_PREFIX}/audits",
    tags=["Audits"]
)

app.include_router(
    routes_contact.router,
    prefix=f"{settings.API_V1_PREFIX}/contact",
    tags=["Contact"]
)

app.include_router(
    routes_metrics.router,
    prefix=f"{settings.API_V1_PREFIX}/metrics",
    tags=["Metrics"]
)

app.include_router(
    routes_admin.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["Admin"]
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from project root
load_dotenv(dotenv_path="../.env")

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("VibeCutAI")

# Create FastAPI app
app = FastAPI(
    title="VibeCut AI - Smart Video SaaS Platform",
    version="2.1.0",
    description="Automated short-form video editing and mascot animation generation platform with multi-agent orchestration",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include API routers directly (this will avoid circular imports by importing at runtime)
try:
    # Import API routers
    from app.api.video import router as video_router
    from app.api.skills import router as skills_router
    from app.api.agents import router as agents_router

    # Include API routers
    app.include_router(video_router, prefix="/api/v1")
    app.include_router(skills_router, prefix="/api/v1")
    app.include_router(agents_router, prefix="/api/v1")

    logger.info("Successfully imported API routers")
except ImportError as e:
    logger.error(f"Failed to import API routers: {e}")
    print(f"Import error: {e}")
    # Create dummy routers for now
    from fastapi import APIRouter
    dummy_router = APIRouter()

    @dummy_router.get("/api/v1/health")
    async def health():
        return {"status": "degraded", "error": "API modules failed to load"}

    app.include_router(dummy_router)
    logger.warning("Running with minimal API functionality due to import errors")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to VibeCut AI - Smart Video SaaS Platform",
        "version": "2.1.0",
        "description": "Automated short-form video editing and mascot animation generation platform with multi-agent orchestration",
        "docs": "/docs",
        "health": "/health"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "VibeCut AI Video Editor",
        "version": "2.1.0",
        "environment": os.getenv("APP_ENV", "development")
    }

# Legacy endpoints for backward compatibility (redirect to new system)
@app.post("/api/v1/webhook/notion-qc")
async def legacy_notion_webhook():
    return {
        "message": "Legacy endpoint redirected. Use /api/v1/agents/pipeline/health for agent status.",
        "status": "redirected"
    }

logger.info("VibeCut AI FastAPI application initialized successfully")
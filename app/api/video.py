from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from typing import Dict, Any
import os
import uuid
from datetime import datetime

from ..models.schemas import UploadResponse, ProcessingStatus
from ..orchestrator.agent_pipeline import AgentPipeline

router = APIRouter()

# Initialize agent pipeline
pipeline = AgentPipeline()

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_video(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
) -> UploadResponse:
    """
    Upload a video file for processing
    """
    # Validate file type
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save file
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")
    
    # Create response
    task_id = f"task_{unique_filename}"
    response = UploadResponse(
        project_id=task_id,
        filename=unique_filename,
        status=ProcessingStatus.UPLOADED,
        uploaded_at=datetime.now()
    )
    
    # For now, we'll just acknowledge the upload
    # In a full implementation, we would start processing here
    # background_tasks.add_task(process_video_background, task_id, file_path)
    
    return response

@router.get("/health")
async def video_health() -> Dict[str, Any]:
    """
    Health check for video processing service
    """
    return {
        "status": "healthy",
        "service": "Video Processing",
        "timestamp": datetime.now().isoformat()
    }

@router.get("/{project_id}/status")
async def get_video_status(project_id: str) -> Dict[str, Any]:
    """
    Get processing status for a specific video
    """
    # In a full implementation, this would check the actual processing status
    return {
        "project_id": project_id,
        "status": "not_implemented",
        "message": "Video status tracking not implemented in this minimal version"
    }
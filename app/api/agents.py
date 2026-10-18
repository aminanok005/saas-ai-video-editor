from fastapi import APIRouter, BackgroundTasks
from typing import Dict, Any
import logging
from datetime import datetime

from ..orchestrator.agent_pipeline import AgentPipeline

router = APIRouter()

# Initialize agent pipeline (singleton pattern)
pipeline = AgentPipeline()

logger = logging.getLogger("AgentsAPI")

@router.get("/pipeline/health")
async def get_pipeline_health() -> Dict[str, Any]:
    """
    Get overall pipeline health status
    """
    try:
        agent_infos = pipeline.get_agent_infos()
        active_tasks = pipeline.get_all_statuses()
        
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "agents": agent_infos,
            "active_tasks_count": len(active_tasks),
            "message": "Agent pipeline is operational"
        }
    except Exception as e:
        logger.error(f"Failed to get pipeline health: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

@router.post("/video/process")
async def process_video_endpoint(
    video_id: str,
    skill_name: str,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Endpoint to process video through the agent pipeline
    """
    try:
        # For now, we'll simulate video processing
        # In a real implementation, this would retrieve the actual video file
        video_path = f"./uploads/{video_id}"
        audio_path = f"./temp/{video_id}.wav"
        transcript = f"This is a placeholder transcript for video {video_id}. "
        
        # Add background task for processing
        background_tasks.add_task(
            pipeline.run_pipeline,
            f"project_{video_id}",
            video_path,
            audio_path,
            transcript,
            skill_name
        )
        
        return {
            "message": f"Processing started for video {video_id} with skill {skill_name}",
            "video_id": video_id,
            "skill_name": skill_name,
            "status": "processing_started"
        }
    except Exception as e:
        logger.error(f"Failed to start video processing: {e}")
        return {
            "error": str(e),
            "status": "processing_failed"
        }

@router.get("/agents/status")
async def get_agents_status() -> Dict[str, Any]:
    """
    Get status of all agents in the pipeline
    """
    try:
        agent_infos = pipeline.get_agent_infos()
        return {
            "agents": agent_infos,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Failed to get agents status: {e}")
        return {
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

@router.get("/agents/{agent_name}/info")
async def get_agent_info(agent_name: str) -> Dict[str, Any]:
    """
    Get detailed information about a specific agent
    """
    try:
        agent_infos = pipeline.get_agent_infos()
        if agent_name in agent_infos:
            return {
                "agent": agent_infos[agent_name],
                "timestamp": datetime.now().isoformat()
            }
        else:
            return {"error": f"Agent '{agent_name}' not found"}
    except Exception as e:
        logger.error(f"Failed to get agent info: {e}")
        return {
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }
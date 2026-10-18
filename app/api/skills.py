from fastapi import APIRouter
from typing import Dict, List, Any
import json
from datetime import datetime

router = APIRouter()

# Define skills configuration without any sensitive data
SKILLS_CONFIG = {
    "ROI_LONG_AMB": {
        "name": "Long-Form Podcast & Executive Briefing",
        "description": "Casual, professional, comfortable pacing without hyperactive jump cuts",
        "aspect_ratio": "16:9",
        "best_for": ["Podcasts", "Executive briefings", "Long-form content"],
        "processing_time_min": 60,
        "price_thb": 800,
        "created_at": datetime.now().isoformat(),
        "editing_philosophy": "Production-ready",
        "execution_rules": {"target_turnaround_min": 15},
        "brand_constraints": {"palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212"]},
        "graphics": {"callouts": True, "logos": True, "text_overlays": True},
        "audio": {"bgm_ducking": True, "voice_enhancement": True}
    },
    "NATIVE_SHORT_REELS": {
        "name": "Viral Short-Form High-Retention Reels",
        "description": "Fast-paced, high retention, animated graphic callouts, strict Top-65% safe zone",
        "aspect_ratio": "9:16",
        "best_for": ["TikTok", "Instagram Reels", "Viral content"],
        "processing_time_min": 15,
        "price_thb": 300,
        "created_at": datetime.now().isoformat(),
        "editing_philosophy": "High engagement, retention-focused",
        "execution_rules": {"target_turnaround_min": 15},
        "brand_constraints": {"palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212"]},
        "graphics": {"callouts": True, "logos": False, "text_overlays": True},
        "audio": {"bgm_ducking": True, "voice_enhancement": True}
    },
    "MASCOT_ANIMATION_AD": {
        "name": "2D/3D Brand Mascot Animation Ad",
        "description": "Story-driven character ad with emotional voice synthesis",
        "aspect_ratio": "9:16",
        "best_for": ["Promotional ads", "Brand mascots", "Character storytelling"],
        "processing_time_min": 30,
        "price_thb": 600,
        "created_at": datetime.now().isoformat(),
        "editing_philosophy": "Brand storytelling",
        "execution_rules": {"target_turnaround_min": 15},
        "brand_constraints": {"palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212"]},
        "graphics": {"callouts": False, "logos": True, "text_overlays": False},
        "audio": {"bgm_ducking": False, "voice_enhancement": True}
    },
    "QUICK_DRAFT_GENERATOR": {
        "name": "15-Minute Rapid Draft Engine",
        "description": "Speed-first execution, focus on trimming pauses and matching reference pacing",
        "aspect_ratio": "9:16",
        "best_for": ["Quick drafts", "Reference matching", "Rapid prototyping"],
        "processing_time_min": 15,
        "price_thb": 200,
        "created_at": datetime.now().isoformat(),
        "editing_philosophy": "Speed and efficiency",
        "execution_rules": {"target_turnaround_min": 15},
        "brand_constraints": {"palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212"]},
        "graphics": {"callouts": True, "logos": False, "text_overlays": True},
        "audio": {"bgm_ducking": True, "voice_enhancement": False}
    },
    "BRAND_ASSET_INJECTOR": {
        "name": "Brand Kit & Asset Handling",
        "description": "Strict brand compliance with dynamic missing asset ingestion",
        "aspect_ratio": "16:9",
        "best_for": ["Brand consistency", "Asset management", "Marketing materials"],
        "processing_time_min": 20,
        "price_thb": 400,
        "created_at": datetime.now().isoformat(),
        "editing_philosophy": "Brand compliance",
        "execution_rules": {"target_turnaround_min": 15},
        "brand_constraints": {"palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212"]},
        "graphics": {"callouts": True, "logos": True, "text_overlays": True},
        "audio": {"bgm_ducking": True, "voice_enhancement": True}
    }
}

@router.get("/")
async def get_all_skills() -> Dict[str, Any]:
    """
    Get all available skills with their configurations
    """
    return {
        "skills": SKILLS_CONFIG,
        "total_count": len(SKILLS_CONFIG),
        "timestamp": datetime.now().isoformat()
    }

@router.get("/{skill_name}")
async def get_skill(skill_name: str) -> Dict[str, Any]:
    """
    Get specific skill configuration
    """
    skill_name = skill_name.upper()
    if skill_name not in SKILLS_CONFIG:
        return {"error": f"Skill '{skill_name}' not found"}
    
    return SKILLS_CONFIG[skill_name]
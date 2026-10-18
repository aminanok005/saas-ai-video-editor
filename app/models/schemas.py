from typing import Dict, Any, Optional, List
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

# Enums
class ProcessingStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class QCStatus(str, Enum):
    PASSED = "passed"
    FAILED = "failed"
    REVISION_REQUIRED = "revision_required"

# Base schemas
class TaskBase(BaseModel):
    task_id: str
    project_id: str
    status: ProcessingStatus
    progress: float

class TaskStatus(TaskBase):
    created_at: datetime
    updated_at: datetime
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

class UploadResponse(BaseModel):
    project_id: str
    filename: str
    status: str
    uploaded_at: datetime

# Video Processing Schemas
class VideoExecutionBlueprint(BaseModel):
    cuts: List[List[float]]
    overlays: List[Dict[str, Any]]
    audio: Dict[str, Any]

class SafeZoneViolation(BaseModel):
    timestamp: float
    violation_type: str  # "overlay", "text", "graphic"
    position: Dict[str, float]  # x, y coordinates
    required_adjustment: Dict[str, float]  # suggested new position
    severity: str  # "low", "medium", "high"

class LinterReport(BaseModel):
    project_id: str
    status: QCStatus
    score: float  # 0-100
    violations: List[SafeZoneViolation] = []
    clarity_passed: bool = True
    safe_zone_passed: bool = True
    audio_sync_passed: bool = True
    first_10_second_hook: bool = True
    actionable_feedback: str = ""
    
    def dict(self, **kwargs):
        return super().dict(**kwargs)

# Skill Schemas
class SkillConfig(BaseModel):
    skill_name: str
    version: str
    aspect_ratio: str
    target_format: str
    description: str
    best_for: List[str]
    processing_time_min: int
    price_thb: int
    created_at: datetime
    editing_philosophy: str
    execution_rules: Dict[str, Any]
    brand_constraints: Dict[str, Any]
    graphics: Dict[str, Any]
    audio: Dict[str, Any]

# Notion QC Schemas
class NotionQCRequest(BaseModel):
    page_id: str
    database_id: str
    feedback_comments: List[Dict[str, Any]]

class NotionQCResponse(BaseModel):
    success: bool
    feedback_processed: int
    skill_updates: List[Dict[str, Any]]
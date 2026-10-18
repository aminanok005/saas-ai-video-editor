"""
Agent Pipeline Orchestrator for VibeCut AI
Coordinates the 4-agent pipeline: Mark (Editor), Lisa (Mascot), Arwin (QC), Feedback Miner
"""

import logging
from typing import Dict, Any, List
from datetime import datetime
import asyncio
import random

logger = logging.getLogger("AgentPipeline")

class AgentPipeline:
    def __init__(self):
        self.agents = {
            "mark_editor": {"status": "idle", "last_seen": None, "task_count": 0},
            "lisa_mascot": {"status": "idle", "last_seen": None, "task_count": 0},
            "arwin_judge": {"status": "idle", "last_seen": None, "task_count": 0},
            "feedback_miner": {"status": "idle", "last_seen": None, "task_count": 0}
        }
        self.active_tasks = {}
        self.task_counter = 0

    async def run_pipeline(self, project_id: str, video_path: str, audio_path: str,
                          transcript: str, skill_name: str):
        """Run the full 4-agent pipeline for video processing"""
        logger.info(f"Starting pipeline for project {project_id} with skill {skill_name}")

        # Generate task ID
        self.task_counter += 1
        task_id = f"task_{self.task_counter}_{project_id}"

        # Mark as active
        self.active_tasks[task_id] = {
            "project_id": project_id,
            "skill_name": skill_name,
            "start_time": datetime.now().isoformat(),
            "status": "processing",
            "current_agent": "mark_editor"
        }

        try:
            # Stage 1: Mark (Lead Editor) - Script trimming & jump-cut pacing
            await self._update_agent_status("mark_editor", "processing")
            await asyncio.sleep(random.uniform(2, 4))  # Simulate processing time
            await self._update_agent_status("mark_editor", "completed")
            logger.info(f"Mark completed work on {project_id}")

            # Stage 2: Lisa (Mascot Actor) - ElevenLabs voice synthesis & Kling AI animation
            await self._update_agent_status("lisa_mascot", "processing")
            await asyncio.sleep(random.uniform(3, 5))  # Simulate processing time
            await self._update_agent_status("lisa_mascot", "completed")
            logger.info(f"Lisa completed work on {project_id}")

            # Stage 3: Arwin (Judge QC) - Real-time Safe Zone QC Score
            await self._update_agent_status("arwin_judge", "processing")
            await asyncio.sleep(random.uniform(2, 4))  # Simulate processing time
            await self._update_agent_status("arwin_judge", "completed")
            logger.info(f"Arwin completed QC on {project_id}")

            # Stage 4: Feedback Miner - Notion comment sync & pattern learning
            await self._update_agent_status("feedback_miner", "processing")
            await asyncio.sleep(random.uniform(1, 3))  # Simulate processing time
            await self._update_agent_status("feedback_miner", "completed")
            logger.info(f"Feedback Miner completed work on {project_id}")

            # Mark task as completed
            self.active_tasks[task_id]["status"] = "completed"
            self.active_tasks[task_id]["end_time"] = datetime.now().isoformat()
            self.active_tasks[task_id]["current_agent"] = "completed"

            logger.info(f"Pipeline completed for project {project_id}")

        except Exception as e:
            logger.error(f"Pipeline failed for project {project_id}: {e}")
            # Mark all agents as error on failure
            for agent_id in self.agents.keys():
                await self._update_agent_status(agent_id, "error")
            self.active_tasks[task_id]["status"] = "failed"
            self.active_tasks[task_id]["error"] = str(e)

    async def _update_agent_status(self, agent_id: str, status: str):
        """Update agent status"""
        if agent_id in self.agents:
            self.agents[agent_id]["status"] = status
            self.agents[agent_id]["last_seen"] = datetime.now().isoformat()
            logger.debug(f"Agent {agent_id} status updated to {status}")

    def get_agent_infos(self) -> Dict[str, Any]:
        """Get current status of all agents"""
        return self.agents.copy()

    def get_all_statuses(self) -> Dict[str, Any]:
        """Get all active task statuses"""
        return self.active_tasks.copy()

    def get_task_status(self, task_id: str) -> Dict[str, Any]:
        """Get status of specific task"""
        return self.active_tasks.get(task_id, {"status": "not_found"})
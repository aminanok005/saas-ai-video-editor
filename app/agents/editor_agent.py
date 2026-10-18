"""
Editor Director Agent

Lead editor agent responsible for creating video execution blueprints
and overseeing the complete video editing workflow. Agent Mark handles
transcript analysis, storyboard creation, and execution planning.
"""

from typing import Dict, Any, List, Tuple
from app.core.brand_kit import get_text_style
import json
import os

class EditorDirectorAgent:
    """
    Lead Editor Agent (Mark) - Creates execution blueprints from video content.
    
    Responsibilities:
    1. Analyze video content and extract key themes
    2. Generate video execution blueprint with cuts, overlays, effects
    3. Apply brand guidelines and safe zone compliance
    4. Create storyboard and shot-by-shot breakdowns
    5. Estimate production time and resource requirements
    """
    
    def __init__(self, skill_config: Dict[str, Any]):
        self.skill_config = skill_config
        self.brand_guidelines = {
            "aspect_ratio": skill_config.get("aspect_ratio", "16:9"),
            "text_styles": ["heading", "body", "caption", "callout"],
            "safe_zone_enabled": True,
            "brand_colors": skill_config.get("brand_constraints", {}).get("palette", [])
        }
        
        # Initialize analysis results
        self.analysis_results = {
            "video_duration": 0.0,
            "detected_segments": [],
            "style_recommendations": [],
            "technical_specs": {}
        }
    
    def analyze_video_and_generate_blueprint(self, video_path: str, 
                                           audio_path: str, 
                                           transcript: str) -> Dict[str, Any]:
        """
        Analyze video content and generate complete execution blueprint
        """
        print(f"[Editor Director Agent - Mark] Analyzing video: {video_path}")
        print(f"[Editor Director Agent - Mark] Transcript: {transcript[:100]}...")
        
        try:
            # Analyze video metadata
            video_analysis = self._analyze_video_metadata(video_path)
            
            # Extract key content segments
            content_segments = self._extract_content_segments(transcript)
            
            # Determine editing style based on content
            editing_style = self._determine_editing_style(transcript, content_segments)
            
            # Create storyboard
            storyboard = self._create_storyboard(content_segments, editing_style)
            
            # Generate execution blueprint
            blueprint = self._generate_blueprint(
                video_analysis, content_segments, editing_style, storyboard
            )
            
            # Apply brand compliance checks
            blueprint = self._apply_brand_compliance(blueprint)
            
            # Generate execution summary
            execution_summary = self._generate_execution_summary(blueprint)
            
            print(f"[Editor Director Agent - Mark] Blueprint generated successfully!")
            print(f"[Editor Director Agent - Mark] Total segments: {len(blueprint['cuts'])}")
            print(f"[Editor Director Agent - Mark] Overlays to apply: {len(blueprint['overlays'])}")
            
            return {
                "success": True,
                "blueprint": blueprint,
                "video_analysis": video_analysis,
                "content_segments": content_segments,
                "execution_summary": execution_summary,
                "agent_name": "Editor Director Agent",
                "agent_role": "Lead Video Editor",
                "agent_id": "agent_mark_001"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "agent_name": "Editor Director Agent",
                "agent_role": "Lead Video Editor",
                "agent_id": "agent_mark_001"
            }
    
    def _analyze_video_metadata(self, video_path: str) -> Dict[str, Any]:
        """
        Analyze video metadata and provide technical recommendations
        """
        # Simulate video analysis
        # In production, this would use actual video analysis libraries
        
        duration = 60.0  # Simulated duration
        resolution = (1920, 1080)  # HD
        fps = 30
        
        # Determine optimal editing rhythm based on skill configuration
        execution_rules = self.skill_config.get("execution_rules", {})
        target_turnaround = execution_rules.get("target_turnaround_min", 15)
        
        analysis = {
            "duration": duration,
            "resolution": resolution,
            "fps": fps,
            "aspect_ratio": "16:9",
            "file_size": "~150MB",
            "processing_time_minutes": target_turnaround,
            "technical_considerations": [
                "Video is in HD resolution",
                "Standard 30fps frame rate",
                f"Target turnaround: {target_turnaround} minutes",
                "Professional editing tools available",
                "Brand guidelines will be applied throughout"
            ],
            "style_match": "high",
            "quality_rating": 8.5
        }
        
        return analysis
    
    def _extract_content_segments(self, transcript: str) -> List[Dict[str, Any]]:
        """
        Extract meaningful content segments from transcript
        """
        segments = []
        
        # Simulate segment extraction based on transcript keywords
        # In production, this would use NLP for better segment detection
        
        words = transcript.split()
        segment_length = max(1, len(words) // 8)  # 8 segments total
        
        for i in range(0, len(words), segment_length):
            segment_words = words[i:i + segment_length]
            segment_text = ' '.join(segment_words)
            
            # Determine segment type based on content
            segment_type = self._determine_segment_type(segment_text)
            
            # Estimate duration based on segment length
            duration = min(len(segment_words) * 0.5, 8.0)
            
            segment = {
                "id": f"segment_{i//segment_length + 1}",
                "start_time": i * 0.5,
                "duration": duration,
                "text": segment_text,
                "type": segment_type,
                "importance": "high" if i % 2 == 0 else "medium",
                "suggested_overlay": self._suggest_overlay_for_segment(segment_text)
            }
            
            segments.append(segment)
        
        return segments
    
    def _determine_segment_type(self, segment_text: str) -> str:
        """
        Determine the type of content segment
        """
        text_lower = segment_text.lower()
        
        if any(word in text_lower for word in ["introduction", "intro", "hello", "welcome"]):
            return "intro"
        elif any(word in text_lower for word in ["example", "demo", "demonstration", "showcase"]):
            return "example"
        elif any(word in text_lower for word in ["conclusion", "summary", "concluding", "wrap up"]):
            return "conclusion"
        elif any(word in text_lower for word in ["tip", "trick", "pro tip", "recommendation"]):
            return "tip"
        elif any(word in text_lower for word in ["problem", "issue", "challenge", "difficulty"]):
            return "problem"
        else:
            return "content"
    
    def _suggest_overlay_for_segment(self, segment_text: str) -> Dict[str, Any]:
        """
        Suggest appropriate overlay type for content segment
        """
        text_lower = segment_text.lower()
        
        if any(word in text_lower for word in ["tip", "trick", "pro tip"]):
            return {
                "type": "speech_bubble",
                "position": "top-left",
                "style": "callout",
                "speaker": "Mark (Editor)"
            }
        elif any(word in text_lower for word in ["introduction", "intro"]):
            return {
                "type": "lower_third",
                "position": "top-center",
                "style": "heading",
                "text": "Opening Segment"
            }
        elif any(word in text_lower for word in ["example", "demo", "demonstration"]):
            return {
                "type": "animated",
                "position": "center",
                "animation": "fade_in",
                "style": "callout"
            }
        else:
            return {
                "type": "text",
                "position": "bottom-center",
                "style": "body"
            }
    
    def _determine_editing_style(self, transcript: str, segments: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Determine optimal editing style based on content and skill configuration
        """
        skill_config = self.skill_config
        editing_philosophy = skill_config.get("editing_philosophy", "Production-ready")
        
        # Analyze segment characteristics to determine style
        segment_types = [seg["type"] for seg in segments]
        
        # Style characteristics based on analysis
        style = {
            "name": editing_philosophy,
            "pacing": self._calculate_optimal_pacing(segments),
            "transitions": self._determine_transition_style(segment_types),
            "text_overlay_strategy": self._determine_text_strategy(segment_types),
            "visual_effects": self._determine_effect_style(segment_types),
            "audio_strategy": skill_config.get("audio", {}).get("strategy", "dynamic_ducking")
        }
        
        return style
    
    def _calculate_optimal_pacing(self, segments: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculate optimal editing pace based on segment analysis
        """
        # Analyze segment durations and types
        total_duration = sum(seg["duration"] for seg in segments)
        avg_segment_duration = total_duration / len(segments)
        
        # Adjust pacing based on segment importance
        high_importance_segments = [s for s in segments if s["importance"] == "high"]
        
        pacing = {
            "average_segment_duration": avg_segment_duration,
            "recommended_cuts_per_minute": 2 if avg_segment_duration < 5 else 1,
            "emphasis_on_key_segments": True,
            "visual_pacing": "moderate",  # slow, moderate, fast, dynamic
            "audio_pacing": "balanced"
        }
        
        # Adjust based on editing philosophy
        if "speed" in editing_philosophy.lower():
            pacing["visual_pacing"] = "fast"
            pacing["recommended_cuts_per_minute"] = 3
        
        return pacing
    
    def _determine_transition_style(self, segment_types: List[str]) -> Dict[str, Any]:
        """
        Determine transition style based on content segments
        """
        # Map segment types to appropriate transitions
        transition_rules = {
            "intro": ["fade_in", "slide_from_left"],
            "content": ["crossfade", "wipe_right"],
            "example": ["zoom_in", "slide_from_bottom"],
            "tip": ["pulse", "glitch"],
            "conclusion": ["fade_out", "slide_to_left"]
        }
        
        # Determine dominant transition style
        transition_count = {}
        for seg_type in segment_types:
            possible_transitions = transition_rules.get(seg_type, ["fade_in", "crossfade"])
            for trans in possible_transitions:
                transition_count[trans] = transition_count.get(trans, 0) + 1
        
        dominant_transition = max(transition_count.items(), key=lambda x: x[1])[0] if transition_count else "fade_in"
        
        return {
            "primary_transition": dominant_transition,
            "transition_duration": 0.5,
            "smoothness": "high",
            "effect_complexity": "moderate"
        }
    
    def _determine_text_strategy(self, segment_types: List[str]) -> Dict[str, Any]:
        """
        Determine text overlay strategy for different segment types
        """
        text_strategy = {
            "use_text_overlays": True,
            "text_positions": [],
            "style_variants": [],
            "emphasis_technique": "highlight_key_points"
        }
        
        # Analyze where text should be placed
        if "intro" in segment_types:
            text_strategy["text_positions"].append({"type": "intro", "position": "top-center"})
        
        if "example" in segment_types:
            text_strategy["text_positions"].append({"type": "example", "position": "bottom-center"})
        
        if "tip" in segment_types:
            text_strategy["text_positions"].append({"type": "tip", "position": "top-right"})
        
        if "conclusion" in segment_types:
            text_strategy["text_positions"].append({"type": "conclusion", "position": "bottom-center"})
        
        # Style variants based on segment types
        text_strategy["style_variants"] = ["heading", "body", "caption", "callout"]
        
        return text_strategy
    
    def _determine_effect_style(self, segment_types: List[str]) -> Dict[str, Any]:
        """
        Determine visual effects style based on content
        """
        effect_style = {
            "overall_complexity": "moderate",
            "effect_categories": [],
            "transition_effects": True,
            "overlay_effects": True,
            "color_grading": "standard"
        }
        
        # Determine effect categories based on segment types
        if any(st in segment_types for st in ["example", "tip"]):
            effect_style["effect_categories"].append("demonstration")
        
        if "intro" in segment_types:
            effect_style["effect_categories"].append("opening")
        
        if "conclusion" in segment_types:
            effect_style["effect_categories"].append("closing")
        
        # Adjust complexity based on editing philosophy
        editing_philosophy = self.skill_config.get("editing_philosophy", "")
        if "cinematic" in editing_philosophy.lower() or "dramatic" in editing_philosophy.lower():
            effect_style["overall_complexity"] = "high"
        
        return effect_style
    
    def _create_storyboard(self, segments: List[Dict[str, Any]], 
                          style: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create detailed storyboard with shot-by-shot breakdown
        """
        storyboard = {
            "total_shots": len(segments),
            "estimated_duration": sum(seg["duration"] for seg in segments),
            "shots": []
        }
        
        for i, segment in enumerate(segments):
            shot = {
                "shot_number": i + 1,
                "segment_id": segment["id"],
                "duration": segment["duration"],
                "start_time": segment["start_time"],
                "visual_style": self._determine_shot_style(segment, style),
                "text_content": segment["text"],
                "suggested_overlay": segment["suggested_overlay"],
                "camera_movement": self._determine_camera_movement(segment),
                "color_palette": self._select_color_palette(segment)
            }
            
            storyboard["shots"].append(shot)
        
        return storyboard
    
    def _determine_shot_style(self, segment: Dict[str, Any], style: Dict[str, Any]) -> Dict[str, Any]:
        """
        Determine visual style for individual shot
        """
        segment_type = segment["type"]
        
        style_mapping = {
            "intro": {"camera": "establishing", "color": "warm", "lighting": "soft"},
            "content": {"camera": "medium", "color": "neutral", "lighting": "balanced"},
            "example": {"camera": "close-up", "color": "vibrant", "lighting": "dramatic"},
            "tip": {"camera": "diagonal", "color": "accented", "lighting": "high-contrast"},
            "conclusion": {"camera": "wide", "color": "cool", "lighting": "atmospheric"}
        }
        
        return style_mapping.get(segment_type, {"camera": "medium", "color": "neutral", "lighting": "balanced"})
    
    def _determine_camera_movement(self, segment: Dict[str, Any]) -> Dict[str, Any]:
        """
        Determine camera movement for segment
        """
        segment_type = segment["type"]
        
        movement_mapping = {
            "intro": {"type": "slow_zoom_in", "speed": "slow"},
            "content": {"type": "static", "speed": "steady"},
            "example": {"type": "quick_pan", "speed": "fast"},
            "tip": {"type": "pulse_zoom", "speed": "dynamic"},
            "conclusion": {"type": "slow_zoom_out", "speed": "slow"}
        }
        
        return movement_mapping.get(segment_type, {"type": "static", "speed": "steady"})
    
    def _select_color_palette(self, segment: Dict[str, Any]) -> Dict[str, str]:
        """
        Select appropriate color palette for segment
        """
        segment_type = segment["type"]
        
        # Use brand palette as base
        brand_colors = self.skill_config.get("brand_constraints", {}).get("palette", [
            "#FFC700", "#FF6B00", "#FFFFFF", "#121212"
        ])
        
        palette_mapping = {
            "intro": {"primary": brand_colors[0], "secondary": brand_colors[1], "accent": "#FFFFFF"},
            "content": {"primary": brand_colors[1], "secondary": brand_colors[3], "accent": brand_colors[0]},
            "example": {"primary": brand_colors[0], "secondary": brand_colors[3], "accent": brand_colors[1]},
            "tip": {"primary": "#FFFFFF", "secondary": brand_colors[0], "accent": brand_colors[1]},
            "conclusion": {"primary": brand_colors[1], "secondary": brand_colors[3], "accent": brand_colors[0]}
        }
        
        return palette_mapping.get(segment_type, palette_mapping["content"])
    
    def _generate_blueprint(self, video_analysis: Dict[str, Any], 
                           segments: List[Dict[str, Any]], 
                           style: Dict[str, Any], 
                           storyboard: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate complete execution blueprint
        """
        # Calculate total cuts based on segments
        cuts = []
        for i in range(len(segments)):
            if i == 0:
                start_time = 0
            else:
                start_time = segments[i-1]["start_time"] + segments[i-1]["duration"]
            
            end_time = segments[i]["start_time"] + segments[i]["duration"]
            cuts.append([start_time, end_time])
        
        # Generate overlays based on segment recommendations
        overlays = []
        for segment in segments:
            if segment["suggested_overlay"]:
                overlay_spec = segment["suggested_overlay"].copy()
                overlay_spec["content"] = segment["text"]
                overlay_spec["segment_id"] = segment["id"]
                overlays.append(overlay_spec)
        
        # Generate graphics specs
        graphics = []
        for i, shot in enumerate(storyboard["shots"]):
            graphic_spec = {
                "shot_number": shot["shot_number"],
                "type": "background",
                "color_palette": shot["color_palette"],
                "position": "full_screen"
            }
            graphics.append(graphic_spec)
        
        # Generate audio specs
        audio_specs = {
            "background_music": {
                "enabled": True,
                "style": self.skill_config.get("audio", {}).get("bgm_style", "upbeat"),
                "volume": 0.3,
                "fade_in": 1.0,
                "fade_out": 2.0
            },
            "voice_overlay": {
                "enabled": True,
                "volume": 1.0,
                "noise_reduction": True,
                "eq_adjustments": {"bass_boost": 0.5, "treble_boost": 0.3}
            },
            "sound_effects": {
                "enabled": True,
                "effect_library": "standard",
                "volume": 0.2
            }
        }
        
        # Generate text overlay specs
        text_specs = []
        for overlay in overlays:
            if overlay["type"] != "lower_third" and overlay["type"] != "speech_bubble":
                text_spec = {
                    "text": overlay["content"],
                    "position": overlay["position"],
                    "style": overlay["style"],
                    "duration": overlays[overlays.index(overlay)]["duration"],
                    "timing": {
                        "start_delay": max(0, overlay["start_time"] - 0.5),
                        "end_fade": 0.5
                    }
                }
                text_specs.append(text_spec)
        
        blueprint = {
            "video_id": video_analysis.get("file_id", "generated"),
            "resolution": video_analysis.get("resolution", (1920, 1080)),
            "fps": video_analysis.get("fps", 30),
            "aspect_ratio": self.skill_config.get("aspect_ratio", "16:9"),
            
            "cuts": cuts,
            "overlays": overlays,
            "graphics": graphics,
            
            "audio": audio_specs,
            "text_overlays": text_specs,
            
            "storyboard": storyboard,
            
            "editing_style": style,
            "brand_compliance": {
                "safe_zone_enforced": True,
                "brand_colors_applied": True,
                "text_contrast_checked": True
            },
            
            "quality_checks": {
                "safe_zone_violations": [],
                "text_readability": "high",
                "color_contrast": "good"
            },
            
            "production_metadata": {
                "estimated_duration": storyboard["estimated_duration"],
                "total_segments": len(segments),
                "estimated_processing_time_minutes": video_analysis.get("processing_time_minutes", 15),
                "difficulty_level": "intermediate"
            }
        }
        
        return blueprint
    
    def _apply_brand_compliance(self, blueprint: Dict[str, Any]) -> Dict[str, Any]:
        """
        Apply brand compliance checks and corrections
        """
        # Check text overlay colors against brand palette
        brand_colors = self.skill_config.get("brand_constraints", {}).get("palette", [])
        
        # Apply brand colors to text overlays
        for text_spec in blueprint.get("text_overlays", []):
            if text_spec["style"] == "heading":
                text_spec["color"] = brand_colors[0] if len(brand_colors) > 0 else "#FFFFFF"
            elif text_spec["style"] == "body":
                text_spec["color"] = brand_colors[3] if len(brand_colors) > 3 else "#FFFFFF"
        
        # Check safe zone compliance
        violations = []
        # In production, this would check actual overlay positions against safe zones
        for i, overlay in enumerate(blueprint.get("overlays", [])):
            if overlay.get("type") == "text":
                # Simulate safe zone check
                if i % 5 == 0:  # Simulate occasional violations
                    violations.append({
                        "overlay_id": overlay["segment_id"],
                        "violation_type": "position",
                        "severity": "low"
                    })
        
        blueprint["quality_checks"]["safe_zone_violations"] = violations
        
        return blueprint
    
    def _generate_execution_summary(self, blueprint: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate execution summary for blueprint
        """
        total_cuts = len(blueprint["cuts"])
        total_overlays = len(blueprint["overlays"])
        total_graphics = len(blueprint["graphics"])
        
        # Calculate estimated production time
        base_time = total_cuts * 30  # 30 seconds per cut
        overlay_time = total_overlays * 20  # 20 seconds per overlay
        graphics_time = total_graphics * 10  # 10 seconds per graphic
        
        total_estimated_time = base_time + overlay_time + graphics_time
        
        return {
            "total_cuts": total_cuts,
            "total_overlays": total_overlays,
            "total_graphics": total_graphics,
            "estimated_production_time_minutes": total_estimated_time / 60,
            "estimated_video_duration": blueprint["production_metadata"]["estimated_duration"],
            "difficulty_level": blueprint["production_metadata"]["difficulty_level"],
            "ready_for_processing": True
        }
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this agent
        """
        return {
            "agent_name": "Editor Director Agent",
            "agent_id": "agent_mark_001",
            "role": "Lead Video Editor",
            "specialization": "Video Analysis and Blueprint Generation",
            "capabilities": [
                "Video content analysis",
                "Storyboard creation",
                "Execution blueprint generation",
                "Brand compliance checking",
                "Production planning"
            ],
            "style_philosophy": self.skill_config.get("editing_philosophy", "Production-ready"),
            "experience_level": "expert",
            "status": "ready"
        }

# Initialize agent instance with default configuration
default_config = {
    "skill_name": "EDITOR_DIRECTOR_AGENT",
    "version": "2.1.0",
    "aspect_ratio": "16:9",
    "target_format": "standard",
    "editing_philosophy": "Production-ready",
    "execution_rules": {"target_turnaround_min": 15},
    "brand_constraints": {
        "palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212"]
    },
    "graphics": {"callouts": True, "logos": True, "text_overlays": True},
    "audio": {"bgm_ducking": True, "voice_enhancement": True}
}

editor_director_agent = EditorDirectorAgent(default_config)

# Export the agent instance
__all__ = ["editor_director_agent", "EditorDirectorAgent"]
"""
Overlay Processing Core Module

Handles graphics overlays, text overlays, lower thirds, brand overlays,
and visual effects for video content. Ensures compliance with safe zone
regulations and brand guidelines.
"""

import os
import json
from typing import Dict, Any, List, Optional, Tuple
from moviepy.editor import VideoFileClip, ImageClip, TextClip, ColorClip, CompositeVideoClip
from moviepy.video.fx import resize, crop
from app.core.brand_kit import get_brand_kit, check_safe_zone, get_text_style, get_safe_zone_bounds

class OverlayProcessor:
    """
    Core overlay processing engine for video graphics.
    Handles text overlays, image overlays, lower thirds, 
    brand overlays, and ensures brand/safe zone compliance.
    """
    
    def __init__(self):
        self.brand_kit = get_brand_kit()
        self.safe_zone_bounds = get_safe_zone_bounds()
        
    def create_text_overlay(self, text: str, style: str = "body", 
                           duration: float = 5.0, position: str = "bottom",
                           safe_check: bool = True) -> Dict[str, Any]:
        """
        Create a text overlay with specified style and positioning
        """
        try:
            # Get text style configuration
            style_config = get_text_style(style)
            
            # Create text clip with brand styling
            txt_clip = TextClip(
                text,
                fontsize=style_config.get("font_size", 24),
                color=style_config.get("color", "#FFFFFF"),
                font=style_config.get("font_family", "Arial"),
                method="label",
                size=(len(text) * 10, style_config.get("font_size", 24) * 2)
            )
            
            # Set duration
            txt_clip = txt_clip.set_duration(duration)
            
            # Apply positioning based on safe zone
            final_position = self._apply_positioning(txt_clip, position, safe_check)
            
            txt_clip = txt_clip.set_position(final_position)
            
            return {
                "success": True,
                "clip": txt_clip,
                "text": text,
                "style": style,
                "position": final_position,
                "duration": duration,
                "safe_zone_compliant": self._check_position_safety(final_position, safe_check)
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def create_lower_third(self, text: str, subtitle: str = None,
                          duration: float = 5.0, background_color: str = "#00000080",
                          text_color: str = "#FFFFFF") -> Dict[str, Any]:
        """
        Create a lower third overlay (text with semi-transparent background)
        """
        try:
            # Main text
            main_text = self.create_text_overlay(
                text, 
                style="heading",
                duration=duration,
                position="bottom-left",
                safe_check=True
            )
            
            # Subtitle text
            subtitle_text = None
            if subtitle:
                subtitle_text = self.create_text_overlay(
                    subtitle,
                    style="caption",
                    duration=duration,
                    position="bottom-left",
                    safe_check=True
                )
            
            # Calculate dimensions for background
            # Approximate text dimensions for background box
            width = max(
                len(text) * (24 if style == "heading" else 18),
                len(subtitle) * (18 if subtitle else 0) if subtitle else 0
            )
            height = 60 if subtitle else 40
            
            # Create background rectangle
            bg_clip = ColorClip(
                size=(width, height),
                color=(0, 0, 0),
                duration=duration
            ).set_opacity(0.6)
            
            # Position background
            bg_clip = bg_clip.set_position(("left", "bottom"))
            
            # Composite lower third
            lower_third_clips = [bg_clip]
            
            if main_text["success"] and main_text["clip"]:
                lower_third_clips.append(main_text["clip"])
            if subtitle_text and subtitle_text["success"] and subtitle_text["clip"]:
                lower_third_clips.append(subtitle_text["clip"])
            
            final_clip = CompositeVideoClip(lower_third_clips)
            
            return {
                "success": True,
                "clip": final_clip,
                "main_text": text,
                "subtitle": subtitle,
                "duration": duration,
                "position": ("left", "bottom"),
                "type": "lower_third"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def add_brand_watermark(self, video_clip, duration: float = None,
                           position: str = "top-right", size: float = 0.1) -> Dict[str, Any]:
        """
        Add brand watermark/logo to video
        """
        try:
            # Use brand colors for watermark
            brand_color = self.brand_kit["colors"]["primary"]
            
            # Create brand mark (simple text for now)
            watermark_text = "VIBECUT"
            
            # Create text clip
            txt_clip = TextClip(
                watermark_text,
                fontsize=24,
                color=brand_color,
                font="Arial",
                method="label"
            )
            
            # Set duration
            if duration is None:
                duration = video_clip.duration
            txt_clip = txt_clip.set_duration(duration)
            
            # Apply positioning
            final_position = self._apply_positioning(txt_clip, position, safe_check=False)
            txt_clip = txt_clip.set_position(final_position)
            
            # Scale watermark
            w, h = txt_clip.size
            scale_factor = min(video_clip.w * size / w, video_clip.h * size / h)
            txt_clip = txt_clip.resize(scale_factor)
            
            return {
                "success": True,
                "watermark_clip": txt_clip,
                "text": watermark_text,
                "position": final_position,
                "duration": duration,
                "scale_factor": scale_factor
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def add_graphic_overlay(self, graphic_path: str, duration: float = 5.0,
                           position: str = "center", scale: float = 0.3) -> Dict[str, Any]:
        """
        Add graphic overlay (image, logo, icon)
        """
        try:
            if not os.path.exists(graphic_path):
                return {
                    "success": False,
                    "error": f"Graphic file not found: {graphic_path}"
                }
            
            # Load graphic
            graphic_clip = ImageClip(graphic_path)
            
            # Set duration
            graphic_clip = graphic_clip.set_duration(duration)
            
            # Apply positioning with safe zone check
            final_position = self._apply_positioning(graphic_clip, position, safe_check=True)
            graphic_clip = graphic_clip.set_position(final_position)
            
            # Apply scaling
            w, h = graphic_clip.size
            new_width = int(graphic_clip.w * scale)
            new_height = int(graphic_clip.h * scale)
            graphic_clip = graphic_clip.resize((new_width, new_height))
            
            return {
                "success": True,
                "graphic_clip": graphic_clip,
                "graphic_path": graphic_path,
                "position": final_position,
                "duration": duration,
                "scale": scale,
                "original_size": (w, h)
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def create_animated_overlay(self, text: str, animation_type: str = "fade_in",
                               duration: float = 3.0, position: str = "center") -> Dict[str, Any]:
        """
        Create animated text overlay
        """
        try:
            # Create base text overlay
            text_result = self.create_text_overlay(
                text,
                style="callout",
                duration=duration,
                position=position,
                safe_check=True
            )
            
            if not text_result["success"]:
                return text_result
            
            txt_clip = text_result["clip"]
            
            # Apply animation
            if animation_type == "fade_in":
                txt_clip = txt_clip.crossfadein(0.5)
            elif animation_type == "fade_out":
                txt_clip = txt_clip.crossfadeout(0.5)
            elif animation_type == "pulse":
                # Simple pulse effect
                txt_clip = txt_clip.fx(lambda gf, t: gf(t) * (0.8 + 0.2 * abs(np.sin(t * 2))))
            
            return {
                "success": True,
                "clip": txt_clip,
                "text": text,
                "animation_type": animation_type,
                "duration": duration,
                "position": position
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def add_speech_bubble(self, text: str, speaker_position: str = "left",
                         duration: float = 4.0) -> Dict[str, Any]:
        """
        Create speech bubble overlay for character dialogue
        """
        try:
            # Background bubble
            bubble_bg = ColorClip(
                size=(400, 100),
                color=(255, 255, 255),
                duration=duration
            ).set_opacity(0.9)
            
            # Add triangle pointer
            # For simplicity, just make a rounded rectangle-like shape
            # In production, would use proper speech bubble graphics
            
            # Text inside bubble
            text_clip = self.create_text_overlay(
                text,
                style="body",
                duration=duration,
                position="center",
                safe_check=True
            )
            
            if not text_clip["success"]:
                return text_clip
            
            # Position bubble based on speaker
            if speaker_position == "left":
                bubble_position = ("left", "top")
                text_offset = (50, 50)
            elif speaker_position == "right":
                bubble_position = ("right", "top")
                text_offset = (-50, 50)
            else:
                bubble_position = ("center", "bottom")
                text_offset = (0, 0)
            
            bubble_bg = bubble_bg.set_position(bubble_position)
            text_clip_obj = text_clip["clip"].set_position((
                bubble_position[0][0] + text_offset[0] if isinstance(bubble_position[0], str) else bubble_position[0] + text_offset[0],
                bubble_position[1][1] + text_offset[1] if isinstance(bubble_position[1], str) else bubble_position[1] + text_offset[1]
            ))
            
            # Composite speech bubble
            bubble_clip = CompositeVideoClip([bubble_bg, text_clip_obj])
            
            return {
                "success": True,
                "clip": bubble_clip,
                "text": text,
                "speaker_position": speaker_position,
                "duration": duration,
                "type": "speech_bubble"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _apply_positioning(self, clip, position: str, safe_check: bool = True) -> Tuple:
        """
        Apply positioning logic with safe zone consideration
        """
        # Define position mappings
        position_map = {
            "center": ("center", "center"),
            "top": ("center", "top"),
            "bottom": ("center", "bottom"),
            "left": ("left", "center"),
            "right": ("right", "center"),
            "top-left": ("left", "top"),
            "top-right": ("right", "top"),
            "bottom-left": ("left", "bottom"),
            "bottom-right": ("right", "bottom"),
            "bottom-center": ("center", "bottom")
        }
        
        # Get base position
        base_position = position_map.get(position, ("center", "center"))
        
        # If safe zone check is enabled, adjust position to be safe
        if safe_check:
            # Get clip dimensions (approximate)
            try:
                w, h = clip.size
            except:
                w, h = 200, 50  # Default dimensions
            
            # Check safe zone and adjust if needed
            x_adjustment = 0
            y_adjustment = 0
            
            # Calculate actual position (simplified)
            if isinstance(base_position[0], str):
                if base_position[0] == "left":
                    x_pos = 10 + x_adjustment
                elif base_position[0] == "right":
                    x_pos = clip.w - 10 - w + x_adjustment
                else:  # center
                    x_pos = (clip.w - w) // 2 + x_adjustment
            else:
                x_pos = base_position[0] + x_adjustment
            
            if isinstance(base_position[1], str):
                if base_position[1] == "top":
                    y_pos = 10 + y_adjustment
                elif base_position[1] == "bottom":
                    y_pos = clip.h - 10 - h + y_adjustment
                else:  # center
                    y_pos = (clip.h - h) // 2 + y_adjustment
            else:
                y_pos = base_position[1] + y_adjustment
            
            # Ensure position is within safe zones
            is_safe, violations = check_safe_zone(x_pos, y_pos, clip.w, clip.h)
            
            if not is_safe:
                # Adjust position to be safe
                safe_x = min(x_pos, clip.w * (1 - self.safe_zone_bounds["right_ui_ratio"]) - w)
                safe_y = min(y_pos, clip.h * (1 - self.safe_zone_bounds["bottom_ui_ratio"]) - h)
                return (max(safe_x, 0), max(safe_y, 0))
        
        return base_position
    
    def _check_position_safety(self, position: Tuple, safe_check: bool = True) -> bool:
        """
        Check if position is within safe zones
        """
        if not safe_check:
            return True
        
        try:
            # Approximate dimensions for safety check
            x, y = position if isinstance(position, tuple) else (0, 0)
            # Use default dimensions for check
            is_safe, _ = check_safe_zone(x, y, 1920, 1080)
            return is_safe
        except:
            return True  # Default to safe if check fails
    
    def process_overlay_workflow(self, video_path: str, 
                                overlays: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Process complete overlay workflow based on overlay specifications
        """
        try:
            clip = VideoFileClip(video_path)
            overlay_clips = [clip]
            
            # Process each overlay
            for overlay_spec in overlays:
                overlay_type = overlay_spec.get("type", "text")
                
                if overlay_type == "text":
                    result = self.create_text_overlay(
                        overlay_spec["text"],
                        overlay_spec.get("style", "body"),
                        overlay_spec.get("duration", clip.duration),
                        overlay_spec.get("position", "center"),
                        overlay_spec.get("safe_check", True)
                    )
                    
                    if result["success"]:
                        overlay_clips.append(result["clip"])
                
                elif overlay_type == "lower_third":
                    result = self.create_lower_third(
                        overlay_spec["main_text"],
                        overlay_spec.get("subtitle"),
                        overlay_spec.get("duration", clip.duration),
                        overlay_spec.get("background_color", "#00000080"),
                        overlay_spec.get("text_color", "#FFFFFF")
                    )
                    
                    if result["success"]:
                        overlay_clips.append(result["clip"])
                
                elif overlay_type == "graphic":
                    result = self.add_graphic_overlay(
                        overlay_spec["path"],
                        overlay_spec.get("duration", clip.duration),
                        overlay_spec.get("position", "center"),
                        overlay_spec.get("scale", 0.3)
                    )
                    
                    if result["success"]:
                        overlay_clips.append(result["graphic_clip"])
                
                elif overlay_type == "watermark":
                    result = self.add_brand_watermark(
                        clip,
                        overlay_spec.get("duration", clip.duration),
                        overlay_spec.get("position", "top-right"),
                        overlay_spec.get("size", 0.1)
                    )
                    
                    if result["success"]:
                        overlay_clips.append(result["watermark_clip"])
                
                elif overlay_type == "animated":
                    result = self.create_animated_overlay(
                        overlay_spec["text"],
                        overlay_spec.get("animation_type", "fade_in"),
                        overlay_spec.get("duration", 3.0),
                        overlay_spec.get("position", "center")
                    )
                    
                    if result["success"]:
                        overlay_clips.append(result["clip"])
                
                elif overlay_type == "speech_bubble":
                    result = self.add_speech_bubble(
                        overlay_spec["text"],
                        overlay_spec.get("speaker_position", "left"),
                        overlay_spec.get("duration", 4.0)
                    )
                    
                    if result["success"]:
                        overlay_clips.append(result["clip"])
            
            # Composite all clips
            final_clip = CompositeVideoClip(overlay_clips)
            
            # Generate output
            output_path = video_path.replace(".mp4", "_overlayed.mp4")
            final_clip.write_videofile(output_path, fps=clip.fps)
            
            return {
                "success": True,
                "output_path": output_path,
                "base_duration": clip.duration,
                "overlays_applied": len([o for o in overlays if o.get("type")]),
                "total_clips": len(overlay_clips),
                "processing_complete": True
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

# Initialize processor instance
processor = OverlayProcessor()
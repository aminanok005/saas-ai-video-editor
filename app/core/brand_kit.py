from typing import Dict, Any, List, Tuple
import json
import os

# Brand kit colors and constraints
BRAND_COLORS = {
    "primary": "#FFC700",     # Vibrant yellow
    "secondary": "#FF6B00",   # Warm orange-red
    "text": "#FFFFFF",        # White text
    "background": "#121212"   # Dark background
}

# Safe zone bounds for social media platform UI compliance
SAFE_ZONE_BOUNDS = {
    "top_safe_zone_ratio": 0.65,  # Top 65% is safe for overlays
    "bottom_ui_ratio": 0.25,      # Bottom 25% reserved for UI
    "right_ui_ratio": 0.15,       # Right 15% reserved for UI
}

# Font families and styling rules
FONT_STYLES = {
    "heading": {
        "font_family": "Inter",
        "font_size": 48,
        "color": BRAND_COLORS["text"],
        "weight": "bold"
    },
    "body": {
        "font_family": "Inter",
        "font_size": 32,
        "color": BRAND_COLORS["text"],
        "weight": "normal"
    },
    "caption": {
        "font_family": "Inter",
        "font_size": 24,
        "color": BRAND_COLORS["text"],
        "weight": "normal"
    },
    "callout": {
        "font_family": "Inter",
        "font_size": 36,
        "color": BRAND_COLORS["background"],
        "weight": "bold",
        "background": BRAND_COLORS["primary"]
    }
}

def get_brand_color(color_name: str) -> str:
    """Get brand color hex value by name"""
    return BRAND_COLORS.get(color_name, BRAND_COLORS["text"])

def get_safe_zone_bounds() -> Dict[str, float]:
    """Get safe zone bounds for overlay placement"""
    return SAFE_ZONE_BOUNDS.copy()

def get_text_style(style_name: str) -> Dict[str, Any]:
    """Get text style configuration by name"""
    return FONT_STYLES.get(style_name, FONT_STYLES["body"])

def check_safe_zone(x: float, y: float, frame_width: int, frame_height: int) -> Tuple[bool, List[str]]:
    """
    Check if coordinates fall within safe zones for overlays
    Returns (is_safe, list_of_violations)
    """
    violations = []
    
    # Check bottom UI zone (bottom 25%)
    bottom_boundary = frame_height * (1 - SAFE_ZONE_BOUNDS["bottom_ui_ratio"])
    if y > bottom_boundary:
        violations.append("Overlay in bottom 25% UI zone")
    
    # Check right UI zone (right 15%)
    right_boundary = frame_width * (1 - SAFE_ZONE_BOUNDS["right_ui_ratio"])
    if x > right_boundary:
        violations.append("Overlay in right 15% UI zone")
    
    is_safe = len(violations) == 0
    return is_safe, violations

def get_brand_kit() -> Dict[str, Any]:
    """Get complete brand kit configuration"""
    return {
        "colors": BRAND_COLORS,
        "safe_zone_bounds": SAFE_ZONE_BOUNDS,
        "font_styles": FONT_STYLES
    }

def load_brand_kit_from_file(file_path: str = None) -> Dict[str, Any]:
    """
    Load brand kit from JSON file or return default
    """
    if file_path and os.path.exists(file_path):
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Could not load brand kit from {file_path}: {e}")
            return get_brand_kit()
    
    return get_brand_kit()

def get_palette_tokens() -> Dict[str, str]:
    """Get palette tokens for direct use"""
    return {
        "primary": "#FFC700",
        "secondary": "#FF6B00",
        "text": "#FFFFFF",
        "background": "#121212"
    }
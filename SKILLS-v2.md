# SKILLS-v2.md - Reusable AI Video Editing & Animation Skills Library (v2.0)

> **System Skill Specifications, Auto-Linter Gatekeeper & JSON/Python Configuration Schemas**  
> Cloned from production workflows & persona tricks (*Mark - Lead Editor*) in *AI Monday Brief*.

---

## 1. Overview & Skill Architecture

In an autonomous AI Video Production SaaS, prompting from scratch for every video is inefficient and expensive. The system transforms validated editing recipes into persistent **Reusable Skills**. 

By cloning the exact workflow of **Mark (Lead Editor)**, the system executes a 5-stage pipeline:
1. **Rapid First Draft (`QUICK_DRAFT_GENERATOR`)**: Generates a rough cut in 15–30 minutes.
2. **Brand & Asset Injection (`BRAND_ASSET_INJECTOR`)**: Enforces brand book colors and handles missing assets on-the-fly.
3. **Auto-Linter Gatekeeper (`CONTENT_JUDGE_QC`)**: Automated QC that checks UX Safe Zones and clarity before human review (reducing revision loops by >80%).
4. **Recipe Extraction (`STYLING_TO_REUSABLE_SKILL`)**: Converts approved video styles into new reusable skill profiles.
5. **Feedback Mining (`NOTION_FEEDBACK_MINER`)**: Ingests Notion timestamp comments to refine editing rules over time.

---

## 2. Core Production Skills

### Skill 1: `QUICK_DRAFT_GENERATOR` (15-Min Rapid Draft Engine)

* **Target Format**: Raw Footage + Reference Video to First Draft.
* **Editing Philosophy**: Speed-first execution. Focus on trimming pauses/filler words and matching the pacing of the reference video before fine-tuning aesthetics.
* **JSON Skill Configuration**:

```json
{
  "skill_name": "QUICK_DRAFT_GENERATOR",
  "version": "2.0.0",
  "pipeline_stage": "DRAFTING",
  "execution_rules": {
    "target_turnaround_min": 15,
    "silence_removal_threshold_sec": 0.25,
    "filler_words_filter": ["เอ่อ", "อ่า", "แบบว่า", "um", "uh"],
    "match_reference_pacing": true
  },
  "brand_constraints": {
    "palette": ["#FFC700", "#FF6B00", "#FFFFFF", "#121212", "#FF3B30"]
  }
}
```

---

### Skill 2: `BRAND_ASSET_INJECTOR` (Brand Kit & Asset Handling)

* **Target Format**: Graphic Overlays, App Logos, Lower Thirds.
* **Editing Philosophy**: Strict brand compliance + dynamic missing asset ingestion.
* **Execution Protocol**:
  1. Enforce official hex colors for captions, backgrounds, and accents.
  2. If an app/company logo (e.g., ClickUp, Notion, Slack) is missing from the local library, trigger an interactive chat request allowing the user to paste an image/URL into the chat.
  3. Automatically pair every graphic pop-up with a matching Sound Effect (SFX).

```json
{
  "skill_name": "BRAND_ASSET_INJECTOR",
  "version": "1.2.0",
  "brand_kit": {
    "primary_color": "#FFC700",
    "secondary_color": "#FF6B00",
    "dark_bg": "#121212",
    "light_text": "#FFFFFF",
    "alert_color": "#FF3B30",
    "primary_font": "Kanit-ExtraBold"
  },
  "asset_fallback": {
    "auto_prompt_user_on_missing_asset": true,
    "sfx_mapping": {
      "logo_pop": "sfx_pop_click.wav",
      "text_slide": "sfx_whoosh_soft.wav",
      "badge_stamp": "sfx_thud_light.wav"
    }
  }
}
```

---

### Skill 3: `ROI_LONG_AMB` (Long-Form Podcast & Executive Briefing)

* **Target Format**: Horizontal 16:9 or Vertical 9:16 Long-Form Episode / Podcast.
* **Editing Philosophy**: Casual, professional, comfortable pacing without hyperactive jump cuts.
* **JSON Skill Configuration**:

```json
{
  "skill_name": "ROI_LONG_AMB",
  "version": "1.0.0",
  "aspect_ratio": "16:9",
  "pacing": {
    "silence_threshold_sec": 0.8,
    "trim_fillers": true,
    "transition_style": "subtle_crossfade"
  },
  "graphics": {
    "logo_position": "top_right",
    "topic_banner": "lower_third",
    "color_theme": ["#FFC700", "#121212", "#FFFFFF"]
  },
  "audio": {
    "bgm_style": "ambient_chill",
    "bgm_ducking_db": -20
  }
}
```

---

### Skill 4: `NATIVE_SHORT_REELS` (Viral Short-Form High-Retention Reels)

* **Target Format**: Vertical 9:16 Shorts / TikTok / Reels (0.5 - 2 minutes).
* **Editing Philosophy**: Fast-paced, high retention, animated graphic callouts above speaker head, strict Top-65% safe zone compliance.
* **JSON Skill Configuration**:

```json
{
  "skill_name": "NATIVE_SHORT_REELS",
  "version": "2.1.0",
  "aspect_ratio": "9:16",
  "pacing": {
    "silence_threshold_sec": 0.2,
    "trim_fillers": true,
    "cut_style": "jump_cut_on_sentence"
  },
  "graphics": {
    "safe_zone": "TOP_65_PERCENT_ONLY",
    "caption_font": "Kanit-ExtraBold",
    "caption_colors": {"highlight": "#FFC700", "normal": "#FFFFFF"},
    "software_logo_popups": true
  },
  "audio": {
    "sfx_on_graphic_pop": "pop_click_01.mp3",
    "bgm_style": "upbeat_lofi",
    "bgm_ducking_db": -16
  }
}
```

---

### Skill 5: `MASCOT_ANIMATION_AD` (2D/3D Brand Mascot Animation Ad)

* **Target Format**: 9:16 or 16:9 Animated Promo Ads featuring Mascot Persona (Lisa / IRA).
* **Editing Philosophy**: Story-driven character ad, emotional voice synthesis via ElevenLabs MCP, motion rendering via Kling AI.
* **JSON Skill Configuration**:

```json
{
  "skill_name": "MASCOT_ANIMATION_AD",
  "version": "1.5.0",
  "character_profile": {
    "name": "Lisa",
    "avatar_sheet_url": "/assets/mascots/lisa_clinic_admin.png",
    "voice_engine": "ELEVENLABS_MCP",
    "voice_id": "thai_female_warm_01",
    "language": "th-TH"
  },
  "video_synthesis": {
    "provider": "KLING_AI_MCP",
    "clip_duration_sec": 4,
    "motion_level": "medium_expressive"
  },
  "economics": {
    "target_cost_per_video_thb": 600
  }
}
```

---

## 3. Auto-Linter Gatekeeper (`CONTENT_JUDGE_QC`)

### The Content Judge Concept

The **Content Judge Agent** acts as an automated quality-control linter (`Auto-Linter Gatekeeper`). It inspects video drafts generated by drafting skills **before** pushing them to the human reviewer.

#### 🎯 Core Rules & Checklist:
1. **UX Safe Zone Rule (Top 65% Zone)**: For 9:16 vertical videos, all text overlays, logos, and animations MUST be located within the top 65% of the frame (`Y: 0% to 65%`). The bottom 35% and right 20% are strict **Danger Zones** (reserved for platform UI: captions, username, sound disk, like/comment buttons).
2. **Clarity > Fancy Aesthetics**: Overly flashy animations that distract from speaker clarity are automatically flagged and simplified.
3. **Pacing & SFX Sync**: Ensure sound effects trigger within ±0.05s of any graphic entrance.

---

### `linter_report.json` Schema

When the Auto-Linter evaluates a draft, it outputs a structured JSON report. If `status` is `REJECTED`, it automatically triggers an auto-fix remediation loop:

```json
{
  "draft_id": "draft_v1_20261014",
  "timestamp": "2026-10-14T21:05:00Z",
  "status": "REJECTED_AUTO_FIX_TRIGGERED",
  "pass_score": 72,
  "threshold_score": 90,
  "evaluation_results": {
    "safe_zone_top_65": {
      "passed": false,
      "violations": [
        {
          "timestamp": "00:15.200",
          "element": "Text Overlay 'โปรโมชั่นพิเศษ'",
          "y_bounding_box_start_pct": 78.5,
          "issue": "Element located in Bottom 35% TikTok/Reels UI Danger Zone"
        }
      ]
    },
    "clarity_and_simplicity": {
      "passed": true,
      "clutter_index": "Low"
    },
    "audio_sfx_sync": {
      "passed": true,
      "desync_ms": 12
    }
  },
  "remediation_instruction": "Shift text element at 00:15.200 upward by 220px to remain inside Y <= 65% safe zone area."
}
```

---

### Python Auto-Linter Verification Script Blueprint

```python
def run_content_judge_linter(video_keyframes, safe_zone_max_y=0.65, danger_zone_min_x=0.80):
    """
    Auto-Linter function to inspect frame overlays against UX Safe Zone rules.
    """
    violations = []
    
    for frame in video_keyframes:
        timestamp = frame["timestamp"]
        for overlay in frame["overlays"]:
            bbox = overlay["bounding_box"] # {"x_min": 0.1, "y_min": 0.70, "y_max": 0.82}
            
            # Check Y-axis Safe Zone (Top 65%)
            if bbox["y_max"] > safe_zone_max_y:
                violations.append({
                    "timestamp": timestamp,
                    "element": overlay["id"],
                    "issue": f"Y-max ({bbox['y_max']*100:.1f}%) exceeds Safe Zone threshold ({safe_zone_max_y*100:.0f}%)"
                })
                
            # Check Right Margin Danger Zone (Right 20% for Like/Share buttons)
            if bbox["x_max"] > danger_zone_min_x:
                violations.append({
                    "timestamp": timestamp,
                    "element": overlay["id"],
                    "issue": f"X-max ({bbox['x_max']*100:.1f}%) overlaps Right Action Buttons Zone ({danger_zone_min_x*100:.0f}%)"
                })
                
    status = "PASSED" if len(violations) == 0 else "REJECTED_AUTO_FIX_TRIGGERED"
    return {"status": status, "total_violations": len(violations), "details": violations}
```

---

## 4. Machine Learning & Continuous Refinement

### Skill: `NOTION_FEEDBACK_MINER`

* **Purpose**: Parses timestamped comments from Notion review boards and dynamically updates editing skill parameters over time.
* **Execution Blueprint**:

```python
def mine_notion_feedback_and_update_skill(notion_comments_log, skill_config):
    """
    Analyzes review comments to extract recurring preferences and adjust skill JSON.
    """
    for comment in notion_comments_log:
        text = comment["text"].lower()
        
        # Audio adjustment patterns
        if "เพลงดังไป" in text or "music too loud" in text:
            skill_config["audio"]["bgm_ducking_db"] -= 2.0
        elif "เพลงเบาไป" in text or "music too quiet" in text:
            skill_config["audio"]["bgm_ducking_db"] += 1.5
            
        # Safe zone adjustment patterns
        if "บังปุ่ม" in text or "ข้อความต่ำไป" in text:
            skill_config["graphics"]["safe_zone_max_y"] = 0.55 # Restrict further to top 55%
            
        # Pacing adjustment patterns
        if "ตัดช้าไป" in text or "too slow" in text:
            skill_config["pacing"]["silence_threshold_sec"] = max(0.1, skill_config["pacing"]["silence_threshold_sec"] - 0.1)
            
    return skill_config
```

---

*Grounded in production workflows & persona tricks from AI Monday Brief.*

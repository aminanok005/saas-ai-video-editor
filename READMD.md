# READMD.md - Smart SaaS System Architecture: AI Video Editing & Animation Platform

> **System Overview & Vibe Coding Blueprint**  
> Based on real-world workflows and creative AI agent frameworks from *AI Monday Brief* (The Rise of Intelligence) [1, 3, 26].

---

## 1. Executive Summary & Core Value Proposition

Traditional media production creates a severe **content backlog** that bottlenecks business growth for SMEs and content creators alike [4, 5]. Finding skilled video editors who align with brand tone is difficult and costly [6]. 

* **Traditional Human Editor Cost & Speed**: 2,000 - 4,000 THB per 1-2 minute video [12], taking 1-2 days of editing time and up to 1 week for total turnaround with revisions [11, 13].
* **Smart SaaS AI Pipeline**: Cuts cost down to **~30 - 40 THB per video** [15] using AI Code Editors & Agent Workflows [14, 18], reducing lead time to **1 day (or automated within hours)** [14, 28], enabling a volume of **80+ videos per month** per account [15, 16].
* **AI Mascot & Animation Ads**: Reduces high TVC/Animation production costs to **~600 THB per video** using 11Labs and Kling AI via MCP connectors [45, 48].

This document specifies the end-to-end architecture for building a **Smart SaaS platform** that automates video editing and 2D/3D mascot animation ads using multi-agent AI systems, custom editing skills, and Vibe Coding frameworks [1, 26, 31].

---

## 2. Core Modules Architecture

```
                                  +---------------------------------------+
                                  |     Raw Video / Script / Audio        |
                                  +---------------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |    Brand Kit & Skill Selector Engine   |
                                  |  (ROI_LONG_AMB / NATIVE_SHORT_REELS)  |
                                  +---------------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |  Lead Editor Agent (Mark Director)    |
                                  |  - Audio Trimming & STT Sync          |
                                  |  - Safe-Zone Graphic Overlay          |
                                  +---------------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |  AI Mascot & Voice Generator (Lisa)   |
                                  |  - 11Labs MCP (Thai TTS + Emotion)    |
                                  |  - Kling AI Video Rendering           |
                                  +---------------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |    Content Judge Agent (Arwin QC)     |
                                  |  - Safe Zone Validation (TikTok UI)   |
                                  |  - Clarity > Fancy Aesthetics Check   |
                                  +---------------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |  Notion Timestamp Feedback Sync Engine|
                                  |  - Continuous Pattern Machine Learning|
                                  +---------------------------------------+
```

---

## 3. Document Ecosystem Roadmap

This specification is divided into 5 modular markdown documentation files ready for Studio publishing:

1. **`READMD.md`** (This File): System Architecture, Business ROI Metrics, and Core SaaS Blueprint.
2. **`AGENTS.md`**: Multi-Agent Personas, Agent System Prompts (English), and Orchestration Logic [31, 32].
3. **`DESIGN.md`**: Design Tokens (Yellow/Orange/White/Black/Red), UX Safe-Zones for Shorts/TikTok, and Tailwind Vibe Coding Prompts [21, 33].
4. **`SKILLS-v2.md`**: Reusable Skill Definitions (`ROI_LONG_AMB`, `NATIVE_SHORT_REELS`, `MASCOT_ANIMATION_AD`, `NOTION_FEEDBACK_MINING`) [27, 29].
5. **`MASTER-PLAN.md`**: 4-Phase Implementation Roadmap & English Master Prompts for Cursor AI, Windsurf, Bolt.new, and v0 [28].

---

## 4. Vibe Coding Master System Prompt (English)

```markdown
You are an expert Full-Stack Software Architect and AI Engineer specializing in Next.js 14, Tailwind CSS, Python Fast API, FFmpeg, and Multi-Agent Orchestration.

Build a Smart SaaS Platform named "VibeCut AI" that automates short-form video editing and mascot animation generation.

Key Architecture Requirements:
1. Video Editing Engine: Programmatic video cuts, silence removal, subtitle burning, and graphic overlays (Top-Half Safe Zone).
2. Agent Ecosystem: Integrated Lead Editor Agent, Content Judge QC Agent, Mascot Generation Agent, and Notion Feedback Learner.
3. Skill Library: Pre-configured preset profiles for Long-Form Podcasts and Fast-Paced Vertical Shorts/Reels.
4. AI Animation Integration: ElevenLabs API (Thai TTS with emotional nuances) + Kling AI / Runway via MCP connectors.
5. Tech Stack: Next.js 14 App Router, Tailwind CSS, Shadcn UI, Zustand, Python FastAPI backend with FFmpeg & MoviePy.

Ensure clean code, responsive dark-mode UI with Yellow (#FFC700) and Orange (#FF6B00) brand accents.
```

---
*Grounded in source material from AI Monday Brief (October 12).* [1]
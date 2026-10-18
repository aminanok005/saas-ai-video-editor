# 🎨 STYLE-DESIGN.md — VibeCut AI SaaS UI/UX & CSS Design System Specs

> **Design Specification & Theme Tokens**
> Blending High-Efficiency Ergonomics (Barista POS Workflow) with Pro Cyber-Studio Dark Mode for VibeCut AI Video SaaS.

---

## 🛠️ 1. Design Philosophy & Vision

VibeCut AI SaaS UI/UX combines **two core UX principles**:
1. **Barista POS Ergonomics (High-Clarity, Zero-Friction Operations)**: Large touch/click targets, immediate visual state feedback, task-focused card groupings, and zero cognitive clutter under fast-paced production.
2. **Cyber-Studio Pro Dark Mode**: Deep obsidian surface (`#0D0E12`), warm espresso charcoal panels (`#161820`), cyber-gold amber accents (`#FFB800`), and crisp neon status indicators (`#34C759`, `#FF3B30`).

---

## 🎨 2. Design Tokens & CSS Variables

```css
/* VibeCut AI - Design Tokens */
:root {
  /* Surface & Background Layering */
  --bg-app: #0D0E12;                  /* Ultra Dark Obsidian Base */
  --bg-surface: #161820;              /* Warm Charcoal Panel Surface */
  --bg-surface-hover: #202330;        /* Hover Card State */
  --bg-glass: rgba(22, 24, 32, 0.75);   /* Glassmorphism Backdrop Filter */
  
  /* Primary Accent Palette (Warm Amber & Cyber Gold) */
  --accent-gold: #FFB800;             /* Primary Brand Amber Gold */
  --accent-gold-glow: rgba(255, 184, 0, 0.20);
  --accent-orange: #FF6B00;           /* Active Action Orange */
  --accent-orange-glow: rgba(255, 107, 0, 0.20);

  /* Agent & QC Status Colors */
  --status-pass: #34C759;             /* QC Passed Emerald Green */
  --status-warning: #FF9F0A;          /* Safe-Zone Caution Orange */
  --status-fail: #FF3B30;             /* Safe-Zone Violation Crimson */
  --status-active: #0A84FF;           /* Agent Processing Blue */

  /* Neutral Text & Borders */
  --text-primary: #F5F6FA;            /* Crisp High-Contrast White */
  --text-secondary: #9DA3B4;          /* Slate Secondary Text */
  --text-muted: #62687A;              /* Muted Label Text */
  --border-subtle: #2A2E3D;           /* Subtle Card Divider */
  --border-focus: #FFB800;            /* Active Focus Ring */

  /* Structural Geometry & Layout */
  --font-main: 'Kanit', 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --shadow-card: 0 12px 32px 0 rgba(0, 0, 0, 0.45);
}
```

---

## 📐 3. Key Page Architecture & Layout Breakdown

### 📱 Page 1: Main Studio Dashboard (`/dashboard`)
* **Layout**: 3-Column Studio Workspace
  * **Left Column (Asset & Skill Engine)**:
    * Drag & Drop Raw Video Upload Zone with progress bar.
    * Skill Selection Grid: 5 Card Presets (`ROI_LONG_AMB`, `NATIVE_SHORT_REELS`, `MASCOT_ANIMATION_AD`, `QUICK_DRAFT_GENERATOR`, `BRAND_ASSET_INJECTOR`).
    * Brand Kit Quick-Palette (Yellow `#FFC700`, Orange `#FF6B00`, White `#FFFFFF`, Black `#121212`, Red `#FF3B30`).
  * **Center Column (Video Player & Safe-Zone Viewport)**:
    * 9:16 Vertical / 16:9 Video Canvas.
    * **Top 65% Safe-Zone Overlay Toggle**: Interactive grid showing TikTok/Reels UI danger zones (Right side buttons + Bottom caption overlay).
    * Timeline playback & Bounding Box highlight overlay.
  * **Right Column (4-Agent Orchestration HUD)**:
    * Live Status Widgets for:
      1. **Mark (Lead Editor)**: Script trimming & jump-cut pacing.
      2. **Lisa (Mascot Persona)**: ElevenLabs voice synthesis & Kling AI animation status.
      3. **Arwin (Content Judge)**: Real-time Safe Zone QC Score (`100/100`) + **1-Click Auto-Fix Button**.
      4. **Feedback Miner**: Notion comment sync & pattern learning logs.

### 🎭 Page 2: Mascot Studio (`/mascot`)
* Character sheet avatar selector (Lisa / IRA).
* Emotion Voice Pitcher (Thai Female Warm / Excitement / Serious).
* Script-to-Animation preview with lip-sync test playback.

### 🔍 Page 3: Safe-Zone QC & Linter Inspector (`/qc-inspector`)
* Timestamped violation list with frame coordinates.
* Side-by-side comparison: `Original Draft` vs `Auto-Fixed Safe-Zone Output`.

### ⚙️ Page 4: Skills & Notion Pipeline Config (`/skills-manager`)
* Interactive JSON Skill Editor.
* Notion Webhook status & API Token management.

---

## 🤖 4. Master Vibe Coding Prompt for `style-design.md`

Use this prompt in **v0.dev, Bolt.new, Cursor AI, Windsurf, or Claude Artifacts** to build the complete design system and UI layout:

```text
Build a high-performance Next.js 14 App Router dashboard for "VibeCut AI Video Editor SaaS" using Tailwind CSS, Lucide Icons, and Framer Motion based on the following Design Specs:

Design System & Theme:
- Theme: "Warm Cyber Gold & Studio Charcoal"
- Background: #0D0E12
- Card Surface: #161820 with #2A2E3D subtle border & 14px border radius
- Accents: #FFB800 Amber Gold for primary buttons & active state, #FF6B00 for active agent badges
- Typography: Kanit / Inter for text, JetBrains Mono for code & timestamps

Core Components to Implement:
1. Studio Header: VibeCut AI Logo, Project Title, Agent Pipeline Status (All Operational), and Export Button.
2. 3-Column Grid Dashboard Layout:
   - Left Panel (300px): Video Upload Dropzone + 5 Skill Preset Cards with active highlight.
   - Center Panel (Flex 1): Vertical 9:16 Video Canvas with a toggle button "Toggle Top 65% Safe-Zone Overlay" (renders semi-transparent guide lines showing TikTok/Reels UI boundaries).
   - Right Panel (340px): 4-Agent Status Cards (Mark, Lisa, Arwin QC, Feedback Miner) with live logs and a prominent "Auto-Fix Safe-Zone (1-Click)" button.
3. QC Alert Banner: Display an alert card showing "QC Score: 85/100 - Safe Zone Violation at 00:28 (Text Overlay at 78% Y-axis)" with an inline "Apply Auto-Fix" button.
4. Smooth animations using Framer Motion on agent status changes and card hovers.
```

---
*Grounded in VibeCut AI SaaS Architecture & Ergonomic POS Design System.*

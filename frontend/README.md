# VibeCut AI Frontend

This is the Next.js 14 frontend for the VibeCut AI Video Editor SaaS platform.

## Features

- **4-Agent Pipeline**: Real-time status monitoring for Mark, Lisa, Arwin, and Feedback Miner agents
- **3-Column Studio Dashboard**: Video input, preview, and agent control panels
- **5 Editing Skills**: ROI_LONG_AMB, NATIVE_SHORT_REELS, MASCOT_ANIMATION_AD, QUICK_DRAFT_GENERATOR, BRAND_ASSET_INJECTOR
- **Safe Zone Overlay**: Interactive TikTok/Reels UI safe zone visualization
- **Real-time API Integration**: Connects to FastAPI backend at `http://localhost:8000`
- **WebSocket-like Updates**: Live pipeline status and log streaming
- **Responsive Design**: Optimized for both mobile and desktop
- **Glassmorphism UI**: Modern, translucent interface elements
- **Framer Motion Animations**: Smooth transitions and micro-interactions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Kanit, Inter, JetBrains Mono
- **API Client**: TypeScript with async/await patterns

## Design System

The frontend follows the Warm Cyber Gold + Studio Charcoal dark theme:
- Background: `#0D0E12` (Obsidian Dark)
- Surface: `#161820` (Warm Charcoal)
- Primary Accent: `#FFB800` (Cyber Gold)
- Secondary Accent: `#FF6B00` (Orange)
- Status Colors: Green (`#34C759`), Orange (`#FF9F0A`), Red (`#FF3B30`), Blue (`#0A84FF`)

## Pages

1. **Dashboard** (`/dashboard`) - Main studio interface with 3-column layout
2. **Mascot Studio** (`/mascot`) - Character creation and voice animation tools
3. **Safe-Zone QC Inspector** (`/qc-inspector`) - Video quality control and violation analysis
4. **Skills & Notion Config** (`/skills-manager`) - Skill presets and pipeline configuration

## API Endpoints

- `GET /health` - Backend health check
- `GET /api/v1/skills` - Fetch all editing skills
- `POST /api/v1/video/upload` - Upload video for processing
- `GET /api/v1/pipeline/health` - Get pipeline health status
- `POST /api/v1/webhook/notion-qc` - Trigger Notion QC webhook

## Development

```bash
cd frontend
npm run dev
```

## Build

```bash
cd frontend
npm run build
npm start
```

## Integration Notes

- Requires running backend at `http://localhost:8000`
- Add `NEXT_PUBLIC_API_URL` environment variable if backend is on different port
- Notion API integration available in skills-manager page
- All video processing happens through the 4-agent pipeline

## Architecture

- **Frontend**: React/Next.js with TypeScript
- **State Management**: React hooks with context provider
- **API Layer**: Centralized API client with error handling
- **UI Components**: Atomic design system with Tailwind
- **Animations**: Framer Motion for smooth transitions
- **Real-time Updates**: Simulated WebSocket-style updates for demo
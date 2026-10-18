# VibeCut AI Frontend - Quick Start

## Overview

This is the Next.js 14 frontend for VibeCut AI, a comprehensive video editing SaaS platform with a 4-agent AI pipeline. The frontend provides a real-time dashboard for video processing, agent monitoring, and quality control.

## Prerequisites

- Node.js 18+ installed
- Next.js 14+ (will be installed via npm)
- Backend running at `http://localhost:8000` (FastAPI service)

## Setup Steps

### 1. Clone and Navigate

```bash
cd /path/to/your/project
```

### 2. Navigate to Frontend Directory

```bash
cd saas-ai-video-editor/frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5. Start the Application

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

## Features

### 📊 Main Dashboard

The dashboard features a 3-column layout:

**Left Column: Video Input & Skills**
- Video upload with drag-and-drop support
- 5 editing skill presets:
  - ROI_LONG_AMB (Long-form Podcast)
  - NATIVE_SHORT_REELS (Viral Shorts)
  - MASCOT_ANIMATION_AD (Mascot Ads)
  - QUICK_DRAFT_GENERATOR (Quick Draft)
  - BRAND_ASSET_INJECTOR (Brand Injector)

**Center Column: Video Preview**
- Interactive video player with 9:16 and 16:9 modes
- Top 65% Safe Zone overlay toggle
- Real-time timeline with progress bar
- TikTok/Reels UI guidelines overlay

**Right Column: 4-Agent Pipeline**
- Live status monitoring for:
  - Mark (Lead Editor)
  - Lisa (Mascot Actor)
  - Arwin (Content Judge)
  - Feedback Miner (Notion Sync)
- Real-time log streaming
- Approve/Reject controls

### 🎭 Mascot Studio

Character creation and animation tools:
- Character selection (Lisa / IRA)
- Emotion voice pitching
- Lip-sync testing
- Animation preview

### 🔍 Safe-Zone QC Inspector

Quality control interface:
- Timestamped violation lists
- Side-by-side comparison (original vs fixed)
- Y-axis coordinate analysis
- Auto-fix controls

### ⚙️ Skills & Notion Config

Configuration panel:
- Interactive JSON skill editor
- Notion webhook management
- Pipeline settings
- API token management

## API Integration

The frontend integrates with the FastAPI backend through:

- **Health Check**: `GET /health`
- **Skills List**: `GET /api/v1/skills`
- **Video Upload**: `POST /api/v1/video/upload`
- **Pipeline Health**: `GET /api/v1/pipeline/health`
- **Notion Webhook**: `POST /api/v1/webhook/notion-qc`

## Design System

### Colors

- **Background**: `#0D0E12` (Obsidian Dark)
- **Surface**: `#161820` (Warm Charcoal)
- **Primary Accent**: `#FFB800` (Cyber Gold)
- **Secondary Accent**: `#FF6B00` (Orange)
- **Success**: `#34C759` (Green)
- **Warning**: `#FF9F0A` (Orange)
- **Danger**: `#FF3B30` (Red)
- **Info**: `#0A84FF` (Blue)

### Typography

- **Main Font**: Kanit / Inter
- **Code Font**: JetBrains Mono
- **Hierarchy**: System font stack for optimal performance

## Development Workflow

### Running Tests

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

## Demo Mode

If the backend is not available, the application will run in demo mode with:

- Mock API responses
- Simulated agent processing
- Sample data and logs
- Full feature demonstration

## Common Issues

### Backend Not Running

```bash
# Start the FastAPI backend (should be running in another terminal)
cd /path/to/backend
saas-ai-video-editor/backend/venv/bin/python -m app.main
```

### Port Conflicts

If port 3000 is in use:

```bash
# Change Next.js port
npm run dev -- -p 3001
```

### Build Errors

If there are TypeScript errors:

```bash
# Check TypeScript errors
npm run lint
```

## Integration with Backend

The frontend assumes the following backend endpoints are available:

1. **Health Check**: Returns system status
2. **Skills API**: Returns all 5 editing skill configurations
3. **Video Upload**: Processes videos through the 4-agent pipeline
4. **Pipeline Health**: Monitors individual agent status
5. **Notion Webhook**: Syncs QC results to Notion

## Deployment

For production deployment:

1. **Build**: `npm run build`
2. **Deploy**: Upload to your hosting provider
3. **Environment Variables**: Configure `NEXT_PUBLIC_API_URL`
4. **SSL**: Ensure HTTPS is enabled

## Troubleshooting

### Blank Screen

- Check browser console for JavaScript errors
- Verify backend connectivity
- Clear browser cache

### API Errors

- Ensure backend is running
- Check environment variables
- Verify API endpoint URLs

### Animation Issues

- Check browser compatibility
- Disable animations if needed
- Refresh page

## Support

For issues and support:
- Check the console for error details
- Verify all prerequisites are met
- Ensure backend connectivity
- Review the API endpoint responses

## Release Notes

- **v0.1.0**: Initial release with full dashboard functionality
- **Features**: 4-agent pipeline, real-time monitoring, video processing
- **UI/UX**: Responsive design, glassmorphism effects, smooth animations

The frontend is now ready for use and provides a comprehensive demo of the VibeCut AI video editing platform!
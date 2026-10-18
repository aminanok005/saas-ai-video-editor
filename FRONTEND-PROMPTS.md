# 🎨 VibeCut AI: Next.js 14 Dashboard Vibe Coding Specifications & Integration Tests
เอกสารฉบับนี้รวบรวมข้อกำหนดการออกแบบ **Next.js 14 Frontend Dashboard** และชุดคำสั่งทดสอบ **Integration Test Suite** สำหรับแพลตฟอร์ม VibeCut AI SaaS

---
## 1. 🚀 Next.js 14 Dashboard Vibe Coding Prompt Specifications
> **การใช้งาน**: คัดลอกบล็อกคำสั่งภาษาอังกฤษด้านล่างนี้ไปวางใน **v0.dev**, **Bolt.new**, **Cursor AI**, **Windsurf**, หรือ **Claude Artifacts**

```text
Build a modern Next.js 14 (App Router) Video SaaS Dashboard for "VibeCut AI" with Tailwind CSS, Shadcn UI, and Framer Motion.

DESIGN TOKENS:
- Dark theme: Background #121212, Surface Card #1E1E1E, Border #2A2A2A
- Accent Colors: Yellow #FFC700, Orange #FF6B00, White #FFFFFF, Danger Red #FF3B30, Success Green #34C759
- Clean sans-serif typography (Kanit / Inter)

DASHBOARD LAYOUT (3-COLUMN STUDIO GRID):

1. Header:
- Logo "VibeCut AI" with badge "4-Agent Engine Active"
- Status indicator pill connecting to /health endpoint

2. Left Column - Video Input & Skill Selector:
- File dropzone for MP4/MOV upload with progress bar
- Skill selector cards for 5 editing styles:
  1) ROI_LONG_AMB (Long-form Podcast)
  2) NATIVE_SHORT_REELS (Viral Shorts with Top 65% Safe Zone)
  3) MASCOT_ANIMATION_AD (Lisa Mascot 2D/3D Ad)
  4) QUICK_DRAFT_GENERATOR (Fast 15-min Draft)
  5) BRAND_ASSET_INJECTOR (Brand Kit & Logo Overlay)

3. Center Column - Video Preview & Safe-Zone Overlay:
- Video player container (9:16 and 16:9 view modes)
- Toggle button for "Top 65% Safe Zone Overlay" (visualizing TikTok/Reels UI safe zone)
- Interactive timeline bar

4. Right Column - 4-Agent Pipeline & Quality Control:
- Live status pipeline widget for 4 agents:
  - Mark (Lead Editor Agent)
  - Lisa (Mascot Actor Agent)
  - Arwin (Content Judge Agent - Safe Zone QC Score)
  - Feedback Miner Agent (Notion Sync)
- Stream of timestamped feedback comments
- Action buttons: Trigger Auto-Fix, Approve Final Render

API CLIENT INTEGRATION (lib/api.ts):
- getHealth(): GET /health
- getSkills(): GET /api/v1/skills
- uploadVideo(file, skill): POST /api/v1/video/upload
- getPipelineHealth(): GET /api/v1/pipeline/health
- triggerNotionQC(payload): POST /api/v1/webhook/notion-qc
```

---
## 2. 💻 TypeScript API Client (`lib/api.ts`)

```typescript
// lib/api.ts - Typed API Client for VibeCut AI Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface SkillConfig {
  skill_name: string;
  version: string;
  aspect_ratio: string;
  pacing: Record<string, any>;
  graphics: Record<string, any>;
  audio: Record<string, any>;
}

export interface PipelineHealth {
  status: string;
  agents: {
    mark_editor: string;
    lisa_mascot: string;
    arwin_judge: string;
    feedback_miner: string;
  };
}

export interface UploadResponse {
  status: string;
  project_id: string;
  filename: string;
  assigned_skill: string;
  message: string;
}

export const api = {
  getHealth: async () => {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error("Backend offline");
    return res.json();
  },

  getSkills: async (): Promise<Record<string, SkillConfig>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/skills`);
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
  },

  uploadVideo: async (file: File, skillName: string): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("skill_name", skillName);

    const res = await fetch(`${API_BASE_URL}/api/v1/video/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Video upload failed");
    return res.json();
  },

  getPipelineHealth: async (): Promise<PipelineHealth> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/pipeline/health`);
    if (!res.ok) throw new Error("Pipeline offline");
    return res.json();
  },

  triggerNotionQC: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/webhook/notion-qc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("QC Webhook failed");
    return res.json();
  },
};
```

---
## 3. 🧪 Python End-to-End Integration Test Suite (`tests/test_e2e_integration.py`)

```python
import pytest
import httpx
import asyncio

BASE_URL = "http://localhost:8000"

@pytest.mark.asyncio
async def test_01_health_check():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/health")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] in ["ok", "healthy"]

@pytest.mark.asyncio
async def test_02_get_skills():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/api/v1/skills")
        assert res.status_code == 200
        skills = res.json()
        assert len(skills) > 0

@pytest.mark.asyncio
async def test_03_pipeline_health():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/api/v1/pipeline/health")
        assert res.status_code == 200
        data = res.json()
        assert "status" in data

@pytest.mark.asyncio
async def test_04_notion_qc_webhook_trigger():
    payload = {
        "event_type": "comment_added",
        "page_id": "test-page-001",
        "project_name": "Integration_Test_Project",
        "video_draft_url": "http://localhost:8000/draft1.mp4",
        "comments": [
            {
                "comment_id": "c1",
                "timestamp_tag": "[00:15]",
                "text": "ข้อความต่ำเกินไป บังปุ่มกด",
                "author": "Tester"
            }
        ]
    }
    async with httpx.AsyncClient() as client:
        res = await client.post(f"{BASE_URL}/api/v1/webhook/notion-qc", json=payload)
        assert res.status_code in [200, 202]

if __name__ == "__main__":
    print("🚀 Running Integration Tests...")
    asyncio.run(test_01_health_check())
    asyncio.run(test_02_get_skills())
    asyncio.run(test_03_pipeline_health())
    asyncio.run(test_04_notion_qc_webhook_trigger())
    print("✅ All Integration Tests Passed Successfully!")
```

---
## 4. ⚡ cURL Quick Integration Commands

```bash
# 1. Health Check
curl -X GET http://localhost:8000/health

# 2. Fetch Skills
curl -X GET http://localhost:8000/api/v1/skills

# 3. Pipeline Health
curl -X GET http://localhost:8000/api/v1/pipeline/health

# 4. Trigger Notion Webhook QC
curl -X POST http://localhost:8000/api/v1/webhook/notion-qc \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "comment_added",
    "page_id": "page-999",
    "project_name": "cURL_Test_Video",
    "video_draft_url": "http://localhost:8000/demo.mp4",
    "comments": [{"comment_id": "c1", "timestamp_tag": "[00:10]", "text": "เพลงดังเกินไป", "author": "Mark"}]
  }'
```

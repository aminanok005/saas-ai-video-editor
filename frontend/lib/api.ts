// lib/api.ts - Typed API Client for VibeCut AI Backend
// Uses /api prefix to route through Next.js proxy (next.config.js rewrites /api/:path* to http://localhost:8000/:path)
// This avoids CORS issues since the proxy forwards requests without changing the origin
const API_BASE_URL = "/api-backend";

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
    const res = await fetch(`${API_BASE_URL}/v1/`);
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
  },

  getSkill: async (skillName: string): Promise<SkillConfig> => {
    const res = await fetch(`${API_BASE_URL}/v1/${skillName}`);
    if (!res.ok) throw new Error(`Failed to fetch skill: ${skillName}`);
    return res.json();
  },

  uploadVideo: async (file: File, skillName: string): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("skill_name", skillName);

    const res = await fetch(`${API_BASE_URL}/v1/video/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Video upload failed");
    return res.json();
  },

  getPipelineHealth: async (): Promise<PipelineHealth> => {
    const res = await fetch(`${API_BASE_URL}/v1/pipeline/health`);
    if (!res.ok) throw new Error("Pipeline offline");
    return res.json();
  },

  triggerNotionQC: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/v1/webhook/notion-qc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("QC Webhook failed");
    return res.json();
  },
};
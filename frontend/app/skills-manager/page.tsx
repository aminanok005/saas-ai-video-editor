"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Save, AlertTriangle, CheckCircle, Plus, Trash2, Edit3 } from 'lucide-react';
import { api } from '@/lib/api';

interface SkillConfig {
  skill_name: string;
  version: string;
  aspect_ratio: string;
  pacing: Record<string, any>;
  graphics: Record<string, any>;
  audio: Record<string, any>;
}

const initialSkillConfigs: SkillConfig = {
  skill_name: 'ROI_LONG_AMB',
  version: '2.1.0',
  aspect_ratio: '9:16',
  pacing: {
    intro: { start: 0, end: 5, text: 'Product introduction', adjust_transcript: true },
    hook: { start: 5, end: 15, text: 'Hook with pain point', adjust_transcript: true },
    value_prop: { start: 15, end: 35, text: 'Value proposition', adjust_transcript: true },
    proof_points: { start: 35, end: 55, text: 'Proof and testimonials', adjust_transcript: false },
    closing: { start: 55, end: 70, text: 'Strong closing statement', adjust_transcript: true }
  },
  graphics: {
    callouts: false,
    logos: true,
    text_overlays: false
  },
  audio: {
    bgm_ducking: false,
    voice_enhancement: true
  }
};

export default function SkillsManagerPage() {
  const [skills, setSkills] = useState<Record<string, SkillConfig>>({
    ROI_LONG_AMB: initialSkillConfigs,
    NATIVE_SHORT_REELS: { ...initialSkillConfigs, skill_name: 'NATIVE_SHORT_REELS', version: '2.2.0' },
    MASCOT_ANIMATION_AD: { ...initialSkillConfigs, skill_name: 'MASCOT_ANIMATION_AD', version: '2.0.0' },
    QUICK_DRAFT_GENERATOR: { ...initialSkillConfigs, skill_name: 'QUICK_DRAFT_GENERATOR', version: '1.5.0' },
    BRAND_ASSET_INJECTOR: { ...initialSkillConfigs, skill_name: 'BRAND_ASSET_INJECTOR', version: '2.3.0' }
  });

  const [selectedSkill, setSelectedSkill] = useState('ROI_LONG_AMB');
  const [isNotionConnected, setIsNotionConnected] = useState(true);
  const [notionTokenStatus, setNotionTokenStatus] = useState<'connected' | 'expired' | 'warning'>('connected');
  const [webhookStatus, setWebhookStatus] = useState<'active' | 'inactive' | 'error'>('active');

  const skillsList = ['ROI_LONG_AMB', 'NATIVE_SHORT_REELS', 'MASCOT_ANIMATION_AD', 'QUICK_DRAFT_GENERATOR', 'BRAND_ASSET_INJECTOR'];

  const updateSkill = (updates: Partial<SkillConfig>) => {
    setSkills(prev => ({
      ...prev,
      [selectedSkill]: { ...prev[selectedSkill], ...updates }
    }));
  };

  const handleWebhookTrigger = async () => {
    try {
      await api.triggerNotionQC({
        event_type: 'skill_updated',
        page_id: 'skill-manager-page',
        project_name: 'Interactive_Skill_Config',
        video_draft_url: 'http://localhost:8000/draft1.mp4',
        comments: [{
          comment_id: 'webhook-1',
          timestamp_tag: '[00:00]',
          text: 'Skill configuration updated via webhook',
          author: 'Admin'
        }]
      });
      setWebhookStatus('active');
    } catch (error) {
      setWebhookStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-app p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Skills & Notion Pipeline Config</h1>
            <p className="text-secondary">Interactive JSON Skill Editor and Notion Webhook status</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => console.log('Saving skills...', skills)}
              className="p-2 bg-surface-hover text-primary rounded-lg border border-subtle hover:border-accent-gold transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-accent-gold text-app rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
              <Play className="w-4 h-4" />
              Test Pipeline
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Skill Selector */}
          <div className="col-span-3 space-y-6">
            {/* Skill Selector */}
            <div className="bg-surface rounded-lg border border-subtle shadow-card p-4">
              <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 accent-gold" />
                Skill Presets
              </h2>
              <div className="space-y-2">
                {skillsList.map((skillName) => (
                  <motion.button
                    key={skillName}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSkill(skillName)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${selectedSkill === skillName
                        ? 'border-accent-gold bg-accent-gold bg-opacity-10'
                        : 'border-subtle hover:border-accent-gold/50'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-primary text-sm">{skillName}</h3>
                      <span className="text-xs text-secondary">v{skills[skillName].version}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted">Ratio</span>
                        <span className="ml-1 text-primary">{skills[skillName].aspect_ratio}</span>
                      </div>
                      <div>
                        <span className="text-muted">Auto Fix</span>
                        <span className="ml-1 text-status-pass">✓</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 rounded-lg border border-dashed border-subtle hover:border-accent-gold/50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-secondary" />
                  <span className="text-secondary text-sm">New Skill</span>
                </motion.button>
              </div>
            </div>

            {/* Notion Webhook Status */}
            <div className="bg-surface rounded-lg border border-subtle shadow-card p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">Notion Webhook</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isNotionConnected ? 'bg-status-pass animate-pulse' : 'bg-status-fail'}`}></div>
                    <span className="text-sm text-primary">Status: {isNotionConnected ? 'Connected' : 'Disconnected'}</span>
                  </div>
                  <button
                    onClick={() => setIsNotionConnected(!isNotionConnected)}
                    className="p-1 bg-surface text-primary rounded hover:bg-subtle transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-secondary">API Token Status</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${notionTokenStatus === 'connected' ? 'bg-status-pass text-app' : notionTokenStatus === 'warning' ? 'bg-status-warning text-app' : 'bg-status-fail text-white'}`}>{
                      notionTokenStatus === 'connected' ? 'Connected' : notionTokenStatus === 'warning' ? 'Expiring Soon' : 'Expired'
                    }</span>
                  </div>
                  <div className="w-full bg-subtle rounded-full h-2">
                    <div className="bg-status-pass h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-secondary">Webhook</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${webhookStatus === 'active' ? 'bg-status-pass text-app' : webhookStatus === 'error' ? 'bg-status-fail text-white' : 'bg-subtle text-secondary'}`}>{
                      webhookStatus === 'active' ? 'Active' : webhookStatus === 'error' ? 'Error' : 'Inactive'
                    }</span>
                  </div>
                  <button
                    onClick={handleWebhookTrigger}
                    className="w-full mt-2 px-3 py-2 bg-accent-gold text-app rounded text-xs hover:bg-opacity-90 transition-all"
                  >
                    Test Webhook
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Skill Editor */}
          <div className="col-span-9 space-y-6">
            <div className="bg-surface rounded-lg border border-subtle shadow-card p-6">
              <h2 className="text-xl font-semibold text-primary mb-6">JSON Skill Editor: {selectedSkill}</h2>

              <div className="space-y-6">
                {/* Basic Configuration */}
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Basic Configuration</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-secondary mb-2 block">Skill Name</label>
                      <input
                        type="text"
                        value={skills[selectedSkill].skill_name}
                        onChange={(e) => updateSkill({ skill_name: e.target.value })}
                        className="w-full p-2 bg-surface-hover text-primary rounded-lg border border-subtle focus:border-accent-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-secondary mb-2 block">Version</label>
                      <input
                        type="text"
                        value={skills[selectedSkill].version}
                        onChange={(e) => updateSkill({ version: e.target.value })}
                        className="w-full p-2 bg-surface-hover text-primary rounded-lg border border-subtle focus:border-accent-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-secondary mb-2 block">Aspect Ratio</label>
                      <select
                        value={skills[selectedSkill].aspect_ratio}
                        onChange={(e) => updateSkill({ aspect_ratio: e.target.value })}
                        className="w-full p-2 bg-surface-hover text-primary rounded-lg border border-subtle focus:border-accent-gold focus:outline-none"
                      >
                        <option value="9:16">9:16</option>
                        <option value="16:9">16:9</option>
                        <option value="1:1">1:1</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pacing Configuration */}
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Pacing Configuration</h3>
                  <div className="space-y-3">
                    {Object.entries(skills[selectedSkill].pacing).map(([stage, config]) => (
                      <div key={stage} className="flex items-center gap-4 p-3 bg-surface-hover rounded-lg">
                        <div className="w-24">
                          <label className="text-xs text-secondary">Stage</label>
                          <input
                            type="text"
                            value={(config as any).text}
                            onChange={(e) => {
                              const newPacing = { ...skills[selectedSkill].pacing };
                              newPacing[stage] = { ...config, text: e.target.value };
                              updateSkill({ pacing: newPacing });
                            }}
                            className="w-full p-1 bg-surface text-primary rounded text-xs"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-secondary">Start</label>
                          <input
                            type="number"
                            value={(config as any).start}
                            onChange={(e) => {
                              const newPacing = { ...skills[selectedSkill].pacing };
                              newPacing[stage] = { ...config, start: parseInt(e.target.value) };
                              updateSkill({ pacing: newPacing });
                            }}
                            className="w-16 p-1 bg-surface text-primary rounded text-xs"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-secondary">End</label>
                          <input
                            type="number"
                            value={(config as any).end}
                            onChange={(e) => {
                              const newPacing = { ...skills[selectedSkill].pacing };
                              newPacing[stage] = { ...config, end: parseInt(e.target.value) };
                              updateSkill({ pacing: newPacing });
                            }}
                            className="w-16 p-1 bg-surface text-primary rounded text-xs"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`${stage}-adjust`}
                            checked={(config as any).adjust_transcript}
                            onChange={(e) => {
                              const newPacing = { ...skills[selectedSkill].pacing };
                              newPacing[stage] = { ...config, adjust_transcript: e.target.checked };
                              updateSkill({ pacing: newPacing });
                            }}
                            className="w-4 h-4 accent-accent-gold"
                          />
                          <label htmlFor={`${stage}-adjust" className="text-xs text-secondary">Adjust</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphics & Audio Settings */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-3">Graphics Settings</h3>
                    <div className="space-y-3">
                      {['callouts', 'logos', 'text_overlays'].map((setting) => {
                        const value = (skills[selectedSkill].graphics as any)[setting];
                        return (
                          <div key={setting} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                            <span className="text-sm text-primary capitalize">{setting.replace('_', ' ')}</span>
                            <button
                              onClick={() => {
                                const newGraphics = { ...skills[selectedSkill].graphics };
                                newGraphics[setting] = !value;
                                updateSkill({ graphics: newGraphics });
                              }}
                              className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-accent-gold' : 'bg-subtle'}
                              `}
                            >
                              <div
                                className={`w-4 h-4 bg-app rounded-full absolute top-1 transition-transform ${value ? 'right-1' : 'left-1'}
                                `}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-primary mb-3">Audio Settings</h3>
                    <div className="space-y-3">
                      {['bgm_ducking', 'voice_enhancement'].map((setting) => {
                        const value = (skills[selectedSkill].audio as any)[setting];
                        return (
                          <div key={setting} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                            <span className="text-sm text-primary capitalize">{setting.replace('_', ' ')}</span>
                            <button
                              onClick={() => {
                                const newAudio = { ...skills[selectedSkill].audio };
                                newAudio[setting] = !value;
                                updateSkill({ audio: newAudio });
                              }}
                              className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-accent-gold' : 'bg-subtle'}
                              `}
                            >
                              <div
                                className={`w-4 h-4 bg-app rounded-full absolute top-1 transition-transform ${value ? 'right-1' : 'left-1'}
                                `}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
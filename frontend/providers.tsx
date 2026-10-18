"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from './lib/api';

interface AppContextType {
  isApiConnected: boolean;
  setIsApiConnected: (connected: boolean) => void;
  healthStatus: any;
  setHealthStatus: (status: any) => void;
  skills: Record<string, any>;
  setSkills: (skills: Record<string, any>) => void;
  pipelineHealth: any;
  setPipelineHealth: (health: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);
  const [skills, setSkills] = useState({});
  const [pipelineHealth, setPipelineHealth] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check backend health with timeout to avoid hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Backend offline')), 1500)
        );

        const [health, skillsData, pipeline] = await Promise.race([
          Promise.all([api.getHealth(), api.getSkills(), api.getPipelineHealth()]),
          timeoutPromise
        ]);

        setHealthStatus(health);
        setIsApiConnected(true);
        setSkills(skillsData);
        setPipelineHealth(pipeline);
        console.log('✅ VibeCut AI Frontend connected to backend successfully');
      } catch (error) {
        console.log('ℹ️ VibeCut AI: Backend offline, running in Demo Mode');
        setIsApiConnected(false);
        // Set fallback data for demo purposes
        setHealthStatus({ status: 'offline', message: 'Demo Mode' });
        setSkills({
          'ROI_LONG_AMB': { 
            name: 'High ROI', 
            version: '2.0.0',
            aspect_ratio: '9:16',
            pacing: { intro: 5, middle: 15, outro: 10 },
            graphics: { intro: true, outro: true },
            audio: { background: true, voiceover: true }
          },
          'NATIVE_SHORT_REELS': { 
            name: 'Viral Shorts', 
            version: '2.0.0',
            aspect_ratio: '9:16',
            pacing: { intro: 3, middle: 10, outro: 5 },
            graphics: { intro: false, outro: false },
            audio: { background: true, voiceover: true }
          },
          'MASCOT_ANIMATION_AD': { 
            name: 'Mascot Ads', 
            version: '2.0.0',
            aspect_ratio: '9:16',
            pacing: { intro: 8, middle: 20, outro: 12 },
            graphics: { intro: true, outro: true },
            audio: { background: true, voiceover: true }
          },
          'QUICK_DRAFT_GENERATOR': { 
            name: 'Quick Draft', 
            version: '2.0.0',
            aspect_ratio: '9:16',
            pacing: { intro: 2, middle: 8, outro: 4 },
            graphics: { intro: true, outro: false },
            audio: { background: true, voiceover: false }
          },
          'BRAND_ASSET_INJECTOR': { 
            name: 'Brand Injector', 
            version: '2.0.0',
            aspect_ratio: '9:16',
            pacing: { intro: 4, middle: 12, outro: 6 },
            graphics: { intro: true, outro: true },
            audio: { background: false, voiceover: true }
          }
        });
        setPipelineHealth({ 
          status: 'degraded', 
          agents: {
            mark_editor: 'idle',
            lisa_mascot: 'idle', 
            arwin_judge: 'idle',
            feedback_miner: 'idle'
          }
        });
      }
    };

    initializeApp();
  }, []);

  const value = {
    isApiConnected,
    setIsApiConnected,
    healthStatus,
    setHealthStatus,
    skills,
    setSkills,
    pipelineHealth,
    setPipelineHealth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProviders');
  }
  return context;
}
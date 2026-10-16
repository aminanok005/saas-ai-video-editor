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
        // Check backend health
        const health = await api.getHealth();
        setHealthStatus(health);
        setIsApiConnected(true);

        // Load skills
        const skillsData = await api.getSkills();
        setSkills(skillsData);

        // Get pipeline health
        const pipeline = await api.getPipelineHealth();
        setPipelineHealth(pipeline);

        console.log('✅ VibeCut AI Frontend initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        setIsApiConnected(false);
        // Set fallback data for demo purposes
        setHealthStatus({ status: 'offline', message: 'Demo Mode' });
        setSkills({
          'Demo-Skill-1': { name: 'Demo Skill 1', version: '1.0.0' },
          'Demo-Skill-2': { name: 'Demo Skill 2', version: '1.0.0' }
        });
        setPipelineHealth({ status: 'degraded', agents: {} });
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
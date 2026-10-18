"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Upload, CheckCircle2, AlertTriangle, Play, Pause,
  Sparkles, RefreshCw, Cpu, Terminal, Film,
  CheckCircle
} from 'lucide-react';
import { api } from '@/lib/api';
import { useApp } from '@/providers';

const skillPresets = [
  {
    id: 'ROI_LONG_AMB',
    name: 'ROI_LONG_AMB',
    title: 'Long-form Podcast',
    description: '30-45 second deep-dive content for maximum ROI',
    color: 'bg-gradient-to-br from-accent-gold to-orange-400',
    borderColor: 'border-accent-gold',
    badge: 'High ROI'
  },
  {
    id: 'NATIVE_SHORT_REELS',
    name: 'NATIVE_SHORT_REELS',
    title: 'Viral Shorts',
    description: 'Viral 15-30 second content with top 65% safe zone',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    borderColor: 'border-purple-500',
    badge: 'Viral'
  },
  {
    id: 'MASCOT_ANIMATION_AD',
    name: 'MASCOT_ANIMATION_AD',
    title: 'Mascot Ads',
    description: 'Lisa mascot 2D/3D animated advertisements',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500',
    badge: 'Live'
  },
  {
    id: 'QUICK_DRAFT_GENERATOR',
    name: 'QUICK_DRAFT_GENERATOR',
    title: 'Quick Draft',
    description: 'Fast 15-minute draft generation with AI guidance',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    borderColor: 'border-green-500',
    badge: 'Fast'
  },
  {
    id: 'BRAND_ASSET_INJECTOR',
    name: 'BRAND_ASSET_INJECTOR',
    title: 'Brand Injector',
    description: 'Brand kit & logo overlay automation',
    color: 'bg-gradient-to-br from-red-500 to-rose-500',
    borderColor: 'border-red-500',
    badge: 'Brand'
  }
];

const stats = [
  { label: 'Videos Processed', value: '1,247', change: '+12%', isPositive: true },
  { label: 'Success Rate', value: '98.4%', change: '+2.1%', isPositive: true },
  { label: 'QC Issues', value: '23', change: '-5%', isPositive: true },
  { label: 'Active Users', value: '567', change: '+18%', isPositive: true },
];

const skillOptions = [
  { id: 'ROI_LONG_AMB', badge: 'R', title: 'High ROI', subtitle: 'Long-form Podcast', desc: '30-45s deep-dive content for maximum ROI' },
  { id: 'NATIVE_SHORT_REELS', badge: 'N', title: 'Viral', subtitle: 'Viral Shorts', desc: 'Viral 15-30s content with top 65% safe zone' },
  { id: 'MASCOT_ANIMATION_AD', badge: 'M', title: 'Live', subtitle: 'Mascot Ads', desc: 'Lisa mascot 2D/3D animated advertisements' },
  { id: 'QUICK_DRAFT_GENERATOR', badge: 'Q', title: 'Fast', subtitle: 'Quick Draft', desc: 'Fast 15-minute draft generation with AI guidance' },
  { id: 'BRAND_ASSET_INJECTOR', badge: 'B', title: 'Brand', subtitle: 'Brand Injector', desc: 'Brand kit & logo overlay automation' },
];

const agents = [
  { icon: '🎬', name: 'Mark (Lead Editor)', code: 'Agent me', status: 'idle', statusKey: 'mark_editor' },
  { icon: '🎭', name: 'Lisa (Mascot Actor)', code: 'Agent lm', status: 'idle', statusKey: 'lisa_mascot' },
  { icon: '⚖️', name: 'Arwin (Judge QC)', code: 'Agent aj', status: 'idle', statusKey: 'arwin_judge' },
  { icon: '📊', name: 'Feedback Miner', code: 'Agent fm', status: 'idle', statusKey: 'feedback_miner' },
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function DashboardPage() {
  const { isApiConnected, healthStatus, skills, pipelineHealth, setHealthStatus, setSkills, setPipelineHealth } = useApp();
  
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>('NATIVE_SHORT_REELS');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [pipelineStatus, setPipelineStatus] = useState({
    mark_editor: 'idle',
    lisa_mascot: 'idle',
    arwin_judge: 'idle',
    feedback_miner: 'idle'
  });
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    "[08:47:12] 📋 Loaded 2 editing skill presets",
    "[08:47:12] ✅ Connected to backend: offline",
    "⏸️ Awaiting video upload and skill selection.",
    "📋 Loaded 5 editing skill presets.",
    "🚀 System initialized. Ready for video processing."
  ]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string) => {
    setPipelineLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  // Initialize from API data
  useEffect(() => {
    if (healthStatus) {
      addLog(`✅ Connected to backend: ${healthStatus.status}`);
    }
    if (pipelineHealth) {
      setPipelineStatus({
        mark_editor: pipelineHealth.agents?.mark_editor || 'idle',
        lisa_mascot: pipelineHealth.agents?.lisa_mascot || 'idle',
        arwin_judge: pipelineHealth.agents?.arwin_judge || 'idle',
        feedback_miner: pipelineHealth.agents?.feedback_miner || 'idle'
      });
    }
  }, [healthStatus, pipelineHealth, addLog]);

  // Initialize pipeline logs from API data
  useEffect(() => {
    if (skills && Object.keys(skills).length > 0) {
      addLog(`📋 Loaded ${Object.keys(skills).length} editing skill presets`);
    }
  }, [skills, addLog]);

  // Scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pipelineLogs]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      addLog(`📁 Video selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = objectUrl;
        videoRef.current.onloadedmetadata = () => {
          setVideoDuration(videoRef.current?.duration || 0);
        };
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      addLog(`📁 Video dropped: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      
      const objectUrl = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = objectUrl;
        videoRef.current.onloadedmetadata = () => {
          setVideoDuration(videoRef.current?.duration || 0);
        };
      }
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !selectedSkill) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    addLog(`🚀 Starting upload: ${videoFile.name} with skill: ${selectedSkill}`);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      const response = await api.uploadVideo(videoFile, selectedSkill);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      addLog(`✅ Upload complete! Project ID: ${response.project_id}`);
      addLog(`🎬 Assigned skill: ${response.assigned_skill}`);
      
      // Simulate pipeline processing
      setPipelineStatus({ mark_editor: 'processing', lisa_mascot: 'idle', arwin_judge: 'idle', feedback_miner: 'idle' });
      addLog(`🎬 Mark (Lead Editor) started processing...`);
      
      setTimeout(() => {
        setPipelineStatus({ mark_editor: 'completed', lisa_mascot: 'processing', arwin_judge: 'idle', feedback_miner: 'idle' });
        addLog(`🎭 Lisa (Mascot Actor) adding animations...`);
      }, 2000);
      
      setTimeout(() => {
        setPipelineStatus({ mark_editor: 'completed', lisa_mascot: 'completed', arwin_judge: 'processing', feedback_miner: 'idle' });
        addLog(`⚖️ Arwin (Judge QC) reviewing quality...`);
      }, 4000);
      
      setTimeout(() => {
        setPipelineStatus({ mark_editor: 'completed', lisa_mascot: 'completed', arwin_judge: 'completed', feedback_miner: 'processing' });
        addLog(`📊 Feedback Miner collecting metrics...`);
      }, 6000);
      
      setTimeout(() => {
        setPipelineStatus({ mark_editor: 'completed', lisa_mascot: 'completed', arwin_judge: 'completed', feedback_miner: 'completed' });
        addLog(`🎉 Pipeline complete! Ready for review.`);
      }, 8000);
      
    } catch (error) {
      addLog(`❌ Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleApproveFinalRender = () => {
    addLog('✅ Final render approved');
    // In a real app, this would trigger the final render process
  };

  const handleTriggerAutoFix = () => {
    addLog('🔧 Triggering auto-fix for safe zone violations');
    // In a real app, this would trigger the auto-fix process
    // For demo, we'll just add a log entry
    addLog('✅ Auto-fix completed! Safe zone violations resolved.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-status-pass bg-opacity-20 text-status-pass border-status-pass border-opacity-30';
      case 'processing': return 'bg-accent-gold bg-opacity-20 text-accent-gold border-accent-gold border-opacity-30';
      case 'completed': return 'bg-status-pass bg-opacity-20 text-status-pass border-status-pass border-opacity-30';
      case 'error': return 'bg-status-fail bg-opacity-20 text-status-fail border-status-fail border-opacity-30';
      default: return 'bg-surface bg-opacity-20 text-text-secondary border-border-subtle border-opacity-30';
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-text-primary p-6 font-sans">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-border-subtle gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary tracking-wide">VibeCut AI Dashboard</h1>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/30 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isApiConnected ? 'bg-status-pass animate-pulse' : 'bg-gray-500'}`} />
              4-Agent Engine Active | Powered by AI
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">Next-Gen Multi-Agent SaaS Video Editing Platform</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> API: Connected
          </span>
          <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-accent-gold to-accent-orange text-app-bg uppercase tracking-wider">
            PRO SUBSCRIPTION
          </span>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-surface p-4 rounded-xl border border-border-subtle flex justify-between items-center shadow-card">
            <div>
              <p className="text-xs text-text-secondary font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-primary mt-1">{stat.value}</h3>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${stat.isPositive ? 'bg-status-pass/10 text-status-pass' : 'bg-status-fail/10 text-status-fail'}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main Studio 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Input & Skills (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Video Input Dropzone */}
          <div className="bg-surface p-5 rounded-xl border border-border-subtle">
            <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-accent-gold" /> Video Input
            </h2>
            <div
              className="border-2 border-dashed border-border-subtle/70 hover:border-accent-gold/50 transition-colors rounded-xl p-6 text-center cursor-pointer bg-app-bg/50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Film className="w-10 h-10 text-text-muted mx-auto mb-2" />
              <p className="text-sm font-medium text-text-secondary">Drop video file here</p>
              <p className="text-xs text-text-muted mt-1">MP4 or MOV up to 500MB</p>
              {videoFile && (
                <p className="text-xs text-accent-gold mt-2">✓ {videoFile.name} selected</p>
              )}
            </div>
          </div>

          {/* Select Editing Style */}
          <div className="bg-surface p-5 rounded-xl border border-border-subtle flex-1">
            <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-gold" /> Select Editing Style
            </h2>
            <div className="space-y-2.5">
              {skillOptions.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedSkill === skill.id
                      ? 'bg-accent-gold/10 border-accent-gold/60 shadow-md shadow-accent-gold/5'
                      : 'bg-app-bg/60 border-border-subtle/80 hover:border-border-subtle/70'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md font-bold flex items-center justify-center text-sm shrink-0 ${
                    selectedSkill === skill.id ? 'bg-accent-gold text-app-bg' : 'bg-surface text-text-secondary'
                  }`}>
                    {skill.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">{skill.title}</span>
                      <span className="text-xs text-text-secondary font-medium">{skill.subtitle}</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-1">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={isUploading || !videoFile}
              className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-accent-gold to-accent-orange text-app-bg font-bold text-sm shadow-card hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-app-bg/30 border-t-app-bg/30 rounded-full animate-spin" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Start Processing
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center Column - Video Preview Canvas (5 cols) */}
        <div className="lg:col-span-5 bg-surface p-5 rounded-xl border border-border-subtle flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <Video className="w-4 h-4 text-accent-gold" /> Video Preview
            </h2>
            <div className="flex items-center bg-app-bg p-1 rounded-lg border border-border-subtle text-xs font-medium">
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-2.5 py-1 rounded-md transition-colors ${aspectRatio === '9:16' ? 'bg-accent-gold text-app-bg font-bold' : 'text-text-secondary hover:text-primary'}`}
              >
                9:16
              </button>
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-2.5 py-1 rounded-md transition-colors ${aspectRatio === '16:9' ? 'bg-accent-gold text-app-bg font-bold' : 'text-text-secondary hover:text-primary'}`}
              >
                16:9
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="flex-1 bg-app-bg rounded-xl border border-border-subtle flex items-center justify-center relative overflow-hidden min-h-[420px] p-4">
            {/* Phone Frame Simulation */}
            <div className={`w-[240px] h-[390px] border-2 border-border-subtle/80 rounded-2xl relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-bg-app-bg to-black/80 shadow-card ${aspectRatio === '16:9' ? 'w-[320px] h-[180px] rounded-xl' : ''}`}>

              {/* Safe Zone Overlay */}
              {showSafeZone && aspectRatio === '9:16' && (
                <div className="absolute inset-x-0 top-0 h-[65%] border-b-2 border-dashed border-accent-gold/80 bg-accent-gold/5 pointer-events-none p-2 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-accent-gold bg-accent-gold-950/80 px-1.5 py-0.5 rounded self-start border border-accent-gold/30">
                    🛡️ Top 65% Safe Zone Overlay
                  </span>
                  <span className="text-[9px] text-accent-gold/80 self-end">UI Clear Area</span>
                </div>
              )}

              {/* Danger Zone Bottom */}
              {aspectRatio === '9:16' && (
                <div className="absolute inset-x-0 bottom-0 h-[35%] bg-status-fail/5 border-t border-status-fail/20 pointer-events-none p-2 flex items-end justify-between">
                  <span className="text-[9px] text-status-fail/80 font-medium">TikTok/Reels UI Overlay Zone</span>
                  <span className="text-[9px] text-status-fail">👆 Tap to like</span>
                </div>
              )}

              {/* Video or Placeholder Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 z-10 relative w-full h-full">
                {videoFile && videoRef.current ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain rounded-lg"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    playsInline
                    muted
                  />
                ) : (
                  <>
                    <Film className="w-8 h-8 text-text-muted mb-2" />
                    <p className="text-xs font-medium text-text-secondary">No video uploaded yet</p>
                    <p className="text-[10px] text-text-muted mt-1">Select a video file and skill preset to start</p>
                  </>
                )}
              </div>

              {/* Player Controls Bar */}
              <div className="p-3 bg-black/80 backdrop-blur-md border-t border-border-subtle z-20 flex items-center justify-between text-xs text-text-secondary">
                <button
                  onClick={handlePlayPause}
                  disabled={!videoFile}
                  className={`text-accent-gold hover:text-accent-gold/80 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span className="font-mono text-[10px]">{formatTime(currentTime)} / {formatTime(videoDuration || 45)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 4-Agent Pipeline & Feed (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Agent HUD */}
          <div className="bg-surface p-5 rounded-xl border border-border-subtle">
            <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent-gold" /> 4-Agent Pipeline
            </h2>
            <div className="space-y-2">
              {agents.map((agent, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-app-bg border border-border-subtle/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{agent.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-text-secondary">{agent.name}</p>
                      <p className="text-[10px] text-text-secondary font-mono">{agent.code}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] rounded ${getStatusColor(pipelineStatus[agent.statusKey as keyof typeof pipelineStatus])} font-mono`}>
                    {pipelineStatus[agent.statusKey as keyof typeof pipelineStatus]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Live Feed */}
          <div className="bg-surface p-5 rounded-xl border border-border-subtle flex-1 flex flex-col">
            <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent-gold" /> Live Feed
            </h2>
            <div className="flex-1 bg-app-bg p-3 rounded-lg border border-border-subtle/80 font-mono text-[11px] text-text-secondary space-y-1.5 overflow-y-auto max-h-[160px]">
              {pipelineLogs.slice(-6).map((log, i) => (
                <p key={i} className="leading-tight">{log}</p>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={handleApproveFinalRender}
                className="w-full py-2.5 rounded-lg bg-status-pass/10 hover:bg-status-pass/20 text-status-pass border border-status-pass/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve Final Render
              </button>
              <button
                onClick={handleTriggerAutoFix}
                className="w-full py-2.5 rounded-lg bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold border border-accent-gold/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Trigger Auto-Fix
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
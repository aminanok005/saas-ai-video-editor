import React, { useState } from 'react';
import { 
  Video, Upload, CheckCircle2, AlertTriangle, Users, Play, Pause, 
  Sparkles, RefreshCw, ShieldCheck, Cpu, Terminal, ArrowUpRight, Film, Layers
} from 'lucide-react';

export default function VibeCutDashboardDetailed() {
  const [selectedSkill, setSelectedSkill] = useState('NATIVE_SHORT_REELS');
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');

  const stats = [
    { label: 'Videos Processed', value: '1,247', change: '+12%', isPositive: true },
    { label: 'Success Rate', value: '98.4%', change: '+2.1%', isPositive: true },
    { label: 'QC Issues', value: '23', change: '-5%', isPositive: true },
    { label: 'Active Users', value: '567', change: '+18%', isPositive: true },
  ];

  const skills = [
    { id: 'ROI_LONG_AMB', badge: 'R', title: 'High ROI', subtitle: 'Long-form Podcast', desc: '30-45s deep-dive content for maximum ROI' },
    { id: 'NATIVE_SHORT_REELS', badge: 'N', title: 'Viral', subtitle: 'Viral Shorts', desc: 'Viral 15-30s content with top 65% safe zone' },
    { id: 'MASCOT_ANIMATION_AD', badge: 'M', title: 'Live', subtitle: 'Mascot Ads', desc: 'Lisa mascot 2D/3D animated advertisements' },
    { id: 'QUICK_DRAFT_GENERATOR', badge: 'Q', title: 'Fast', subtitle: 'Quick Draft', desc: 'Fast 15-minute draft generation with AI guidance' },
    { id: 'BRAND_ASSET_INJECTOR', badge: 'B', title: 'Brand', subtitle: 'Brand Injector', desc: 'Brand kit & logo overlay automation' },
  ];

  const agents = [
    { icon: '🎬', name: 'Mark (Lead Editor)', code: 'Agent me', status: 'idle' },
    { icon: '🎭', name: 'Lisa (Mascot Actor)', code: 'Agent lm', status: 'idle' },
    { icon: '⚖️', name: 'Arwin (Judge QC)', code: 'Agent aj', status: 'idle' },
    { icon: '📊', name: 'Feedback Miner', code: 'Agent fm', status: 'idle' },
  ];

  const logs = [
    "[08:47:12] 📋 Loaded 2 editing skill presets",
    "[08:47:12] ✅ Connected to backend: offline",
    "⏸️ Awaiting video upload and skill selection.",
    "📋 Loaded 5 editing skill presets.",
    "🚀 System initialized. Ready for video processing."
  ];

  return (
    <div className="min-h-screen bg-[#0D0E12] text-gray-100 p-6 font-sans">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-wide">VibeCut AI Dashboard</h1>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              4-Agent Engine Active | Powered by AI
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Next-Gen Multi-Agent SaaS Video Editing Platform</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 text-xs rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> API: Connected
          </span>
          <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black uppercase tracking-wider">
            PRO SUBSCRIPTION
          </span>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#161820] p-4 rounded-xl border border-gray-800 flex justify-between items-center shadow-lg">
            <div>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
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
          <div className="bg-[#161820] p-5 rounded-xl border border-gray-800">
            <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" /> Video Input
            </h2>
            <div className="border-2 border-dashed border-gray-700 hover:border-amber-500/50 transition-colors rounded-xl p-6 text-center cursor-pointer bg-[#0D0E12]/50">
              <Film className="w-10 h-10 text-gray-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-300">Drop video file here</p>
              <p className="text-xs text-gray-500 mt-1">MP4 or MOV up to 500MB</p>
            </div>
          </div>

          {/* Select Editing Style */}
          <div className="bg-[#161820] p-5 rounded-xl border border-gray-800 flex-1">
            <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Select Editing Style
            </h2>
            <div className="space-y-2.5">
              {skills.map((skill) => (
                <div 
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedSkill === skill.id 
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-md shadow-amber-500/5' 
                      : 'bg-[#0D0E12]/60 border-gray-800/80 hover:border-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md font-bold flex items-center justify-center text-sm shrink-0 ${
                    selectedSkill === skill.id ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-300'
                  }`}>
                    {skill.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{skill.title}</span>
                      <span className="text-xs text-gray-300 font-medium">{skill.subtitle}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Start Processing
            </button>
          </div>
        </div>

        {/* Center Column - Video Preview Canvas (5 cols) */}
        <div className="lg:col-span-5 bg-[#161820] p-5 rounded-xl border border-gray-800 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
              <Video className="w-4 h-4 text-amber-400" /> Video Preview
            </h2>
            <div className="flex items-center bg-[#0D0E12] p-1 rounded-lg border border-gray-800 text-xs font-medium">
              <button 
                onClick={() => setAspectRatio('9:16')}
                className={`px-2.5 py-1 rounded-md transition-colors ${aspectRatio === '9:16' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                9:16
              </button>
              <button 
                onClick={() => setAspectRatio('16:9')}
                className={`px-2.5 py-1 rounded-md transition-colors ${aspectRatio === '16:9' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                16:9
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="flex-1 bg-[#0D0E12] rounded-xl border border-gray-800 flex items-center justify-center relative overflow-hidden min-h-[420px] p-4">
            {/* Phone Frame Simulation */}
            <div className="w-[240px] h-[390px] border-2 border-gray-700/80 rounded-2xl relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-gray-900 to-black shadow-2xl">
              
              {/* Safe Zone Overlay */}
              {showSafeZone && (
                <div className="absolute inset-x-0 top-0 h-[65%] border-b-2 border-dashed border-amber-400/80 bg-amber-400/5 pointer-events-none p-2 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded self-start border border-amber-500/30">
                    🛡️ Top 65% Safe Zone Overlay
                  </span>
                  <span className="text-[9px] text-amber-300/80 self-end">UI Clear Area</span>
                </div>
              )}

              {/* Danger Zone Bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[35%] bg-rose-500/5 border-t border-rose-500/20 pointer-events-none p-2 flex items-end justify-between">
                <span className="text-[9px] text-rose-400/80 font-medium">TikTok/Reels UI Overlay Zone</span>
                <span className="text-[9px] text-rose-400">👆 Tap to like</span>
              </div>

              {/* Placeholder Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 z-10">
                <Film className="w-8 h-8 text-gray-600 mb-2" />
                <p className="text-xs font-medium text-gray-400">No video uploaded yet</p>
                <p className="text-[10px] text-gray-600 mt-1">Select a video file and skill preset to start</p>
              </div>

              {/* Player Controls Bar */}
              <div className="p-3 bg-black/80 backdrop-blur-md border-t border-gray-800 z-20 flex items-center justify-between text-xs text-gray-400">
                <button className="text-amber-400 hover:text-amber-300">
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <span className="font-mono text-[10px]">00:00:00 / 00:45:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 4-Agent Pipeline & Feed (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Agent HUD */}
          <div className="bg-[#161820] p-5 rounded-xl border border-gray-800">
            <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> 4-Agent Pipeline
            </h2>
            <div className="space-y-2">
              {agents.map((agent, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#0D0E12] border border-gray-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{agent.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-200">{agent.name}</p>
                      <p className="text-[10px] text-gray-500 font-mono">{agent.code}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] rounded bg-gray-800 text-gray-400 font-mono">
                    {agent.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Live Feed */}
          <div className="bg-[#161820] p-5 rounded-xl border border-gray-800 flex-1 flex flex-col">
            <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" /> Live Feed
            </h2>
            <div className="flex-1 bg-[#0D0E12] p-3 rounded-lg border border-gray-800/80 font-mono text-[11px] text-gray-400 space-y-1.5 overflow-y-auto max-h-[160px]">
              {logs.map((log, i) => (
                <p key={i} className="leading-tight">{log}</p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <button className="w-full py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve Final Render
              </button>
              <button className="w-full py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Trigger Auto-Fix
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

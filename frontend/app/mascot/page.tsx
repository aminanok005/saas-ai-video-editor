"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mic, Volume2, Play, Pause, RotateCw } from 'lucide-react';
import { api } from '@/lib/api';

export default function MascotStudioPage() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedCharacter, setSelectedCharacter] = React.useState('lisa');
  const [selectedVoice, setSelectedVoice] = React.useState('thai-female-warm');

  const characters = [
    { id: 'lisa', name: 'Lisa', personality: 'Enthusiastic, Professional' },
    { id: 'ira', name: 'IRA', personality: 'Serious, Tech-savvy' }
  ];

  const voices = [
    { id: 'thai-female-warm', name: 'Thai Female - Warm', description: 'Warm and friendly tone' },
    { id: 'thai-female-excitement', name: 'Thai Female - Excitement', description: 'Energetic and lively' },
    { id: 'thai-female-serious', name: 'Thai Female - Serious', description: 'Professional and calm' },
    { id: 'professional-male', name: 'Professional Male', description: 'Industry standard tone' }
  ];

  const handleScriptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Script uploaded:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-app p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Mascot Studio</h1>
            <p className="text-secondary">Character sheet avatar selector and emotion voice pitcher</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-surface-hover text-primary px-4 py-2 rounded-md border border-subtle hover:bg-accent-gold hover:text-app transition-colors">
              Save Configuration
            </button>
            <button className="bg-accent-gold text-app px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">
              Export Animation Bundle
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Character Selection */}
          <div className="col-span-4 space-y-6">
            {/* Character Selector */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface rounded-lg border border-subtle shadow-card p-6"
            >
              <h2 className="text-xl font-semibold text-primary mb-4">Character Selection</h2>
              <div className="grid grid-cols-2 gap-4">
                {characters.map((char) => (
                  <motion.button
                    key={char.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCharacter(char.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedCharacter === char.id
                        ? 'border-accent-gold bg-accent-gold bg-opacity-10'
                        : 'border-subtle hover:border-accent-gold/50'
                      }`}
                  >
                    <div className="aspect-square bg-surface-hover rounded-lg mb-3 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-orange rounded-full flex items-center justify-center">
                        <span className="text-app font-bold text-lg">{char.name.charAt(0)}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-primary text-sm mb-1">{char.name}</h3>
                    <p className="text-xs text-secondary">{char.personality}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Voice Selection */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface rounded-lg border border-subtle shadow-card p-6"
            >
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 accent-gold" />
                Emotion Voice Pitcher
              </h2>
              <div className="space-y-3">
                {voices.map((voice) => (
                  <motion.button
                    key={voice.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedVoice === voice.id
                        ? 'border-accent-gold bg-accent-gold bg-opacity-10'
                        : 'border-subtle hover:border-accent-gold/50'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary text-sm mb-1">{voice.name}</h3>
                        <p className="text-xs text-secondary">{voice.description}</p>
                      </div>
                      <div className="w-8 h-8 bg-surface-hover rounded-full flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-secondary" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Script Upload */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface rounded-lg border border-subtle shadow-card p-6"
            >
              <h2 className="text-xl font-semibold text-primary mb-4">Script Input</h2>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ borderColor: '#FFB800' }}
                  className="border-2 border-dashed border-subtle rounded-lg p-8 text-center transition-colors cursor-pointer"
                >
                  <input
                    type="file"
                    accept=".txt,.json"
                    onChange={handleScriptUpload}
                    className="hidden"
                    id="script-upload"
                  />
                  <label htmlFor="script-upload" className="cursor-pointer block">
                    <div className="w-12 h-12 bg-surface-hover rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <RotateCw className="w-6 h-6 accent-gold" />
                    </div>
                    <p className="text-primary font-medium mb-1">Drop your script here</p>
                    <p className="text-xs text-secondary">or click to upload .txt, .json files</p>
                  </label>
                </motion.div>
                <div className="bg-surface-hover rounded-lg p-4">
                  <h4 className="text-sm font-medium text-primary mb-2">Sample Script Preview</h4>
                  <div className="text-xs text-secondary space-y-2">
                    <p>[00:00] こんにちは、VibeCut AIへようこそ！</p>
                    <p>[00:05] 私はあなたを魅了する魅力的な動画を制作します</p>
                    <p>[00:10] ぜひ、挑戦してください！</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Animation Preview & Lip-sync Test */}
          <div className="col-span-8 space-y-6">
            {/* Preview Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface rounded-lg border border-subtle shadow-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-primary">Animation Preview & Lip-sync Test</h2>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-accent-gold text-app rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </motion.button>
                  <div className="text-xs text-secondary">Demo mode - Kling AI animation</div>
                </div>
              </div>
              <div className="aspect-video bg-surface-hover rounded-lg border border-subtle flex items-center justify-center relative overflow-hidden">
                {/* Animated mascot preview */}
                <motion.div
                  animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  className="w-32 h-32 bg-gradient-to-br from-accent-gold to-accent-orange rounded-full flex items-center justify-center"
                >
                  <span className="text-app font-bold text-xl">LISA</span>
                </motion.div>
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 bg-accent-gold bg-opacity-20 flex items-center justify-center"
                  >
                    <span className="text-accent-gold font-mono text-sm">LIVE PREVIEW</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Lip-sync Testing Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface rounded-lg border border-subtle shadow-card p-6"
            >
              <h2 className="text-xl font-semibold text-primary mb-4">Lip-sync Testing Controls</h2>
              <div className="grid grid-cols-4 gap-4">
                {['言', '语', '语', '言'].map((char, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="aspect-square bg-surface-hover rounded-lg border border-subtle flex items-center justify-center cursor-pointer hover:border-accent-gold transition-colors"
                  >
                    <span className="text-2xl font-mono text-primary">{char}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-surface-hover rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary">Sync Accuracy</span>
                  <span className="text-sm accent-gold font-mono">96%</span>
                </div>
                <div className="w-full bg-subtle rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '96%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="bg-accent-gold h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
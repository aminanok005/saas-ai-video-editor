"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { api } from '@/lib/api';

interface ViolationRecord {
  id: string;
  timestamp: string;
  element: string;
  y_axis: number;
  severity: 'high' | 'warning' | 'info';
  description: string;
}

const violationData: ViolationRecord[] = [
  {
    id: 'v1',
    timestamp: '00:28',
    element: 'Text Overlay',
    y_axis: 78,
    severity: 'high',
    description: 'Text overlay exceeds safe zone boundary'
  },
  {
    id: 'v2',
    timestamp: '00:45',
    element: 'CTA Button',
    y_axis: 82,
    severity: 'high',
    description: 'CTA button placed in danger zone'
  },
  {
    id: 'v3',
    timestamp: '01:15',
    element: 'Brand Logo',
    y_axis: 72,
    severity: 'warning',
    description: 'Brand logo near safe zone edge'
  },
  {
    id: 'v4',
    timestamp: '01:32',
    element: 'Mascot Character',
    y_axis: 85,
    severity: 'high',
    description: 'Mascot extends into bottom danger zone'
  },
  {
    id: 'v5',
    timestamp: '02:05',
    element: 'Subtitle',
    y_axis: 79,
    severity: 'warning',
    description: 'Subtitle positioning requires adjustment'
  }
];

export default function QCInspectorPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [zoom, setZoom] = React.useState(100);
  const [selectedSeverity, setSelectedSeverity] = React.useState<'all' | 'high' | 'warning' | 'info'>('all');

  const filteredViolations = selectedSeverity === 'all'
    ? violationData
    : violationData.filter(v => v.severity === selectedSeverity);

  const getSeverityColor = (severity: 'high' | 'warning' | 'info') => {
    switch (severity) {
      case 'high': return 'bg-status-fail text-white';
      case 'warning': return 'bg-status-warning text-app';
      case 'info': return 'text-status-active';
      default: return 'text-secondary';
    }
  };

  const getSeverityIcon = (severity: 'high' | 'warning' | 'info') => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-app p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Safe-Zone QC Inspector</h1>
            <p className="text-secondary">Timestamped violation list with frame coordinate analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-surface-hover text-primary rounded-lg border border-subtle hover:border-accent-gold transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-surface-hover text-primary rounded-lg border border-subtle hover:border-accent-gold transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Violation List */}
          <div className="col-span-4 space-y-6">
            {/* Filter Controls */}
            <div className="bg-surface rounded-lg border border-subtle shadow-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-secondary">Filter:</span>
                {(['all', 'high', 'warning', 'info'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedSeverity(filter)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${selectedSeverity === filter
                        ? 'bg-accent-gold text-app'
                        : ' bg-surface-hover text-secondary hover:text-primary'
                      }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Total Violations</span>
                  <span className="text-lg font-bold text-status-fail">{violationData.filter(v => v.severity === 'high').length}</span>
                </div>
                <div className="w-full bg-subtle rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1 }}
                    className="bg-status-fail h-2 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Violation List */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-secondary mb-2 uppercase tracking-wider">Violation Details</h2>
              {filteredViolations.map((violation, index) => (
                <motion.div
                  key={violation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface rounded-lg border border-subtle p-4 hover:border-accent-gold transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getSeverityColor(violation.severity).replace('text', 'bg').replace('bg-white', 'bg-white')} flex items-center justify-center`}>
                        {violation.severity === 'high' && <span className="w-1.5 h-1.5 bg-status-fail rounded-full animate-pulse" />}
                        {violation.severity === 'warning' && <span className="w-1.5 h-1.5 bg-status-warning rounded-full" />}
                      </span>
                      <span className="font-mono text-sm text-primary">{violation.timestamp}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(violation.severity)}`}>
                        {getSeverityIcon(violation.severity)}
                        <span className="ml-1">{violation.severity.toUpperCase()}</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-secondary mb-2">{violation.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted">Element</span>
                      <span className="ml-2 text-primary">{violation.element}</span>
                    </div>
                    <div>
                      <span className="text-muted">Y-Axis Position</span>
                      <span className="ml-2 text-primary">{violation.y_axis}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Side-by-side Comparison */}
          <div className="col-span-8 space-y-6">
            {/* Original Draft vs Auto-Fixed Comparison */}
            <div className="bg-surface rounded-lg border border-subtle shadow-card p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Before vs After Auto-Fix Comparison</h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Original Draft */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-status-fail">Original Draft v1</h3>
                    <span className="text-xs text-muted">4 violations detected</span>
                  </div>
                  <div className="aspect-video bg-surface-hover rounded-lg border border-subtle relative overflow-hidden">
                    {/* Original draft with violations marked */}
                    <div className="absolute inset-0 p-4">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="w-48 h-32 bg-gradient-to-br from-status-fail/30 to-transparent border-2 border-dashed border-status-fail rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-status-fail text-xs font-medium">Text @ 78% Y-axis</span>
                        </div>
                        <div className="w-full h-4 bg-status-fail animate-pulse rounded"></div>
                      </div>
                      {/* Safe zone overlay - danger zones visible */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-status-fail bg-opacity-20 flex items-end justify-center pb-2">
                        <span className="text-status-fail text-xs">Danger Zone</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Auto-Fixed Output */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-status-pass">Auto-Fixed v2</h3>
                    <span className="text-xs text-muted">All violations resolved</span>
                  </div>
                  <div className="aspect-video bg-surface-hover rounded-lg border border-subtle relative overflow-hidden">
                    {/* Fixed version */}
                    <div className="absolute inset-0 p-4">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="w-48 h-32 bg-gradient-to-br from-status-pass/30 to-transparent border-2 border-dashed border-status-pass rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-status-pass text-xs font-medium">Text @ 62% Y-axis</span>
                        </div>
                        <div className="w-full h-4 bg-status-pass animate-pulse rounded"></div>
                      </div>
                      {/* Safe zone overlay - all within safe bounds */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-status-pass bg-opacity-20 flex items-end justify-center pb-2">
                        <span className="text-status-pass text-xs">Safe Zone</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52, 199, 89, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-status-pass text-app rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Fixed Version
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 184, 0, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-accent-gold text-app rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <RotateCw className="w-5 h-5" />
                  Re-run Auto-Fix
                </motion.button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-end gap-4 bg-surface rounded-lg border border-subtle p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="p-2 bg-surface-hover text-primary rounded border border-subtle hover:border-accent-gold transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono text-primary w-16 text-center">{zoom}%</span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 10))}
                  className="p-2 bg-surface-hover text-primary rounded border border-subtle hover:border-accent-gold transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
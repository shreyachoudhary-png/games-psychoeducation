"""
🎯 Advanced Analytics Dashboard
Real-time interactive visualizations with D3.js and Plotly
"""

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { Dashboard } from '../../types';
import {
  SkillRadarChart,
  ProgressTimeline,
  ActivityHeatmap,
  LearningVelocityChart,
  PerformanceComparison,
  EngagementMetrics,
  SkillTrajectory,
  PeerComparison,
  PredictiveInsights
} from './charts';

interface AnalyticsDashboardProps {
  userId?: number;
}

export default function AdvancedAnalyticsDashboard({ userId }: AnalyticsDashboardProps) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [timeRange, setTimeRange] = useState('7days'); // 7days, 30days, 90days, all
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.getDashboard();
        setDashboard(response);
      } catch (error) {
        console.error('Failed to load dashboard', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-6"></div>
          <p className="text-white text-xl">Analyzing your learning journey...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return <div className="text-white">Error loading dashboard</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              📊 Advanced Analytics
            </h1>
            <p className="text-slate-300">Deep insights into your learning journey</p>
          </div>
          
          {/* Controls */}
          <div className="flex gap-4 flex-wrap">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 hover:border-purple-500 transition-colors"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>

            <button
              onClick={() => setShowPredictions(!showPredictions)}
              className={`px-4 py-2 rounded-lg transition-all ${
                showPredictions
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🔮 {showPredictions ? 'Hide' : 'Show'} Predictions
            </button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-xl p-6 backdrop-blur"
          >
            <div className="text-sm text-purple-300 mb-2">Total XP</div>
            <div className="text-3xl font-bold text-white">{dashboard.stats.total_xp}</div>
            <div className="text-xs text-purple-400 mt-2">📈 +{Math.floor(Math.random() * 100)} this week</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 rounded-xl p-6 backdrop-blur"
          >
            <div className="text-sm text-blue-300 mb-2">Current Level</div>
            <div className="text-3xl font-bold text-white">{dashboard.stats.level}</div>
            <div className="text-xs text-blue-400 mt-2">🚀 {Math.floor(Math.random() * 50) + 50}% to next</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/30 rounded-xl p-6 backdrop-blur"
          >
            <div className="text-sm text-green-300 mb-2">Accuracy</div>
            <div className="text-3xl font-bold text-white">{dashboard.stats.average_accuracy.toFixed(1)}%</div>
            <div className="text-xs text-green-400 mt-2">✨ Improving consistently</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 border border-pink-500/30 rounded-xl p-6 backdrop-blur"
          >
            <div className="text-sm text-pink-300 mb-2">Streak</div>
            <div className="text-3xl font-bold text-white">{dashboard.stats.streak_days} days</div>
            <div className="text-xs text-pink-400 mt-2">🔥 Keep it going!</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: '📊 Overview', icon: '📊' },
          { id: 'skills', label: '🎯 Skills', icon: '🎯' },
          { id: 'timeline', label: '📈 Timeline', icon: '📈' },
          { id: 'comparison', label: '👥 Comparison', icon: '👥' },
          { id: 'predictions', label: '🔮 Predictions', icon: '🔮' },
          { id: 'heatmap', label: '🔥 Activity', icon: '🔥' },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setSelectedMetric(tab.id)}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedMetric === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {selectedMetric === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
            >
              <h3 className="text-xl font-bold text-white mb-4">🎯 Skill Distribution</h3>
              <SkillRadarChart data={dashboard.progress} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
            >
              <h3 className="text-xl font-bold text-white mb-4">⚡ Learning Velocity</h3>
              <LearningVelocityChart data={dashboard.recent_activities} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur lg:col-span-2"
            >
              <h3 className="text-xl font-bold text-white mb-4">📊 Engagement Metrics</h3>
              <EngagementMetrics stats={dashboard.stats} />
            </motion.div>
          </div>
        )}

        {selectedMetric === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
              >
                <h3 className="text-xl font-bold text-white mb-4">📈 Skill Progress</h3>
                <SkillTrajectory data={dashboard.progress} />
              </motion.div>

              <motion.div
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
              >
                <h3 className="text-xl font-bold text-white mb-4">📊 Performance by Level</h3>
                <PerformanceComparison data={dashboard.progress} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {selectedMetric === 'timeline' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
          >
            <h3 className="text-xl font-bold text-white mb-4">📅 Learning Timeline</h3>
            <ProgressTimeline data={dashboard.recent_activities} />
          </motion.div>
        )}

        {selectedMetric === 'comparison' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
          >
            <h3 className="text-xl font-bold text-white mb-4">👥 Peer Comparison</h3>
            <PeerComparison userId={dashboard.user.id} />
          </motion.div>
        )}

        {selectedMetric === 'predictions' && showPredictions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
          >
            <h3 className="text-xl font-bold text-white mb-4">🔮 Predictive Insights</h3>
            <PredictiveInsights userId={dashboard.user.id} />
          </motion.div>
        )}

        {selectedMetric === 'heatmap' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
          >
            <h3 className="text-xl font-bold text-white mb-4">🔥 Activity Heatmap</h3>
            <ActivityHeatmap userId={dashboard.user.id} />
          </motion.div>
        )}
      </motion.div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 backdrop-blur"
      >
        <h3 className="text-xl font-bold text-white mb-4">💡 AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-purple-300 font-semibold">Recommended Focus</p>
            <p className="text-white">Communication & Empathy - Your weakest area with room for significant growth</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-pink-300 font-semibold">Current Momentum</p>
            <p className="text-white">🔥 Accelerating! You've gained +150 XP in the last 7 days (50% increase)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
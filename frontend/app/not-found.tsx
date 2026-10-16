'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-app flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-xl p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-20 h-20 bg-status-fail rounded-full mx-auto flex items-center justify-center"
        >
          <AlertTriangle className="w-10 h-10 text-app" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold text-primary"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-secondary"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-accent-gold text-app rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Return to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
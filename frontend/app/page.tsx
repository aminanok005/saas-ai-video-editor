"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after a brief moment for better UX
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-app flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-accent-gold rounded-full mx-auto flex items-center justify-center"
        >
          <span className="text-app font-bold text-xl">VC</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-primary"
        >
          VibeCut AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-secondary"
        >
          Initializing 4-Agent Pipeline...
        </motion.p>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-1 bg-accent-gold rounded-full mx-auto max-w-xs"
        />
      </motion.div>
    </div>
  );
}
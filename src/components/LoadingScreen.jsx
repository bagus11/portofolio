import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('');
  const [progress, setProgress] = useState(0);
  const loadingMessages = [
    'Initializing system...',
    'Loading dependencies...',
    'Compiling components...',
    'Establishing connection...',
    'Rendering interface...',
    'System ready.'
  ];

  useEffect(() => {
    let messageIndex = 0;
    let progressValue = 0;

    const messageTimer = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingText(loadingMessages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(messageTimer);
      }
    }, 500);

    const progressTimer = setInterval(() => {
      if (progressValue < 100) {
        progressValue += Math.random() * 15;
        if (progressValue > 100) progressValue = 100;
        setProgress(progressValue);
      } else {
        clearInterval(progressTimer);
      }
    }, 100);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center text-white font-mono">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Terminal Window */}
        <div className="bg-black/90 border border-neon-cyan/50 rounded-lg p-6 shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">loading.sh</span>
          </div>

          {/* Loading Animation */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-neon-cyan/30 rounded-full"></div>
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 border-2 border-neon-cyan rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <motion.div
                className="bg-gradient-to-r from-neon-cyan to-neon-blue h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              {Math.round(progress)}% complete
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-left">
            <div className="text-neon-cyan mb-2">$ {loadingText}</div>
            <div className="text-green-400 text-sm">
              {loadingText.includes('ready') ? '✓' : '⏳'} {loadingText}
            </div>
          </div>

          {/* Matrix Rain Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-400 text-xs"
                initial={{ y: -20, x: Math.random() * 100 + '%' }}
                animate={{ y: '120%' }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {Math.random().toString(2).substr(2, 8)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-6 text-xs text-gray-500">
          Bagus Slamet Oetomo - Fullstack Developer
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

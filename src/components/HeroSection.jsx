import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpg';

const HeroSection = ({ heroRef, typewriterText, fullText }) => {
  return (
    <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <img
            src={heroImage} 
            alt="Bagus Slamet Oetomo"c
            lassName="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-neon-cyan neon-glow"
            />
        </motion.div>
     
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4 neon-text"
        >
          Bagus Slamet Oetomo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl mb-8 text-neon-blue"
        >
          Fullstack Developer / Mobile Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-8"
        >
          <span className="text-lg font-mono bg-black/50 px-4 py-2 rounded border border-neon-cyan/50 inline-block">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-6 py-3 bg-neon-cyan text-black font-semibold rounded-lg hover:neon-glow transition-all duration-300 transform hover:scale-105">
            Download CV
          </button>
          <button className="px-6 py-3 border border-neon-cyan text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 transform hover:scale-105">
            Contact Me
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

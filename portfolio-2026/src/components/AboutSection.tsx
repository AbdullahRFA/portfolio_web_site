'use client'; // Required since we weave in scroll-triggered structural motion variants

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Timeline from './Timeline';
import { experienceData } from '../lib/aboutData';

const AboutSection = () => {
  // 1. Hero Text fly-in from Left side orchestration
  const leftFlyInVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 60, damping: 15, delay: 0.1 } 
    }
  };

  // 2. Experience Timeline fly-in from Right side orchestration
  const rightFlyInVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 60, damping: 15, delay: 0.2 } 
    }
  };

  // 3. Stagger container list to fade in children bullet layouts sequentially
  const parentStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <section id="about" className="relative py-24 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden">
      {/* Decorative ambient blurred vector orbs to elevate premium space feel */}
      <div className="absolute top-1/3 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* --- LEFT COLUMN: BIO WITH FLYING LEFT EFFECT --- */}
        <motion.div 
          variants={leftFlyInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }} // Triggers only once precisely when crossing into view track
          className="lg:col-span-4 lg:sticky lg:top-24 space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              02 . Story Context
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              About Me
            </h2>
          </div>

          {/* Bio Description Box with Glassmorphism Hover Effects */}
          <motion.div 
            variants={parentStaggerVariants}
            className="p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/30 dark:to-zinc-950 shadow-sm hover:shadow-md hover:scale-[1.01] hover:border-blue-500/20 dark:hover:border-blue-400/20 transition-all duration-300"
          >
            <motion.p variants={textItemVariants} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              Hello! I'm <span className="font-semibold text-zinc-900 dark:text-zinc-100">Abdullah Nazmus Sakib</span>, a final-year Computer Science & Engineering undergraduate at <span className="text-blue-600 dark:text-blue-400 font-medium">Jahangirnagar University</span>. I build robust full-stack solutions, complex algorithmic platforms, and cross-platform mobile apps.
            </motion.p>
            
            <motion.p variants={textItemVariants} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              My engineering approach maps across multiple disciplines: crafting pre-rendered modular interfaces in <span className="font-medium text-zinc-800 dark:text-zinc-200">Next.js & TypeScript</span>, structuring bulletproof API schemas using <span className="font-medium text-zinc-800 dark:text-zinc-200">MERN & Django</span>, and writing end-to-end automated software testing configurations.
            </motion.p>

            <motion.p variants={textItemVariants} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Currently expanding my horizons into <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">AI, Large Language Models (LLMs), and IoT systems</span>, aiming to translate intense academic compute principles directly into secure, human-centric production environments.
            </motion.p>
          </motion.div>

          {/* Live Quick University Stat Indicator */}
          <motion.div 
            variants={textItemVariants}
            className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
            JU CSE Campus Core Member • Class of 2026
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: INTERACTIVE HISTORY WITH FLYING RIGHT EFFECT --- */}
        <motion.div 
          variants={rightFlyInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-8 space-y-6"
        >
          <div className="px-4 md:px-6 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Chronological Path
            </span>
            <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mt-1">
              Professional Experience
            </h3>
          </div>

          <div className="bg-white/40 dark:bg-zinc-950/20 p-2 md:p-6 rounded-3xl border border-zinc-100 dark:border-zinc-900/60 shadow-inner backdrop-blur-xs">
            <Timeline items={experienceData} />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default AboutSection;
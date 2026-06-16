'use client'; // Required since we weave in scroll-triggered structural motion variants

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Timeline from './Timeline';
import { experienceData } from '../lib/aboutData';

const AboutSection = () => {
  // 1. Hero Text fly-in from Left side orchestration
  const leftFlyInVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 70, damping: 16, delay: 0.1 } 
    }
  };

  // 2. Experience Timeline fly-in from Right side orchestration
  const rightFlyInVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 70, damping: 16, delay: 0.2 } 
    }
  };

  // 3. Stagger container list to fade in children bullet layouts sequentially
  const parentStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 }
    }
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <section id="about" className="relative py-24 border-t border-zinc-900 overflow-hidden">
      {/* Cyberpunk ambient background neon glow orbs */}
      <div className="absolute top-1/3 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/[0.03] blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.02] blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* --- LEFT COLUMN: BIO WITH FLYING LEFT EFFECT --- */}
        <motion.div 
          variants={leftFlyInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }} // Triggers only once precisely when crossing into view track
          className="lg:col-span-5 lg:sticky lg:top-24 space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              02 . Story Context
            </span>
            <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
              About Me
            </h2>
          </div>

          {/* Bio Description Box with Video-Matched Cyberpunk Hover Effects */}
          <motion.div 
            variants={parentStaggerVariants}
            className="group relative p-6 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/20 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle internal spotlight */}
            <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <motion.p variants={textItemVariants} className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal">
              Hello! I'm <span className="font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors duration-200">Abdullah Nazmus Sakib</span>, a final-year Computer Science & Engineering undergraduate at <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]">Jahangirnagar University</span>. I build robust full-stack solutions, complex algorithmic platforms, and cross-platform mobile apps.
            </motion.p>
            
            <motion.p variants={textItemVariants} className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal">
              My engineering approach maps across multiple disciplines: crafting pre-rendered modular interfaces in <span className="font-semibold text-zinc-200">Next.js & TypeScript</span>, structuring bulletproof API schemas using <span className="font-semibold text-zinc-200">MERN & Django</span>, and writing end-to-end automated software testing configurations.
            </motion.p>

            <motion.p variants={textItemVariants} className="text-zinc-400 text-sm leading-relaxed font-normal">
              Currently expanding my horizons into <span className="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.15)]">AI, Large Language Models (LLMs), and IoT systems</span>, aiming to translate intense academic compute principles directly into secure, human-centric production environments.
            </motion.p>
          </motion.div>

          {/* Live Quick University Stat Indicator with Cyber Neon Styling */}
          <motion.div 
            variants={textItemVariants}
            className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-xs font-bold text-zinc-400 shadow-inner group"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe] animate-pulse" />
            <span className="group-hover:text-cyan-400 transition-colors duration-300">JU CSE Campus Core Member • Class of 2026</span>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: INTERACTIVE HISTORY WITH FLYING RIGHT EFFECT --- */}
        <motion.div 
          variants={rightFlyInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="px-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.3)]">
              Chronological Path
            </span>
            <h3 className="text-2xl font-bold text-zinc-100 mt-1 tracking-tight">
              Professional Experience
            </h3>
          </div>

          <div className="bg-zinc-900/40 p-2 md:p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md">
            <Timeline items={experienceData} />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default AboutSection;
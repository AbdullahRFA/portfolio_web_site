'use client'; // Required since we manage viewport-triggered animation sequences running in-browser[cite: 1]

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { skillsData } from '../lib/skillsData';

const SkillsBento = () => {
  // Stagger cascading presentation layout orchestrations[cite: 1]
  const bentoGridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } //[cite: 1]
    }
  };

  // Subtle spring-based card loading motion properties[cite: 1]
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 16 } 
    }
  };

  return (
    <section id="skills" className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible">
      {/* Background Cyberpunk Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/[0.03] blur-3xl pointer-events-none animate-pulse" />

      <div className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.3)]">
          03 . Technical Capability
        </span>
        <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
          Technical Toolkit
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
          A modular look at the compilation languages, multi-tier frameworks, and verification testing tools I interact with daily.
        </p>
      </div>

      {/* Dynamic Grid Mapping Parent Element Container[cite: 1] */}
      <motion.div 
        variants={bentoGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }} //[cite: 1]
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
      >
        {skillsData.map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -5, 
              scale: 1.015,
              transition: { duration: 0.2, ease: "easeOut" } 
            }}
            className={`p-6 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950/80 backdrop-blur-md flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(232,121,249,0.08)] hover:border-fuchsia-500/20 group overflow-hidden relative`}
          >
            {/* Subtle Hover Spotlight */}
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-fuchsia-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Typography Header Info Area[cite: 1] */}
            <div>
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 tracking-tight">
                {category.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-1 font-normal">
                {category.description}
              </p>
            </div>

            {/* Bottom Badges Sub-Grid Wrap Area[cite: 1] */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-zinc-800/60 group-hover:border-fuchsia-500/10 transition-colors duration-300">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-zinc-950/90 px-3 py-1.5 rounded-xl border border-zinc-800/80 flex flex-col items-start shadow-inner group-hover:border-cyan-500/10 transition-colors duration-200"
                >
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors duration-200 leading-none">
                    {skill.name}
                  </span>
                  <span className="text-[8px] text-zinc-500 font-black uppercase tracking-wider mt-1.5 leading-none">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsBento;
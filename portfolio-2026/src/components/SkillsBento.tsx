'use client'; // Required since we manage viewport-triggered animation sequences running in-browser

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { skillsData } from '../lib/skillsData';

const SkillsBento = () => {
  // Stagger cascading presentation layout orchestrations
  const bentoGridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  // Subtle spring-based card loading motion properties
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 } 
    }
  };

  return (
    <section id="skills" className="relative py-20 border-t border-zinc-100 dark:border-zinc-900 scroll-mt-20 overflow-visible">
      <div className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          03 . Technical Capability
        </span>
        <h2 className="text-4xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-zinc-50">
          Technical Toolkit
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
          A modular look at the compilation languages, multi-tier frameworks, and verification testing tools I interact with daily.
        </p>
      </div>

      {/* Dynamic Grid Mapping Parent Element Container */}
      <motion.div 
        variants={bentoGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[190px]"
      >
        {skillsData.map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -3, scale: 1.005, transition: { duration: 0.2 } }}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md ${category.gridClass}`}
          >
            {/* Top Typography Header Info Area */}
            <div>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-1.5 tracking-tight">
                {category.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                {category.description}
              </p>
            </div>

            {/* Bottom Badges Sub-Grid Wrap Area */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40 flex flex-col items-start shadow-2xs hover:border-blue-500/10 dark:hover:border-blue-400/10 transition-colors duration-200"
                >
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-none">
                    {skill.name}
                  </span>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mt-1 leading-none">
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
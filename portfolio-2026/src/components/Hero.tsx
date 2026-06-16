'use client'; // Required for Framer Motion animation loops running in the browser

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Smooth scroll helper for our layout CTA links
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Standard engineering container variants for stagger layout rendering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center py-12">
      {/* Abstract background decorative accent blob */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5 pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl space-y-6"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for Open Opportunities
        </motion.div>

        {/* Primary Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50"
        >
          Building scalable software with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">architectural integrity</span>.
        </motion.h1>

        {/* Subtitle Body Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl"
        >
          Hi, I'm <span className="font-semibold text-zinc-900 dark:text-zinc-100">Abdullah Nazmus-Sakib</span>. A Full-Stack Software Engineer specialized in crafting performance-optimized web architectures using Next.js, TypeScript, Tailwind CSS, and the MERN ecosystem.
        </motion.p>

        {/* Action Call-to-Buttons (CTAs) */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow shadow-blue-500/10 text-center w-full sm:w-auto"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 bg-white hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 transition-colors text-center w-full sm:w-auto"
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
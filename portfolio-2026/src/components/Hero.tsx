"use client"; // Required for Framer Motion animation loops running in the browser

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React from "react";

const Hero = () => {
  // Smooth scroll helper for layout CTA links
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Orchestrated stagger children transition parent container variant
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  // Smooth slide-up variant matching rigid easing presets
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Continuous looping floating hover variants for technical float elements
  const floatAnimation = (delay: number): Variants => ({
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center py-16 overflow-visible">
      {/* --- PREMIUM TECH GRAPHICS BACKDROP LAYER --- */}
      {/* Animated Glowing Accent Orbs */}
      <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/5 pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-20 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/5 pointer-events-none" />
      
      {/* Cybernetic Dot Matrix Mesh Background Overlay */}
      <div className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* --- LEFT COLUMN: COMPREHENSIVE TEXT METRICS SYSTEM --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 z-10"
        >
          {/* Active Engineering Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 text-xs font-semibold tracking-wide w-fit shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Software Engineering Internships
          </motion.div>

          {/* Premium Main Typographic Header */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-zinc-900 dark:text-zinc-50"
          >
            Building high-performance systems with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              architectural integrity
            </span>
            .
          </motion.h1>

          {/* Core Profile Context Summary Text[cite: 3] */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl"
          >
            Hi, I'm <span className="font-bold text-zinc-900 dark:text-zinc-100 border-b-2 border-blue-500/20 pb-0.5">Abdullah Nazmus Sakib</span>. 
            An aspiring Software Engineer and final-year CSE student at <span className="font-semibold text-zinc-800 dark:text-zinc-200">Jahangirnagar University</span>. 
            I synthesize robust full-stack microservices, cross-platform apps, and intelligent AI models into fluid user experiences.
          </motion.p>

          {/* Action Interface Controllers Buttons (CTAs) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              className="group relative px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 text-center w-full sm:w-auto flex items-center justify-center gap-2 overflow-hidden"
            >
              Explore My Work
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-zinc-700 border border-zinc-200 bg-white hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 transition-all shadow-xs text-center w-full sm:w-auto"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: VISUAL PROFILE CANVAS WITH ASYMMETRIC FLOATING BADGES --- */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          
          {/* 1. Floating Next.js Badge Element */}
          <motion.div 
            variants={floatAnimation(0)}
            initial="initial"
            animate="animate"
            className="absolute -top-6 -left-4 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-white" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Next.js / MERN</span>
          </motion.div>

          {/* 2. Floating Flutter/App Dev Badge Element */}
          <motion.div 
            variants={floatAnimation(0.8)}
            initial="initial"
            animate="animate"
            className="absolute top-1/2 -left-12 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Flutter App Dev</span>
          </motion.div>

          {/* 3. Floating Python/Django/AI Badge Element */}
          <motion.div 
            variants={floatAnimation(1.5)}
            initial="initial"
            animate="animate"
            className="absolute bottom-4 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-48 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Python / AI & ML</span>
          </motion.div>

          {/* Primary Profile Frame Canvas Container Wrapper */}
          {/* COMMENT FIXED: Moved cleanly outside the layout token element to prevent compilation parser breaks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl shadow-zinc-300/60 dark:shadow-none bg-zinc-100 dark:bg-zinc-900 group"
          >
            {/* Soft dark visual shadow overlay gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/30 via-transparent to-transparent pointer-events-none" />
            
            <Image
              src="/profile_picture/profile_pic_2.jpg"
              alt="Abdullah Nazmus Sakib Portrait"
              fill
              priority // High-priority LCP preloading trigger
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
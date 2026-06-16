"use client"; // Required for Framer Motion timelines and Typed.js hooks running in-browser

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Hero = () => {
  const el = useRef<HTMLSpanElement>(null);

  // Initialize the typing animation cycle matching your resume competencies
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Full-Stack Developer",
        "Flutter App Developer",
        "AI/ML Engineering Learner",
        "SQA Automation Learner"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy(); // Clean up the instance on unmount to prevent layout leak memory loops
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

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
      {/* --- BACKDROP NEON BLUR GLOW CORES --- */}
      <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-20 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
      
      {/* Cybernetic Grid Matrix Overlay */}
      <div className="absolute inset-0 -z-20 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* --- LEFT COLUMN: TYPOGRAPHIC CONTENT MATRIX --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 z-10"
        >
          {/* Active Engineering Status Badge with Cyan Border Highlight */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-wide w-fit shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for Software Engineering Internships
          </motion.div>

          {/* Core Introduction Headline */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-800 dark:text-zinc-200">
              Hello, it's me
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
              Abdullah Nazmus Sakib
            </div>
          </motion.div>

          {/* FIXED: Added the dynamic typing text stream selector layout block */}
          <motion.div 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 min-h-[40px]"
          >
            I'm a <span ref={el} className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl"
          >
            Final-year Computer Science & Engineering student at <span className="font-semibold text-zinc-800 dark:text-zinc-200">Jahangirnagar University</span>. 
            I synthesize robust full-stack microservices, cross-platform mobile apps, and intelligent AI frameworks into scalable production systems.
          </motion.p>

          {/* Action Call-To-Buttons (CTAs) with Neon Hover Shadows */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              className="group relative px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] text-center w-full sm:w-auto flex items-center justify-center gap-2 transform hover:-translate-y-0.5 duration-200"
            >
              Explore My Work
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-zinc-400 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 hover:text-zinc-100 hover:border-cyan-500/40 transition-all duration-300 shadow-xs text-center w-full sm:w-auto hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: CYBER CANVAS WITH THE SPINNING GRADIENT HIGHLIGHT RING --- */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          
          {/* Asymmetric Technology Drift Badges */}
          <motion.div 
            variants={floatAnimation(0)} initial="initial" animate="animate"
            className="absolute -top-6 -left-4 z-20 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            <span className="text-xs font-bold text-zinc-200">Next.js / MERN</span>
          </motion.div>

          <motion.div 
            variants={floatAnimation(0.8)} initial="initial" animate="animate"
            className="absolute top-1/2 -left-12 z-20 bg-zinc-900/90 backdrop-blur-md border border-fuchsia-500/20 shadow-[0_0_15px_rgba(240,147,251,0.1)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#f093fb]" />
            <span className="text-xs font-bold text-zinc-200">Flutter App Dev</span>
          </motion.div>

          {/* Primary Portrait Card Container Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
            className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[3/4] rounded-[2.5rem] flex items-center justify-center group overflow-visible"
          >
            {/* FIXED: Infinite Spinning Neon Gradient Halo Background Frame Overlay */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-500 animate-spin opacity-85 blur-xs" style={{ animationDuration: '8s' }} />
            
            {/* Inner frame mask separating photo layer from glowing track lines */}
            <div className="absolute inset-[4px] rounded-[2.35rem] overflow-hidden bg-zinc-950 z-10">
              {/* Image baseline shadow mask */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
              
              <Image
                src="/profile_picture/profile_pic_2.jpg"
                alt="Abdullah Nazmus Sakib Portrait"
                fill
                priority
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
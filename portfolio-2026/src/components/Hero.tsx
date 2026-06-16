"use client"; // Required for Framer Motion timelines and Typed.js hooks running in-browser

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Hero = () => {
  const el = useRef<HTMLSpanElement>(null);

  // Initialize the typing animation cycle matching your competencies
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
      typed.destroy(); // Clean up the instance on unmount to prevent layout memory leaks
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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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
      <div className="absolute inset-0 -z-20 opacity-[0.03] bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

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
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-wide w-fit shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for Software Engineering Internships
          </motion.div>

          {/* Core Introduction Headline */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-300">
              Hello, it's me
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-50 leading-none">
              Abdullah Nazmus Sakib
            </div>
          </motion.div>

          {/* Dynamic Typing Text Stream Link Header Block */}
          <motion.div 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 min-h-[40px]"
          >
            I'm a <span ref={el} className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base text-zinc-300 font-normal leading-relaxed max-w-2xl"
          >
            Final-year Computer Science & Engineering student at <span className="font-semibold text-zinc-100">Jahangirnagar University</span>. 
            I synthesize robust full-stack microservices, cross-platform mobile apps, and intelligent AI frameworks into scalable production systems.
          </motion.p>

          {/* --- SOCIAL MEDIA ACCOUNT INDICATORS ROW --- */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-1">
            <a 
              href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a 
              href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-fuchsia-400 hover:border-fuchsia-500/40 hover:shadow-[0_0_15px_rgba(232,121,249,0.4)] transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a 
              href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300"
              aria-label="Facebook Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-3.543v-2.891h3.543v-2.2c0-3.497 2.136-5.422 5.26-5.422 1.497 0 3.058.268 3.058.268v3.363h-1.722c-1.733 0-2.264 1.076-2.264 2.179v2.38h3.79l-.606 2.891h-3.184v6.987c4.781-.75 8.438-4.887 8.438-9.878z"/></svg>
            </a>
            <a 
              href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-red-400 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300"
              aria-label="YouTube Channel"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.136z"/></svg>
            </a>
          </motion.div>

          {/* Action Interface Controllers Buttons (CTAs) with Neon Hover Shadows */}
          <motion.div
            vertical-align="middle"
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              className="group relative px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] text-center w-full sm:w-auto flex items-center justify-center gap-2 transform hover:-translate-y-0.5 duration-200"
            >
              Explore My Work
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-zinc-300 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 hover:text-zinc-100 hover:border-cyan-500/40 transition-all duration-300 shadow-xs text-center w-full sm:w-auto hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: CYBER CANVAS WITH THE SPINNING GRADIENT HIGHLIGHT BORDER --- */}
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
            className="absolute top-[40%] -left-14 z-20 bg-zinc-900/90 backdrop-blur-md border border-fuchsia-500/20 shadow-[0_0_15px_rgba(240,147,251,0.1)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#f093fb]" />
            <span className="text-xs font-bold text-zinc-200">Flutter App Dev</span>
          </motion.div>

          <motion.div 
            variants={floatAnimation(1.6)} initial="initial" animate="animate"
            className="absolute bottom-6 -right-6 z-20 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            <span className="text-xs font-bold text-zinc-200">AI/ML Engineer</span>
          </motion.div>

          {/* Primary Portrait Card Container Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
            className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[3/4] rounded-[2.5rem] flex items-center justify-center group overflow-visible"
          >
            {/* FIXED: We set explicit overflow-hidden on the parent container box, mask it down, and scale the spinning gradient exclusively over a 2px outer margin frame edge */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
              <div 
                className="absolute inset-[-50%] bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-500 animate-spin opacity-90" 
                style={{ animationDuration: '8s' }} 
              />
            </div>
            
            {/* FIXED: The inner container completely covers the center background with a crisp black canvas inset by exactly 2px (`inset-[2px]`), restricting the animation visible state exclusively to the thin outer border track border boundary line */}
            <div className="absolute inset-[2px] rounded-[2.4rem] overflow-hidden bg-zinc-950 z-10">
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
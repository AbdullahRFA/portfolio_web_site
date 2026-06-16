"use client"; // Required for Framer Motion animation loops running in the browser

import { motion, Variants } from "framer-motion"; // <-- Imported Variants type for explicit strict typing
import Image from "next/image";
import React from "react";

const Hero = () => {
  // Smooth scroll helper for our layout CTA links
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Standard engineering container variants for stagger layout rendering (Typed explicitly)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  // Explicitly typed as Variants so that 'easeOut' satisfies Framer Motion's strict Easing unions
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center py-12">
      {/* Abstract background decorative accent blob */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5 pointer-events-none" />

      {/* Responsive grid layout supporting text content on left and photo on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Core Text Data Content (Spans 7 out of 12 columns) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Open Opportunities
          </motion.div>

          {/* Primary Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50"
          >
            Building scalable software with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              architectural integrity
            </span>
            .
          </motion.h1>

          {/* Subtitle Body Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl"
          >
            Hi, I'm{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Abdullah Nazmus-Sakib
            </span>
            . A Full-Stack Software Engineer specialized in crafting
            performance-optimized web architectures using Next.js, TypeScript,
            Tailwind CSS, and the MERN ecosystem.
          </motion.p>

          {/* Action Call-to-Buttons (CTAs) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow shadow-blue-500/10 text-center w-full sm:w-auto"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 bg-white hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 transition-colors text-center w-full sm:w-auto"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Picture Visual Wrapper (Spans 5 out of 12 columns) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none bg-zinc-100 dark:bg-zinc-900">
            <Image
              src="/profile_picture/Profile_pic_4.jpg" // <-- FIX: Points directly to your clean profile photo using correct uppercase casing
              alt="Abdullah Nazmus-Sakib Profile Picture"
              fill // Instructs image to completely fill parent container block boundaries
              priority // Preloads this image instantly on initial server-side load as it lives above the fold
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

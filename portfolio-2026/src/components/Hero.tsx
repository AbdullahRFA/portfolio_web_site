"use client"; // Required for Framer Motion timelines and Typed.js hooks running in-browser

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Hero = () => {
  const el = useRef<HTMLSpanElement>(null);

  // Initialize the typing animation cycle matching your competencies
  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: [
        "Full-Stack Developer",
        "Flutter App Developer",
        "AI/ML Engineering Learner",
        "SQA Automation Learner",
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

  const resumeUrl =
    "https://github.com/AbdullahRFA/certs-and-awards/blob/main/Abdullah_Resume/Abdullah_Resume.pdf";
  const resumeDownloadUrl = resumeUrl
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");

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

  const downloadResume = async () => {
    try {
      const response = await fetch(resumeDownloadUrl);
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }
      const blob = await response.blob();
      const downloadLink = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      downloadLink.href = objectUrl;
      downloadLink.download = "Abdullah_Nazmus_Sakib_Resume.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Resume download failed:", error);
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  const rollingSkills = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Flutter",
    "Dart",
    "Python",
    "Django",
    "FastAPI",
    "RestAPI",
    "C/C++",
    "Java",
    "Git",
    "Tailwind CSS",
  ];

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center py-16 overflow-visible">
      {/* --- BACKDROP NEON BLUR GLOW CORES --- */}
      <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-20 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />

      {/* Cybernetic Grid Matrix Overlay */}
      <div className="absolute inset-0 -z-20 opacity-[0.03] bg-[radial-gradient(#00f2fe_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />

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
            </span>{" "}
            Available for Software Engineering Internships
          </motion.div>

          {/* Core Introduction Headline */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-cyan-300">
              Hi, I&apos;m
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-50 leading-none">
              Abdullah Nazmus Sakib
            </h1>
          </motion.div>

          {/* Dynamic Typing Text Stream Link Header Block */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 min-h-10"
          >
            I&apos;m a{" "}
            <span
              ref={el}
              role="status"
              aria-live="polite"
              className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]"
            />
          </motion.div>

          {/* FIXED: Shifted text styling to use premium typography alignments with isolated cyberpunk color gradients */}
          <motion.p
            variants={itemVariants}
            className="text-base text-zinc-300 font-normal leading-relaxed max-w-2xl"
          >
            Building reliable software through{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]">
              full-stack development
            </span>
            , mobile applications,{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              AI solutions
            </span>
            , and{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text drop-shadow-[0_0_8px_rgba(232,121,249,0.2)]">
              quality engineering
            </span>
            . Passionate about turning ideas into real-world impact.
          </motion.p>

          {/* --- HORIZONTAL SKILLS MARQUEE TICKER --- */}
          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden py-3 relative border-y border-zinc-900/60 bg-zinc-950/20 max-w-xl rounded-xl"
          >
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-8 whitespace-nowrap animate-marquee">
              <div className="flex gap-8 shrink-0 justify-around min-w-full animate-marquee">
                {rollingSkills.map((skill, idx) => (
                  <span
                    key={`roll-1-${idx}`}
                    className="text-xs font-extrabold tracking-widest uppercase text-zinc-500 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {skill}{" "}
                    <span className="text-zinc-800 ml-6 select-none">•</span>
                  </span>
                ))}
              </div>
              <div
                className="flex gap-8 shrink-0 justify-around min-w-full animate-marquee"
                aria-hidden="true"
              >
                {rollingSkills.map((skill, idx) => (
                  <span
                    key={`roll-2-${idx}`}
                    className="text-xs font-extrabold tracking-widest uppercase text-zinc-500 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {skill}{" "}
                    <span className="text-zinc-800 ml-6 select-none">•</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- SOCIAL MEDIA ACCOUNT INDICATORS ROW --- */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 pt-1"
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-fuchsia-400 hover:border-fuchsia-500/40 hover:shadow-[0_0_15px_rgba(232,121,249,0.4)] transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300"
              aria-label="Facebook Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-3.543v-2.891h3.543v-2.2c0-3.497 2.136-5.422 5.26-5.422 1.497 0 3.058.268 3.058.268v3.363h-1.722c-1.733 0-2.264 1.076-2.264 2.179v2.38h3.79l-.606 2.891h-3.184v6.987c4.781-.75 8.438-4.887 8.438-9.878z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-300 hover:text-red-400 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300"
              aria-label="YouTube Channel"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.136z" />
              </svg>
            </a>
          </motion.div>

          {/* Action Interface Controllers Buttons (CTAs) with Neon Hover Shadows */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              className="group relative px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] text-center w-full sm:w-auto flex items-center justify-center gap-2 transform hover:-translate-y-0.5 duration-200"
            >
              Explore My Work
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-zinc-300 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 hover:text-zinc-100 hover:border-cyan-500/40 transition-all duration-300 shadow-xs text-center w-full sm:w-auto hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              Get In Touch
            </a>

            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold text-zinc-50 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-cyan-500/40 hover:text-cyan-200 transition-all duration-300 shadow-[0_0_25px_rgba(15,23,42,0.25)] w-full sm:w-auto gap-2"
            >
              Download Resume
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <path d="M8 11l4 4 4-4" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: CLEAN RE-POSITIONED MASTER FOCUS BADGES --- */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          {/* Badge 1: Next.js Architecture */}
          <motion.div
            variants={floatAnimation(0)}
            initial="initial"
            animate="animate"
            className="absolute -top-6 left-6 lg:-left-4 z-25 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            <span className="text-xs font-bold text-zinc-200">
              Next.js / MERN
            </span>
          </motion.div>

          {/* Badge 2: Cross-Platform Mobile */}
          <motion.div
            variants={floatAnimation(0.8)}
            initial="initial"
            animate="animate"
            className="absolute top-[45%] -left-12 z-25 bg-zinc-900/90 backdrop-blur-md border border-fuchsia-500/20 shadow-[0_0_15px_rgba(240,147,251,0.15)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#f093fb]" />
            <span className="text-xs font-bold text-zinc-200">
              Flutter App Dev
            </span>
          </motion.div>

          {/* Badge 3: Intelligence & Core Engineering */}
          <motion.div
            variants={floatAnimation(1.6)}
            initial="initial"
            animate="animate"
            className="absolute bottom-4 right-6 lg:-right-4 z-25 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            <span className="text-xs font-bold text-zinc-200">
              AI/ML & Core Engine
            </span>
          </motion.div>

          {/* Badge 4: SQA for Manual and Automated Testing */}
          <motion.div
            variants={floatAnimation(2.4)} // Updated: Staggered animation delay
            initial="initial"
            animate="animate"
            // Updated: Moved to top-right to balance layout and prevent overlap
            className="absolute top-12 right-4 lg:-right-19 z-25 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] p-3 rounded-2xl flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            <span className="text-xs font-bold text-zinc-200">
              SQA & Automated Testing
            </span>
          </motion.div>

          {/* Primary Portrait Card Container Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
            className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[3/4] rounded-[2.5rem] flex items-center justify-center group overflow-visible z-10 shadow-2xl"
          >
            {/* Spinning Gradient Outlining Mask Frame */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
              <div
                className="absolute inset-[-50%] bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-500 animate-spin opacity-90"
                style={{ animationDuration: "8s" }}
              />
            </div>

            {/* Inset Core Image Backplate */}
            <div className="absolute inset-[2px] rounded-[2.4rem] overflow-hidden bg-zinc-950 z-10">
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />

              <Image
                src="/profile_picture/profile_pic_2.jpg"
                alt="Abdullah Nazmus Sakib Portrait"
                fill
                priority
                sizes="(max-w: 768px) 100vw, 33vw"
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

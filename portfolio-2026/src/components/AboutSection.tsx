"use client"; // Required since we weave in scroll-triggered structural motion variants

import { motion, Variants } from "framer-motion";
import { experienceData } from "../lib/aboutData";
import Timeline from "./Timeline";

const AboutSection = () => {
  // 1. Hero Text fly-in from Left side orchestration
  const leftFlyInVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.1 },
    },
  };

  // 2. Experience Timeline fly-in from Right side orchestration
  const rightFlyInVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.2 },
    },
  };

  // 3. Stagger container list to fade in children bullet layouts sequentially
  const parentStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 border-t border-zinc-900 overflow-hidden"
    >
      {/* Cyberpunk ambient background neon glow orbs */}
      <div className="absolute top-1/3 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/2 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* --- LEFT COLUMN: BIO WITH FLYING LEFT EFFECT --- */}
        <motion.div
          variants={leftFlyInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers only once precisely when crossing into view track
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
            whileHover={{
              y: -2,
              scale: 1.002,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="group relative p-6 rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/20 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle internal spotlight */}
            <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <motion.p
              variants={textItemVariants}
              className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal"
            >
              Hello! I&apos;m{" "}
              <span className="font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors duration-200">
                Abdullah Nazmus Sakib
              </span>
              , a final-year Computer Science & Engineering undergraduate at{" "}
              <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]">
                Jahangirnagar University
              </span>
              . I build robust full-stack solutions, complex algorithmic
              platforms, and cross-platform mobile apps.
            </motion.p>

            <motion.p
              variants={textItemVariants}
              className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal"
            >
              My engineering approach maps across multiple disciplines: crafting
              pre-rendered modular interfaces in{" "}
              <span className="font-semibold text-zinc-200">
                Next.js & TypeScript
              </span>
              , structuring bulletproof API schemas using{" "}
              <span className="font-semibold text-zinc-200">MERN & Django</span>
              , and writing end-to-end automated software testing
              configurations.
            </motion.p>

            <motion.p
              variants={textItemVariants}
              className="text-zinc-400 text-sm leading-relaxed font-normal"
            >
              Currently expanding my horizons into{" "}
              <span className="font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                AI, Large Language Models (LLMs), and IoT systems
              </span>
              , aiming to translate intense academic compute principles directly
              into secure, human-centric production environments.
            </motion.p>
          </motion.div>

          {/* Live Quick University Stat Indicator with Cyber Neon Styling */}
          <motion.div
            variants={textItemVariants}
            whileHover={{
              y: -1,
              scale: 1.005,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-xs font-bold text-zinc-400 shadow-inner group"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe] animate-pulse" />
            <span className="group-hover:text-cyan-400 transition-colors duration-300">
              JU CSE Campus Core Member • Class of 2026
            </span>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: INTERACTIVE HISTORY WITH FLYING RIGHT EFFECT --- */}
        <motion.div
          variants={rightFlyInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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

          <motion.div
            whileHover={{
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="bg-zinc-900/40 p-2 md:p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md"
          >
            <Timeline items={experienceData} />
          </motion.div>

          <div className="px-2 mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
              Academic Record
            </span>
            <h3 className="text-2xl font-bold text-zinc-100 mt-1 tracking-tight">
              Education
            </h3>
          </div>

          <motion.div
            whileHover={{
              y: -1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md space-y-5"
          >
            <article className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h4 className="text-xl font-bold text-zinc-100">
                    Jahangirnagar University • Bachelor of Science - BS,
                    Computer Science
                  </h4>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">
                    Mar 2022 – Mar 2026
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/abdullahrfa/details/education/edit/forms/980889716/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.26em] font-bold text-zinc-500 hover:text-cyan-400 transition-colors"
                >
                  View on LinkedIn
                </a>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                I&apos;m currently a fourth-year student at Jahangirnagar
                University, majoring in Computer Science and Engineering. My
                time here has been an incredible journey of growth, both
                academically and personally. The university offers a rich
                learning environment, where I&apos;m not only gaining technical
                skills but also engaging in research and projects that push my
                creativity and problem-solving abilities. It&apos;s a place
                where I&apos;m shaping my future and preparing to make a
                meaningful impact in the world of technology.
              </p>

              <p className="text-xs text-zinc-500 mt-4">
                Skills: HTML5, Cascading Style Sheets (CSS) and +12 skills
              </p>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h4 className="text-xl font-bold text-zinc-100">
                    Nawab Siraj-Ud-Dowla Government College, Natore
                  </h4>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">
                    H.S.C, Science • Jan 2018 – Jan 2020
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/abdullahrfa/details/education/edit/forms/1032951628/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.26em] font-bold text-zinc-500 hover:text-cyan-400 transition-colors"
                >
                  View on LinkedIn
                </a>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                Grade: 5.00. At Nawab Siraj-Ud-Dowla Government College, Natore,
                I actively participated in various societies and activities. I
                was a member of the Debating Society, honed my public speaking
                skills, and took part in cultural events like drama and music. I
                also participated in sports, promoted physical fitness, and
                engaged in volunteer work for social causes.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                During my time there, I experienced a vibrant and enriching
                college life. The college provided an excellent academic
                environment, with dedicated faculty members who helped me grow
                intellectually and personally. I engaged in extracurricular
                activities, made lasting friendships, gained leadership
                experience, and enjoyed a campus with historical charm.
              </p>
            </article>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

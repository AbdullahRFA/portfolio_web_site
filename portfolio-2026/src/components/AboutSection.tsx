"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { TimelineItem } from "../types/about";
import Timeline from "./Timeline";

interface AboutSectionProps {
  experiences: TimelineItem[];
  education: any[];
}

export default function AboutSection({ experiences = [], education = [] }: AboutSectionProps) {
  const leftFlyInVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.1 } }
  };

  const rightFlyInVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.2 } }
  };

  const parentStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.25 } }
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [expandedExp, setExpandedExp] = useState(false);
  const [expandedEdu, setExpandedEdu] = useState(false);

  const ITEMS_TO_SHOW = 2;
  const visibleExpItems = expandedExp ? experiences : experiences.slice(0, ITEMS_TO_SHOW);

  return (
    <section id="about" className="relative py-24 border-t border-zinc-900 overflow-hidden">
      <div className="absolute top-1/3 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/2 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <motion.div 
          variants={leftFlyInVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          className="lg:col-span-5 lg:sticky lg:top-24 space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">02 . Story Context</span>
            <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">About Me</h2>
          </div>

          <motion.div
            variants={parentStaggerVariants}
            whileHover={{ y: -2, scale: 1.002, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative p-6 rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/20 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <motion.p variants={textItemVariants} className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal">
              Hello! I&apos;m <span className="font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors duration-200">Abdullah Nazmus Sakib</span>, a final-year Computer Science & Engineering undergraduate at <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]">Jahangirnagar University</span>. I build robust full-stack solutions, complex algorithmic platforms, and cross-platform mobile apps.
            </motion.p>

            <motion.p variants={textItemVariants} className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal">
              My engineering approach maps across multiple disciplines: crafting pre-rendered modular interfaces in <span className="font-semibold text-zinc-200">Next.js & TypeScript</span>, structuring bulletproof API schemas using <span className="font-semibold text-zinc-200">MERN & Django</span>, and writing end-to-end automated software testing configurations.
            </motion.p>

            <motion.p variants={textItemVariants} className="text-zinc-400 text-sm leading-relaxed font-normal">
              Currently expanding my horizons into <span className="font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.15)]">AI, Large Language Models (LLMs), and IoT systems</span>, aiming to translate intense academic compute principles directly into secure, human-centric production environments.
            </motion.p>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            whileHover={{ y: -1, scale: 1.005, transition: { duration: 0.2, ease: "easeOut" } }}
            className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-xs font-bold text-zinc-400 shadow-inner group"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe] animate-pulse" />
            <span className="group-hover:text-cyan-400 transition-colors duration-300">JU CSE Campus Core Member • Class of 2026</span>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={rightFlyInVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          className="lg:col-span-7 space-y-6"
        >
          <div className="px-2 mb-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.3)]">Chronological Path</span>
                <h3 className="text-2xl font-bold text-zinc-100 mt-1 tracking-tight">Career & Education</h3>
              </div>
              
              <div className="inline-flex rounded-full bg-zinc-950/70 border border-zinc-800 p-1 shadow-inner">
                <button 
                  onClick={() => setActiveTab("experience")} 
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${activeTab === "experience" ? "bg-linear-to-r from-fuchsia-500 to-cyan-500 text-zinc-950 shadow-[0_0_20px_rgba(232,121,249,0.18)]" : "text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"}`}
                >
                  Professional Experience
                </button>
                <button 
                  onClick={() => setActiveTab("education")} 
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${activeTab === "education" ? "bg-linear-to-r from-emerald-500 to-cyan-400 text-zinc-950 shadow-[0_0_20px_rgba(52,211,153,0.18)]" : "text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"}`}
                >
                  Academic Record
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "experience" ? (
              <motion.div key="experience" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1, delayChildren: 0.1 }} className="bg-zinc-900/40 p-2 md:p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md">
                  <Timeline items={visibleExpItems} />
                </motion.div>

                {experiences.length > ITEMS_TO_SHOW && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="flex justify-center pt-4">
                    <motion.button
                      onClick={() => setExpandedExp(!expandedExp)}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
                      <div className="absolute inset-0 rounded-full border border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-300" />
                      <span className="relative flex items-center justify-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                        <span>{expandedExp ? "Show Less" : "Show More Experiences"}</span>
                        <motion.svg animate={{ rotate: expandedExp ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </motion.svg>
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="education" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.12, delayChildren: 0.1 }} className="bg-zinc-900/40 p-2 md:p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md space-y-4">
                  <AnimatePresence mode="sync">
                    {education.slice(0, expandedEdu ? education.length : 1).map((item: any, idx: number) => (
                      <motion.article
                        key={item.id || `edu-${idx}`}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.95 }}
                        transition={{ delay: idx * 0.15, duration: 0.4 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950/70 to-zinc-950/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden relative"
                      >
                        <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: idx * 0.15, duration: 0.5 }} className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 origin-left" />

                        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors duration-300">
                              {item.institution || item.title}
                            </h4>
                            <p className="text-sm font-semibold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)] mt-2">
                              {item.degree ? `${item.degree} • ` : ''}{item.date}
                            </p>
                          </div>
                          
                          {/* Replaced LinkedIn Button with CGPA Badge */}
                          {item.cgpa && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest shadow-inner shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              CGPA: {item.cgpa}
                            </div>
                          )}
                        </div>

                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.15 + 0.1 }} className="text-zinc-400 text-sm leading-relaxed mt-4 group-hover:text-zinc-300 transition-colors duration-300">
                          {item.description}
                        </motion.p>

                        {item.skills && (
                          <p className="text-xs text-zinc-500 mt-4 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            Skills: {item.skills}
                          </p>
                        )}
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {education.length > 1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="flex justify-center pt-4">
                    <motion.button
                      onClick={() => setExpandedEdu(!expandedEdu)}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
                      <div className="absolute inset-0 rounded-full border border-emerald-400/40 group-hover:border-emerald-400/80 transition-all duration-300" />
                      <span className="relative flex items-center justify-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                        <span>{expandedEdu ? "Show Less" : "View Full Academic Record"}</span>
                        <motion.svg animate={{ rotate: expandedEdu ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </motion.svg>
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}








// "use client"; // Required since we weave in scroll-triggered structural motion variants

// import { AnimatePresence, motion, Variants } from "framer-motion";
// import { useState } from "react";
// import { TimelineItem } from "../types/about";
// import Timeline from "./Timeline";

// interface AboutSectionProps {
//   experiences: TimelineItem[];
// }

// const AboutSection = ({ experiences = [] }: AboutSectionProps) => {
//   // 1. Hero Text fly-in from Left side orchestration
//   const leftFlyInVariants: Variants = {
//     hidden: { opacity: 0, x: -60 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.1 },
//     },
//   };

//   // 2. Experience Timeline fly-in from Right side orchestration
//   const rightFlyInVariants: Variants = {
//     hidden: { opacity: 0, x: 60 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.2 },
//     },
//   };

//   // 3. Stagger container list to fade in children bullet layouts sequentially
//   const parentStaggerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.12, delayChildren: 0.25 },
//     },
//   };

//   const textItemVariants: Variants = {
//     hidden: { opacity: 0, y: 15 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" },
//     },
//   };

//   const [activeTab, setActiveTab] = useState<"experience" | "education">(
//     "experience",
//   );
//   const [expandedExp, setExpandedExp] = useState(false);
//   const [expandedEdu, setExpandedEdu] = useState(false);

//   const ITEMS_TO_SHOW = 2;
//   const visibleExpItems = expandedExp
//     ? experiences
//     : experiences.slice(0, ITEMS_TO_SHOW);

//   return (
//     <section
//       id="about"
//       className="relative py-24 border-t border-zinc-900 overflow-hidden"
//     >
//       {/* Cyberpunk ambient background neon glow orbs */}
//       <div className="absolute top-1/3 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none animate-pulse" />
//       <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/2 blur-3xl pointer-events-none" />

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
//         {/* --- LEFT COLUMN: BIO WITH FLYING LEFT EFFECT --- */}
//         <motion.div
//           variants={leftFlyInVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }} // Triggers only once precisely when crossing into view track
//           className="lg:col-span-5 lg:sticky lg:top-24 space-y-6"
//         >
//           <div className="space-y-2">
//             <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
//               02 . Story Context
//             </span>
//             <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
//               About Me
//             </h2>
//           </div>

//           {/* Bio Description Box with Video-Matched Cyberpunk Hover Effects */}
//           <motion.div
//             variants={parentStaggerVariants}
//             whileHover={{
//               y: -2,
//               scale: 1.002,
//               transition: { duration: 0.25, ease: "easeOut" },
//             }}
//             className="group relative p-6 rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/20 transition-all duration-300 overflow-hidden"
//           >
//             {/* Subtle internal spotlight */}
//             <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//             <motion.p
//               variants={textItemVariants}
//               className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal"
//             >
//               Hello! I&apos;m{" "}
//               <span className="font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors duration-200">
//                 Abdullah Nazmus Sakib
//               </span>
//               , a final-year Computer Science & Engineering undergraduate at{" "}
//               <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]">
//                 Jahangirnagar University
//               </span>
//               . I build robust full-stack solutions, complex algorithmic
//               platforms, and cross-platform mobile apps.
//             </motion.p>

//             <motion.p
//               variants={textItemVariants}
//               className="text-zinc-400 text-sm leading-relaxed mb-4 font-normal"
//             >
//               My engineering approach maps across multiple disciplines: crafting
//               pre-rendered modular interfaces in{" "}
//               <span className="font-semibold text-zinc-200">
//                 Next.js & TypeScript
//               </span>
//               , structuring bulletproof API schemas using{" "}
//               <span className="font-semibold text-zinc-200">MERN & Django</span>
//               , and writing end-to-end automated software testing
//               configurations.
//             </motion.p>

//             <motion.p
//               variants={textItemVariants}
//               className="text-zinc-400 text-sm leading-relaxed font-normal"
//             >
//               Currently expanding my horizons into{" "}
//               <span className="font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.15)]">
//                 AI, Large Language Models (LLMs), and IoT systems
//               </span>
//               , aiming to translate intense academic compute principles directly
//               into secure, human-centric production environments.
//             </motion.p>
//           </motion.div>

//           {/* Live Quick University Stat Indicator with Cyber Neon Styling */}
//           <motion.div
//             variants={textItemVariants}
//             whileHover={{
//               y: -1,
//               scale: 1.005,
//               transition: { duration: 0.2, ease: "easeOut" },
//             }}
//             className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-xs font-bold text-zinc-400 shadow-inner group"
//           >
//             <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe] animate-pulse" />
//             <span className="group-hover:text-cyan-400 transition-colors duration-300">
//               JU CSE Campus Core Member • Class of 2026
//             </span>
//           </motion.div>
//         </motion.div>

//         {/* --- RIGHT COLUMN: INTERACTIVE HISTORY WITH FLYING RIGHT EFFECT --- */}
//         <motion.div
//           variants={rightFlyInVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="lg:col-span-7 space-y-6"
//         >
//           <div className="px-2 mb-4">
//             <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//               <div>
//                 <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.3)]">
//                   Chronological Path
//                 </span>
//                 <h3 className="text-2xl font-bold text-zinc-100 mt-1 tracking-tight">
//                   Career & Education
//                 </h3>
//               </div>

//               <div className="inline-flex rounded-full bg-zinc-950/70 border border-zinc-800 p-1 shadow-inner">
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("experience")}
//                   className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${
//                     activeTab === "experience"
//                       ? "bg-linear-to-r from-fuchsia-500 to-cyan-500 text-zinc-950 shadow-[0_0_20px_rgba(232,121,249,0.18)]"
//                       : "text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"
//                   }`}
//                 >
//                   Professional Experience
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("education")}
//                   className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${
//                     activeTab === "education"
//                       ? "bg-linear-to-r from-emerald-500 to-cyan-400 text-zinc-950 shadow-[0_0_20px_rgba(52,211,153,0.18)]"
//                       : "text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"
//                   }`}
//                 >
//                   Academic Record
//                 </button>
//               </div>
//             </div>
//           </div>

//           <AnimatePresence mode="wait">
//             {activeTab === "experience" ? (
//               <motion.div
//                 key="experience"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 className="space-y-4"
//               >
//                 {/* Timeline Container */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
//                   className="bg-zinc-900/40 p-2 md:p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md"
//                 >
//                   <Timeline items={visibleExpItems} />
//                 </motion.div>

//                 {/* Show More/Less Button with Enhanced Animation */}
//                 {experiences.length > ITEMS_TO_SHOW && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.4 }}
//                     className="flex justify-center pt-4"
//                   >
//                     <motion.button
//                       onClick={() => setExpandedExp(!expandedExp)}
//                       whileHover={{
//                         scale: 1.05,
//                         boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
//                       }}
//                       whileTap={{ scale: 0.95 }}
//                       className="group relative px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden"
//                     >
//                       {/* Animated background gradient */}
//                       <motion.div
//                         className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full"
//                         animate={{
//                           opacity: [0.5, 1, 0.5],
//                         }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                         }}
//                       />

//                       {/* Border animated glow */}
//                       <div className="absolute inset-0 rounded-full border border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-300" />

//                       {/* Button content */}
//                       <span className="relative flex items-center justify-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
//                         <span>
//                           {expandedExp ? "Show Less" : "Show More Experiences"}
//                         </span>
//                         <motion.svg
//                           animate={{ rotate: expandedExp ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                           />
//                         </motion.svg>
//                       </span>
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="education"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 className="space-y-4"
//               >
//                 {/* Education Cards Container */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
//                   className="bg-zinc-900/40 p-2 md:p-6 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md space-y-4"
//                 >
//                   {/* Educational cards - all rendered, shown based on expandedEdu state */}
//                   <AnimatePresence mode="sync">
//                     {(() => {
//                       const educationItems = [
//                         {
//                           title:
//                             "Jahangirnagar University • Bachelor of Science - BS, Computer Science",
//                           date: "Mar 2022 – Mar 2026",
//                           degree: "BS",
//                           linkedIn:
//                             "https://www.linkedin.com/in/abdullahrfa/details/education/edit/forms/980889716/",
//                           description:
//                             "I'm currently a fourth-year student at Jahangirnagar University, majoring in Computer Science and Engineering. My time here has been an incredible journey of growth, both academically and personally. The university offers a rich learning environment, where I'm not only gaining technical skills but also engaging in research and projects that push my creativity and problem-solving abilities. It's a place where I'm shaping my future and preparing to make a meaningful impact in the world of technology.",
//                           skills:
//                             "HTML5, Cascading Style Sheets (CSS) and +12 skills",
//                         },
//                         {
//                           title:
//                             "Nawab Siraj-Ud-Dowla Government College, Natore",
//                           date: "H.S.C, Science • Jan 2018 – Jan 2020",
//                           degree: "H.S.C",
//                           linkedIn:
//                             "https://www.linkedin.com/in/abdullahrfa/details/education/edit/forms/1032951628/",
//                           description:
//                             "Grade: 5.00. At Nawab Siraj-Ud-Dowla Government College, Natore, I actively participated in various societies and activities. I was a member of the Debating Society, honed my public speaking skills, and took part in cultural events like drama and music. I also participated in sports, promoted physical fitness, and engaged in volunteer work for social causes.\n\nDuring my time there, I experienced a vibrant and enriching college life. The college provided an excellent academic environment, with dedicated faculty members who helped me grow intellectually and personally. I engaged in extracurricular activities, made lasting friendships, gained leadership experience, and enjoyed a campus with historical charm.",
//                           skills: "",
//                         },
//                       ];

//                       return educationItems
//                         .slice(0, expandedEdu ? 2 : 1)
//                         .map((item, idx) => (
//                           <motion.article
//                             key={`edu-${idx}`}
//                             initial={{ opacity: 0, y: 15, scale: 0.95 }}
//                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                             exit={{ opacity: 0, y: -15, scale: 0.95 }}
//                             transition={{ delay: idx * 0.15, duration: 0.4 }}
//                             whileHover={{
//                               y: -4,
//                               transition: { duration: 0.2 },
//                             }}
//                             className="group rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950/70 to-zinc-950/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden relative"
//                           >
//                             {/* Animated gradient accent on hover */}
//                             <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

//                             {/* Top accent line */}
//                             <motion.div
//                               initial={{ scaleX: 0 }}
//                               whileInView={{ scaleX: 1 }}
//                               transition={{ delay: idx * 0.15, duration: 0.5 }}
//                               className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 origin-left"
//                             />

//                             <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
//                               <div className="flex-1">
//                                 <h4 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors duration-300">
//                                   {item.title}
//                                 </h4>
//                                 <p className="text-sm font-semibold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)] mt-2">
//                                   {item.date}
//                                 </p>
//                               </div>
//                               <motion.a
//                                 href={item.linkedIn}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="text-xs uppercase tracking-[0.26em] font-bold text-zinc-500 hover:text-cyan-400 transition-all duration-300 rounded-lg px-3 py-1.5 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
//                               >
//                                 View on LinkedIn
//                               </motion.a>
//                             </div>

//                             <motion.p
//                               initial={{ opacity: 0 }}
//                               whileInView={{ opacity: 1 }}
//                               transition={{ delay: idx * 0.15 + 0.1 }}
//                               className="text-zinc-400 text-sm leading-relaxed mt-4 group-hover:text-zinc-300 transition-colors duration-300"
//                             >
//                               {item.description}
//                             </motion.p>

//                             {item.skills && (
//                               <p className="text-xs text-zinc-500 mt-4 flex items-center gap-2">
//                                 <span className="w-1 h-1 rounded-full bg-cyan-400" />
//                                 Skills: {item.skills}
//                               </p>
//                             )}
//                           </motion.article>
//                         ));
//                     })()}
//                   </AnimatePresence>
//                 </motion.div>

//                 {/* Show More/Less Button for Education */}
//                 {
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.4 }}
//                     className="flex justify-center pt-4"
//                   >
//                     <motion.button
//                       onClick={() => setExpandedEdu(!expandedEdu)}
//                       whileHover={{
//                         scale: 1.05,
//                         boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
//                       }}
//                       whileTap={{ scale: 0.95 }}
//                       className="group relative px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden"
//                     >
//                       {/* Animated background gradient */}
//                       <motion.div
//                         className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full"
//                         animate={{
//                           opacity: [0.5, 1, 0.5],
//                         }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                         }}
//                       />

//                       {/* Border animated glow */}
//                       <div className="absolute inset-0 rounded-full border border-emerald-400/40 group-hover:border-emerald-400/80 transition-all duration-300" />

//                       {/* Button content */}
//                       <span className="relative flex items-center justify-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
//                         <span>
//                           {expandedEdu
//                             ? "Show Less"
//                             : "View Full Academic Record"}
//                         </span>
//                         <motion.svg
//                           animate={{ rotate: expandedEdu ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                           />
//                         </motion.svg>
//                       </span>
//                     </motion.button>
//                   </motion.div>
//                 }
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;

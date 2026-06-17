"use client"; // Required for click states, active filters, and modal handling

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { mockProjects } from "../lib/projectsData";
import { IProjectCaseStudy } from "../types/project";

const ProjectShowcase = () => {
  // Configured filters tracking your verified portfolio disciplines from your resume
  const [filter, setFilter] = useState<
    "All" | "Web Architecture" | "Mobile Apps" | "AI/ML & IoT"
  >("All");
  const [selectedProject, setSelectedProject] =
    useState<IProjectCaseStudy | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projectsToShow = 6;

  const categories = [
    "All",
    "Web Architecture",
    "Mobile Apps",
    "AI/ML & IoT",
  ] as const;

  // Filter mapping matching database categories or fallback tags safely
  const filteredProjects = mockProjects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Web Architecture")
      return (
        project.category === "Frontend" ||
        project.category === "Backend" ||
        project.category === "Full-Stack"
      );
    if (filter === "Mobile Apps") return project.techStack.includes("Flutter");
    if (filter === "AI/ML & IoT")
      return project.techStack.some((tech) =>
        ["VectorDB", "ESP32", "NodeMCU", "TensorFlow", "XAI"].includes(tech),
      );
    return true;
  });

  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, projectsToShow);

  const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 scroll-mt-20 overflow-visible"
    >
      {/* Backdrop Cyberpunk Neon Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            01 . Handcrafted Systems
          </span>
          <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-100">
            Featured Projects
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
            An interactive catalog of architectural prototypes, distributed
            backend stacks, and intelligent automation systems.
          </p>
        </div>

        {/* Dynamic Premium Filter Control Bar - Custom Slid-out Neon Styling */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-900/80 p-1.5 rounded-2xl w-fit border border-zinc-800/80 backdrop-blur-md shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 outline-none ${
                  isActive
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Fluid Motion Grid Container */}
      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative p-6 rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Dynamic Neon Corner Radial Glow Effect on Hover */}
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/50 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.category}
                  </span>
                  <div className="text-zinc-500 group-hover:text-cyan-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shadow-xs">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-zinc-100 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Horizontal Pill System */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/60 group-hover:border-cyan-500/10 transition-colors duration-300">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-zinc-950 text-zinc-400 border border-zinc-800 group-hover:border-cyan-500/10 group-hover:text-zinc-300 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length > projectsToShow && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllProjects((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-zinc-900/90 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-100"
          >
            {showAllProjects ? "See Less Projects" : "See More Projects"}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                showAllProjects ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Immersive Case Study Modal View Overlay Layer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Neon Glow Rim Backplate for Modal */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />

              {/* Close Button Anchor */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-500 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/30 transition-all duration-200 shadow-lg"
                aria-label="Close details"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-500/5 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                    {selectedProject.category} Core Architecture
                  </span>
                  <h3 className="text-2xl font-black text-zinc-50 tracking-tight mt-4 leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 py-3 border-y border-zinc-800">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                    Architectural Breakdown & Problem Statement
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80 font-normal shadow-inner">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/60">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-bold text-zinc-400 hover:text-zinc-100 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5 duration-200"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectShowcase;

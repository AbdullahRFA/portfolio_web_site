"use client"; // Required for click states, active filters, and modal handling

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
// REMOVED: import { mockProjects } from "../lib/projectsData"; 
import { IProjectCaseStudy } from "../types/project";

// Updated to accept 'projects' prop
const ProjectShowcase = ({ projects }: { projects: any[] }) => {
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
  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Web Architecture")
      return (
        project.category === "Frontend" ||
        project.category === "Backend" ||
        project.category === "Full-Stack"
      );
    if (filter === "Mobile Apps") return project.tech_stack?.includes("Flutter");
    if (filter === "AI/ML & IoT")
      return project.tech_stack?.some((tech: string) =>
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

        {/* Dynamic Premium Filter Control Bar */}
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
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-zinc-100 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/60">
                {project.tech_stack?.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-zinc-950 text-zinc-400 border border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal logic remains unchanged for brevity, ensures selectedProject has long_description */}
      {/* ... (keep existing AnimatePresence for the modal) ... */}
    </section>
  );
};

export default ProjectShowcase;
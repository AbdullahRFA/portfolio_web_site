'use client'; // Required for click states, active filters, and modal handling

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IProjectCaseStudy } from '../types/project';
import { mockProjects } from '../lib/projectsData';

const ProjectShowcase = () => {
  // Configured filters tracking your verified portfolio disciplines from your resume
  const [filter, setFilter] = useState<'All' | 'Web Architecture' | 'Mobile Apps' | 'AI/ML & IoT'>('All');
  const [selectedProject, setSelectedProject] = useState<IProjectCaseStudy | null>(null);

  const categories = ['All', 'Web Architecture', 'Mobile Apps', 'AI/ML & IoT'] as const;

  // Filter mapping matching database categories or fallback tags safely
  const filteredProjects = mockProjects.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'Web Architecture') return project.category === 'Frontend' || project.category === 'Backend' || project.category === 'Full-Stack';
    if (filter === 'Mobile Apps') return project.techStack.includes('Flutter');
    if (filter === 'AI/ML & IoT') return project.techStack.some(tech => ['VectorDB', 'ESP32', 'NodeMCU', 'TensorFlow', 'XAI'].includes(tech));
    return true;
  });

  const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="projects" className="relative py-20 scroll-mt-20 overflow-visible">
      {/* Decorative localized accent ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/[0.02] blur-3xl pointer-events-none" />

      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            01 . Handcrafted Systems
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-zinc-50">
            Featured Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
            An interactive catalog of architectural prototypes, distributed backend stacks, and intelligent automation systems.
          </p>
        </div>

        {/* Dynamic Premium Filter Control Bar */}
        <div className="flex flex-wrap gap-2 bg-zinc-100/80 dark:bg-zinc-900/60 p-1.5 rounded-2xl w-fit border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xs shrink-0">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-xs rounded-xl"
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
          {filteredProjects.map((project) => (
            <motion.div
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white to-zinc-50/40 dark:from-zinc-900 dark:to-zinc-950/30 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle hover internal glow */}
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-blue-500/[0.03] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200/20 dark:border-zinc-700/20">
                    {project.category}
                  </span>
                  <div className="text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-700/20 group-hover:border-blue-500/10 transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Immersive Case Study Modal View Overlay Layer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Anchor */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 border border-zinc-200/40 dark:border-zinc-700/40 transition-colors"
                aria-label="Close details"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md bg-blue-500/5 border border-blue-500/10">
                    {selectedProject.category} Core Architecture
                  </span>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mt-3 leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2 py-3 border-y border-zinc-100 dark:border-zinc-800">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Architectural Breakdown & Problem Statement
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 font-normal">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
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
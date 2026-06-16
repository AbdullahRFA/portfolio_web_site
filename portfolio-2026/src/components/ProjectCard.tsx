"use client"; // Required for client-side framer-motion micro-interactions

import React from "react";
import { motion } from "framer-motion";

// Define what props the card expects based on our IProject interface
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
}

const ProjectCard = ({ title, description, techStack }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/40 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-none hover:border-blue-500/20 dark:hover:border-blue-400/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative interactive corner glow effect that appears on card hover */}
      <div className="absolute -top-16 -right-16 -z-10 h-32 w-32 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Header Title Section with Arrow Slide Micro-Interaction */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tracking-tight leading-snug">
            {title}
          </h3>
          
          {/* Slick external link wrapper arrow */}
          <div className="text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0 pt-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* Project Snippet Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tech Stack Pills Container */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/40 dark:border-zinc-700/30 group-hover:border-blue-500/10 dark:group-hover:border-blue-400/10 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
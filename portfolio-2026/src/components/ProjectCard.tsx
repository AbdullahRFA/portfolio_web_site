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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative p-6 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* FIXED: Dynamic Neon Corner Radial Glow Effect that triggers on card hover */}
      <div className="absolute -top-16 -right-16 -z-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Header Title Section with Arrow Slide Micro-Interaction */}
        <div className="flex items-start justify-between gap-4 mb-2">
          {/* FIXED: Dynamic text gradient that ignites seamlessly upon parent card hover states */}
          <h3 className="text-lg font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300 tracking-tight leading-snug">
            {title}
          </h3>
          
          {/* Slick external link wrapper arrow with glow shadow drop offsets */}
          <div className="text-zinc-500 group-hover:text-cyan-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shrink-0 pt-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* Project Snippet Description */}
        <p className="text-sm text-zinc-400 mb-6 line-clamp-2 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Tech Stack Pills Container */}
      {/* FIXED: Remapped design metrics to match high-frequency cyber dashboard metrics layouts exactly */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60 group-hover:border-cyan-500/10 transition-colors duration-300">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-zinc-950 text-zinc-400 border border-zinc-800 group-hover:border-cyan-500/10 group-hover:text-zinc-300 transition-colors duration-300 shadow-inner"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
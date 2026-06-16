'use client'; // This component uses state, so it must be a Client Component

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineItem } from '../types/about';

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(items[0]?.id || null);

  return (
    // FIXED: Upgraded the vertical baseline connector to match the cyber neon pipeline track theme
    <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-6 py-2 space-y-2">
      {items.map((item) => {
        const isActive = activeItem === item.id;

        return (
          <div 
            key={item.id} 
            className="relative ml-6 cursor-pointer group transition-all duration-300 pb-2"
            onClick={() => setActiveItem(item.id)}
          >
            {/* --- CYBERPUNK TIMELINE NODE NODE/DOT --- */}
            {/* FIXED: Built a multi-layered neon indicator node with reactive aura pings matching the reference video */}
            <span className="absolute -left-[33px] top-7 z-20 flex h-4 w-4 items-center justify-center">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 transition-all duration-300 ${
                isActive 
                  ? 'animate-ping bg-cyan-400' 
                  : 'bg-transparent group-hover:bg-zinc-700/50'
              }`} />
              <span className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                isActive 
                  ? 'bg-zinc-950 border-cyan-400 shadow-[0_0_10px_#00f2fe]' 
                  : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500'
              }`} />
            </span>

            {/* --- CONTENT BLOCK CONTAINER CARD --- */}
            {/* FIXED: Re-architected container to use an obsidian gloss profile with interactive accent rings */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
              isActive 
                ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-750 shadow-[0_0_30px_rgba(6,182,212,0.06)]' 
                : 'border-transparent bg-transparent hover:bg-zinc-900/30'
            }`}>
              {/* Active edge illumination line marker */}
              {isActive && (
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-t from-cyan-500 to-fuchsia-500" />
              )}

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className={`text-lg font-bold transition-colors duration-300 ${
                    isActive ? 'text-zinc-50' : 'text-zinc-300 group-hover:text-zinc-100'
                  }`}>
                    {item.role}
                  </h3>
                  <p className="text-sm font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.2)] mt-0.5">
                    {item.company} • <span className="text-zinc-500 font-medium">{item.location}</span>
                  </p>
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300 shrink-0 w-fit border h-fit ${
                  isActive
                    ? 'bg-zinc-950 border-zinc-800 text-fuchsia-400 drop-shadow-[0_0_6px_rgba(232,121,249,0.3)] shadow-inner'
                    : 'bg-zinc-900/60 border-zinc-850 text-zinc-500'
                }`}>
                  {item.period}
                </span>
              </div>

              {/* Bullet details with fluid height layout limits */}
              <ul className="list-none space-y-2 text-zinc-400 text-xs font-normal leading-relaxed pl-1">
                {item.description.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="text-cyan-500 mt-1 select-none text-[10px] drop-shadow-[0_0_3px_#00f2fe]">»</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* --- TECH PILL BADGES TAG CONTAINER --- */}
              {/* FIXED: Styled sub-tags as low-profile data matrices with neon micro-glow boundaries */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-zinc-900">
                {item.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-zinc-950 border transition-colors duration-300 ${
                      isActive
                        ? 'border-zinc-800 text-zinc-400 group-hover:border-cyan-500/10 group-hover:text-zinc-300'
                        : 'border-zinc-850/60 text-zinc-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
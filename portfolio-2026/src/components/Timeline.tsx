'use client'; // This component uses state, so it must be a Client Component

import React, { useState } from 'react';
import { TimelineItem } from '../types/about';

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6">
      {items.map((item) => {
        const isActive = activeItem === item.id;

        return (
          <div 
            key={item.id} 
            className="mb-10 ml-6 cursor-pointer group transition-all"
            onClick={() => setActiveItem(item.id)}
          >
            {/* Timeline Node/Dot */}
            <span className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 transition-all ${
              isActive 
                ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                : 'bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 group-hover:border-blue-500'
            }`} />

            {/* Content Card */}
            <div className={`p-5 rounded-xl border transition-all ${
              isActive 
                ? 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700 shadow-sm' 
                : 'border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30'
            }`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {item.company} • <span className="text-zinc-500 font-normal">{item.location}</span>
                  </p>
                </div>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full mt-1 md:mt-0 w-fit">
                  {item.period}
                </span>
              </div>

              {/* Expandable Bullet Points */}
              <ul className="list-disc list-inside space-y-1.5 text-zinc-600 dark:text-zinc-400 text-sm mt-3">
                {item.description.map((bullet, index) => (
                  <li key={index} className="leading-relaxed">{bullet}</li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
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
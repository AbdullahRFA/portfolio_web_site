import React from 'react';
import { skillsData } from '../lib/skillsData';

const SkillsBento = () => {
  return (
    <section className="py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-zinc-800 dark:text-zinc-100">
          Technical Toolkit
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
          A modular look at the languages, frameworks, and engineering tools I interact with daily.
        </p>
      </div>

      {/* The Bento Container Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        {skillsData.map((category, index) => (
          <div
            key={index}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-sm ${category.gridClass}`}
          >
            {/* Top Info Area */}
            <div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug max-w-sm mb-4">
                {category.description}
              </p>
            </div>

            {/* Bottom Badges Wrap Area */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-start"
                >
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsBento;
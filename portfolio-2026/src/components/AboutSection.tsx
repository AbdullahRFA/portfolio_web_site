import React from 'react';
import Timeline from './Timeline';
import { experienceData } from '../lib/aboutData';

const AboutSection = () => {
  return (
    <section className="py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Bio / Profile Introduction */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-800 dark:text-zinc-100">
            About Me
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            Hello! I'm an aspiring Full-Stack Software Engineer with a deep passion for clean architecture, component driven design, and robust backend systems.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I specialize in crafting high-performance interfaces with Next.js and tying them seamlessly into robust document-driven databases like MongoDB. My focus is on writing code that doesn't just work, but is testable and accessible to all users.
          </p>
        </div>

        {/* Right Column: Interactive Professional History */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-6 text-zinc-800 dark:text-zinc-100 px-4 md:px-6">
            Professional Experience
          </h3>
          <Timeline items={experienceData} />
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;
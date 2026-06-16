'use client'; // Required for click states, tab transitions, and list tracking running in-browser

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { mockBlogPosts } from '../lib/blogData';

const BlogShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically compile a unique array list of active categories directly from your resume blog data assets
  const filterCategories = ['All', ...Array.from(new Set(mockBlogPosts.map(post => post.category)))];

  // Clean, direct string literal equality comparison filter logic that matches your data entries perfectly
  const filteredPosts = activeCategory === 'All'
    ? mockBlogPosts
    : mockBlogPosts.filter(post => post.category === activeCategory);

  // Framer Motion staggered orchestration variants
  const streamContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const articleVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 16 } 
    }
  };

  return (
    <section id="blog" className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible">
      {/* Cyberpunk ambient background glow orbs */}
      <div className="absolute top-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.03] blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/[0.02] blur-3xl pointer-events-none" />

      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.3)]">
            04 . Written Documentation
          </span>
          <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
            Technical Insights
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
            Deep-dives into Explainable AI (XAI), complex software architecture patterns, and structured automation frameworks.
          </p>
        </div>

        {/* Tag-Based Smooth Sliding Cyberpunk Navigation Bar */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-900/80 p-1.5 rounded-2xl w-fit border border-zinc-800/80 backdrop-blur-md shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 outline-none ${
                  isActive
                    ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeBlogTabBackground"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="absolute inset-0 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Vertical Article List Stream Container with PopLayout Physics */}
      <motion.div 
        variants={streamContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        layout
        className="space-y-4 max-w-4xl"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.article 
                key={post.slug}
                variants={articleVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                whileHover={{ 
                  x: 6, 
                  transition: { duration: 0.2, ease: "easeOut" } 
                }}
                className="group relative flex flex-col items-start p-6 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-xl hover:shadow-[0_0_25px_rgba(232,121,249,0.05)] hover:border-fuchsia-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Spotlight Radial Background Glow on Card Hover */}
                <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-fuchsia-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Meta details tag bar */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-zinc-500 mb-3">
                  <time className="tabular-nums">{post.date}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-zinc-950 text-zinc-400 text-[10px] uppercase tracking-widest font-black border border-zinc-800 group-hover:border-fuchsia-500/20 group-hover:text-fuchsia-400 transition-colors duration-300 shadow-inner">
                    {post.category}
                  </span>
                </div>

                {/* Primary Article Title */}
                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 mb-2 tracking-tight">
                  {post.title}
                </h3>
                
                {/* Excerpt Summary Snippet */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2 font-normal">
                  {post.excerpt}
                </p>

                {/* Inline Interaction Indicator */}
                <span className="text-xs font-bold text-cyan-400 group-hover:text-fuchsia-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)] inline-flex items-center gap-1.5 transition-colors duration-300 group-hover:underline">
                  Read full breakdown 
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.article>
            ))
          ) : (
            <p className="text-sm font-medium text-zinc-500 py-6">
              No matching publications found under this layout criteria.
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default BlogShowcase;
'use client'; // Required for click states, tab transitions, and list tracking running in-browser

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { mockBlogPosts } from '../lib/blogData';

const BlogShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically compile a unique array list of active categories directly from your resume blog data assets
  const filterCategories = ['All', ...Array.from(new Set(mockBlogPosts.map(post => post.category)))];

  // FIXED: Clean, direct string literal equality comparison filter logic that matches your data entries perfectly[cite: 3]
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 16 } 
    }
  };

  return (
    <section id="blog" className="relative py-20 border-t border-zinc-100 dark:border-zinc-900 scroll-mt-20 overflow-visible">
      {/* Soft atmospheric ambient glow background accent */}
      <div className="absolute top-1/2 right-1/4 -z-10 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl pointer-events-none" />

      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            04 . Written Documentation
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-zinc-50">
            Technical Insights
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
            Deep-dives into Explainable AI (XAI), complex software architecture patterns, and structured automation frameworks.
          </p>
        </div>

        {/* Tag-Based Smooth Sliding Categorization Navigation Bar */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-100/80 dark:bg-zinc-900/60 p-1.5 rounded-2xl w-fit border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xs shrink-0">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeBlogTabBackground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-xs rounded-xl"
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
        className="space-y-6 max-w-4xl"
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
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col items-start p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-b from-white to-zinc-50/20 dark:from-zinc-900 dark:to-zinc-950/20 shadow-2xs hover:shadow-md hover:border-blue-500/10 dark:hover:border-blue-400/10 transition-all duration-300 cursor-pointer"
              >
                {/* Meta details tag bar[cite: 3] */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-zinc-400 mb-2.5">
                  <time className="tabular-nums">{post.date}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/5 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 text-[10px] uppercase tracking-wider font-extrabold border border-blue-500/10">
                    {post.category}
                  </span>
                </div>

                {/* Primary Article Title[cite: 3] */}
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2 tracking-tight">
                  {post.title}
                </h3>
                
                {/* Excerpt Summary Snippet[cite: 3] */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Inline Interaction Indicator */}
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:underline">
                  Read full breakdown 
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.article>
            ))
          ) : (
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-600 py-6">
              No matching publications found under this layout criteria.
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default BlogShowcase;
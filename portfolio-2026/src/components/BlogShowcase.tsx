'use client'; // Required for tab navigation click tracking and category storage updates

import React, { useState } from 'react';
import { mockBlogPosts } from '../lib/blogData';

const BlogShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically compile a unique array list of active categories from post assets
  const filterCategories = ['All', ...Array.from(new Set(mockBlogPosts.map(post => post.category)))];

  // Conditional array filtration logic
  const filteredPosts = activeCategory === 'All'
    ? mockBlogPosts
    : mockBlogPosts.filter(post => post.category === activeCategory);

  return (
    <section id="blog" className="py-16 border-t border-zinc-100 dark:border-zinc-900 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
            Technical Insights
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm">
            Deep-dives into software architecture, database performance tuning, and modern web application development.
          </p>
        </div>

        {/* Tag-Based Categorization Navigation Bar */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-50 dark:bg-zinc-900/60 p-1 rounded-xl w-fit border border-zinc-200/40 dark:border-zinc-800/40">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Vertical Article List Stream Container */}
      <div className="space-y-8 max-w-4xl">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article 
              key={post.slug}
              className="group relative flex flex-col items-start p-6 rounded-2xl border border-transparent hover:border-zinc-200/60 dark:hover:border-zinc-800/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 mb-2">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold text-[10px] uppercase tracking-wide">
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 tracking-tight">
                {post.title}
              </h3>
              
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">
                {post.excerpt}
              </p>

              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:underline">
                Read full breakdown 
                <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </article>
          ))
        ) : (
          <p className="text-sm text-zinc-500">No matching publications found under this layout criteria.</p>
        )}
      </div>
    </section>
  );
};

export default BlogShowcase;
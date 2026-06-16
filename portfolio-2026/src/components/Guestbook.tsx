'use client'; // Required since we manage state strings, submission clicks, and session toggles running in-browser

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { mockGuestbookEntries } from '../lib/guestbookData';

const Guestbook = () => {
  // Mock Auth State for early UI design. Change to true to preview signed-in layout!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [entries, setEntries] = useState(mockGuestbookEntries);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const characterLimit = 150;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);

    // Simulate an API network delay roundtrip
    setTimeout(() => {
      const entry = {
        id: `gb-${Date.now()}`,
        name: 'Guest Developer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
        message: newMessage.trim(),
        date: 'Today'
      };

      setEntries([entry, ...entries]);
      setNewMessage('');
      setIsSubmitting(false);
    }, 800);
  };

  // Framer Motion entry tracking orchestration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const entryVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 17 } 
    }
  };

  return (
    <section id="guestbook" className="relative py-20 border-t border-zinc-100 dark:border-zinc-900 scroll-mt-20 overflow-visible">
      {/* Background ambient decorative light ring */}
      <div className="absolute bottom-1/4 right-10 -z-10 h-72 w-72 rounded-full bg-indigo-500/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-4xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            05 . Public Logbook
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-zinc-50">
            Developer Guestbook
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 leading-relaxed max-w-xl">
            Leave a permanent token of your visit. Sign in securely via GitHub to post public feedback, career opportunities, or technical notes.
          </p>
        </div>

        {/* --- TOP INTERACTION LAYER (FORM VS SIGN-IN PROMPT) --- */}
        <div className="mb-10 p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/30 dark:to-zinc-950 shadow-xs">
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-2">
              <div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">Join the discussion wall</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Authenticate via GitHub OAuth parameters to safely sign my developer log.</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(true)} // Mock sign-in toggle for sandbox testing
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50 rounded-xl transition-all shadow-sm shrink-0 group"
              >
                <svg className="w-4 h-4 transform group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                Sign in with GitHub
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Guest" 
                  alt="Your Profile Canvas" 
                  className="w-10 h-10 rounded-full bg-zinc-100 object-cover border border-zinc-200/40"
                />
                <div className="flex-1 min-w-0">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a friendly comment, career note, or question..."
                    maxLength={characterLimit}
                    rows={3}
                    className="w-full bg-transparent border-none text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none resize-none p-0.5 leading-relaxed"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-zinc-200/40 dark:border-zinc-800/40">
                {/* Visual Character Progress Circle Guard System */}
                <div className="flex items-center gap-2">
                  <div className="relative h-4 w-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="8" cy="8" r="6" className="stroke-zinc-200 dark:stroke-zinc-800 fill-none" strokeWidth="1.5" />
                      <circle 
                        cx="8" cy="8" r="6" 
                        className={`fill-none transition-all duration-300 ${
                          newMessage.length >= characterLimit - 20 ? 'stroke-amber-500' : 'stroke-blue-500'
                        }`} 
                        strokeWidth="1.5"
                        strokeDasharray={`${2 * Math.PI * 6}`}
                        strokeDashoffset={`${2 * Math.PI * 6 * (1 - newMessage.length / characterLimit)}`}
                      />
                    </svg>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-medium tracking-tight">
                    {characterLimit - newMessage.length} characters left
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAuthenticated(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newMessage.trim()}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Sign Log Wall'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* --- BOTTOM STREAM LAYER (THE LOG WALL) --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          layout
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {entries.map((entry) => {
              // FIXED: If it is the author response, cleanly route to your lowercase verified image file path asset
              const avatarSrc = entry.isOwner ? '/profile_picture/profile_pic_2.jpg' : entry.avatar;

              return (
                <motion.div 
                  key={entry.id}
                  variants={entryVariants}
                  layout
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className={`flex gap-4 p-5 rounded-2xl border bg-white dark:bg-zinc-900/40 transition-all duration-300 ${
                    entry.isOwner 
                      ? 'bg-gradient-to-r from-blue-50/20 to-indigo-50/10 border-blue-500/20 dark:from-blue-950/5 dark:to-indigo-950/5 dark:border-blue-500/20 shadow-xs' 
                      : 'border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <img 
                    src={avatarSrc} 
                    alt={`${entry.name} portrait representation`} 
                    className={`w-10 h-10 rounded-full bg-zinc-100 object-cover shrink-0 border border-zinc-200/40 dark:border-zinc-800/40 ${
                      entry.isOwner ? 'ring-2 ring-blue-500/20' : ''
                    }`}
                  />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 tracking-tight truncate">
                        {entry.name}
                      </span>
                      {entry.isOwner && (
                        <span className="text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/10">
                          Author
                        </span>
                      )}
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium ml-auto tabular-nums shrink-0">
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed break-words font-normal">
                      {entry.message}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Guestbook;
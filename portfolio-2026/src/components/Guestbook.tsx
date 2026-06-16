'use client'; // Required since we manage state strings, submission clicks, and session toggles

import React, { useState } from 'react';
import { mockGuestbookEntries } from '../lib/guestbookData';

const Guestbook = () => {
  // Mock Auth State for early UI design. Change to true to preview signed-in layout!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [entries, setEntries] = useState(mockGuestbookEntries);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <section id="guestbook" className="py-16 border-t border-zinc-100 dark:border-zinc-900 scroll-mt-20">
      <div className="max-w-4xl">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
            Developer Guestbook
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">
            Leave a permanent token of your visit. Sign in securely via GitHub to post public feedback, career opportunities, or technical notes.
          </p>
        </div>

        {/* --- Top Interaction Layer (Form vs Sign-in Prompt) --- */}
        <div className="mb-12 p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30">
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
              <div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Join the discussion</h3>
                <p className="text-xs text-zinc-500">Authenticate with GitHub to write a message on my log wall.</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(true)} // Mock sign-in toggle for testing layout
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-xl hover:opacity-90 transition-all shadow-sm"
              >
                {/* SVG Github Minimal Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Sign in with GitHub
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Guest" 
                  alt="Your Profile" 
                  className="w-9 h-9 rounded-full bg-zinc-200"
                />
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a friendly comment or question..."
                    maxLength={150} // Data constraint safeguard
                    rows={2}
                    className="w-full bg-transparent border-none text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none resize-none p-1"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-200/50 dark:border-zinc-800/40">
                <span className="text-[10px] text-zinc-400 font-medium">
                  Characters remaining: {150 - newMessage.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAuthenticated(false)}
                    className="px-3 py-1.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    Logout
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newMessage.trim()}
                    className="px-4 py-1.5 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? 'Posting...' : 'Sign Wall'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* --- Bottom Stream Layer (The Wall) --- */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <div 
              key={entry.id} 
              className={`flex gap-4 p-4 rounded-xl border transition-all ${
                entry.isOwner 
                  ? 'bg-blue-50/30 border-blue-100/50 dark:bg-blue-950/5 dark:border-blue-900/20' 
                  : 'border-transparent'
              }`}
            >
              <img 
                src={entry.avatar} 
                alt={`${entry.name} avatar`} 
                className="w-9 h-9 rounded-full bg-zinc-100 object-cover mt-0.5 border border-zinc-200/40 dark:border-zinc-800/40"
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {entry.name}
                  </span>
                  {entry.isOwner && (
                    <span className="text-[9px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 px-1.5 py-0.5 rounded">
                      Author
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 font-medium ml-auto">
                    {entry.date}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed break-words">
                  {entry.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
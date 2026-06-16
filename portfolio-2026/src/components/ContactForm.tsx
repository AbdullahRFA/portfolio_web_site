'use client'; // Required since we track state and bind onChange handlers[cite: 1]

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear inputs on success
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Network error encountered.');
    }
  };

  return (
    <section id="contact" className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible">
      {/* Cyber Ambient Backdrop Laser Glows */}
      <div className="absolute top-1/2 left-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-500/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.03] blur-3xl pointer-events-none animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        
        {/* Left Informational Col */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              06 . Secure Channel
            </span>
            <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
              Let's Connect
            </h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed font-normal">
            Have an open opportunity, a project proposal, or just want to say hi? Drop a message, and it will sync instantly with my admin database dashboard pipeline.
          </p>
          <div className="space-y-2.5 pt-4 border-t border-zinc-900 text-sm text-zinc-400 font-medium">
            <div className="flex items-center gap-3 group">
              <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">📍</span>
              <span className="group-hover:text-zinc-200 transition-colors">Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 group">
              <span className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.4)]">📧</span>
              <span className="group-hover:text-zinc-200 transition-colors">abdulllahnazmus-sakib@example.com</span>
            </div>
          </div>
        </div>

        {/* Right Active Interactive Form Input Col */}
        <div className="md:col-span-3 relative rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 shadow-2xl transition-all duration-300 hover:border-zinc-700/60 overflow-hidden">
          {/* Neon Grid Accent Line Accent for Card top edge */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500" />
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4"
              >
                <div className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-black text-2xl tracking-tight drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                  🎉 Message Received!
                </div>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your transmission was successfully stored in the document collection. I'll get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-xs text-cyan-400 hover:text-fuchsia-400 font-bold uppercase tracking-wider underline transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-normal shadow-inner"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-normal shadow-inner"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-normal shadow-inner resize-none leading-relaxed"
                    placeholder="Hey, loved your portfolio website project architecture..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs font-semibold text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.2)]">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transform hover:-translate-y-0.5 active:translate-y-0 duration-200"
                >
                  {status === 'loading' ? 'Transmitting Stacks...' : 'Establish Connection'}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
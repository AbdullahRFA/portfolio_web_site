'use client'; // Required since we track state and bind onChange handlers

import React, { useState } from 'react';

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
    <section className="py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        
        {/* Left Informational Col */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-800 dark:text-zinc-100">
            Let's Connect
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Have an open opportunity, a project proposal, or just want to say hi? Drop a message, and it will sync instantly with my admin database dashboard pipeline.
          </p>
          <div className="text-sm text-zinc-500">
            <p>📍 Location: Rajshahi, Bangladesh</p>
            <p>📧 Email: abdulllahnazmus-sakib@example.com</p>
          </div>
        </div>

        {/* Right Active Interactive Form Input Col */}
        <div className="md:col-span-3 bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-emerald-500 font-bold text-xl mb-2">🎉 Message Received!</div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs text-blue-600 dark:text-blue-400 font-semibold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Hey, loved your portfolio website project architecture..."
                />
              </div>

              {status === 'error' && (
                <p className="text-xs font-medium text-red-500">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Transmitting Data...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
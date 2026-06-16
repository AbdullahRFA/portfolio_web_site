'use client'; // Required since we handle window scrolling, hooks, and observer states

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' },
    { label: 'Guestbook', href: '#guestbook' },
    { label: 'Contact', href: '#contact' },
  ];

  // Intersection Observer logic to track scrolling positions asynchronously
  useEffect(() => {
    const observerOptions = {
      root: null, // Defaults to the browser viewport bounds frame
      rootMargin: '-20% 0px -60% 0px', // Bounding box sweet spot criteria
      threshold: 0, // Fires callback immediately when target boundary crosses margin limits
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Track all structural elements matching our layout anchors
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      // Clean up connections when component unmounts to prevent memory leaks
      navLinks.forEach((link) => {
        const el = document.querySelector(link.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll helper that maps active selection states instantly on user click triggers
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile tray navigation if open
    
    const targetId = href.replace('#', '');
    setActiveSection(targetId);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Video Matched Cyber Gradient Shadow */}
        <a 
          href="#home" 
          onClick={(e) => handleScroll(e, '#home')}
          className="text-lg font-black tracking-tight text-zinc-50 hover:text-cyan-400 transition-colors duration-300 group"
        >
          AN<span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:text-fuchsia-400 transition-colors">.</span>Sakib
        </a>

        {/* Desktop Navigation Links with Sliding Pill Overlays */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 rounded-xl border border-zinc-850">
            {navLinks.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`text-xs font-bold transition-all relative px-3 py-1.5 rounded-lg outline-none z-10 ${
                    isActive
                      ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="relative z-20">{link.label}</span>
                  
                  {/* Video-Matched Smooth Sliding Active Pill HIGHLIGHT */}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavbarTabPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 bg-zinc-800 border border-zinc-700/50 rounded-lg z-0" 
                    />
                  )}
                </a>
              );
            })}
          </div>
          
          {/* Hire Me Interactive Button Link with Neon Shadow Ring */}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 ${
              activeSection === 'contact'
                ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-900 border border-zinc-800 text-cyan-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:border-transparent shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]'
            }`}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Trigger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="p-2 md:hidden text-zinc-400 hover:text-cyan-400 border border-transparent hover:border-zinc-800 rounded-xl transition-all"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown Tray with Cyberpunk Design */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-900 bg-zinc-950/95 backdrop-blur-lg px-6 py-5 space-y-3 flex flex-col transition-all shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500" />
          {navLinks.map((link) => {
            const linkId = link.href.replace('#', '');
            const isActive = activeSection === linkId;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`text-sm font-bold py-2 rounded-xl px-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-900 border border-zinc-800 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="text-xs font-black text-center uppercase tracking-widest py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
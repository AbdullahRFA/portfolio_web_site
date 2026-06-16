'use client'; // Required since we handle window scrolling, hooks, and observer states

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  // 1. Intersection Observer logic to track scrolling position
  useEffect(() => {
    const observerOptions = {
      root: null, // Defaults to the browser viewport
      rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies the sweet-spot of the screen
      threshold: 0, // Trigger as soon as the section enters the margin area
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Track all elements that match our navigation links
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      // Clean up observer connections when component unmounts
      navLinks.forEach((link) => {
        const el = document.querySelector(link.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // 2. Smooth scroll helper that also sets active state instantly on click
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu drawer if open
    
    const targetId = href.replace('#', '');
    setActiveSection(targetId);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80 transition-all">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('');
          }}
          className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          AN<span className="text-blue-600">.</span>Sakib
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const linkId = link.href.replace('#', '');
            const isActive = activeSection === linkId;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`text-sm font-medium transition-all relative py-1 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {link.label}
                
                {/* Active Underline Pill Animation */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </a>
            );
          })}
          
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm ${
              activeSection === 'contact'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white'
            }`}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Trigger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="p-2 md:hidden text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown Tray */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 space-y-4 flex flex-col transition-all">
          {navLinks.map((link) => {
            const linkId = link.href.replace('#', '');
            const isActive = activeSection === linkId;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`text-sm font-medium py-1 rounded-lg px-2 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="text-sm font-semibold text-center py-2.5 bg-blue-600 text-white rounded-xl"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
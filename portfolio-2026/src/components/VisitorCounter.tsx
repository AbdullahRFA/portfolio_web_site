// src/components/VisitorCounter.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const trackAndFetch = async () => {
      // 1. Check if they have visited during this browser session
      const hasVisited = localStorage.getItem("portfolio_has_visited");

      if (!hasVisited) {
        // 2. If new visitor, tell the API to increment the database
        await fetch("/api/views", { method: "POST" });
        localStorage.setItem("portfolio_has_visited", "true");
      }

      // 3. Fetch the latest global count to display
      const res = await fetch("/api/views");
      const data = await res.json();
      setCount(data.count);
    };

    trackAndFetch();
  }, []);

  // Don't render until we have the number to avoid UI jumping
  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-zinc-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
    >
      {/* Blinking Live Radar Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
      </span>
      
      {/* Counter Text */}
      <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 group-hover:text-cyan-300 transition-colors">
        Portfolio Views : <span className="text-zinc-100">{count.toLocaleString()}</span>
      </span>
    </motion.div>
  );
}
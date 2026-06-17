"use client";

import { motion } from "framer-motion";
import { certificationsData } from "../lib/certificationsData";

const CertificationShowcase = () => {
  return (
    <section
      id="certifications"
      className="relative py-24 border-t border-zinc-900 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-0 sm:px-2">
        <div className="mb-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            07 . Certifications
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-zinc-50">
                Licenses & Certifications
              </h2>
              <p className="max-w-2xl text-sm text-zinc-400 leading-relaxed mt-2">
                Showcase your verified achievements in a compact, interactive
                format. Tap a certificate to view the full credential on
                LinkedIn or open the issuer details.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/abdullahrfa/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/80 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200 hover:border-cyan-500 hover:text-cyan-400"
            >
              View profile on LinkedIn
            </a>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {certificationsData.map((certification) => (
            <motion.article
              key={certification.id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/20 transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
                    {certification.platform}
                  </span>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {certification.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-100">
                  {certification.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {certification.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {certification.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 transition-colors duration-200 group-hover:border-cyan-500 group-hover:text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={certification.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 transition-all duration-200 hover:bg-cyan-500/20 hover:text-white"
                >
                  View credential
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationShowcase;

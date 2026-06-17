"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CertificationItem,
  certificationsData,
} from "../lib/certificationsData";

const CertificationShowcase = () => {
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure modal only renders after hydration completes
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
                format. Tap any card to open the full certificate detail page.
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
              onClick={() => setSelectedCertification(certification)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
                    {certification.platform}
                  </span>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {certification.issueDate}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-100">
                  {certification.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {certification.description}
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

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <span className="rounded-full bg-zinc-900 px-2 py-1">
                    {certification.issuer}
                  </span>
                  <span className="rounded-full bg-zinc-900 px-2 py-1">
                    ID: {certification.credentialId ?? "None"}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isMounted && selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-4xl border border-zinc-800 bg-zinc-950/95 shadow-[0_0_50px_rgba(0,0,0,0.6)]"
            >
              <button
                onClick={() => setSelectedCertification(null)}
                className="absolute right-4 top-4 z-20 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200 hover:border-cyan-500 hover:text-cyan-300"
              >
                Close
              </button>

              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-6 p-8">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      {selectedCertification.platform} Certification
                    </span>
                    <h2 className="text-3xl font-black tracking-tight text-zinc-50">
                      {selectedCertification.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {selectedCertification.description}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                        Issued by
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">
                        {selectedCertification.issuer}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                        Date issued
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">
                        {selectedCertification.issueDate}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                        Expiration
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">
                        {selectedCertification.expireDate}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                        Credential ID
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">
                        {selectedCertification.credentialId ?? "None"}
                      </p>
                    </div>
                  </div>

                  <a
                    href={selectedCertification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-zinc-950 transition-all duration-200 hover:bg-cyan-400"
                  >
                    Open credential URL
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4 sm:p-8">
                  {selectedCertification.photos.map((photo) => (
                    <div
                      key={photo}
                      className="relative h-48 w-full overflow-hidden rounded-3xl shadow-xl shadow-black/20"
                    >
                      <Image
                        src={photo}
                        alt={selectedCertification.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationShowcase;

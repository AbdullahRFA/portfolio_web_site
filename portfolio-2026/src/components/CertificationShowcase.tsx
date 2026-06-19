"use client"; // Required since we manage viewport-triggered animation sequences

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// Updated to accept the 'certifications' prop
const CertificationShowcase = ({ certifications }: { certifications: any[] }) => {
  const [selectedCertification, setSelectedCertification] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  // --- Sorting Logic Added Here ---
  // Sort the array based on the 'sort_order' field before slicing
  const sortedCertifications = [...certifications].sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

  const visibleCertifications = showAllCertifications
    ? sortedCertifications
    : sortedCertifications.slice(0, 3);

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
          {/* <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            07 . Certifications
          </span> */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-zinc-50">
                Licenses & Certifications
              </h2>
              <p className="max-w-2xl text-sm text-zinc-400 leading-relaxed mt-2">
                A verified log of my professional certifications, specialized training programs, and industry credentials. These milestones reflect my ongoing commitment to mastering emerging technologies and engineering practices.
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
          {visibleCertifications.map((cert) => (
            <motion.article
              key={cert.id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setSelectedCertification(cert)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl transition-all duration-300 hover:border-cyan-500/30 flex flex-col"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500 z-10" />
              
              {/* Card Image Preview - Added Here */}
              {cert.photos && cert.photos.length > 0 && (
                <div className="relative w-full h-48 mb-5 overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center p-2">
                  <Image 
                    src={cert.photos[0]} 
                    alt={cert.title} 
                    fill 
                    className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              )}

              <div className="relative space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
                    {cert.platform}
                  </span>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {cert.issue_date}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-100">
                  {cert.title}
                </h3>
                {/* line-clamp-3 added below to truncate the text to 3 lines on the card */}
                <p className="text-sm leading-relaxed text-zinc-400 flex-1 line-clamp-3">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cert.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 transition-colors duration-200 group-hover:border-cyan-500 group-hover:text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mt-auto pt-2 border-t border-zinc-800/60">
                  <span className="rounded-full bg-zinc-900 px-2 py-1">{cert.issuer}</span>
                  <span className="rounded-full bg-zinc-900 px-2 py-1">ID: {cert.credential_id ?? "None"}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {sortedCertifications.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllCertifications((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-zinc-900/90 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-100"
            >
              {showAllCertifications ? "See Less Certifications" : "See More Certifications"}
              <svg className={`w-4 h-4 transition-transform duration-300 ${showAllCertifications ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMounted && selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-4xl border border-zinc-800 bg-zinc-950/95 shadow-[0_0_50px_rgba(0,0,0,0.6)] my-auto"
            >
              <button
                onClick={() => setSelectedCertification(null)}
                className="absolute right-4 top-4 z-20 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200 hover:border-cyan-500 hover:text-cyan-300"
              >
                Close
              </button>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6 p-8 flex flex-col justify-center">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      {selectedCertification.platform} Certification
                    </span>
                    <h2 className="text-3xl font-black tracking-tight text-zinc-50">
                      {selectedCertification.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">{selectedCertification.description}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Issued by</p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">{selectedCertification.issuer}</p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Date issued</p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">{selectedCertification.issue_date}</p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Expiration</p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">{selectedCertification.expire_date}</p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Credential ID</p>
                      <p className="mt-2 text-sm font-semibold text-zinc-100">{selectedCertification.credential_id ?? "None"}</p>
                    </div>
                  </div>

                  <a
                    href={selectedCertification.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-zinc-950 transition-all duration-200 hover:bg-cyan-400 w-fit"
                  >
                    Open credential URL
                  </a>
                </div>

                {/* Modal Images Container - Modified to uncropped object-contain */}
                <div className="flex flex-col gap-4 p-4 lg:p-8 justify-center bg-zinc-900/30 border-l border-zinc-800/50">
                  {selectedCertification.photos?.map((photo: string) => (
                    <div 
                      key={photo} 
                      className="relative w-full min-h-[300px] lg:h-full lg:min-h-[500px] overflow-hidden rounded-3xl shadow-xl shadow-black/20 bg-zinc-900/50 flex items-center justify-center p-4 border border-zinc-800"
                    >
                      <Image 
                        src={photo} 
                        alt={selectedCertification.title} 
                        fill 
                        className="object-contain p-2 md:p-6 drop-shadow-2xl" 
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








// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import {
//   CertificationItem,
//   certificationsData,
// } from "../lib/certificationsData";

// const CertificationShowcase = () => {
//   const [selectedCertification, setSelectedCertification] =
//     useState<CertificationItem | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [showAllCertifications, setShowAllCertifications] = useState(false);

//   const visibleCertifications = showAllCertifications
//     ? certificationsData
//     : certificationsData.slice(0, 3);

//   // Ensure modal only renders after hydration completes
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     <section
//       id="certifications"
//       className="relative py-24 border-t border-zinc-900 overflow-hidden"
//     >
//       <div className="absolute inset-x-0 top-0 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />

//       <div className="mx-auto max-w-6xl px-0 sm:px-2">
//         <div className="mb-8 space-y-3">
//           <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
//             07 . Certifications
//           </span>
//           <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//             <div>
//               <h2 className="text-4xl font-black tracking-tight text-zinc-50">
//                 Licenses & Certifications
//               </h2>
//               <p className="max-w-2xl text-sm text-zinc-400 leading-relaxed mt-2">
//                 Showcase your verified achievements in a compact, interactive
//                 format. Tap any card to open the full certificate detail page.
//               </p>
//             </div>
//             <a
//               href="https://www.linkedin.com/in/abdullahrfa/"
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/80 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200 hover:border-cyan-500 hover:text-cyan-400"
//             >
//               View profile on LinkedIn
//             </a>
//           </div>
//         </div>

//         <div className="grid gap-6 xl:grid-cols-3">
//           {visibleCertifications.map((certification) => (
//             <motion.article
//               key={certification.id}
//               whileHover={{ y: -8, scale: 1.01 }}
//               transition={{ duration: 0.25, ease: "easeOut" }}
//               onClick={() => setSelectedCertification(certification)}
//               className="group cursor-pointer relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:border-cyan-500/30"
//             >
//               <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />
//               <div className="relative space-y-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
//                     {certification.platform}
//                   </span>
//                   <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
//                     {certification.issueDate}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold tracking-tight text-zinc-100">
//                   {certification.title}
//                 </h3>
//                 <p className="text-sm leading-relaxed text-zinc-400">
//                   {certification.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {certification.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 transition-colors duration-200 group-hover:border-cyan-500 group-hover:text-cyan-300"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
//                   <span className="rounded-full bg-zinc-900 px-2 py-1">
//                     {certification.issuer}
//                   </span>
//                   <span className="rounded-full bg-zinc-900 px-2 py-1">
//                     ID: {certification.credentialId ?? "None"}
//                   </span>
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>

//         {certificationsData.length > 3 && (
//           <div className="mt-8 flex justify-center">
//             <button
//               type="button"
//               onClick={() => setShowAllCertifications((prev) => !prev)}
//               className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-zinc-900/90 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-100"
//             >
//               {showAllCertifications
//                 ? "See Less Certifications"
//                 : "See More Certifications"}
//               <svg
//                 className={`w-4 h-4 transition-transform duration-300 ${
//                   showAllCertifications ? "rotate-180" : "rotate-0"
//                 }`}
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M6 9l6 6 6-6" />
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {isMounted && selectedCertification && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="relative w-full max-w-4xl overflow-hidden rounded-4xl border border-zinc-800 bg-zinc-950/95 shadow-[0_0_50px_rgba(0,0,0,0.6)]"
//             >
//               <button
//                 onClick={() => setSelectedCertification(null)}
//                 className="absolute right-4 top-4 z-20 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200 hover:border-cyan-500 hover:text-cyan-300"
//               >
//                 Close
//               </button>

//               <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
//                 <div className="space-y-6 p-8">
//                   <div className="space-y-3">
//                     <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
//                       {selectedCertification.platform} Certification
//                     </span>
//                     <h2 className="text-3xl font-black tracking-tight text-zinc-50">
//                       {selectedCertification.title}
//                     </h2>
//                     <p className="text-sm text-zinc-400 leading-relaxed">
//                       {selectedCertification.description}
//                     </p>
//                   </div>

//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
//                       <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
//                         Issued by
//                       </p>
//                       <p className="mt-2 text-sm font-semibold text-zinc-100">
//                         {selectedCertification.issuer}
//                       </p>
//                     </div>
//                     <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
//                       <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
//                         Date issued
//                       </p>
//                       <p className="mt-2 text-sm font-semibold text-zinc-100">
//                         {selectedCertification.issueDate}
//                       </p>
//                     </div>
//                     <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
//                       <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
//                         Expiration
//                       </p>
//                       <p className="mt-2 text-sm font-semibold text-zinc-100">
//                         {selectedCertification.expireDate}
//                       </p>
//                     </div>
//                     <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
//                       <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
//                         Credential ID
//                       </p>
//                       <p className="mt-2 text-sm font-semibold text-zinc-100">
//                         {selectedCertification.credentialId ?? "None"}
//                       </p>
//                     </div>
//                   </div>

//                   <a
//                     href={selectedCertification.credentialUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-zinc-950 transition-all duration-200 hover:bg-cyan-400"
//                   >
//                     Open credential URL
//                   </a>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 p-4 sm:p-8">
//                   {selectedCertification.photos.map((photo) => (
//                     <div
//                       key={photo}
//                       className="relative h-48 w-full overflow-hidden rounded-3xl shadow-xl shadow-black/20"
//                     >
//                       <Image
//                         src={photo}
//                         alt={selectedCertification.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default CertificationShowcase;

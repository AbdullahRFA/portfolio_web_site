"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Guestbook = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllEntries, setShowAllEntries] = useState(false);

  const entriesPreviewLimit = 4;
  const characterLimit = 150;

  const loadEntries = async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEntries(data);
  };

  useEffect(() => { loadEntries(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    await supabase.from("guestbook").insert([{ 
      name: formData.name, 
      message: formData.message, 
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      date: new Date().toLocaleDateString(),
      is_owner: false 
    }]);

    setFormData({ name: "", message: "" });
    loadEntries();
    setIsSubmitting(false);
  };

  const visibleEntries = showAllEntries ? entries : entries.slice(0, entriesPreviewLimit);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const entryVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 17 } },
  };

  return (
    <section id="guestbook" className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible">
      <div className="absolute bottom-1/4 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.02] blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          {/* <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">05 . Public Logbook</span> */}
          <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">Developer Guestbook</h2>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">An open space for peers, collaborators, and visitors to leave a stamp, share feedback, or simply say hello. Drop a message to commemorate your visit to my digital workspace.</p>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="relative mb-10 p-6 rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-500" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your Name"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 focus:border-cyan-500 outline-none transition-all"
            />
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Leave a message..."
              maxLength={characterLimit}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 focus:border-cyan-500 outline-none transition-all resize-none"
            />
            
            <div className="flex items-center justify-between pt-2">
               <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className="stroke-zinc-800 fill-none" strokeWidth="2"/><circle cx="12" cy="12" r="10" className="stroke-cyan-400 fill-none" strokeWidth="2" strokeDasharray={63} strokeDashoffset={63 * (1 - formData.message.length / characterLimit)} /></svg>
                  {characterLimit - formData.message.length} chars left
               </div>
               <button 
                disabled={isSubmitting}
                type="submit" 
                className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                {isSubmitting ? "Transmitting..." : "Sign Log Wall"}
              </button>
            </div>
          </form>
        </div>

        {/* --- LOG WALL --- */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-4">
          <AnimatePresence mode="popLayout">
            {visibleEntries.map((entry) => (
              <motion.div
                key={entry.id}
                variants={entryVariants}
                layout
                whileHover={{ y: -3, scale: 1.005 }}
                className={`flex gap-4 p-5 rounded-2xl border transition-all duration-300 ${entry.is_owner ? 'border-fuchsia-500/30 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-700'}`}
              >
                <img src={entry.avatar} className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 shrink-0" alt="avatar" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-bold ${entry.is_owner ? 'text-fuchsia-400' : 'text-zinc-200'}`}>{entry.name}</span>
                    <span className="text-[10px] text-zinc-500 font-bold tabular-nums">{entry.date}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{entry.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length > entriesPreviewLimit && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAllEntries(!showAllEntries)}
                className="px-6 py-2 rounded-full border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:bg-cyan-500/10 transition-all uppercase tracking-widest"
              >
                {showAllEntries ? "See Less" : "See More Entries"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Guestbook;







// "use client"; // Required since we manage state strings, submission clicks, and session toggles running in-browser

// import { AnimatePresence, motion, Variants } from "framer-motion";
// import React, { useState } from "react";
// import { mockGuestbookEntries } from "../lib/guestbookData";

// const Guestbook = () => {
//   // Mock Auth State for early UI design. Change to true to preview signed-in layout!
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [entries, setEntries] = useState(mockGuestbookEntries);
//   const [newMessage, setNewMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showAllEntries, setShowAllEntries] = useState(false);

//   const entriesPreviewLimit = 4;
//   const visibleEntries = showAllEntries
//     ? entries
//     : entries.slice(0, entriesPreviewLimit);

//   const characterLimit = 150;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     setIsSubmitting(true);

//     // Simulate an API network delay roundtrip
//     setTimeout(() => {
//       const entry = {
//         id: `gb-${Date.now()}`,
//         name: "Guest Developer",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
//         message: newMessage.trim(),
//         date: "Today",
//         isOwner: false,
//       };

//       setEntries([entry, ...entries]);
//       setNewMessage("");
//       setIsSubmitting(false);
//     }, 800);
//   };

//   // Framer Motion entry tracking orchestration
//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.08 },
//     },
//   };

//   const entryVariants: Variants = {
//     hidden: { opacity: 0, y: 20, scale: 0.98 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: "spring", stiffness: 120, damping: 17 },
//     },
//   };

//   return (
//     <section
//       id="guestbook"
//       className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible"
//     >
//       {/* Background ambient decorative laser glow orbs */}
//       <div className="absolute bottom-1/4 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/[0.02] blur-3xl pointer-events-none" />
//       <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.02] blur-3xl pointer-events-none animate-pulse" />

//       <div className="max-w-4xl">
//         <div className="mb-10">
//           <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
//             05 . Public Logbook
//           </span>
//           <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
//             Developer Guestbook
//           </h2>
//           <p className="text-zinc-400 text-sm mt-2 leading-relaxed max-w-xl">
//             Leave a permanent token of your visit. Sign in securely via GitHub
//             to post public feedback, career opportunities, or technical notes.
//           </p>
//         </div>

//         {/* --- TOP INTERACTION LAYER (FORM VS SIGN-IN PROMPT) --- */}
//         <div className="relative mb-10 p-6 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl overflow-hidden group">
//           {/* Top border ambient color bar overlay */}
//           <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-500" />

//           {!isAuthenticated ? (
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-2">
//               <div>
//                 <h3 className="text-sm font-bold text-zinc-200 tracking-tight">
//                   Join the discussion wall
//                 </h3>
//                 <p className="text-xs text-zinc-500 mt-0.5">
//                   Authenticate via GitHub OAuth parameters to safely sign my
//                   developer log.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsAuthenticated(true)} // Mock sign-in toggle for sandbox testing
//                 className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all border border-zinc-700/60 hover:border-cyan-500/40 shadow-sm shrink-0 group hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] duration-300"
//               >
//                 <svg
//                   className="w-4 h-4 transform group-hover:scale-105 transition-transform text-zinc-200 group-hover:text-cyan-400"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                   />
//                 </svg>
//                 Sign in with GitHub
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex items-start gap-4">
//                 <img
//                   src="https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
//                   alt="Your Profile Canvas"
//                   className="w-10 h-10 rounded-full bg-zinc-950 object-cover border border-zinc-800"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <textarea
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type a friendly comment, career note, or question..."
//                     maxLength={characterLimit}
//                     rows={3}
//                     className="w-full bg-transparent border-none text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none resize-none p-0.5 leading-relaxed font-normal"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
//                 {/* Visual Character Progress Circle Guard System */}
//                 <div className="flex items-center gap-2">
//                   <div className="relative h-4 w-4">
//                     <svg className="w-full h-full transform -rotate-90">
//                       <circle
//                         cx="8"
//                         cy="8"
//                         r="6"
//                         className="stroke-zinc-800 fill-none"
//                         strokeWidth="1.5"
//                       />
//                       <circle
//                         cx="8"
//                         cy="8"
//                         r="6"
//                         className={`fill-none transition-all duration-300 ${
//                           newMessage.length >= characterLimit - 20
//                             ? "stroke-amber-500"
//                             : "stroke-cyan-400"
//                         }`}
//                         strokeWidth="1.5"
//                         strokeDasharray={`${2 * Math.PI * 6}`}
//                         strokeDashoffset={`${2 * Math.PI * 6 * (1 - newMessage.length / characterLimit)}`}
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] text-zinc-500 font-bold tracking-tight">
//                     {characterLimit - newMessage.length} characters left
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsAuthenticated(false)}
//                     className="px-3 py-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || !newMessage.trim()}
//                     className="px-5 py-2 text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
//                   >
//                     {isSubmitting ? "Transmitting..." : "Sign Log Wall"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* --- BOTTOM STREAM LAYER (THE LOG WALL) --- */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-40px" }}
//           layout
//           className="space-y-4"
//         >
//           <AnimatePresence mode="popLayout">
//             {visibleEntries.map((entry) => {
//               // Route your replies cleanly to your public portrait file path asset
//               const avatarSrc = entry.isOwner
//                 ? "/profile_picture/profile_pic_2.jpg"
//                 : entry.avatar;

//               return (
//                 <motion.div
//                   key={entry.id}
//                   variants={entryVariants}
//                   layout
//                   whileHover={{
//                     y: -3,
//                     scale: 1.005,
//                     transition: { duration: 0.2 },
//                   }}
//                   className={`flex gap-4 p-5 rounded-2xl border bg-gradient-to-b from-zinc-900 to-zinc-950 transition-all duration-300 ${
//                     entry.isOwner
//                       ? "border-fuchsia-500/20 shadow-[0_0_25px_rgba(232,121,249,0.04)]"
//                       : "border-zinc-800 hover:border-zinc-700/80 shadow-xl"
//                   }`}
//                 >
//                   <img
//                     src={avatarSrc}
//                     alt={`${entry.name} portrait`}
//                     className={`w-10 h-10 rounded-full bg-zinc-950 object-cover shrink-0 border border-zinc-800 ${
//                       entry.isOwner
//                         ? "ring-2 ring-fuchsia-500/30 border-fuchsia-500/40 shadow-[0_0_10px_rgba(232,121,249,0.2)]"
//                         : ""
//                     }`}
//                   />
//                   <div className="space-y-1.5 flex-1 min-w-0">
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`text-sm font-bold tracking-tight truncate ${entry.isOwner ? "text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.2)]" : "text-zinc-200"}`}
//                       >
//                         {entry.name}
//                       </span>
//                       {entry.isOwner && (
//                         <span className="text-[8px] font-black uppercase tracking-widest bg-zinc-950 text-fuchsia-400 px-2 py-0.5 rounded border border-fuchsia-500/20 shadow-inner">
//                           Author
//                         </span>
//                       )}
//                       <span className="text-[10px] text-zinc-500 font-bold ml-auto tabular-nums shrink-0">
//                         {entry.date}
//                       </span>
//                     </div>
//                     <p className="text-sm text-zinc-400 leading-relaxed break-words font-normal">
//                       {entry.message}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>

//           {entries.length > entriesPreviewLimit && (
//             <div className="mt-6 flex justify-center">
//               <button
//                 type="button"
//                 onClick={() => setShowAllEntries((prev) => !prev)}
//                 className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-zinc-900/90 px-6 py-3 text-xs font-black uppercase tracking-[0.32em] text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-100 shadow-lg shadow-cyan-500/10"
//               >
//                 {showAllEntries ? "See Less Entries" : "See More Entries"}
//                 <span
//                   className={`inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-800 transition-transform duration-300 ${
//                     showAllEntries ? "rotate-180" : "rotate-0"
//                   }`}
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2.5}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M6 9l6 6 6-6" />
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Guestbook;

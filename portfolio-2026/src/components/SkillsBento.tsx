"use client";

import { motion } from "framer-motion";

const SkillsBento = () => {
  const skillCategories = [
    {
      title: "Languages",
      description:
        "Compiled and scripting languages that power fast, cross-platform apps.",
      icon: "https://img.icons8.com/fluency/48/code.png",
      skills: [
        { name: "C/C++", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Java", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "JavaScript", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "Dart", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
        { name: "SQL", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      ],
    },
    {
      title: "Frameworks & UI",
      description:
        "Modern UI, backend, and full-stack architecture I use for polished products.",
      icon: "https://img.icons8.com/fluency/48/source-code.png",
      skills: [
        { name: "Next.js", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "React", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Tailwind", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Django", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
        { name: "Flask", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
        { name: "Bootstrap", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      ],
    },
    {
      title: "AI & Machine Learning",
      description:
        "Model training, computer vision benchmarking, and intelligent predictive systems.",
      icon: "https://img.icons8.com/fluency/48/artificial-intelligence.png",
      skills: [
        { name: "TensorFlow", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
        { name: "CNNs / MobileNet", level: "Advanced", icon: "https://img.icons8.com/color/48/neural-network.png" },
        { name: "NumPy", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
        { name: "Pandas", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
        { name: "OpenCV", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
        { name: "LLMs", level: "Learning", icon: "https://img.icons8.com/fluency/48/chatgpt.png" },
      ],
    },
    {
      title: "Quality Assurance (SQA)",
      description:
        "End-to-end automated testing, API validation, and manual verification protocols.",
      icon: "https://img.icons8.com/fluency/48/test-tube.png",
      skills: [
        { name: "Playwright", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg" },
        { name: "Selenium", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg" },
        { name: "Postman", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
        { name: "Jest", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" },
        { name: "Manual Testing", level: "Strong", icon: "https://img.icons8.com/color/48/inspection.png" },
      ],
    },
    {
      title: "App Development",
      description:
        "Mobile-first and cross-platform experiences built with a single codebase.",
      icon: "https://img.icons8.com/fluency/48/flutter.png",
      skills: [
        { name: "Flutter", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
        { name: "Firebase Auth", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" }
      ],
    },
    {
      title: "Platforms & Tools",
      description:
        "Dev tools, IDEs, IoT stacks, and deployment systems I depend on.",
      icon: "https://img.icons8.com/fluency/48/toolbox.png",
      skills: [
        { name: "Git & GitHub", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
        { name: "Docker", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Linux", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Arduino", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
        { name: "ESP32 & IoT", level: "Proficient", icon: "https://img.icons8.com/color/48/microcontroller.png" },
        { name: "Overleaf", level: "Proficient", icon: "https://img.icons8.com/color/48/overleaf.png" },
      ],
    },
    {
      title: "Databases",
      description:
        "Relational and NoSQL data engines I design, query, and optimize.",
      icon: "https://img.icons8.com/fluency/48/database.png",
      skills: [
        { name: "MySQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Supabase", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
        { name: "Firebase", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
      ],
    },
    {
      title: "Soft Skills",
      description:
        "Human-first strengths that complement my technical engineering work.",
      icon: "https://img.icons8.com/fluency/48/handshake.png",
      skills: [
        { name: "Leadership", level: "Strong", icon: "https://img.icons8.com/fluency/48/management.png" },
        { name: "Adaptability", level: "Strong", icon: "https://img.icons8.com/fluency/48/flexibility.png" },
        { name: "Critical Thinking", level: "Strong", icon: "https://img.icons8.com/fluency/48/brainstorm-skill.png" },
        { name: "Teamwork", level: "Strong", icon: "https://img.icons8.com/fluency/48/collaboration.png" },
        { name: "Time Management", level: "Strong", icon: "https://img.icons8.com/fluency/48/time-machine.png" },
      ],
    },
  ];

  return (
    <section className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible">
      {/* Background Cyberpunk Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none animate-pulse" />

      <div className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.3)]">
          03 . Technical Capability
        </span>
        <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">
          Technical Toolkit
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
          A modular look at the compilation languages, multi-tier frameworks,
          and verification testing tools I interact with daily.
        </p>
      </div>

      {/* Replaced Grid with CSS Masonry Columns to tightly pack variable-height cards */}
      <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            // Individual robust animation to bypass Stagger height calculation bugs
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: (index % 3) * 0.15, // Staggers neatly by column
              type: "spring", 
              stiffness: 100, 
              damping: 16 
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0 24px 70px rgba(232, 121, 249, 0.14)",
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.99 }}
            // break-inside-avoid is crucial to stop cards from splitting across columns
            className="p-6 rounded-3xl border border-zinc-800 backdrop-blur-md flex flex-col transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(232,121,249,0.08)] hover:border-fuchsia-500/20 group overflow-hidden relative break-inside-avoid"
          >
            {/* Subtle Hover Spotlight */}
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-fuchsia-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon and Header */}
            <div className="relative z-10 flex items-start gap-3">
              <img
                src={category.icon}
                alt={`${category.title} icon`}
                className="h-12 w-12 rounded-2xl bg-zinc-950 p-2 shadow-inner"
              />
              <div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 tracking-tight">
                  {category.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-1 font-normal">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Bottom Badges Sub-Grid Wrap Area */}
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-zinc-800/50 group-hover:border-fuchsia-500/20 transition-colors duration-300">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-zinc-950/90 pl-2 pr-3 py-1.5 rounded-xl border border-zinc-800/80 flex items-center gap-2.5 shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300 z-10"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 shrink-0">
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="w-3.5 h-3.5 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors duration-200 leading-none">
                      {skill.name}
                    </span>
                    <span className="text-[8px] text-zinc-500 font-black uppercase tracking-wider mt-1 leading-none">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsBento;


// "use client";

// import { motion, Variants } from "framer-motion";

// // Helper to group flat database skills into your Bento categories
// const groupSkillsByCategory = (skills: any[]) => {
//   const categories = {
//     "Languages": { description: "Compiled and scripting languages.", icon: "https://img.icons8.com/fluency/48/code.png", list: [] as any[] },
//     "Frameworks": { description: "Modern UI, backend, and full-stack libraries.", icon: "https://img.icons8.com/fluency/48/source-code.png", list: [] as any[] },
//     "App Development": { description: "Mobile-first and cross-platform experiences.", icon: "https://img.icons8.com/fluency/48/flutter.png", list: [] as any[] },
//     "Platforms & Tools": { description: "Dev tools, IDEs, and deployment systems.", icon: "https://img.icons8.com/fluency/48/toolbox.png", list: [] as any[] },
//     "Soft Skills": { description: "Human-first strengths.", icon: "https://img.icons8.com/fluency/48/handshake.png", list: [] as any[] },
//     "Database": { description: "Relational data engines.", icon: "https://img.icons8.com/fluency/48/database.png", list: [] as any[] },
//   };

//   skills.forEach((skill) => {
//     if (categories[skill.category as keyof typeof categories]) {
//       categories[skill.category as keyof typeof categories].list.push({ 
//         name: skill.name, 
//         level: skill.level 
//       });
//     }
//   });

//   return Object.entries(categories).map(([title, data]) => ({
//     title,
//     description: data.description,
//     icon: data.icon,
//     skills: data.list
//   }));
// };

// const SkillsBento = ({ skills }: { skills: any[] }) => {
//   const bentoGridVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
//   };

//   const cardVariants: Variants = {
//     hidden: (direction = 1) => ({ opacity: 0, y: 30, x: direction * 20, scale: 0.97 }),
//     visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 16 } },
//   };

//   const textVariants: Variants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
//   };

//   const categorizedSkills = groupSkillsByCategory(skills);

//   return (
//     <section className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible">
//       <div className="absolute top-1/2 left-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/3 blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none animate-pulse" />

//       <div className="mb-12">
//         <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">03 . Technical Capability</span>
//         <h2 className="text-4xl font-black tracking-tight mt-1 text-zinc-50">Technical Toolkit</h2>
//         <p className="text-zinc-400 max-w-xl text-sm mt-2 leading-relaxed">
//           A modular look at the languages and frameworks I interact with daily.
//         </p>
//       </div>

//       <motion.div
//         variants={bentoGridVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-60px" }}
//         className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-[220px]"
//       >
//         {categorizedSkills.map((category, index) => (
//           <motion.div
//             key={category.title}
//             variants={cardVariants}
//             custom={index % 2 === 0 ? -1 : 1}
//             whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
//             className="p-6 rounded-3xl border border-zinc-800 backdrop-blur-md flex flex-col justify-between shadow-xl hover:border-fuchsia-500/20 group overflow-hidden relative"
//           >
//             <div className="relative z-10 flex items-start gap-3">
//               <img src={category.icon} alt={category.title} className="h-12 w-12 rounded-2xl bg-zinc-950 p-2" />
//               <div>
//                 <h3 className="text-lg font-bold text-zinc-100">{category.title}</h3>
//                 <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-1">{category.description}</p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-zinc-800/60">
//               {category.skills.map((skill: any) => (
//                 <div key={skill.name} className="bg-zinc-950/90 px-3 py-1.5 rounded-xl border border-zinc-800/80">
//                   <span className="text-xs font-bold text-zinc-200">{skill.name}</span>
//                   <span className="text-[8px] text-zinc-500 font-black uppercase tracking-wider block">{skill.level}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// export default SkillsBento;
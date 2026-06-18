"use client"; // Required since we manage viewport-triggered animation sequences running in-browser[cite: 1]

import { motion, Variants } from "framer-motion";

const SkillsBento = () => {
  // Stagger cascading presentation layout orchestrations[cite: 1]
  const bentoGridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }, //[cite: 1]
    },
  };

  // Subtle spring-based card loading motion properties[cite: 1]
  const cardVariants: Variants = {
    hidden: (direction = 1) => ({
      opacity: 0,
      y: 30,
      x: direction * 20,
      scale: 0.97,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const skillCategories = [
    {
      title: "Languages",
      description:
        "Compiled and scripting languages that power fast, cross-platform apps.",
      icon: "https://img.icons8.com/fluency/48/code.png",
      skills: [
        { name: "C/C++", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "Java", level: "Proficient" },
        { name: "JavaScript", level: "Advanced" },
        { name: "Dart", level: "Proficient" },
        { name: "SQL", level: "Proficient" },
      ],
    },
    {
      title: "Frameworks",
      description:
        "Modern UI, backend, and full-stack libraries I use for polished products.",
      icon: "https://img.icons8.com/fluency/48/source-code.png",
      skills: [
        { name: "CSS", level: "Advanced" },
        { name: "Tailwind", level: "Advanced" },
        { name: "Bootstrap", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "Redux", level: "Proficient" },
        { name: "Flask", level: "Proficient" },
        { name: "Django", level: "Proficient" },
      ],
    },
    {
      title: "App Development",
      description:
        "Mobile-first and cross-platform experiences built with a single codebase.",
      icon: "https://img.icons8.com/fluency/48/flutter.png",
      skills: [{ name: "Flutter", level: "Proficient" }],
    },
    {
      title: "Platforms & Tools",
      description:
        "Dev tools, IDEs, device stacks, and deployment systems I depend on.",
      icon: "https://img.icons8.com/fluency/48/toolbox.png",
      skills: [
        { name: "Git", level: "Advanced" },
        { name: "GitHub", level: "Advanced" },
        { name: "Overleaf", level: "Proficient" },
        { name: "NetBeans", level: "Proficient" },
        { name: "Blynk", level: "Proficient" },
        { name: "VS Code", level: "Advanced" },
        { name: "Linux", level: "Proficient" },
        { name: "XAMPP", level: "Proficient" },
        { name: "Arduino", level: "Proficient" },
        { name: "ESP32", level: "Proficient" },
        { name: "Docker", level: "Proficient" },
      ],
    },
    {
      title: "Soft Skills",
      description:
        "Human-first strengths that complement my technical engineering work.",
      icon: "https://img.icons8.com/fluency/48/handshake.png",
      skills: [
        { name: "Adaptability", level: "Strong" },
        { name: "Critical Thinking", level: "Strong" },
        { name: "Teamwork", level: "Strong" },
        { name: "Time Management", level: "Strong" },
      ],
    },
    {
      title: "Database",
      description:
        "Relational data engines I design, query, and optimize for production.",
      icon: "https://img.icons8.com/fluency/48/database.png",
      skills: [
        { name: "MySQL", level: "Proficient" },
        { name: "PostgreSQL", level: "Proficient" },
      ],
    },
  ];

  return (
    <section
      className="relative py-20 border-t border-zinc-900 scroll-mt-20 overflow-visible"
    >
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

      {/* Dynamic Grid Mapping Parent Element Container[cite: 1] */}
      <motion.div
        variants={bentoGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }} //[cite: 1]
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-[220px]"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={cardVariants}
            custom={index % 2 === 0 ? -1 : 1}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0 24px 70px rgba(232, 121, 249, 0.14)",
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.99 }}
            className="p-6 rounded-3xl border border-zinc-800 backdrop-blur-md flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(232,121,249,0.08)] hover:border-fuchsia-500/20 group overflow-hidden relative"
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
                <motion.h3
                  variants={textVariants}
                  className="text-lg font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 tracking-tight"
                >
                  {category.title}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-1 font-normal"
                >
                  {category.description}
                </motion.p>
              </div>
            </div>

            {/* Bottom Badges Sub-Grid Wrap Area[cite: 1] */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-zinc-800/60 group-hover:border-fuchsia-500/10 transition-colors duration-300">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-zinc-950/90 px-3 py-1.5 rounded-xl border border-zinc-800/80 flex flex-col items-start shadow-inner group-hover:border-cyan-500/10 transition-colors duration-200"
                >
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors duration-200 leading-none">
                    {skill.name}
                  </span>
                  <span className="text-[8px] text-zinc-500 font-black uppercase tracking-wider mt-1.5 leading-none">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsBento;

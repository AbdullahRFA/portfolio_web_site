// src/lib/skillsData.ts
import { SkillCategory } from '../types/skills';

export const skillsData: SkillCategory[] = [
  {
    title: "Web Architecture",
    description: "Building secure full-stack applications, scalable backend nodes, and responsive view layouts.",
    gridClass: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/10 dark:to-indigo-950/10 border-blue-100 dark:border-blue-900/30",
    skills: [
      { name: "React / Next.js", level: "Advanced" },
      { name: "TypeScript / JS", level: "Advanced" },
      { name: "Django / Flask", level: "Intermediate" },
      { name: "Tailwind / Bootstrap", level: "Advanced" }
    ]
  },
  {
    title: "AI/ML & IoT Systems",
    description: "Developing intelligent models and physical sensor computing arrays via EDGE frameworks.",
    gridClass: "md:col-span-2 bg-gradient-to-br from-purple-50/50 to-indigo-50/30 dark:from-purple-950/10 dark:to-indigo-950/10 border-purple-100 dark:border-purple-900/30",
    skills: [
      { name: "Explainable AI (XAI)", level: "Learner" },
      { name: "LangChain / VectorDB", level: "Practical" },
      { name: "Scikit-Learn / TF", level: "Intermediate" },
      { name: "ESP32 / NodeMCU", level: "Hardware" }
    ]
  },
  {
    title: "Mobile App & QA",
    description: "Cross-platform mobile application engineering and manual/automated quality testing.",
    gridClass: "md:col-span-2 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/10 border-emerald-100 dark:border-emerald-900/30",
    skills: [
      { name: "Flutter", level: "Developer" },
      { name: "Automation Testing", level: "Automation" },
      { name: "Manual Testing", level: "Manual SQA" },
      { name: "Statistics", level: "Core Tool" }
    ]
  },
  {
    title: "Core Engineering",
    description: "Foundational software languages and data structure execution mapping.",
    gridClass: "md:col-span-1 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-100 dark:border-amber-900/30",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "Java / C++", level: "Intermediate" }
    ]
  },
  {
    title: "Databases & Tools",
    description: "Version storage workflows and query management structures.",
    gridClass: "md:col-span-1 bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900/40 dark:to-zinc-950/20 border-zinc-200 dark:border-zinc-800/60",
    skills: [
      { name: "MySQL", level: "Relational" },
      { name: "MongoDB", level: "Document" },
      { name: "Git / GitHub", level: "Fluent" }
    ]
  }
];
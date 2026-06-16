import { SkillCategory } from '../types/skills';

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Crafting highly responsive, accessible, and fast user interfaces.",
    gridClass: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900/30",
    skills: [
      { name: "React / Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "HTML5 / CSS3", level: "Advanced" }
    ]
  },
  {
    title: "Backend & Systems",
    description: "Building resilient microservices and relational/document APIs.",
    gridClass: "md:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-100 dark:border-emerald-900/30",
    skills: [
      { name: "Node.js / Express", level: "Intermediate" },
      { name: "MongoDB / Mongoose", level: "Intermediate" },
      { name: "REST APIs", level: "Advanced" }
    ]
  },
  {
    title: "DevOps & Tools",
    description: "Version control and deployment workflows.",
    gridClass: "md:col-span-1 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20 border-purple-100 dark:border-purple-900/30",
    skills: [
      { name: "Git / GitHub", level: "Advanced" },
      { name: "Vercel / Docker", level: "Intermediate" }
    ]
  },
  {
    title: "Core Fundamentals",
    description: "CS architecture knowledge.",
    gridClass: "md:col-span-1 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-100 dark:border-amber-900/30",
    skills: [
      { name: "Data Structures", level: "Academic" },
      { name: "OOP Principles", level: "Intermediate" }
    ]
  }
];
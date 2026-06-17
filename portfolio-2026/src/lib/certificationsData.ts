export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  platform: string;
  summary: string;
  link: string;
  tags: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Modern Web Portfolio Design",
    issuer: "LinkedIn Learning",
    date: "Jun 2025",
    platform: "LinkedIn",
    summary:
      "Designed and deployed an interactive portfolio experience with responsive layouts, motion-driven states, and accessible UI components.",
    link: "https://www.linkedin.com/in/abdullahrfa/",
    tags: ["Responsive UI", "Accessibility", "Motion", "Portfolio"],
  },
  {
    id: "cert-2",
    title: "HTML5, CSS3 & Advanced Styling",
    issuer: "LinkedIn Learning",
    date: "Mar 2025",
    platform: "LinkedIn",
    summary:
      "Mastered modern markup and styling workflows, including grid-based layouts, custom animations, and reusable design systems.",
    link: "https://www.linkedin.com/in/abdullahrfa/",
    tags: ["HTML5", "CSS3", "Responsive Design", "Visual UX"],
  },
  {
    id: "cert-3",
    title: "Python for Data Science",
    issuer: "Coursera",
    date: "Jan 2025",
    platform: "Coursera",
    summary:
      "Built data-driven solutions and analytics pipelines using Python libraries while preserving clean code and reproducibility.",
    link: "https://www.linkedin.com/in/abdullahrfa/",
    tags: ["Python", "Data Analysis", "Pandas", "Jupyter"],
  },
];

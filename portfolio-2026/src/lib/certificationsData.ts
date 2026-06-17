export interface CertificationItem {
  id: string;
  title: string;
  description: string;
  issuer: string;
  issueDate: string;
  expireDate: string;
  credentialId?: string;
  credentialUrl: string;
  photos: string[];
  platform: string;
  tags: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Modern Web Portfolio Design",
    description:
      "Completed a hands-on portfolio design course with responsive web UI, motion, and accessibility best practices.",
    issuer: "LinkedIn Learning",
    issueDate: "Jun 2025",
    expireDate: "No expiration",
    credentialId: undefined,
    credentialUrl: "https://www.linkedin.com/in/abdullahrfa/",
    platform: "LinkedIn",
    photos: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Responsive UI", "Accessibility", "Motion", "Portfolio"],
  },
  {
    id: "cert-2",
    title: "HTML5, CSS3 & Advanced Styling",
    description:
      "Achieved certification in modern web markup and styling, including advanced layout techniques and reusable visual systems.",
    issuer: "LinkedIn Learning",
    issueDate: "Mar 2025",
    expireDate: "No expiration",
    credentialId: undefined,
    credentialUrl: "https://www.linkedin.com/in/abdullahrfa/",
    platform: "LinkedIn",
    photos: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["HTML5", "CSS3", "Responsive Design", "Visual UX"],
  },
  {
    id: "cert-3",
    title: "Python for Data Science",
    description:
      "Completed a data science certification covering Python analytics, data pipelines, and reproducible code practices.",
    issuer: "Coursera",
    issueDate: "Jan 2025",
    expireDate: "No expiration",
    credentialId: undefined,
    credentialUrl: "https://www.linkedin.com/in/abdullahrfa/",
    platform: "Coursera",
    photos: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de6f9a1?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Python", "Data Analysis", "Pandas", "Jupyter"],
  },
];

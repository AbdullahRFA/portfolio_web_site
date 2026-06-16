export interface IProjectCaseStudy {
  id: string;
  title: string;
  description: string;
  longDescription: string; // Used for the case study modal view
  techStack: string[];
  category: 'Frontend' | 'Backend' | 'Full-Stack'; // Filter target
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}
import { IProjectCaseStudy } from '../types/project';

export const mockProjects: IProjectCaseStudy[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Microservices Platform',
    description: 'A high-performance online retail engine processing multi-tenant requests gracefully.',
    longDescription: 'This project addresses a distributed systems challenge. Built using Node.js, Express, and MongoDB, it implements isolated database collections per service, JWT-based cross-service authorization, and Redis caching. It handles up to 2,000 concurrent requests per second.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
    category: 'Backend',
    githubUrl: 'https://github.com/yourusername/ecommerce-backend',
    liveUrl: '#',
    image: '/projects/ecommerce.png'
  },
  {
    id: 'proj-2',
    title: 'AI-Powered Documentation Assistant',
    description: 'An interactive developer documentation engine featuring semantic search capabilities.',
    longDescription: 'Leveraging Next.js App Router and TypeScript, this application provides markdown documentation rendering via MDX. It features dark/light mode optimization, keyboard navigation shortcuts, and integrates a vector embed pipeline for context-aware developer assistance.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'VectorDB'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/yourusername/ai-docs',
    liveUrl: '#',
    image: '/projects/aidocs.png'
  },
  {
    id: 'proj-3',
    title: 'Cryptocurrency Analytics Dashboard',
    description: 'Real-time financial layout visualizing active market metrics and trend predictions.',
    longDescription: 'A pure frontend engineering showcase focusing on high-frequency UI updates. Utilizes React Server Components combined with local client states to parse intensive WebSockets data feeds. Built using Tailwind CSS and lightweight plotting primitives for 60fps chart renders.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Recharts'],
    category: 'Frontend',
    githubUrl: 'https://github.com/yourusername/crypto-dash',
    liveUrl: '#',
    image: '/projects/crypto.png'
  }
];
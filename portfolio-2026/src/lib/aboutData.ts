import { TimelineItem } from '../types/about';

export const experienceData: TimelineItem[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    period: '2025 - Present',
    description: [
      'Developed and maintained production web apps using Next.js and TypeScript.',
      'Optimized database queries in MongoDB, reducing server response times by 15%.',
      'Collaborated closely with senior engineers to implement UI enhancements using Tailwind CSS.'
    ],
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS']
  },
  {
    id: 'exp-2',
    role: 'Frontend QA Assistant',
    company: 'Pixel Perfect Agency',
    location: 'Hybrid',
    period: '2024 - 2025',
    description: [
      'Tested application UI components against WCAG accessibility standards.',
      'Identified and resolved responsiveness issues across mobile and tablet layouts.'
    ],
    tags: ['HTML/CSS', 'JavaScript', 'Accessibility (A11y)']
  }
];
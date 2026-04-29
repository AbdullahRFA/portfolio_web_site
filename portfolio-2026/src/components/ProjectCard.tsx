import React from 'react';

// Define what props the card expects based on our IProject interface
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
}

const ProjectCard = ({ title, description, techStack }: ProjectCardProps) => {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span 
            key={tech} 
            className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
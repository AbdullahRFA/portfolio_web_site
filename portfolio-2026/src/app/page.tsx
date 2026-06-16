import ProjectCard from "../components/ProjectCard";
import AboutSection from '../components/AboutSection'; 
import SkillsBento from '../components/SkillsBento'; 
import ContactForm from '../components/ContactForm'; 
import Hero from '../components/Hero'; // <-- Import the new Hero component

import ProjectShowcase from '../components/ProjectShowcase'; // <-- Import new component

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="max-w-6xl mx-auto px-6 pb-20 space-y-24">
      {/* 3.1 Refined Interactive Hero Section */}
      <Hero />

      {/* 3.5 Project Showcase Module with Layout Filtering & Modals */}
      <ProjectShowcase />

      {/* Projects Grid Anchor Target */}
      <section id="projects" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-10 text-zinc-900 dark:text-zinc-50 tracking-tight">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project: Project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
              />
            ))
          ) : (
            <p className="text-sm text-zinc-500">No projects found. Add some via Postman!</p>
          )}
        </div>
      </section>

      {/* Skills Bento Grid Anchor Target */}
      <div id="skills" className="scroll-mt-20">
        <SkillsBento />
      </div>

      {/* About Section Anchor Target */}
      <div id="about" className="scroll-mt-20">
        <AboutSection />
      </div> 

      {/* Contact Form Anchor Target */}
      <div id="contact" className="scroll-mt-20">
        <ContactForm />
      </div>
    </main>
  );
}
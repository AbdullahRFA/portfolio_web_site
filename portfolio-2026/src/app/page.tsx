import ProjectCard from "../components/ProjectCard";
import AboutSection from '../components/AboutSection'; 
import SkillsBento from '../components/SkillsBento'; 
import ContactForm from '../components/ContactForm'; 

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
    <main className="max-w-6xl mx-auto px-6 py-20 space-y-24">
      {/* Hero Section */}
      <section className="pt-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Software <span className="text-blue-600">Engineer</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Building scalable full-stack applications with the MERN stack and
          Next.js. Check out my latest work below.
        </p>
      </section>

      {/* Projects Grid Anchor Target */}
      <section id="projects" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-10">Featured Projects</h2>
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
            <p>No projects found. Add some via Postman!</p>
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
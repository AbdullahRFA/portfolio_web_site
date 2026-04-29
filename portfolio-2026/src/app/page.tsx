import ProjectCard from "../components/ProjectCard";

// This function runs on the server
async function getProjects() {
  // We call our own API endpoint
  // Use absolute URL for server-side fetching in Next.js
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects`,
    {
      cache: "no-store", // Ensures we get fresh data every time
    },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Software <span className="text-blue-600">Engineer</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Building scalable full-stack applications with the MERN stack and
          Next.js. Check out my latest work below.
        </p>
      </section>

      {/* Projects Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-10">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project: any) => (
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
    </main>
  );
}

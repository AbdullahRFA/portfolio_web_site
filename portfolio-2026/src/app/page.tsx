import AboutSection from "../components/AboutSection";
import BlogShowcase from "../components/BlogShowcase";
import CertificationShowcase from "../components/CertificationShowcase";
import ContactForm from "../components/ContactForm";
import Guestbook from "../components/Guestbook";
import Hero from "../components/Hero";
import ProjectShowcase from "../components/ProjectShowcase";
import SkillsBento from "../components/SkillsBento";
import Link from "next/link";

import { supabase } from "../lib/supabase";


export default async function Home() {
  // Fetch all your public data in parallel directly from Supabase
  const [
    { data: projects },
    { data: blogs },
    { data: skills },
    { data: certs }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('blogs').select('*').order('created_at', { ascending: false }),
    supabase.from('skills').select('*').order('created_at', { ascending: true }),
    supabase.from('certifications').select('*').order('created_at', { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* <Navbar /> */}
      
      <main className="max-w-6xl mx-auto px-6 pb-20 space-y-2">
        
        <div id="home" className="scroll-mt-24">
          <Hero />
        </div>

        <div id="about" className="scroll-mt-20">
          <AboutSection />
        </div>

        {/* Passing live Supabase data to components */}
        <ProjectShowcase projects={projects || []} />

        <div id="skills" className="scroll-mt-20">
          <SkillsBento skills={skills || []} />
        </div>

        <div id="certifications" className="scroll-mt-20">
          <CertificationShowcase certifications={certs || []} />
        </div>

        <div id="blog" className="scroll-mt-20">
          <BlogShowcase blogs={blogs || []} />
        </div>

        <div id="guestbook" className="scroll-mt-20">
          {/* Guestbook will be handled differently because it needs a form submission */}
          <Guestbook />
        </div>

        <div id="contact" className="scroll-mt-20">
          <ContactForm />
        </div>

        {/* Footer with Secret Admin Link */}
        <footer className="w-full py-10 text-center text-sm text-zinc-600 mt-20 border-t border-zinc-900/50">
          <p>
            © {new Date().getFullYear()} Abdullah Nazmus-Sakib. All rights reserved
            <Link 
              href="/admin/login" 
              className="cursor-default text-zinc-600 hover:text-zinc-600 outline-none"
              tabIndex={-1}
            >
              .
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}

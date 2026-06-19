// src/app/page.tsx
import { supabase } from "../lib/supabase";
import AboutSection from "../components/AboutSection";
import BlogShowcase from "../components/BlogShowcase";
import CertificationShowcase from "../components/CertificationShowcase";
import ContactForm from "../components/ContactForm";
import Guestbook from "../components/Guestbook";
import Hero from "../components/Hero";
import ProjectShowcase from "../components/ProjectShowcase";
import SkillsBento from "../components/SkillsBento";
import Link from "next/link";

// Force Next.js to bypass build-time caching and look up fresh data from Supabase on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Fetch all your public data in parallel directly from Supabase
  const [
    { data: projects },
    { data: blogs },
    { data: certs },
    { data: experiences },
    { data: education }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('blogs').select('*').order('created_at', { ascending: false }),
    supabase.from('certifications').select('*').order('created_at', { ascending: false }),
    supabase.from('experiences').select('*').order('created_at', { ascending: false }),
    supabase.from('education').select('*').order('created_at', { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      
      <main className="max-w-6xl mx-auto px-6 pb-20 space-y-2">
        
        <div id="home" className="scroll-mt-24">
          <Hero />
        </div>

        {/* Passing live Supabase data to AboutSection */}
        <div id="about" className="scroll-mt-20">
          <AboutSection 
            experiences={experiences || []} 
            education={education || []} 
          />
        </div>

        {/* Passing live Supabase data to other sections */}
        <ProjectShowcase projects={projects || []} />

        {/* FIXED: Removed the dynamic 'skills' prop passing since SkillsBento manages its own high-fidelity static metrics data internally */}
        <div id="skills" className="scroll-mt-20">
          <SkillsBento />
        </div>

        <div id="certifications" className="scroll-mt-20">
          <CertificationShowcase certifications={certs || []} />
        </div>

        <div id="blog" className="scroll-mt-20">
          <BlogShowcase blogs={blogs || []} />
        </div>

        <div id="guestbook" className="scroll-mt-20">
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
              className="cursor-default text-zinc-600 hover:text-zinc-600 outline-none select-none"
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
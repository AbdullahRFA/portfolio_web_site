import AboutSection from "../components/AboutSection";
import BlogShowcase from "../components/BlogShowcase";
import CertificationShowcase from "../components/CertificationShowcase";
import ContactForm from "../components/ContactForm";
import Guestbook from "../components/Guestbook";
import Hero from "../components/Hero";
import ProjectShowcase from "../components/ProjectShowcase";
import SkillsBento from "../components/SkillsBento";
import Link from "next/link";

export default async function Home() {
  return (
    // FIXED: Swapped space-y-24 to space-y-6 to prevent margin-stacking inflation between your components
    <main className="max-w-6xl mx-auto px-6 pb-20 space-y-2 ">
      {/* 3.1 Refined Interactive Hero Section */}
      <div id="home" className="scroll-mt-24">
        <Hero />
      </div>

      {/* 3.2 & 3.4 About Section / Experience Timeline Anchor Target */}
      <div id="about" className="scroll-mt-20">
        <AboutSection />
      </div>

      {/* 3.5 Project Showcase Module with Layout Filtering & Modals */}
      <ProjectShowcase />

      {/* 3.3 Skills Bento Grid Anchor Target */}
      <div id="skills" className="scroll-mt-20">
        <SkillsBento />
      </div>

      {/* 3.6 Certifications Showcase Anchor Target */}
      <div id="certifications" className="scroll-mt-20">
        <CertificationShowcase />
      </div>

      {/* 3.7 Blog Module Integration Element */}
      <div id="blog" className="scroll-mt-20">
        <BlogShowcase />
      </div>

      {/* 3.8 Guestbook Module Anchor Section */}
      <div id="guestbook" className="scroll-mt-20">
        <Guestbook />
      </div>

      {/* 3.7 Contact Form Anchor Target */}
      <div id="contact" className="scroll-mt-20">
        <ContactForm />
      </div>

      {/* Footer with Secret Admin Link */}
      <footer className="w-full py-10 text-center text-sm text-zinc-600 mt-20 border-t border-zinc-900/50">
        <p>
          © {new Date().getFullYear()} Abdullah Nazmus-Sakib. All rights reserved
          {/* SECRET ADMIN TRIGGER: 
            This period acts as a hidden link. 
            'cursor-default' prevents the mouse from changing to a pointer.
          */}
          <Link 
            href="/admin/login" 
            className="cursor-default text-zinc-600 hover:text-zinc-600 outline-none"
            tabIndex={-1} // Removes it from keyboard tab navigation so screen readers ignore it
          >
            .
          </Link>
        </p>
      </footer>


    </main>
  );
}

"use client"; // Required for click states, tab transitions, and list tracking running in-browser

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "../../actions/adminCrud";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const menu = [
    { name: "Home Page Config", path: "/admin" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Experiences", path: "/admin/experiences" },
    { name: "Manage Education", path: "/admin/education" }, // Added Education link
    { name: "Blogs", path: "/admin/blogs" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Certifications", path: "/admin/certifications" },
    { name: "Guestbook", path: "/admin/guestbook" },
    { name: "Messages", path: "/admin/messages" },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <h2 className="text-xl font-black text-cyan-400 tracking-tight mb-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
          Admin Terminal
        </h2>
        <nav className="flex-1 space-y-2">
          {menu.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === item.path 
                  ? "bg-zinc-800 text-zinc-50 border border-zinc-700" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button 
          onClick={handleLogout} 
          className="mt-8 px-4 py-2 text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl hover:bg-red-400/20 text-left"
        >
          Disconnect Session
        </button>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // <-- Import the Navbar

export const metadata: Metadata = {
  title: "Software Engineer Portfolio",
  description: "Advanced full-stack portfolio built using Next.js, TypeScript, Tailwind, and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* suppressHydrationWarning handles third-party extension attributes */}
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased selection:bg-blue-500/30" suppressHydrationWarning>
        <Navbar /> {/* <-- Render globally above page contents */}
        {children}
      </body>
    </html>
  )
}
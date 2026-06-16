// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "ANS - Official Portfolio",
  description: "Advanced full-stack portfolio built using Next.js, TypeScript, Tailwind, and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* FIXED: The body tag utilizes background tokens that cleanly resolve to your variables */}
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-500/30" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
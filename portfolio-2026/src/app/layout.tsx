// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Abdullah Nazmus Sakib | Portfolio",
  description: "Software Engineering & Full-Stack Architecture Showcase",
  // // FIXED: Explicitly declaring your custom image asset routing parameters
  // icons: {
  //   icon: "/icon.png", // Paths pointing to images saved directly in your /public directory
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png", // Optional: Custom high-res image for iOS bookmarks
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* FIXED: Removed light-forcing utilities to ensure high contrast against neon layers */}
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-cyan-500/30" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivam Raj — Full Stack Developer & AI Enthusiast",
  description:
    "Award-winning cinematic portfolio of Shivam Raj — Full Stack Developer and AI Enthusiast. Explore a 3D universe of skills, projects, and achievements.",
  keywords: ["Shivam Raj", "Full Stack Developer", "AI Enthusiast", "Portfolio", "React", "Next.js", "Three.js"],
  authors: [{ name: "Shivam Raj" }],
  openGraph: {
    title: "Shivam Raj — Full Stack Developer & AI Enthusiast",
    description: "Cinematic 3D portfolio experience",
    type: "website",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased cursor-none">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

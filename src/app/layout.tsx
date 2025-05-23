import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrés Ortiz | Desarrollador Fullstack & IA",
  description: "Portafolio profesional de Andrés Ortiz, desarrollador fullstack especializado en IA generativa y soluciones web innovadoras",
  keywords: ["desarrollador fullstack", "portfolio", "ia generativa", "web", "tecnología"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
        style={{ cursor: 'none' }}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Animaciones de scroll
                const observerOptions = {
                  root: null,
                  rootMargin: '0px',
                  threshold: 0.1
                };
                
                const handleIntersect = (entries, observer) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('active');
                    }
                  });
                };
                
                const observer = new IntersectionObserver(handleIntersect, observerOptions);
                
                const animatedElements = document.querySelectorAll(
                  '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-zoom'
                );
                
                animatedElements.forEach(el => {
                  observer.observe(el);
                });
                
                // Smooth scroll para enlaces internos
                const links = document.querySelectorAll('a[href^="#"]');
                links.forEach(link => {
                  link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (!targetElement) return;
                    
                    window.scrollTo({
                      top: targetElement.offsetTop - 100,
                      behavior: 'smooth'
                    });
                  });
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

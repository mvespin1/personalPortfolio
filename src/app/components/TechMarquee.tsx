"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

// Tecnologías con URLs de CDN
const technologies = [
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

// Duplicamos las tecnologías para el efecto infinito de scroll
const marqueeItems = [...technologies, ...technologies];

export default function TechMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animar entrada del contenedor
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }}
    );
    
    // Animación del título
    gsap.fromTo(
      ".marquee-title span",
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Efecto de marquee infinito
    if (rowRef.current) {
      const rowWidth = rowRef.current.scrollWidth / 2;
      
      gsap.to(rowRef.current, {
        x: -rowWidth,
        duration: 60, // Desplazamiento más lento
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % rowWidth)
        }
      });
    }
  }, []);

  return (
    <section id="tecnologias" className="relative py-16 overflow-hidden bg-black" ref={containerRef}>
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center marquee-title">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="inline-block">Mi</span> <span className="inline-block text-gradient-orange-no-stroke">Stack</span> <span className="text-white">Tecnológico</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Herramientas y tecnologías que domino para crear soluciones digitales innovadoras
          </p>
        </div>
      </div>

      <div className="marquee-container relative overflow-hidden" ref={marqueeRef}>
        {/* Efecto de desvanecimiento en el extremo izquierdo */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 z-10 bg-gradient-to-r from-black via-black to-transparent pointer-events-none"></div>
        
        {/* Efecto de desvanecimiento en el extremo derecho */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 z-10 bg-gradient-to-l from-black via-black to-transparent pointer-events-none"></div>
        
        <div className="flex items-center py-4">
          <div className="flex items-center" ref={rowRef}>
            {marqueeItems.map((tech, index) => (
              <div 
                key={`tech-${index}`} 
                className="flex items-center justify-center mx-16"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <Image 
                    src={tech.logo} 
                    alt={tech.name} 
                    width={64} 
                    height={64} 
                    className="object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BiographySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupAnimations = () => {
      // Animación del título
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Animación del texto biográfico 
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
          }
        }
      );

      // Animación de la imagen
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotateY: 15 },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          duration: 1.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          }
        }
      );

      // Animación de habilidades
      const skillItems = skillsRef.current?.querySelectorAll('.skill-item') || [];
      gsap.fromTo(
        skillItems,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          }
        }
      );

      // Animación línea de tiempo
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item') || [];
      gsap.fromTo(
        timelineItems,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
          }
        }
      );
    };

    setupAnimations();
  }, []);

  return (
    <section id="about" className="relative py-28 bg-black overflow-hidden" ref={sectionRef}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A86FF]/30 to-transparent"></div>
        
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5733]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-[#3A86FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16" ref={headingRef}>
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
              <span className="text-gradient-orange-no-stroke">Acerca</span>{" "}
              <span 
                className="text-white" 
                style={{ 
                  textShadow: '0 0 20px rgba(58, 134, 255, 0.3)'
                }}
              >
                de Mí
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#3A86FF]/60 to-transparent"></span>
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
              Estudiante egresado de Ingeniería en TI con experiencia en desarrollo backend y arquitecturas escalables
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Columna 1: Imagen y habilidades */}
          <div className="lg:col-span-2">
            {/* Imagen con efectos */}
            <div className="relative mb-12 perspective-800" ref={imageRef}>
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#FF5733]/30 via-[#3A86FF]/20 to-[#FF5733]/30 blur-md opacity-60"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 transform preserve-3d">
                <Image
                  src="https://media.licdn.com/dms/image/v2/D4E03AQG8hYlm3Q3IIA/profile-displayphoto-shrink_800_800/B4EZXkugHZG0Ac-/0/1743299150801?e=1753315200&v=beta&t=zp5ujCZ7G8i71Wy6KrubY4QAITjWoX74kvjffoSnyCQ"
                  alt="Desarrollador"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Decoradores */}
                <div className="absolute top-0 right-0 h-32 w-32 border-t border-r border-[#3A86FF]/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 h-32 w-32 border-b border-l border-[#FF5733]/30 rounded-bl-2xl"></div>
              </div>
            </div>

            {/* Habilidades */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-px bg-gradient-to-r from-[#3A86FF] to-transparent mr-3"></span>
                Habilidades
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Java Spring Boot", level: 85, color: "#FF5733" },
                  { name: "Node.js/Express", level: 80, color: "#3A86FF" },
                  { name: "React/Next.js", level: 75, color: "#FF5733" },
                  { name: "Python", level: 70, color: "#3A86FF" },
                  { name: "DevOps/CI-CD", level: 75, color: "#FF5733" },
                  { name: "Bases de datos", level: 80, color: "#3A86FF" },
                ].map((skill, index) => (
                  <div key={index} className="skill-item mb-5">
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}70)`,
                          boxShadow: `0 0 10px ${skill.color}50`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 2: Biografía y experiencia */}
          <div className="lg:col-span-3">
            {/* Texto biográfico */}
            <div className="mb-12" ref={bioRef}>
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  Mi nombre es Marco Espín y soy un profesional entusiasta del área de Tecnologías de la Información, 
                  con sólida experiencia en el desarrollo de software, especialmente en la construcción de soluciones 
                  backend utilizando herramientas y tecnologías modernas.
                </p>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  A lo largo de mi trayectoria, he participado en proyectos que combinan innovación y tecnología, 
                  enfocándome en ofrecer soluciones eficientes, escalables y estructuradas desde su diseño. 
                  Mi enfoque en la calidad del código y las buenas prácticas contribuye al desarrollo de soluciones mantenibles.
                </p>
                <p className="text-lg leading-relaxed mb-0 text-gray-300">
                  Me defino como una persona curiosa, adaptable a nuevas herramientas, y con facilidad para integrarme 
                  en equipos de trabajo. Me motiva el aprendizaje constante y el perfeccionamiento de mis habilidades técnicas, 
                  especialmente en IA generativa y arquitecturas modulares.
                </p>

                <div className="mt-8 flex items-center">
                  <div className="mr-4 h-px w-12 bg-gradient-to-r from-[#FF5733] to-transparent"></div>
                  <p className="text-xl font-signature text-white">Marco Espín</p>
                </div>
                
                {/* Decoración */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[#FF5733]"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[#3A86FF]"></div>
              </div>
            </div>

            {/* Línea de tiempo / educación y experiencia */}
            <div ref={timelineRef}>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-8 h-px bg-gradient-to-r from-[#FF5733] to-transparent mr-3"></span>
                Educación y Experiencia
              </h3>
              
              <div className="relative pl-8 border-l border-white/10">
                {[
                  {
                    period: "2020 - 2025",
                    role: "Ingeniería en Tecnologías de la Información",
                    company: "Universidad de las Fuerzas Armadas ESPE",
                    description: "Participación en proyectos de investigación y desarrollo de software.",
                    type: "education"
                  },
                  {
                    period: "2013 - 2019", 
                    role: "Bachillerato General Unificado",
                    company: "Unidad Educativa \"Paulo VI\"",
                    description: "Formación académica secundaria con enfoque integral.",
                    type: "education"
                  },
                  {
                    period: "Marzo 2024 - Mayo 2024",
                    role: "Desarrollador de Pruebas de Software",
                    company: "Ministerio del Deporte del Ecuador",
                    description: "Elaboración, desarrollo e implementación de un plan de pruebas de software en el área de Tecnologías de la Información del Ministerio del Deporte del Ecuador, utilizando estrategias de prueba estructuradas e integrándolo dentro del proceso de desarrollo propio del Ministerio, conforme a su metodología de desarrollo de software.",
                    type: "experience"
                  }
                ].map((item, index) => (
                  <div key={index} className="timeline-item mb-12 relative">
                    <div className={`absolute -left-12 top-0 w-5 h-5 rounded-full border-2 bg-black ${item.type === 'education' ? 'border-[#3A86FF]' : 'border-[#FF5733]'}`}></div>
                    <span className={`text-sm font-medium tracking-wider ${item.type === 'education' ? 'text-[#3A86FF]' : 'text-[#FF5733]'}`}>
                      {item.period} • {item.type === 'education' ? 'Educación' : 'Experiencia'}
                    </span>
                    <h4 className="text-xl font-bold mt-1 mb-1 text-white">{item.role}</h4>
                    <h5 className="text-lg text-gray-300 mb-3">{item.company}</h5>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
} 
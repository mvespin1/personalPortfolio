"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  color: string;
  featured?: boolean;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "BRAMAR - Lenguaje de Programación Multinúcleo",
      description: "Desarrollo de un lenguaje de programación enfocado en concurrencia automática usando C y Rust, con sintaxis similar a Python para manejo de tareas concurrentes desde el compilador.",
      technologies: ["Rust", "C", "Compiladores", "Concurrencia"],
      image: "https://placehold.co/800x500/111/333?text=BRAMAR+Language",
      link: "https://github.com/mvespin1/TESIS_BRAMAR",
      color: "#FF5733",
      featured: true
    },
    {
      id: 2,
      title: "Infraestructura como Código con Terraform",
      description: "Configuración y gestión de infraestructura cloud utilizando Terraform para automatización de despliegues y gestión de recursos AWS.",
      technologies: ["Terraform", "AWS", "DevOps", "IaC"],
      image: "https://placehold.co/800x500/111/333?text=Terraform+Infrastructure",
      link: "https://github.com/mvespin1/terraformCode",
      color: "#3A86FF",
      featured: true
    }
  ];

  // Filtrar proyectos destacados
  const featuredProjects = projects.filter(project => project.featured);
  // Obtener todos los proyectos para la lista
  const allProjects = projects;

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

      // Animación de proyectos
      const projectItems = projectsRef.current?.querySelectorAll('.project-card') || [];
      gsap.fromTo(
        projectItems,
        { opacity: 0, y: 100, rotateY: 25 },
        { 
          opacity: 1, 
          y: 0, 
          rotateY: 0,
          duration: 1.2, 
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
          }
        }
      );

      // Animación del slider de proyectos destacados
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 85%",
            }
          }
        );
      }
    };

    setupAnimations();

    // Auto-rotación de proyectos destacados
    const interval = setInterval(() => {
      setActiveProject(prev => (prev + 1) % featuredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const handleProjectHover = (index: number | null) => {
    setIsHovering(index);
  };

  return (
    <section id="projects" className="relative py-28 bg-black overflow-hidden" ref={sectionRef}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A86FF]/30 to-transparent"></div>
        
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#3A86FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-[#FF5733]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16" ref={headingRef}>
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
              <span 
                className="relative inline-block" 
                style={{ 
                  textShadow: '0 0 20px rgba(255, 87, 51, 0.3)'
                }}
              >
                Mis
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF5733]/60 to-transparent"></span>
              </span>{" "}
              <span className="text-white">Proyectos</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
              Proyectos de desarrollo backend, DevOps e investigación en lenguajes de programación
            </p>
          </div>
        </div>

        {/* Proyectos destacados - Carrusel 3D */}
        <div className="mb-24 relative" ref={carouselRef}>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={() => setActiveProject(prev => (prev - 1 + featuredProjects.length) % featuredProjects.length)}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={() => setActiveProject(prev => (prev + 1) % featuredProjects.length)}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="relative h-[500px] perspective-1000">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="absolute inset-0 w-full h-full transition-all duration-700 ease-out preserve-3d"
                style={{ 
                  opacity: activeProject === index ? 1 : 0,
                  transform: `
                    perspective(1000px) 
                    rotateY(${activeProject === index ? 0 : activeProject > index ? -60 : 60}deg) 
                    translateZ(${activeProject === index ? 0 : -300}px)
                    scale(${activeProject === index ? 1 : 0.8})
                  `,
                  zIndex: activeProject === index ? 10 : 0
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-2xl opacity-80"
                    unoptimized
                  />
                  
                  {/* Superposición 3D con degradado */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
                    style={{ 
                      background: `linear-gradient(to top, black, transparent), 
                                  radial-gradient(circle at 30% 50%, ${project.color}20, transparent 70%)`
                    }}
                  ></div>
                  
                  {/* Contenido del proyecto */}
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                    <div className="flex flex-col items-start space-y-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium tracking-wider"
                        style={{ 
                          background: `linear-gradient(90deg, ${project.color}40, ${project.color}10)`,
                          border: `1px solid ${project.color}30`
                        }}
                      >
                        DESTACADO
                      </span>
                      <h3 className="text-4xl font-bold">{project.title}</h3>
                      <p className="text-gray-300 text-lg max-w-xl">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={project.link} 
                        className="mt-6 inline-flex items-center px-6 py-3 rounded-full transition-all duration-300"
                        style={{ 
                          background: `linear-gradient(90deg, ${project.color}, ${project.color}80)`,
                          boxShadow: `0 10px 20px -10px ${project.color}50`
                        }}
                      >
                        Ver proyecto
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Elementos decorativos */}
                <div className="absolute top-[5%] right-[5%] w-32 h-32 border border-white/10 rounded-full opacity-50 transform translate-z-50 blur-[1px]"></div>
                <div className="absolute bottom-[10%] right-[15%] w-16 h-16 border border-white/10 rounded-full opacity-50 transform translate-z-30 blur-[1px]"></div>
              </div>
            ))}
            
            {/* Navegación de puntos */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeProject === index 
                      ? 'bg-white w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ver proyecto ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de proyectos */}
        <div ref={projectsRef}>
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <span className="w-8 h-px bg-gradient-to-r from-[#FF5733] to-transparent mr-3"></span>
            Todos los proyectos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, index) => (
              <div 
                key={project.id}
                className="project-card relative group bg-gradient-to-br from-white/5 to-transparent rounded-xl overflow-hidden border border-white/10 transition-all duration-500"
                style={{ 
                  transform: `perspective(1000px) rotateX(${isHovering === index ? 5 : 0}deg) rotateY(${isHovering === index ? 5 : 0}deg)`,
                  boxShadow: isHovering === index ? `0 20px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px ${project.color}30, 0 0 30px -5px ${project.color}20` : 'none'
                }}
                onMouseEnter={() => handleProjectHover(index)}
                onMouseLeave={() => handleProjectHover(null)}
              >
                {/* Imagen del proyecto */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 -translate-y-2 scale-110 opacity-30 blur-sm transition-transform duration-700 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-60 group-hover:blur-none"
                    style={{ background: `linear-gradient(135deg, ${project.color}40, transparent)` }}
                  ></div>
                  
                  <div className="relative h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Badge para proyectos destacados */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-medium border border-white/10">
                      Destacado
                    </div>
                  )}
                </div>
                
                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  
                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 rounded-full text-xs bg-white/5 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-xs bg-white/5 text-gray-300">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Enlace */}
                  <a 
                    href={project.link} 
                    className="inline-flex items-center text-sm font-medium transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: project.color }}
                  >
                    Ver detalles
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1 transition-all duration-300 group-hover:ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
                
                {/* Efecto de resplandor al hover */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ 
                    background: `radial-gradient(circle at 30% 20%, ${project.color}10, transparent 60%)` 
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </section>
  );
} 
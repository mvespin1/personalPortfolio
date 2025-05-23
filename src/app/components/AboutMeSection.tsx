"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Backend (Java/Node.js)', level: 85, color: '#FF5733' },
    { name: 'Frontend (React/Next.js)', level: 80, color: '#3A86FF' },
    { name: 'DevOps/CI-CD', level: 75, color: '#FF5733' },
    { name: 'Bases de Datos', level: 80, color: '#3A86FF' },
    { name: 'IA Generativa/LLMs', level: 70, color: '#FF5733' },
  ];

  const stats = [
    { value: '2+', label: 'Años de experiencia', icon: '💼' },
    { value: '10+', label: 'Proyectos desarrollados', icon: '🚀' },
    { value: '5+', label: 'Tecnologías dominadas', icon: '⚡' },
    { value: '1', label: 'Investigación publicada', icon: '📚' },
  ];

  useEffect(() => {
    // Animaciones al hacer scroll
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
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2,
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
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          }
        }
      );

      // Animación de las estadísticas
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        }
      );

      // Animación de las barras de habilidades
      const skillBars = skillsRef.current?.querySelectorAll('.skill-progress') || [];
      
      skillBars.forEach((bar, index) => {
        const progress = bar.querySelector('.progress-fill');
        
        gsap.fromTo(
          progress,
          { width: 0 },
          { 
            width: progress?.getAttribute('data-level') + '%', 
            duration: 1.5, 
            delay: 0.2 + (index * 0.1),
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
            }
          }
        );
      });
    };

    setupAnimations();
  }, []);

  return (
    <section id="acerca-de-mi" className="relative py-28 overflow-hidden bg-black" ref={sectionRef}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A86FF]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-[#3A86FF]/5 rounded-full blur-3xl parallax" data-speed="0.3"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#FF5733]/10 rounded-full blur-3xl parallax" data-speed="0.2"></div>
      </div>

      {/* Decoración geométrica */}
      <div className="absolute left-[5%] top-[10%] w-40 h-40 border border-[#3A86FF]/20 rounded-full opacity-30"></div>
      <div className="absolute right-[10%] bottom-[15%] w-24 h-24 border border-[#FF5733]/20 rounded-full opacity-30"></div>
      <div className="absolute right-[30%] top-[20%] h-40 w-px bg-gradient-to-b from-transparent via-[#3A86FF]/20 to-transparent rotate-[30deg]"></div>
      <div className="absolute left-[20%] bottom-[25%] h-32 w-px bg-gradient-to-b from-transparent via-[#FF5733]/20 to-transparent -rotate-[20deg]"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center reveal-on-scroll" ref={headingRef}>
          <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
            <span className="text-gradient-orange-no-stroke">Sobre</span>{" "}
            <span 
              className="relative inline-block" 
              style={{ 
                textShadow: '0 0 20px rgba(58, 134, 255, 0.2)'
              }}
            >
              Mí
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#3A86FF]/60 to-transparent"></span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
            Desarrollador especializado en backend y arquitecturas de software escalables
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Columna de imagen */}
          <div className="relative reveal-from-left" ref={imageRef}>
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden border border-white/10">
              <Image 
                src="https://placehold.co/600x600/111/333?text=Profile+Image" 
                alt="Mi perfil"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />

              {/* Overlay y efectos */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Decoración */}
              <div className="absolute -right-6 -top-6 w-24 h-24 border-2 border-[#FF5733]/20 rounded-full"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 border border-[#3A86FF]/30 rounded-full"></div>
              
              {/* Acento de color */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF5733] to-[#3A86FF]"></div>
              
              {/* Caja de información flotante */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] p-5 backdrop-blur-md bg-black/40 border border-white/10 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Marco Espín</h3>
                <p className="text-[#3A86FF] font-medium mb-3">Desarrollador Backend/Fullstack</p>
                <div className="flex items-center justify-between">
                  <a 
                    href="https://github.com/mvespin1" 
                    className="transition-transform hover:scale-110 text-white/70 hover:text-white"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/marco-espin-11a960358/" 
                    className="transition-transform hover:scale-110 text-white/70 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:marcoespin87@gmail.com" 
                    className="transition-transform hover:scale-110 text-white/70 hover:text-white"
                    aria-label="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                    </svg>
                  </a>
                  <a 
                    href="tel:+593961139690" 
                    className="transition-transform hover:scale-110 text-white/70 hover:text-white"
                    aria-label="Teléfono"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.97a.68.68 0 0 1-.608-.122L5.93 7.406a.68.68 0 0 1-.122-.608l.537-1.805a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div 
              className="grid grid-cols-2 gap-5 mt-10" 
              ref={statsRef}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-5 rounded-2xl bg-gradient-to-br from-black to-[#111] border border-white/5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-5px]"
                  style={{
                    boxShadow: index % 2 === 0 
                      ? '0 5px 20px rgba(0,0,0,0.2), 0 0 10px rgba(255,87,51,0.1)' 
                      : '0 5px 20px rgba(0,0,0,0.2), 0 0 10px rgba(58,134,255,0.1)'
                  }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1" style={{
                    color: index % 2 === 0 ? '#FF5733' : '#3A86FF'
                  }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de texto y habilidades */}
          <div className="reveal-from-right">
            <div ref={bioRef}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-[#FF5733]"></span>
                ¿Quién soy?
              </h3>
              
              <div className="space-y-5 text-gray-300">
                <p>
                  ¡Hola! Soy Marco Espín, un profesional entusiasta del área de Tecnologías de la Información 
                  con sólida experiencia en el desarrollo de software, especialmente en la construcción de 
                  soluciones backend utilizando herramientas y tecnologías modernas.
                </p>
                <p>
                  Me especializo en Java Spring Boot, Node.js, React, Next.js, Python y Go, con un enfoque 
                  particular en crear arquitecturas de software escalables y estructuradas. Mi experiencia 
                  incluye DevOps, CI/CD, y manejo de bases de datos relacionales y no relacionales.
                </p>
                <p>
                  Actualmente estoy explorando el potencial de la IA generativa, LLMs, RAG y arquitecturas 
                  modulares como MCP para el diseño de soluciones inteligentes e innovadoras. Me motiva el 
                  aprendizaje constante y el perfeccionamiento de mis habilidades técnicas.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#3A86FF]"></span>
                  Mis habilidades
                </h3>
                
                <div className="space-y-5" ref={skillsRef}>
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-progress">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span 
                          style={{ color: skill.color }}
                          className="font-mono"
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="progress-fill h-full rounded-full" 
                          data-level={skill.level}
                          style={{ 
                            width: '0%', 
                            background: `linear-gradient(to right, ${skill.color}, ${skill.color}90)`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden relative group transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, #FF5733, #3A86FF)',
                    }}
                  >
                    <span className="relative z-10 text-white font-medium">Descargar CV</span>
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
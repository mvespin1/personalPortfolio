"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Image from 'next/image';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactItemsRef = useRef<HTMLDivElement>(null);
  const linkContainersRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Configurar animaciones scroll-triggered
    const setupAnimations = () => {
      // Animación del título
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );

      // Animar secciones del footer
      sectionRefs.current.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            delay: 0.1 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
            }
          }
        );
      });

      // Animar línea divisoria
      gsap.fromTo(
        ".footer-divider",
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.2, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );

      // Animar copyright con efecto de typewriter
      gsap.fromTo(
        ".copyright",
        { width: 0 },
        { 
          width: "100%", 
          duration: 1.5, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 95%",
          }
        }
      );
    };

    setupAnimations();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black text-white pt-20 pb-8 overflow-hidden">
      {/* Fondo y efectos decorativos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        
        <div className="absolute bottom-0 -right-20 w-60 h-60 bg-[#FF5733]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -left-20 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#FF5733] rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-ping-slow"></div>
        
        <div className="grid-bg w-full h-full opacity-10"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Sección de contacto principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para <span className="text-gradient-orange-no-stroke">Transformar</span> tus Ideas?
          </h2>
          
          <p className="text-gray-400 mb-10">
            Si buscas soluciones digitales innovadoras que destaquen en el mercado actual, estoy aquí para ayudarte.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:contacto@andresortiz.dev" 
              className="px-8 py-3 bg-gradient-to-r from-[#FF5733] to-[#FF8C33] text-black font-medium rounded-full hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contáctame
            </a>
            
            <a 
              href="#proyectos" 
              className="px-8 py-3 bg-transparent border border-white/20 text-white font-medium rounded-full hover:border-[#FF5733]/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Ver Portafolio
            </a>
          </div>
        </div>
        
        {/* Línea divisoria animada */}
        <div className="footer-divider h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent mb-16 origin-left"></div>
        
        {/* Grid de información y links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Columna 1: Sobre mí */}
          <div 
            ref={(el: HTMLDivElement | null) => {
              if (el) sectionRefs.current[0] = el;
            }} 
            className="flex flex-col"
          >
            <div className="mb-4">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#FF5733] to-[#FF8C33] rounded-full w-12 h-12 shadow-glow mb-4">
                <span className="text-black font-bold text-xl">AO</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Andrés Ortiz</h3>
            <p className="text-gray-400 text-sm mb-4">
              Desarrollador fullstack especializado en crear experiencias digitales innovadoras y soluciones tecnológicas vanguardistas.
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="https://github.com/andresortizdev" className="text-gray-400 hover:text-[#FF5733] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/in/andresortizdev" className="text-gray-400 hover:text-[#FF5733] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
              <a href="https://twitter.com/andresortizdev" className="text-gray-400 hover:text-[#FF5733] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Columna 2: Enlaces rápidos */}
          <div 
            ref={(el: HTMLDivElement | null) => {
              if (el) sectionRefs.current[1] = el;
            }} 
            className="flex flex-col"
          >
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <div className="flex flex-col space-y-3">
              <Link href="#inicio" className="text-gray-400 hover:text-[#FF5733] transition-colors">Inicio</Link>
              <Link href="#servicios" className="text-gray-400 hover:text-[#FF5733] transition-colors">Servicios</Link>
              <Link href="#proyectos" className="text-gray-400 hover:text-[#FF5733] transition-colors">Proyectos</Link>
              <Link href="#testimonios" className="text-gray-400 hover:text-[#FF5733] transition-colors">Testimonios</Link>
              <Link href="#tecnologias" className="text-gray-400 hover:text-[#FF5733] transition-colors">Tecnologías</Link>
              <Link href="#contacto" className="text-gray-400 hover:text-[#FF5733] transition-colors">Contacto</Link>
            </div>
          </div>
          
          {/* Columna 3: Servicios */}
          <div 
            ref={(el: HTMLDivElement | null) => {
              if (el) sectionRefs.current[2] = el;
            }} 
            className="flex flex-col"
          >
            <h3 className="text-xl font-bold mb-6">Servicios</h3>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-gray-400 hover:text-[#FF5733] transition-colors">Desarrollo Frontend</Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF5733] transition-colors">Desarrollo Backend</Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF5733] transition-colors">Aplicaciones Móviles</Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF5733] transition-colors">Integración IA Generativa</Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF5733] transition-colors">Consultoría Tecnológica</Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF5733] transition-colors">Optimización de Rendimiento</Link>
            </div>
          </div>
          
          {/* Columna 4: Contacto */}
          <div 
            ref={(el: HTMLDivElement | null) => {
              if (el) sectionRefs.current[3] = el;
            }} 
            className="flex flex-col"
          >
            <h3 className="text-xl font-bold mb-6">Contacto</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF5733] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-400">contacto@andresortiz.dev</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF5733] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-400">+34 612 345 678</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FF5733] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-400">Madrid, España</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3">Suscríbete al Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-4 py-2 bg-black border border-white/20 rounded-l-full focus:outline-none focus:border-[#FF5733]/50 text-white text-sm w-full"
                />
                <button className="bg-gradient-to-r from-[#FF5733] to-[#FF8C33] text-black px-4 py-2 rounded-r-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pie del footer con copyright */}
        <div className="footer-bottom pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <div className="copyright overflow-hidden whitespace-nowrap">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Andrés Ortiz. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <span className="text-gray-500 text-xs mr-4">Hecho con</span>
            <div className="flex items-center space-x-2">
              <Image src="/images/nextjs.svg" alt="Next.js" width={18} height={18} className="opacity-60" />
              <Image src="/images/react.svg" alt="React" width={18} height={18} className="opacity-60" />
              <Image src="/images/tailwind.svg" alt="TailwindCSS" width={18} height={18} className="opacity-60" />
              <span className="text-[#FF5733] text-lg ml-1">♥</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
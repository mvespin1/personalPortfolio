"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseFollower from "./MouseFollower";
import Image from "next/image";
import Typed from 'typed.js';
import VaultLoader from "./VaultLoader";

// Declarar una variable global tipada para la instancia de Typed.js
declare global {
  interface Window {
    _typedInstance?: Typed;
  }
}

export default function HeroSection() {
  // Estado para controlar la secuencia de carga
  const [loaderVisible, setLoaderVisible] = useState(true); // Inicialmente solo se muestra el loader
  
  // Referencias
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  // Precargar imágenes antes de comenzar las animaciones
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = ['/images/asset_name.png'];
      let loadedCount = 0;
      
      imageUrls.forEach(src => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          // No haremos nada aquí ya que dependemos del loader para la secuencia
        };
        img.onerror = () => {
          loadedCount++;
          // Manejar errores silenciosamente
        };
        img.src = src;
      });
    };
    
    // Comenzar precarga de inmediato
    preloadImages();

    // Configurar elementos iniciales (ambos ocultos al inicio)
    if (contentRef.current) {
      gsap.set(contentRef.current, { 
        autoAlpha: 0, // Opacidad 0 y visibility hidden
        display: 'flex' // Mantener estructura pero invisible
      });
    }
    
    // Devolver función de limpieza (no hay nada que limpiar aquí)
    return () => {};
  }, []);

  // Manejo de la animación principal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // No inicializar animaciones hasta que se monte el componente completamente
    if (!contentRef.current) return;
    
    // Timeline principal (se ejecutará cuando el loader complete)
    const mainTimeline = gsap.timeline({ 
      paused: true, // No comienza automáticamente
      defaults: { ease: "power3.out" }
    });
    
    // Guardar referencia para poder iniciarla desde el callback
    mainTimelineRef.current = mainTimeline;
    
    // Animaciones del contenido principal
    mainTimeline
      // Primero mostrar el fondo
      .to(contentRef.current, { 
        autoAlpha: 1, // Mostrar el contenedor principal
        duration: 0.3
      })
      // Luego animar los elementos individuales
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        "-=0.1" // Comenzar un poco antes
      )
      .fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        "-=0.2"
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" },
        "-=0.5"
      )
      .fromTo(
        scrollIconRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

    // Efectos adicionales una vez terminada la secuencia principal
    
    // Animación pulsante para el icono de scroll
    gsap.to(scrollIconRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5 // Retrasar para no interferir con la animación de entrada
    });

    // Eventos de hover para heading
    const headingSpans = headingRef.current?.querySelectorAll("span");
    if (headingSpans) {
      headingSpans.forEach((span) => {
        span.addEventListener("mouseenter", () => {
          gsap.to(span, {
            scale: 1.05,
            duration: 0.3,
            overwrite: "auto"
          });
        });
        
        span.addEventListener("mouseleave", () => {
          gsap.to(span, {
            scale: 1,
            duration: 0.3,
            overwrite: "auto"
          });
        });
      });
    }

    // Grid parallax con mouse
    const gridMovement = (e: MouseEvent) => {
      const grid = gridRef.current;
      if (grid) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
        
        gsap.to(grid, {
          backgroundPosition: `${moveX}px ${moveY}px`,
          duration: 1,
          ease: "power1.out"
        });
      }
    };

    // Animación constante del fondo de olas
    if (waveRef.current) {
      gsap.to(waveRef.current, {
        y: "10%",
        x: "5%",
        rotation: 5,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Registrar eventos solo si está visible el contenido
    window.addEventListener("mousemove", gridMovement);

    // Typed.js se iniciará después en la secuencia
    mainTimeline.call(() => {
      // Solo iniciar si el contenido está visible y el elemento existe
      if (typedRef.current) {
        const typedInstance = new Typed(typedRef.current, {
          strings: [
            'Soy <span class="text-gradient-orange-no-stroke font-semibold">Marco Espín</span>, desarrollador fullstack especializado en backend con Java Spring Boot, Node.js, React, Next.js, Python y Go.',
            'Apasionado por crear arquitecturas de software escalables y soluciones backend robustas con tecnologías modernas.',
            'Explorando el potencial de la IA generativa, LLMs, RAG y arquitecturas modulares para soluciones innovadoras.',
            'Experiencia en DevOps, CI/CD, Docker, AWS, Terraform y bases de datos relacionales y no relacionales.'
          ],
          typeSpeed: 30,
          backSpeed: 15,
          backDelay: 1500,
          loop: true, 
          showCursor: true,
          cursorChar: '_',
          smartBackspace: true,
        });
        
        // Almacenar en variable para poder limpiarla en la función de retorno
        window._typedInstance = typedInstance;
      }
    }, [], ">+=0.1"); // Empezar un poco antes

    // ----- Animación de Scroll ----- 
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = contentRef.current?.offsetHeight || window.innerHeight;
      const scrollPercent = Math.min(scrollY / (heroHeight * 0.5), 1); // Calcular progreso hasta el 50% de la altura

      // 1. Desvanecer icono de scroll
      gsap.to(scrollIconRef.current, {
        opacity: 1 - scrollPercent * 2, // Desvanecer más rápido
        y: scrollY * 0.2, // Mover hacia abajo más lento que el scroll
        duration: 0.2,
        ease: "power1.out"
      });

      // 2. Parallax sutil para los rayos de fondo
      gsap.to(beamsRef.current?.children || [], {
        y: (index, target) => {
          const speed = (index + 1) * 0.05; // Diferentes velocidades
          return -scrollY * speed;
        },
        duration: 0.5,
        ease: "power1.out"
      });
    };

    // Añadir listener solo si el contenido está visible
    let scrollListenerAdded = false;
    const checkContentVisibilityAndAddListener = () => {
      if (contentRef.current && gsap.getProperty(contentRef.current, "autoAlpha") === 1 && !scrollListenerAdded) {
        window.addEventListener("scroll", handleScroll);
        scrollListenerAdded = true;
      } else if (!scrollListenerAdded) {
        // Volver a comprobar si aún no se ha añadido
        requestAnimationFrame(checkContentVisibilityAndAddListener);
      }
    };
    checkContentVisibilityAndAddListener();
    // ----- Fin Animación de Scroll -----

    // Limpieza al desmontar componente
    return () => {
      // Limpiar eventos
      if (headingSpans) {
        headingSpans.forEach((span) => {
          // Remover listeners si es necesario
        });
      }
      window.removeEventListener("mousemove", gridMovement);
      
      // Limpiar instancia de typed.js si existe
      if (window._typedInstance) {
        window._typedInstance.destroy();
        delete window._typedInstance;
      }
      
      // Parar timeline
      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }

      if (scrollListenerAdded) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []); // Solo se ejecuta al montar componente

  // Callback para cuando el loader termina
  const handleLoaderComplete = () => {
    // Ocultar loader
    setLoaderVisible(false);
    
    // Iniciar la animación principal después de que el loader desaparece
    setTimeout(() => {
      if (mainTimelineRef.current) {
        mainTimelineRef.current.play();
      }
    }, 100); // Un pequeño retraso para asegurar que el loader se ha desvanecido
  };

  return (
    <>
      {/* Loader - Solo visible al inicio */}
      {loaderVisible && <VaultLoader onComplete={handleLoaderComplete} />}
      
      {/* Contenido principal - Inicialmente oculto pero preparado */}
      <main 
        ref={contentRef}
        className="relative min-h-screen bg-black text-white overflow-hidden flex items-center"
      >
        <MouseFollower />
        
        <div className="absolute inset-0 z-0">
          <div ref={gridRef} className="grid-bg w-full h-full opacity-40"></div>
        </div>

        <div className="absolute inset-0 z-0 opacity-60">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
          <div className="beam beam-3"></div>
          <div className="beam beam-4"></div>
        </div>

        <div ref={waveRef} className="absolute inset-0 z-0 opacity-20">
          <div className="wave-animation h-full w-full"></div>
        </div>

        <div className="absolute top-0 -right-64 w-[50rem] h-[50rem] bg-gradient-radial from-[#FF5733]/20 to-transparent opacity-30 blur-3xl z-0"></div>
        <div className="absolute -bottom-48 -left-48 w-[40rem] h-[40rem] bg-gradient-radial from-indigo-500/10 to-transparent opacity-30 blur-3xl z-0"></div>
        
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-2/3 right-1/3 w-24 h-24 bg-blue-400/15 rounded-full blur-3xl animate-float"></div>
        
        <div className="absolute inset-0 z-0 light-effect opacity-10"></div>

        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center relative z-10">
          <div className="w-full lg:w-1/2 max-w-xl xl:max-w-3xl flex-shrink-0 pl-4 md:pl-8">
            <div className="text-center lg:text-left">
              <div ref={badgeRef} className="inline-block bg-gradient-to-r from-[#FF5733] to-[#FF8C33] text-black text-sm font-bold px-4 py-1 rounded-full mb-8 shadow-glow">
                Backend · Frontend · IA Generativa
              </div>
              
              <h1 ref={headingRef} className="text-6xl sm:text-7xl md:text-8xl font-bold leading-normal mb-8 tracking-tight cursor-pointer font-komikax overflow-visible">
                <span className="text-gradient-orange inline-block my-2 px-2 ml-1">MARCO       </span>
                <span className="text-gradient-white inline-block my-2 px-2">ESPIN</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl min-h-[80px]">
                <span ref={typedRef}></span>
              </p>
              
            </div>
          </div>

          <div ref={imageRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0 lg:-mr-16 xl:-mr-24 flex-shrink-0 animate-float-slow">
            <Image 
              src="/images/asset_name.png" 
              alt="Ilustración abstracta IA generativa" 
              width={650}
              height={650}
              className="object-contain max-w-[90vw] lg:max-w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FF5733]/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-[#FF5733]/10 rounded-full blur-3xl animate-float"></div>
        
        <div 
          ref={scrollIconRef} 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
          onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
            <rect x="1" y="1" width="22" height="34" rx="11" stroke="white" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 text-sm text-white/50 z-20">
          <p>Marco Espín</p>
        </div>

        {/* Contenedor para los rayos - Añadido ref */}
        <div className="absolute inset-0 z-0 pointer-events-none" ref={beamsRef}>
          <div className="beam beam-1" style={{ '--rotate': '35deg' } as React.CSSProperties}></div>
          <div className="beam beam-2" style={{ '--rotate': '-45deg' } as React.CSSProperties}></div>
          <div className="beam beam-3" style={{ '--rotate': '15deg' } as React.CSSProperties}></div>
          <div className="beam beam-4" style={{ '--rotate': '-25deg' } as React.CSSProperties}></div>
        </div>
      </main>
    </>
  );
} 
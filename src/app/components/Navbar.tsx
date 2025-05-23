"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Navbar() {

  useEffect(() => {
    // Animación de entrada
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      ".navbar-container",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5 }
    );

    // Animación para los links
    tl.fromTo(
      ".nav-link",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      "-=0.4"
    );

  }, []); // Ejecutar solo una vez al montar

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="flex justify-center px-4 h-24"> {/* Altura fija */} 
        {/* Aplicar estilos fijos, sin transición de scroll y quitar shadow-glow */}
        <nav className="navbar-container pointer-events-auto mt-3 py-2">
          <div className="pill-container glassmorphism rounded-full px-4 py-1.5 flex items-center justify-between">
            
            {/* Grupo de links izquierdo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="#inicio" className="nav-link text-sm sm:text-base text-white/80 hover:text-white px-3 py-2 rounded-full transition-all duration-300">
                Inicio
              </Link>
              <Link href="#servicios" className="nav-link text-sm sm:text-base text-white/80 hover:text-white px-3 py-2 rounded-full transition-all duration-300">
                Servicios
              </Link>
              <Link href="#proceso" className="nav-link text-sm sm:text-base text-white/80 hover:text-white px-3 py-2 rounded-full transition-all duration-300">
                Proceso
              </Link>
            </div>
            
            {/* Logo central */}
            <div className="brand-container relative flex-shrink-0 mx-4 sm:mx-6">
              <Link href="/" className="flex items-center justify-center bg-gradient-to-r from-[#FF5733] to-[#FF8C33] rounded-full w-10 h-10 sm:w-12 sm:h-12 transform transition-transform hover:scale-110 shadow-glow">
                <span className="text-black font-bold text-xl">AO</span>
              </Link>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-[#FF5733]/30 rounded-full blur-sm opacity-70 -z-10 animate-pulse-slow"></div>
            </div>
            
            {/* Grupo de links derecho */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="#proyectos" className="nav-link text-sm sm:text-base text-white/80 hover:text-white px-3 py-2 rounded-full transition-all duration-300">
                Proyectos
              </Link>
              <Link href="#tecnologias" className="nav-link text-sm sm:text-base text-white/80 hover:text-white px-3 py-2 rounded-full transition-all duration-300">
                Tecnologías
              </Link>
              <Link href="#contacto" className="nav-link text-sm sm:text-base px-4 py-2 bg-gradient-to-r from-[#FF5733] to-[#FF8C33] text-black font-medium rounded-full transition-all duration-300 hover:shadow-glow">
                Contacto
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
} 
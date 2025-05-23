"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface Hobby {
  id: number;
  title: string;
  icon: string;
  description: string;
  image: string;
  color: string;
}

export default function HobbiesSection() {
  const [activeHobby, setActiveHobby] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const hobbies: Hobby[] = [
    {
      id: 1,
      title: "Senderismo",
      icon: "🏔️",
      description: "Explorar la naturaleza y descubrir nuevos paisajes me llena de energía. El senderismo me permite desconectar de la tecnología y reconectar conmigo mismo.",
      image: "https://placehold.co/600x400/222/666?text=Senderismo",
      color: "#3A86FF"
    },
    {
      id: 2,
      title: "Música",
      icon: "🎸",
      description: "Tocar guitarra es mi forma favorita de relajarme. La música me ayuda a encontrar nuevas formas de creatividad y expresión personal.",
      image: "https://placehold.co/600x400/222/666?text=Música",
      color: "#7D4EE7"
    },
    {
      id: 3,
      title: "Lectura",
      icon: "📚",
      description: "Los libros son una fuente inagotable de conocimiento e inspiración. Me encanta sumergirme en nuevos mundos a través de la ciencia ficción y la literatura técnica.",
      image: "https://placehold.co/600x400/222/666?text=Lectura",
      color: "#3A86FF"
    },
    {
      id: 4,
      title: "Fútbol",
      icon: "⚽",
      description: "El fútbol es mi deporte favorito tanto para jugar como para ver. Me apasiona la estrategia del juego y la camaradería en equipo. Disfruto siguiendo tanto el fútbol local como internacional.",
      image: "https://placehold.co/600x400/222/666?text=Fútbol",
      color: "#FF5733"
    }
  ];

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

      // Animación de las tarjetas
      const cards = cardsRef.current?.querySelectorAll('.hobby-card') || [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          }
        }
      );
    };

    setupAnimations();
  }, []);

  // Cambiar el hobby activo
  const handleHobbyClick = (id: number) => {
    setActiveHobby(activeHobby === id ? null : id);

    // Animar los detalles cuando se selecciona un hobby
    if (activeHobby !== id) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  };

  // Encontrar el hobby activo
  const selectedHobby = hobbies.find(hobby => hobby.id === activeHobby);

  return (
    <section id="hobbies" className="relative py-28 bg-black overflow-hidden" ref={sectionRef}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A86FF]/30 to-transparent"></div>
        
        {/* Gradientes de fondo */}
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#FF5733]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-[#3A86FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center" ref={headingRef}>
          <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
            <span 
              className="relative inline-block" 
              style={{ 
                textShadow: '0 0 20px rgba(255, 87, 51, 0.3)'
              }}
            >
              Mis 
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF5733]/60 to-transparent"></span>
            </span>
            {" "}
            <span className="text-white">Pasiones</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
            Lo que me apasiona más allá del código
          </p>
        </div>

        {/* Grid de hobbies */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6" ref={cardsRef}>
          {hobbies.map((hobby) => (
            <div 
              key={hobby.id}
              className={`hobby-card relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${activeHobby === hobby.id ? 'ring-2 scale-105' : 'hover:scale-105 hover:shadow-lg'}`}
              style={{ 
                boxShadow: activeHobby === hobby.id ? `0 0 0 2px ${hobby.color}, 0 10px 30px rgba(0, 0, 0, 0.2)` : '',
                transform: activeHobby === hobby.id ? 'scale(1.05)' : ''
              }}
              onClick={() => handleHobbyClick(hobby.id)}
            >
              <div 
                className="aspect-square p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-black to-black/70 border border-white/5 group"
              >
                {/* Efecto de gradiente al hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${hobby.color} 0%, transparent 70%)` }}
                ></div>

                <div className="relative z-10">
                  <span className="text-4xl mb-4 block">{hobby.icon}</span>
                  <h3 
                    className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors"
                    style={{ color: activeHobby === hobby.id ? hobby.color : '' }}
                  >
                    {hobby.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de detalles del hobby */}
        {selectedHobby && (
          <div 
            ref={detailsRef}
            className="mt-12 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
            style={{ 
              boxShadow: `0 0 30px ${selectedHobby.color}15`
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Imagen */}
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={selectedHobby.image}
                  alt={selectedHobby.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div 
                  className="absolute inset-0 opacity-30 md:opacity-40" 
                  style={{ 
                    background: `linear-gradient(45deg, black, transparent), linear-gradient(to right, ${selectedHobby.color}40, transparent)`
                  }}
                ></div>
                
                {/* Decoradores */}
                <div className="absolute top-0 left-0 h-16 w-16 border-t border-l border-white/20 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-white/20 rounded-br-xl"></div>
              </div>
              
              {/* Texto */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{selectedHobby.icon}</span>
                  <h3 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: selectedHobby.color }}
                  >
                    {selectedHobby.title}
                  </h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">{selectedHobby.description}</p>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <blockquote className="text-sm italic text-gray-400">
                    "Las pasiones que cultivamos fuera del trabajo enriquecen nuestra creatividad y perspectiva profesional."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 
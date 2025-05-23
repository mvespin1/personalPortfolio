"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// Datos de los testimonios
const testimonials = [
  {
    id: 1,
    name: 'Alejandro Martínez',
    position: 'CTO, TechVision',
    image: 'https://placehold.co/200x200/111/333?text=AM',
    content: 'Andrés ha sido clave para modernizar nuestra plataforma. Su conocimiento técnico y capacidad para resolver problemas complejos superaron nuestras expectativas. Las soluciones que implementó mejoraron significativamente el rendimiento y la experiencia de usuario.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Laura Gómez',
    position: 'Founder, Innovate Studio',
    image: 'https://placehold.co/200x200/111/333?text=LG', 
    content: 'Trabajar con Andrés fue un placer. Entendió nuestra visión desde el primer día y transformó nuestras ideas en una plataforma intuitiva y visualmente impactante. Su atención al detalle y compromiso con la calidad son excepcionales.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    position: 'Product Manager, DataSync',
    image: 'https://placehold.co/200x200/111/333?text=CR',
    content: 'La implementación de IA generativa que Andrés desarrolló para nosotros revolucionó nuestro flujo de trabajo. Su enfoque innovador y conocimiento técnico nos permitieron automatizar procesos que antes requerían horas de trabajo manual.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marina López',
    position: 'CEO, EduTech',
    image: 'https://placehold.co/200x200/111/333?text=ML',
    content: 'Andrés transformó nuestra visión educativa en una plataforma digital de primer nivel. Su capacidad para combinar diseño atractivo con funcionalidad robusta creó una experiencia de aprendizaje excepcional para nuestros usuarios.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Configurar referencias para tarjetas
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, testimonials.length);
  }, []);

  // Configurar rotación automática de testimonios
  useEffect(() => {
    const startAutoRotate = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000); // Cambiar cada 8 segundos
    };

    startAutoRotate();

    // Limpiar intervalo al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Manejar cambio de testimonio activo
  useEffect(() => {
    // Animar el cambio de testimonios
    if (contentRef.current) {
      // Fade out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          // Fade in nuevo contenido
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }

    // Actualizar indicador activo
    cardRefs.current.forEach((card, index) => {
      if (card) {
        if (index === activeIndex) {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255, 87, 51, 0.3)",
            borderColor: "rgba(255, 87, 51, 0.5)",
            duration: 0.4
          });
        } else {
          gsap.to(card, {
            scale: 1,
            boxShadow: "none",
            borderColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.4
          });
        }
      }
    });

    // Reiniciar el intervalo cuando el usuario interactúa
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
  }, [activeIndex]);

  // Efectos de entrada en scroll
  useEffect(() => {
    const setupScrollAnimations = () => {
      // Animación del título y descripción
      gsap.fromTo(
        ".testimonial-title",
        { opacity: 0, y: 30 },
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

      // Animar contenido principal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          }
        }
      );

      // Animar avatares con stagger
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 75%",
          }
        }
      );
    };

    setupScrollAnimations();
  }, []);

  // Renderizar estrellas según la valoración
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-[#FF5733]' : 'text-gray-600'}`} 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
      </svg>
    ));
  };

  const handleTestimonialClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} id="testimonios" className="relative py-24 bg-black overflow-hidden">
      {/* Fondo y efectos decorativos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5733]/30 to-transparent"></div>
        
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#FF5733]/10 rounded-full blur-3xl parallax" data-speed="0.15"></div>
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl parallax" data-speed="0.25"></div>
      </div>

    </section>
  );
} 
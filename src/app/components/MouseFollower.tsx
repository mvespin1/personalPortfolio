"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      gsap.to(".cursor", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Detectar cuando el mouse está sobre elementos interactivos
    const handleMouseOver = () => {
      setIsHovering(true);
      gsap.to(".cursor", {
        scale: 1.5,
        opacity: 0.7,
        backgroundColor: "#FF5733",
        duration: 0.3
      });
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      gsap.to(".cursor", {
        scale: 1,
        opacity: 0.3,
        backgroundColor: "white",
        duration: 0.3
      });
    };

    // Función para ocultar el cursor cuando está sobre el navbar
    const handleNavbarHover = (e: MouseEvent) => {
      const isOverNavbar = (e.target as Element)?.closest('.navbar-container, .pill-container, .nav-link, .brand-container');
      setIsVisible(!isOverNavbar);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", handleNavbarHover);
    
    // Asegurarse de que el cursor esté visible cuando el mouse se mueve
    window.addEventListener("mouseenter", () => setIsVisible(true));

    // Añadir evento para botones y enlaces
    const interactiveElements = document.querySelectorAll("button, a, h1 span");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", handleNavbarHover);
      window.removeEventListener("mouseenter", () => setIsVisible(true));
      
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseOut);
      });
    };
  }, []);

  return (
    <div 
      className={`cursor w-8 h-8 rounded-full bg-white fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200`}
      style={{ 
        left: 0, 
        top: 0,
        mixBlendMode: "difference",
        opacity: isVisible ? 0.3 : 0
      }}
    />
  );
} 
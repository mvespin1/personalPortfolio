"use client";

// Función para detectar elementos cuando aparecen en el viewport
export function initScrollAnimations() {
  // Comprueba si estamos en el navegador
  if (typeof window === 'undefined') return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Una vez que se ha activado, dejamos de observar el elemento
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Crear el observer
  const observer = new IntersectionObserver(handleIntersect, observerOptions);
  
  // Seleccionar todos los elementos con clases de animación
  const animatedElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-zoom'
  );
  
  // Observar cada elemento
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  return () => {
    // Limpiar el observer cuando el componente se desmonta
    animatedElements.forEach(el => {
      observer.unobserve(el);
    });
  };
}

// Animación para título con efecto de escritura
export function animateTypingEffect(element, text, speed = 100) {
  if (!element) return;
  
  let i = 0;
  element.textContent = '';
  
  const typeNextCharacter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeNextCharacter, speed);
    }
  };
  
  typeNextCharacter();
}

// Función para animar un contador
export function animateCounter(element, targetValue, duration = 2000) {
  if (!element) return;
  
  let startTime;
  let startValue = 0;
  
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    
    // Calcular progreso
    const progress = Math.min((timestamp - startTime) / duration, 1);
    
    // Actualizar valor
    const currentValue = Math.floor(progress * (targetValue - startValue) + startValue);
    element.textContent = currentValue;
    
    // Continuar animación si no ha terminado
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = targetValue;
    }
  }
  
  requestAnimationFrame(animate);
}

// Efecto de desplazamiento suave para enlaces internos
export function initSmoothScroll() {
  // Seleccionar todos los enlaces que comienzan con #
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Prevenir comportamiento predeterminado
      e.preventDefault();
      
      // Obtener el destino del enlace
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Desplazamiento suave
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Offset para el navbar fijo
        behavior: 'smooth'
      });
    });
  });
}

// Efecto de parallax para fondos
export function initParallaxEffect() {
  if (typeof window === 'undefined') return;
  
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.2;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
} 
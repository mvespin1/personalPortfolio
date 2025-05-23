"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface VaultLoaderProps {
  onComplete: () => void;
}

const VaultLoader = ({ onComplete }: VaultLoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const vaultMechanismRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const lockBarRef = useRef<HTMLDivElement>(null);
  const leftCodeRef = useRef<HTMLDivElement>(null);
  const rightCodeRef = useRef<HTMLDivElement>(null);
  
  // Números del dial de la bóveda
  const [dialPosition, setDialPosition] = useState(0);
  const [dialSequence, setDialSequence] = useState<string>("LOCKED");
  
  // Estado para los "streams" de código (estilo Matrix)
  const [codeStreamLeft, setCodeStreamLeft] = useState<string[]>(['', '', '']);
  const [codeStreamRight, setCodeStreamRight] = useState<string[]>(['', '', '']);
  
  // Efecto para la animación de código estilo Matrix
  useEffect(() => {
    let leftInterval: NodeJS.Timeout;
    let rightInterval: NodeJS.Timeout;
    
    if (leftCodeRef.current && rightCodeRef.current) {
      const binaryDigits = '01';
      
      // Animación de código izquierdo
      leftInterval = setInterval(() => {
        setCodeStreamLeft(prev => {
          // Desplazar líneas hacia abajo
          let newLines = [...prev];
          
          // Generar nueva línea en la parte superior
          const newLine = Array(16).fill(0).map(() => 
            binaryDigits.charAt(Math.floor(Math.random() * binaryDigits.length))
          ).join('');
          
          // Añadir al principio y eliminar la última
          newLines.unshift(newLine);
          newLines.pop();
          
          return newLines.slice(0, 3);
        });
      }, 200);
      
      // Animación de código derecho
      rightInterval = setInterval(() => {
        setCodeStreamRight(prev => {
          // Desplazar líneas hacia abajo
          let newLines = [...prev];
          
          // Generar nueva línea en la parte superior
          const newLine = Array(16).fill(0).map(() => 
            binaryDigits.charAt(Math.floor(Math.random() * binaryDigits.length))
          ).join('');
          
          // Añadir al principio y eliminar la última
          newLines.unshift(newLine);
          newLines.pop();
          
          return newLines.slice(0, 3);
        });
      }, 200);
    }
    
    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);
  
  // Efecto para animar el dial de la bóveda
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Secuencia de desbloqueo
    const unlockSequence = () => {
      // Primer giro
      setTimeout(() => {
        setDialSequence("45");
        setDialPosition(45);
      }, 400);
      
      // Segundo giro (sentido contrario)
      setTimeout(() => {
        setDialSequence("45 • 12");
        setDialPosition(-35);
      }, 1200);
      
      // Tercer giro 
      setTimeout(() => {
        setDialSequence("45 • 12 • 38");
        setDialPosition(38);
      }, 2000);
      
      // Desbloqueo
      setTimeout(() => {
        setDialSequence("UNLOCKED");
      }, 2700);
    };
    
    timer = setTimeout(unlockSequence, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animación principal del loader
  useEffect(() => {
    const loader = loaderRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const vaultMechanism = vaultMechanismRef.current;
    const dial = dialRef.current;
    const lockBar = lockBarRef.current;
    
    if (!loader || !leftPanel || !rightPanel || !vaultMechanism || !dial || !lockBar) return;
    
    // Asegurarse de que el loader es visible inicialmente
    gsap.set(loader, { autoAlpha: 1 });
    
    // Timeline principal
    const tl = gsap.timeline();
    
    // Animación de mecanismo (pequeños movimientos reactivos)
    tl
      // Fase 1: Movimientos sutiles mientras gira el dial
      .to(dial, {
        rotate: "+=5",
        duration: 0.2,
        repeat: 4,
        yoyo: true,
        ease: "power1.inOut"
      }, 0.4)
      
      // Vibración en primera combinación
      .to(vaultMechanism, {
        x: "-=3",
        duration: 0.1,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
      }, 1.0)
      
      // Dial gira en sentido contrario con vibración
      .to(dial, {
        rotate: "-=5",
        duration: 0.2,
        repeat: 4,
        yoyo: true,
        ease: "power1.inOut"
      }, 1.4)
      
      // Vibración en segunda combinación 
      .to(vaultMechanism, {
        x: "+=3",
        duration: 0.1,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
      }, 2.0)
      
      // Dial gira para tercera combinación
      .to(dial, {
        rotate: "+=5",
        duration: 0.2,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
      }, 2.3)
      
      // Vibración final con desbloqueo
      .to(vaultMechanism, {
        x: "-=2",
        y: "-=2",
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut"
      }, 2.8)
      
      // Movimiento barras de cierre
      .to(lockBar, {
        scaleX: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 3.0)
      
      // Apertura de los paneles
      .to([leftPanel, rightPanel], {
        x: function(i) { return i === 0 ? '-101%' : '101%'; },
        duration: 0.8,
        ease: "power2.inOut"
      }, 3.3)
      
      // Desvanecer el mecanismo central
      .to(vaultMechanism, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4
      }, 3.5)
      
      // Desvanecer el loader completo
      .to(loader, {
        autoAlpha: 0,
        duration: 0.3,
        onComplete
      }, 3.8);
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black"
      style={{ visibility: 'hidden' }}
    >
      {/* Panel izquierdo */}
      <div 
        ref={leftPanelRef} 
        className="absolute left-0 w-1/2 h-full bg-[#0a0a0a] border-r border-[#FF5733]/20 flex items-center justify-end overflow-hidden"
      >
        {/* Líneas decorativas geométricas */}
        <div className="absolute inset-0">
          <div className="absolute right-0 h-full w-px bg-gradient-to-b from-transparent via-[#FF5733]/20 to-transparent"></div>
          <div className="absolute top-1/4 right-1/4 w-40 h-px bg-gradient-to-r from-transparent to-[#FF5733]/20"></div>
          <div className="absolute bottom-1/3 right-1/3 w-32 h-px bg-gradient-to-r from-transparent to-[#FF5733]/20"></div>
          
          {/* Líneas de código animadas tipo matrix */}
          <div ref={leftCodeRef} className="absolute bottom-10 left-10 text-[#FF5733]/40 text-xs font-mono">
            {codeStreamLeft.map((line, i) => (
              <div key={`left-${i}`} className="code-stream-line">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Panel derecho */}
      <div 
        ref={rightPanelRef} 
        className="absolute right-0 w-1/2 h-full bg-[#0a0a0a] border-l border-[#FF5733]/20 flex items-center justify-start overflow-hidden"
      >
        {/* Líneas decorativas geométricas */}
        <div className="absolute inset-0">
          <div className="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-[#FF5733]/20 to-transparent"></div>
          <div className="absolute top-1/3 left-1/4 w-40 h-px bg-gradient-to-l from-transparent to-[#FF5733]/20"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-px bg-gradient-to-l from-transparent to-[#FF5733]/20"></div>
          
          {/* Líneas de código animadas tipo matrix */}
          <div ref={rightCodeRef} className="absolute top-10 right-10 text-[#FF5733]/40 text-xs font-mono text-right">
            {codeStreamRight.map((line, i) => (
              <div key={`right-${i}`} className="code-stream-line">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mecanismo de la bóveda (más minimalista) */}
      <div 
        ref={vaultMechanismRef} 
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Círculo exterior del mecanismo */}
        <div className="w-56 h-56 rounded-full border-2 border-[#FF5733]/30 relative flex items-center justify-center">
          
          {/* Marcas de calibración - 12 marcas alrededor del círculo */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={`mark-${i}`} 
              className="absolute w-1 h-3 bg-[#FF5733]/50"
              style={{ 
                transform: `rotate(${i * 30}deg) translateY(-26px)`, 
                transformOrigin: 'center 28px' 
              }}
            ></div>
          ))}
          
          {/* Círculo interior con dial */}
          <div 
            ref={dialRef}
            className="w-44 h-44 rounded-full border-8 border-[#FF5733]/80 flex items-center justify-center"
            style={{ 
              transform: `rotate(${dialPosition}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.4, 2, 0.5, 1)'
            }}
          >
            {/* Marcador del dial */}
            <div className="absolute -top-3 w-4 h-4 bg-white rounded-full shadow-glow"></div>
            
            {/* Centro del dial */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5733] to-[#FF8C33]/80 flex items-center justify-center shadow-inner">
              <div className="text-black text-xl font-bold tracking-wider">M.E</div>
            </div>
          </div>
        </div>
        
        {/* Barras de bloqueo horizontal que desaparecen al desbloquear */}
        <div ref={lockBarRef} className="mt-6 h-1 w-40 bg-[#FF5733]/70 origin-center"></div>
        
        {/* Secuencia de desbloqueo */}
        <div className="mt-8 text-[#FF5733] font-mono tracking-wider text-center">
          <span className="text-xs uppercase">{dialSequence}</span>
        </div>
      </div>
      
      {/* Texto de carga minimalista */}
      <div className="absolute bottom-10 text-white/60 text-sm font-mono">
        Inicializando...
      </div>
    </div>
  );
};

export default VaultLoader; 
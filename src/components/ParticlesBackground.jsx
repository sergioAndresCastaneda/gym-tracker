import React, { useEffect, useRef } from 'react';

const ParticlesBackground = ({ count = 30 }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Inicializar partículas
    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
          angle: Math.random() * Math.PI * 2,
          rotation: Math.random() * 0.1 - 0.05,
          distance: Math.random() * 100 + 50
        });
      }
    };

    // Dibujar partículas
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((p, i) => {
        // Actualizar posición
        p.angle += p.rotation;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += p.speed;
        
        // Reiniciar posición si sale de la pantalla
        if (p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
          p.angle = Math.random() * Math.PI * 2;
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(58, 134, 255, ${p.opacity})`;
        ctx.fill();
        
        // Dibujar conexiones
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(58, 134, 255, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    // Inicializar
    resizeCanvas();
    initParticles();
    drawParticles();
    
    // Manejar redimensionado
    window.addEventListener('resize', resizeCanvas);
    
    // Limpiar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [count]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="particles-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticlesBackground;

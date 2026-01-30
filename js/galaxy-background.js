/**
 * Galaxy Background - Sistema Solar 3D
 * CM Tecnologia - Background premium com estrelas e planetas
 */

class GalaxyBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.planets = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;
    
    this.config = {
      particleCount: 120,
      planetCount: 5,
      colors: {
        primary: '#7C3AED',    // Violeta
        secondary: '#FBBF24',  // Amarelo
        accent: '#A855F7',     // Violeta claro
        white: '#FFFFFF'
      }
    };
    
    this.init();
  }
  
  init() {
    // Criar canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'galaxyCanvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    `;
    document.body.prepend(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    // Event listeners
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Criar partículas e planetas
    this.createParticles();
    this.createPlanets();
    
    // Iniciar animação
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: this.getRandomStarColor()
      });
    }
  }
  
  getRandomStarColor() {
    const colors = [
      this.config.colors.white,
      this.config.colors.white,
      this.config.colors.white,
      this.config.colors.primary,
      this.config.colors.accent,
      this.config.colors.secondary
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  createPlanets() {
    this.planets = [];
    
    const planetConfigs = [
      // Planeta grande violeta (tipo Júpiter)
      {
        x: this.canvas.width * 0.85,
        y: this.canvas.height * 0.3,
        radius: Math.min(this.canvas.width, this.canvas.height) * 0.08,
        color: this.config.colors.primary,
        gradient: ['#7C3AED', '#5B21B6', '#4C1D95'],
        rings: true,
        orbitSpeed: 0.0003,
        orbitRadius: 20,
        orbitAngle: 0,
        glow: true
      },
      // Planeta médio amarelo (tipo Saturno)
      {
        x: this.canvas.width * 0.15,
        y: this.canvas.height * 0.7,
        radius: Math.min(this.canvas.width, this.canvas.height) * 0.05,
        color: this.config.colors.secondary,
        gradient: ['#FBBF24', '#F59E0B', '#D97706'],
        rings: true,
        orbitSpeed: 0.0005,
        orbitRadius: 15,
        orbitAngle: Math.PI,
        glow: true
      },
      // Planeta pequeno accent
      {
        x: this.canvas.width * 0.7,
        y: this.canvas.height * 0.8,
        radius: Math.min(this.canvas.width, this.canvas.height) * 0.025,
        color: this.config.colors.accent,
        gradient: ['#A855F7', '#9333EA', '#7E22CE'],
        rings: false,
        orbitSpeed: 0.0008,
        orbitRadius: 10,
        orbitAngle: Math.PI / 2,
        glow: true
      },
      // Mini planeta 1
      {
        x: this.canvas.width * 0.3,
        y: this.canvas.height * 0.2,
        radius: Math.min(this.canvas.width, this.canvas.height) * 0.015,
        color: '#818CF8',
        gradient: ['#818CF8', '#6366F1', '#4F46E5'],
        rings: false,
        orbitSpeed: 0.001,
        orbitRadius: 8,
        orbitAngle: Math.PI * 1.5,
        glow: false
      },
      // Mini planeta 2
      {
        x: this.canvas.width * 0.5,
        y: this.canvas.height * 0.5,
        radius: Math.min(this.canvas.width, this.canvas.height) * 0.012,
        color: '#F472B6',
        gradient: ['#F472B6', '#EC4899', '#DB2777'],
        rings: false,
        orbitSpeed: 0.0012,
        orbitRadius: 5,
        orbitAngle: 0,
        glow: false
      }
    ];
    
    planetConfigs.forEach(config => {
      this.planets.push({
        ...config,
        baseX: config.x,
        baseY: config.y
      });
    });
  }
  
  drawGradientBackground() {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, this.canvas.width
    );
    
    gradient.addColorStop(0, '#1a0a2e');   // Centro: violeta muito escuro
    gradient.addColorStop(0.3, '#0f0f1a'); // Meio: quase preto com tom violeta
    gradient.addColorStop(0.7, '#0a0a0f'); // Borda: preto profundo
    gradient.addColorStop(1, '#000000');   // Extremo: preto puro
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  drawParticle(particle) {
    // Efeito de twinkle (piscar)
    particle.twinkle += particle.twinkleSpeed;
    const twinkleOpacity = (Math.sin(particle.twinkle) + 1) / 2;
    const finalOpacity = particle.opacity * (0.5 + twinkleOpacity * 0.5);
    
    // Glow effect para estrelas maiores
    if (particle.size > 1.5) {
      const glowGradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      glowGradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.5})`);
      glowGradient.addColorStop(0.5, `rgba(255, 255, 255, ${finalOpacity * 0.1})`);
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Estrela principal
    this.ctx.fillStyle = particle.color;
    this.ctx.globalAlpha = finalOpacity;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }
  
  drawPlanet(planet) {
    // Atualizar posição orbital
    planet.orbitAngle += planet.orbitSpeed;
    const x = planet.baseX + Math.cos(planet.orbitAngle) * planet.orbitRadius;
    const y = planet.baseY + Math.sin(planet.orbitAngle) * planet.orbitRadius;
    
    // Parallax suave com mouse
    const parallaxX = (this.mouse.x - this.canvas.width / 2) * 0.01;
    const parallaxY = (this.mouse.y - this.canvas.height / 2) * 0.01;
    const finalX = x + parallaxX * (planet.radius / 20);
    const finalY = y + parallaxY * (planet.radius / 20);
    
    // Glow exterior
    if (planet.glow) {
      const glowGradient = this.ctx.createRadialGradient(
        finalX, finalY, planet.radius * 0.8,
        finalX, finalY, planet.radius * 2.5
      );
      glowGradient.addColorStop(0, `${planet.color}33`);
      glowGradient.addColorStop(0.5, `${planet.color}11`);
      glowGradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(finalX, finalY, planet.radius * 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Anéis (se tiver)
    if (planet.rings) {
      this.ctx.save();
      this.ctx.translate(finalX, finalY);
      this.ctx.rotate(-0.3); // Inclinação dos anéis
      this.ctx.scale(1, 0.3); // Achatar para parecer 3D
      
      // Anel exterior
      this.ctx.strokeStyle = `${planet.color}66`;
      this.ctx.lineWidth = planet.radius * 0.15;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, planet.radius * 1.8, 0, Math.PI * 2);
      this.ctx.stroke();
      
      // Anel interior
      this.ctx.strokeStyle = `${planet.color}44`;
      this.ctx.lineWidth = planet.radius * 0.1;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, planet.radius * 1.5, 0, Math.PI * 2);
      this.ctx.stroke();
      
      this.ctx.restore();
    }
    
    // Planeta principal (gradiente esférico)
    const planetGradient = this.ctx.createRadialGradient(
      finalX - planet.radius * 0.3, finalY - planet.radius * 0.3, 0,
      finalX, finalY, planet.radius
    );
    
    planetGradient.addColorStop(0, planet.gradient[0]);
    planetGradient.addColorStop(0.5, planet.gradient[1]);
    planetGradient.addColorStop(1, planet.gradient[2]);
    
    this.ctx.fillStyle = planetGradient;
    this.ctx.beginPath();
    this.ctx.arc(finalX, finalY, planet.radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Reflexo/brilho no planeta
    const highlightGradient = this.ctx.createRadialGradient(
      finalX - planet.radius * 0.4, finalY - planet.radius * 0.4, 0,
      finalX - planet.radius * 0.4, finalY - planet.radius * 0.4, planet.radius * 0.6
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.ctx.fillStyle = highlightGradient;
    this.ctx.beginPath();
    this.ctx.arc(finalX, finalY, planet.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  updateParticle(particle) {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // Wrap around
    if (particle.x > this.canvas.width) particle.x = 0;
    if (particle.x < 0) particle.x = this.canvas.width;
    if (particle.y > this.canvas.height) particle.y = 0;
    if (particle.y < 0) particle.y = this.canvas.height;
  }
  
  animate() {
    // Limpar e desenhar background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGradientBackground();
    
    // Desenhar partículas (estrelas)
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });
    
    // Desenhar planetas
    this.planets.forEach(planet => {
      this.drawPlanet(planet);
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  // Método para reposicionar planetas no resize
  repositionPlanets() {
    if (this.planets.length >= 5) {
      this.planets[0].baseX = this.canvas.width * 0.85;
      this.planets[0].baseY = this.canvas.height * 0.3;
      this.planets[0].radius = Math.min(this.canvas.width, this.canvas.height) * 0.08;
      
      this.planets[1].baseX = this.canvas.width * 0.15;
      this.planets[1].baseY = this.canvas.height * 0.7;
      this.planets[1].radius = Math.min(this.canvas.width, this.canvas.height) * 0.05;
      
      this.planets[2].baseX = this.canvas.width * 0.7;
      this.planets[2].baseY = this.canvas.height * 0.8;
      this.planets[2].radius = Math.min(this.canvas.width, this.canvas.height) * 0.025;
      
      this.planets[3].baseX = this.canvas.width * 0.3;
      this.planets[3].baseY = this.canvas.height * 0.2;
      this.planets[3].radius = Math.min(this.canvas.width, this.canvas.height) * 0.015;
      
      this.planets[4].baseX = this.canvas.width * 0.5;
      this.planets[4].baseY = this.canvas.height * 0.5;
      this.planets[4].radius = Math.min(this.canvas.width, this.canvas.height) * 0.012;
    }
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.galaxyBackground = new GalaxyBackground();
  
  // Reposicionar planetas no resize
  window.addEventListener('resize', () => {
    if (window.galaxyBackground) {
      window.galaxyBackground.repositionPlanets();
    }
  });
});

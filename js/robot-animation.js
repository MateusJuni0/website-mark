/**
 * Robot Animation - Automação Visual
 * Robô futurista que automatiza tarefas (email, WhatsApp, analytics)
 */

class RobotAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.svg = null;
    this.robot = null;
    this.currentStep = 0;
    this.isAnimating = true;
    
    this.icons = [
      { id: 'icon-email', label: 'E-mail', x: 15, y: 50 },
      { id: 'icon-whatsapp', label: 'WhatsApp', x: 40, y: 30 },
      { id: 'icon-analytics', label: 'Analytics', x: 65, y: 50 },
      { id: 'icon-calendar', label: 'Agenda', x: 85, y: 35 }
    ];
    
    this.init();
  }
  
  init() {
    this.createSVG();
    this.startAnimation();
  }
  
  createSVG() {
    const svgNS = 'http://www.w3.org/2000/svg';
    
    this.svg = document.createElementNS(svgNS, 'svg');
    this.svg.setAttribute('viewBox', '0 0 100 70');
    this.svg.setAttribute('class', 'robot-animation-svg');
    this.svg.style.cssText = `
      width: 100%;
      max-width: 600px;
      height: auto;
      display: block;
      margin: 0 auto;
    `;
    
    // Definições (gradientes, filtros)
    const defs = document.createElementNS(svgNS, 'defs');
    
    // Gradiente violeta
    const gradPrimary = this.createGradient(svgNS, 'grad-primary', '#A855F7', '#7C3AED');
    defs.appendChild(gradPrimary);
    
    // Gradiente amarelo
    const gradAccent = this.createGradient(svgNS, 'grad-accent', '#FCD34D', '#FBBF24');
    defs.appendChild(gradAccent);
    
    // Glow filter
    const glowFilter = this.createGlowFilter(svgNS, 'glow', '#7C3AED');
    defs.appendChild(glowFilter);
    
    // Glow amarelo
    const glowAccent = this.createGlowFilter(svgNS, 'glow-accent', '#FBBF24');
    defs.appendChild(glowAccent);
    
    this.svg.appendChild(defs);
    
    // Criar ícones de tarefas
    this.icons.forEach(icon => {
      const iconGroup = this.createTaskIcon(svgNS, icon);
      this.svg.appendChild(iconGroup);
    });
    
    // Criar linhas de conexão
    const linesGroup = this.createConnectionLines(svgNS);
    this.svg.appendChild(linesGroup);
    
    // Criar robô
    this.robot = this.createRobot(svgNS);
    this.svg.appendChild(this.robot);
    
    // Criar partículas de automação
    this.particlesGroup = document.createElementNS(svgNS, 'g');
    this.particlesGroup.setAttribute('id', 'particles');
    this.svg.appendChild(this.particlesGroup);
    
    this.container.appendChild(this.svg);
  }
  
  createGradient(svgNS, id, color1, color2) {
    const gradient = document.createElementNS(svgNS, 'linearGradient');
    gradient.setAttribute('id', id);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', color1);
    
    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', color2);
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    
    return gradient;
  }
  
  createGlowFilter(svgNS, id, color) {
    const filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    
    const feGaussian = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussian.setAttribute('stdDeviation', '1');
    feGaussian.setAttribute('result', 'coloredBlur');
    
    const feMerge = document.createElementNS(svgNS, 'feMerge');
    const feMergeNode1 = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode1.setAttribute('in', 'coloredBlur');
    const feMergeNode2 = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    
    filter.appendChild(feGaussian);
    filter.appendChild(feMerge);
    
    return filter;
  }
  
  createTaskIcon(svgNS, icon) {
    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('id', icon.id);
    group.setAttribute('transform', `translate(${icon.x}, ${icon.y})`);
    group.style.transition = 'all 0.5s ease';
    
    // Círculo de fundo
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', 'rgba(124, 58, 237, 0.2)');
    circle.setAttribute('stroke', '#7C3AED');
    circle.setAttribute('stroke-width', '0.5');
    circle.setAttribute('class', 'icon-bg');
    group.appendChild(circle);
    
    // Ícone (emoji como texto)
    const iconText = document.createElementNS(svgNS, 'text');
    iconText.setAttribute('x', '0');
    iconText.setAttribute('y', '2');
    iconText.setAttribute('text-anchor', 'middle');
    iconText.setAttribute('font-size', '5');
    iconText.style.pointerEvents = 'none';
    
    const iconMap = {
      'icon-email': '📧',
      'icon-whatsapp': '💬',
      'icon-analytics': '📊',
      'icon-calendar': '📅'
    };
    iconText.textContent = iconMap[icon.id] || '⚙️';
    group.appendChild(iconText);
    
    // Badge de status (inicialmente oculto)
    const badge = document.createElementNS(svgNS, 'g');
    badge.setAttribute('class', 'status-badge');
    badge.setAttribute('transform', 'translate(4, -4)');
    badge.style.opacity = '0';
    badge.style.transition = 'opacity 0.3s ease';
    
    const badgeCircle = document.createElementNS(svgNS, 'circle');
    badgeCircle.setAttribute('r', '2.5');
    badgeCircle.setAttribute('fill', '#10B981');
    badge.appendChild(badgeCircle);
    
    const checkMark = document.createElementNS(svgNS, 'text');
    checkMark.setAttribute('x', '0');
    checkMark.setAttribute('y', '1');
    checkMark.setAttribute('text-anchor', 'middle');
    checkMark.setAttribute('font-size', '2.5');
    checkMark.setAttribute('fill', 'white');
    checkMark.textContent = '✓';
    badge.appendChild(checkMark);
    
    group.appendChild(badge);
    
    // Label
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', '11');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '2.5');
    label.setAttribute('fill', 'rgba(255,255,255,0.6)');
    label.textContent = icon.label;
    group.appendChild(label);
    
    return group;
  }
  
  createConnectionLines(svgNS) {
    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('id', 'connection-lines');
    group.style.opacity = '0.3';
    
    // Linhas pontilhadas conectando os ícones
    const positions = this.icons.map(i => ({ x: i.x, y: i.y }));
    
    for (let i = 0; i < positions.length - 1; i++) {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', positions[i].x);
      line.setAttribute('y1', positions[i].y);
      line.setAttribute('x2', positions[i + 1].x);
      line.setAttribute('y2', positions[i + 1].y);
      line.setAttribute('stroke', '#7C3AED');
      line.setAttribute('stroke-width', '0.3');
      line.setAttribute('stroke-dasharray', '1,1');
      group.appendChild(line);
    }
    
    return group;
  }
  
  createRobot(svgNS) {
    const robot = document.createElementNS(svgNS, 'g');
    robot.setAttribute('id', 'robot');
    robot.setAttribute('transform', 'translate(50, 55)');
    robot.setAttribute('filter', 'url(#glow)');
    
    // Corpo do robô (futurista)
    const body = document.createElementNS(svgNS, 'rect');
    body.setAttribute('x', '-4');
    body.setAttribute('y', '-3');
    body.setAttribute('width', '8');
    body.setAttribute('height', '6');
    body.setAttribute('rx', '1.5');
    body.setAttribute('fill', 'url(#grad-primary)');
    robot.appendChild(body);
    
    // Cabeça
    const head = document.createElementNS(svgNS, 'rect');
    head.setAttribute('x', '-3');
    head.setAttribute('y', '-7');
    head.setAttribute('width', '6');
    head.setAttribute('height', '4.5');
    head.setAttribute('rx', '1');
    head.setAttribute('fill', 'url(#grad-primary)');
    robot.appendChild(head);
    
    // Antena
    const antenna = document.createElementNS(svgNS, 'line');
    antenna.setAttribute('x1', '0');
    antenna.setAttribute('y1', '-7');
    antenna.setAttribute('x2', '0');
    antenna.setAttribute('y2', '-9');
    antenna.setAttribute('stroke', '#A855F7');
    antenna.setAttribute('stroke-width', '0.5');
    robot.appendChild(antenna);
    
    const antennaTip = document.createElementNS(svgNS, 'circle');
    antennaTip.setAttribute('cx', '0');
    antennaTip.setAttribute('cy', '-9.5');
    antennaTip.setAttribute('r', '0.8');
    antennaTip.setAttribute('fill', '#FBBF24');
    antennaTip.setAttribute('class', 'antenna-light');
    robot.appendChild(antennaTip);
    
    // Olhos
    const eyeLeft = document.createElementNS(svgNS, 'ellipse');
    eyeLeft.setAttribute('cx', '-1.2');
    eyeLeft.setAttribute('cy', '-5');
    eyeLeft.setAttribute('rx', '0.8');
    eyeLeft.setAttribute('ry', '1');
    eyeLeft.setAttribute('fill', '#00FFFF');
    eyeLeft.setAttribute('class', 'robot-eye');
    robot.appendChild(eyeLeft);
    
    const eyeRight = document.createElementNS(svgNS, 'ellipse');
    eyeRight.setAttribute('cx', '1.2');
    eyeRight.setAttribute('cy', '-5');
    eyeRight.setAttribute('rx', '0.8');
    eyeRight.setAttribute('ry', '1');
    eyeRight.setAttribute('fill', '#00FFFF');
    eyeRight.setAttribute('class', 'robot-eye');
    robot.appendChild(eyeRight);
    
    // Visor/boca (LED display)
    const visor = document.createElementNS(svgNS, 'rect');
    visor.setAttribute('x', '-1.5');
    visor.setAttribute('y', '-3.5');
    visor.setAttribute('width', '3');
    visor.setAttribute('height', '0.8');
    visor.setAttribute('rx', '0.4');
    visor.setAttribute('fill', '#10B981');
    visor.setAttribute('class', 'robot-visor');
    robot.appendChild(visor);
    
    // Braços
    const armLeft = document.createElementNS(svgNS, 'g');
    armLeft.setAttribute('class', 'arm-left');
    armLeft.setAttribute('transform-origin', '-4 -1');
    
    const armLeftLine = document.createElementNS(svgNS, 'line');
    armLeftLine.setAttribute('x1', '-4');
    armLeftLine.setAttribute('y1', '-1');
    armLeftLine.setAttribute('x2', '-7');
    armLeftLine.setAttribute('y2', '0');
    armLeftLine.setAttribute('stroke', '#A855F7');
    armLeftLine.setAttribute('stroke-width', '1');
    armLeftLine.setAttribute('stroke-linecap', 'round');
    armLeft.appendChild(armLeftLine);
    
    const handLeft = document.createElementNS(svgNS, 'circle');
    handLeft.setAttribute('cx', '-7.5');
    handLeft.setAttribute('cy', '0.5');
    handLeft.setAttribute('r', '1');
    handLeft.setAttribute('fill', '#FBBF24');
    armLeft.appendChild(handLeft);
    robot.appendChild(armLeft);
    
    const armRight = document.createElementNS(svgNS, 'g');
    armRight.setAttribute('class', 'arm-right');
    armRight.setAttribute('transform-origin', '4 -1');
    
    const armRightLine = document.createElementNS(svgNS, 'line');
    armRightLine.setAttribute('x1', '4');
    armRightLine.setAttribute('y1', '-1');
    armRightLine.setAttribute('x2', '7');
    armRightLine.setAttribute('y2', '0');
    armRightLine.setAttribute('stroke', '#A855F7');
    armRightLine.setAttribute('stroke-width', '1');
    armRightLine.setAttribute('stroke-linecap', 'round');
    armRight.appendChild(armRightLine);
    
    const handRight = document.createElementNS(svgNS, 'circle');
    handRight.setAttribute('cx', '7.5');
    handRight.setAttribute('cy', '0.5');
    handRight.setAttribute('r', '1');
    handRight.setAttribute('fill', '#FBBF24');
    armRight.appendChild(handRight);
    robot.appendChild(armRight);
    
    // Rodas/base
    const wheelLeft = document.createElementNS(svgNS, 'ellipse');
    wheelLeft.setAttribute('cx', '-2.5');
    wheelLeft.setAttribute('cy', '4');
    wheelLeft.setAttribute('rx', '1.5');
    wheelLeft.setAttribute('ry', '0.8');
    wheelLeft.setAttribute('fill', '#4C1D95');
    robot.appendChild(wheelLeft);
    
    const wheelRight = document.createElementNS(svgNS, 'ellipse');
    wheelRight.setAttribute('cx', '2.5');
    wheelRight.setAttribute('cy', '4');
    wheelRight.setAttribute('rx', '1.5');
    wheelRight.setAttribute('ry', '0.8');
    wheelRight.setAttribute('fill', '#4C1D95');
    robot.appendChild(wheelRight);
    
    return robot;
  }
  
  startAnimation() {
    this.animationLoop();
  }
  
  animationLoop() {
    if (!this.isAnimating) return;
    
    const steps = [
      { action: 'idle', duration: 1000 },
      { action: 'move', target: 0, duration: 1500 },
      { action: 'automate', target: 0, duration: 1200 },
      { action: 'move', target: 1, duration: 1200 },
      { action: 'automate', target: 1, duration: 1200 },
      { action: 'move', target: 2, duration: 1200 },
      { action: 'automate', target: 2, duration: 1200 },
      { action: 'move', target: 3, duration: 1200 },
      { action: 'automate', target: 3, duration: 1200 },
      { action: 'celebrate', duration: 2000 },
      { action: 'reset', duration: 1000 }
    ];
    
    const executeStep = (index) => {
      if (!this.isAnimating) return;
      
      const step = steps[index % steps.length];
      
      switch (step.action) {
        case 'idle':
          this.robotIdle();
          break;
        case 'move':
          this.moveRobotTo(this.icons[step.target]);
          break;
        case 'automate':
          this.automateIcon(step.target);
          break;
        case 'celebrate':
          this.robotCelebrate();
          break;
        case 'reset':
          this.resetAnimation();
          this.moveRobotToCenter();
          break;
      }
      
      setTimeout(() => {
        executeStep((index + 1) % steps.length);
      }, step.duration);
    };
    
    executeStep(0);
  }
  
  robotIdle() {
    // Animação sutil de "respiração"
    if (this.robot) {
      this.robot.style.transition = 'transform 1s ease-in-out';
      
      let floating = true;
      const float = () => {
        if (!this.isAnimating) return;
        const currentTransform = this.robot.getAttribute('transform');
        const match = currentTransform.match(/translate\(([\d.]+),\s*([\d.]+)\)/);
        if (match) {
          const x = parseFloat(match[1]);
          const y = parseFloat(match[2]) + (floating ? -1 : 1);
          this.robot.setAttribute('transform', `translate(${x}, ${y})`);
        }
        floating = !floating;
      };
      
      // Piscar olhos
      const eyes = this.robot.querySelectorAll('.robot-eye');
      eyes.forEach(eye => {
        eye.style.transition = 'ry 0.1s ease';
      });
    }
  }
  
  moveRobotTo(icon) {
    if (!this.robot || !icon) return;
    
    this.robot.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    this.robot.setAttribute('transform', `translate(${icon.x}, ${icon.y + 12})`);
    
    // Animar braço levantando
    const armRight = this.robot.querySelector('.arm-right');
    if (armRight) {
      armRight.style.transition = 'transform 0.5s ease';
      armRight.style.transform = 'rotate(-30deg)';
    }
  }
  
  moveRobotToCenter() {
    if (!this.robot) return;
    
    this.robot.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    this.robot.setAttribute('transform', 'translate(50, 55)');
    
    // Resetar braços
    const arms = this.robot.querySelectorAll('.arm-left, .arm-right');
    arms.forEach(arm => {
      arm.style.transition = 'transform 0.5s ease';
      arm.style.transform = 'rotate(0deg)';
    });
  }
  
  automateIcon(iconIndex) {
    const icon = this.icons[iconIndex];
    const iconElement = this.svg.getElementById(icon.id);
    
    if (!iconElement) return;
    
    // Efeito de "click"
    iconElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
      iconElement.style.transform = 'scale(1)';
    }, 200);
    
    // Mudar cor do círculo de fundo
    const circle = iconElement.querySelector('.icon-bg');
    if (circle) {
      circle.setAttribute('fill', 'rgba(16, 185, 129, 0.3)');
      circle.setAttribute('stroke', '#10B981');
    }
    
    // Mostrar badge de sucesso
    const badge = iconElement.querySelector('.status-badge');
    if (badge) {
      badge.style.opacity = '1';
    }
    
    // Criar partículas de "magia"
    this.createMagicParticles(icon.x, icon.y);
    
    // Animar braço do robô
    const armRight = this.robot.querySelector('.arm-right');
    if (armRight) {
      armRight.style.transition = 'transform 0.2s ease';
      armRight.style.transform = 'rotate(-60deg)';
      setTimeout(() => {
        armRight.style.transform = 'rotate(-30deg)';
      }, 200);
    }
    
    // Piscar visor em verde
    const visor = this.robot.querySelector('.robot-visor');
    if (visor) {
      visor.setAttribute('fill', '#FBBF24');
      setTimeout(() => {
        visor.setAttribute('fill', '#10B981');
      }, 300);
    }
  }
  
  createMagicParticles(x, y) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElementNS(svgNS, 'circle');
      const angle = (Math.PI * 2 / particleCount) * i;
      const distance = 3 + Math.random() * 5;
      
      particle.setAttribute('cx', x);
      particle.setAttribute('cy', y);
      particle.setAttribute('r', '0.8');
      particle.setAttribute('fill', i % 2 === 0 ? '#FBBF24' : '#7C3AED');
      particle.style.transition = 'all 0.8s ease-out';
      particle.style.opacity = '1';
      
      this.particlesGroup.appendChild(particle);
      
      // Animar partícula
      requestAnimationFrame(() => {
        particle.setAttribute('cx', x + Math.cos(angle) * distance);
        particle.setAttribute('cy', y + Math.sin(angle) * distance);
        particle.style.opacity = '0';
        particle.setAttribute('r', '0.2');
      });
      
      // Remover após animação
      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }
  
  robotCelebrate() {
    if (!this.robot) return;
    
    // Mover para o centro
    this.moveRobotToCenter();
    
    // Animação de celebração
    const antennaTip = this.robot.querySelector('.antenna-light');
    if (antennaTip) {
      antennaTip.style.transition = 'fill 0.3s ease';
      let blink = true;
      const blinkInterval = setInterval(() => {
        antennaTip.setAttribute('fill', blink ? '#10B981' : '#FBBF24');
        blink = !blink;
      }, 300);
      
      setTimeout(() => clearInterval(blinkInterval), 1500);
    }
    
    // Piscar olhos feliz
    const eyes = this.robot.querySelectorAll('.robot-eye');
    eyes.forEach(eye => {
      eye.style.transition = 'ry 0.2s ease';
      eye.setAttribute('ry', '0.3'); // Olhos fechados (sorrindo)
      setTimeout(() => {
        eye.setAttribute('ry', '1');
      }, 500);
    });
    
    // Acenar braços
    const armLeft = this.robot.querySelector('.arm-left');
    const armRight = this.robot.querySelector('.arm-right');
    
    if (armLeft && armRight) {
      armLeft.style.transition = 'transform 0.3s ease';
      armRight.style.transition = 'transform 0.3s ease';
      
      let wave = true;
      const waveInterval = setInterval(() => {
        armLeft.style.transform = wave ? 'rotate(20deg)' : 'rotate(-10deg)';
        armRight.style.transform = wave ? 'rotate(-20deg)' : 'rotate(10deg)';
        wave = !wave;
      }, 300);
      
      setTimeout(() => {
        clearInterval(waveInterval);
        armLeft.style.transform = 'rotate(0deg)';
        armRight.style.transform = 'rotate(0deg)';
      }, 1500);
    }
  }
  
  resetAnimation() {
    // Resetar todos os ícones
    this.icons.forEach(icon => {
      const iconElement = this.svg.getElementById(icon.id);
      if (iconElement) {
        const circle = iconElement.querySelector('.icon-bg');
        if (circle) {
          circle.setAttribute('fill', 'rgba(124, 58, 237, 0.2)');
          circle.setAttribute('stroke', '#7C3AED');
        }
        
        const badge = iconElement.querySelector('.status-badge');
        if (badge) {
          badge.style.opacity = '0';
        }
      }
    });
  }
  
  destroy() {
    this.isAnimating = false;
    if (this.svg && this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
  }
}

// CSS para a animação
const robotStyles = document.createElement('style');
robotStyles.textContent = `
  .robot-animation-svg {
    filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.3));
  }
  
  .robot-eye {
    animation: eyeGlow 2s ease-in-out infinite;
  }
  
  @keyframes eyeGlow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .antenna-light {
    animation: antennaBlink 1.5s ease-in-out infinite;
  }
  
  @keyframes antennaBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  #robot {
    filter: url(#glow);
  }
`;
document.head.appendChild(robotStyles);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Procura pelo container da animação
  const container = document.getElementById('robot-animation-container');
  if (container) {
    window.robotAnimation = new RobotAnimation('robot-animation-container');
  }
});

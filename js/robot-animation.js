/**
 * Robot Animation v2.0 - Premium Edition
 * Robô futurista avançado com 12 ícones interativos e animações complexas
 */

class RobotAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.svg = null;
    this.robot = null;
    this.currentStep = 0;
    this.isAnimating = true;
    
    // 12 ícones em layout circular expandido
    this.icons = [
      { id: 'icon-email', label: 'E-mail', emoji: '📧', x: 10, y: 25, color: '#EA4335' },
      { id: 'icon-whatsapp', label: 'WhatsApp', emoji: '💬', x: 25, y: 12, color: '#25D366' },
      { id: 'icon-calendar', label: 'Agenda', emoji: '📅', x: 45, y: 8, color: '#4285F4' },
      { id: 'icon-analytics', label: 'Analytics', emoji: '📊', x: 65, y: 12, color: '#FBBC05' },
      { id: 'icon-leads', label: 'Leads', emoji: '🎯', x: 80, y: 25, color: '#FF6B6B' },
      { id: 'icon-social', label: 'Social', emoji: '📱', x: 90, y: 42, color: '#E1306C' },
      { id: 'icon-reports', label: 'Relatórios', emoji: '📑', x: 85, y: 58, color: '#00C4B4' },
      { id: 'icon-crm', label: 'CRM', emoji: '🗂️', x: 70, y: 68, color: '#7C3AED' },
      { id: 'icon-support', label: 'Suporte', emoji: '🛎️', x: 50, y: 72, color: '#F59E0B' },
      { id: 'icon-invoices', label: 'Faturas', emoji: '💰', x: 30, y: 68, color: '#10B981' },
      { id: 'icon-inventory', label: 'Estoque', emoji: '📦', x: 15, y: 58, color: '#8B5CF6' },
      { id: 'icon-ai', label: 'IA', emoji: '🤖', x: 8, y: 42, color: '#00D4FF' }
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
    this.svg.setAttribute('viewBox', '0 0 100 80');
    this.svg.setAttribute('class', 'robot-animation-svg');
    this.svg.style.cssText = `
      width: 100%;
      max-width: 700px;
      height: auto;
      display: block;
      margin: 0 auto;
    `;
    
    // Definições (gradientes, filtros)
    const defs = document.createElementNS(svgNS, 'defs');
    
    // Gradientes
    defs.appendChild(this.createGradient(svgNS, 'grad-primary', '#A855F7', '#7C3AED'));
    defs.appendChild(this.createGradient(svgNS, 'grad-accent', '#FCD34D', '#FBBF24'));
    defs.appendChild(this.createGradient(svgNS, 'grad-body', '#6D28D9', '#4C1D95'));
    defs.appendChild(this.createGradient(svgNS, 'grad-metal', '#374151', '#1F2937'));
    
    // Glow filters
    defs.appendChild(this.createGlowFilter(svgNS, 'glow', '#7C3AED', 1.5));
    defs.appendChild(this.createGlowFilter(svgNS, 'glow-accent', '#FBBF24', 2));
    defs.appendChild(this.createGlowFilter(svgNS, 'glow-success', '#10B981', 1.5));
    defs.appendChild(this.createGlowFilter(svgNS, 'glow-cyan', '#00D4FF', 2));
    
    this.svg.appendChild(defs);
    
    // Background circuit pattern
    this.svg.appendChild(this.createCircuitPattern(svgNS));
    
    // Criar conexões orbitais
    this.svg.appendChild(this.createOrbitalConnections(svgNS));
    
    // Criar ícones de tarefas
    this.icons.forEach(icon => {
      const iconGroup = this.createTaskIcon(svgNS, icon);
      this.svg.appendChild(iconGroup);
    });
    
    // Criar robô premium
    this.robot = this.createPremiumRobot(svgNS);
    this.svg.appendChild(this.robot);
    
    // Partículas
    this.particlesGroup = document.createElementNS(svgNS, 'g');
    this.particlesGroup.setAttribute('id', 'particles');
    this.svg.appendChild(this.particlesGroup);
    
    // Energy beams group
    this.energyGroup = document.createElementNS(svgNS, 'g');
    this.energyGroup.setAttribute('id', 'energy-beams');
    this.svg.appendChild(this.energyGroup);
    
    this.container.appendChild(this.svg);
  }
  
  createGradient(svgNS, id, color1, color2, vertical = false) {
    const gradient = document.createElementNS(svgNS, 'linearGradient');
    gradient.setAttribute('id', id);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', vertical ? '0%' : '100%');
    gradient.setAttribute('y2', vertical ? '100%' : '100%');
    
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
  
  createGlowFilter(svgNS, id, color, blur = 1) {
    const filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-100%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('height', '300%');
    
    const feGaussian = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussian.setAttribute('stdDeviation', blur.toString());
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
  
  createCircuitPattern(svgNS) {
    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('id', 'circuit-pattern');
    group.style.opacity = '0.1';
    
    // Linhas de circuito sutis
    const paths = [
      'M5,40 Q25,35 45,40',
      'M55,40 Q75,35 95,40',
      'M50,10 L50,25',
      'M50,55 L50,70'
    ];
    
    paths.forEach(d => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#7C3AED');
      path.setAttribute('stroke-width', '0.3');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-dasharray', '2,2');
      group.appendChild(path);
    });
    
    return group;
  }
  
  createOrbitalConnections(svgNS) {
    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('id', 'orbital-connections');
    group.style.opacity = '0.2';
    
    // Órbitas elípticas ao redor do centro
    const orbits = [
      { rx: 35, ry: 20 },
      { rx: 42, ry: 28 }
    ];
    
    orbits.forEach((orbit, i) => {
      const ellipse = document.createElementNS(svgNS, 'ellipse');
      ellipse.setAttribute('cx', '50');
      ellipse.setAttribute('cy', '40');
      ellipse.setAttribute('rx', orbit.rx);
      ellipse.setAttribute('ry', orbit.ry);
      ellipse.setAttribute('fill', 'none');
      ellipse.setAttribute('stroke', '#7C3AED');
      ellipse.setAttribute('stroke-width', '0.3');
      ellipse.setAttribute('stroke-dasharray', '1,2');
      ellipse.style.animation = `orbitPulse ${3 + i}s ease-in-out infinite`;
      group.appendChild(ellipse);
    });
    
    return group;
  }
  
  createTaskIcon(svgNS, icon) {
    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('id', icon.id);
    group.setAttribute('transform', `translate(${icon.x}, ${icon.y})`);
    group.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    group.setAttribute('data-activated', 'false');
    
    // Anel externo com glow
    const outerRing = document.createElementNS(svgNS, 'circle');
    outerRing.setAttribute('cx', '0');
    outerRing.setAttribute('cy', '0');
    outerRing.setAttribute('r', '5.5');
    outerRing.setAttribute('fill', 'none');
    outerRing.setAttribute('stroke', icon.color);
    outerRing.setAttribute('stroke-width', '0.3');
    outerRing.setAttribute('stroke-dasharray', '3,2');
    outerRing.setAttribute('class', 'outer-ring');
    outerRing.style.opacity = '0.5';
    group.appendChild(outerRing);
    
    // Círculo de fundo com gradiente
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '4.5');
    circle.setAttribute('fill', `${icon.color}22`);
    circle.setAttribute('stroke', icon.color);
    circle.setAttribute('stroke-width', '0.4');
    circle.setAttribute('class', 'icon-bg');
    group.appendChild(circle);
    
    // Ícone emoji
    const iconText = document.createElementNS(svgNS, 'text');
    iconText.setAttribute('x', '0');
    iconText.setAttribute('y', '1.5');
    iconText.setAttribute('text-anchor', 'middle');
    iconText.setAttribute('font-size', '4');
    iconText.style.pointerEvents = 'none';
    iconText.textContent = icon.emoji;
    group.appendChild(iconText);
    
    // Badge de status (inicialmente oculto)
    const badge = document.createElementNS(svgNS, 'g');
    badge.setAttribute('class', 'status-badge');
    badge.setAttribute('transform', 'translate(3.5, -3.5)');
    badge.style.opacity = '0';
    badge.style.transition = 'all 0.3s ease';
    
    const badgeCircle = document.createElementNS(svgNS, 'circle');
    badgeCircle.setAttribute('r', '2');
    badgeCircle.setAttribute('fill', '#10B981');
    badgeCircle.setAttribute('filter', 'url(#glow-success)');
    badge.appendChild(badgeCircle);
    
    const checkMark = document.createElementNS(svgNS, 'text');
    checkMark.setAttribute('x', '0');
    checkMark.setAttribute('y', '0.8');
    checkMark.setAttribute('text-anchor', 'middle');
    checkMark.setAttribute('font-size', '2');
    checkMark.setAttribute('fill', 'white');
    checkMark.setAttribute('font-weight', 'bold');
    checkMark.textContent = '✓';
    badge.appendChild(checkMark);
    
    group.appendChild(badge);
    
    // Label abaixo do ícone
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', '8');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '2');
    label.setAttribute('fill', 'rgba(255,255,255,0.5)');
    label.setAttribute('class', 'icon-label');
    label.textContent = icon.label;
    group.appendChild(label);
    
    return group;
  }
  
  createPremiumRobot(svgNS) {
    const robot = document.createElementNS(svgNS, 'g');
    robot.setAttribute('id', 'robot');
    robot.setAttribute('transform', 'translate(50, 40)');
    
    // ===== BASE / HOVER PLATFORM =====
    const platform = document.createElementNS(svgNS, 'g');
    platform.setAttribute('class', 'hover-platform');
    
    // Sombra/glow da plataforma
    const platformGlow = document.createElementNS(svgNS, 'ellipse');
    platformGlow.setAttribute('cx', '0');
    platformGlow.setAttribute('cy', '12');
    platformGlow.setAttribute('rx', '8');
    platformGlow.setAttribute('ry', '2');
    platformGlow.setAttribute('fill', '#7C3AED');
    platformGlow.setAttribute('filter', 'url(#glow)');
    platformGlow.style.opacity = '0.4';
    platformGlow.setAttribute('class', 'platform-glow');
    platform.appendChild(platformGlow);
    
    // Base flutuante
    const base = document.createElementNS(svgNS, 'ellipse');
    base.setAttribute('cx', '0');
    base.setAttribute('cy', '10');
    base.setAttribute('rx', '6');
    base.setAttribute('ry', '1.5');
    base.setAttribute('fill', 'url(#grad-body)');
    platform.appendChild(base);
    
    // Anéis de energia na base
    for (let i = 0; i < 3; i++) {
      const ring = document.createElementNS(svgNS, 'ellipse');
      ring.setAttribute('cx', '0');
      ring.setAttribute('cy', '11');
      ring.setAttribute('rx', 3 + i * 1.5);
      ring.setAttribute('ry', 0.6 + i * 0.3);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', '#00D4FF');
      ring.setAttribute('stroke-width', '0.2');
      ring.setAttribute('class', `energy-ring-${i}`);
      ring.style.opacity = 0.3 - i * 0.08;
      platform.appendChild(ring);
    }
    
    robot.appendChild(platform);
    
    // ===== CORPO PRINCIPAL =====
    const body = document.createElementNS(svgNS, 'g');
    body.setAttribute('class', 'robot-body');
    
    // Torso com design futurista
    const torso = document.createElementNS(svgNS, 'path');
    torso.setAttribute('d', 'M-5,8 L-6,2 Q-6,-1 -4,-2 L4,-2 Q6,-1 6,2 L5,8 Q5,9 0,9 Q-5,9 -5,8 Z');
    torso.setAttribute('fill', 'url(#grad-body)');
    torso.setAttribute('stroke', '#A855F7');
    torso.setAttribute('stroke-width', '0.3');
    body.appendChild(torso);
    
    // Painel central do peito (reactor core)
    const chestPanel = document.createElementNS(svgNS, 'g');
    chestPanel.setAttribute('class', 'chest-panel');
    
    const reactorOuter = document.createElementNS(svgNS, 'circle');
    reactorOuter.setAttribute('cx', '0');
    reactorOuter.setAttribute('cy', '3');
    reactorOuter.setAttribute('r', '2.5');
    reactorOuter.setAttribute('fill', '#1F2937');
    reactorOuter.setAttribute('stroke', '#00D4FF');
    reactorOuter.setAttribute('stroke-width', '0.3');
    chestPanel.appendChild(reactorOuter);
    
    const reactorCore = document.createElementNS(svgNS, 'circle');
    reactorCore.setAttribute('cx', '0');
    reactorCore.setAttribute('cy', '3');
    reactorCore.setAttribute('r', '1.5');
    reactorCore.setAttribute('fill', '#00D4FF');
    reactorCore.setAttribute('filter', 'url(#glow-cyan)');
    reactorCore.setAttribute('class', 'reactor-core');
    chestPanel.appendChild(reactorCore);
    
    // Linhas de energia no torso
    const energyLines = [
      'M-3,0 L-3,5',
      'M3,0 L3,5',
      'M-2,6 L2,6'
    ];
    energyLines.forEach(d => {
      const line = document.createElementNS(svgNS, 'path');
      line.setAttribute('d', d);
      line.setAttribute('stroke', '#00D4FF');
      line.setAttribute('stroke-width', '0.2');
      line.setAttribute('stroke-dasharray', '1,0.5');
      line.style.opacity = '0.5';
      chestPanel.appendChild(line);
    });
    
    body.appendChild(chestPanel);
    robot.appendChild(body);
    
    // ===== CABEÇA =====
    const head = document.createElementNS(svgNS, 'g');
    head.setAttribute('class', 'robot-head');
    
    // Pescoço
    const neck = document.createElementNS(svgNS, 'rect');
    neck.setAttribute('x', '-1.5');
    neck.setAttribute('y', '-4');
    neck.setAttribute('width', '3');
    neck.setAttribute('height', '2');
    neck.setAttribute('rx', '0.5');
    neck.setAttribute('fill', 'url(#grad-metal)');
    head.appendChild(neck);
    
    // Estrutura da cabeça
    const headMain = document.createElementNS(svgNS, 'path');
    headMain.setAttribute('d', 'M-4,-4 Q-5,-5 -5,-7 L-5,-10 Q-5,-12 -3,-12 L3,-12 Q5,-12 5,-10 L5,-7 Q5,-5 4,-4 Z');
    headMain.setAttribute('fill', 'url(#grad-body)');
    headMain.setAttribute('stroke', '#A855F7');
    headMain.setAttribute('stroke-width', '0.3');
    head.appendChild(headMain);
    
    // Visor (display dos olhos)
    const visor = document.createElementNS(svgNS, 'rect');
    visor.setAttribute('x', '-3.5');
    visor.setAttribute('y', '-10');
    visor.setAttribute('width', '7');
    visor.setAttribute('height', '3.5');
    visor.setAttribute('rx', '0.8');
    visor.setAttribute('fill', '#0F172A');
    visor.setAttribute('stroke', '#00D4FF');
    visor.setAttribute('stroke-width', '0.2');
    head.appendChild(visor);
    
    // Olhos LED
    const eyeLeft = document.createElementNS(svgNS, 'circle');
    eyeLeft.setAttribute('cx', '-1.5');
    eyeLeft.setAttribute('cy', '-8.5');
    eyeLeft.setAttribute('r', '0.9');
    eyeLeft.setAttribute('fill', '#00D4FF');
    eyeLeft.setAttribute('filter', 'url(#glow-cyan)');
    eyeLeft.setAttribute('class', 'robot-eye');
    head.appendChild(eyeLeft);
    
    const eyeRight = document.createElementNS(svgNS, 'circle');
    eyeRight.setAttribute('cx', '1.5');
    eyeRight.setAttribute('cy', '-8.5');
    eyeRight.setAttribute('r', '0.9');
    eyeRight.setAttribute('fill', '#00D4FF');
    eyeRight.setAttribute('filter', 'url(#glow-cyan)');
    eyeRight.setAttribute('class', 'robot-eye');
    head.appendChild(eyeRight);
    
    // Antenas
    const antennaLeft = document.createElementNS(svgNS, 'g');
    antennaLeft.setAttribute('class', 'antenna-left');
    const antLeftLine = document.createElementNS(svgNS, 'line');
    antLeftLine.setAttribute('x1', '-3');
    antLeftLine.setAttribute('y1', '-12');
    antLeftLine.setAttribute('x2', '-4');
    antLeftLine.setAttribute('y2', '-15');
    antLeftLine.setAttribute('stroke', '#A855F7');
    antLeftLine.setAttribute('stroke-width', '0.4');
    antennaLeft.appendChild(antLeftLine);
    
    const antLeftTip = document.createElementNS(svgNS, 'circle');
    antLeftTip.setAttribute('cx', '-4');
    antLeftTip.setAttribute('cy', '-15.5');
    antLeftTip.setAttribute('r', '0.7');
    antLeftTip.setAttribute('fill', '#FBBF24');
    antLeftTip.setAttribute('filter', 'url(#glow-accent)');
    antLeftTip.setAttribute('class', 'antenna-tip');
    antennaLeft.appendChild(antLeftTip);
    head.appendChild(antennaLeft);
    
    const antennaRight = document.createElementNS(svgNS, 'g');
    antennaRight.setAttribute('class', 'antenna-right');
    const antRightLine = document.createElementNS(svgNS, 'line');
    antRightLine.setAttribute('x1', '3');
    antRightLine.setAttribute('y1', '-12');
    antRightLine.setAttribute('x2', '4');
    antRightLine.setAttribute('y2', '-15');
    antRightLine.setAttribute('stroke', '#A855F7');
    antRightLine.setAttribute('stroke-width', '0.4');
    antennaRight.appendChild(antRightLine);
    
    const antRightTip = document.createElementNS(svgNS, 'circle');
    antRightTip.setAttribute('cx', '4');
    antRightTip.setAttribute('cy', '-15.5');
    antRightTip.setAttribute('r', '0.7');
    antRightTip.setAttribute('fill', '#FBBF24');
    antRightTip.setAttribute('filter', 'url(#glow-accent)');
    antRightTip.setAttribute('class', 'antenna-tip');
    antennaRight.appendChild(antRightTip);
    head.appendChild(antennaRight);
    
    robot.appendChild(head);
    
    // ===== BRAÇOS MECÂNICOS =====
    // Braço esquerdo
    const armLeft = document.createElementNS(svgNS, 'g');
    armLeft.setAttribute('class', 'arm arm-left');
    armLeft.setAttribute('transform-origin', '-5 0');
    
    const shoulderLeft = document.createElementNS(svgNS, 'circle');
    shoulderLeft.setAttribute('cx', '-6');
    shoulderLeft.setAttribute('cy', '-1');
    shoulderLeft.setAttribute('r', '1.2');
    shoulderLeft.setAttribute('fill', 'url(#grad-metal)');
    armLeft.appendChild(shoulderLeft);
    
    const upperArmLeft = document.createElementNS(svgNS, 'rect');
    upperArmLeft.setAttribute('x', '-8');
    upperArmLeft.setAttribute('y', '-0.5');
    upperArmLeft.setAttribute('width', '3');
    upperArmLeft.setAttribute('height', '1');
    upperArmLeft.setAttribute('rx', '0.5');
    upperArmLeft.setAttribute('fill', 'url(#grad-body)');
    armLeft.appendChild(upperArmLeft);
    
    const handLeft = document.createElementNS(svgNS, 'circle');
    handLeft.setAttribute('cx', '-9');
    handLeft.setAttribute('cy', '0');
    handLeft.setAttribute('r', '1.3');
    handLeft.setAttribute('fill', '#FBBF24');
    handLeft.setAttribute('filter', 'url(#glow-accent)');
    handLeft.setAttribute('class', 'robot-hand');
    armLeft.appendChild(handLeft);
    
    robot.appendChild(armLeft);
    
    // Braço direito
    const armRight = document.createElementNS(svgNS, 'g');
    armRight.setAttribute('class', 'arm arm-right');
    armRight.setAttribute('transform-origin', '5 0');
    
    const shoulderRight = document.createElementNS(svgNS, 'circle');
    shoulderRight.setAttribute('cx', '6');
    shoulderRight.setAttribute('cy', '-1');
    shoulderRight.setAttribute('r', '1.2');
    shoulderRight.setAttribute('fill', 'url(#grad-metal)');
    armRight.appendChild(shoulderRight);
    
    const upperArmRight = document.createElementNS(svgNS, 'rect');
    upperArmRight.setAttribute('x', '5');
    upperArmRight.setAttribute('y', '-0.5');
    upperArmRight.setAttribute('width', '3');
    upperArmRight.setAttribute('height', '1');
    upperArmRight.setAttribute('rx', '0.5');
    upperArmRight.setAttribute('fill', 'url(#grad-body)');
    armRight.appendChild(upperArmRight);
    
    const handRight = document.createElementNS(svgNS, 'circle');
    handRight.setAttribute('cx', '9');
    handRight.setAttribute('cy', '0');
    handRight.setAttribute('r', '1.3');
    handRight.setAttribute('fill', '#FBBF24');
    handRight.setAttribute('filter', 'url(#glow-accent)');
    handRight.setAttribute('class', 'robot-hand');
    armRight.appendChild(handRight);
    
    robot.appendChild(armRight);
    
    return robot;
  }
  
  startAnimation() {
    this.animationLoop();
  }
  
  animationLoop() {
    if (!this.isAnimating) return;
    
    // Sequência de animação expandida para 12 ícones
    const steps = [
      { action: 'idle', duration: 1500 },
      // Primeiro grupo (4 ícones)
      { action: 'move', target: 0, duration: 800 },
      { action: 'automate', target: 0, duration: 600 },
      { action: 'move', target: 1, duration: 700 },
      { action: 'automate', target: 1, duration: 600 },
      { action: 'move', target: 2, duration: 700 },
      { action: 'automate', target: 2, duration: 600 },
      { action: 'move', target: 3, duration: 700 },
      { action: 'automate', target: 3, duration: 600 },
      // Segundo grupo (4 ícones)
      { action: 'move', target: 4, duration: 800 },
      { action: 'automate', target: 4, duration: 600 },
      { action: 'move', target: 5, duration: 700 },
      { action: 'automate', target: 5, duration: 600 },
      { action: 'move', target: 6, duration: 700 },
      { action: 'automate', target: 6, duration: 600 },
      { action: 'move', target: 7, duration: 700 },
      { action: 'automate', target: 7, duration: 600 },
      // Terceiro grupo (4 ícones)
      { action: 'move', target: 8, duration: 800 },
      { action: 'automate', target: 8, duration: 600 },
      { action: 'move', target: 9, duration: 700 },
      { action: 'automate', target: 9, duration: 600 },
      { action: 'move', target: 10, duration: 700 },
      { action: 'automate', target: 10, duration: 600 },
      { action: 'move', target: 11, duration: 700 },
      { action: 'automate', target: 11, duration: 600 },
      // Celebração
      { action: 'celebrate', duration: 2500 },
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
    if (!this.robot) return;
    
    // Animação de flutuação
    const floatAnimation = () => {
      if (!this.isAnimating) return;
      this.robot.style.transition = 'transform 2s ease-in-out';
    };
    floatAnimation();
    
    // Piscar olhos periodicamente
    const eyes = this.robot.querySelectorAll('.robot-eye');
    setTimeout(() => {
      eyes.forEach(eye => {
        eye.style.transition = 'r 0.1s ease';
        eye.setAttribute('r', '0.2');
        setTimeout(() => eye.setAttribute('r', '0.9'), 150);
      });
    }, 800);
  }
  
  moveRobotTo(icon) {
    if (!this.robot || !icon) return;
    
    // Calcular posição relativa ao centro
    const offsetX = icon.x - 50;
    const offsetY = icon.y - 40 + 12;
    
    this.robot.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    this.robot.setAttribute('transform', `translate(${icon.x}, ${icon.y + 12})`);
    
    // Animar braço direito levantando
    const armRight = this.robot.querySelector('.arm-right');
    if (armRight) {
      armRight.style.transition = 'transform 0.3s ease';
      armRight.style.transform = 'rotate(-25deg)';
    }
    
    // Olhos "olham" para o ícone
    const eyes = this.robot.querySelectorAll('.robot-eye');
    eyes.forEach(eye => {
      eye.setAttribute('fill', '#FBBF24');
    });
  }
  
  moveRobotToCenter() {
    if (!this.robot) return;
    
    this.robot.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    this.robot.setAttribute('transform', 'translate(50, 40)');
    
    // Resetar braços
    const arms = this.robot.querySelectorAll('.arm');
    arms.forEach(arm => {
      arm.style.transition = 'transform 0.4s ease';
      arm.style.transform = 'rotate(0deg)';
    });
    
    // Resetar olhos
    const eyes = this.robot.querySelectorAll('.robot-eye');
    eyes.forEach(eye => {
      eye.setAttribute('fill', '#00D4FF');
    });
  }
  
  automateIcon(iconIndex) {
    const icon = this.icons[iconIndex];
    const iconElement = this.svg.getElementById(icon.id);
    
    if (!iconElement) return;
    
    // Efeito de ativação
    iconElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
      iconElement.style.transform = 'scale(1)';
    }, 200);
    
    // Mudar estilo do ícone para "ativo"
    const circle = iconElement.querySelector('.icon-bg');
    if (circle) {
      circle.setAttribute('fill', `${icon.color}44`);
      circle.setAttribute('stroke', '#10B981');
      circle.setAttribute('stroke-width', '0.6');
    }
    
    // Ativar anel externo
    const outerRing = iconElement.querySelector('.outer-ring');
    if (outerRing) {
      outerRing.style.opacity = '1';
      outerRing.setAttribute('stroke', '#10B981');
      outerRing.style.animation = 'ringPulse 1s ease infinite';
    }
    
    // Mostrar badge de sucesso
    const badge = iconElement.querySelector('.status-badge');
    if (badge) {
      badge.style.opacity = '1';
      badge.style.transform = 'scale(1.2)';
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 200);
    }
    
    // Criar raio de energia do robô para o ícone
    this.createEnergyBeam(icon);
    
    // Criar partículas
    this.createMagicParticles(icon.x, icon.y, icon.color);
    
    // Animar robô
    const armRight = this.robot.querySelector('.arm-right');
    if (armRight) {
      armRight.style.transform = 'rotate(-45deg)';
      setTimeout(() => {
        armRight.style.transform = 'rotate(-25deg)';
      }, 200);
    }
    
    // Reactor core pulsa
    const reactor = this.robot.querySelector('.reactor-core');
    if (reactor) {
      reactor.setAttribute('fill', '#FBBF24');
      setTimeout(() => {
        reactor.setAttribute('fill', '#00D4FF');
      }, 300);
    }
    
    iconElement.setAttribute('data-activated', 'true');
  }
  
  createEnergyBeam(icon) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const robotPos = this.robot.getAttribute('transform').match(/translate\(([\d.]+),\s*([\d.]+)\)/);
    
    if (!robotPos) return;
    
    const rx = parseFloat(robotPos[1]);
    const ry = parseFloat(robotPos[2]);
    
    const beam = document.createElementNS(svgNS, 'line');
    beam.setAttribute('x1', rx);
    beam.setAttribute('y1', ry - 8);
    beam.setAttribute('x2', icon.x);
    beam.setAttribute('y2', icon.y);
    beam.setAttribute('stroke', icon.color);
    beam.setAttribute('stroke-width', '0.5');
    beam.setAttribute('filter', 'url(#glow-cyan)');
    beam.style.opacity = '0.8';
    beam.style.transition = 'opacity 0.5s ease';
    
    this.energyGroup.appendChild(beam);
    
    setTimeout(() => {
      beam.style.opacity = '0';
      setTimeout(() => beam.remove(), 500);
    }, 400);
  }
  
  createMagicParticles(x, y, color) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElementNS(svgNS, 'circle');
      const angle = (Math.PI * 2 / particleCount) * i;
      const distance = 4 + Math.random() * 6;
      
      particle.setAttribute('cx', x);
      particle.setAttribute('cy', y);
      particle.setAttribute('r', 0.3 + Math.random() * 0.4);
      particle.setAttribute('fill', i % 3 === 0 ? color : (i % 3 === 1 ? '#FBBF24' : '#10B981'));
      particle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      particle.style.opacity = '1';
      
      this.particlesGroup.appendChild(particle);
      
      requestAnimationFrame(() => {
        particle.setAttribute('cx', x + Math.cos(angle) * distance);
        particle.setAttribute('cy', y + Math.sin(angle) * distance);
        particle.style.opacity = '0';
        particle.setAttribute('r', '0.1');
      });
      
      setTimeout(() => particle.remove(), 800);
    }
  }
  
  robotCelebrate() {
    if (!this.robot) return;
    
    this.moveRobotToCenter();
    
    // Antenas piscam alternadamente
    const antennaTips = this.robot.querySelectorAll('.antenna-tip');
    let blink = true;
    const blinkInterval = setInterval(() => {
      antennaTips.forEach((tip, i) => {
        tip.setAttribute('fill', (blink ? i === 0 : i === 1) ? '#10B981' : '#FBBF24');
      });
      blink = !blink;
    }, 200);
    setTimeout(() => clearInterval(blinkInterval), 2000);
    
    // Olhos felizes
    const eyes = this.robot.querySelectorAll('.robot-eye');
    eyes.forEach(eye => {
      eye.setAttribute('fill', '#10B981');
    });
    setTimeout(() => {
      eyes.forEach(eye => eye.setAttribute('fill', '#00D4FF'));
    }, 2000);
    
    // Acenar braços
    const armLeft = this.robot.querySelector('.arm-left');
    const armRight = this.robot.querySelector('.arm-right');
    
    let wave = true;
    const waveInterval = setInterval(() => {
      if (armLeft) armLeft.style.transform = wave ? 'rotate(20deg)' : 'rotate(-10deg)';
      if (armRight) armRight.style.transform = wave ? 'rotate(-20deg)' : 'rotate(10deg)';
      wave = !wave;
    }, 200);
    setTimeout(() => {
      clearInterval(waveInterval);
      if (armLeft) armLeft.style.transform = 'rotate(0deg)';
      if (armRight) armRight.style.transform = 'rotate(0deg)';
    }, 2000);
    
    // Reactor core pulsa rapidamente
    const reactor = this.robot.querySelector('.reactor-core');
    let pulse = true;
    const pulseInterval = setInterval(() => {
      if (reactor) reactor.setAttribute('r', pulse ? '2' : '1.5');
      pulse = !pulse;
    }, 150);
    setTimeout(() => {
      clearInterval(pulseInterval);
      if (reactor) reactor.setAttribute('r', '1.5');
    }, 2000);
  }
  
  resetAnimation() {
    // Resetar todos os ícones
    this.icons.forEach(icon => {
      const iconElement = this.svg.getElementById(icon.id);
      if (iconElement) {
        const circle = iconElement.querySelector('.icon-bg');
        if (circle) {
          circle.setAttribute('fill', `${icon.color}22`);
          circle.setAttribute('stroke', icon.color);
          circle.setAttribute('stroke-width', '0.4');
        }
        
        const outerRing = iconElement.querySelector('.outer-ring');
        if (outerRing) {
          outerRing.style.opacity = '0.5';
          outerRing.setAttribute('stroke', icon.color);
          outerRing.style.animation = 'none';
        }
        
        const badge = iconElement.querySelector('.status-badge');
        if (badge) {
          badge.style.opacity = '0';
        }
        
        iconElement.setAttribute('data-activated', 'false');
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

// CSS adicional para animações
const robotStyles = document.createElement('style');
robotStyles.textContent = `
  .robot-animation-svg {
    filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.3));
  }
  
  .robot-eye {
    animation: eyeGlow 2s ease-in-out infinite;
  }
  
  @keyframes eyeGlow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .antenna-tip {
    animation: antennaBlink 1.5s ease-in-out infinite alternate;
  }
  
  @keyframes antennaBlink {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  
  .reactor-core {
    animation: reactorPulse 2s ease-in-out infinite;
  }
  
  @keyframes reactorPulse {
    0%, 100% { opacity: 1; r: 1.5; }
    50% { opacity: 0.8; r: 1.8; }
  }
  
  .platform-glow {
    animation: platformFloat 3s ease-in-out infinite;
  }
  
  @keyframes platformFloat {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.6; }
  }
  
  .energy-ring-0 {
    animation: ringExpand 2s ease-in-out infinite;
  }
  .energy-ring-1 {
    animation: ringExpand 2s ease-in-out infinite 0.3s;
  }
  .energy-ring-2 {
    animation: ringExpand 2s ease-in-out infinite 0.6s;
  }
  
  @keyframes ringExpand {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
  
  @keyframes ringPulse {
    0%, 100% { stroke-width: 0.3; }
    50% { stroke-width: 0.6; }
  }
  
  @keyframes orbitPulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
  }
  
  #robot {
    animation: robotFloat 4s ease-in-out infinite;
  }
  
  @keyframes robotFloat {
    0%, 100% { transform: translate(50px, 40px); }
    50% { transform: translate(50px, 38px); }
  }
`;
document.head.appendChild(robotStyles);

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('robot-animation-container');
  if (container) {
    window.robotAnimation = new RobotAnimation('robot-animation-container');
  }
});

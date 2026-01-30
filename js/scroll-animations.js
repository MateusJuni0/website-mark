/**
 * Scroll Animations - Intersection Observer
 * CM Tecnologia - Animações suaves no scroll
 */

class ScrollAnimations {
  constructor() {
    this.observers = [];
    this.init();
  }
  
  init() {
    // Observer para elementos com classe .animate-on-scroll
    this.createObserver('.animate-on-scroll', {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observer para elementos do hero
    this.createObserver([
      '.hero-automation__content',
      '.hero-automation__animation',
      '.hero-automation__metrics',
      '.hero-automation__usecases'
    ], {
      threshold: 0.2
    });
    
    // Observer para cards e métricas
    this.createObserver([
      '.hero-automation__metric',
      '.hero-automation__usecase',
      '.card',
      '.card-glass',
      '.channel-card',
      '.service-card',
      '.featured-card',
      '.pricing-card',
      '.testimonial-card',
      '.ebook-item',
      '.faq-item',
      '.marketing-seo-cta',
      '.websites-seo-cta'
    ], {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });
    
    // Observer para seções
    this.createObserver('section', {
      threshold: 0.1
    }, (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
    
    // Parallax sutil em elementos específicos
    this.initParallax();
    
    // Smooth reveal para textos
    this.initTextReveal();
  }
  
  createObserver(selectors, options, customCallback = null) {
    const callback = customCallback || ((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);
    
    // Converter para array se for string
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
    
    selectorArray.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
      });
    });
    
    this.observers.push(observer);
  }
  
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }
  
  initTextReveal() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    textElements.forEach(el => {
      const text = el.textContent;
      el.innerHTML = '';
      el.style.opacity = '1';
      
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.cssText = `
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          transition-delay: ${i * 0.03}s;
        `;
        el.appendChild(span);
      });
    });
    
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
        }
      });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => textObserver.observe(el));
    this.observers.push(textObserver);
  }
  
  // Counter animation para números
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  }
  
  // Método para limpar observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Micro-interações
class MicroInteractions {
  constructor() {
    this.init();
  }
  
  init() {
    this.initButtonRipple();
    this.initHoverTilt();
    this.initMagneticButtons();
    this.initSmoothScroll();
  }
  
  // Efeito ripple nos botões
  initButtonRipple() {
    document.querySelectorAll('.btn, button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Adicionar keyframes para ripple
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Efeito tilt em cards
  initHoverTilt() {
    document.querySelectorAll('[data-tilt], .card, .card-glass').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
  
  // Botões magnéticos
  initMagneticButtons() {
    document.querySelectorAll('.btn-primary, [data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  // Smooth scroll para links internos
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Progress bar no topo
class ScrollProgress {
  constructor() {
    this.progressBar = null;
    this.init();
  }
  
  init() {
    this.createProgressBar();
    this.updateProgress();
    
    window.addEventListener('scroll', () => this.updateProgress());
    window.addEventListener('resize', () => this.updateProgress());
  }
  
  createProgressBar() {
    // Verifica se já existe
    if (document.getElementById('scroll-progress')) {
      this.progressBar = document.getElementById('scroll-progress-bar');
      return;
    }
    
    const container = document.createElement('div');
    container.id = 'scroll-progress';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 9999;
    `;
    
    this.progressBar = document.createElement('div');
    this.progressBar.id = 'scroll-progress-bar';
    this.progressBar.style.cssText = `
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #7C3AED, #FBBF24);
      transition: width 0.1s ease;
    `;
    
    container.appendChild(this.progressBar);
    document.body.appendChild(container);
  }
  
  updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }
}

// Inicializar tudo
document.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimations = new ScrollAnimations();
  window.microInteractions = new MicroInteractions();
  window.scrollProgress = new ScrollProgress();
  
  // Adicionar classe visible aos elementos já visíveis na carga inicial
  setTimeout(() => {
    document.querySelectorAll('.hero-automation__content, .hero-automation__animation').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});

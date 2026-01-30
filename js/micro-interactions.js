/**
 * Micro Interactions - Efeitos Premium
 * CM Tecnologia - Interações sofisticadas
 */

// Esperar DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initTypingEffect();
  initCounterAnimation();
  initLazyImages();
  initSmoothReveal();
});

/**
 * Cursor Glow Effect
 * Glow suave que segue o cursor
 */
function initCursorGlow() {
  // Não executar em mobile
  if (window.innerWidth < 768) return;
  
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);
  
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
  
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/**
 * Typing Effect
 * Efeito de digitação para headlines
 */
function initTypingEffect() {
  const elements = document.querySelectorAll('[data-typing]');
  
  elements.forEach(el => {
    const text = el.textContent;
    const speed = parseInt(el.dataset.typingSpeed) || 50;
    el.textContent = '';
    el.style.borderRight = '2px solid #FBBF24';
    
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Remove cursor after typing
        setTimeout(() => {
          el.style.borderRight = 'none';
        }, 1000);
      }
    }
    
    // Start typing when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(el);
  });
}

/**
 * Counter Animation
 * Animação de números subindo
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter], .hero-automation__metric-value');
  
  const animateCounter = (el) => {
    const target = el.dataset.counter || el.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isMinus = target.includes('-');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    
    const update = () => {
      current += increment;
      if (current < numericValue) {
        let display = Math.floor(current);
        if (isPlus) display = '+' + display;
        if (isMinus) display = '-' + display;
        if (isPercentage) display += '%';
        el.textContent = display;
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    
    update();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

/**
 * Lazy Load Images
 * Carregamento preguiçoso de imagens
 */
function initLazyImages() {
  const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    imageObserver.observe(img);
  });
  
  // Add loaded class handler
  document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.style.opacity = '1';
    }
  }, true);
}

/**
 * Smooth Reveal
 * Revelação suave de elementos
 */
function initSmoothReveal() {
  const revealElements = document.querySelectorAll(
    '.hero-automation__usecase, ' +
    '.channel-card, ' +
    '.service-card, ' +
    '.ebook-card, ' +
    '.testimonial-card, ' +
    '.faq-item, ' +
    '[data-reveal]'
  );
  
  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  });
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Magnetic Hover Effect
 * Botões que "puxam" para o cursor
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .hero-automation__cta-primary');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Initialize magnetic buttons after a short delay
setTimeout(initMagneticButtons, 500);

/**
 * Scroll-triggered Header Transform
 * Header muda de estilo ao scrollar
 */
(function initScrollHeader() {
  const header = document.querySelector('.header, header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
})();

// Add CSS for scrolled header
const headerStyles = document.createElement('style');
headerStyles.textContent = `
  .header, header {
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  
  .header.scrolled, header.scrolled {
    background: rgba(10, 10, 15, 0.98) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }
  
  img.loaded {
    opacity: 1 !important;
  }
`;
document.head.appendChild(headerStyles);

console.log('✨ Micro interactions initialized');

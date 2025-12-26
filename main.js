// ===== MAIN.JS - Core Functionality =====

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
let mobileMenuOpen = false;

if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            nav.classList.add('mobile-menu-open');
        } else {
            nav.classList.remove('mobile-menu-open');
        }
    });
}

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOpen = false;
        nav.classList.remove('mobile-menu-open');
    });
});

// CTA Button click
document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Scroll to section functionality
document.querySelectorAll('[data-action="scroll-contact"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('[data-action="scroll-services"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Button click effects
document.querySelectorAll('.btn, .cta-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.visibility = 'visible';
        }
    });
}, observerOptions);


// Observe service cards, portfolio cards, etc. (MAS NÃO FAQ!)
document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(el => {
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});




// FAQ Accordion - Versão Simples e Funcional
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const faqItem = this.parentElement.closest('.faq-item');
        if (!faqItem) return;
        
        // Fechar todos os outros
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle o atual
        faqItem.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function () {
      const faqItem = this.closest('.faq-item');
      if (!faqItem) return;

      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) item.classList.remove('active');
      });

      faqItem.classList.toggle('active');
    });
  });
});






// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}




// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const countElements = entry.target.querySelectorAll('.stat-number');
            countElements.forEach(el => {
                const target = parseInt(el.dataset.count) || 0;
                animateCounter(el, target);
            });
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Prevent layout shift from scrollbar
function preventScrollbarShift() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
    }
}

preventScrollbarShift();
window.addEventListener('resize', preventScrollbarShift);

console.log('✅ Main.js loaded successfully');




    // Form Submission with Fetch API
  
  
// Form Submission with Fetch API - Versão Corrigida e Robusta
const formulario = document.getElementById('contactForm');

if (formulario) {
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Extrai os valores dos campos
    const name = document.querySelector('input[name="name"]')?.value?.trim() || '';
    const email = document.querySelector('input[name="email"]')?.value?.trim() || '';
    const phone = document.querySelector('input[name="phone"]')?.value?.trim() || '';
    const service = document.querySelector('select[name="service"]')?.value?.trim() || '';
    const message = document.querySelector('textarea[name="message"]')?.value?.trim() || '';

    // Validação 1: Campos Obrigatórios
    if (!name || !email || !message) {
      alert('❌ Por favor, preenche os campos obrigatórios:\n- Nome Completo\n- Email\n- Mensagem');
      return;
    }

    // Validação 2: Email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('❌ Email inválido. Por favor, insere um email correto.');
      return;
    }

    // Validação 3: Comprimento mínimo da mensagem
    if (message.length < 10) {
      alert('❌ A mensagem deve ter pelo menos 10 caracteres.');
      return;
    }

    // Prepara os dados para enviar
    const formData = {
      name,
      email,
      phone,
      service,
      message,
    };

    // Desativa o botão durante o envio
    const btnEnviar = formulario.querySelector('button[type="submit"]');
    const textOriginal = btnEnviar.textContent;
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    try {
      // Log para debug
      console.log('📤 Enviando formulário:', formData);

      // Faz o fetch
      const response = await fetch('/api/enviar-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Log do status
      console.log('📊 Status da resposta:', response.status);
      console.log('📋 Content-Type:', response.headers.get('content-type'));

      // Lê a resposta como texto primeiro
      const text = await response.text();
      console.log('📨 Resposta bruta:', text);

      // Verifica se a resposta está vazia
      if (!text) {
        throw new Error('Resposta vazia do servidor');
      }

      // Tenta fazer parse do JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('❌ Erro ao fazer parse do JSON:', parseError);
        console.error('Texto recebido:', text.slice(0, 200));
        throw new Error(`Resposta não é JSON válido: ${text.slice(0, 100)}`);
      }

      // Log do objeto parsado
      console.log('✅ Dados recebidos:', data);

      // Verifica se o envio foi bem-sucedido
      if (response.ok && data.success) {
        alert('✅ Email enviado com sucesso!\n\nEntraremos em contacto em breve.');
        formulario.reset();
      } else if (response.ok && !data.success) {
        alert('⚠️ ' + (data.message || data.error || 'Erro desconhecido ao enviar'));
      } else {
        alert('❌ Erro ' + response.status + ': ' + (data.error || data.message || 'Falha ao enviar'));
      }
    } catch (error) {
      console.error('🔴 Erro geral:', error);
      alert('❌ Erro ao enviar:\n' + error.message);
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = textOriginal;
    }
  });
} 


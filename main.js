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


// ===== GLOBAL MICRO-INTERACTION MANAGER =====
window.MicroUX = {
  active: null,
  lastShown: 0,
  cooldown: 8000, // 8s entre interações

  canShow(id) {
    const now = Date.now();

    if (this.active && this.active !== id) return false;
    if (now - this.lastShown < this.cooldown) return false;

    return true;
  },

  show(id, element) {
    if (!this.canShow(id)) return false;

    this.hideCurrent();
    element.hidden = false;

    this.active = id;
    this.lastShown = Date.now();
    return true;
  },

  hideCurrent() {
    if (!this.active) return;

    const el = document.querySelector(`[data-micro="${this.active}"]`);
    if (el) el.hidden = true;

    this.active = null;
  },

  close(id) {
    if (this.active === id) {
      this.hideCurrent();
    }
  }
};





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


const translations = {
    pt: {
        nav_ebooks: "Ebooks",
        ebooks_title: "Ebooks Gratuitos",
        ebooks_subtitle: "Conteúdo exclusivo para impulsionar seu conhecimento digital",
        ebook_btn: "Ler agora"
    },
    en: {
        nav_ebooks: "Ebooks",
        ebooks_title: "Free Ebooks",
        ebooks_subtitle: "Exclusive content to boost your digital knowledge",
        ebook_btn: "Read now"
    },
    es: {
        nav_ebooks: "Ebooks",
        ebooks_title: "Ebooks Gratuitos",
        ebooks_subtitle: "Contenido exclusivo para potenciar tu conocimiento digital",
        ebook_btn: "Leer ahora"
    }
};

let currentLang = localStorage.getItem("lang") || "pt";

function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    localStorage.setItem("lang", lang);
}

document.getElementById("lang-toggle").addEventListener("click", () => {
    if (currentLang === "pt") currentLang = "en";
    else if (currentLang === "en") currentLang = "es";
    else currentLang = "pt";
    applyLanguage(currentLang);
});

applyLanguage(currentLang);


// ===== SMART NUDGE (Tempo parado) =====
(function () {
  const nudge = document.getElementById("smartNudge");
  if (!nudge) return;

  let lastScrollTime = Date.now();
  let nudgeShown = false;

  function showNudge() {
    if (nudgeShown) return;
    MicroUX.show("smart-nudge", nudge);
    nudgeShown = true;

    // some sozinho depois de 10s
    setTimeout(() => {
  MicroUX.close("smart-nudge");
}, 10000);
}

  // Atualiza tempo de scroll
  window.addEventListener("scroll", () => {
    lastScrollTime = Date.now();
  });

  // Verifica inatividade
  setInterval(() => {
    const now = Date.now();
    const idleTime = now - lastScrollTime;

    // 6 segundos parado
    if (idleTime > 6000 && !nudgeShown) {
      showNudge();
    }
  }, 1000);
})();

// ===== SERVICE CARD TAP LOGIC (Mobile First) =====
(function () {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  const cards = document.querySelectorAll(".service-card");

  cards.forEach(card => {
    let tappedOnce = false;

    card.addEventListener("click", e => {
      const btn = card.querySelector(".btn");
      if (!btn) return;

      if (!tappedOnce) {
        e.preventDefault();

        // Remove estado ativo dos outros cards
        cards.forEach(c => c.classList.remove("is-active"));

        card.classList.add("is-active");
        tappedOnce = true;

        // Reset automático após 4s
        setTimeout(() => {
          card.classList.remove("is-active");
          tappedOnce = false;
        }, 4000);
      }
    });
  });
})();
// ===== PAGE PROGRESS LOGIC =====
(function () {
  const progressBar = document.getElementById("pageProgressBar");
  const progressHint = document.getElementById("progressHint");
  const progressCount = document.getElementById("progressCount");
  const progressTotal = document.getElementById("progressTotal");

  if (!progressBar || !progressHint) return;

  // Seções relevantes (ajuste se quiser)
  const sections = [
    "#home",
    "#services",
    "#ebooks",
    "#about",
    "#portfolio-featured",
    "#contact"
  ].map(sel => document.querySelector(sel)).filter(Boolean);

  progressTotal.textContent = sections.length;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";

    // Quantas seções já foram vistas
    let seen = 0;
    sections.forEach(section => {
      if (scrollTop + window.innerHeight * 0.6 >= section.offsetTop) {
        seen++;
      }
    });

    progressCount.textContent = seen;

    // Mostra hint só após a primeira seção
    if (seen > 1) {
      progressHint.hidden = false;
    }
  }

  window.addEventListener("scroll", updateProgress);
})();
// ===== CONTEXTUAL SCROLL SUGGESTION =====
(function () {
  const suggestion = document.getElementById("contextSuggestion");
  const topic = document.getElementById("contextTopic");
  const link = document.getElementById("contextLink");

  if (!suggestion || !topic || !link) return;

  let shown = false;
  let toggle = false;

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = scrollTop / docHeight;

    // Mostra a partir de 70%
    if (progress > 0.7 && !shown) {
      shown = true;
     MicroUX.show("context", suggestion);

      // Alterna entre ebooks e projetos
      if (toggle) {
        topic.textContent = "projetos";
        link.href = "#portfolio-featured";
      } else {
        topic.textContent = "ebooks";
        link.href = "#ebooks";
      }

      toggle = !toggle;

      // Some sozinho após 12s
      setTimeout(() => {
        suggestion.hidden = true;
      }, 12000);
    }
  }

  window.addEventListener("scroll", handleScroll);
})();

// ===== PROGRESSIVE CONTENT - SERVICES =====
(function () {
  const section = document.getElementById("services");
  const progressive = document.getElementById("servicesProgressive");

  if (!section || !progressive) return;

  let shown = false;

  function onScroll() {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight;

    // Quando o usuário já percorreu ~30% da seção
    if (!shown && scrollPos > sectionTop + sectionHeight * 0.3) {
      progressive.hidden = false;
      shown = true;
    }
  }

  window.addEventListener("scroll", onScroll);
})();
// ===== JOURNEY FEEDBACK LOGIC =====
(function () {
  const feedback = document.getElementById("journeyFeedback");
  const text = document.getElementById("journeyText");
  const link = document.getElementById("journeyLink");

  if (!feedback || !text || !link) return;

  const sections = {
    services: document.getElementById("services"),
    ebooks: document.getElementById("ebooks"),
    portfolio: document.getElementById("portfolio-featured")
  };

  let shown = false;

  function checkJourney() {
    const scrollPos = window.scrollY + window.innerHeight * 0.6;

    if (!shown && sections.services && scrollPos > sections.services.offsetTop) {
      MicroUX.show("journey", feedback);
      shown = true;

      // Decide o próximo passo
      if (sections.ebooks && scrollPos < sections.ebooks.offsetTop) {
        text.innerHTML = `
          <span data-lang="pt">Você já viu nossos serviços</span>
          <span data-lang="en" hidden>You have already seen our services</span>
          <span data-lang="es" hidden>Ya has visto nuestros servicios</span>
        `;
        link.href = "#ebooks";
      } else if (sections.portfolio && scrollPos < sections.portfolio.offsetTop) {
        text.innerHTML = `
          <span data-lang="pt">Que tal ver nossos ebooks?</span>
          <span data-lang="en" hidden>How about checking our ebooks?</span>
          <span data-lang="es" hidden>¿Qué tal ver nuestros ebooks?</span>
        `;
        link.href = "#portfolio-featured";
      }
    }
  }

  window.addEventListener("scroll", checkJourney);
})();


// ===== BEHAVIORAL ADAPTATION (MOBILE-FIRST) =====
(function () {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  let interactionCount = 0;
  let lastInteractionTime = 0;

  function registerInteraction() {
    interactionCount++;
    lastInteractionTime = Date.now();
  }

  // Registra interações relevantes
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", registerInteraction);
  });

  // Controla exibição de elementos flutuantes
  function shouldShow() {
    const now = Date.now();

    // Se o usuário já interagiu bastante, reduz estímulos
    if (interactionCount >= 4) return false;

    // Evita estímulos muito próximos
    if (now - lastInteractionTime < 8000) return false;

    return true;
  }

  // Exemplo: controla feedback de jornada
  const journey = document.getElementById("journeyFeedback");
  if (journey) {
    const originalShow = journey.hidden;

    window.addEventListener("scroll", () => {
      if (!shouldShow()) {
        journey.hidden = true;
      }
    });
  }

})();

document.addEventListener("click", e => {
  if (e.target.classList.contains("micro-close")) {
    const box = e.target.closest("[data-micro]");
    if (!box) return;

    const id = box.getAttribute("data-micro");
    MicroUX.close(id);
  }
}); 


// ===== SIGNATURE GLOW INTERACTION =====
(function () {
  const elements = document.querySelectorAll(".signature-glow");
  if (!elements.length) return;

  let ticking = false;

  function updateGlow(e) {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();

      // ativa só se estiver visível
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-active");

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        el.style.setProperty("--glow-x", `${x}%`);
        el.style.setProperty("--glow-y", `${y}%`);
      } else {
        el.classList.remove("is-active");
      }
    });

    ticking = false;
  }

  // Desktop: mouse
  window.addEventListener("mousemove", e => {
    if (!ticking) {
      window.requestAnimationFrame(() => updateGlow(e));
      ticking = true;
    }
  });

  // Mobile: toque
  window.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    if (!touch) return;

    if (!ticking) {
      window.requestAnimationFrame(() =>
        updateGlow({ clientX: touch.clientX, clientY: touch.clientY })
      );
      ticking = true;
    }
  });
})();

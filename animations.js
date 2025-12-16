// ===== ANIMATIONS.JS - Scroll Effects & Advanced Animations =====

// Parallax effect on hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroBackground = hero.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// Fade-in animation on scroll
const fadeInElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .faq-item');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(el => {
    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        fadeInObserver.observe(el);
    });
});

// Service card hover animation enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Portfolio card zoom effect
document.querySelectorAll('.portfolio-card').forEach(card => {
    const image = card.querySelector('.portfolio-image');
    
    card.addEventListener('mouseenter', function() {
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Add transition to portfolio image
document.querySelectorAll('.portfolio-image').forEach(img => {
    img.style.transition = 'transform 0.3s ease-out';
});

// Testimonial card animation
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const avatar = this.querySelector('.author-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const avatar = this.querySelector('.author-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// Add transition to avatars
document.querySelectorAll('.author-avatar').forEach(avatar => {
    avatar.style.transition = 'transform 0.3s ease-out';
});

// WhatsApp button pulse animation
const whatsappButton = document.getElementById('whatsappButton');
if (whatsappButton) {
    whatsappButton.style.animation = 'pulse 2s infinite';
    
    whatsappButton.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
    });
    
    whatsappButton.addEventListener('mouseleave', function() {
        this.style.animation = 'pulse 2s infinite';
    });
}

// Scroll reveal for about section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutImage = aboutSection.querySelector('.about-image-placeholder');
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.revealed) {
                entry.target.dataset.revealed = 'true';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            }
        });
    }, { threshold: 0.2 });
    
    if (aboutImage) {
        aboutObserver.observe(aboutImage);
    }
}

// Stagger animation for hero content
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroDescription = document.querySelector('.hero-description');
const heroCtas = document.querySelector('.hero-ctas');
const heroProof = document.querySelector('.hero-social-proof');

if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.6s ease-out 0.1s backwards';
if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.6s ease-out 0.2s backwards';
if (heroDescription) heroDescription.style.animation = 'fadeInUp 0.6s ease-out 0.3s backwards';
if (heroCtas) heroCtas.style.animation = 'fadeInUp 0.6s ease-out 0.4s backwards';
if (heroProof) heroProof.style.animation = 'fadeInUp 0.6s ease-out 0.5s backwards';

// Button hover glow effect
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.5)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Smooth scroll on page load to remove hash
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// Add floating animation to service icons
document.querySelectorAll('.service-icon').forEach((icon, index) => {
    const delay = index * 0.1;
    icon.style.animation = `float 3s ease-in-out ${delay}s infinite`;
});

// Create float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatStyle);

// Intersection Observer for section titles
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section-title, .section-subtitle').forEach(title => {
    title.style.opacity = '1';  // Mude de '0' para '1'
    title.style.visibility = 'visible';  // ADICIONE esta linha
    titleObserver.observe(title);
});


// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.style.position = 'fixed';
    progress.style.top = '0';
    progress.style.left = '0';
    progress.style.height = '3px';
    progress.style.backgroundColor = 'var(--primary)';
    progress.style.zIndex = '1001';
    progress.style.transition = 'width 0.1s ease-out';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progress.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const nav = document.getElementById('nav');
        if (nav && nav.style.display === 'flex') {
            nav.style.display = '';
        }
    }
});

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
}

console.log('Animations.js loaded successfully');

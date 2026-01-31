/**
 * FAQ Interactive Script v2.0
 * Funcionalidades: expandir/colapsar, pesquisa, categorias
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todos os outros
            faqItems.forEach(item => item.classList.remove('active'));
            
            // Toggle do atual
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ===== CATEGORY FILTERING =====
    const categoryButtons = document.querySelectorAll('.faq-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
            
            // Close all when switching categories
            faqItems.forEach(item => item.classList.remove('active'));
        });
    });

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let hasResults = false;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
            
            // Reset category filter when searching
            if (searchTerm.length > 0) {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
            } else {
                // Restore "all" category when search is cleared
                categoryButtons[0].classList.add('active');
            }
            
            // Show "no results" message (optional)
            const noResults = document.querySelector('.faq-no-results');
            if (!hasResults && searchTerm.length > 0) {
                if (!noResults) {
                    const message = document.createElement('div');
                    message.className = 'faq-no-results';
                    message.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 40px;">Nenhuma pergunta encontrada. Tente outro termo.</p>';
                    document.querySelector('.faq-container').appendChild(message);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    }

    // ===== SMOOTH SCROLL TO FAQ =====
    const faqLinks = document.querySelectorAll('a[href="#faq"]');
    
    faqLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('faq').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        });
    });

    // ===== ANALYTICS TRACKING (Optional) =====
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', () => {
            // Track which questions are most clicked
            if (typeof gtag !== 'undefined') {
                gtag('event', 'faq_interaction', {
                    'question_index': index,
                    'question_text': question.querySelector('span').textContent
                });
            }
            
            // Console log for debugging
            console.log('FAQ clicked:', question.querySelector('span').textContent);
        });
    });

    // ===== KEYBOARD NAVIGATION =====
    faqQuestions.forEach((question, index) => {
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
            
            // Arrow navigation
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextQuestion = faqQuestions[index + 1];
                if (nextQuestion) nextQuestion.focus();
            }
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevQuestion = faqQuestions[index - 1];
                if (prevQuestion) prevQuestion.focus();
            }
        });
    });
    
    // ===== AUTO-EXPAND FIRST FAQ ON LOAD (Optional) =====
    // Uncomment to auto-open first question
    // if (faqItems[0]) {
    //     faqItems[0].classList.add('active');
    // }
    
    console.log('FAQ Interactive loaded:', faqItems.length, 'questions');
});

// ===== WHATSAPP CTA TRACKING =====
document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-cta-button')) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'source': 'faq_section'
            });
        }
        console.log('WhatsApp clicked from FAQ');
    }
});

// ===== URL HASH HANDLING =====
// Auto-open FAQ item if URL has hash like #faq-pricing
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash.startsWith('#faq-')) {
        const category = hash.replace('#faq-', '');
        const categoryButton = document.querySelector(`[data-category="${category}"]`);
        if (categoryButton) {
            categoryButton.click();
        }
    }
});
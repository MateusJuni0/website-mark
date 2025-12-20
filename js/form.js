// ===== FORM.JS - Form Validation & Submission =====

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Form validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 9;
    };

    const validateForm = () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        const errors = [];

        if (!name || name.length < 3) {
            errors.push('Nome deve ter pelo menos 3 caracteres');
        }

        if (!email || !validateEmail(email)) {
            errors.push('Email inválido');
        }

        if (!phone || !validatePhone(phone)) {
            errors.push('Telefone inválido');
        }

        if (!service) {
            errors.push('Selecione um serviço');
        }

        if (!message || message.length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres');
        }

        return { isValid: errors.length === 0, errors };
    };

    // Show error messages
    const showErrors = (errors) => {
        // Remove previous error messages
        const existingErrors = contactForm.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());

        if (errors.length > 0) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'form-error';
            errorContainer.style.cssText = `
                background-color: #FEE2E2;
                border: 1px solid #FECACA;
                color: #DC2626;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
            `;

            const errorList = document.createElement('ul');
            errorList.style.cssText = 'margin: 0; padding-left: 1.5rem;';

            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                li.style.marginBottom = '0.5rem';
                errorList.appendChild(li);
            });

            errorContainer.appendChild(errorList);
            contactForm.insertBefore(errorContainer, contactForm.firstChild);
        }
    };

    // Show success message
    const showSuccess = () => {
        // Remove previous messages
        const existingMessages = contactForm.querySelectorAll('.form-error, .form-success');
        existingMessages.forEach(msg => msg.remove());

        const successContainer = document.createElement('div');
        successContainer.className = 'form-success';
        successContainer.style.cssText = `
            background-color: #DCFCE7;
            border: 1px solid #BBFBDC;
            color: #16A34A;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            animation: slideInUp 0.4s ease-out;
        `;

        successContainer.innerHTML = `
            <strong>✅ Sucesso!</strong><br>
            Obrigado! Entraremos em contato em 24 horas.
        `;

        contactForm.insertBefore(successContainer, contactForm.firstChild);

        // Clear form
        contactForm.reset();

        // Scroll to success message
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Remove success message after 5 seconds
        setTimeout(() => {
            successContainer.style.animation = 'fadeOut 0.4s ease-out';
            setTimeout(() => successContainer.remove(), 400);
        }, 5000);
    };

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        const { isValid, errors } = validateForm();

        if (!isValid) {
            showErrors(errors);
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Send form data to backend using tRPC
            const response = await fetch('/api/trpc/contact.submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    json: formData,
                    meta: { values: [formData] }
                })
            });

            const data = await response.json();

            // Check if response is successful
            if (response.ok && data.result && data.result.data) {
                showSuccess();
            } else {
                const errorMsg = data.result?.error?.message || 'Erro ao enviar formulário. Tente novamente.';
                showErrors([errorMsg]);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showErrors(['Erro ao enviar formulário. Verifique sua conexão.']);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const { isValid, errors } = validateForm();
            if (!isValid) {
                input.style.borderColor = '#DC2626';
            } else {
                input.style.borderColor = '';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = '';
        });
    });

    // Add fade out animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// Add keyboard navigation to FAQ
document.querySelectorAll('.faq-question').forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextButton = document.querySelectorAll('.faq-question')[index + 1];
            if (nextButton) nextButton.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevButton = document.querySelectorAll('.faq-question')[index - 1];
            if (prevButton) prevButton.focus();
        }
    });
});

console.log('Form.js loaded successfully');

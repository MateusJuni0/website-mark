/**
 * Back to Top Button - CM Tecnologia
 * Botão elegante para voltar ao topo
 */

(function() {
  // Criar botão
  const button = document.createElement('button');
  button.id = 'backToTop';
  button.setAttribute('aria-label', 'Voltar ao topo');
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  
  // Estilos
  const styles = document.createElement('style');
  styles.textContent = `
    #backToTop {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 998;
    }
    
    #backToTop.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    #backToTop:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    }
    
    #backToTop:active {
      transform: translateY(0);
    }
    
    #backToTop svg {
      transition: transform 0.3s ease;
    }
    
    #backToTop:hover svg {
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      #backToTop {
        bottom: 80px;
        right: 16px;
        width: 44px;
        height: 44px;
      }
    }
  `;
  
  document.head.appendChild(styles);
  document.body.appendChild(button);
  
  // Mostrar/esconder baseado no scroll
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          button.classList.add('visible');
        } else {
          button.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Ação de clique
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();

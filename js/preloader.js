/**
 * Preloader - CM Tecnologia
 * Loading animation premium
 */

(function() {
  // Criar preloader
  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="preloader-logo">
        <img src="/img/Logo3d.png" alt="C&M Tecnologia" onerror="this.style.display='none'">
      </div>
      <div class="preloader-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div class="preloader-text">A carregar...</div>
    </div>
  `;
  
  // Estilos do preloader
  const styles = document.createElement('style');
  styles.textContent = `
    #preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    #preloader.hidden {
      opacity: 0;
      visibility: hidden;
    }
    
    .preloader-content {
      text-align: center;
    }
    
    .preloader-logo {
      margin-bottom: 30px;
    }
    
    .preloader-logo img {
      height: 60px;
      width: auto;
      filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.5));
      animation: logoPulse 2s ease-in-out infinite;
    }
    
    @keyframes logoPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
    
    .preloader-spinner {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
    }
    
    .spinner-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3px solid transparent;
    }
    
    .spinner-ring:nth-child(1) {
      border-top-color: #7C3AED;
      animation: spinRing 1.5s linear infinite;
    }
    
    .spinner-ring:nth-child(2) {
      border-right-color: #FBBF24;
      animation: spinRing 1.5s linear infinite 0.2s;
    }
    
    .spinner-ring:nth-child(3) {
      border-bottom-color: #A855F7;
      animation: spinRing 1.5s linear infinite 0.4s;
    }
    
    @keyframes spinRing {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .preloader-text {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  `;
  
  // Inserir no DOM
  document.head.appendChild(styles);
  document.body.prepend(preloader);
  
  // Esconder preloader quando a página carregar
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      
      // Remover do DOM após a transição
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 800); // Tempo mínimo de exibição
  });
  
  // Fallback: esconder após 5 segundos mesmo se não carregar
  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }
  }, 5000);
})();

document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("lang-toggle");
    if (!langBtn) return;
    const titles = {
  pt: "C&M Tecnologia — Agência Digital Profissional",
  en: "C&M Technology — Professional Digital Agency"
};

function updateTitle(lang) {
  document.title = titles[lang] || titles.pt;
}

   
     let currentLang = localStorage.getItem("lang") || "pt";

  function applyLang(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });

    document.title = titles[lang] || titles.pt;
    localStorage.setItem("lang", lang);
  }

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    applyLang(currentLang);
  });

  applyLang(currentLang);

  
 const translations = {
        pt: {
            ebooks_title: "Ebooks Gratuitos",
            ebooks_subtitle: "Conteúdo exclusivo para impulsionar seu conhecimento digital",
            ebook_btn: "Ler agora"
        },
        en: {
            ebooks_title: "Free Ebooks",
            ebooks_subtitle: "Exclusive content to boost your digital knowledge",
            ebook_btn: "Read now"
        },
        es: {
            ebooks_title: "Ebooks Gratuitos",
            ebooks_subtitle: "Contenido exclusivo para potenciar tu conocimiento digital",
            ebook_btn: "Leer ahora"
        }
    };

    
});

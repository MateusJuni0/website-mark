document.addEventListener("DOMContentLoaded", () => {
  const ebookItems = document.querySelectorAll(".ebook-item");

  if (!ebookItems.length) return;

  /* ==========================
     1. ENTRADA AO SCROLL
  ========================== */

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ebook-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  ebookItems.forEach(item => {
    item.classList.add("ebook-hidden");
    observer.observe(item);
  });

  /* ==========================
     2. HOVER DIRECIONAL (DESKTOP)
  ========================== */

  ebookItems.forEach(card => {
    card.addEventListener("mousemove", e => {
      if (window.innerWidth < 1024) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 30;
      const moveY = (y - centerY) / 30;

      card.style.transform = `translateY(-4px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ==========================
     3. FEEDBACK NO CLIQUE
  ========================== */

  document.querySelectorAll(".ebook-cta").forEach(btn => {
    btn.addEventListener("click", e => {
      btn.classList.add("ebook-loading");

      setTimeout(() => {
        btn.classList.remove("ebook-loading");
      }, 300);
    });
  });
});

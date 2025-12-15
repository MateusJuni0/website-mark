- Links rápidos (centro)
- Contato (direita)
- Social icons (rodapé)
- Copyright

**Elementos**:
```
Logo (branco) | Tagline
─────────────────────────
Home | Serviços | Portfólio | Contato | Política

Email: cmtecnologia12@gmail.com
Telefone: +351 961 227 666

[Instagram] [LinkedIn] [GitHub] [Facebook]

© 2025 C&M Tecnologia. Todos direitos reservados.
```

**Animações Footer**:
- Links hover: cor muda para verde/amarelo
- Social icons com hover scale
- Newsletter input com focus effect

---

## ✨ ANIMAÇÕES GLOBAIS OBRIGATÓRIAS

```
✅ Ao Scroll:
   - Fade-in com slide-up (cards, sections)
   - Parallax leve no background
   - Contador de números (0 → final)

✅ Ao Hover:
   - Buttons: cor mais intensa + elevation
   - Links: cor primária (violeta)
   - Cards: zoom leve (1.05x)
   - Ícones: rotação ou scale

✅ Ao Click:
   - Ripple effect (ondas)
   - Scale animation (0.95x → 1x)
   - Loading spinner

✅ Page Load:
   - Fade-in de elementos principal
   - Stagger effect (aparecem em sequência)
   - Smooth scroll no topo

✅ Dark Mode:
   - Transição suave (300ms)
   - Não flicker
   - Todos cores mantêm contrast
```

---

## 📱 RESPONSIVIDADE - BREAKPOINTS

```
Mobile: 320px - 767px
- Stacks vertical (1 coluna)
- Hero: 500px altura
- Fonte 10-15% menor
- Padding reduzido 50%
- Botões: 44x44px mínimo
- Menu: Hamburguer

Tablet: 768px - 1023px
- 2 colunas
- Hero: 550px
- Fonte normal

Desktop: 1024px+
- 2-3 colunas
- Hero: 700px
- Full experience
```

**Obrigatório Testar**:
- ✅ iPhone SE (375px)
- ✅ iPhone 12 (390px)
- ✅ iPad (768px)
- ✅ Desktop (1920px)
- ✅ Ultra-wide (2560px)

---

## ⚡ PERFORMANCE (CRÍTICO)

```
⚡ Tempo Total: < 3 segundos
⚡ First Contentful Paint: < 1.5s
⚡ Largest Contentful Paint: < 2.5s
⚡ Cumulative Layout Shift: < 0.1

Otimizações:
✅ Imagens: WebP + PNG fallback
✅ Lazy loading (lazy="loading" em img)
✅ CSS minificado
✅ JS minificado
✅ Cache browser ativado
✅ SVGs para ícones (não PNGs)
✅ Google Fonts otimizadas

Teste com: Google PageSpeed Insights (Score > 80)
```

---

## 🔍 SEO BÁSICO

```
✅ H1 único por página
✅ Meta descriptions (155-160 chars)
✅ Alt text em TODAS imagens
✅ URLs amigáveis (slug format)
✅ Internal linking (3-5 links/página)
✅ Sitemap.xml (auto-generated)
✅ Robots.txt
✅ Schema.org markup (LocalBusiness, Organization)
✅ Open Graph tags (social sharing)
✅ Mobile-friendly (responsive)
✅ HTTPS obrigatório
✅ Structured data JSON-LD
```

---

## 🛡️ SEGURANÇA

```
✅ SSL/HTTPS ativado
✅ Validação inputs (cliente + servidor)
✅ CAPTCHA no formulário (reCAPTCHA v3)
✅ Política de Privacidade escrita
✅ Backup automático
✅ XSS protection
✅ CSRF tokens
```

---

## 📊 ANALYTICS

```
✅ Google Analytics 4 instalado
✅ Tag Manager configurado
✅ CTAs rastreadas (button clicks)
✅ Form submission rastreado
✅ Page views e scroll depth
✅ Goals:
   - Form submit ✅
   - CTA click (Solicitar Orçamento) ✅
   - Página sucesso ✅
```

---

## 💻 TECNOLOGIA & DEPLOYMENT

**Stack Obrigatório**:
```
Frontend: HTML5 + CSS3 + JavaScript ES6+
- Vanilla JS (SEM jQuery, Vue, React, Angular)
- CSS puro (SEM Tailwind, Bootstrap)
- HTML semântico

Backend (Opcional - só se usar):
- Node.js + Express (para formulário/email)
- Firebase/Supabase (para contactos)

Hospedagem: Vercel
- Deploy automático
- URL temporária: c-m-tech.vercel.app
- Domínio customizado via CNAME

Versionamento: GitHub
- Código limpo
- Commits organizados
- README detalhado
```

**Por que HTML puro?**:
```
✅ Cliente tem acesso 100% ao código
✅ Pode modificar sempre que quiser
✅ Sem dependência de ferramentas/subscripção
✅ Transferível para outro dev
✅ Qualquer hospedagem funciona
✅ Performance máxima
```

---

## 📦 ENTREGA FINAL

**Cliente Vai Receber**:

1. ✅ **Código Completo**
   - GitHub repo ou ZIP file
   - Estrutura limpa e organizada
   - CSS/JS comentado

2. ✅ **Documentação**
   - README.md com instruções
   - Guia de customização
   - Passos para deploiar

3. ✅ **Site Ao Vivo**
   - URL Vercel (temporária): https://c-m-tech.vercel.app
   - Funcional 100%
   - Mobile tested

4. ✅ **Acesso Completo**
   - GitHub credentials
   - Vercel credentials
   - Analytics credentials

5. ✅ **Instruções Domínio**
   - Como apontar domínio próprio (CNAME)
   - Como fazer deploy local
   - Como modificar código

---

## 🎯 ESTRUTURA PASTAS

```
projeto/
├── index.html (home)
├── css/
│   ├── styles.css (main)
│   ├── responsive.css (mobile)
│   └── dark-mode.css (themes)
├── js/
│   ├── main.js (logic)
│   ├── animations.js (scroll effects)
│   ├── dark-mode.js (toggle)
│   └── form.js (validation + submit)
├── img/
│   ├── logo.svg
│   ├── hero/
│   ├── services/
│   ├── portfolio/ (fake images)
│   └── testimonials/ (fake images)
├── assets/
│   └── icons/ (SVGs)
├── README.md
└── .gitignore
```

---

## ✅ CHECKLIST ENTREGA

### Funcionalidade
- [ ] Menu funciona (desktop + mobile)
- [ ] Dark mode toggle funciona
- [ ] Botão WhatsApp funciona (abre app)
- [ ] Formulário valida + envia
- [ ] Links internos funcionam
- [ ] Scroll suave funciona
- [ ] Animações rodam sem lag

### Design
- [ ] Cores consistentes (Violeta, Verde, Amarelo)
- [ ] Tipografia Montserrat + Inter
- [ ] Spacing uniforme
- [ ] Dark mode pronto
- [ ] Menu flutuante bonito
- [ ] Botões todos violeta

### Mobile
- [ ] Testado iPhone 375px
- [ ] Testado iPad 768px
- [ ] Testado Desktop 1920px
- [ ] Touch-friendly
- [ ] Sem horizontal scroll

### Performance
- [ ] < 3 segundos load
- [ ] Imagens otimizadas
- [ ] PageSpeed > 80
- [ ] Sem console errors

### SEO
- [ ] Meta descriptions
- [ ] Alt text imagens
- [ ] H1 único
- [ ] Sitemap criado
- [ ] Robots.txt criado

### Segurança
- [ ] HTTPS funciona
- [ ] Form validado
- [ ] CAPTCHA funciona
- [ ] Sem vulnerabilidades

---

## 📝 NOTAS IMPORTANTES

1. ⚠️ **IMAGENS SÃO FAKE AGORA**
   - Cliente vai substituir depois
   - Use placeholder images (unsplash.com)
   - Mantenha dimensões ideais

2. ⚠️ **TESTEMUNHOS SÃO FAKE**
   - 3 fake reviews (nomes genéricos)
   - Foto fake (avatar generator)
   - Cliente substitui depois

3. ⚠️ **CASE STUDIES SÃO FAKE**
   - 3 fake projects
   - Screenshots fake (mockup gerador)
   - Cliente substitui depois

4. ✅ **NÃO USE NOME "MATEUS"**
   - Cliente NÃO quer seu nome no site
   - Mantenha genérico (agência)
   - "C&M Tecnologia" apenas

5. ✅ **TECH STACK OBRIGATÓRIO**
   - HTML5 puro + CSS3 puro + JavaScript ES6+
   - SEM frameworks, SEM builders
   - Cliente quer código puro

6. ✅ **MOBILE FIRST**
   - Tudo deve funcionar perfeito no mobile
   - Botões min 44x44px
   - Gestos/swipes suportados

7. ✅ **ANIMAÇÕES FLUIDAS**
   - Hardware acceleration (transform, opacity)
   - 60fps suave
   - Não usar timing functions lineares

8. ✅ **DARK MODE PREMIUM**
   - Toggle persistente
   - Transições suaves
   - Todas cores legíveis

9. ✅ **MENU FLUTUANTE BONITO**
   - Design diferente (não genérico)
   - Sticky ao scroll
   - Elegante

10. ✅ **WHATSAPP BUTTON**
    - Sempre visível (fixed)
    - Verde #25D366
    - Pulse animation
    - Link funciona

---

## 🚀 COMO COMEÇAR

**Pré-requisitos**:
- Node.js + npm (para ferramentas)
- Git + GitHub
- Vercel account

**Passos**:
1. Clone repo template HTML5
2. Crie estrutura (css/, js/, img/, assets/)
3. Desenvolva mobile-first
4. Testes em múltiplos devices
5. Optimize performance
6. Push GitHub
7. Deploy Vercel
8. Entrega cliente

---

## 📞 CONTATO PARA DÚVIDAS

**Projeto**: C&M Tecnologia Website
**Email**: cmtecnologia12@gmail.com
**WhatsApp**: +351 961 227 666

---

**Status**: ✅ PRONTO PARA DESENVOLVIMENTO IMEDIATO

**Pré-requisitos**:
- ✅ Desenvolvimento em HTML5 + CSS3 + JavaScript puro
- ✅ Mobile-first design
- ✅ Animações fluidas
- ✅ Dark mode otimizado
- ✅ Menu flutuante bonito
- ✅ Botão WhatsApp com animation
- ✅ Todos botões violeta
- ✅ Imagens/testemunhos/cases fake (cliente substitui depois)
- ✅ Hospedagem em Vercel
- ✅ Código 100% acessível ao cliente

**Próximos Passos**:
1. Dev começa com esta spec
2. Cliente acompanha desenvolvimento
3. Deploy em Vercel quando pronto
4. Cliente recebe código + acesso
5. Cliente customiza com dados reais depois

---

**FINAL NOTE PARA O DESENVOLVEDOR**: 

Este site é para uma agência digital que vai usá-lo como vitrine para atrair clientes. Deve ser IMPECÁVEL: design top, animações fluidas, mobile perfeito, e performance máxima. O cliente vai reutilizar este site como exemplo para seus próprios clientes - literalmente seu portfolio é seu cartão de visita. Faça com excelência!

✨ **Vamos criar algo extraordinário!** ✨

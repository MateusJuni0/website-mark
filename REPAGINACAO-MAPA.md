# 🎨 Repaginação CM Tecnologia - Mapeamento Completo v2

## 🎯 Objetivo
Transformar cmtecnologia.pt num site premium (valor percebido 80k USD) com:
- Visual moderno e profissional
- Foco em **Automação com IA** como serviço principal
- Micro-interações sofisticadas
- Animação de robô interativa

---

## 🎨 Design System Final

### Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| **Violeta** | `#7C3AED` | Cor principal do site |
| **Amarelo Vibrante** | `#FBBF24` | Botões/CTAs com efeito espelhamento |
| **Preto** | `#0F0F0F` | Backgrounds, elementos secundários |
| **Branco** | `#FFFFFF` | Texto, contraste |

### Efeito Amarelo Premium
```css
/* Botão com espelhamento/brilho */
.btn-premium {
  background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #FBBF24 100%);
  box-shadow: 
    0 0 20px rgba(251, 191, 36, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  /* Efeito de brilho passando */
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

### Background 3D Galáxia
- Canvas com partículas flutuantes (violeta/branco)
- Gradiente de fundo: preto → violeta escuro
- Profundidade e movimento suave
- Igual ao Fina Estampa, adaptado para as cores CM

---

## 🤖 SEÇÃO 1: Automação com IA (HERO PRINCIPAL)

### Posição: PRIMEIRA do site (substitui marketing-hero)

### Layout Visual
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ████████████████████████████████████████████████████████  │
│  █                                                        █  │
│  █   [Background 3D Galáxia - Partículas Violeta]        █  │
│  █                                                        █  │
│  █        🤖 Automação Inteligente                       █  │
│  █           com IA                                       █  │
│  █                                                        █  │
│  █   "Liberte a sua equipa para o que realmente          █  │
│  █    importa. A IA trata do resto."                     █  │
│  █                                                        █  │
│  █   [████ AGENDAR DEMONSTRAÇÃO ████] ← Amarelo brilho   █  │
│  █                                                        █  │
│  █   ┌─────────────────────────────────────────────┐     █  │
│  █   │                                             │     █  │
│  █   │   🤖 ──→ 📧 ──→ 💬 ──→ 📊 ──→ ✅          │     █  │
│  █   │   [ANIMAÇÃO DO ROBÔ AUTOMATIZANDO]         │     █  │
│  █   │                                             │     █  │
│  █   └─────────────────────────────────────────────┘     █  │
│  █                                                        █  │
│  █   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐     █  │
│  █   │  -80%  │  │  24/7  │  │  +300% │  │   0    │     █  │
│  █   │ Tempo  │  │ Ativo  │  │  ROI   │  │ Erros  │     █  │
│  █   └────────┘  └────────┘  └────────┘  └────────┘     █  │
│  █                                                        █  │
│  ████████████████████████████████████████████████████████  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 🤖 Animação do Robô (Detalhe Técnico)

**Conceito:** Robô fofo/moderno que vai automatizando tarefas visualmente

**Fluxo da Animação:**
```
1. Robô aparece no centro
2. Move-se até ícone de EMAIL 📧
3. "Clica" no email (brilho/pulse)
4. Email mostra "✓ Automatizado"
5. Robô move-se até WHATSAPP 💬
6. "Clica" (brilho/pulse)
7. WhatsApp mostra "✓ Automatizado"
8. Robô move-se até ANALYTICS 📊
9. Gráficos sobem animados
10. Robô volta ao centro, pisca feliz
11. Loop infinito (suave)
```

**Implementação:**
- SVG animado com CSS keyframes + JS
- OU Lottie animation (mais leve)
- Duração: ~8-10 segundos por ciclo
- Easing suave, fluido

**Elementos SVG necessários:**
- Robô (corpo, olhos, braços)
- Ícone Email
- Ícone WhatsApp  
- Ícone Gráfico/Analytics
- Ícone Calendário (opcional)
- Partículas de "magia/automação"

### Conteúdo de Texto

**Headline Principal:**
```
Automação Inteligente com IA
```

**Sub-headline:**
```
Liberte a sua equipa para o que realmente importa.
A Inteligência Artificial trata do resto — 24 horas por dia, 7 dias por semana.
```

**Métricas (Cards):**
| Métrica | Valor | Descrição |
|---------|-------|-----------|
| Tempo | -80% | Redução em tarefas repetitivas |
| Disponibilidade | 24/7 | Sempre ativo, sem pausas |
| Eficiência | +300% | Aumento de produtividade |
| Erros | 0 | Precisão total automatizada |

**CTA Principal:**
```
[Agendar Demonstração Gratuita] → Amarelo vibrante com shimmer
```

**CTA Secundário:**
```
[Ver IA em Ação ↓] → Link que scrolla para animação/demo
```

### Casos de Uso (Grid abaixo das métricas)

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 📧 Atendimento   │  │ 💬 WhatsApp      │  │ 📊 Relatórios    │
│    Automático    │  │    Inteligente   │  │    Automáticos   │
│                  │  │                  │  │                  │
│ Respostas 24/7   │  │ Chatbot que      │  │ Dados em tempo   │
│ sem intervenção  │  │ vende e atende   │  │ real sem esforço │
└──────────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 📅 Agendamentos  │  │ 🎯 Qualificação  │  │ 📱 Social Media  │
│    Inteligentes  │  │    de Leads      │  │    Automático    │
│                  │  │                  │  │                  │
│ Calendário que   │  │ IA separa leads  │  │ Posts e respostas│
│ se organiza só   │  │ quentes dos frios│  │ programados      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 📢 SEÇÃO 2: Marketing Digital (Redesign + Mover)

### Posição: APÓS seção de Automação

### O Que Manter (SEO)
- ✅ Textos/conteúdo dos serviços
- ✅ Links internos:
  - `/lan-html/marketing-digital.index.html`
  - `/lan-html/criacao-websites.index.html`
- ✅ Keywords nos textos

### O Que Mudar
- ❌ Layout atual (grid básico)
- ❌ Background com imagem
- ❌ Visual datado

### Novo Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Background: Gradiente violeta → preto, partículas sutis]  │
│                                                             │
│     Marketing Digital Que Gera Resultados                   │
│     ─────────────────────────────────────                   │
│                                                             │
│     "Os seus concorrentes estão a crescer online.           │
│      E você?"                                               │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Google  │ │ Social  │ │ TikTok  │ │   SEO   │          │
│  │  Ads    │ │  Media  │ │   Ads   │ │Orgânico │          │
│  │  🎯     │ │   📱    │ │   🎬    │ │   🔍    │          │
│  │ +312%   │ │ Vendas  │ │ Viral   │ │ Top 10  │          │
│  │  ROI    │ │ Reais   │ │Content  │ │ Google  │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Email   │ │E-books  │ │Perform. │ │Websites │          │
│  │Marketing│ │   📚    │ │Marketing│ │   🌐    │          │
│  │   📧    │ │Exclus.  │ │   📊    │ │ Profis. │          │
│  │  35%+   │ │         │ │ROI Max  │ │         │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ "Marketing não é sobre anunciar mais.                │  │
│  │  É sobre entender pessoas e o momento certo."        │  │
│  │                                                      │  │
│  │  [Explorar Marketing →]    [Ver Websites →]          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Cards Redesign
- Glass morphism com borda violeta
- Hover: brilho amarelo sutil
- Ícones animados (pulse suave)
- Números em destaque (gradient text)

---

## 📄 ESTRUTURA COMPLETA DO SITE

### Página Principal - Nova Ordem das Seções

```
1. HEADER/NAV          ← Redesign sutil
2. AUTOMAÇÃO IA        ← NOVO (hero principal com robô animado)
3. MARKETING DIGITAL   ← Redesign + movido de #1 para #3
4. HERO SECUNDÁRIO     ← "Precisando de clientes?" (ajustar texto PT-PT)
5. SERVICES            ← Redesign cards
6. EBOOKS              ← Redesign layout
7. ABOUT               ← Melhorar apresentação
8. TESTIMONIALS        ← Novo design
9. FAQ                 ← Atualizar accordion
10. CONTACT/CTA        ← CTA final forte
11. FOOTER             ← Redesign completo
```

### Landing Pages (10 páginas)

| # | Arquivo | Tema | Prioridade |
|---|---------|------|------------|
| 1 | `landing-marketing.html` | Marketing Digital | Alta |
| 2 | `landing-web-design.html` | Web Design | Alta |
| 3 | `landing-google-ads.html` | Google Ads | Alta |
| 4 | `landing-apps.html` | Aplicações | Média |
| 5 | `landing-ebooks.html` | E-books | Média |
| 6 | `Landing-cartao-visitas.html` | Cartões Visita | Média |
| 7 | `marketing-digital.index.html` | Marketing (SEO) | Alta |
| 8 | `criacao-websites.index.html` | Websites (SEO) | Alta |
| 9 | `projetos.html` | Portfólio | Média |
| 10 | `checkout-ebook.html` | Checkout | Baixa |

**Todas receberão:**
- Background 3D galáxia (ou gradiente consistente)
- Design system unificado
- CTAs amarelo vibrante
- Footer redesenhado
- Português de Portugal

---

## 🔧 COMPONENTES A CRIAR

### 1. Sistema de Partículas 3D (Vanilla JS)
```javascript
// particles.js
- Canvas full-screen fixo
- 50-80 partículas
- Cores: violeta (#7C3AED) + branco
- Movimento suave, aleatório
- Responsive (resize)
```

### 2. Animação do Robô (SVG + JS)
```javascript
// robot-animation.js
- SVG inline para controle total
- Timeline de animação (8-10s)
- Estados: idle, moving, clicking, celebrating
- Partículas de "magia" ao automatizar
- Loop infinito suave
```

### 3. Botões Premium (CSS)
```css
/* Amarelo vibrante com shimmer */
.btn-primary {
  background: #FBBF24;
  shimmer effect
  hover: scale + glow
}

.btn-secondary {
  glass morphism
  border violeta
}
```

### 4. Cards Glass Morphism (CSS)
```css
.card-glass {
  background: rgba(124, 58, 237, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(124, 58, 237, 0.2);
  hover: border amarelo
}
```

### 5. Section Containers (CSS)
```css
.section {
  padding consistente
  max-width controlado
  animações on-scroll
}
```

---

## 🇵🇹 PORTUGUÊS DE PORTUGAL - Correções

### Expressões a Corrigir
| BR (Atual) | PT-PT (Corrigir) |
|------------|------------------|
| Você | Você/Tu (manter "você" formal) |
| Tá precisando | Está a precisar |
| Pra | Para |
| Pro | Para o |
| Clientes | Clientes ✓ |
| Te ajudar | Ajudá-lo |
| Através de | Através de ✓ |

### Verificar em Todos os Arquivos
- [ ] index.html
- [ ] Todas as 10 landing pages
- [ ] Mensagens de erro/sucesso
- [ ] Placeholders de formulários

---

## ⏱️ PLANO DE EXECUÇÃO DETALHADO

### **FASE 1: Design System & Core** (2-3h)
```
□ 1.1 Criar particles.js (background 3D)
□ 1.2 Atualizar variáveis CSS (cores, fontes)
□ 1.3 Criar classes de botões premium
□ 1.4 Criar classes de cards glass
□ 1.5 Testar em mobile/desktop
```

### **FASE 2: Seção Automação IA** (3-4h)
```
□ 2.1 Criar HTML da seção
□ 2.2 Criar SVG do robô
□ 2.3 Programar animação do robô
□ 2.4 Criar grid de casos de uso
□ 2.5 Criar cards de métricas
□ 2.6 CTAs com efeito shimmer
□ 2.7 Responsividade mobile
```

### **FASE 3: Página Principal** (4-5h)
```
□ 3.1 Mover e redesignar seção Marketing
□ 3.2 Atualizar Hero secundário
□ 3.3 Redesign seção Services
□ 3.4 Redesign seção Ebooks
□ 3.5 Atualizar seção About
□ 3.6 Redesign Testimonials
□ 3.7 Atualizar FAQ accordion
□ 3.8 Redesign Footer completo
□ 3.9 Corrigir PT-PT em tudo
□ 3.10 Testar responsividade
```

### **FASE 4: Landing Pages** (5-6h)
```
□ 4.1 Criar template base
□ 4.2 Atualizar landing-marketing.html
□ 4.3 Atualizar landing-web-design.html
□ 4.4 Atualizar landing-google-ads.html
□ 4.5 Atualizar landing-apps.html
□ 4.6 Atualizar landing-ebooks.html
□ 4.7 Atualizar Landing-cartao-visitas.html
□ 4.8 Atualizar marketing-digital.index.html
□ 4.9 Atualizar criacao-websites.index.html
□ 4.10 Atualizar projetos.html
□ 4.11 Atualizar checkout-ebook.html
```

### **FASE 5: Polish & Micro-interações** (2-3h)
```
□ 5.1 Animações on-scroll (Intersection Observer)
□ 5.2 Hover effects sofisticados
□ 5.3 Parallax em seções-chave
□ 5.4 Smooth scrolling
□ 5.5 Loading states
□ 5.6 Otimização de performance
□ 5.7 Testes finais cross-browser
```

---

## 📊 TEMPO TOTAL ESTIMADO

| Fase | Tempo | Status |
|------|-------|--------|
| Fase 1 | 2-3h | ⏳ Pendente |
| Fase 2 | 3-4h | ⏳ Pendente |
| Fase 3 | 4-5h | ⏳ Pendente |
| Fase 4 | 5-6h | ⏳ Pendente |
| Fase 5 | 2-3h | ⏳ Pendente |
| **TOTAL** | **16-21h** | |

**Sessões de trabalho:** 3-4 sessões focadas

---

## ✅ DECISÕES TOMADAS

1. ✅ **Amarelo:** `#FBBF24` (vibrante) com efeito shimmer
2. ✅ **Seção Marketing:** Redesign completo, mover para posição 3
3. ✅ **Links SEO:** Manter `/lan-html/marketing-digital.index.html` e `/lan-html/criacao-websites.index.html`
4. ✅ **Robô animado:** SVG com animação de automatizar email/WhatsApp/etc
5. ✅ **Ordem das seções:** Automação IA → Marketing → Hero → Services → ...

---

## ❓ AINDA PRECISO SABER

1. **Robô:** Quer um estilo específico? (fofo/cute, futurista, minimalista)
2. **Métricas:** Posso usar números aspiracionais? (-80% tempo, +300% ROI, etc)
3. **Headline IA:** Aprova "Automação Inteligente com IA" ou prefere outro?
4. **Demonstração:** O CTA "Agendar Demonstração" leva para onde? (formulário? WhatsApp? calendário?)
5. **Algo mais faltando no mapeamento?**

---

## 🚀 PRONTO PARA COMEÇAR?

Após aprovação final, inicio **Fase 1** (Design System + Partículas).

Primeiro entregável: Background 3D galáxia funcionando + botões amarelos premium.

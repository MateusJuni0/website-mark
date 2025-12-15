# C&M Tecnologia - Website Profissional

Website responsivo e moderno para a agência digital C&M Tecnologia, desenvolvido com HTML5, CSS3, JavaScript puro e backend tRPC.

## 🚀 Início Rápido

### Acessar o Código

#### Opção 1: Management UI (Recomendado)
1. Clique no botão **"Code"** no painel Management UI
2. Veja a estrutura de arquivos
3. Edite diretamente ou clique em **"Download All Files"**

#### Opção 2: Linha de Comando
```bash
cd /home/ubuntu/cm-tecnologia
pnpm install
pnpm dev
```

## 📁 Estrutura de Arquivos

```
cm-tecnologia/
├── client/
│   ├── public/
│   │   ├── index.html          # 👈 Conteúdo principal do site
│   │   ├── styles.css          # 👈 Estilos e design
│   │   ├── main.js             # Lógica principal
│   │   ├── animations.js        # Animações de scroll
│   │   ├── dark-mode.js         # Toggle dark mode
│   │   └── form.js             # Validação de formulário
│   └── src/
│       ├── App.tsx
│       └── pages/
├── server/
│   ├── routers.ts              # 👈 Backend tRPC (formulário)
│   └── contact.submit.test.ts   # Testes
├── drizzle/
│   └── schema.ts               # Banco de dados
└── todo.md                      # Tarefas do projeto
```

## ✏️ Como Modificar o Website

### 1. Editar Conteúdo (Textos, Seções)

**Arquivo**: `/client/public/index.html`

Procure pelas seções:
- `<section class="hero">` - Hero section
- `<section class="services">` - Serviços
- `<section class="portfolio">` - Portfólio
- `<section class="about">` - Sobre nós
- `<section class="testimonials">` - Testemunhos
- `<section class="contact">` - Formulário de contato

**Exemplo**: Mudar o título principal
```html
<!-- Antes -->
<h1 class="hero-title">Transformamos sua visão digital em resultados reais</h1>

<!-- Depois -->
<h1 class="hero-title">Seu novo título aqui</h1>
```

### 2. Editar Cores e Estilos

**Arquivo**: `/client/public/styles.css`

As cores principais estão no topo do arquivo:
```css
:root {
    --primary: #7C3AED;        /* Violeta - botões principais */
    --secondary: #10B981;      /* Verde - botões secundários */
    --energy: #FFD700;         /* Amarelo - destaque */
}
```

**Exemplo**: Mudar a cor primária
```css
--primary: #FF6B6B;  /* Novo vermelho */
```

### 3. Editar Animações

**Arquivo**: `/client/public/animations.js`

Controla:
- Efeitos de scroll
- Animações de hover
- Parallax
- Contador de números

### 4. Editar Dark Mode

**Arquivo**: `/client/public/dark-mode.js`

Controla o comportamento do toggle dark mode.

### 5. Editar Formulário de Contato

**Frontend**: `/client/public/form.js`
- Validação de campos
- Mensagens de erro/sucesso

**Backend**: `/server/routers.ts`
- Lógica de envio
- Notificação ao proprietário
- Email de contato: `cmtecnologia12@gmail.com`

## 🎨 Customizações Comuns

### Adicionar Logo Real
1. Salve seu logo em `/client/public/logo.svg`
2. No `index.html`, procure por `<svg width="40" height="40">` no header
3. Substitua pelo seu logo

### Adicionar Imagens do Portfólio
1. Salve as imagens em `/client/public/`
2. No `index.html`, procure por `<div class="portfolio-image">`
3. Adicione `background-image: url('/seu-arquivo.jpg')`

### Adicionar Testemunhos Reais
1. No `index.html`, procure por `<div class="testimonial-card">`
2. Edite o texto, nome e foto

### Mudar Email de Contato
1. No `index.html`, procure por `cmtecnologia12@gmail.com`
2. Substitua pelo seu email

### Mudar Número WhatsApp
1. No `index.html`, procure por `+351 961 227 666`
2. Substitua pelo seu número

## 🔧 Desenvolvimento Local

### Instalar Dependências
```bash
cd /home/ubuntu/cm-tecnologia
pnpm install
```

### Rodar Servidor de Desenvolvimento
```bash
pnpm dev
```

Acesse em: `http://localhost:3000`

### Executar Testes
```bash
pnpm test
```

### Build para Produção
```bash
pnpm build
pnpm start
```

## 📊 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express, tRPC
- **Banco de Dados**: MySQL/TiDB com Drizzle ORM
- **Testes**: Vitest
- **Hospedagem**: Manus (com suporte a domínio customizado)

## 🎯 Funcionalidades

✅ Design responsivo (mobile, tablet, desktop)
✅ Dark mode com persistência
✅ Animações fluidas (scroll, hover, parallax)
✅ Menu mobile com hamburguer
✅ Formulário de contato com validação
✅ Notificação ao proprietário
✅ Botão WhatsApp flutuante
✅ FAQ com accordion
✅ Contador de números animado
✅ SEO básico (meta tags, alt text)

## 📝 Notas Importantes

- **Imagens Fake**: As imagens do portfólio e testemunhos são placeholders. Substitua com suas próprias imagens.
- **Testemunhos Fake**: Os depoimentos são exemplos. Adicione depoimentos reais de clientes.
- **Email**: O formulário envia notificações para `cmtecnologia12@gmail.com`. Configure seu email no backend se necessário.

## 🚀 Deploy/Publicação

1. Faça suas modificações
2. Clique em **"Publish"** no Management UI (após criar um checkpoint)
3. Configure seu domínio customizado em Settings → Domains
4. Seu site estará online em minutos!

## 💡 Dicas

- Use o **Management UI** para editar e visualizar mudanças em tempo real
- O servidor recarrega automaticamente quando você salva arquivos
- Teste em dispositivos móveis para garantir responsividade
- Use o dark mode para testar a acessibilidade

## 📞 Suporte

Se precisar de ajuda para modificar algo específico, entre em contato!

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2025  
**Status**: ✅ Pronto para produção

# Zinid Estética Automotiva

> **Landing Page Premium de Alta Performance e Design Automotivo**

![Zinid Preview](https://zinid-estetica.vercel.app/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png)

A plataforma digital oficial da **Zinid Estética Automotiva**. Uma aplicação web desenvolvida com Next.js focada em performance, animações cinemáticas (GSAP + Framer Motion) e alto nível de requinte visual para transmitir o cuidado e o nível de detalhamento entregue pela estética automotiva física.

## 🚀 Tecnologias e Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações (Scroll & Micro-interações)**: 
  - [GSAP (GreenSock)](https://gsap.com/) (ScrollTrigger, Parallax, Cursor Tracking)
  - [Framer Motion](https://www.framer.com/motion/) (Reveal Text, Transitions)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com/)

## ✨ Funcionalidades em Destaque

- **Cinematic Preloader**: Carregamento orquestrado. A página principal apenas é revelada após o carregamento assíncrono dos frames da sequência inicial, garantindo uma entrada épica sem perdas visuais.
- **Hero Canvas Sequence (Scrub)**: O banner principal (Hero) utiliza uma renderização via `<canvas>`, sincronizada frame-a-frame com o scroll (GSAP Scrub), revelando o carro esportivo à medida que o usuário rola a página.
- **Custom Cursor**: Cursor magnético customizado (invisível por padrão) interativo. Ele altera o estado e aparência dinamicamente ao identificar links, botões ou componentes da Galeria.
- **Glow & Ambient Lighting**: Design high-end dark-theme. Efeitos de `box-shadow` pulsantes, `mix-blend-mode` refinados e texturas de fundo em grid de alta densidade visual.
- **Magnetic Buttons**: Botões de conversão e CTA reativos (botões magnéticos que acompanham sutilmente a proximidade e movimento do mouse via Framer Motion).
- **Parallax Gallery**: Galeria interativa de portfolio em colunas assimétricas independentes impulsionadas por scroll vertical e parallax.
- **SEO & Performance**: 
  - Estrutura rica em _LocalBusiness Schema_ (JSON-LD) para indexação hiperlocal e aprimoramento orgânico pelo Google.
  - Otimização rígida das fontes (`next/font` - Inter & Outfit) na edge.
  - Componentização modular focada em Lighthouse e PageSpeed Score alto.

## 🛠️ Instalação e Execução (Desenvolvimento)

Siga os passos abaixo para rodar o projeto na sua máquina localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/zinid-estetica.git
   cd zinid-estetica
   ```

2. **Instale as dependências:**
   O projeto utiliza o ecossistema `npm`:
   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento (Turbopack suportado):**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador favorito.

## 📐 Estrutura do Projeto

Abaixo uma visão geral concisa dos principais diretórios:

```text
/src
├── app/                  # Roteamento do Next.js App Router (layout.tsx, page.tsx, /politica-de-privacidade, /termos-de-uso)
├── components/           # Componentes modulares de UI (Hero, Services, CustomCursor, Gallery, Preloader, etc)
```

## 🔒 Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto (opcional para desenvolvimento local puro, recomendado para deploy de produção em CI/CD) caso precise sobrescrever variáveis base, como a URL principal para Open Graph:
```env
NEXT_PUBLIC_SITE_URL="https://zinid-estetica.vercel.app"
```

## 📄 Páginas Legais e Tráfego Pago

A plataforma já contempla as rotas integradas essenciais para aprovação imediata em campanhas de tráfego pago (Facebook Ads, Google Ads):
- `/politica-de-privacidade`
- `/termos-de-uso`
- Tags estruturadas `metadataBase` para links sociais orgânicos (WhatsApp preview otimizado).

## 🤝 Contribuição

Sinta-se à vontade para enviar *Pull Requests* ou registrar *Issues*. Certifique-se de manter o padrão rigoroso de tipagem (`TypeScript`) e a arquitetura semântica visual desenvolvida para preservar as interações complexas de GSAP no client side.

---
© 2026 Zinid Estética Automotiva. Todos os direitos reservados. Desenvolvido para máxima conversão.

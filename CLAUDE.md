# Fawkes — site institucional

Site one-page da **Fawkes**, assessoria de marketing para oftalmologistas (Porto Alegre e todo o Brasil). Projeto conectado ao [Lovable](https://lovable.dev) — ver [AGENTS.md](AGENTS.md): nunca force-push/rebase/amend em commits já publicados.

O repositório nasceu de um template de outro site (Dra. Diane Marinho); todo esse conteúdo foi removido. Ela segue aparecendo apenas **como cliente da Fawkes** (logo no carrossel e projeto no portfólio).

## Stack

- **TanStack Start** (React 19 + TanStack Router) com SSR, **Vite 8**, **Tailwind CSS v4** (config em [styles.css](src/styles.css) via `@theme inline`, sem `tailwind.config.js`).
- Gerenciador: **npm** (ignorar `bun.lock`/`bunfig.toml`).
- Rota única: `src/routes/index.tsx`. `src/routeTree.gen.ts` é gerado — não editar.

## Ambiente

- Node em `C:\Program Files\nodejs`; no Bash: `export PATH="/c/Program Files/nodejs:$PATH"`.
- Dev server: `npm run dev` (porta padrão **8080**; se ocupada, `-- --port 8096 --strictPort`).
- `html { scroll-behavior: smooth }` é global — em testes via JS, setar `document.documentElement.style.scrollBehavior = 'auto'` antes de `scrollTo`.
- O Browser pane do app costuma ficar oculto (rAF/animações não rodam, screenshots dão timeout). Para medir animações/rolagem, usar Edge headless via CDP.

## Identidade visual (tokens em `:root`, styles.css)

- `--fawkes-ink` (azul-marinho muito escuro), `--fawkes-navy`, `--fawkes-blue` (azul institucional, destaques), `--fawkes-offwhite`, `--fawkes-mist` (cinza claro), `--fawkes-prussia` (#003153, linha das etapas).
- Tipografia: `--font-editorial` = "The Silver Editorial" (comercial — arquivos esperados em `public/fonts/TheSilverEditorial-{Regular,Italic}.woff2`; fallback Cormorant Garamond) para títulos; Manrope no corpo.
- Movimento único: `--fawkes-motion-duration` (800ms) + `--fawkes-motion-ease`, usado por `.reveal` (entrada das seções) e `.fawkes-rise` (entrada da Hero). Respeitar `prefers-reduced-motion` (regra global zera durações).
- Tokens verdes/dourados (`--primary`, `--gold`…) são herança do template e não são usados nas seções da Fawkes.

## Estrutura da Home (ordem)

1. Hero — inline em `index.tsx` (foto `fawkes-hero-bastidor.jpg` com zoom lento, entrada em sequência).
2. `ClientLogos` — marquee infinito CSS de logos (`public/images/clientes/`, recortes provisórios).
3. `ReputationPains` — "Entendemos o que está travando a sua reputação" (pílulas).
4. `ServiceFolders` — 4 pastas (Estratégia, Branding, Gestão de Redes Sociais, Tráfego Pago): accordion horizontal (xl+) / vertical (abaixo de xl). `OfferCarousel.tsx` é a versão anterior, sem uso.
5. `VideoTestimonials` — depoimentos (4 cards; vídeos em `public/videos/`, 720p).
6. `PortfolioCarousel` — 7 projetos com pop-up de galeria (`public/images/portfolio/`).
7. `AboutFounders` — "Quem cuida do seu nome" (Amanda Teixeira e Keven Josef).
8. `HowItWorks` — etapas com bloco sticky e linha de progresso.
9. `ContactCTA` — CTA final + formulário "Prefiro que entrem em contato".
10. `FAQ` — copy ainda em aprovação.
- `MobileStickyCTA` — botão fixo no mobile entre a Hero e o CTA final.
- Header: SEMPRE transparente; a cor do texto segue o fundo da seção atrás dele via `data-header-tone="dark"|"light"` (marque toda seção nova). Footer: Fawkes.
- Arraste + setas das filas: hook `src/hooks/use-drag-scroll.ts`.

## Pendências antes de publicar

- WhatsApp configurado: +55 51 98617-4624 (`site.whatsappUrl`, wa.me com mensagem pronta).
- Formulário: definir `VITE_LEAD_FORM_ENDPOINT` (sem ele, mostra aviso e não envia).
- Política de privacidade e termos: rotas /politica-de-privacidade e /termos-de-servico (LegalPage.tsx), texto genérico; revisar com jurídico e incluir razão social/CNPJ/e-mail do encarregado.
- Logo da Fawkes (hoje wordmark tipográfico; favicon "F" provisório), fonte The Silver Editorial, foto de ensaio para o CTA final (a atual é recorte de arte), vídeos de depoimento da Dra. Natássia e da Dra. Fabiana.

## Lições técnicas

- Tailwind v4: `scale-*` usa a propriedade CSS `scale` (soma-se a `style.transform`) — para animar via JS, definir o estado inicial com `transform` inline.
- Overlays/lightboxes em portal (`@radix-ui/react-dialog` direto); o `ui/dialog.tsx` do shadcn tem overlay herdado do template.
- IntersectionObserver não dispara quando a página "pula" por cima de um elemento (âncoras) — para visibilidade dependente de posição, calcular na rolagem (rAF).

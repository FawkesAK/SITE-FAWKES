import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  CalendarDays,
  Camera,
  Fingerprint,
  MapPin,
  Palette,
  PenLine,
  Plus,
  Scissors,
  Shapes,
  Smartphone,
  Target,
  TrendingUp,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./primitives";

const services: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Consultoria de marca",
    text: "Uma imersão na sua carreira para entender como você quer ser reconhecida e o que precisa aparecer.",
    icon: Fingerprint,
  },
  {
    title: "Identidade visual",
    text: "Cores, tipografia e padrão visual do seu perfil, para tudo ter unidade e ser reconhecido de longe.",
    icon: Palette,
  },
  {
    title: "Estratégia digital",
    text: "Um plano de seis meses construído a partir dos seus objetivos, com métricas acompanhadas todo mês.",
    icon: TrendingUp,
  },
  {
    title: "Posicionamento no Google Meu Negócio",
    text: "Seu perfil no Google completo, otimizado e atualizado, para quem pesquisa o seu nome ou a sua subespecialidade encontrar você.",
    icon: MapPin,
  },
  {
    title: "Consultoria de stories",
    text: "Orientação sobre o que postar no dia a dia e, se você quiser, um calendário de stories para seguir.",
    icon: Smartphone,
  },
  {
    title: "Calendário de conteúdo",
    text: "Planejamento de cada post com objetivo claro, alinhado às datas da oftalmologia.",
    icon: CalendarDays,
  },
  {
    title: "Copywriting",
    text: "Todos os textos: legendas, roteiros, bio e anúncios. Com a sua voz, linguagem médica correta e dentro das normas do CFM.",
    icon: PenLine,
  },
  {
    title: "Ensaio fotográfico",
    text: "Um ensaio a cada trimestre, com imagens que fortalecem a sua autoridade e renovam o perfil.",
    icon: Camera,
  },
  {
    title: "Vídeos mensais",
    text: "Gravação todo mês no consultório ou no centro cirúrgico, com roteiro pronto e direção na hora.",
    icon: Video,
  },
  {
    title: "Edição de vídeo",
    text: "Cortes, legendas e ritmo pensados para Reels, sem você precisar abrir nenhum programa.",
    icon: Scissors,
  },
  {
    title: "Design",
    text: "Posts, carrosséis e capas criados dentro da sua identidade visual.",
    icon: Shapes,
  },
  {
    title: "Gestão de tráfego",
    text: "Campanhas segmentadas para levar o seu nome ao público certo. O valor dos anúncios é pago direto à plataforma.",
    icon: Target,
  },
];

const AUTOPLAY_MS = 3200;
const RESUME_AFTER_MS = 5000;

/** Largura de cada zona de ativação (fração da largura visível da fila). */
const EDGE_ZONE = 0.18;
/** Velocidade máxima do "empurrão" (px/s), com o cursor colado na borda. */
const EDGE_MAX_SPEED = 620;
/** Distância (px) do fim da fila em que a velocidade começa a ser atenuada. */
const EDGE_SOFT_LIMIT = 160;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Seção 4 — "O que a gente faz? Tudo." (oferta).
 *
 * Fila horizontal de 12 cards levemente sobrepostos (margem negativa; cada
 * card seguinte fica por cima do anterior). É um scroll container nativo com
 * scroll-snap — então arrastar no celular / trackpad é o comportamento nativo
 * do navegador — e um autoplay leve que avança UM card por vez via
 * `scrollTo({ behavior: "smooth" })`. No fim da fila, volta suavemente ao
 * início.
 *
 * Desktop (mouse): o cursor "empurra" a fila. Zonas invisíveis de 18% da
 * largura em cada extremidade — perto da borda direita a fila desliza para a
 * esquerda (revela os próximos), perto da esquerda desliza para a direita;
 * no centro, para. A velocidade cresce (curva suave) conforme o cursor se
 * aproxima da borda e é interpolada frame a frame num único loop de
 * `requestAnimationFrame` (só roda enquanto há movimento; sem re-render do
 * React). Nos limites da fila a velocidade é atenuada até parar. No desktop o
 * snap fica desligado para o movimento contínuo não "saltar" para um card.
 * Touch: swipe nativo com snap, sem nada de hover.
 *
 * O autoplay pausa: com o mouse sobre a fila, com foco de teclado dentro dela,
 * enquanto um pop-up está aberto, quando a seção sai da tela, com a aba oculta
 * e por alguns segundos depois de qualquer interação manual. Com
 * `prefers-reduced-motion`, não há autoplay (a fila continua rolável).
 *
 * "Saber mais" abre um pop-up (Radix Dialog, portal no body) com o texto
 * completo do serviço.
 */
export function OfferCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lastInteraction = useRef(0);
  const autoScrolling = useRef(false);
  // Estado do "empurrão" por borda — tudo em refs, sem re-render.
  const edge = useRef({ target: 0, velocity: 0, raf: 0, last: 0 });

  const edgeTick = useCallback((now: number) => {
    const el = scrollerRef.current;
    const st = edge.current;
    if (!el) return;
    const dt = Math.min(0.05, (now - (st.last || now)) / 1000);
    st.last = now;

    // Atenua o alvo perto dos limites para parar suavemente no início/fim.
    const max = el.scrollWidth - el.clientWidth;
    let target = st.target;
    if (target > 0) target *= Math.min(1, (max - el.scrollLeft) / EDGE_SOFT_LIMIT);
    if (target < 0) target *= Math.min(1, el.scrollLeft / EDGE_SOFT_LIMIT);

    // Interpolação exponencial da velocidade (aceleração/frenagem suaves).
    st.velocity += (target - st.velocity) * (1 - Math.exp(-dt * 5));
    if (Math.abs(st.velocity) > 0.5) {
      el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + st.velocity * dt));
      lastInteraction.current = Date.now();
    }

    if (st.target === 0 && Math.abs(st.velocity) < 2) {
      st.velocity = 0;
      st.raf = 0;
      st.last = 0;
      return;
    }
    st.raf = requestAnimationFrame(edgeTick);
  }, []);

  const setEdgeTarget = useCallback(
    (target: number) => {
      const st = edge.current;
      st.target = target;
      if (!st.raf && target !== 0) st.raf = requestAnimationFrame(edgeTick);
    },
    [edgeTick],
  );

  useEffect(() => () => cancelAnimationFrame(edge.current.raf), []);

  const onEdgeMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reducedMotion || openIndex !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const zone = rect.width * EDGE_ZONE;
    const x = e.clientX - rect.left;
    let target = 0;
    if (x > rect.width - zone) {
      const k = (x - (rect.width - zone)) / zone; // 0 → 1 rumo à borda
      target = EDGE_MAX_SPEED * k * k;
    } else if (x < zone) {
      const k = (zone - x) / zone;
      target = -EDGE_MAX_SPEED * k * k;
    }
    setEdgeTarget(target);
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const advance = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    if (!cards.length) return;
    const start = cards[0]?.offsetLeft ?? 0;
    const max = el.scrollWidth - el.clientWidth;
    // Próximo ponto de parada à direita; se não houver um avanço real
    // (fim da fila — os últimos cards já cabem inteiros), volta ao início.
    const next = cards
      .map((c) => Math.min(c.offsetLeft - start, max))
      .find((x) => x > el.scrollLeft + 16);
    const target = next ?? 0;
    autoScrolling.current = true;
    el.scrollTo({ left: target, behavior: "smooth" });
    window.setTimeout(() => (autoScrolling.current = false), 900);
  }, []);

  const paused = hovering || focusWithin || openIndex !== null || !inView || reducedMotion;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - lastInteraction.current < RESUME_AFTER_MS) return;
      advance();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, advance]);

  const markInteraction = () => {
    lastInteraction.current = Date.now();
  };

  const active = openIndex !== null ? services[openIndex] : undefined;

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative overflow-hidden bg-[oklch(0.978_0.002_250)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[var(--fawkes-navy)]/60 sm:text-[0.78rem]">
            Oferta
          </p>
          <h2
            id="servicos-title"
            className="mt-4 font-editorial text-[clamp(2.3rem,9vw,3rem)] font-normal leading-[1] tracking-[-0.015em] text-[var(--fawkes-navy)] sm:text-[clamp(3rem,6.4vw,3.8rem)] lg:text-[clamp(3.6rem,4.6vw,4.6rem)] lg:tracking-[-0.02em]"
          >
            O que a gente faz? <em className="text-[oklch(0.52_0.11_255)]">Tudo.</em>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-12 sm:mt-14 lg:mt-16">
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Serviços da Fawkes"
          tabIndex={0}
          className="relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-10 [@media(pointer:fine)]:snap-none pt-2 [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden [--edge:max(1.25rem,calc((100vw-1240px)/2+2rem))] pl-[var(--edge)] pr-[var(--edge)] [scroll-padding-inline:var(--edge)] sm:[--edge:max(2rem,calc((100vw-1240px)/2+2rem))]"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerMove={onEdgeMove}
          onPointerLeave={(e) => {
            if (e.pointerType !== "mouse") return;
            setHovering(false);
            setEdgeTarget(0);
          }}
          onPointerDown={markInteraction}
          onWheel={markInteraction}
          onTouchStart={markInteraction}
          onScroll={() => {
            if (!autoScrolling.current) markInteraction();
          }}
          onFocus={() => setFocusWithin(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
          }}
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                data-card
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${services.length}: ${s.title}`}
                className="group relative flex h-[19.5rem] w-[min(78vw,17.5rem)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-[var(--fawkes-offwhite)]/[0.16] bg-[linear-gradient(165deg,var(--fawkes-navy)_0%,var(--fawkes-ink)_78%)] p-6 text-[var(--fawkes-offwhite)] shadow-[-24px_0_22px_-19px_rgba(2,8,20,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [&:not(:first-child)]:-ml-5 hover:-translate-y-1.5 sm:h-[20rem] sm:w-[18.5rem] sm:[&:not(:first-child)]:-ml-6 lg:h-[21rem] lg:w-[19.5rem] lg:p-7"
              >
                {/* Filete claro na borda esquerda — marca a sobreposição entre cards */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-4 left-0 w-px bg-gradient-to-b from-[var(--fawkes-blue)]/0 via-[var(--fawkes-blue)]/35 to-[var(--fawkes-blue)]/0"
                />
                {/* Brilho azul institucional no canto superior direito */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--fawkes-blue)_50%,transparent),transparent_68%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--fawkes-blue)]/45 text-[var(--fawkes-blue)]">
                    <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-editorial text-[1.05rem] italic text-[var(--fawkes-mist)]/60">
                    {pad(i + 1)}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="font-editorial text-[1.7rem] font-normal leading-[1.05] tracking-[-0.01em] text-[var(--fawkes-offwhite)] lg:text-[1.9rem]">
                    {s.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      // Carrossel para enquanto o pop-up está aberto: zera o
                      // "empurrão" por borda na hora (o autoplay já pausa por
                      // `openIndex`).
                      setEdgeTarget(0);
                      edge.current.velocity = 0;
                      setOpenIndex(i);
                    }}
                    aria-haspopup="dialog"
                    className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--fawkes-offwhite)]/25 py-2 pl-4 pr-3 text-[0.8rem] font-medium text-[var(--fawkes-offwhite)]/85 transition-colors duration-300 hover:border-[var(--fawkes-offwhite)]/55 hover:bg-[var(--fawkes-offwhite)]/[0.06] hover:text-[var(--fawkes-offwhite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fawkes-blue)]/60"
                  >
                    Saber mais
                    <Plus size={14} strokeWidth={1.8} aria-hidden="true" />
                    <span className="sr-only">sobre {s.title}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      <DialogPrimitive.Root
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[var(--fawkes-ink)]/40 backdrop-blur-[4px] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[26rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--fawkes-offwhite)]/10 bg-[linear-gradient(165deg,var(--fawkes-navy)_0%,var(--fawkes-ink)_85%)] p-7 pr-12 text-[var(--fawkes-offwhite)] shadow-[0_30px_80px_-20px_rgba(7,20,38,0.6)] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-8 sm:pr-14">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--fawkes-blue)_32%,transparent),transparent_68%)]"
            />
            {active ? (
              <div className="relative">
                <DialogPrimitive.Title className="font-editorial text-[1.75rem] font-normal leading-[1.08] tracking-[-0.01em] sm:text-[2rem]">
                  {active.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-3.5 text-[0.95rem] font-light leading-[1.65] text-[var(--fawkes-offwhite)]/85">
                  {active.text}
                </DialogPrimitive.Description>
              </div>
            ) : null}
            <DialogPrimitive.Close
              aria-label="Fechar"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-[var(--fawkes-offwhite)]/70 transition-colors hover:bg-[var(--fawkes-offwhite)]/10 hover:text-[var(--fawkes-offwhite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fawkes-blue)]/60"
            >
              <X size={18} strokeWidth={1.6} />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

type Project = {
  slug: string;
  name: string;
  /** Especialidade — omitida enquanto não confirmada (não inventar). */
  specialty?: string;
  /**
   * Gravação do perfil (MP4 sem áudio, 720px, faststart) em
   * /public/videos/portfolio/{slug}.mp4 + poster {slug}.jpg (1º quadro).
   * A tela do celular é só um player desse arquivo — nada além dele.
   */
  video: string;
  poster: string;
};

const v = (slug: string) => ({
  video: `/videos/portfolio/${slug}.mp4`,
  poster: `/videos/portfolio/${slug}.jpg`,
});

const projects: Project[] = [
  { slug: "samara", name: "Dra. Samara Marafon", specialty: "Córnea e ceratocone", ...v("samara") },
  { slug: "diane", name: "Dra. Diane Marinho", specialty: "Córnea e catarata", ...v("diane") },
  {
    slug: "natassia",
    name: "Dra. Natássia Bigolin",
    specialty: "Córnea, cirurgia refrativa e ceratocone",
    ...v("natassia"),
  },
  { slug: "vilma", name: "Dra. Vilma", specialty: "Psiquiatria e neuromodulação", ...v("vilma") },
  { slug: "myriam", name: "Dra. Myriam", ...v("myriam") },
];

/** Proporção real das gravações (720×904): a tela do celular segue o vídeo. */
const SCREEN_ASPECT = "aspect-[720/904]";

const pad = (n: number) => String(n).padStart(2, "0");

/** Tempo de exibição de cada perfil no avanço automático. */
const AUTOPLAY_MS = 2000;
/** Duração do fade lateral entre perfis (mesmo valor da classe duration-[900ms]). */
const TRANSITION_MS = 900;

/**
 * Setas sutis DENTRO da tela, nas laterais do vídeo (como na interface de um
 * celular): círculos translúcidos pequenos, mais visíveis no hover do aparelho.
 */
function ScreenArrows({ go }: { go: (d: 1 | -1) => void }) {
  const cls =
    "absolute top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/30 text-[#0F2B46] opacity-60 backdrop-blur-sm transition-opacity duration-300 hover:bg-white/55 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
  return (
    <>
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Projeto anterior"
        className={cn(cls, "left-2")}
      >
        <ChevronLeft size={16} strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Próximo projeto"
        className={cn(cls, "right-2")}
      >
        <ChevronRight size={16} strokeWidth={1.8} />
      </button>
    </>
  );
}

/**
 * Seção 6 — Portfólio: headline à esquerda + um único smartphone fixo (vitrine
 * editorial: cabeçalho Fawkes, MP4 inteiro, nome/especialidade, home
 * indicator), centralizados como grupo. Cada perfil fica 2s e avança sozinho
 * (pausa com mouse/dedo sobre o celular, fora da tela ou reduzir movimento).
 * Setas sutis dentro da tela, swipe/arraste e ← → também navegam. Só o vídeo
 * ativo toca; a tela segue a proporção real do MP4 (object-contain, sem corte).
 */
export function PortfolioCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [prev, setPrev] = useState<number | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const swipe = useRef<{ x: number; id: number } | null>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const total = projects.length;
  // Avanço automático (2s por perfil): pausa com mouse/dedo sobre o celular,
  // fora da tela ou com "reduzir movimento".
  const [hovering, setHovering] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = projects[active] ?? projects[0]!;

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setActive((i) => {
        setPrev(i);
        return (i + d + total) % total;
      });
    },
    [total],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = hovering || touching || !inView || reducedMotion;

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, go]);

  // Toca só o vídeo ativo (desde o início). Os outros são pausados só DEPOIS
  // do fade (TRANSITION_MS): o vídeo que sai continua rodando enquanto some,
  // sem congelar nem saltar para o 1º quadro no meio da transição.
  useEffect(() => {
    const cur = videos.current[active];
    if (cur) {
      cur.currentTime = 0;
      void cur.play().catch(() => {});
    }
    const id = window.setTimeout(() => {
      videos.current.forEach((v, i) => {
        if (!v || i === active) return;
        v.pause();
        v.currentTime = 0;
      });
    }, TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [active]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipe.current = { x: e.clientX, id: e.pointerId };
    if (e.pointerType !== "mouse") setTouching(true);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") setTouching(false);
    const s = swipe.current;
    swipe.current = null;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="projetos"
      data-header-tone="light"
      aria-labelledby="projetos-title"
      aria-roledescription="carrossel"
      className="relative isolate overflow-hidden bg-[oklch(0.978_0.002_250)] py-20 text-[var(--fawkes-navy)] sm:py-24 lg:py-32"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <PaperGrainTexture />

      {/* Conjunto título + celular, centralizado como um grupo único */}
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[auto_auto] lg:items-center lg:justify-center lg:gap-x-[clamp(5rem,8vw,7.5rem)] lg:gap-y-8">
        {/* Headline — à esquerda, centralizada verticalmente com o aparelho */}
        <Reveal>
          <h2
            id="projetos-title"
            className="font-editorial text-[clamp(2.6rem,10vw,3.3rem)] font-normal leading-[1] tracking-[-0.015em] sm:text-[clamp(3.2rem,7vw,4rem)] lg:text-[clamp(52px,4vw,76px)] lg:leading-[0.98] lg:tracking-[-0.02em]"
          >
            <span className="block whitespace-nowrap">Quando o digital</span>
            <span className="block whitespace-nowrap">
              mostra a <em className="text-[oklch(0.52_0.11_255)]">carreira.</em>
            </span>
          </h2>
          <p className="mt-6 max-w-[26rem] text-[1rem] leading-[1.65] text-[var(--fawkes-navy)]/70 lg:text-[1.05rem]">
            Cada perfil aqui parte da subespecialidade, da trajetória e do jeito de falar de uma
            médica. Por isso nenhum deles parece feed de agência.
          </p>
        </Reveal>

        <Reveal delay={120} className="flex flex-col items-center gap-8">
          {/* Celular — fixo, coluna do meio (centro real) */}
          <div>
            <div
              ref={phoneRef}
              className="group relative touch-pan-y select-none"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                swipe.current = null;
                setTouching(false);
              }}
            >
              <div className="relative w-[min(86vw,22rem)] rounded-[1.75rem] bg-[#0c0e13] p-[5px] shadow-[0_30px_60px_-34px_rgba(14,35,64,0.42),0_10px_22px_-16px_rgba(14,35,64,0.3)] ring-1 ring-black/40 transition-[transform,box-shadow] duration-500 ease-[var(--fawkes-motion-ease)] group-hover:scale-[1.012] group-hover:shadow-[0_36px_70px_-30px_rgba(14,35,64,0.5),0_14px_28px_-16px_rgba(14,35,64,0.38)] motion-reduce:transition-none sm:w-[22rem] lg:w-[24rem]">
                {/* Tela */}
                <div className="overflow-hidden rounded-[1.45rem] bg-[#F7F8F9]">
                  {/* Cabeçalho editorial */}
                  <div className="relative flex h-[4.5rem] items-end justify-between px-5 pb-3.5 sm:h-[5rem] sm:px-6 sm:pb-4">
                    {/* Saída de som (alto-falante), centralizada no topo */}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-2.5 h-[5px] w-14 -translate-x-1/2 rounded-full bg-[#1a1d24]/85 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"
                    />
                    <div>
                      <p className="font-display text-[1.45rem] italic leading-none text-[#0F2B46]">
                        Fawkes
                      </p>
                      <p className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#0F2B46]/55">
                        Portfólio
                      </p>
                    </div>
                    <p className="font-editorial text-[1rem] leading-none text-[#0F2B46]/40">
                      <span
                        key={active}
                        className="text-[#0F2B46] animate-in fade-in duration-500 motion-reduce:animate-none"
                      >
                        {pad(active + 1)}
                      </span>
                      <span className="mx-1.5">/</span>
                      {pad(total)}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "relative w-full overflow-hidden border-y border-[#E6E8EA] bg-black",
                      SCREEN_ASPECT,
                    )}
                  >
                    <ScreenArrows go={go} />
                    {projects.map((p, i) => {
                      const on = i === active;
                      return (
                        <div
                          key={p.slug}
                          aria-hidden={!on}
                          className={cn(
                            "absolute inset-0 transition-[opacity,translate] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,translate] motion-reduce:transition-none",
                            on
                              ? "z-[1] translate-x-0 opacity-100"
                              : // quem sai desliza para o lado oposto ao avanço;
                                // quem entra vem do lado do avanço
                                (i === prev) === (dir === 1)
                                ? "pointer-events-none -translate-x-[3%] opacity-0"
                                : "pointer-events-none translate-x-[3%] opacity-0",
                          )}
                        >
                          <video
                            ref={(el) => {
                              videos.current[i] = el;
                            }}
                            src={p.video}
                            poster={p.poster}
                            muted
                            loop
                            playsInline
                            autoPlay={i === 0}
                            preload={
                              i === active || i === (active + 1) % total ? "auto" : "metadata"
                            }
                            className="h-full w-full object-contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Rodapé editorial: projeto ativo (perto do vídeo) + home indicator */}
                  <div className="flex h-[8rem] flex-col px-5 pt-6 sm:h-[8.75rem] sm:px-6 sm:pt-7">
                    <div
                      key={current.slug}
                      className="min-w-0 animate-in fade-in duration-500 motion-reduce:animate-none"
                    >
                      <p className="font-editorial text-[1.4rem] leading-[1.08] text-[#0F2B46] sm:text-[1.55rem]">
                        {current.name}
                      </p>
                      {current.specialty ? (
                        <p className="mt-1.5 text-[0.78rem] text-[#0F2B46]/55">
                          {current.specialty}
                        </p>
                      ) : null}
                    </div>
                    <span
                      aria-hidden="true"
                      className="mx-auto mb-4 mt-auto block h-[5px] w-[100px] rounded-full bg-[#0F2B46]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { MarbleTexture } from "./MarbleTexture";

type Folder = { title: string; description: string; items: string[] };

const folders: Folder[] = [
  {
    title: "Estratégia",
    description:
      "Definimos direção, posicionamento e prioridades para que o marketing faça sentido para a realidade do cliente.",
    items: [
      "Posicionamento de marca",
      "Estratégia digital",
      "Planejamento de conteúdo",
      "Calendário editorial",
      "Google Meu Negócio",
      "Consultoria de stories",
    ],
  },
  {
    title: "Branding",
    description:
      "Construímos a base visual e verbal da marca para gerar coerência, reconhecimento e percepção de valor.",
    items: [
      "Identidade visual",
      "Direção criativa",
      "Copywriting",
      "Tom de voz",
      "Materiais institucionais",
      "Apresentação da marca",
    ],
  },
  {
    title: "Gestão de Redes Sociais",
    description:
      "Transformamos a estratégia em presença constante, conteúdo bem direcionado e comunicação que aproxima.",
    items: [
      "Planejamento de posts",
      "Criação de legendas",
      "Direção de conteúdo",
      "Roteiros para vídeos",
      "Capas e peças visuais",
      "Acompanhamento da presença digital",
    ],
  },
  {
    title: "Tráfego Pago",
    description:
      "Planejamos e gerenciamos campanhas para atrair pacientes com mais intenção, ampliar a visibilidade da marca e transformar estratégia em demanda qualificada.",
    items: [
      "Meta Ads",
      "Google Ads",
      "Remarketing",
      "Campanhas de captação",
      "Otimização de conversão",
      "Relatórios e acompanhamento",
    ],
  },
];

/** Tempo de visualização de cada pasta no avanço automático. */
const AUTOPLAY_MS = 3000;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Seção 4 — Serviços em 4 "pastas" (Estratégia, Branding, Gestão de Redes
 * Sociais, Tráfego Pago). Uma pasta ativa por vez; avanço automático a cada
 * 3s, pausado com mouse/dedo sobre as pastas, foco, fora da tela ou com
 * "reduzir movimento".
 *
 * Desktop (xl+): accordion horizontal — as 4 pastas lado a lado; a ativa
 * cresce (flex-grow) e revela a lista de serviços + CTA; as outras seguem
 * visíveis, mais discretas, com número, título e descrição. Ativa no hover
 * (mouse) ou no clique/foco.
 *
 * Abaixo de xl (mobile, tablet e notebooks pequenos, onde 4 colunas ficariam
 * estreitas demais): accordion vertical — o cabeçalho (número + título) é o botão;
 * descrição, serviços e CTA abrem com transição de altura (grid-rows 0fr→1fr).
 */
export function ServiceFolders() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const groupRef = useRef<HTMLDivElement>(null);
  // Pausas do avanço automático: mouse sobre as pastas, dedo tocando, foco de
  // teclado dentro, seção fora da tela ou "reduzir movimento".
  const [hovering, setHovering] = useState(false);
  const [touching, setTouching] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = hovering || touching || focusWithin || !inView || reducedMotion;

  // Cada pasta fica aberta 3s e passa para a próxima (volta à 1ª no fim). O
  // timer recomeça sempre que a pasta ativa muda — inclusive por interação.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) setActive((i) => (i + 1) % folders.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  return (
    <section
      id="servicos"
      data-header-tone="dark"
      aria-labelledby={`${baseId}-title`}
      className="relative isolate overflow-hidden bg-[var(--fawkes-ink)] py-20 text-[var(--fawkes-offwhite)] sm:py-24 lg:py-28"
    >
      <MarbleTexture />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_oklab,var(--fawkes-blue)_14%,transparent),transparent_60%)]"
      />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[44rem] text-center md:max-w-none">
          <h2
            id={`${baseId}-title`}
            className="font-editorial text-[clamp(2.3rem,9vw,3rem)] font-normal leading-[1.02] tracking-[-0.015em] sm:text-[clamp(3rem,6vw,3.8rem)] lg:text-[clamp(3.4rem,4.4vw,4.4rem)] lg:tracking-[-0.02em]"
          >
            <span className="md:block md:whitespace-nowrap">Como transformamos presença</span>{" "}
            <span className="md:block md:whitespace-nowrap">
              em <em className="text-[var(--fawkes-blue)]">posicionamento.</em>
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-[1rem] leading-[1.65] text-[var(--fawkes-offwhite)]/70">
            Da estratégia ao conteúdo, organizamos a comunicação para que sua marca seja percebida
            com clareza, consistência e autoridade.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 sm:mt-14 lg:mt-16">
          <div
            ref={groupRef}
            className="flex flex-col gap-3 xl:h-[35rem] xl:flex-row xl:gap-4"
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
            onPointerDown={(e) => e.pointerType !== "mouse" && setTouching(true)}
            onPointerUp={(e) => e.pointerType !== "mouse" && setTouching(false)}
            onPointerCancel={() => setTouching(false)}
            onFocus={(e) => {
              // Só foco de teclado pausa (clique/toque também focam o botão).
              if ((e.target as HTMLElement).matches(":focus-visible")) setFocusWithin(true);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
            }}
          >
            {folders.map((f, i) => {
              const on = i === active;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <article
                  key={f.title}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className={cn(
                    "group relative flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border bg-[linear-gradient(160deg,var(--fawkes-navy)_0%,var(--fawkes-ink)_85%)] transition-[flex-grow,border-color,box-shadow] duration-[700ms] ease-[var(--fawkes-motion-ease)] motion-reduce:transition-none xl:basis-0",
                    on
                      ? "border-[var(--fawkes-offwhite)]/18 shadow-[0_30px_70px_-40px_rgba(143,179,230,0.35)] xl:grow-[2.7]"
                      : "border-[var(--fawkes-offwhite)]/8 xl:grow",
                  )}
                >
                  {/* Brilho interno da pasta ativa */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--fawkes-blue)_30%,transparent),transparent_68%)] transition-opacity duration-700",
                      on ? "opacity-100" : "opacity-30",
                    )}
                  />

                  {/* Cabeçalho = botão (abre no mobile, foca/ativa no desktop) */}
                  <h3 className="relative">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-expanded={on}
                      aria-controls={panelId}
                      className="relative flex w-full cursor-pointer items-center justify-center gap-4 px-14 py-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fawkes-blue)]/60 sm:py-7 xl:flex-col xl:items-center xl:p-8"
                    >
                      <span className="flex items-baseline justify-center gap-4 xl:flex-col xl:items-center xl:gap-6">
                        <span
                          className={cn(
                            "font-editorial text-[2.6rem] leading-none transition-colors duration-500 sm:text-[3rem] xl:text-[4.75rem]",
                            on ? "text-[var(--fawkes-blue)]" : "text-[var(--fawkes-mist)]/35",
                          )}
                        >
                          {pad(i + 1)}
                        </span>
                        <span className="font-editorial text-[1.7rem] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[2rem] xl:text-[2.1rem]">
                          {f.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute right-5 top-1/2 grid h-9 w-9 -translate-y-1/2 shrink-0 place-items-center rounded-full border border-[var(--fawkes-offwhite)]/25 text-[1.1rem] leading-none transition-transform duration-500 sm:right-6 xl:hidden",
                          on && "rotate-45",
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  {/* Descrição sempre visível no desktop */}
                  <p
                    className={cn(
                      "relative mx-auto hidden px-8 text-center text-[0.92rem] leading-[1.65] transition-colors duration-500 xl:block xl:max-w-[30rem]",
                      on
                        ? "text-[var(--fawkes-offwhite)]/78"
                        : "text-[var(--fawkes-offwhite)]/50 xl:line-clamp-6",
                    )}
                  >
                    {f.description}
                  </p>

                  {/* Conteúdo que abre: serviços (e descrição, no mobile) */}
                  <div
                    id={panelId}
                    role="region"
                    aria-label={`Serviços de ${f.title}`}
                    className={cn(
                      "relative grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[var(--fawkes-motion-ease)] motion-reduce:transition-none xl:mt-auto",
                      on ? "grid-rows-[1fr] opacity-100 xl:delay-200" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-6 pb-7 text-center sm:px-7 xl:min-w-[27rem] xl:px-8 xl:pb-8">
                        <p className="text-[0.95rem] leading-[1.65] text-[var(--fawkes-offwhite)]/78 xl:hidden">
                          {f.description}
                        </p>
                        <ul className="mt-5 flex flex-wrap justify-center gap-2 xl:mt-0">
                          {f.items.map((item) => (
                            <li
                              key={item}
                              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--fawkes-offwhite)]/14 bg-[var(--fawkes-offwhite)]/[0.035] py-2 pl-3 pr-4 text-[0.84rem] text-[var(--fawkes-offwhite)]/88"
                            >
                              <span
                                aria-hidden="true"
                                className="grid h-3 w-3 shrink-0 place-items-center rounded-full border border-[var(--fawkes-blue)]"
                              >
                                <span className="h-1 w-1 rounded-full bg-[var(--fawkes-offwhite)]" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

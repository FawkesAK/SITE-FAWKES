import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

const steps = [
  {
    title: "Contato pelo WhatsApp",
    text: "Você conta um pouco sobre a sua carreira, a sua subespecialidade e o que busca no digital.",
  },
  {
    title: "Análise do seu perfil",
    text: "A gente avalia a sua comunicação atual, ou o ponto de partida, se você ainda não começou.",
  },
  {
    title: "Conversa com especialista",
    text: "Uma conversa de até 30 minutos para entender seus objetivos e mostrar o que pode ser feito.",
  },
  {
    title: "Proposta sob medida",
    text: "Um projeto de seis meses desenhado para você.",
  },
];

/**
 * Seção 8 — "Como funciona o primeiro passo?".
 *
 * Desktop: título/subtítulo fixos (sticky) à direita enquanto as 4 etapas
 * sobem à esquerda. A coluna das etapas é mais alta que o bloco fixo, então
 * o sticky se solta sozinho quando a última etapa passa e a página segue.
 *
 * Progresso: a linha vertical se preenche de azul da Prússia acompanhando o
 * centro da tela, do 1º ao último marcador; cada etapa "acende" quando o seu
 * marcador cruza o centro. Um único listener de scroll agenda no máximo um
 * `requestAnimationFrame` por frame; o preenchimento é aplicado direto no
 * estilo (sem re-render) e o estado só muda quando a etapa ativa muda.
 *
 */
export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      const fill = fillRef.current;
      const track = trackRef.current;
      if (!list || !fill || !track) return;
      const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-dot]"));
      const first = dots[0];
      const last = dots[dots.length - 1];
      if (!first || !last) return;

      const center = window.innerHeight / 2;
      const listTop = list.getBoundingClientRect().top;
      const mid = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      };
      const y0 = mid(first);
      const y1 = mid(last);

      // Trilho e preenchimento vão do centro do 1º ao centro do último marcador.
      track.style.top = `${y0 - listTop}px`;
      track.style.height = `${y1 - y0}px`;
      const progress = Math.min(1, Math.max(0, (center - y0) / Math.max(1, y1 - y0)));
      fill.style.transform = `scaleY(${progress})`;

      let idx = -1;
      dots.forEach((d, i) => {
        if (mid(d) <= center) idx = i;
      });
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="como-funciona"
      data-header-tone="light"
      aria-labelledby="como-funciona-title"
      className="relative isolate bg-[var(--fawkes-offwhite)] py-20 sm:py-24 lg:py-0"
    >
      <PaperGrainTexture />
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,34rem)_minmax(0,29rem)] lg:justify-center lg:gap-x-[clamp(3rem,5vw,5.5rem)] lg:gap-y-0">
        {/* Bloco fixo — à direita no desktop, primeiro no mobile */}
        <div className="lg:order-2 lg:h-full">
          <Reveal className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-start lg:pt-[33svh]">
            <h2
              id="como-funciona-title"
              className="font-editorial text-[clamp(2.4rem,9.5vw,3.1rem)] font-normal leading-[1] tracking-[-0.015em] text-[var(--fawkes-navy)] sm:text-[clamp(3rem,6vw,3.8rem)] lg:text-[clamp(3.8rem,4.9vw,4.9rem)] lg:leading-[0.98] lg:tracking-[-0.02em]"
            >
              <span className="xl:block xl:whitespace-nowrap">Como funciona o</span>{" "}
              <em className="text-[var(--fawkes-prussia)] xl:block xl:whitespace-nowrap">
                primeiro passo?
              </em>
            </h2>
            <p className="mt-4 max-w-[28rem] text-[1rem] leading-[1.65] text-[var(--fawkes-navy)]/70 lg:text-[1.08rem]">
              A gente entende a sua carreira e mostra o que o seu digital precisa para estar à
              altura dela.
            </p>
          </Reveal>
        </div>

        {/* Etapas — à esquerda, ligadas pela linha vertical */}
        <ol ref={listRef} className="relative lg:order-1 lg:pb-[16svh] lg:pt-[30svh]">
          {/* Trilho cinza + preenchimento azul da Prússia (posicionados via JS) */}
          <span
            ref={trackRef}
            aria-hidden="true"
            className="absolute left-[1.4375rem] w-[2px] rounded-full bg-[var(--fawkes-navy)]/12 sm:left-[1.6875rem]"
          >
            <span
              ref={fillRef}
              className="absolute inset-0 origin-top rounded-full bg-[var(--fawkes-prussia)] will-change-transform"
              // Estado inicial via `transform` (não usar `scale-y-0`: no Tailwind v4 ele
              // usa a propriedade `scale`, que se somaria ao transform do JS).
              style={{ transform: "scaleY(0)" }}
            />
          </span>

          {steps.map((s, i) => {
            const on = i <= active;
            return (
              <li
                key={s.title}
                className="relative flex gap-5 pb-14 last:pb-0 sm:gap-7 lg:min-h-[34svh] lg:pb-0"
                aria-current={i === active ? "step" : undefined}
              >
                <span
                  data-dot
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border font-editorial text-[1.2rem] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-14 sm:w-14 sm:text-[1.35rem]",
                    on
                      ? "border-[var(--fawkes-prussia)] bg-[var(--fawkes-prussia)] text-[var(--fawkes-offwhite)] shadow-[0_0_0_6px_color-mix(in_oklab,var(--fawkes-prussia)_12%,transparent)]"
                      : "border-[var(--fawkes-navy)]/20 bg-[var(--fawkes-offwhite)] text-[var(--fawkes-navy)]/45",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "pt-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:pt-3",
                    on ? "translate-x-0 opacity-100" : "translate-x-1 opacity-45",
                  )}
                >
                  <h3 className="font-editorial text-[1.7rem] font-normal leading-[1.08] text-[var(--fawkes-navy)] sm:text-[2rem] lg:text-[2.25rem]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-[26rem] text-[0.95rem] leading-[1.65] text-[var(--fawkes-navy)]/70 lg:max-w-[28rem] lg:text-[1.03rem]">
                    {s.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

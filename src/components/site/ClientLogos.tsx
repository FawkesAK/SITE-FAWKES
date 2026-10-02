import { useRef, type PointerEvent } from "react";
import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

/**
 * Logos dos médicos atendidos. `h` = altura visual no desktop (px), calibrada
 * por logo para equilibrar o peso óptico (wordmarks finas ficam mais baixas,
 * monogramas/círculos mais altos). Tablet escala para 90%, mobile para 82%.
 * Arquivos em /public/images/clientes/ (PNG, preto com alpha — o tom cinza
 * suave vem da opacidade aplicada aqui).
 */
const logos: { file: string; alt: string; h: number }[] = [
  { file: "diane-marinho", alt: "Dra. Diane Marinho — Oftalmologia", h: 38 },
  { file: "oftalmocentro", alt: "OftalmoCentro", h: 50 },
  { file: "samara-marafon", alt: "Samara B. Marafon — Oftalmologia", h: 24 },
  { file: "oc", alt: "Logo OC", h: 38 },
  { file: "fabiana-buffe", alt: "Dra. Fabiana Buffe", h: 20 },
  { file: "sergio-knitko", alt: "Sérgio Knitko", h: 46 },
  { file: "natassia-bigolin", alt: "Dra. Natássia Bigolin", h: 32 },
  { file: "vilma-rodriguez", alt: "Dra. Vilma Rodriguez", h: 22 },
  { file: "bs", alt: "Logo BS", h: 54 },
  { file: "fleurir", alt: "Fleurir", h: 54 },
  { file: "rr", alt: "Logo RR", h: 56 },
  { file: "ca", alt: "Logo CA", h: 54 },
];

/**
 * Seção "Médicos que confiaram na Fawkes" — marquee horizontal infinito.
 *
 * O movimento é 100% CSS (`.fawkes-marquee-track` em styles.css): a trilha
 * contém o conjunto de logos DUAS vezes e anima `translateX(0 → -50%)`. Como
 * cada cópia termina com o mesmo respiro (`pr-*` = `gap-x-*`), -50% cai
 * exatamente no início da segunda cópia e o reinício do loop é invisível.
 *
 * JS só entra para interação, manipulando a própria CSSAnimation via Web
 * Animations API (sem loop de rAF contínuo):
 * - desktop (mouse): hover desacelera até parar e retoma suavemente
 *   (tween de `playbackRate`);
 * - touch: arrastar move a faixa (ajusta `currentTime`, com wrap no ciclo,
 *   então o loop nunca quebra) e ao soltar o movimento automático continua.
 *
 * Com `prefers-reduced-motion`, a animação é desligada e as logos aparecem
 * estáticas, centralizadas e quebrando linha (a cópia duplicada some).
 */
export function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rateTween = useRef(0);
  const drag = useRef<{ x: number; t: number; id: number } | null>(null);

  const getAnim = () => trackRef.current?.getAnimations()[0];

  const tweenRate = (to: number) => {
    const anim = getAnim();
    if (!anim) return;
    cancelAnimationFrame(rateTween.current);
    const from = anim.playbackRate;
    const start = performance.now();
    const dur = 550;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      anim.playbackRate = from + (to - from) * eased;
      if (k < 1) rateTween.current = requestAnimationFrame(step);
    };
    rateTween.current = requestAnimationFrame(step);
  };

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") tweenRate(0);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") tweenRate(1);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    const anim = getAnim();
    if (!anim || anim.currentTime == null) return;
    anim.pause();
    drag.current = { x: e.clientX, t: Number(anim.currentTime), id: e.pointerId };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const anim = getAnim();
    const track = trackRef.current;
    if (!d || !anim || !track || e.pointerId !== d.id) return;
    const cycle = Number(anim.effect?.getComputedTiming().duration) || 0;
    const copyWidth = track.scrollWidth / 2;
    if (!cycle || !copyWidth) return;
    const dx = e.clientX - d.x;
    // Arrastar para a esquerda avança a faixa (mesmo sentido da animação).
    const t = d.t - (dx / copyWidth) * cycle;
    anim.currentTime = ((t % cycle) + cycle) % cycle;
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || e.pointerId !== drag.current.id) return;
    drag.current = null;
    getAnim()?.play();
  };

  return (
    <section
      id="clientes"
      data-header-tone="light"
      aria-labelledby="clientes-title"
      className="relative isolate bg-[oklch(0.978_0.002_250)] pb-0 pt-14 sm:pt-16 lg:pt-[4.5rem]"
    >
      <PaperGrainTexture />
      <Reveal className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <h2
          id="clientes-title"
          className="text-center font-sans text-[1.2rem] font-normal leading-snug tracking-[0.005em] text-[oklch(0.3_0.01_260)] sm:text-[1.45rem] lg:text-[1.65rem]"
        >
          Oftalmologistas que confiam a reputação à Fawkes
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div
          className="mx-auto mt-[2.9rem] max-w-[1440px] touch-pan-y select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] sm:mt-[3.75rem] lg:mt-[4.7rem] lg:[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] motion-reduce:[mask-image:none]"
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            ref={trackRef}
            className="fawkes-marquee-track flex w-max [--marquee-duration:32s] sm:[--marquee-duration:36s] lg:[--marquee-duration:40s] motion-reduce:w-full motion-reduce:justify-center"
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className={
                  "flex shrink-0 items-center gap-x-11 pr-11 sm:gap-x-14 sm:pr-14 lg:gap-x-20 lg:pr-20 " +
                  (copy === 1
                    ? "motion-reduce:hidden"
                    : "motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:px-5 motion-reduce:pr-5")
                }
              >
                {logos.map((logo) => (
                  <li key={logo.file} className="flex h-16 shrink-0 items-center">
                    <img
                      src={`/images/clientes/${logo.file}.png`}
                      alt={copy === 1 ? "" : logo.alt}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="h-[calc(var(--logo-h)*0.82)] w-auto max-w-none object-contain opacity-[0.42] sm:h-[calc(var(--logo-h)*0.9)] lg:h-[var(--logo-h)]"
                      style={{ ["--logo-h" as string]: `${logo.h}px` }}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

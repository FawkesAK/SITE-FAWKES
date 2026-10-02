import { useState } from "react";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

type Testimonial = {
  name: string;
  specialty: string;
  /** Vídeo 9:16 (720p, faststart) em /public/videos. Sem `video` = placeholder. */
  video?: string;
  poster?: string;
};

/**
 * Depoimentos em vídeo. Dra. Natássia e Dra. Fabiana ainda não têm vídeo de
 * depoimento — ficam como placeholder ("Vídeo em breve") até o vídeo real
 * chegar: basta preencher `video` e `poster`.
 */
const testimonials: Testimonial[] = [
  {
    name: "Dra. Samara",
    specialty: "Córnea, ceratocone e cirurgia refrativa",
    video: "/videos/depoimento-dra-samara.mp4",
    poster: "/videos/depoimento-dra-samara.jpg",
  },
  { name: "Dra. Natássia", specialty: "Córnea, cirurgia refrativa e ceratocone" },
  {
    name: "Dra. Ana",
    specialty: "Retina, catarata e uveíte",
    video: "/videos/depoimento-dra-ana.mp4",
    poster: "/videos/depoimento-dra-ana.jpg",
  },
  { name: "Dra. Fabiana", specialty: "Retina e catarata" },
];

const avatars = [1, 2, 3].map((n) => `/images/fawkes-hero-avatar-${n}.jpg`);

function VideoCard({ item, onPlay }: { item: Testimonial; onPlay: () => void }) {
  const playable = Boolean(item.video);
  return (
    <article
      data-card
      className="group relative aspect-[9/16] w-[min(84vw,21rem)] shrink-0 snap-start overflow-hidden rounded-[1.25rem] bg-[linear-gradient(165deg,var(--fawkes-navy),var(--fawkes-ink))] shadow-[0_18px_40px_-24px_rgba(7,20,38,0.55)] sm:w-[19rem] xl:aspect-auto xl:h-full xl:w-auto xl:min-w-0 xl:flex-1 xl:shrink"
    >
      {item.poster ? (
        <img
          src={item.poster}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--fawkes-blue)_35%,transparent),transparent_68%)]"
        />
      )}

      {/* Overlay suave: leve véu geral + base mais densa para o nome */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--fawkes-ink)_78%,transparent)_0%,transparent_42%),linear-gradient(color-mix(in_oklab,var(--fawkes-ink)_12%,transparent),color-mix(in_oklab,var(--fawkes-ink)_12%,transparent))]"
      />

      {playable ? (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Assistir depoimento da ${item.name}`}
          className="absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-none"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-[var(--fawkes-offwhite)]/55 bg-[var(--fawkes-offwhite)]/15 text-[var(--fawkes-offwhite)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:border-[var(--fawkes-offwhite)] group-hover:bg-[var(--fawkes-offwhite)] group-hover:text-[var(--fawkes-navy)] group-focus-visible:ring-2 group-focus-visible:ring-[var(--fawkes-blue)] sm:h-[4.5rem] sm:w-[4.5rem]">
            <Play size={22} strokeWidth={1.6} className="translate-x-[2px] fill-current" />
          </span>
        </button>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="rounded-full border border-[var(--fawkes-offwhite)]/25 px-4 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--fawkes-offwhite)]/70">
            Vídeo em breve
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6 xl:p-5">
        <p className="font-editorial text-[1.5rem] leading-none text-[var(--fawkes-offwhite)] xl:text-[1.4rem]">
          {item.name}
        </p>
        <p className="mt-2 text-[0.78rem] leading-snug text-[var(--fawkes-offwhite)]/72 xl:text-[0.78rem]">
          {item.specialty}
        </p>
      </div>
    </article>
  );
}

/**
 * Seção 5 — depoimentos em vídeo ("Quem já trabalha com a gente").
 *
 * Desktop (xl+): bloco de texto compacto à esquerda (coluna do tamanho do
 * título em 3 linhas) e os quatro vídeos dividindo igualmente a área
 * restante, com a MESMA ALTURA do bloco de texto (selo → avatares), gap 18px.
 * Container mais largo (1680px) para o texto ficar mais à esquerda. Abaixo de xl vira carrossel arrastável (o próximo card aparece
 * cortado), com setas discretas no tablet. Fila = scroll container nativo com scroll-snap (trackpad e
 * swipe nativos) + arraste com o mouse (o snap é suspenso durante o arraste e
 * a fila assenta suavemente no card mais próximo ao soltar). Play abre o vídeo
 * num lightbox (Radix Dialog) sobre o site.
 */
export function VideoTestimonials() {
  const { bind, edges, go } = useDragScroll<HTMLDivElement>();
  const [playing, setPlaying] = useState<Testimonial | null>(null);

  return (
    <section
      id="depoimentos"
      data-header-tone="light"
      aria-labelledby="depoimentos-title"
      className="relative isolate overflow-hidden bg-[var(--fawkes-offwhite)] py-20 sm:py-24 lg:py-28 xl:flex xl:min-h-[max(80vh,640px)] xl:items-center"
    >
      <PaperGrainTexture />
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 sm:px-8 xl:max-w-[1680px] xl:grid-cols-[auto_minmax(0,1fr)] xl:items-stretch xl:gap-12 xl:px-10">
        {/* Texto */}
        <Reveal className="max-w-[30rem] xl:max-w-[29rem]">
          <span className="inline-flex items-center rounded-full border border-[var(--fawkes-blue)]/45 bg-[color-mix(in_oklab,var(--fawkes-blue)_10%,transparent)] px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[var(--fawkes-navy)]/75">
            Quem já trabalha com a gente
          </span>
          <h2
            id="depoimentos-title"
            className="mt-6 font-editorial text-[clamp(2.3rem,9vw,3rem)] font-normal leading-[1.02] tracking-[-0.015em] text-[var(--fawkes-navy)] sm:text-[clamp(3rem,6vw,3.6rem)] lg:text-[clamp(3.2rem,4vw,4rem)] lg:leading-[1] lg:tracking-[-0.02em]"
          >
            <span className="xl:block xl:whitespace-nowrap">Quem melhor para</span>{" "}
            <span className="xl:block xl:whitespace-nowrap">falar da Fawkes</span>{" "}
            <span className="xl:block xl:whitespace-nowrap">
              do que <em className="text-[oklch(0.52_0.11_255)]">elas?</em>
            </span>
          </h2>
          <p className="mt-5 max-w-[26rem] text-[0.98rem] xl:max-w-[24rem] leading-[1.65] text-[var(--fawkes-navy)]/70">
            Mais do que presença digital, construímos posicionamento, autoridade e uma comunicação
            que acompanha a realidade de cada médico.
          </p>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center gap-2.5 rounded-full bg-[var(--fawkes-navy)] px-6 text-[0.88rem] font-medium text-[var(--fawkes-offwhite)] shadow-[0_8px_22px_-10px_rgba(14,35,64,0.45)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_12px_26px_-10px_rgba(14,35,64,0.55)]"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--fawkes-blue)] shadow-[0_0_0_3px_color-mix(in_oklab,var(--fawkes-blue)_25%,transparent)]"
            />
            Agendar conversa
          </a>
          <div className="mt-8 flex items-center gap-3.5">
            <div className="flex -space-x-2.5" aria-hidden="true">
              {avatars.map((src) => (
                <span
                  key={src}
                  className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--fawkes-offwhite)]"
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </span>
              ))}
            </div>
            <p className="text-[0.84rem] font-medium text-[var(--fawkes-navy)]/70">
              Médicos que confiaram na Fawkes
            </p>
          </div>
        </Reveal>

        {/* Vídeos */}
        <Reveal delay={120} className="min-w-0 xl:h-full">
          <div
            {...bind}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos em vídeo"
            className="-mx-5 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-10 [scrollbar-width:none] active:cursor-grabbing sm:-mx-8 sm:gap-5 sm:px-8 xl:mx-0 xl:h-full xl:cursor-auto xl:justify-start xl:gap-[18px] xl:overflow-visible xl:px-0 xl:pb-0 xl:active:cursor-auto [scroll-padding-inline:1.25rem] sm:[scroll-padding-inline:2rem] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => (
              <VideoCard key={t.name} item={t} onPlay={() => setPlaying(t)} />
            ))}
          </div>

          <div className="mt-0 hidden items-center gap-3 sm:flex xl:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={edges.start}
              aria-label="Depoimento anterior"
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-[var(--fawkes-navy)]/35 text-[var(--fawkes-navy)] transition-all duration-300 hover:border-[var(--fawkes-navy)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--fawkes-navy)]/35"
            >
              <ArrowLeft size={18} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={edges.end}
              aria-label="Próximo depoimento"
              className={cn(
                "grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-[var(--fawkes-navy)] text-[var(--fawkes-offwhite)] shadow-[0_8px_20px_-10px_rgba(14,35,64,0.5)] transition-all duration-300 hover:-translate-y-px disabled:cursor-default disabled:opacity-35 disabled:hover:translate-y-0",
              )}
            >
              <ArrowRight size={18} strokeWidth={1.6} />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Lightbox do vídeo */}
      <DialogPrimitive.Root open={playing !== null} onOpenChange={(o) => !o && setPlaying(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[var(--fawkes-ink)]/85 backdrop-blur-[6px] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,calc(86svh*9/16))] -translate-x-1/2 -translate-y-1/2 duration-200 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <DialogPrimitive.Title className="sr-only">
              Depoimento {playing ? `da ${playing.name}` : ""}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Vídeo de depoimento sobre o trabalho da Fawkes.
            </DialogPrimitive.Description>
            {playing?.video ? (
              <video
                key={playing.video}
                src={playing.video}
                poster={playing.poster}
                controls
                autoPlay
                playsInline
                className="aspect-[9/16] w-full rounded-2xl bg-[var(--fawkes-ink)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              />
            ) : null}
            <DialogPrimitive.Close
              aria-label="Fechar vídeo"
              className="absolute -top-12 right-0 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[var(--fawkes-offwhite)]/30 text-[var(--fawkes-offwhite)] transition-colors hover:bg-[var(--fawkes-offwhite)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fawkes-blue)] sm:-right-14 sm:top-0"
            >
              <X size={18} strokeWidth={1.6} />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}

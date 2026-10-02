import { BookOpenText, Eye, MessageCircle, PenLine, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./primitives";

const pillars: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Origem clínica",
    text: "Anos de rotina dentro de uma clínica oftalmológica antes de fundar a Fawkes.",
    icon: Eye,
  },
  {
    title: "Linguagem médica",
    text: "Exames, termos técnicos e normas do CFM, sem você precisar traduzir nada.",
    icon: BookOpenText,
  },
  {
    title: "Texto com a sua voz",
    text: "Cada legenda escrita a partir da sua forma de falar e da sua subespecialidade.",
    icon: PenLine,
  },
  {
    title: "Aprovação pelo WhatsApp",
    text: "Conteúdos enviados toda semana, com ajustes por áudio, sem entrar em outro sistema.",
    icon: MessageCircle,
  },
];

/** Foto dos fundadores (Amanda Teixeira e Keven Josef) no escritório. */
const PHOTO = "/images/fawkes-fundadores.jpg";
const PHOTO_ALT = "Amanda Teixeira e Keven Josef, fundadores da Fawkes";

/**
 * Seção "Quem somos" — a foto dos fundadores é o FUNDO da seção inteira.
 *
 * Desktop (xl+): foto full-bleed (object-cover, ancorada à direita, onde estão
 * as pessoas); degradê azul-marinho suave só no lado esquerdo, sumindo em
 * direção ao centro, para a leitura do texto; véu leve na base para os cards.
 * Texto sobreposto à esquerda e 4 cards de vidro fosco (backdrop-blur) sobre a
 * parte inferior da foto.
 *
 * Mobile/tablet (< xl, onde a foto precisaria de zoom e o texto cobriria os
 * rostos): a foto continua sendo o fundo, ancorada no topo (rostos visíveis) e
 * dissolvendo-se em azul-marinho para baixo; texto e cards sobre ela.
 */
export function AboutFounders() {
  return (
    <section
      id="quem-somos"
      data-header-tone="dark"
      aria-labelledby="quem-somos-title"
      className="relative isolate overflow-hidden bg-[var(--fawkes-ink)] text-[var(--fawkes-offwhite)]"
    >
      {/* Foto de fundo */}
      <img
        src={PHOTO}
        alt={PHOTO_ALT}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-0 -z-20 h-[27rem] w-full object-cover object-[92%_30%] sm:h-[34rem] sm:object-[85%_30%] xl:inset-0 xl:h-full xl:object-[85%_35%]"
      />

      {/* Sobreposições azul-marinho (nunca preto) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--fawkes-ink)_15%,transparent)_0%,transparent_18%,color-mix(in_oklab,var(--fawkes-ink)_76%,transparent)_15rem,var(--fawkes-ink)_24rem)] sm:bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--fawkes-ink)_15%,transparent)_0%,transparent_18%,color-mix(in_oklab,var(--fawkes-ink)_76%,transparent)_20rem,var(--fawkes-ink)_31rem)] xl:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden xl:block xl:bg-[linear-gradient(to_right,color-mix(in_oklab,var(--fawkes-ink)_90%,transparent)_0%,color-mix(in_oklab,var(--fawkes-ink)_70%,transparent)_30%,color-mix(in_oklab,var(--fawkes-ink)_32%,transparent)_48%,color-mix(in_oklab,var(--fawkes-ink)_10%,transparent)_58%,transparent_67%),linear-gradient(to_top,color-mix(in_oklab,var(--fawkes-ink)_70%,transparent)_0%,transparent_34%),linear-gradient(to_bottom,color-mix(in_oklab,var(--fawkes-ink)_30%,transparent)_0%,transparent_14%)]"
      />

      <div className="relative mx-auto flex max-w-[1240px] flex-col px-5 pb-16 pt-[19rem] sm:px-8 sm:pb-20 sm:pt-[25rem] xl:h-svh xl:min-h-[44rem] xl:justify-between xl:pb-[clamp(1.5rem,3.5svh,2.75rem)] xl:pt-[clamp(5.5rem,13svh,7.5rem)]">
        <Reveal className="max-w-[34rem] lg:max-w-[30rem] xl:max-w-[32rem]">
          <h2
            id="quem-somos-title"
            className="font-editorial text-[clamp(2.4rem,9.5vw,3.1rem)] font-normal leading-[1] tracking-[-0.015em] [text-shadow:0_2px_24px_color-mix(in_oklab,var(--fawkes-ink)_45%,transparent)] sm:text-[clamp(3rem,6vw,3.8rem)] lg:text-[clamp(3.2rem,3.8vw,4.3rem)] xl:text-[clamp(2.8rem,6.2svh,4.2rem)] lg:tracking-[-0.02em]"
          >
            Quem cuida do <em className="whitespace-nowrap text-[var(--fawkes-blue)]">seu nome.</em>
          </h2>
          <div className="mt-6 max-w-[29rem] space-y-4 text-[1rem] leading-[1.7] text-[var(--fawkes-offwhite)]/80 xl:mt-[clamp(0.9rem,2svh,1.5rem)] xl:max-w-[32rem] xl:space-y-[clamp(0.5rem,1.3svh,1rem)] xl:text-[clamp(0.88rem,1.75svh,1rem)] xl:leading-[1.6]">
            <p>
              Fundada por Amanda Teixeira e Keven Josef, a Fawkes nasceu há 5 anos para transformar
              a forma como oftalmologistas se posicionam no digital.
            </p>
            <p>
              Antes disso, a Amanda foi auxiliar de oftalmologia e viveu de perto a rotina dos
              consultórios, os exames e a relação entre médico e paciente. Por isso, a gente fala a
              língua da especialidade, sabe o que o CFM permite e entende o que faz uma médica ser
              lembrada.
            </p>
            <p>
              O Keven, especialista em Branding e tráfego pago, une estratégia, dados e
              criatividade. Juntos, os dois conduzem cada projeto do início ao fim.
            </p>
          </div>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center xl:mt-[clamp(1rem,2.6svh,2rem)] gap-2.5 rounded-full border border-[var(--fawkes-offwhite)]/40 bg-[var(--fawkes-ink)]/25 px-6 text-[0.88rem] font-medium backdrop-blur-md transition-colors duration-300 hover:border-[var(--fawkes-offwhite)]/70 hover:bg-[var(--fawkes-offwhite)]/[0.1]"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--fawkes-blue)] shadow-[0_0_0_3px_color-mix(in_oklab,var(--fawkes-blue)_25%,transparent)]"
            />
            Agendar conversa
          </a>
        </Reveal>

        {/* Cards de vidro fosco sobre a foto */}
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4 xl:mt-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} as="li" delay={80 + i * 80}>
                <div className="h-full rounded-2xl border border-[var(--fawkes-offwhite)]/15 bg-[color-mix(in_oklab,var(--fawkes-ink)_38%,transparent)] p-6 shadow-[0_20px_50px_-30px_rgba(3,10,22,0.8)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:border-[var(--fawkes-offwhite)]/28 xl:p-[clamp(1rem,2.3svh,1.5rem)]">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--fawkes-offwhite)]/25 text-[var(--fawkes-blue)]">
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-editorial text-[1.35rem] xl:mt-[clamp(0.6rem,1.6svh,1.25rem)] xl:text-[clamp(1.15rem,2.3svh,1.35rem)] font-normal leading-[1.12] text-[var(--fawkes-offwhite)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-[1.6] text-[var(--fawkes-offwhite)]/70">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

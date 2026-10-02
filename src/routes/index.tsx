import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/content/site";
import { CTAButton } from "@/components/site/primitives";
import { ClientLogos } from "@/components/site/ClientLogos";
import { ReputationPains } from "@/components/site/ReputationPains";
import { ServiceFolders } from "@/components/site/ServiceFolders";
import { VideoTestimonials } from "@/components/site/VideoTestimonials";
import { PortfolioCarousel } from "@/components/site/PortfolioCarousel";
import { AboutFounders } from "@/components/site/AboutFounders";
import { HowItWorks } from "@/components/site/HowItWorks";
import { ContactCTA } from "@/components/site/ContactCTA";
import { FAQ } from "@/components/site/FAQ";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";

const TITLE = "Fawkes | Assessoria de Marketing para Oftalmologistas";
const DESCRIPTION = "Seu nome lembrado na sua área, sem tirar tempo da sua rotina.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/**
 * Avatares da prova social da Hero (recortes 96×96 de médicos atendidos).
 * Sem `src`, o avatar cai para um monograma neutro com as iniciais.
 */
const heroAvatars: { initials: string; src?: string }[] = [
  { initials: "A1", src: "/images/fawkes-hero-avatar-1.jpg" },
  { initials: "A2", src: "/images/fawkes-hero-avatar-2.jpg" },
  { initials: "A3", src: "/images/fawkes-hero-avatar-3.jpg" },
];

function Home() {
  const heroPhoto = "/images/fawkes-hero-bastidor.jpg";

  return (
    <>
      {/* 01 — Hero (Fawkes)
          Foto de bastidor full-bleed (absolute inset-0) com o header sobreposto
          (ver `overlay` em Header.tsx) e o conteúdo ancorado na base.
          Desktop: headline + prova social à esquerda, texto de apoio + CTA à
          direita. Mobile: tudo empilhado na base (headline → prova social →
          texto → CTA), com o recorte da foto mantendo o rosto da médica acima
          do bloco de texto. O gradiente inferior termina no azul-marinho da
          Fawkes (--fawkes-ink), nunca em preto puro. */}
      <section
        id="inicio"
        data-header-tone="dark"
        className="relative isolate overflow-hidden bg-[var(--fawkes-ink)] text-[var(--fawkes-offwhite)]"
      >
        <div className="relative mx-auto flex min-h-[max(640px,100svh)] w-full max-w-[1920px] flex-col justify-end lg:min-h-[max(640px,100svh)] lg:max-h-[1100px]">
          {/* Foto: aproxima muito devagar ao carregar (.fawkes-hero-zoom) */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={heroPhoto}
              alt="Bastidor de gravação: médica oftalmologista sendo filmada em seu consultório pela equipe da Fawkes"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1366}
              height={769}
              className="fawkes-hero-zoom h-full w-full object-cover object-[26%_center] sm:object-[24%_center] lg:object-[center_35%]"
            />
          </div>

          {/* Véu superior leve — legibilidade do header sobre a foto */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[var(--fawkes-ink)]/55 to-transparent"
          />
          {/* Gradiente inferior — foto → azul-marinho Fawkes, transição longa e suave */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[72%] bg-[linear-gradient(to_top,var(--fawkes-ink)_0%,color-mix(in_oklab,var(--fawkes-ink)_91%,transparent)_26%,color-mix(in_oklab,var(--fawkes-navy)_55%,transparent)_60%,transparent_100%)] lg:h-[62%]"
          />

          <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-10 pt-40 sm:px-8 sm:pb-14 lg:px-10 lg:pb-[clamp(3.5rem,6vh,5rem)] xl:px-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              {/* Entrada em sequência (.fawkes-rise, atraso via --rise-delay):
                  linha 1 → linha 2 → subtítulo → botão → bolinhas. */}
              <div className="lg:min-w-0 lg:flex-1">
                <h1 className="font-editorial text-[clamp(2.45rem,10.4vw,3.4rem)] font-normal leading-[0.98] tracking-[-0.015em] text-[var(--fawkes-offwhite)] sm:text-[clamp(3.4rem,8.4vw,4.6rem)] lg:text-[clamp(3.5rem,5.6vw,7rem)] lg:leading-[0.94] lg:tracking-[-0.02em]">
                  <span
                    className="fawkes-rise-inline sm:block lg:whitespace-nowrap"
                    style={{ ["--rise-delay" as string]: "150ms" }}
                  >
                    Assessoria de Marketing
                  </span>{" "}
                  <span
                    className="fawkes-rise-inline sm:block lg:whitespace-nowrap"
                    style={{ ["--rise-delay" as string]: "400ms" }}
                  >
                    para <span className="text-[var(--fawkes-blue)]">Oftalmologistas</span>
                  </span>
                </h1>

                <div
                  className="fawkes-rise mt-5 flex items-center gap-3.5 sm:mt-6 lg:mt-7"
                  style={{ ["--rise-delay" as string]: "1150ms" }}
                >
                  <div className="flex -space-x-2.5" aria-hidden="true">
                    {heroAvatars.map((a) => (
                      <span
                        key={a.initials}
                        className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-[linear-gradient(150deg,var(--fawkes-navy),var(--fawkes-ink))] font-editorial text-[0.8rem] italic text-[var(--fawkes-blue)] ring-[1.5px] ring-[var(--fawkes-offwhite)]/70 sm:h-9 sm:w-9 sm:text-[0.88rem]"
                      >
                        {a.src ? (
                          <img src={a.src} alt="" className="h-full w-full object-cover" />
                        ) : (
                          a.initials
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-[0.8rem] font-medium leading-snug text-[var(--fawkes-offwhite)]/80 sm:text-[0.86rem]">
                    +5 anos cuidando de oftalmologistas
                  </p>
                </div>
              </div>

              <div className="w-fit border-t border-[var(--fawkes-offwhite)]/15 pt-6 lg:mb-1 lg:shrink-0 lg:border-t-0 lg:pt-0">
                <p
                  className="fawkes-rise text-[1.25rem] font-light leading-[1.18] tracking-[0.005em] text-[var(--fawkes-offwhite)] sm:text-[1.4rem] lg:text-[1.45rem] xl:text-[1.6rem]"
                  style={{ ["--rise-delay" as string]: "700ms" }}
                >
                  <span className="block">Seu nome lembrado</span>
                  <span className="block">
                    na sua área, <em className="text-[var(--fawkes-blue)]">sem tirar</em>
                  </span>
                  <span className="block">tempo da sua rotina.</span>
                </p>
                <div
                  className="fawkes-rise mt-6 inline-flex flex-col items-center gap-3.5 lg:mt-7"
                  style={{ ["--rise-delay" as string]: "900ms" }}
                >
                  <CTAButton
                    href={site.whatsappUrl}
                    variant="ghost-light"
                    className="h-12 gap-3 border-[var(--fawkes-offwhite)]/45 bg-[var(--fawkes-offwhite)]/[0.06] px-6 text-[1rem] font-normal backdrop-blur-sm hover:border-[var(--fawkes-offwhite)]/75 hover:bg-[var(--fawkes-offwhite)]/[0.12] xl:h-[3.25rem] xl:px-7 xl:text-[1.08rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-3 w-3 place-items-center rounded-full border border-[var(--fawkes-offwhite)]/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--fawkes-offwhite)]" />
                    </span>
                    Agendar conversa
                  </CTAButton>
                  <p className="text-[0.82rem] text-[var(--fawkes-offwhite)]/75">
                    Atendemos Porto Alegre e Região
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01b — Médicos que confiaram na Fawkes (logos, expandir/recolher) */}
      <ClientLogos />

      {/* 01c — Dores que travam a reputação digital */}
      <ReputationPains />

      {/* 01d — Serviços em 3 pastas (Estratégia, Branding, Gestão de Redes Sociais) */}
      <ServiceFolders />

      {/* 01e — Depoimentos em vídeo */}
      <VideoTestimonials />

      {/* 01f — Portfólio */}
      <PortfolioCarousel />

      {/* 01g — Quem cuida do seu nome (fundadores) */}
      <AboutFounders />

      {/* 01h — Como funciona o primeiro passo (etapas + bloco fixo) */}
      <HowItWorks />

      {/* 01i — CTA final + formulário "Prefiro que entrem em contato" */}
      <ContactCTA />

      {/* 01j — Perguntas frequentes (copy em aprovação) */}
      <FAQ />

      {/* Botão "Agendar conversa" fixo no mobile (entre a Hero e o CTA final) */}
      <MobileStickyCTA />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Aperture, Eye, Glasses, Layers } from "lucide-react";
import { site } from "@/content/site";
import { imageUrl } from "@/content/images";
import {
  AuthorityMetrics,
  CTAButton,
  Figure,
  InstitutionStrip,
  Reveal,
  Section,
  SectionHeader,
  SpecialtyCard,
} from "@/components/site/blocks";
import { ScienceCards } from "@/components/site/science";

/**
 * Rola até uma seção da Home e só então executa `onArrived` — usado pelos
 * CTAs que precisam abrir o modal "Formação médica" depois de posicionar a
 * seção "Ciência que chega à consulta". Usa o evento nativo `scrollend`
 * (o sinal mais confiável de que a animação de scroll terminou) com um
 * timeout de segurança como fallback para navegadores sem suporte.
 */
function scrollToSectionThenRun(sectionId: string, onArrived: () => void) {
  const el = document.getElementById(sectionId);
  if (!el) {
    onArrived();
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    onArrived();
    return;
  }

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", finish);
    window.clearTimeout(fallbackId);
    onArrived();
  };
  const fallbackId = window.setTimeout(finish, 900);
  if ("onscrollend" in window) {
    window.addEventListener("scrollend", finish, { once: true });
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dra. Diane Marinho | Oftalmologista em Porto Alegre" },
      {
        name: "description",
        content:
          "Oftalmologista em Porto Alegre, professora da UFRGS e chefe do Setor de Córnea do HCPA. Córnea, catarata, lentes intraoculares e cirurgia refrativa.",
      },
      { property: "og:title", content: "Dra. Diane Marinho | Oftalmologista em Porto Alegre" },
      {
        property: "og:description",
        content:
          "Sua visão cuidada por quem também ensina. Córnea, catarata e correção do grau em Porto Alegre.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const areas = [
  {
    title: "Córnea",
    text: "Ceratocone, doenças da superfície ocular, olho seco e alterações que exigem investigação especializada.",
    cta: "Saiba mais",
    to: "/cornea",
    file: "home_05_card_cornea.jpg",
    imgClassName: "object-center",
    icon: Eye,
  },
  {
    title: "Catarata",
    text: "Diagnóstico, avaliação do momento certo para operar e escolha da melhor lente intraocular de acordo com as necessidades visuais de cada paciente.",
    cta: "Entenda a cirurgia",
    to: "/catarata",
    file: "home_06_card_catarata.jpg",
    imgClassName: "object-center",
    highlight: true,
    icon: Aperture,
  },
  {
    title: "Cirurgia refrativa",
    text: "Avaliação das possibilidades de reduzir a dependência dos óculos por meio da cirurgia refrativa ou da cirurgia de catarata, quando indicada.",
    cta: "Conheça as possibilidades",
    to: "/cirurgia-refrativa",
    file: "home_07_card_correcao_grau.jpg",
    imgClassName: "object-[center_40%]",
    icon: Glasses,
  },
  {
    title: "Transplante de córnea",
    text: "Avaliação, acompanhamento e diferentes técnicas de transplante conforme a estrutura comprometida.",
    cta: "Saiba mais",
    to: "/cornea",
    hash: "transplante",
    file: "home_08_card_transplante.jpg",
    imgClassName: "object-center",
    icon: Layers,
  },
];

function Home() {
  const heroPhoto = imageUrl("home_01_hero_dra_diane.jpg");
  const [scienceActiveId, setScienceActiveId] = useState<string | null>(null);
  const scienceTriggerRef = useRef<HTMLElement | null>(null);

  /**
   * Fonte única de verdade para abrir qualquer modal da seção "Ciência que
   * chega à consulta" — usada pelo próprio card e pelos CTAs externos, para
   * nunca haver uma segunda implementação/estado do mesmo modal. Guarda o
   * elemento que originou a abertura para restaurar o foco ao fechar (ver
   * `onCloseAutoFocus` em `ScienceCards`).
   */
  const openScienceModal = (id: string) => {
    setScienceActiveId(id);
  };
  const openFormacaoMedica = () => {
    scienceTriggerRef.current = document.activeElement as HTMLElement | null;
    openScienceModal("formacao-medica");
  };
  const scrollToScienceAndOpen = () => {
    scienceTriggerRef.current = document.activeElement as HTMLElement | null;
    scrollToSectionThenRun("formacoes", () => openScienceModal("formacao-medica"));
  };

  return (
    <>
      {/* 01 — Hero
          Mesma lógica em todas as larguras: foto full-bleed (absolute inset-0)
          com o texto sobreposto em faixa absoluta à esquerda — nunca empilha.
          Só a altura do container, a largura da faixa de texto, a tipografia
          e o object-position da foto mudam por breakpoint. */}
      <section id="inicio" className="texture-paper relative overflow-hidden bg-paper">
        <div className="relative mx-auto mt-[4.25rem] min-h-[clamp(400px,108vw,460px)] w-full max-w-[1920px] sm:mt-[4.5rem] sm:min-h-[clamp(460px,66vw,560px)] lg:aspect-[1.85/1] lg:min-h-[520px] lg:max-h-[calc(100svh+14rem)]">
          <Reveal className="absolute inset-y-0 left-0 z-10 flex w-[56%] flex-col justify-center px-4 py-6 sm:w-[54%] sm:px-6 lg:left-[clamp(64px,10vw,170px)] lg:top-1/2 lg:h-auto lg:w-[32%] lg:max-w-[520px] lg:min-w-[360px] lg:-translate-y-1/2 lg:px-0 lg:py-0">
            <p className="eyebrow text-[0.6rem] font-medium leading-snug tracking-[0.1em] text-gold sm:text-[0.65rem] sm:tracking-[0.13em] lg:text-xs lg:tracking-[0.15em]">
              Oftalmologista em Porto Alegre • Córnea e catarata
            </p>
            <h1 className="mt-3 text-[clamp(1.5rem,6.6vw,2.5rem)] font-normal leading-[1.05] tracking-[-0.01em] sm:mt-4 sm:text-[clamp(2rem,4.6vw,2.75rem)] lg:mt-5 lg:max-w-[480px] lg:text-[clamp(3rem,4vw,4.25rem)] lg:leading-[0.98] lg:tracking-[-0.02em]">
              Sua visão cuidada por quem também ensina.
            </h1>
            <p className="mt-3 text-[0.78rem] leading-[1.45] text-muted-foreground sm:mt-4 sm:text-[0.85rem] lg:mt-6 lg:max-w-[430px] lg:text-base lg:leading-[1.6]">
              Professora da UFRGS, especialista em córnea e cirurgiã de catarata. Uma
              trajetória dedicada ao ensino, à pesquisa e às decisões que envolvem a
              qualidade da visão.
            </p>
            <div className="mt-4 flex flex-col items-start gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3 lg:mt-9">
              <CTAButton
                onClick={scrollToScienceAndOpen}
                className="h-9 px-4 text-[0.78rem] sm:h-11 sm:px-5 sm:text-[0.85rem] lg:h-12 lg:px-6 lg:text-sm"
              >
                Conheça a Dra. Diane
              </CTAButton>
              <CTAButton
                href={site.whatsappUrl}
                variant="light-solid"
                className="h-9 px-4 text-[0.78rem] sm:h-11 sm:px-5 sm:text-[0.85rem] lg:h-12 lg:px-6 lg:text-sm"
              >
                Agendar consulta
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={120} className="absolute inset-0">
            {heroPhoto ? (
              <img
                src={heroPhoto}
                alt="Dra. Diane Marinho em seu consultório de oftalmologia em Porto Alegre"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-[58%_center] sm:object-[68%_center] lg:object-center"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                <span className="optic-ring block h-8 w-8 rotate-45" aria-hidden="true" />
                <span className="eyebrow text-gold">Inserir</span>
                <span className="max-w-full truncate font-mono text-[11px] text-muted-foreground">
                  home_01_hero_dra_diane.jpg
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* 02 — Sobre
          Mobile (ordem no DOM = ordem de leitura, sem overrides lg: aplicando):
          título → fotos → eyebrow → texto → dados → botão.
          Desktop: cada peça recebe posição explícita no grid (coluna 2, linhas
          1–5, na ordem eyebrow→título→texto→dados→botão) para reproduzir a
          composição original, com o mosaico ocupando a coluna 1 nas 5 linhas. */}
      <Section id="sobre" tone="background" className="py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:gap-y-0">
          <Reveal className="lg:col-start-2 lg:row-start-2">
            <h2 className="text-3xl leading-[1.14] text-foreground sm:text-4xl md:text-[2.85rem]">
              Conheça a
              <br />
              Dra. Diane Ruschel Marinho
            </h2>
          </Reveal>

          <Reveal className="grid aspect-square grid-cols-[1.35fr_1fr] grid-rows-2 gap-3 sm:gap-4 lg:col-start-1 lg:row-start-1 lg:row-span-5">
            <Figure
              file="home_02_sobre_retrato.jpg"
              alt="Retrato profissional da Dra. Diane Marinho"
              className="row-span-2 h-full w-full rounded-2xl"
              imgClassName="object-center"
              priority
            />
            <Figure
              file="home_03_sobre_congresso_palco.jpg"
              alt="Dra. Diane Marinho durante exame oftalmológico em consultório"
              className="h-full w-full rounded-2xl"
              imgClassName="object-[center_80%]"
            />
            <Figure
              file="home_04_sobre_congresso_simposio.jpg"
              alt="Dra. Diane Marinho palestrando em congresso científico"
              className="h-full w-full rounded-2xl"
              imgClassName="object-center"
            />
          </Reveal>

          <Reveal className="lg:col-start-2 lg:row-start-1 lg:mb-4">
            <p className="eyebrow text-gold">Quem é a Dra. Diane</p>
          </Reveal>

          <Reveal className="space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground lg:col-start-2 lg:row-start-3 lg:mt-5">
            <p>
              Médica oftalmologista, professora da Faculdade de Medicina da UFRGS,
              chefe do Setor de Córnea do Hospital de Clínicas de Porto Alegre e
              Diretora Médica do Banco de Olhos do HCPA.
            </p>
            <p>
              Ao longo da carreira, assistência, ensino e pesquisa passaram a fazer
              parte do mesmo trabalho: compreender melhor as doenças da visão para
              tomar decisões cada vez mais precisas na prática clínica.
            </p>
          </Reveal>

          <AuthorityMetrics dense className="lg:col-start-2 lg:row-start-4 lg:mt-10" />

          <Reveal
            delay={120}
            className="text-center lg:col-start-2 lg:row-start-5 lg:mt-10"
          >
            <CTAButton onClick={scrollToScienceAndOpen}>Conheça a trajetória completa</CTAButton>
          </Reveal>
        </div>
      </Section>

      {/* 03 — Áreas de atuação */}
      <Section id="especialidades" tone="sand" className="py-9 md:py-12">
        <SectionHeader
          eyebrow="Áreas de atuação"
          title="Como posso ajudar você"
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a, i) => (
            <SpecialtyCard key={a.title} {...a} delay={i * 80} className="rounded-2xl" />
          ))}
        </div>
      </Section>

      {/* 04 — Lentes intraoculares
          Mobile (<lg) e desktop (lg:+) são duas composições deliberadamente
          diferentes, renderizadas como blocos irmãos (lg:hidden / hidden lg:flex)
          em vez de um único markup responsivo: no mobile a imagem (vertical,
          arquivo próprio) empilha ACIMA do texto em fluxo normal; no desktop a
          imagem (paisagem, arquivo original) é background full-bleed atrás do
          texto. Mantendo-os como blocos separados, o desktop preserva o markup
          exato já aprovado — zero risco de regressão ao mexer só no mobile. */}
      <div id="catarata">
        {/* Mobile — a própria <section> usa a imagem vertical como background (não um
            <div>/<img> filho): texto flui por cima dela, uma única superfície de verdade,
            sem elemento de imagem separado. A imagem-fonte é bem mais alta (941×1672) do
            que o necessário pra mostrar só a lente — depois de ~65% da altura já é só
            fundo verde vazio por design — então um spacer invisível (mesmo aspect-ratio,
            mesma largura full-bleed do background) reserva no fluxo normal só até esse
            ponto, e o texto começa logo em seguida. Abaixo do recorte, `backgroundColor`
            usa a cor exata amostrada da própria imagem naquela linha (em vez do
            `--primary-deep` padrão do site, que é mais azulado) — corte 100% imperceptível,
            sem gradiente/overlay. */}
        <section
          className="relative overflow-hidden bg-[#3b3b23] bg-no-repeat pb-6 pt-0 text-[var(--primary-foreground)] sm:pb-7 md:pb-7 md:pt-0 lg:hidden"
          style={{
            backgroundImage: `url(${imageUrl("home_09b_lente_intraocular_mobile.jpg")})`,
            backgroundPosition: "center top",
            backgroundSize: "100% auto",
          }}
        >
          <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
            <div aria-hidden="true" className="-mx-5 aspect-[941/869] w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)]" />

            <Reveal className="pt-3 sm:pt-4">
              <h2 className="text-[clamp(1.2rem,5.4vw,1.7rem)] leading-[1.18] text-[var(--primary-foreground)]">
                A cirurgia de catarata também pode ser uma decisão sobre como você quer
                enxergar depois.
              </h2>
              <div className="mt-2.5 max-w-[480px] space-y-1.5 text-[clamp(0.76rem,3.3vw,0.86rem)] leading-[1.45] text-[var(--primary-foreground)]/75">
                <p>
                  Ao remover a catarata, uma lente intraocular passa a exercer a função do
                  cristalino. Hoje existem diferentes tecnologias capazes de corrigir graus e
                  oferecer diferentes possibilidades de visão.
                </p>
                <p>
                  A escolha começa pela avaliação dos olhos, mas também passa pela rotina,
                  pelas prioridades e pelas expectativas de cada pessoa.
                </p>
              </div>
              <div className="mt-6 flex justify-center sm:mt-7">
                <CTAButton href={site.whatsappUrl} variant="light-solid" className="h-10 px-5 text-[0.85rem]">
                  Agendar avaliação
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Desktop — aprovado, inalterado: imagem full-bleed atrás, texto sobreposto à esquerda. */}
        <Section
          tone="deep"
          className="hidden overflow-hidden lg:flex lg:min-h-[clamp(480px,60vh,680px)] lg:items-center lg:py-0"
        >
          <Reveal className="relative z-10 max-w-[480px] lg:py-10">
            <h2 className="text-[2.7rem] leading-[1.15] text-[var(--primary-foreground)]">
              A cirurgia de catarata também pode ser uma decisão sobre como você quer
              enxergar depois.
            </h2>
            <div className="mt-7 max-w-[430px] space-y-4 text-sm leading-relaxed text-[var(--primary-foreground)]/75">
              <p>
                Ao remover a catarata, uma lente intraocular passa a exercer a função do
                cristalino. Hoje existem diferentes tecnologias capazes de corrigir graus e
                oferecer diferentes possibilidades de visão.
              </p>
              <p>
                A escolha começa pela avaliação dos olhos, mas também passa pela rotina,
                pelas prioridades e pelas expectativas de cada pessoa.
              </p>
            </div>
            <CTAButton href={site.whatsappUrl} variant="light-solid" className="mt-9">
              Agendar avaliação
            </CTAButton>
          </Reveal>

          <img
            src={imageUrl("home_09_lente_intraocular.jpg")}
            alt="Lente intraocular utilizada na cirurgia de catarata"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
        </Section>
      </div>

      {/* 05 — Ciência */}
      <Section
        id="formacoes"
        tone="paper"
        className="py-16 md:py-20 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center"
      >
        <div className="grid gap-12 lg:grid-cols-[34fr_66fr] lg:items-start lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Ciência que chega à consulta"
              title="Quando pesquisa, ensino e prática clínica se encontram."
              text={
                <p>
                  A pesquisa sempre esteve presente na trajetória da Dra. Diane. Da
                  superfície ocular aos transplantes de córnea, parte das perguntas que
                  surgem diante dos pacientes também se transforma em investigação
                  científica.
                </p>
              }
            />
            <Reveal delay={120} className="mt-8 lg:mt-10">
              <CTAButton onClick={openFormacaoMedica}>
                Conheça sua atuação em ciência e ensino
              </CTAButton>
            </Reveal>
          </div>

          <ScienceCards
            activeId={scienceActiveId}
            setActiveId={setScienceActiveId}
            triggerRef={scienceTriggerRef}
          />
        </div>
      </Section>

      <InstitutionStrip />

      {/* CTA final — mesma lógica da seção da lente intraocular: mobile e
          desktop são composições irmãs (lg:hidden / hidden lg:flex). No
          mobile a imagem (retrato do olho, vertical, arquivo próprio) vira
          background da própria seção com o mesmo recorte-por-aspect-ratio +
          cor de fundo amostrada no ponto de corte; no desktop mantém-se o
          `FinalCTA` original (foto em paisagem, overlay full-bleed) sem
          nenhuma alteração. */}
      <div id="contato">
        <section
          className="relative overflow-hidden bg-[#605c2f] bg-no-repeat pb-6 pt-0 text-[var(--primary-foreground)] sm:pb-7 md:pb-7 md:pt-0 lg:hidden"
          style={{
            backgroundImage: `url(${imageUrl("home_13b_final_cta_olho_mobile.jpg")})`,
            backgroundPosition: "center top",
            backgroundSize: "100% auto",
          }}
        >
          <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
            <div aria-hidden="true" className="-mx-5 aspect-[941/836] w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)]" />

            <Reveal className="pt-3 sm:pt-4">
              <h2 className="text-[clamp(1.4rem,6.2vw,1.95rem)] leading-[1.18] text-[var(--primary-foreground)]">
                Sua visão merece uma decisão bem compreendida.
              </h2>
              <p className="mt-2.5 max-w-[480px] text-[clamp(0.86rem,3.8vw,0.96rem)] leading-[1.5] text-[var(--primary-foreground)]/75">
                Se você tem uma dúvida sobre sua visão, recebeu um diagnóstico ou está
                considerando uma cirurgia, a consulta é o momento de entender o seu caso e as
                possibilidades disponíveis.
              </p>
              <div className="mt-6 flex justify-center sm:mt-7">
                <CTAButton href={site.whatsappUrl} variant="light-solid" className="h-11 px-5 text-[0.92rem]">
                  Agendar consulta
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </section>

        <Section
          tone="deep"
          className="relative hidden overflow-hidden py-16 lg:flex lg:min-h-[420px] lg:items-center lg:py-0"
        >
          <img
            src={imageUrl("home_13_final_cta_olho.jpg")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <Reveal className="relative z-10 max-w-md">
            <h2 className="text-3xl leading-tight text-[var(--primary-foreground)] sm:text-4xl">
              Sua visão merece uma decisão bem compreendida.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--primary-foreground)]/75">
              Se você tem uma dúvida sobre sua visão, recebeu um diagnóstico ou está
              considerando uma cirurgia, a consulta é o momento de entender o seu caso e as
              possibilidades disponíveis.
            </p>
            <CTAButton href={site.whatsappUrl} variant="light-solid" className="mt-7">
              Agendar consulta
            </CTAButton>
          </Reveal>
        </Section>
      </div>
      <p className="sr-only">
        Dra. Diane Marinho — oftalmologista em Porto Alegre. Atendimento em {site.clinica}.
      </p>
    </>
  );
}

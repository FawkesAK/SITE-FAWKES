import { createFileRoute } from "@tanstack/react-router";
import {
  Figure,
  FinalCTA,
  PageHero,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/site/blocks";

export const Route = createFileRoute("/cornea")({
  head: () => ({
    meta: [
      { title: "Especialista em Córnea em Porto Alegre | Dra. Diane Marinho" },
      { name: "description", content: "Ceratocone, superfície ocular, olho seco, infecções e transplantes de córnea em Porto Alegre com a Dra. Diane Marinho." },
      { property: "og:title", content: "Especialista em Córnea em Porto Alegre | Dra. Diane Marinho" },
      { property: "og:description", content: "Investigação especializada em doenças da córnea e da superfície ocular." },
      { property: "og:url", content: "/cornea" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/cornea" }],
  }),
  component: Page,
});

const areas = [
  { titulo: "Ceratocone", file: "cornea_02_ceratocone.jpg", texto: "Afinamento e mudança da curvatura da córnea, com acompanhamento por exames de imagem." },
  { titulo: "Superfície ocular", file: "cornea_03_superficie.jpg", texto: "Filme lacrimal, epitélio e doenças inflamatórias que afetam a qualidade visual." },
  { titulo: "Olho seco", file: "cornea_04_olho_seco.jpg", texto: "Investigação das causas e condutas conforme o quadro apresentado." },
  { titulo: "Infecções da córnea", file: "cornea_05_infeccoes.jpg", texto: "Diagnóstico e acompanhamento de quadros infecciosos da córnea." },
  { titulo: "Transplantes", file: "cornea_06_transplante.jpg", texto: "Diferentes técnicas conforme a camada comprometida." },
  { titulo: "Doação de córneas", file: "cornea_07_doacao.jpg", texto: "Atuação institucional junto ao Banco de Olhos do HCPA." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Córnea"
        title="A córnea está no centro de grande parte da trajetória da Dra. Diane."
        paragraphs={[
          "Transparente e delicada, a córnea participa diretamente da forma como a luz entra nos olhos.",
          "Alterações na sua estrutura podem afetar muito a qualidade da visão e exigir investigação especializada.",
        ]}
        file="cornea_01_hero.jpg"
        alt="Dra. Diane Marinho examinando um paciente na lâmpada de fenda"
      />

      <Section tone="background">
        <SectionHeader eyebrow="Áreas de investigação" title="O que é avaliado em córnea e superfície ocular" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.titulo} delay={i * 70} as="article" className="group/fig overflow-hidden rounded-sm border border-border bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <Figure file={a.file} alt={a.titulo} ratio="16/10" className="rounded-none" />
              <div className="p-6">
                <h3 className="font-display text-xl">{a.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" id="transplante">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="Transplante de córnea"
            title="Nem todo transplante de córnea é igual."
            text={
              <>
                <p>
                  A córnea possui diferentes camadas. Dependendo da estrutura comprometida, técnicas
                  distintas podem permitir a substituição de partes específicas ou da espessura total da
                  córnea.
                </p>
                <p>A indicação depende do diagnóstico e da avaliação de cada caso.</p>
              </>
            }
          />
          <Reveal delay={120}>
            <Figure file="cornea_08_transplante_lamelar.jpg" alt="Procedimento de transplante lamelar de córnea" ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section tone="background" id="superficie-ocular">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Figure file="cornea_09_superficie_ocular.jpg" alt="Exame da superfície ocular" ratio="4/3" />
          </Reveal>
          <SectionHeader
            eyebrow="Superfície ocular"
            title="Uma superfície ocular saudável também faz parte de enxergar bem."
            text={
              <>
                <p>
                  O filme lacrimal cobre a superfície do olho e participa da nitidez da imagem. Quando sua
                  composição ou estabilidade se altera, a visão pode oscilar ao longo do dia.
                </p>
                <p>
                  Olho seco e doenças inflamatórias da superfície ocular exigem investigação própria, porque
                  impactam o conforto, a qualidade visual e também o planejamento de cirurgias.
                </p>
              </>
            }
          />
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

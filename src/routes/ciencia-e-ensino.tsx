import { createFileRoute } from "@tanstack/react-router";
import {
  AuthorityMetrics,
  Figure,
  FinalCTA,
  PageHero,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/site/blocks";

export const Route = createFileRoute("/ciencia-e-ensino")({
  head: () => ({
    meta: [
      { title: "Ciência e Ensino | Dra. Diane Marinho" },
      { name: "description", content: "Pesquisa, ensino e produção científica da Dra. Diane Marinho na UFRGS e no Hospital de Clínicas de Porto Alegre." },
      { property: "og:title", content: "Ciência e Ensino | Dra. Diane Marinho" },
      { property: "og:description", content: "Conhecimento que sai da pesquisa e volta para o cuidado." },
      { property: "og:url", content: "/ciencia-e-ensino" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/ciencia-e-ensino" }],
  }),
  component: Page,
});

const historias = [
  { titulo: "Soro autólogo", texto: "Pesquisa e aplicação clínica em superfície ocular.", file: "ciencia_02_soro_autologo.jpg" },
  { titulo: "Transplantes lamelares", texto: "Evolução das técnicas de transplante de córnea.", file: "ciencia_03_transplante_lamelar.jpg" },
  { titulo: "Formação médica", texto: "Alunos, residentes e pós-graduandos.", file: "ciencia_04_formacao_medica.jpg" },
  { titulo: "Congressos e produção científica", texto: "Participação contínua no debate científico da oftalmologia.", file: "ciencia_05_congresso.jpg" },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Ciência & Ensino"
        title="Conhecimento que sai da pesquisa e volta para o cuidado."
        paragraphs={[
          "Assistência, ensino e pesquisa fazem parte da mesma trajetória.",
          "Ao ensinar, investigar e participar da produção científica, a Dra. Diane mantém uma relação contínua com a evolução da Oftalmologia.",
        ]}
        file="ciencia_01_hero_aula.jpg"
        alt="Dra. Diane Marinho em atividade de ensino"
      />

      <Section tone="background" className="py-14">
        <div className="rounded-sm border border-border bg-paper px-6 py-10 sm:px-10">
          <AuthorityMetrics />
        </div>
      </Section>

      <Section tone="background" className="pt-4">
        <SectionHeader title="Linhas que atravessam a trajetória científica" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {historias.map((h, i) => (
            <Reveal key={h.titulo} delay={i * 80} as="article" className="group/fig">
              <Figure file={h.file} alt={h.titulo} ratio="16/10" />
              <h3 className="mt-5 font-display text-2xl">{h.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.texto}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

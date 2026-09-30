import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/content/site";
import {
  ArrowLink,
  Figure,
  FinalCTA,
  PageHero,
  Reveal,
  Section,
  SectionHeader,
  Timeline,
} from "@/components/site/blocks";

export const Route = createFileRoute("/cirurgia-refrativa")({
  head: () => ({
    meta: [
      { title: "Cirurgia Refrativa em Porto Alegre | Dra. Diane Marinho" },
      { name: "description", content: "Miopia, hipermetropia e astigmatismo: entenda quando existe indicação para cirurgia refrativa em Porto Alegre com a Dra. Diane Marinho." },
      { property: "og:title", content: "Cirurgia Refrativa em Porto Alegre | Dra. Diane Marinho" },
      { property: "og:description", content: "Menos dependência dos óculos pode começar por uma boa indicação." },
      { property: "og:url", content: "/cirurgia-refrativa" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/cirurgia-refrativa" }],
  }),
  component: Page,
});

const graus = [
  { titulo: "Miopia", texto: "Dificuldade para enxergar de longe." },
  { titulo: "Hipermetropia", texto: "Esforço visual, sobretudo para perto." },
  { titulo: "Astigmatismo", texto: "Distorção da imagem em diferentes distâncias." },
  { titulo: "Nem todo caso é cirúrgico", texto: "Uma avaliação completa é essencial para definir a melhor conduta." },
];

const processo = [
  { titulo: "Avaliação completa", texto: "Exame ocular e medidas necessárias." },
  { titulo: "Análise da córnea", texto: "Espessura, curvatura e regularidade." },
  { titulo: "Escolha da técnica", texto: "Conforme os achados e o perfil do caso." },
  { titulo: "Cirurgia", texto: "Planejamento individualizado." },
  { titulo: "Acompanhamento", texto: "Retornos definidos pela avaliação médica." },
];

const tecnicas = [
  { nome: "LASIK", file: "refrativa_03_lasik.jpg" },
  { nome: "PRK", file: "refrativa_04_prk.jpg" },
  { nome: "SMILE", file: "refrativa_05_smile.jpg" },
  { nome: "Tratamentos personalizados / guiados", file: "refrativa_06_topografia.jpg" },
];

const criterios = ["Idade", "Estabilidade do grau", "Saúde da córnea", "Saúde dos olhos", "Rotina e expectativas"];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Cirurgia refrativa"
        title="Menos dependência dos óculos pode começar por uma boa indicação."
        paragraphs={[
          "Miopia, hipermetropia e astigmatismo podem ser corrigidos cirurgicamente em pacientes selecionados.",
          "A indicação depende do grau, da córnea, da idade, da saúde ocular e das necessidades visuais de cada pessoa.",
        ]}
        actions={<ArrowLink to="/cirurgia-refrativa" hash="quem-pode-fazer">Entenda se existe indicação</ArrowLink>}
        file="refrativa_01_hero.jpg"
        alt="Dra. Diane Marinho, oftalmologista especialista em córnea"
      />

      <Section tone="background">
        <SectionHeader title="A cirurgia refrativa pode corrigir diferentes graus." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {graus.map((g, i) => (
            <Reveal key={g.titulo} delay={i * 80} className="h-full rounded-sm border border-border bg-paper p-7">
              <span className="optic-ring block h-8 w-8" aria-hidden="true" />
              <h3 className="mt-6 font-display text-xl">{g.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.texto}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader title="Uma decisão que começa antes da cirurgia." />
            <div className="mt-10">
              <Timeline items={processo} />
            </div>
          </div>
          <Reveal delay={120}>
            <Figure file="refrativa_02_exame_cornea.jpg" alt="Exame de imagem da córnea" ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeader
          title="Existem diferentes formas de corrigir o grau."
          text={<p>Entre as técnicas existentes atualmente estão:</p>}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tecnicas.map((t, i) => (
            <Reveal key={t.nome} delay={i * 80} className="group/fig">
              <Figure file={t.file} alt={t.nome} ratio="4/3" />
              <h3 className="mt-4 font-display text-lg">{t.nome}</h3>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="background" id="quem-pode-fazer">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="Quem pode fazer"
            title="A indicação envolve muito mais do que o grau dos óculos."
            text={<p>Alguns critérios avaliados na consulta:</p>}
          />
          <Reveal delay={100}>
            <ul className="divide-y divide-border">
              {criterios.map((c) => (
                <li key={c} className="flex items-center gap-4 py-4 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink href={site.whatsappUrl}>Agendar avaliação</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

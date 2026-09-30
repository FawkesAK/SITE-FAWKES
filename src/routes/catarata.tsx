import { createFileRoute } from "@tanstack/react-router";
import { Sun, Glasses, CarFront, BookOpen } from "lucide-react";
import { site } from "@/content/site";
import {
  ArrowLink,
  CTAButton,
  FAQAccordion,
  Figure,
  FinalCTA,
  IconFeature,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/site/blocks";

const faq = [
  { q: "Quando devo operar a catarata?", a: "A decisão considera os achados dos exames e o quanto a catarata interfere na qualidade da visão e na rotina." },
  { q: "A cirurgia causa dor?", a: "A experiência pode variar. O tipo de anestesia e os cuidados são definidos pelo médico conforme o caso." },
  { q: "Quanto tempo leva a recuperação?", a: "A recuperação varia conforme o paciente, as condições dos olhos e a cirurgia realizada." },
  { q: "A cirurgia pode corrigir meu grau?", a: "Em muitos casos é possível planejar a lente intraocular considerando parte do grau existente. A possibilidade e o resultado esperado precisam ser avaliados individualmente." },
  { q: "Lente multifocal serve para todo mundo?", a: "Não. Saúde da córnea, retina, nervo óptico, rotina, expectativas e outros fatores precisam ser analisados." },
];

const lentes = [
  { nome: "Monofocal", texto: "Projetada para privilegiar uma faixa principal de visão.", file: "catarata_03_lente_monofocal.png" },
  { nome: "Tórica", texto: "Pode ser indicada quando também existe astigmatismo elegível para correção.", file: "catarata_04_lente_torica.png" },
  { nome: "Multifocal", texto: "Distribui foco para mais de uma distância e pode reduzir a dependência dos óculos em pacientes selecionados.", file: "catarata_05_lente_multifocal.png" },
  { nome: "EDOF (foco estendido)", texto: "Tecnologia desenvolvida para ampliar a faixa de visão, com características próprias de desempenho.", file: "catarata_06_lente_edof.png" },
];

const rotina = [
  { titulo: "Visão no dia a dia", file: "catarata_07_rotina_dia.jpg" },
  { titulo: "Direção noturna", file: "catarata_08_direcao_noturna.jpg" },
  { titulo: "Leitura e tarefas próximas", file: "catarata_09_leitura.jpg" },
  { titulo: "Dependência dos óculos", file: "catarata_10_oculos.jpg" },
];

export const Route = createFileRoute("/catarata")({
  head: () => ({
    meta: [
      { title: "Cirurgia de Catarata em Porto Alegre | Dra. Diane Marinho" },
      { name: "description", content: "Cirurgia de catarata em Porto Alegre com a Dra. Diane Marinho: diagnóstico, planejamento das lentes intraoculares e possibilidade de correção do grau." },
      { property: "og:title", content: "Cirurgia de Catarata em Porto Alegre | Dra. Diane Marinho" },
      { property: "og:description", content: "Entenda a cirurgia de catarata, os tipos de lentes intraoculares e como a indicação é feita." },
      { property: "og:url", content: "/catarata" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/catarata" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "/" },
            { "@type": "ListItem", position: 2, name: "Catarata", item: "/catarata" },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="texture-paper relative bg-paper pt-24 md:pt-20">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[46fr_54fr] lg:gap-14 lg:py-20">
          <Reveal>
            <p className="eyebrow text-gold">Catarata</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
              Enxergar bem é viver com mais liberdade.
            </h1>
            <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
              A catarata muda a qualidade da visão aos poucos. Quando chega a hora de operar, o
              planejamento da lente pode considerar o grau, a rotina e as prioridades visuais de cada
              pessoa.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTAButton to="/catarata" hash="cirurgia">Entenda a cirurgia</CTAButton>
              <CTAButton to="/catarata" hash="lentes-intraoculares" variant="secondary">
                Conheça os tipos de lentes
              </CTAButton>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Figure file="catarata_01_hero_dra_diane.jpg" alt="Dra. Diane Marinho no consultório, ao lado da lâmpada de fenda" ratio="4/3.1" priority />
          </Reveal>
        </div>
      </section>

      <Section tone="background">
        <div className="grid gap-12 lg:grid-cols-[42fr_58fr] lg:gap-16">
          <SectionHeader
            eyebrow="Como a catarata acontece"
            title="Com o tempo, o cristalino perde sua transparência."
            text={
              <>
                <p>
                  A catarata é a perda progressiva da transparência do cristalino, uma lente natural que
                  ajuda a focalizar a luz dentro dos olhos.
                </p>
                <p>Essa alteração pode modificar a qualidade da visão e interferir gradualmente na rotina.</p>
              </>
            }
          />
          <div className="grid gap-8 divide-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
            <IconFeature icon={Glasses} title="Visão embaçada ou com neblina" />
            <IconFeature icon={Sun} title="Sensibilidade à luz e ofuscamento" delay={80} />
            <IconFeature icon={CarFront} title="Dificuldade para dirigir à noite" delay={160} />
            <IconFeature icon={BookOpen} title="Mudanças frequentes no grau dos óculos" delay={240} />
          </div>
        </div>
      </Section>

      <Section tone="paper" id="cirurgia">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="A cirurgia"
            title="O objetivo é substituir o cristalino opaco por uma lente intraocular."
            text={
              <>
                <p>
                  Na cirurgia de catarata, o cristalino que perdeu transparência é removido e substituído
                  por uma lente intraocular.
                </p>
                <p>
                  A técnica, a anestesia e o planejamento variam conforme a avaliação médica e as
                  características de cada caso.
                </p>
              </>
            }
          />
          <Reveal delay={120}>
            <Figure file="catarata_02_cirurgia.jpg" alt="Microscópio cirúrgico utilizado em cirurgia de catarata" ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section tone="sand" id="lentes-intraoculares">
        <SectionHeader
          eyebrow="Lentes intraoculares"
          title={<>Cada lente tem características diferentes.<br />A escolha também precisa ser individual.</>}
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lentes.map((l, i) => (
            <Reveal key={l.nome} delay={i * 80} as="article" className="flex h-full flex-col rounded-sm border border-border bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <Figure file={l.file} alt={`Lente intraocular ${l.nome}`} ratio="4/3" className="bg-background" />
              <h3 className="mt-5 font-display text-xl">{l.nome}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{l.texto}</p>
              <ArrowLink to="/dra-diane-explica/$slug" className="mt-5">Saiba mais</ArrowLink>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-12 text-center">
          <CTAButton to="/dra-diane-explica/lentes-intraoculares-na-catarata" variant="secondary">
            Entenda todas as opções de lentes →
          </CTAButton>
        </Reveal>
      </Section>

      <Section tone="background">
        <div className="grid gap-12 lg:grid-cols-[34fr_66fr] lg:gap-14">
          <div>
            <SectionHeader
              eyebrow="Indicação"
              title="A decisão começa nos exames, mas também passa pela sua rotina."
              text={
                <p>
                  A lente mais adequada depende da saúde dos olhos, do grau, das atividades que fazem parte
                  do dia e das expectativas de cada paciente.
                </p>
              }
            />
            <Reveal delay={120} className="mt-8">
              <ArrowLink href={site.whatsappUrl}>Agendar avaliação</ArrowLink>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rotina.map((r, i) => (
              <Reveal key={r.titulo} delay={i * 80} className="group/fig">
                <Figure file={r.file} alt={r.titulo} ratio="3/4" />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.titulo}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[34fr_66fr] lg:gap-14">
          <SectionHeader
            eyebrow="Dúvidas frequentes"
            title={<>Perguntas frequentes<br />sobre catarata</>}
          />
          <Reveal delay={100}>
            <FAQAccordion items={faq} />
          </Reveal>
        </div>
      </Section>

      <FinalCTA text="Agende uma avaliação completa para entender qual é a melhor opção para o seu caso." />
    </>
  );
}

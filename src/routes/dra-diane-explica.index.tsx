import { createFileRoute } from "@tanstack/react-router";
import { artigos, categoriasExplica } from "@/content/artigos";
import {
  ArticleCard,
  FinalCTA,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/site/blocks";

export const Route = createFileRoute("/dra-diane-explica/")({
  head: () => ({
    meta: [
      { title: "Dra. Diane Explica | Conteúdos sobre Visão e Oftalmologia" },
      { name: "description", content: "Conteúdos sobre catarata, córnea, ceratocone, lentes intraoculares e cirurgia refrativa explicados pela Dra. Diane Marinho." },
      { property: "og:title", content: "Dra. Diane Explica | Conteúdos sobre Visão e Oftalmologia" },
      { property: "og:description", content: "Perguntas sobre visão merecem respostas que façam sentido." },
      { property: "og:url", content: "/dra-diane-explica" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/dra-diane-explica" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Section tone="paper" className="pt-32 md:pt-36">
        <Reveal>
          <p className="eyebrow text-gold">Conteúdo</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">Dra. Diane explica</h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            Perguntas sobre visão merecem respostas que façam sentido.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-10 flex flex-wrap gap-2">
          {categoriasExplica.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </Reveal>
      </Section>

      <Section tone="background">
        <SectionHeader title="Conteúdos publicados" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigos.map((a, i) => (
            <ArticleCard
              key={a.slug}
              title={a.titulo}
              category={a.categoria}
              to={`/dra-diane-explica/${a.slug}`}
              file={a.imagem}
              delay={i * 80}
            />
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

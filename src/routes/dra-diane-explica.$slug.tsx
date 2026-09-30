import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArtigo } from "@/content/artigos";
import { site } from "@/content/site";
import {
  CTAButton,
  Figure,
  FinalCTA,
  Reveal,
  Section,
} from "@/components/site/blocks";

export const Route = createFileRoute("/dra-diane-explica/$slug")({
  loader: ({ params }) => {
    const artigo = getArtigo(params.slug);
    if (!artigo) throw notFound();
    return { artigo };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Conteúdo indisponível" }, { name: "robots", content: "noindex" }] };
    }
    const { artigo } = loaderData;
    return {
      meta: [
        { title: `${artigo.titulo} | Dra. Diane Marinho` },
        { name: "description", content: artigo.resumo },
        { property: "og:title", content: artigo.titulo },
        { property: "og:description", content: artigo.resumo },
        { property: "og:url", content: `/dra-diane-explica/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/dra-diane-explica/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: artigo.titulo,
            description: artigo.resumo,
            author: { "@type": "Person", name: "Dra. Diane Marinho" },
            about: artigo.categoria,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "/" },
              { "@type": "ListItem", position: 2, name: "Dra. Diane Explica", item: "/dra-diane-explica" },
              { "@type": "ListItem", position: 3, name: artigo.titulo, item: `/dra-diane-explica/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { artigo } = Route.useLoaderData();

  return (
    <>
      <Section tone="paper" className="pt-32 md:pt-36">
        <Reveal>
          <nav aria-label="Trilha de navegação" className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/dra-diane-explica" className="hover:text-primary">Dra. Diane Explica</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{artigo.categoria}</span>
          </nav>
          <p className="eyebrow mt-8 text-gold">{artigo.categoria}</p>
          <h1 className="mt-4 max-w-3xl text-[2.3rem] leading-[1.1] sm:text-5xl">{artigo.titulo}</h1>
          <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">{artigo.resumo}</p>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <Figure file={artigo.imagem} alt={artigo.titulo} ratio="16/7" priority />
        </Reveal>
      </Section>

      <Section tone="background">
        <article className="mx-auto max-w-2xl">
          {artigo.secoes.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 60} className="mb-10 last:mb-0">
              <h2 className="text-2xl sm:text-[1.75rem]">{s.titulo}</h2>
              {s.paragrafos.map((p) => (
                <p key={p} className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </Reveal>
          ))}
          <Reveal className="mt-14 rounded-sm border border-border bg-paper p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Este conteúdo tem caráter informativo e não substitui uma avaliação médica individual.
            </p>
            <CTAButton href={site.whatsappUrl} className="mt-6">Agendar consulta</CTAButton>
          </Reveal>
        </article>
      </Section>

      <FinalCTA />
    </>
  );
}

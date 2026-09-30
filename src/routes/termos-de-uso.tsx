import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Section } from "@/components/site/blocks";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Dra. Diane Marinho" },
      {
        name: "description",
        content: "Termos de uso do site institucional da Dra. Diane Marinho.",
      },
      { property: "og:title", content: "Termos de Uso | Dra. Diane Marinho" },
      { property: "og:url", content: "/termos-de-uso" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/termos-de-uso" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Section tone="paper" className="pt-32 md:pt-36">
        <Reveal>
          <p className="eyebrow text-gold">Institucional</p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.08] sm:text-5xl">Termos de Uso</h1>
          <p className="mt-5 text-sm text-muted-foreground">Última atualização: agosto de 2026.</p>
        </Reveal>
      </Section>

      <Section tone="background">
        <Reveal className="max-w-2xl space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Este site possui finalidade institucional e informativa e apresenta informações sobre
            a atuação profissional da Dra. Diane Marinho e suas áreas de atuação em oftalmologia.
          </p>
          <p>
            Os conteúdos disponibilizados têm caráter educativo e não substituem consulta médica,
            diagnóstico, avaliação individualizada ou orientação profissional.
          </p>
          <p>
            Informações sobre doenças, tratamentos, cirurgias ou procedimentos são apresentadas de
            maneira geral. A indicação e os resultados de qualquer tratamento dependem das
            características individuais de cada paciente e de avaliação médica adequada.
          </p>
          <p>
            Os botões de contato e agendamento podem direcionar o usuário para serviços externos,
            como o WhatsApp. O envio de uma mensagem não representa confirmação automática de
            consulta.
          </p>
          <p>
            Os textos, imagens, fotografias, vídeos e demais conteúdos deste site não podem ser
            reproduzidos ou utilizados comercialmente sem autorização.
          </p>
          <p>
            Ao utilizar este site, o usuário declara estar de acordo com estes Termos de Uso e com
            a Política de Privacidade.
          </p>
        </Reveal>
      </Section>
    </>
  );
}

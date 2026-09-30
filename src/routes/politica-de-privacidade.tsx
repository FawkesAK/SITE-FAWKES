import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Section } from "@/components/site/blocks";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Dra. Diane Marinho" },
      {
        name: "description",
        content: "Política de privacidade do site institucional da Dra. Diane Marinho.",
      },
      { property: "og:title", content: "Política de Privacidade | Dra. Diane Marinho" },
      { property: "og:url", content: "/politica-de-privacidade" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Section tone="paper" className="pt-32 md:pt-36">
        <Reveal>
          <p className="eyebrow text-gold">Institucional</p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.08] sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">Última atualização: agosto de 2026.</p>
        </Reveal>
      </Section>

      <Section tone="background">
        <Reveal className="max-w-2xl space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Este site possui caráter institucional e informativo e tem como objetivo apresentar a
            atuação profissional da Dra. Diane Marinho e facilitar o acesso aos seus canais de
            atendimento.
          </p>
          <p>O site não solicita diretamente informações médicas ou dados pessoais por meio de formulários.</p>
          <p>
            Ao utilizar os botões de contato ou agendamento, o usuário poderá ser direcionado ao
            WhatsApp, serviço operado por terceiros e sujeito às próprias políticas de privacidade
            da plataforma.
          </p>
          <p>
            Durante a navegação, poderão ser coletadas automaticamente informações técnicas
            básicas, como tipo de dispositivo, navegador, endereço IP e dados de acesso,
            especialmente quando utilizados serviços de hospedagem, segurança ou ferramentas de
            análise de audiência.
          </p>
          <p>
            Essas informações, quando existentes, são utilizadas exclusivamente para
            funcionamento, segurança e melhoria do site.
          </p>
          <p>
            A Dra. Diane Marinho compromete-se a respeitar a privacidade dos usuários e a
            legislação brasileira aplicável à proteção de dados pessoais.
          </p>
          <p>
            Em caso de dúvidas relacionadas à privacidade e ao tratamento de dados, entre em
            contato pelos canais disponibilizados neste site.
          </p>
        </Reveal>
      </Section>
    </>
  );
}

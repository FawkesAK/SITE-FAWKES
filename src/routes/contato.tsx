import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import {
  CTAButton,
  Figure,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/site/blocks";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e Agendamento | Dra. Diane Marinho" },
      { name: "description", content: "Onde encontrar a Dra. Diane Marinho, oftalmologista em Porto Alegre. Endereço, telefone, WhatsApp e agendamento de consulta." },
      { property: "og:title", content: "Contato e Agendamento | Dra. Diane Marinho" },
      { property: "og:description", content: "Atendimento no Oftalmocentro, Porto Alegre — RS." },
      { property: "og:url", content: "/contato" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Section tone="paper" className="pt-32 md:pt-36">
        <Reveal>
          <p className="eyebrow text-gold">Contato</p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.08] sm:text-5xl">
            Onde encontrar a Dra. Diane
          </h1>
          <p className="mt-5 text-[0.95rem] text-muted-foreground">
            {site.clinica} — {site.cidade}
          </p>
        </Reveal>
      </Section>

      <Section tone="background">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader title="Agendamento e localização" />
            <dl className="mt-10 divide-y divide-border">
              <div className="flex gap-4 py-5">
                <MapPin size={20} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="text-sm font-semibold">Endereço</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {site.clinica}
                    <br />
                    {site.endereco}
                    <br />
                    {site.cidade}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4 py-5">
                <Phone size={20} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="text-sm font-semibold">Telefone</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{site.telefone}</dd>
                </div>
              </div>
              <div className="flex gap-4 py-5">
                <MessageCircle size={20} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="text-sm font-semibold">WhatsApp</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{site.whatsapp}</dd>
                </div>
              </div>
            </dl>
            <Reveal delay={100} className="mt-8">
              <CTAButton href={site.whatsappUrl}>Agendar consulta</CTAButton>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Para agendar, informe seu nome, o motivo da consulta e, se houver, exames ou
                diagnósticos recentes. Isso ajuda a organizar melhor o tempo do atendimento.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="space-y-6">
            <Figure file="contato_01_oftalmocentro.jpg" alt="Fachada do Oftalmocentro em Porto Alegre" ratio="4/3" />
            <div className="flex min-h-[220px] items-center justify-center rounded-sm border border-dashed border-secondary bg-paper p-6 text-center">
              <p className="font-mono text-[11px] text-muted-foreground">
                INSERIR: {site.googleMapsEmbed}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

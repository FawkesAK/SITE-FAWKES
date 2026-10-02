import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

const faqs = [
  {
    q: "Quem cria os conteúdos, vocês ou eu?",
    a: "Nós criamos tudo: roteiro, texto, design e edição. A estratégia existe justamente para unir a sua forma de comunicar ao comportamento do seu paciente, para que cada conteúdo tenha o efeito desejado. Você aprova.",
  },
  {
    q: "Vai ter postagem no primeiro mês?",
    a: "Sim. A primeira publicação acontece cerca de 20 dias após o início. Antes disso, estruturamos toda a comunicação, para que cada post já nasça dentro da estratégia.",
  },
  {
    q: "Preciso gravar vídeos?",
    a: "Sim. O objetivo é que você tenha resultado, e isso exige que o paciente conheça você. Nós cuidamos da criação, do roteiro e da edição. A presença continua sendo sua, e é ela que gera confiança.",
  },
  {
    q: "Vocês gravam em outros lugares, como estúdio?",
    a: "Sim. Todo mês combinamos com você o local da captação, do ensaio ou do vídeo, conforme o que fizer mais sentido para o projeto.",
  },
  {
    q: "Vocês fazem stories?",
    a: "Sim. Criamos sequências estratégicas de stories conforme a necessidade do projeto, para posicionar, educar ou converter. Também orientamos o que você pode postar no dia a dia e, se quiser, montamos um calendário de stories para você seguir.",
  },
  {
    q: "Vocês trabalham com outras redes além do Instagram?",
    a: "Sim. Analisamos o perfil do paciente que você quer atrair, a faixa etária e o momento de vida dele, e a partir disso definimos onde você precisa estar: TikTok, YouTube, LinkedIn, Facebook, Pinterest ou onde fizer sentido.",
  },
  {
    q: "O tráfego pago está incluso?",
    a: "A gestão está inclusa. O valor investido nos anúncios é pago direto à plataforma, Google ou Meta (Instagram e Facebook), e definimos juntos o valor ideal para o seu objetivo.",
  },
  {
    q: "Por que só oftalmologia?",
    a: "Porque é de onde viemos e o que conhecemos por dentro. Isso muda a qualidade de cada texto e de cada estratégia.",
  },
  {
    q: "Quanto tempo dura o projeto?",
    a: "Seis meses. É o tempo para construir posicionamento e ver o seu nome crescer com consistência.",
  },
  {
    q: "Qual o investimento?",
    a: "Apresentamos na conversa, depois de entender o seu momento e os seus objetivos.",
  },
  {
    q: "Vocês atendem outras cidades?",
    a: "Neste momento, atendemos médicas de Porto Alegre e região.",
  },
];

/** Perguntas frequentes — título centralizado em uma linha, acordeão abaixo. */
export function FAQ() {
  return (
    <section
      id="perguntas"
      data-header-tone="light"
      aria-labelledby="perguntas-title"
      className="relative isolate bg-[var(--fawkes-offwhite)] py-20 sm:py-24 lg:py-28"
    >
      <PaperGrainTexture />
      <div className="mx-auto max-w-[56rem] px-5 sm:px-8">
        <Reveal className="text-center">
          <h2
            id="perguntas-title"
            className="whitespace-nowrap font-editorial text-[clamp(2.1rem,9vw,3rem)] font-normal leading-[1.02] tracking-[-0.015em] text-[var(--fawkes-navy)] sm:text-[clamp(2.8rem,5.6vw,3.4rem)] lg:text-[clamp(3rem,3.8vw,3.8rem)]"
          >
            Perguntas <em className="text-[oklch(0.52_0.11_255)]">frequentes</em>
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 sm:mt-12 lg:mt-14">
          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="border-t border-[var(--fawkes-navy)]/12"
          >
            {faqs.map((f) => (
              <AccordionPrimitive.Item
                key={f.q}
                value={f.q}
                className="border-b border-[var(--fawkes-navy)]/12"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fawkes-navy)]/30">
                    <span className="font-editorial text-[1.35rem] leading-[1.2] text-[var(--fawkes-navy)] sm:text-[1.5rem]">
                      {f.q}
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--fawkes-navy)]/20 text-[var(--fawkes-navy)] transition-all duration-300 group-hover:border-[var(--fawkes-navy)]/45 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-[var(--fawkes-navy)] group-data-[state=open]:text-[var(--fawkes-offwhite)]">
                      <Plus size={16} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[40rem] pb-6 pr-14 text-[0.98rem] leading-[1.65] text-[var(--fawkes-navy)]/70">
                    {f.a}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  );
}

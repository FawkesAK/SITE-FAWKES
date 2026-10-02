import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

/** FAQ — copy AINDA EM APROVAÇÃO pela Fawkes. */
const faqs = [
  {
    q: "Nunca fiz marketing. Por onde começo?",
    a: "Pela conversa. Muitas das nossas clientes começaram do zero.",
  },
  {
    q: "Quem cria os conteúdos?",
    a: "A gente. Roteiro, texto, design e edição, sempre alinhados com você.",
  },
  {
    q: "Preciso gravar vídeos?",
    a: "Sim, no consultório, no centro cirúrgico ou em estúdio. A gente conduz a gravação.",
  },
  {
    q: "O tráfego pago está incluso?",
    a: "A gestão, sim. O valor dos anúncios é pago direto à plataforma.",
  },
  { q: "Quanto tempo dura?", a: "Seis meses." },
  { q: "Qual o investimento?", a: "A gente apresenta na conversa." },
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

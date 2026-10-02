import { Reveal } from "./primitives";
import { PaperGrainTexture } from "./PaperGrainTexture";

/** Dores que travam a reputação digital do médico (pílulas da seção). */
const pains = [
  "Nunca fez marketing e não sabe por onde começar.",
  "Falta de tempo para pensar em conteúdo.",
  "Conteúdo genérico, que não fala da sua subespecialidade.",
  "Perfil parecido com o de colegas.",
  "Textos que você mesma precisa escrever.",
  "Receio de se expor de um jeito que não combina com você.",
];

/**
 * Seção 3 — "Entendemos o que está travando a sua reputação".
 * Fundo = mesmo off-white da seção de logos (continuidade) + textura de papel
 * a ~3%. Dores em cards #0F2B46 em 3 linhas centralizadas de 2
 * (largura pelo conteúdo, altura idêntica; 1 coluna no mobile). Hover: elevação + scale 1.015 em 300ms.
 */
export function ReputationPains() {
  return (
    <section
      id="desafios"
      data-header-tone="light"
      aria-labelledby="desafios-title"
      className="relative isolate overflow-hidden bg-[oklch(0.978_0.002_250)] pb-20 pt-11 text-[var(--fawkes-navy)] sm:pb-24 sm:pt-[3.75rem] lg:pb-28 lg:pt-[4.5rem]"
    >
      <PaperGrainTexture />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[var(--fawkes-navy)]/55 sm:text-[0.8rem] lg:text-[0.85rem]">
            Entendemos o que está travando a sua reputação
          </p>
          <h2
            id="desafios-title"
            className="mx-auto mt-4 max-w-[17ch] font-editorial text-[clamp(2.1rem,8.6vw,2.9rem)] font-normal leading-[1.02] tracking-[-0.015em] text-[var(--fawkes-navy)] sm:mt-5 sm:max-w-[20ch] sm:text-[clamp(2.9rem,6.4vw,3.8rem)] lg:max-w-none lg:text-[clamp(3.6rem,4.6vw,4.6rem)] lg:leading-[0.98] lg:tracking-[-0.02em]"
          >
            <span className="lg:block lg:whitespace-nowrap">
              Sua carreira já é referência, mas o
            </span>{" "}
            <span className="lg:block lg:whitespace-nowrap">
              seu digital <em className="text-[oklch(0.52_0.11_255)]">ainda</em> não mostra isso?
            </span>
          </h2>
        </Reveal>

        {/* Composição central: 3 linhas de 2 cards. Cada card tem a largura do
            próprio texto e cada linha é centralizada como um todo (o encontro
            dos cards NÃO é forçado no eixo central). Altura idêntica.
            Abaixo de xl (não cabe): 1 coluna central. */}
        <div className="mx-auto mt-10 flex max-w-[40rem] flex-col gap-3 sm:mt-12 lg:mt-16 xl:max-w-none xl:gap-3.5">
          {[0, 2, 4].map((start, row) => (
            <ul
              key={start}
              className="flex flex-col gap-3 xl:flex-row xl:justify-center xl:gap-3.5"
            >
              {pains.slice(start, start + 2).map((pain, k) => (
                <Reveal key={pain} as="li" delay={80 + (row * 2 + k) * 70}>
                  <span className="flex min-h-[4.875rem] items-center gap-3.5 rounded-[10px] border border-white/[0.08] bg-[#0F2B46] px-6 py-4 text-[1rem] font-medium leading-snug text-[var(--fawkes-offwhite)]/95 shadow-[0_12px_28px_-20px_rgba(15,43,70,0.55)] transition-[transform,box-shadow] duration-300 ease-[var(--fawkes-motion-ease)] hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-[0_20px_36px_-20px_rgba(15,43,70,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 xl:h-[3.75rem] xl:min-h-0 xl:whitespace-nowrap xl:py-0 xl:text-[1.02rem]">
                    <span
                      aria-hidden="true"
                      className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border border-[var(--fawkes-mist)]/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--fawkes-offwhite)]" />
                    </span>
                    {pain}
                  </span>
                </Reveal>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

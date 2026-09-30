import type { RefObject } from "react";
import { Droplet, GraduationCap, Layers, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CTAButton, Figure, Reveal } from "./primitives";

export const cienciaItems = [
  {
    id: "soro-autologo",
    titulo: "Soro autólogo",
    textoCurto: "Pesquisa e aplicação em casos graves de superfície ocular.",
    textoLongo: [
      "O soro autólogo é uma alternativa terapêutica utilizada principalmente em casos graves de doença da superfície ocular, especialmente quando tratamentos convencionais com colírios lubrificantes não oferecem resposta suficiente.",
      "Produzido a partir do próprio sangue do paciente, o colírio de soro autólogo contém componentes naturalmente presentes no sangue, como proteínas, vitaminas e fatores de crescimento, que podem contribuir para proteção, recuperação e regeneração da superfície ocular.",
      "No Hospital de Clínicas de Porto Alegre, a implementação desse tratamento foi resultado de anos de pesquisa e organização institucional.",
      "Após aproximadamente uma década de estudos na área, o HCPA estruturou uma parceria público-privada para viabilizar a produção e disponibilização do tratamento, seguindo critérios técnicos e as regulamentações estabelecidas pela Anvisa.",
      "A iniciativa envolveu o Serviço de Oftalmologia do HCPA e o Banco de Sangue, dentro de um processo que buscou garantir segurança, qualidade e padronização na produção.",
      "A Dra. Diane Marinho participou desse processo em posição de coordenação, conectando pesquisa acadêmica, assistência aos pacientes e implementação clínica.",
    ],
    apoio: undefined,
    file: "home_10_ciencia_soro_autologo.jpg",
    icon: Droplet,
  },
  {
    id: "transplantes-lamelares",
    titulo: "Transplantes lamelares",
    textoCurto: "Técnicas que permitem substituir diferentes camadas da córnea.",
    textoLongo: [
      "O tratamento das doenças da córnea exige compreender que diferentes condições podem comprometer diferentes camadas da estrutura corneana.",
      "Essa evolução do conhecimento permitiu o desenvolvimento dos transplantes lamelares — técnicas nas quais é possível substituir seletivamente determinadas camadas da córnea, preservando estruturas saudáveis sempre que a indicação clínica permite.",
      "A formação da Dra. Diane em córnea e superfície ocular foi construída ao longo de diferentes etapas acadêmicas e assistenciais.",
      "Em 2000, realizou extensão universitária em Ocular Surface na University of Miami, nos Estados Unidos, com carga horária de 120 horas, aprofundando sua formação na área de superfície ocular.",
      "Esse período integrou uma trajetória que posteriormente incluiu mestrado e doutorado em Oftalmologia, além de atuação contínua em córnea, doenças externas, superfície ocular e transplantes no Hospital de Clínicas de Porto Alegre.",
      "Hoje, sua atuação nessa área reúne avaliação clínica, experiência cirúrgica, ensino e pesquisa.",
      "Nos transplantes lamelares, a escolha da técnica depende da camada comprometida, das características da doença e das necessidades específicas de cada paciente. A indicação deve ser individualizada após avaliação detalhada da córnea.",
    ],
    apoio: undefined,
    file: "home_11_ciencia_transplante_lamelar.jpg",
    icon: Layers,
  },
  {
    id: "formacao-medica",
    titulo: "Formação médica",
    textoCurto: "Ensino de alunos de graduação, residentes, fellows e pós-graduandos na UFRGS e no HCPA.",
    textoLongo: [
      "A trajetória da Dra. Diane foi construída entre formação especializada, pesquisa e ensino. Após a residência em Oftalmologia e o fellow em córnea no HCPA, concluiu mestrado e doutorado pela UNIFESP e ampliou sua formação em superfície ocular na University of Miami. Hoje, como professora da UFRGS e preceptora no HCPA, participa ativamente da formação de alunos de graduação, residentes, fellows e pós-graduandos, integrando conhecimento acadêmico e experiência clínica.",
    ],
    apoio: undefined,
    file: "home_12_ciencia_formacao_medica.jpg",
    icon: GraduationCap,
  },
] as const;

/**
 * Cards da seção "Ciência que chega à consulta": cada card abre um modal
 * com a descrição completa em vez de navegar para outra página.
 * `activeId`/`setActiveId` são controlados pelo pai (Home) para que outros
 * CTAs da página possam abrir o mesmo modal (ex.: "formacao-medica") sem
 * duplicar o componente ou o estado. `triggerRef` guarda o elemento que
 * originou a abertura (card ou CTA externo) para o foco voltar a ele quando
 * o modal fechar — necessário porque CTAs externos abrem o modal de forma
 * assíncrona (depois de um scroll), e o foco padrão do Radix só cobre o
 * caso síncrono.
 */
export function ScienceCards({
  activeId,
  setActiveId,
  triggerRef,
}: {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  triggerRef?: RefObject<HTMLElement | null>;
}) {
  const active = cienciaItems.find((item) => item.id === activeId) ?? null;

  return (
    <>
      <div className="grid gap-6 self-start sm:grid-cols-2 lg:grid-cols-3">
        {cienciaItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <Reveal key={item.id} delay={i * 80} as="article" className="group/fig h-full">
              <button
                type="button"
                onClick={(e) => {
                  if (triggerRef) triggerRef.current = e.currentTarget;
                  setActiveId(item.id);
                }}
                aria-haspopup="dialog"
                className={cn(
                  "flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-paper text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
                  isActive ? "border-primary/40 ring-1 ring-primary/15" : "border-border",
                )}
              >
                <div className="relative">
                  <Figure
                    file={item.file}
                    alt={item.titulo}
                    ratio="4/3"
                    className="rounded-none"
                  />
                  <span
                    className="absolute -bottom-6 left-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-primary shadow-[var(--shadow-card)] ring-4 ring-paper"
                    aria-hidden="true"
                  >
                    <Icon size={19} strokeWidth={1.5} className="text-[var(--primary-foreground)]" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-12">
                  <h3 className="font-display text-lg leading-snug">{item.titulo}</h3>
                  <p className="mt-2 flex-1 text-sm leading-snug text-muted-foreground">
                    {item.textoCurto}
                  </p>
                  <span className="arrow-link mt-4">
                    Saiba mais
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent
          onCloseAutoFocus={(e) => {
            if (triggerRef?.current) {
              e.preventDefault();
              triggerRef.current.focus();
            }
          }}
          className="flex max-h-[90vh] w-[calc(100vw-24px)] max-w-xl flex-col gap-0 overflow-hidden rounded-2xl border-none bg-paper p-0 shadow-[var(--shadow-lift)]"
        >
          {active ? (
            <>
              <div className="relative shrink-0">
                <Figure
                  file={active.file}
                  alt={active.titulo}
                  ratio="16/9"
                  className="rounded-none"
                  priority
                />
                <DialogClose className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-paper/90 text-foreground shadow-[var(--shadow-card)] backdrop-blur transition hover:bg-paper focus:outline-none focus:ring-2 focus:ring-ring">
                  <X size={16} />
                  <span className="sr-only">Fechar</span>
                </DialogClose>
              </div>
              <div className="overflow-y-auto px-8 py-8">
                <DialogTitle className="font-display text-2xl font-normal leading-tight text-foreground">
                  {active.titulo}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {active.textoLongo.map((paragrafo, i) => (
                      <p key={i}>{paragrafo}</p>
                    ))}
                  </div>
                </DialogDescription>
                {active.apoio ? (
                  <p className="mt-5 border-t border-border pt-4 text-xs font-medium tracking-wide text-gold">
                    {active.apoio}
                  </p>
                ) : null}
                <CTAButton href={site.whatsappUrl} className="mt-6">
                  Agendar consulta
                </CTAButton>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

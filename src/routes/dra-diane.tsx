import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Aperture,
  Droplet,
  Eye,
  Glasses,
  GraduationCap,
  Layers,
  Microscope,
  Stethoscope,
} from "lucide-react";
import { instituicoes } from "@/content/site";
import { imageUrl } from "@/content/images";
import {
  AuthorityMetrics,
  CTAButton,
  Figure,
  FinalCTA,
  MethodSteps,
  Reveal,
  Section,
  SectionHeader,
  Timeline,
} from "@/components/site/blocks";

export const Route = createFileRoute("/dra-diane")({
  head: () => ({
    meta: [
      { title: "Dra. Diane Marinho | Trajetória, Ciência e Ensino" },
      {
        name: "description",
        content:
          "Trajetória da Dra. Diane Marinho: professora da Faculdade de Medicina da UFRGS, chefe do Setor de Córnea do HCPA e Diretora Médica do Banco de Olhos do HCPA.",
      },
      { property: "og:title", content: "Dra. Diane Marinho | Trajetória, Ciência e Ensino" },
      {
        property: "og:description",
        content: "Assistência, ensino e pesquisa em oftalmologia, córnea e transplantes em Porto Alegre.",
      },
      { property: "og:url", content: "/dra-diane" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "/dra-diane" }],
  }),
  component: Page,
});

/* Ritmo vertical desta página: transições maiores de assunto usam SECTION_SPACE;
   transições mais próximas (ex.: barra de números logo após o hero) usam SECTION_SPACE_SM. */
const SECTION_SPACE = "py-[clamp(96px,9vw,150px)] md:py-[clamp(96px,9vw,150px)]";
const SECTION_SPACE_SM = "py-[clamp(72px,7vw,110px)] md:py-[clamp(72px,7vw,110px)]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const trajetoria = [
  { titulo: "Graduação em Medicina", texto: "Primeiro marco acadêmico." },
  { titulo: "Residência e especialização em Oftalmologia", texto: "Formação clínica e cirúrgica." },
  { titulo: "Atuação em Córnea e Superfície Ocular", texto: "Consolidação da especialidade." },
  { titulo: "Mestrado e Doutorado", texto: "Aprofundamento científico." },
  { titulo: "UFRGS e Hospital de Clínicas de Porto Alegre", texto: "Ensino, preceptoria e liderança." },
  { titulo: "Banco de Olhos do HCPA", texto: "Atuação institucional e transplantes." },
];

const atuacao = [
  { nome: "Faculdade de Medicina da UFRGS", texto: "Professora associada e formação médica." },
  { nome: "Hospital de Clínicas de Porto Alegre", texto: "Córnea, doenças externas, superfície ocular e transplantes." },
  { nome: "Banco de Olhos do HCPA", texto: "Diretoria médica." },
  { nome: "Oftalmocentro", texto: "Sócia-diretora. Atendimento privado em Porto Alegre." },
];

const pilares = [
  { titulo: "Pesquisa", texto: "Produção científica aplicada à oftalmologia.", icon: Microscope },
  { titulo: "Ensino", texto: "Formação de residentes, alunos e pós-graduandos.", icon: GraduationCap },
  { titulo: "Prática clínica", texto: "Decisões médicas baseadas em conhecimento e experiência.", icon: Stethoscope },
];

const areas = [
  { title: "Córnea", to: "/cornea", file: "sobre_05_area_cornea.jpg" },
  { title: "Catarata", to: "/catarata", file: "sobre_06_area_catarata.jpg" },
  { title: "Superfície ocular", to: "/cornea", hash: "superficie-ocular", file: "sobre_07_area_superficie.jpg" },
  { title: "Transplante de córnea", to: "/cornea", hash: "transplante", file: "sobre_08_area_transplante.jpg" },
  { title: "Cirurgia refrativa", to: "/cirurgia-refrativa", file: "sobre_09_area_refrativa.jpg" },
];

function AreaCard({
  title,
  to,
  hash,
  file,
  delay,
}: {
  title: string;
  to: string;
  hash?: string;
  file: string;
  delay: number;
}) {
  const src = imageUrl(file);
  return (
    <Reveal delay={delay} as="article">
      <Link
        to={to}
        {...(hash ? { hash } : {})}
        className={`group/area relative block aspect-[3/4] overflow-hidden rounded-2xl`}
      >
        {src ? (
          <img
            src={src}
            alt={title}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-[400ms] ${EASE} group-hover/area:scale-[1.025]`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-secondary bg-paper p-4 text-center">
            <span className="optic-ring block h-7 w-7 rotate-45" aria-hidden="true" />
            <span className="eyebrow text-gold">Inserir</span>
            <span className="max-w-full truncate font-mono text-[10px] text-muted-foreground">
              {file}
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 transition-opacity duration-[400ms] group-hover/area:opacity-95`}
        />
        <span
          className={`absolute inset-x-0 bottom-0 p-5 font-display text-lg leading-snug text-white transition-transform duration-[400ms] ${EASE} group-hover/area:-translate-y-0.5`}
        >
          {title}
        </span>
      </Link>
    </Reveal>
  );
}

function Page() {
  return (
    <>
      {/* 1 — Hero / apresentação */}
      <section className="texture-paper relative overflow-hidden bg-paper pb-16 pt-28 md:pb-20 lg:pt-32">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[36fr_58fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-gold">Sobre a Dra. Diane</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.2rem]">
                Conheça a Dra. Diane Marinho
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-muted-foreground">
                Médica oftalmologista, professora da Faculdade de Medicina da UFRGS, chefe do Setor
                de Córnea do Hospital de Clínicas de Porto Alegre e Diretora Médica do Banco de
                Olhos do HCPA.
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                Ao longo da carreira, assistência, ensino e pesquisa passaram a fazer parte do
                mesmo trabalho: compreender melhor as doenças da visão para tomar decisões cada vez
                mais precisas na prática clínica.
              </p>
            </Reveal>
            <Reveal delay={280} className="mt-9">
              <CTAButton to="/dra-diane" hash="trajetoria">
                Conheça a trajetória completa
              </CTAButton>
            </Reveal>
          </div>

          <Reveal variant="image" delay={100} className="aspect-[4/5] w-full lg:aspect-[5/6]">
            <Figure
              file="sobre_01_hero_dra_diane.jpg"
              alt="Dra. Diane Marinho, oftalmologista em Porto Alegre"
              ratio="4/5"
              className="h-full w-full rounded-2xl"
              imgClassName="object-[78%_18%]"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* 2 — Barra de números e autoridade */}
      <Section tone="background" className="pb-16 pt-6 md:pb-20 md:pt-8">
        <div className="rounded-2xl border border-border/70 bg-paper px-6 py-10 shadow-[var(--shadow-card)] sm:px-10 sm:py-12">
          <AuthorityMetrics
            extra={
              <>
                <p className="font-display text-2xl text-primary">UFRGS • HCPA • Banco de Olhos</p>
                <p className="mt-2 text-sm text-muted-foreground">ensino, assistência e ciência</p>
              </>
            }
          />
        </div>
      </Section>

      {/* 3 — Trajetória profissional e acadêmica */}
      <Section id="trajetoria" tone="background" className={SECTION_SPACE}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              title={<>Uma trajetória construída entre assistência, ensino e pesquisa</>}
            />
            <div className="mt-10">
              <Timeline items={trajetoria} />
            </div>
          </div>
          <div className="space-y-5">
            <Reveal variant="image">
              <Figure
                file="sobre_02_trajetoria_aula.jpg"
                alt="Dra. Diane Marinho em aula sobre transplante de córnea"
                ratio="16/9"
                className="rounded-2xl"
              />
            </Reveal>
            <Reveal variant="image" delay={100}>
              <Figure
                file="sobre_03_trajetoria_congresso.jpg"
                alt="Dra. Diane Marinho em congresso de catarata e cirurgia refrativa"
                ratio="16/9"
                className="rounded-2xl"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 4 — Onde a Dra. Diane atua hoje */}
      <Section tone="sand" className={SECTION_SPACE}>
        <SectionHeader title="Onde a Dra. Diane atua hoje" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {atuacao.map((a, i) => {
            const logoSrc = imageUrl(instituicoes[i]?.logo ?? "");
            return (
              <Reveal key={a.nome} delay={i * 90} className="h-full">
                <div
                  className={`h-full rounded-2xl border border-border bg-paper p-7 shadow-[var(--shadow-card)] transition-all duration-300 ${EASE} hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-lift)]`}
                >
                  <div className="flex h-11 items-center">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt=""
                        aria-hidden="true"
                        className="max-h-11 w-auto max-w-[120px] object-contain"
                      />
                    ) : (
                      <span className="optic-ring block h-8 w-8" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-xl leading-snug">{a.nome}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.texto}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 5 — Conhecimento produzido que volta para a consulta */}
      <Section tone="background" className={SECTION_SPACE}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="image">
            <Figure
              file="sobre_04_ciencia_microscopio.jpg"
              alt="Dra. Diane Marinho em laboratório de pesquisa em oftalmologia"
              ratio="4/3"
              className="rounded-2xl"
            />
          </Reveal>
          <div>
            <SectionHeader
              title="Quando o conhecimento produzido também volta para a consulta"
              text={
                <>
                  <p>
                    Parte da trajetória da Dra. Diane também se construiu na pesquisa, na
                    orientação de alunos, na formação de residentes e na participação em estudos
                    que ajudam a ampliar o entendimento sobre doenças da córnea, superfície ocular
                    e transplantes.
                  </p>
                  <p>O ensino e a prática clínica se fortalecem mutuamente.</p>
                </>
              }
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pilares.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.titulo} delay={i * 100}>
                    <span className="optic-ring grid h-11 w-11 place-items-center rounded-full text-gold">
                      <Icon size={19} strokeWidth={1.4} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-primary">{p.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Método de decisão clínica */}
      <Section tone="paper" className={SECTION_SPACE}>
        <SectionHeader
          eyebrow="Meu jeito de cuidar"
          title="Antes de indicar, é preciso entender."
          align="center"
          text={
            <p>
              A forma como a Dra. Diane conduz cada caso parte de uma ideia simples: duas pessoas
              com o mesmo diagnóstico podem precisar de decisões diferentes.
            </p>
          }
        />
        <div className="mt-14">
          <MethodSteps compact />
        </div>
      </Section>

      {/* 7 — Áreas que marcam sua trajetória */}
      <Section tone="background" className={SECTION_SPACE}>
        <SectionHeader title="Áreas que marcam sua trajetória" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {areas.map((a, i) => (
            <AreaCard key={a.title} {...a} delay={i * 70} />
          ))}
        </div>
      </Section>

      {/* 8 — CTA final + contatos */}
      <FinalCTA />
    </>
  );
}

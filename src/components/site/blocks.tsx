import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Eye, MessageCircle, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/content/images";
import { site, metricas, etapas, instituicoes } from "@/content/site";
import {
  ArrowLink,
  CountUpValue,
  CTAButton,
  Figure,
  Reveal,
  Section,
  SectionHeader,
} from "./primitives";

/* ------------------------------ Authority ---------------------------------- */

export function AuthorityMetrics({
  invert = false,
  extra,
  className,
  dense = false,
}: {
  invert?: boolean;
  extra?: ReactNode;
  className?: string;
  /**
   * Mantém os 3 dados lado a lado mesmo em telas muito estreitas (em vez do
   * empilhamento vertical padrão abaixo de `sm`), com números/rótulos e
   * padding reduzidos para caber em 3 colunas apertadas. Não afeta `sm:` para
   * cima — nesse ponto o resultado já é idêntico ao padrão. Uso pontual
   * (ver Home, seção "Quem é a Dra. Diane"); outros usos não passam essa prop
   * e continuam exatamente como antes.
   */
  dense?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0",
        extra && "sm:grid-cols-4",
        dense && "grid-cols-3 divide-x divide-y-0",
        className,
      )}
    >
      {metricas.map((m, i) => (
        <Reveal
          key={m.label}
          delay={i * 80}
          className={cn(
            "px-0 py-6 sm:px-8 sm:py-2 sm:first:pl-0",
            dense && "px-2 py-0 text-center first:pl-0 last:pr-0 sm:text-left",
          )}
        >
          <p
            className={cn(
              dense ? "font-display text-2xl sm:text-4xl md:text-5xl" : "font-display text-4xl md:text-5xl",
              invert ? "text-[var(--primary-foreground)]" : "text-primary",
            )}
          >
            <CountUpValue value={m.valor} delay={i * 130} />
          </p>
          <p
            className={cn(
              dense ? "mt-1.5 text-[0.7rem] leading-snug sm:mt-2 sm:text-sm" : "mt-2 text-sm",
              invert ? "text-[var(--primary-foreground)]/70" : "text-muted-foreground",
            )}
          >
            {m.label}
          </p>
        </Reveal>
      ))}
      {extra ? (
        <Reveal delay={240} className="px-0 py-6 sm:px-8 sm:py-2">
          {extra}
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------ Specialty card ------------------------------ */

export function SpecialtyCard({
  title,
  text,
  file,
  imgClassName = "",
  icon: Icon,
  highlight = false,
  delay = 0,
  className = "",
}: {
  title: string;
  text: string;
  file: string;
  imgClassName?: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  highlight?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} as="article">
      <div
        className={cn(
          "group/fig flex h-full flex-col overflow-hidden rounded-sm border bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
          highlight ? "border-primary/30 ring-1 ring-primary/10" : "border-border",
          className,
        )}
      >
        <div className="relative">
          <Figure
            file={file}
            alt={title}
            ratio="4/3"
            className="rounded-none"
            imgClassName={imgClassName}
          />
          <span
            className="absolute -bottom-7 left-6 z-10 grid h-14 w-14 place-items-center rounded-full bg-primary shadow-[var(--shadow-card)] ring-4 ring-paper"
            aria-hidden="true"
          >
            <Icon size={22} strokeWidth={1.5} className="text-[var(--primary-foreground)]" />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* --------------------------------- Steps ----------------------------------- */

const stepIcons = [Eye, User, MessageCircle, Check];

export function MethodSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:flex lg:gap-0">
      {etapas.map((e, i) => {
        const Icon = stepIcons[i];
        return (
          <li key={e.titulo} className="lg:flex lg:flex-1 lg:items-start">
            <div className="flex-1 text-center">
              <Reveal variant="pop" delay={i * 140} className="inline-flex">
                <span className="optic-ring grid h-14 w-14 place-items-center rounded-full text-gold">
                  {Icon ? <Icon size={22} strokeWidth={1.3} /> : null}
                </span>
              </Reveal>
              <Reveal delay={i * 140 + 120}>
                <span className="mt-3 block font-display text-sm text-gold">{i + 1}</span>
                <h3 className={cn("mt-1.5 font-display text-lg", compact && "text-base")}>
                  {e.titulo}
                </h3>
                <p className="mx-auto mt-2 max-w-[200px] text-sm leading-relaxed text-muted-foreground">
                  {e.texto}
                </p>
              </Reveal>
            </div>
            {i < etapas.length - 1 ? (
              <Reveal
                delay={i * 140 + 80}
                as="span"
                className="mx-3 mt-6 hidden shrink-0 text-base text-secondary-foreground/30 lg:block"
              >
                →
              </Reveal>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ----------------------------- Institution strip ---------------------------- */

export function InstitutionStrip() {
  return (
    <Section id="atuacao" tone="sand" className="py-10 md:py-12">
      <Reveal>
        <p className="eyebrow text-center text-gold">
          Uma carreira entre assistência, ensino e ciência
        </p>
      </Reveal>
      <div className="mt-8 grid gap-8 divide-y divide-border sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:divide-y-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-x-6 lg:gap-y-0">
        {instituicoes.map((inst, i) => {
          const logoSrc = imageUrl(inst.logo);
          return (
            <Fragment key={inst.nome}>
              <Reveal delay={i * 80} className="pt-8 text-center sm:pt-0">
                <div className="flex h-20 items-center justify-center">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={inst.nome}
                      className="max-h-20 w-auto max-w-[190px] object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <p className="font-display text-lg text-primary">{inst.nome}</p>
                  )}
                </div>
                <p className="mt-4 text-xs font-medium text-foreground">{inst.papel}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {inst.detalhe}
                </p>
              </Reveal>
              {i < instituicoes.length - 1 ? (
                <span aria-hidden="true" className="hidden h-16 w-px bg-border lg:block" />
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </Section>
  );
}

/* --------------------------------- Timeline -------------------------------- */

export function Timeline({
  items,
}: {
  items: ReadonlyArray<{ titulo: string; texto: string }>;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLineVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol className="relative pl-8">
      <span
        ref={lineRef}
        data-visible={lineVisible}
        aria-hidden="true"
        className="reveal-line absolute inset-y-1.5 left-0 w-px bg-border"
      />
      {items.map((item, i) => (
        <li key={item.titulo} className="relative pb-9 last:pb-0">
          <Reveal
            variant="pop"
            delay={150 + i * 110}
            as="span"
            className="absolute -left-[2.15rem] top-1.5 block h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-background"
          />
          <Reveal delay={200 + i * 110}>
            <h3 className="text-base font-semibold text-foreground">{item.titulo}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.texto}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------- FAQ ------------------------------------ */

export function FAQAccordion({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="py-5 text-left font-sans text-[0.95rem] font-medium hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* ------------------------------- Icon feature ------------------------------- */

export function IconFeature({
  icon: Icon,
  title,
  text,
  delay = 0,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  text?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="text-center sm:text-left">
      <Icon size={26} strokeWidth={1.1} className="mx-auto text-gold sm:mx-0" />
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      {text ? <p className="mt-1 text-sm text-muted-foreground">{text}</p> : null}
    </Reveal>
  );
}

/* -------------------------------- Final CTA -------------------------------- */

export function FinalCTA({
  title = "Sua visão merece uma decisão bem compreendida.",
  text = "Se você tem uma dúvida sobre sua visão, recebeu um diagnóstico ou está considerando uma cirurgia, a consulta é o momento de entender o seu caso e as possibilidades disponíveis.",
  photo,
  id,
}: {
  title?: string;
  text?: string;
  photo?: string;
  id?: string;
}) {
  if (photo) {
    const eyePhoto = imageUrl(photo);
    return (
      <Section
        {...(id ? { id } : {})}
        tone="deep"
        className="relative overflow-hidden py-16 lg:flex lg:min-h-[420px] lg:items-center lg:py-0"
      >
        {eyePhoto ? (
          <img
            src={eyePhoto}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        <Reveal className="relative z-10 max-w-md">
          <h2 className="text-3xl leading-tight text-[var(--primary-foreground)] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--primary-foreground)]/75">
            {text}
          </p>
          <CTAButton href={site.whatsappUrl} variant="light-solid" className="mt-7">
            Agendar consulta
          </CTAButton>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section {...(id ? { id } : {})} tone="deep" className="overflow-hidden">
      <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <h2 className="max-w-xl text-3xl leading-tight text-[var(--primary-foreground)] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--primary-foreground)]/75">
            {text}
          </p>
          <CTAButton
            href={site.whatsappUrl}
            variant="ghost-light"
            className="mt-8 bg-[var(--primary-foreground)]/10"
          >
            Agendar consulta →
          </CTAButton>
        </Reveal>

        <Reveal delay={120} className="lg:pl-10 lg:border-l lg:border-[var(--primary-foreground)]/15">
          <dl className="space-y-5 text-sm text-[var(--primary-foreground)]/80">
            <div>
              <dt className="eyebrow text-gold">Local</dt>
              <dd className="mt-1">
                {site.clinica}
                <br />
                {site.cidade}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-gold">Telefone</dt>
              <dd className="mt-1">{site.telefone}</dd>
            </div>
            <div>
              <dt className="eyebrow text-gold">WhatsApp</dt>
              <dd className="mt-1">{site.whatsapp}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------- Page hero -------------------------------- */

export function PageHero({
  eyebrow,
  title,
  paragraphs,
  actions,
  file,
  alt,
}: {
  eyebrow: string;
  title: ReactNode;
  paragraphs: string[];
  actions?: ReactNode;
  file: string;
  alt: string;
}) {
  return (
    <section className="texture-paper relative bg-paper pt-24 md:pt-20">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[46fr_54fr] lg:gap-14 lg:py-20">
        <Reveal>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {paragraphs.map((p) => (
            <p key={p} className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </Reveal>
        <Reveal delay={120}>
          <Figure file={file} alt={alt} ratio="4/3.2" priority className="rounded-sm" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Article card ------------------------------- */

export function ArticleCard({
  title,
  category,
  to,
  file,
  delay = 0,
}: {
  title: string;
  category: string;
  to: string;
  file: string;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay}>
      <Link
        to={to}
        className="group/fig flex h-full flex-col overflow-hidden rounded-sm border border-border bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
      >
        <Figure file={file} alt={title} ratio="16/10" className="rounded-none" />
        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow text-gold">{category}</p>
          <h3 className="mt-3 flex-1 font-display text-xl leading-snug">{title}</h3>
          <span className="arrow-link mt-5">
            Dra. Diane explica
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export { ArrowLink, CTAButton, Figure, Reveal, Section, SectionHeader };

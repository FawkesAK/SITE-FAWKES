import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/content/images";

/* ---------------------------------- Reveal --------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  variant = "up",
}: {
  children?: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "span";
  /**
   * "up" (padrão, translateY), "image" (opacidade + leve translate/scale,
   * para fotografias grandes) ou "pop" (opacidade + scale, para círculos/ícones pequenos)
   */
  variant?: "up" | "image" | "pop";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        variant === "image" ? "reveal-img" : variant === "pop" ? "reveal-pop" : "reveal",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------- CountUpValue ------------------------------- */

/**
 * Anima a parte numérica de um valor tipo "93", "+100" ou "20%" de 0 até o
 * valor final quando entra no viewport. Prefixos/sufixos não numéricos
 * (+, %, "anos" etc.) são preservados e não são animados.
 */
export function CountUpValue({
  value,
  delay = 0,
  duration = 1500,
  className,
}: {
  value: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = numStr ? parseFloat(numStr.replace(",", ".")) : null;
  const decimals =
    numStr.includes(",") || numStr.includes(".") ? (numStr.split(/[.,]/)[1]?.length ?? 0) : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const animated = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(numStr);
      return;
    }

    let rafId: number | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || animated.current) continue;
          animated.current = true;
          io.unobserve(entry.target);

          const startTime = performance.now() + delay;
          const tick = (now: number) => {
            const elapsed = now - startTime;
            if (elapsed < 0) {
              rafId = requestAnimationFrame(tick);
              return;
            }
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            if (t < 1) {
              setDisplay((target * eased).toFixed(decimals));
              rafId = requestAnimationFrame(tick);
            } else {
              setDisplay(numStr);
            }
          };
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [target, delay, duration, decimals, numStr]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* --------------------------------- Section --------------------------------- */

export function Section({
  children,
  className,
  id,
  tone = "background",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "background" | "paper" | "sand" | "deep" | "primary";
}) {
  // Textura de acabamento aplicada automaticamente pelo tipo de fundo (claro/escuro),
  // nunca escolhida por seção — ver .texture-paper / .texture-dark em styles.css.
  const tones = {
    background: "bg-background text-foreground texture-paper",
    paper: "bg-paper text-foreground texture-paper",
    sand: "bg-secondary/45 text-foreground texture-paper",
    deep: "bg-[var(--primary-deep)] text-[var(--primary-foreground)] texture-dark",
    primary: "bg-primary text-[var(--primary-foreground)] texture-dark",
  } as const;
  return (
    <section id={id} className={cn("relative py-20 md:py-28", tones[tone], className)}>
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  invert = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", invert ? "text-gold" : "text-gold")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-3xl leading-[1.14] sm:text-4xl md:text-[2.85rem]",
          invert ? "text-[var(--primary-foreground)]" : "text-foreground",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {text ? (
        <div
          className={cn(
            "mt-5 space-y-4 text-[0.95rem] leading-relaxed",
            invert ? "text-[var(--primary-foreground)]/80" : "text-muted-foreground",
          )}
        >
          {text}
        </div>
      ) : null}
    </Reveal>
  );
}

/* --------------------------------- Buttons --------------------------------- */

type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  hash?: string;
  variant?: "primary" | "secondary" | "ghost-light" | "light-solid" | "header";
  className?: string;
  onClick?: () => void;
};

const btnBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-px active:scale-[0.985]";

const btnVariants = {
  primary:
    "bg-primary text-[var(--primary-foreground)] hover:bg-[var(--primary-deep)] shadow-[var(--shadow-card)]",
  secondary:
    "border border-primary/35 text-primary hover:border-primary hover:bg-primary/5",
  "ghost-light":
    "border border-[var(--primary-foreground)]/35 text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)]/10",
  "light-solid":
    "bg-[var(--primary-foreground)] text-primary shadow-[var(--shadow-card)] hover:bg-[var(--primary-foreground)]/90",
  // Uso exclusivo do CTA "Agendar consulta" do Header — não reutilizar em outros
  // CTAs do site (ver pedido explícito de não alterar os demais).
  header:
    "border border-[var(--gold)]/40 bg-[var(--primary-deep)] text-[var(--primary-foreground)] shadow-[0_5px_16px_rgba(21,58,44,0.10)] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--gold)]/60 hover:shadow-[0_8px_22px_rgba(21,58,44,0.16)]",
} as const;

export function CTAButton({
  children,
  to,
  href,
  hash,
  variant = "primary",
  className,
  onClick,
}: BtnProps) {
  const cls = cn(btnBase, btnVariants[variant], className);
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} {...(hash ? { hash } : {})} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }
  return <span className={cls}>{children}</span>;
}

export function ArrowLink({
  children,
  to,
  hash,
  href,
  className,
  invert = false,
}: BtnProps & { invert?: boolean }) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </>
  );
  const cls = cn("arrow-link", invert && "text-[var(--primary-foreground)]", className);
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} {...(hash ? { hash } : {})} className={cls}>
      {inner}
    </Link>
  );
}

/* ---------------------------------- Figure --------------------------------- */

export function Figure({
  file,
  alt,
  className,
  imgClassName,
  ratio = "4/3",
  priority = false,
}: {
  file: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  priority?: boolean;
}) {
  const src = imageUrl(file);
  return (
    <div
      className={cn(
        "group/fig relative overflow-hidden rounded-sm bg-secondary/40",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover/fig:scale-[1.02]",
            imgClassName,
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-secondary bg-[var(--paper)] p-6 text-center"
        >
          <span className="optic-ring block h-8 w-8 rotate-45" aria-hidden="true" />
          <span className="eyebrow text-gold">Inserir</span>
          <span className="max-w-full truncate font-mono text-[11px] text-muted-foreground">
            {file}
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Rule ----------------------------------- */

export function HairLine({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} aria-hidden="true" />;
}

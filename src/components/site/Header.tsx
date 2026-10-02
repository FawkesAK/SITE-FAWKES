import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { CTAButton } from "./primitives";

/** Menu da Fawkes — âncoras das futuras seções da Home. */
const fawkesNav = [
  { label: "Serviços", hash: "servicos" },
  { label: "Projetos", hash: "projetos" },
  { label: "Depoimentos", hash: "depoimentos" },
  { label: "Quem somos", hash: "quem-somos" },
] as const;

/**
 * Logo da Fawkes. Enquanto o arquivo definitivo não está em
 * /public/images/logo-fawkes.svg, usa o wordmark tipográfico (serifada itálica).
 */
const FAWKES_LOGO_SRC: string | null = null;

function Logo({ light }: { light: boolean }) {
  return (
    <Link to="/" hash="inicio" className="block" aria-label="Fawkes — início">
      {FAWKES_LOGO_SRC ? (
        <img
          src={FAWKES_LOGO_SRC}
          alt="Fawkes"
          className={cn("h-8 w-auto sm:h-9 lg:h-10", light && "brightness-0 invert")}
        />
      ) : (
        <span
          className={cn(
            "font-display text-[1.9rem] italic leading-none tracking-[-0.01em] transition-colors duration-300 sm:text-[2.1rem]",
            light ? "text-[var(--fawkes-offwhite)]" : "text-[var(--fawkes-navy)]",
          )}
        >
          Fawkes
        </span>
      )}
    </Link>
  );
}

/** Observa as seções da Home e mantém o item de menu correspondente ao trecho visível. */
function useActiveHash(pathname: string) {
  const [activeHash, setActiveHash] = useState<string>("inicio");

  useEffect(() => {
    if (pathname !== "/") return;

    let observer: IntersectionObserver | null = null;
    let rafId = 0;
    let cancelled = false;

    const trySetup = (attemptsLeft: number) => {
      if (cancelled) return;
      const elements = fawkesNav
        .map((item) => document.getElementById(item.hash))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === fawkesNav.length || attemptsLeft <= 0) {
        if (elements.length === 0) return;
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveHash(entry.target.id);
            });
          },
          { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
        );
        elements.forEach((el) => observer!.observe(el));
        return;
      }
      rafId = requestAnimationFrame(() => trySetup(attemptsLeft - 1));
    };

    trySetup(20);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [pathname]);

  return activeHash;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeHash = useActiveHash(pathname);
  // Header SEMPRE transparente (sobreposto ao conteúdo). Só muda a cor dos
  // textos conforme o fundo da seção que está por trás dele: seções escuras
  // são marcadas com `data-header-tone="dark"` (texto claro); o resto é claro
  // (texto escuro). Exceção: com o menu mobile aberto, o painel tem fundo.
  const overlay = tone === "dark" && !open;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 12);
      // O header ocupa ~64–72px do topo: está "sobre" a seção quando o topo
      // dela já passou por baixo do header e a base ainda não.
      const probe = 40;
      const under = Array.from(document.querySelectorAll<HTMLElement>("[data-header-tone]")).find(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.top <= probe && r.bottom > probe;
        },
      );
      const next = under?.dataset["headerTone"] === "dark" ? "dark" : "light";
      setTone((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        open
          ? "border-b border-border/50 bg-paper"
          : overlay
            ? "border-b border-[var(--fawkes-offwhite)]/10 bg-gradient-to-b from-[var(--fawkes-ink)]/55 to-[var(--fawkes-ink)]/10 backdrop-blur-[3px]"
            : "border-b border-[var(--fawkes-navy)]/[0.06] bg-gradient-to-b from-[var(--fawkes-offwhite)]/60 to-[var(--fawkes-offwhite)]/15 backdrop-blur-[6px]",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-300 sm:px-8 lg:flex lg:justify-between lg:px-10 xl:px-14",
          scrolled ? "h-16" : "h-[4.5rem]",
        )}
      >
        <Logo light={overlay} />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-9 lg:flex xl:gap-11"
        >
          {fawkesNav.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className={cn(
                "relative py-1 text-[0.86rem] font-normal tracking-[0.01em] transition-colors duration-300",
                overlay
                  ? "text-[var(--fawkes-offwhite)]/80 hover:text-[var(--fawkes-offwhite)]"
                  : "text-foreground/75 hover:text-[var(--fawkes-navy)]",
                activeHash === item.hash &&
                  (overlay
                    ? "text-[var(--fawkes-offwhite)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[var(--fawkes-offwhite)]/70"
                    : "text-[var(--fawkes-navy)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[var(--fawkes-navy)]"),
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CTAButton
            href={site.whatsappUrl}
            variant="header"
            className={cn(
              "hidden h-10 px-[22px] font-medium sm:inline-flex",
              overlay &&
                "border-[var(--fawkes-offwhite)]/35 bg-[var(--fawkes-offwhite)]/[0.06] text-[var(--fawkes-offwhite)] shadow-none backdrop-blur-sm hover:border-[var(--fawkes-offwhite)]/60 hover:bg-[var(--fawkes-offwhite)]/[0.12] hover:shadow-none",
              !overlay &&
                "border-[var(--fawkes-navy)]/20 bg-[var(--fawkes-navy)] hover:border-[var(--fawkes-navy)]/40 hover:shadow-[0_8px_22px_rgba(14,35,64,0.18)]",
            )}
          >
            Agendar conversa
          </CTAButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
              overlay
                ? "border-[var(--fawkes-offwhite)]/30 text-[var(--fawkes-offwhite)]"
                : "border-border text-[var(--fawkes-navy)]",
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-paper px-5 pb-8 pt-4 lg:hidden">
          <nav aria-label="Navegação mobile" className="flex flex-col">
            {fawkesNav.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-border/70 py-4 font-display text-xl text-foreground",
                  activeHash === item.hash && "text-[var(--fawkes-navy)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CTAButton
            href={site.whatsappUrl}
            variant="header"
            className="mt-6 w-full border-[var(--fawkes-navy)]/20 bg-[var(--fawkes-navy)] font-medium"
          >
            Agendar conversa
          </CTAButton>
        </div>
      ) : null}
    </header>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";
import { CTAButton } from "./primitives";

function Logo() {
  return (
    <Link to="/" hash="inicio" className="block" aria-label="Dra. Diane Marinho — início">
      <img
        src="/images/logo-dra-diane-marinho.png"
        alt="Dra. Diane Marinho — Oftalmologia"
        width={477}
        height={108}
        className="h-8 w-auto sm:h-9 lg:h-10"
      />
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
      const elements = nav
        .map((item) => document.getElementById(item.hash))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === nav.length || attemptsLeft <= 0) {
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
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeHash = useActiveHash(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        "texture-header fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-paper/92 shadow-[0_2px_14px_rgba(21,58,44,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-paper/55 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-300 sm:px-8 lg:flex lg:justify-between lg:px-10 xl:px-14",
          scrolled ? "h-16" : "h-[4.5rem]",
        )}
      >
        <Logo />

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className={cn(
                "relative py-1 text-[0.8rem] font-medium text-foreground/75 transition-colors hover:text-primary",
                activeHash === item.hash &&
                  "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-primary",
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
            className="hidden h-10 px-[22px] sm:inline-flex"
          >
            Agendar consulta
          </CTAButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-primary lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-paper px-5 pb-8 pt-4 lg:hidden">
          <nav aria-label="Navegação mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-border/70 py-4 font-display text-xl text-foreground",
                  activeHash === item.hash && "text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CTAButton href={site.whatsappUrl} variant="header" className="mt-6 w-full">
            Agendar consulta
          </CTAButton>
        </div>
      ) : null}
    </header>
  );
}

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Botão "Agendar conversa" fixo no rodapé da tela — só no mobile (< lg).
 * Aparece depois que a Hero (#inicio) sai da tela e some quando o CTA final
 * (#agendar) entra (ou já passou), para não repetir o chamado. Entrada/saída
 * com o mesmo "subir com fade" da página; desligado com reduzir movimento
 * pela regra global de `prefers-reduced-motion`.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Cálculo por posição (não IntersectionObserver): funciona também quando a
    // pessoa "pula" por cima do CTA final (âncora do menu), sem que ele cruze
    // a tela. No máximo uma leitura por frame.
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = document.getElementById("inicio");
      const cta = document.getElementById("agendar");
      const pastHero = hero ? hero.getBoundingClientRect().bottom <= 0 : false;
      const beforeCta = cta ? cta.getBoundingClientRect().top > window.innerHeight : true;
      const next = pastHero && beforeCta;
      setVisible((prev) => (prev === next ? prev : next));
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

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-[var(--fawkes-motion-duration)] ease-[var(--fawkes-motion-ease)] lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0",
      )}
    >
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="mx-auto flex h-12 max-w-[26rem] items-center justify-center gap-2.5 rounded-full bg-[var(--fawkes-navy)] text-[0.92rem] font-medium text-[var(--fawkes-offwhite)] shadow-[0_14px_34px_-12px_rgba(7,20,38,0.55)] ring-1 ring-[var(--fawkes-offwhite)]/25"
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[var(--fawkes-blue)] shadow-[0_0_0_3px_color-mix(in_oklab,var(--fawkes-blue)_25%,transparent)]"
        />
        Agendar conversa
      </a>
    </div>
  );
}

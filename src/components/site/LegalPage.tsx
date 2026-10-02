import type { ReactNode } from "react";
import { PaperGrainTexture } from "./PaperGrainTexture";

/** Layout editorial simples para páginas legais (Termos, Privacidade). */
export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <section
      data-header-tone="light"
      className="relative isolate min-h-svh bg-[oklch(0.978_0.002_250)] pb-24 pt-32 text-[var(--fawkes-navy)] sm:pt-36"
    >
      <PaperGrainTexture />
      <article className="mx-auto max-w-[44rem] px-5 sm:px-8">
        <h1 className="font-editorial text-[clamp(2.4rem,8vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.015em]">
          {title}
        </h1>
        <p className="mt-3 text-[0.85rem] text-[var(--fawkes-navy)]/55">
          Última atualização: {updatedAt}
        </p>
        <div className="mt-10 space-y-5 text-[0.98rem] leading-[1.75] text-[var(--fawkes-navy)]/80 [&_h2]:mt-10 [&_h2]:font-editorial [&_h2]:text-[1.6rem] [&_h2]:leading-[1.15] [&_h2]:text-[var(--fawkes-navy)] [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </section>
  );
}

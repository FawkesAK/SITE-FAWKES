import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { MarbleTexture } from "./MarbleTexture";

const links = [
  { label: "Serviços", hash: "servicos" },
  { label: "Projetos", hash: "projetos" },
  { label: "Depoimentos", hash: "depoimentos" },
  { label: "Quem somos", hash: "quem-somos" },
] as const;

/** Rodapé da Fawkes — marca, navegação por âncoras e links legais. */
export function Footer() {
  return (
    <footer
      data-header-tone="dark"
      className="relative isolate overflow-hidden bg-[var(--fawkes-ink)] text-[var(--fawkes-offwhite)]"
    >
      <MarbleTexture />
      <div className="mx-auto w-full max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              to="/"
              hash="inicio"
              className="font-display text-[2.1rem] italic leading-none"
              aria-label="Fawkes — início"
            >
              Fawkes
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--fawkes-offwhite)]/65">
              {site.descricao}. Atendemos Porto Alegre e todo o Brasil.
            </p>
          </div>

          <nav aria-label="Rodapé" className="flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.hash}
                to="/"
                hash={l.hash}
                className="text-[var(--fawkes-offwhite)]/70 transition-colors hover:text-[var(--fawkes-offwhite)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--fawkes-offwhite)]/12 pt-6 text-xs text-[var(--fawkes-offwhite)]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fawkes. Todos os direitos reservados.</p>
          <nav aria-label="Documentos legais" className="flex gap-6">
            <Link
              to="/termos-de-servico"
              className="transition-colors hover:text-[var(--fawkes-offwhite)]"
            >
              Termos de Serviço
            </Link>
            <Link
              to="/politica-de-privacidade"
              className="transition-colors hover:text-[var(--fawkes-offwhite)]"
            >
              Política de Privacidade
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { site, nav } from "@/content/site";

export function Footer() {
  const links = nav.filter((n) => n.hash !== "inicio");
  return (
    <footer className="texture-dark bg-[var(--primary-deep)] text-[var(--primary-foreground)]">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img
              src="/images/logo-dra-diane-marinho-light.png"
              alt="Dra. Diane Marinho — Oftalmologia"
              width={477}
              height={108}
              className="h-10 w-auto sm:h-11"
            />
            <p className="mt-5 max-w-sm text-sm text-[var(--primary-foreground)]/70">
              Médica oftalmologista em Porto Alegre. Córnea, catarata, cirurgia
              refrativa, transplantes, ensino e pesquisa.
            </p>
            <p className="mt-6 text-sm text-[var(--primary-foreground)]/70">
              {site.crm} · {site.rqe}
            </p>
          </div>

          <nav aria-label="Rodapé" className="flex flex-col gap-3 text-sm md:mx-auto md:w-fit">
            {links.map((l) => (
              <Link
                key={l.hash}
                to="/"
                hash={l.hash}
                className="text-[var(--primary-foreground)]/75 transition-colors hover:text-[var(--primary-foreground)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm text-[var(--primary-foreground)]/75">
            <p className="eyebrow mb-4 text-gold">Atendimento</p>
            <address className="not-italic leading-relaxed">
              {site.clinica}
              <br />
              {site.cidade}
              <br />
              {site.endereco}
            </address>
            <p className="mt-4 leading-relaxed">WhatsApp: {site.whatsapp}</p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 underline underline-offset-4"
            >
              <Instagram size={15} strokeWidth={1.75} aria-hidden="true" />
              {site.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--primary-foreground)]/15 pt-6 text-xs text-[var(--primary-foreground)]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dra. Diane Marinho. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link to="/politica-de-privacidade" className="hover:text-[var(--primary-foreground)]">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-[var(--primary-foreground)]">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

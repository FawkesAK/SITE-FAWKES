import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { GOOGLE_ADS_ID, captureAttribution, listenWhatsappClicks } from "../lib/google-ads";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-[var(--fawkes-navy)]">404</h1>
        <h2 className="mt-4 font-display text-2xl">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O conteúdo que você procura não existe ou foi movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex h-12 items-center rounded-full bg-[var(--fawkes-navy)] px-6 text-sm font-semibold text-[var(--primary-foreground)]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente atualizar ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-12 items-center rounded-full bg-[var(--fawkes-navy)] px-6 text-sm font-semibold text-[var(--primary-foreground)]"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex h-12 items-center rounded-full border border-[var(--fawkes-navy)]/35 px-6 text-sm font-semibold text-[var(--fawkes-navy)]"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fawkes | Assessoria de Marketing para Oftalmologistas" },
      {
        name: "description",
        content:
          "Assessoria de marketing feita só para oftalmologistas: estratégia, Instagram, branding e tráfego pago dentro das regras do CFM. Porto Alegre e todo o RS.",
      },
      { name: "author", content: "Fawkes" },
      { property: "og:site_name", content: "Fawkes" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    scripts: [
      // Google Ads (tag do Google). IDs e conversões em src/lib/google-ads.ts.
      { src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`, async: true },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://www.afawkes.com.br/#organizacao",
          name: "Fawkes",
          url: "https://www.afawkes.com.br/",
          description:
            "Assessoria de marketing para oftalmologistas: estratégia, branding, gestão de redes sociais e tráfego pago, dentro das regras do CFM.",
          telephone: "+55-51-98617-4624",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Porto Alegre",
            addressRegion: "RS",
            addressCountry: "BR",
          },
          areaServed: { "@type": "State", name: "Rio Grande do Sul" },
          founder: [
            { "@type": "Person", name: "Amanda Teixeira", jobTitle: "Cofundadora" },
            { "@type": "Person", name: "Keven Josef", jobTitle: "Cofundador" },
          ],
          knowsAbout: [
            "Marketing médico",
            "Marketing para oftalmologistas",
            "Gestão de redes sociais",
            "Branding",
            "Tráfego pago",
            "Google Meu Negócio",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+55-51-98617-4624",
            url: "https://wa.me/5551986174624",
            availableLanguage: "pt-BR",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    captureAttribution();
    return listenWhatsappClicks();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main id="conteudo">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

/**
 * Google Ads: tag (gtag.js) e conversões do site.
 *
 * Conta Google Ads "Fawkes" (809-605-7300).
 * - Formulário "Prefiro que entrem em contato" → conversão principal
 *   "Enviar formulário de lead". Dispara só quando o CRM responde ok.
 * - Clique em qualquer link do WhatsApp → conversão "Clique WhatsApp"
 *   (meta "Contato", não usada nos lances da campanha).
 *
 * Também guarda gclid e UTMs da primeira visita (sessionStorage) para irem
 * junto com o lead, e assim saber qual anúncio/palavra trouxe cada contato.
 */

export const GOOGLE_ADS_ID = "AW-18514178523";

export const ADS_CONVERSIONS = {
  leadForm: `${GOOGLE_ADS_ID}/UX45CJnDwJ0dENvjn_xE`,
  whatsappClick: `${GOOGLE_ADS_ID}/H1f7CN21up0dENvjn_xE`,
} as const;

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

export function trackConversion(sendTo: string) {
  try {
    getGtag()?.("event", "conversion", { send_to: sendTo });
  } catch {
    /* tag bloqueada (adblock etc.): não pode quebrar o site */
  }
}

const ATTRIBUTION_KEY = "fawkes_attribution";
const ATTRIBUTION_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_PARAMS)[number], string>>;

/** Lê gclid/UTMs da URL e guarda (só se a visita trouxe algum). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 300);
    }
    if (Object.keys(found).length) {
      window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(found));
    }
  } catch {
    /* storage indisponível: segue sem atribuição */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Dispara a conversão do WhatsApp em qualquer link wa.me / api.whatsapp.com. */
export function listenWhatsappClicks() {
  if (typeof document === "undefined") return () => {};
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(link.href)) {
      trackConversion(ADS_CONVERSIONS.whatsappClick);
    }
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

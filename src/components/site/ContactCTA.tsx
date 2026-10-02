import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./primitives";

/**
 * Destino do formulário "Prefiro que entrem em contato" (POST JSON): a Edge
 * Function `site-lead` do Supabase do CRM Fawkes, que cria o lead no CRM com
 * origem "Site" (código em fawkes-crm-forge/supabase/functions/site-lead).
 * Pode ser sobrescrito por `VITE_LEAD_FORM_ENDPOINT`. A URL é pública (sem
 * chaves): a função roda no servidor com as próprias credenciais.
 */
const LEAD_ENDPOINT =
  (import.meta.env["VITE_LEAD_FORM_ENDPOINT"] as string | undefined) ??
  "https://ssjnvjtauqcfmhucaxrg.supabase.co/functions/v1/site-lead";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

/** (51) 99999-9999 — máscara simples de telefone BR. */
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const fields = [
  { name: "nome", label: "Nome", type: "text", autoComplete: "name", required: true },
  {
    name: "telefone",
    label: "Telefone (WhatsApp)",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email", required: true },
  { name: "cidade", label: "Cidade", type: "text", autoComplete: "address-level2", required: true },
  {
    name: "subespecialidade",
    label: "Subespecialidade",
    type: "text",
    autoComplete: "off",
    required: true,
  },
  {
    name: "instagram",
    label: "@ do Instagram",
    type: "text",
    autoComplete: "off",
    required: false,
  },
  { name: "site", label: "Site", type: "url", autoComplete: "url", required: false },
] as const;

function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!LEAD_ENDPOINT) {
      setStatus("unconfigured");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start py-6">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#0F2B46]/10 text-[#0F2B46]">
          <Check size={22} strokeWidth={1.8} />
        </span>
        <p className="mt-5 font-editorial text-[1.8rem] leading-[1.1] text-[#0F2B46]">
          Recebemos seus dados.
        </p>
        <p className="mt-2 text-[0.95rem] text-[#0F2B46]/70">A gente entra em contato em breve.</p>
      </div>
    );
  }

  const inputCls =
    "mt-1.5 h-12 w-full rounded-[11px] border border-white/65 bg-white/30 px-4 text-[0.95rem] text-[#0F2B46] placeholder:text-[#0F2B46]/40 backdrop-blur-[6px] transition-colors duration-200 hover:border-[#0F2B46]/45 focus:border-[#0F2B46]/45 focus:bg-white/40 focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className="mt-7 grid gap-x-4 gap-y-4 sm:grid-cols-2"
      noValidate={false}
    >
      {/* Honeypot anti-spam: invisível para pessoas; bots costumam preencher. */}
      <input
        type="text"
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      {fields.map((f) => (
        <label key={f.name} className={f.name === "nome" ? "sm:col-span-2" : ""}>
          <span className="text-[0.8rem] font-medium text-[#0F2B46]/80">
            {f.label}
            {!f.required && <span className="text-[#0F2B46]/45"> (opcional)</span>}
          </span>
          {f.name === "telefone" ? (
            <input
              name={f.name}
              type="tel"
              inputMode="numeric"
              autoComplete={f.autoComplete}
              required
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              title="Informe DDD e número, ex.: (51) 99999-9999"
              placeholder="(51) 99999-9999"
              className={inputCls}
            />
          ) : (
            <input
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              required={f.required}
              placeholder={
                f.name === "instagram" ? "@seuperfil" : f.name === "site" ? "https://" : ""
              }
              className={inputCls}
            />
          )}
        </label>
      ))}

      <div className="mt-3 flex flex-col gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0F2B46] px-7 py-3.5 text-[0.95rem] font-medium text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#163a5c] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
        <p className="text-center text-[0.75rem] leading-[1.5] text-[#0F2B46]/60">
          Ao enviar, você concorda com a{" "}
          <Link to="/politica-de-privacidade" className="underline underline-offset-2">
            Política de Privacidade
          </Link>
          .
        </p>
        {status === "error" && (
          <p role="alert" className="text-[0.85rem] text-[oklch(0.5_0.15_28)]">
            Não foi possível enviar agora. Tente de novo ou{" "}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              fale pelo WhatsApp
            </a>
            .
          </p>
        )}
        {status === "unconfigured" && (
          <p role="alert" className="text-[0.85rem] text-[#0F2B46]/75">
            O envio do formulário ainda está sendo configurado. Por enquanto,{" "}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              fale com a gente pelo WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

/** Fotografia de fundo (escritório: vidro canelado, mármore, luz natural). */
const BG = "/images/fawkes-cta-escritorio.jpg";

/**
 * Seção 9 — CTA final sobre fotografia arquitetônica. Três níveis: foto ao
 * fundo (sem blur, véu claro de ~8%), formulário numa placa de vidro fosco
 * (backdrop-blur) sobre o vidro canelado à esquerda, e a copy diretamente
 * sobre a parede clara à direita (gradiente claro quase imperceptível só
 * nessa região). Mobile: copy → formulário.
 */
export function ContactCTA() {
  return (
    <section
      id="agendar"
      data-header-tone="light"
      aria-labelledby="agendar-title"
      className="relative isolate overflow-hidden py-20 text-[#0F2B46] sm:py-24 lg:flex lg:min-h-[max(100svh,52rem)] lg:items-center lg:py-[8.5rem]"
    >
      {/* Fotografia de fundo */}
      <img
        src={BG}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[38%_center] lg:object-center"
      />
      {/* Véu claro muito sutil + reforço suave atrás da copy (direita) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(247,248,249,0.08)] lg:bg-[linear-gradient(90deg,rgba(247,248,249,0.04)_0%,rgba(247,248,249,0.06)_45%,rgba(247,248,249,0.28)_70%,rgba(247,248,249,0.18)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,248,249,0.55)_0%,rgba(247,248,249,0.25)_35%,rgba(247,248,249,0.1)_60%)] lg:hidden"
      />

      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-4 sm:px-8 lg:grid-cols-2 lg:gap-[clamp(5rem,7vw,7rem)]">
        {/* Formulário — placa de vidro fosco (à esquerda no desktop) */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative rounded-[26px] border border-white/55 bg-[rgba(247,248,249,0.5)] p-6 text-[#0F2B46] shadow-[0_20px_60px_rgba(15,43,70,0.10),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[14px] backdrop-saturate-[1.1] sm:p-10 lg:p-[3.1rem] lg:backdrop-blur-[20px]">
            <h3 className="font-editorial text-[1.9rem] font-normal leading-[1.08] text-[#0F2B46] sm:text-[2.2rem]">
              Prefiro que entrem em contato
            </h3>
            <p className="mt-2 text-[0.95rem] text-[#0F2B46]/70">
              Deixe seus dados e a gente fala com você.
            </p>
            <LeadForm />
          </div>
        </Reveal>

        {/* Copy — diretamente sobre a parede clara (à direita no desktop) */}
        <Reveal delay={100} className="order-1 lg:order-2">
          <h2
            id="agendar-title"
            className="font-editorial text-[clamp(2.4rem,9.5vw,3.1rem)] font-normal leading-[1.02] tracking-[-0.015em] text-[#0F2B46] sm:text-[clamp(3rem,6vw,3.8rem)] lg:text-[clamp(2.7rem,3.45vw,3.3rem)] lg:leading-[1.02] lg:tracking-[-0.02em]"
          >
            <span className="lg:block lg:whitespace-nowrap">Receba uma análise do seu</span>{" "}
            <span className="lg:block lg:whitespace-nowrap">posicionamento em uma</span>{" "}
            <span className="lg:block lg:whitespace-nowrap">
              conversa de{" "}
              <em className="whitespace-nowrap text-[oklch(0.52_0.11_255)]">30 minutos.</em>
            </span>
          </h2>

          <div className="mt-10 flex flex-col items-start gap-3">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[rgba(247,248,249,0.9)] px-7 text-[0.95rem] font-medium text-[#0F2B46] shadow-[0_10px_30px_-14px_rgba(15,43,70,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:bg-white"
            >
              Quero a minha análise
            </a>
            <p className="text-[0.85rem] text-[#0F2B46]/75">Sem compromisso, pelo WhatsApp.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

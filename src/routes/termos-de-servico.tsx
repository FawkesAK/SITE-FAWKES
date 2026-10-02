import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/termos-de-servico")({
  head: () => ({
    meta: [
      { title: "Termos de Serviço | Fawkes" },
      { name: "description", content: "Condições de uso do site da Fawkes." },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <LegalPage title="Termos de Serviço" updatedAt="2 de outubro de 2026">
      <p>
        Estes Termos regulam o uso deste site, mantido pela Fawkes, assessoria de marketing para
        oftalmologistas. Ao navegar pelo site ou enviar o formulário de contato, você declara que
        leu e concorda com estas condições.
      </p>

      <h2>1. Sobre o site</h2>
      <p>
        O site tem caráter informativo e apresenta os serviços, projetos e a forma de trabalho da
        Fawkes. As informações publicadas não constituem proposta comercial. Condições, prazos e
        investimento são apresentados individualmente, após conversa com a nossa equipe.
      </p>

      <h2>2. Formulário de contato</h2>
      <p>
        Ao enviar o formulário, você se compromete a informar dados verdadeiros e autoriza a Fawkes
        a entrar em contato pelos meios informados (como WhatsApp e e-mail). O uso desses dados —
        inclusive para remarketing próprio e análise de métricas — está descrito na{" "}
        <Link to="/politica-de-privacidade" className="underline underline-offset-4">
          Política de Privacidade
        </Link>
        .
      </p>

      <h2>3. Propriedade intelectual</h2>
      <p>
        Textos, marcas, layout, imagens e vídeos deste site pertencem à Fawkes ou aos respectivos
        titulares e são usados com autorização. Os projetos exibidos no portfólio são apresentados
        com o consentimento dos clientes. É proibido copiar, reproduzir ou distribuir esse conteúdo
        sem autorização prévia.
      </p>

      <h2>4. Uso adequado</h2>
      <p>
        Você se compromete a não utilizar o site para fins ilícitos, não tentar acessar áreas
        restritas ou interferir no seu funcionamento, e não enviar conteúdo falso, ofensivo ou
        automatizado (spam) pelo formulário.
      </p>

      <h2>5. Limitação de responsabilidade</h2>
      <p>
        Empregamos esforços para manter o site disponível e as informações atualizadas, mas não
        garantimos funcionamento ininterrupto ou livre de erros. Links para sites de terceiros são
        oferecidos por conveniência, e a Fawkes não se responsabiliza pelo conteúdo deles.
      </p>

      <h2>6. Alterações</h2>
      <p>
        Estes Termos podem ser atualizados a qualquer momento. A versão vigente estará sempre
        disponível nesta página.
      </p>

      <h2>7. Legislação e contato</h2>
      <p>
        Estes Termos são regidos pelas leis brasileiras. Dúvidas podem ser enviadas pelo{" "}
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          WhatsApp
        </a>
        .
      </p>
    </LegalPage>
  );
}

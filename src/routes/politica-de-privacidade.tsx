import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/content/site";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Fawkes" },
      {
        name: "description",
        content: "Como a Fawkes coleta, usa e protege os dados enviados pelo site.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage title="Política de Privacidade" updatedAt="2 de outubro de 2026">
      <p>
        Esta Política explica como a Fawkes, assessoria de marketing para oftalmologistas, coleta,
        utiliza e protege os dados pessoais enviados por meio deste site, em conformidade com a Lei
        Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>1. Quais dados coletamos</h2>
      <p>Quando você preenche o formulário de contato, coletamos:</p>
      <ul>
        <li>nome;</li>
        <li>telefone (WhatsApp);</li>
        <li>e-mail;</li>
        <li>cidade;</li>
        <li>subespecialidade;</li>
        <li>perfil do Instagram e site, quando informados.</li>
      </ul>
      <p>
        Também podemos coletar dados de navegação (como páginas visitadas, tempo de permanência,
        dispositivo e origem do acesso) por meio de cookies e ferramentas de análise.
      </p>

      <h2>2. Para que usamos os dados</h2>
      <ul>
        <li>
          <strong>Entrar em contato com você</strong>, para responder à sua solicitação e apresentar
          nossos serviços;
        </li>
        <li>
          <strong>Remarketing próprio</strong>, para exibir comunicações e anúncios da Fawkes a quem
          já demonstrou interesse, em plataformas como Meta (Instagram e Facebook) e Google;
        </li>
        <li>
          <strong>Análise de métricas</strong>, para entender o desempenho do site e das nossas
          campanhas e melhorar a sua experiência.
        </li>
      </ul>
      <p>Não vendemos nem alugamos seus dados pessoais.</p>

      <h2>3. Base legal</h2>
      <p>
        Tratamos seus dados com base no seu consentimento, manifestado ao enviar o formulário, e no
        legítimo interesse da Fawkes em divulgar seus serviços e medir o desempenho do site, sempre
        respeitando seus direitos e expectativas.
      </p>

      <h2>4. Compartilhamento</h2>
      <p>
        Os dados podem ser compartilhados apenas com fornecedores que nos ajudam a operar o site e o
        atendimento — como provedores de hospedagem e banco de dados, ferramentas de gestão de
        contatos, plataformas de anúncios e de análise de métricas —, que tratam as informações de
        acordo com esta Política e com a LGPD. Também poderemos compartilhá-los quando exigido por
        lei ou ordem de autoridade competente.
      </p>

      <h2>5. Cookies e tecnologias semelhantes</h2>
      <p>
        Utilizamos cookies e pixels de plataformas de análise e de anúncios para medir acessos e
        realizar remarketing. Você pode bloquear ou apagar cookies nas configurações do seu
        navegador, o que pode limitar algumas funcionalidades.
      </p>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        Mantemos os dados pelo tempo necessário para as finalidades descritas acima ou até que você
        solicite a exclusão, ressalvadas as hipóteses de guarda previstas em lei.
      </p>

      <h2>7. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não
        autorizados, perda ou alteração indevida.
      </p>

      <h2>8. Seus direitos</h2>
      <p>
        Você pode, a qualquer momento, solicitar a confirmação do tratamento, o acesso, a correção,
        a anonimização, a portabilidade ou a exclusão dos seus dados, além de revogar o
        consentimento e se opor ao uso para remarketing.
      </p>

      <h2>9. Contato</h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas sobre esta Política, fale com a gente pelo{" "}
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

      <h2>10. Alterações</h2>
      <p>
        Esta Política pode ser atualizada periodicamente. A versão vigente estará sempre disponível
        nesta página, com a data da última atualização.
      </p>
    </LegalPage>
  );
}

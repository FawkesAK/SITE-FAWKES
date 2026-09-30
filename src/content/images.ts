import retratoRosa from "@/assets/Ensaio_-_Dra_Diane_2.webp.asset.json";
import retratoRosaClose from "@/assets/Ensaio_-_Dra_Diane_4.webp.asset.json";
import retratoBranco from "@/assets/Ensaio_-_Dra_Diane_1.jpg.asset.json";
import retratoBancada from "@/assets/Ensaio_-_Dra_Diane_17.webp.asset.json";

/**
 * Mapa de imagens do site.
 * Chave = nome de arquivo previsto em /public/images/.
 * Quando não há arquivo disponível, o componente <Figure /> exibe
 * um placeholder editorial com "INSERIR: nome_do_arquivo".
 */
export const imageMap: Record<string, string> = {
  "home_01_hero_dra_diane.jpg": "/images/home-hero-dra-diane-v3.jpg",
  "home_02_sobre_retrato.jpg": "/images/home-sobre-retrato.jpg",
  "home_03_sobre_congresso_palco.jpg": "/images/home-sobre-retrato-topo.png",
  "home_04_sobre_congresso_simposio.jpg": "/images/home-sobre-retrato-base.png",
  "home_05_card_cornea.jpg": "/images/home-card-cornea.png",
  "home_06_card_catarata.jpg": "/images/home-card-catarata.png",
  "home_07_card_correcao_grau.jpg": "/images/home-card-correcao-grau.png",
  "home_08_card_transplante.jpg": "/images/home-card-transplante.png",
  "home_09_lente_intraocular.jpg": "/images/home-lente-intraocular-bg.png",
  "home_09b_lente_intraocular_mobile.jpg": "/images/home-lente-intraocular-mobile.png",
  "home_10_ciencia_soro_autologo.jpg": "/images/home-ciencia-soro-autologo.png",
  "home_11_ciencia_transplante_lamelar.jpg": "/images/home-ciencia-transplante-lamelar.png",
  "home_12_ciencia_formacao_medica.jpg": "/images/home-ciencia-formacao-medica.png",
  "home_13_final_cta_olho.jpg": "/images/home-final-cta-olho.png",
  "home_13b_final_cta_olho_mobile.jpg": "/images/home-final-cta-olho-mobile.png",
  "logo_ufrgs.png": "/images/logo-ufrgs.png",
  "logo_hcpa.png": "/images/logo-hcpa.png",
  "logo_banco_de_olhos.png": "/images/logo-banco-de-olhos.png",
  "logo_oftalmocentro.png": "/images/logo-oftalmocentro.png",
  "sobre_01_hero_dra_diane.jpg": "/images/sobre-hero-dra-diane.jpg",
  "catarata_01_hero_dra_diane.jpg": retratoBranco.url,
  "refrativa_01_hero.jpg": retratoRosaClose.url,
  "cornea_01_hero.jpg": retratoRosa.url,
  "ciencia_01_hero_aula.jpg": retratoBancada.url,
};

export function imageUrl(file: string): string | undefined {
  return imageMap[file];
}

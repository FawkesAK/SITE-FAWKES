/**
 * Textura de mármore bem leve para seções de fundo azul-marinho: a imagem
 * (tons de cinza) é invertida e aplicada em modo screen — o fundo branco do
 * mármore some e só os veios aparecem, claros e suaves. A seção precisa ser
 * `relative isolate` (a camada fica em -z-10, atrás do conteúdo).
 */
export function MarbleTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/textura-marmore.jpg')] bg-cover bg-center opacity-[0.14] mix-blend-screen invert"
    />
  );
}

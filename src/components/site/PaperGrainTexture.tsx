/**
 * Textura de grão de papel para seções de fundo claro: grão fino + manchas
 * suaves + fibras quase imperceptíveis (tile seamless 512px, tons de cinza),
 * em modo multiply com opacidade muito baixa — percebida como papel de alta
 * gramatura, não como imagem. A seção precisa ser `relative isolate`.
 */
export function PaperGrainTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/textura-grao-papel.png')] bg-[length:512px_512px] bg-repeat opacity-[0.07] mix-blend-multiply"
    />
  );
}

/**
 * Calcula o tempo estimado de leitura em minutos com base na velocidade média de 200 palavras por minuto.
 * Regra de Negócio: docs/regras-de-negocio.md (Seção 8.3)
 * @param texto Corpo de texto em formato bruto ou markdown
 * @returns Tempo estimado em minutos (mínimo de 1 minuto para textos não vazios)
 */
export function calcularTempoLeitura(texto: string | null | undefined): number {
  if (!texto || typeof texto !== 'string') return 1;

  // Remove marcações markdown comuns (imagens, links, cabeçalhos)
  const textoLimpo = texto
    .replace(/!\[.*?\]\(.*?\)/g, '') // imagens markdown
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links markdown
    .replace(/[#*`_~>-]/g, ' ') // caracteres de formatação
    .trim();

  const palavras = textoLimpo.split(/\s+/).filter(Boolean).length;
  if (palavras === 0) return 1;

  const minutos = Math.ceil(palavras / 200);
  return Math.max(1, minutos);
}


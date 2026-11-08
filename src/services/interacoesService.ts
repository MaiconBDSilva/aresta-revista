/**
 * Serviço de Interações do Leitor (Mock-First com persistência em localStorage)
 * - Assinatura da Newsletter Semanal
 * - Seguimento de Colunas Específicas
 * - Artigos Favoritos / Salvos
 */

const STORAGE_NEWSLETTER = 'aresta_mock_newsletter_inscrito';
const STORAGE_COLUNAS_SEGUIDAS = 'aresta_mock_colunas_seguidas';
const STORAGE_FAVORITOS = 'aresta_mock_artigos_favoritos';

// Padrão inicial: leitora Mariana segue a Coluna de Lucas e a Coluna de Danillo
const COLUNAS_PADRAO = ['coluna-de-lucas', 'coluna-de-danillo'];

export function getNewsletterInscrito(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const val = localStorage.getItem(STORAGE_NEWSLETTER);
    return val !== null ? val === 'true' : true;
  } catch {
    return true;
  }
}

export function setNewsletterInscrito(ativo: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_NEWSLETTER, String(ativo));
  } catch {}
}

export function getColunasSeguidas(): string[] {
  if (typeof window === 'undefined') return COLUNAS_PADRAO;
  try {
    const val = localStorage.getItem(STORAGE_COLUNAS_SEGUIDAS);
    if (!val) return COLUNAS_PADRAO;
    return JSON.parse(val);
  } catch {
    return COLUNAS_PADRAO;
  }
}

export function toggleSeguirColuna(colunaSlug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const atuais = getColunasSeguidas();
    const jaSegue = atuais.includes(colunaSlug);
    const atualizadas = jaSegue
      ? atuais.filter((s) => s !== colunaSlug)
      : [...atuais, colunaSlug];
    localStorage.setItem(STORAGE_COLUNAS_SEGUIDAS, JSON.stringify(atualizadas));
    return !jaSegue;
  } catch {
    return false;
  }
}

export function isSeguindoColuna(colunaSlug: string): boolean {
  return getColunasSeguidas().includes(colunaSlug);
}

export function getArtigosFavoritos(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const val = localStorage.getItem(STORAGE_FAVORITOS);
    if (!val) return [];
    return JSON.parse(val);
  } catch {
    return [];
  }
}

export function toggleFavorito(artigoId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const atuais = getArtigosFavoritos();
    const existe = atuais.includes(artigoId);
    const atualizados = existe
      ? atuais.filter((id) => id !== artigoId)
      : [...atuais, artigoId];
    localStorage.setItem(STORAGE_FAVORITOS, JSON.stringify(atualizados));
    return !existe;
  } catch {
    return false;
  }
}


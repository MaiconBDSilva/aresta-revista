import type { ArtigoCard, ArtigoCompleto } from '@/types/artigo.types';
import { ARTIGOS_MOCK } from './mocks/artigos.mock';

/**
 * Converte um ArtigoCompleto para ArtigoCard (removendo conteúdo extenso).
 */
function toArtigoCard(artigo: ArtigoCompleto): ArtigoCard {
  return {
    id: artigo.id,
    titulo: artigo.titulo,
    slug: artigo.slug,
    subtitulo_lead: artigo.subtitulo_lead,
    imagem_capa_url: artigo.imagem_capa_url,
    tempo_leitura_min: artigo.tempo_leitura_min,
    status: artigo.status,
    publicado_em: artigo.publicado_em,
    atualizado_em: artigo.atualizado_em,
    eh_destaque_hero: artigo.eh_destaque_hero,
    eh_destaque_secao: artigo.eh_destaque_secao,
    categoria: artigo.categoria,
    coluna: artigo.coluna,
    autor: artigo.autor,
  };
}

/**
 * Normaliza texto para busca insensível a acentos e maiúsculas.
 */
function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Recupera o artigo que é a Manchete Principal (Hero Article) da Capa Editorial.
 * Apenas artigos com status = 'publicado' podem ser exibidos.
 */
export async function getHeroArticle(): Promise<ArtigoCard | null> {
  const hero = ARTIGOS_MOCK.find((a) => a.eh_destaque_hero && a.status === 'publicado');
  if (hero) return toArtigoCard(hero);

  // Fallback para o artigo mais recente publicado
  const publicados = await getArtigosPublicados({ limit: 1 });
  return publicados[0] || null;
}

/**
 * Recupera os 2 apoios secundários da grade Hero da Capa Editorial.
 */
export async function getDestaquesSecao(): Promise<ArtigoCard[]> {
  const apoios = ARTIGOS_MOCK.filter(
    (a) => a.eh_destaque_secao && !a.eh_destaque_hero && a.status === 'publicado'
  ).slice(0, 2);

  return apoios.map(toArtigoCard);
}

/**
 * Recupera lista de artigos com status = 'publicado', permitindo filtros e paginação.
 */
export async function getArtigosPublicados(params?: {
  categoriaSlug?: string;
  colunaSlug?: string;
  autorSlug?: string;
  limit?: number;
  offset?: number;
}): Promise<ArtigoCard[]> {
  let resultado = ARTIGOS_MOCK.filter((a) => a.status === 'publicado');

  if (params?.categoriaSlug) {
    resultado = resultado.filter((a) => a.categoria.slug === params.categoriaSlug);
  }

  if (params?.colunaSlug) {
    resultado = resultado.filter((a) => a.coluna.slug === params.colunaSlug);
  }

  if (params?.autorSlug) {
    resultado = resultado.filter((a) => a.autor.slug === params.autorSlug);
  }

  // Ordena por data de publicação decrescente
  resultado.sort((a, b) => {
    const dataA = a.publicado_em ? new Date(a.publicado_em).getTime() : 0;
    const dataB = b.publicado_em ? new Date(b.publicado_em).getTime() : 0;
    return dataB - dataA;
  });

  const offset = params?.offset || 0;
  const limit = params?.limit || resultado.length;

  return resultado.slice(offset, offset + limit).map(toArtigoCard);
}

/**
 * Recupera artigos publicados de uma editoria específica.
 */
export async function getArtigosPorCategoria(
  categoriaSlug: string,
  limit?: number
): Promise<ArtigoCard[]> {
  return getArtigosPublicados({ categoriaSlug, limit });
}

/**
 * Recupera o artigo completo a partir do seu slug semântico (/coluna/[slug]).
 */
export async function getArtigoBySlug(slug: string): Promise<ArtigoCompleto | null> {
  const artigo = ARTIGOS_MOCK.find((a) => a.slug === slug);
  return artigo || null;
}

/**
 * Realiza busca textual em tempo real sobre títulos, subtítulos, corpo e tags.
 * Retorna apenas artigos com status = 'publicado'.
 */
export async function buscarArtigos(
  termo: string,
  categoriaSlug?: string
): Promise<ArtigoCard[]> {
  const termoNormalizado = normalizarTexto(termo.trim());

  let candidatos = ARTIGOS_MOCK.filter((a) => a.status === 'publicado');

  if (categoriaSlug && categoriaSlug !== 'todas') {
    candidatos = candidatos.filter((a) => a.categoria.slug === categoriaSlug);
  }

  if (!termoNormalizado) {
    return candidatos.map(toArtigoCard);
  }

  const resultados = candidatos.filter((artigo) => {
    const tituloNorm = normalizarTexto(artigo.titulo);
    const subtituloNorm = normalizarTexto(artigo.subtitulo_lead);
    const conteudoNorm = normalizarTexto(artigo.conteudo);
    const autorNorm = normalizarTexto(artigo.autor.nome);
    const tagsNorm = artigo.tags.map((t) => normalizarTexto(t.nome)).join(' ');

    return (
      tituloNorm.includes(termoNormalizado) ||
      subtituloNorm.includes(termoNormalizado) ||
      conteudoNorm.includes(termoNormalizado) ||
      autorNorm.includes(termoNormalizado) ||
      tagsNorm.includes(termoNormalizado)
    );
  });

  // Ordena por relevância básica (título dá prioridade)
  resultados.sort((a, b) => {
    const aNoTitulo = normalizarTexto(a.titulo).includes(termoNormalizado) ? 1 : 0;
    const bNoTitulo = normalizarTexto(b.titulo).includes(termoNormalizado) ? 1 : 0;
    if (aNoTitulo !== bNoTitulo) return bNoTitulo - aNoTitulo;

    const dataA = a.publicado_em ? new Date(a.publicado_em).getTime() : 0;
    const dataB = b.publicado_em ? new Date(b.publicado_em).getTime() : 0;
    return dataB - dataA;
  });

  return resultados.map(toArtigoCard);
}


import type { Perfil, Coluna } from '@/types/autor.types';
import type { ArtigoCard } from '@/types/artigo.types';
import { PERFIS_AUTORES_MOCK, COLUNAS_MOCK } from './mocks/autores.mock';
import { ARTIGOS_MOCK } from './mocks/artigos.mock';

export interface ColunistaVitrineItem {
  autor: Perfil;
  coluna: Coluna;
  ultimoArtigo: ArtigoCard | null;
}

/**
 * Retorna todos os colunistas titulares do portal.
 */
export async function getAutores(): Promise<Perfil[]> {
  return PERFIS_AUTORES_MOCK.filter((p) => p.papel === 'autor');
}

/**
 * Recupera o perfil público de um colunista pelo slug biográfico (/autor/[slug]).
 */
export async function getAutorBySlug(slug: string): Promise<Perfil | null> {
  const autor = PERFIS_AUTORES_MOCK.find((p) => p.slug === slug);
  return autor || null;
}

/**
 * Recupera a coluna de um autor pelo slug do acervo (/coluna-arquivo/[slug]).
 */
export async function getColunaBySlug(slug: string): Promise<Coluna | null> {
  const coluna = COLUNAS_MOCK.find((c) => c.slug === slug && c.ativo);
  return coluna || null;
}

/**
 * Recupera a coluna associada a um autor pelo autor_id.
 */
export async function getColunaByAutorId(autorId: string): Promise<Coluna | null> {
  const coluna = COLUNAS_MOCK.find((c) => c.autor_id === autorId && c.ativo);
  return coluna || null;
}

/**
 * Retorna os dados para a vitrine horizontal "Últimas das Colunas" na Capa Editorial.
 * Traz os 5 colunistas com suas respectivas colunas e o artigo publicado mais recente de cada um.
 */
export async function getColunistasVitrine(): Promise<ColunistaVitrineItem[]> {
  const colunistas = PERFIS_AUTORES_MOCK.filter((p) => p.papel === 'autor');

  return colunistas.map((autor) => {
    const coluna = COLUNAS_MOCK.find((c) => c.autor_id === autor.id) || {
      id: 0,
      autor_id: autor.id,
      nome: `Coluna de ${autor.nome}`,
      slug: `coluna-de-${autor.slug}`,
      manifesto_slogan: 'Reflexões e crônicas autorais.',
      capa_banner_url: null,
      ativo: true,
      autor,
    };

    // Busca o artigo mais recente deste autor com status = 'publicado'
    const artigosDoAutor = ARTIGOS_MOCK.filter(
      (a) => a.autor.id === autor.id && a.status === 'publicado'
    ).sort((a, b) => {
      const dataA = a.publicado_em ? new Date(a.publicado_em).getTime() : 0;
      const dataB = b.publicado_em ? new Date(b.publicado_em).getTime() : 0;
      return dataB - dataA;
    });

    const ultimoArtigo: ArtigoCard | null = artigosDoAutor[0]
      ? {
          id: artigosDoAutor[0].id,
          titulo: artigosDoAutor[0].titulo,
          slug: artigosDoAutor[0].slug,
          subtitulo_lead: artigosDoAutor[0].subtitulo_lead,
          imagem_capa_url: artigosDoAutor[0].imagem_capa_url,
          tempo_leitura_min: artigosDoAutor[0].tempo_leitura_min,
          status: artigosDoAutor[0].status,
          publicado_em: artigosDoAutor[0].publicado_em,
          atualizado_em: artigosDoAutor[0].atualizado_em,
          eh_destaque_hero: artigosDoAutor[0].eh_destaque_hero,
          eh_destaque_secao: artigosDoAutor[0].eh_destaque_secao,
          categoria: artigosDoAutor[0].categoria,
          coluna: artigosDoAutor[0].coluna,
          autor: artigosDoAutor[0].autor,
        }
      : null;

    return {
      autor,
      coluna,
      ultimoArtigo,
    };
  });
}


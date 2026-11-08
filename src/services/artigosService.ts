import type { ArtigoCard, ArtigoCompleto } from '@/types/artigo.types';
import { ARTIGOS_MOCK } from './mocks/artigos.mock';
import { PERFIS_AUTORES_MOCK, COLUNAS_MOCK } from './mocks/autores.mock';
import { CATEGORIAS_MOCK } from './mocks/categorias.mock';
import { calcularTempoLeitura } from '@/lib/readingTime';
import { slugify } from '@/lib/slugify';
import { loadTable, saveTable, MOCK_DB_TABLES } from './mockRepository';

/**
 * Recupera os artigos da camada de banco de dados mock (com persistência em localStorage).
 */
function getArtigosStore(): ArtigoCompleto[] {
  return loadTable<ArtigoCompleto[]>(MOCK_DB_TABLES.ARTIGOS, ARTIGOS_MOCK);
}

/**
 * Persiste alterações no banco de dados mock e notifica ouvintes.
 */
function saveArtigosStore(dados: ArtigoCompleto[]): void {
  saveTable(MOCK_DB_TABLES.ARTIGOS, dados);
}

/**
 * Converte um ArtigoCompleto para ArtigoCard (removendo conteúdo extenso).
 */
export function toArtigoCard(artigo: ArtigoCompleto): ArtigoCard {
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
  const artigos = getArtigosStore();
  const hero = artigos.find((a) => a.eh_destaque_hero && a.status === 'publicado');
  if (hero) return toArtigoCard(hero);

  const publicados = await getArtigosPublicados({ limit: 1 });
  return publicados[0] || null;
}

/**
 * Recupera os 2 apoios secundários da grade Hero da Capa Editorial.
 */
export async function getDestaquesSecao(): Promise<ArtigoCard[]> {
  const apoios = getArtigosStore()
    .filter((a) => a.eh_destaque_secao && !a.eh_destaque_hero && a.status === 'publicado')
    .slice(0, 2);

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
  let resultado = getArtigosStore().filter((a) => a.status === 'publicado');

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
  const artigo = getArtigosStore().find((a) => a.slug === slug);
  return artigo ? { ...artigo } : null;
}

/**
 * Recupera o artigo completo pelo seu ID único.
 */
export async function getArtigoById(id: string): Promise<ArtigoCompleto | null> {
  const artigo = getArtigosStore().find((a) => a.id === id);
  return artigo ? { ...artigo } : null;
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

  let candidatos = getArtigosStore().filter((a) => a.status === 'publicado');

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

// ==============================================================================
// SPRINT 3: FUNÇÕES DE GESTÃO EDITORIAL, PRODUÇÃO & REVISÃO DA REDAÇÃO
// ==============================================================================

/**
 * ABA "PUBLICADOS": Retorna todos os artigos já publicados pelo autor logado.
 */
export async function getMeusArtigosPublicados(autorId: string): Promise<ArtigoCompleto[]> {
  return getArtigosStore()
    .filter((a) => a.autor.id === autorId && a.status === 'publicado')
    .sort((a, b) => {
      const dataA = a.publicado_em ? new Date(a.publicado_em).getTime() : 0;
      const dataB = b.publicado_em ? new Date(b.publicado_em).getTime() : 0;
      return dataB - dataA;
    });
}

/**
 * ABA "EM PRODUÇÃO": Retorna os artigos em rascunho/edição pertencentes ao autor logado.
 */
export async function getArtigosEmProducao(autorId: string): Promise<ArtigoCompleto[]> {
  return getArtigosStore()
    .filter((a) => a.autor.id === autorId && a.status === 'edicao')
    .sort((a, b) => new Date(b.atualizado_em).getTime() - new Date(a.atualizado_em).getTime());
}

/**
 * ABA "REDAÇÃO GERAL": Retorna os artigos em edição dos DEMAIS colunistas
 * para leitura e comentários de revisão da redação.
 */
export async function getArtigosRedacaoGeral(autorIdLogado?: string): Promise<ArtigoCompleto[]> {
  return getArtigosStore()
    .filter((a) => a.status === 'edicao' && (!autorIdLogado || a.autor.id !== autorIdLogado))
    .sort((a, b) => new Date(b.atualizado_em).getTime() - new Date(a.atualizado_em).getTime());
}

export interface SalvarArtigoInput {
  id?: string;
  titulo: string;
  subtitulo_lead: string;
  conteudo: string;
  categoria_id: number;
  imagem_capa_url?: string | null;
  legenda_capa?: string | null;
  creditos_capa?: string | null;
  tags?: string[];
}

/**
 * Salva rascunho de artigo.
 * Aplica regra de trava de autor: se for edição de artigo existente,
 * lança erro caso o autor logado não seja o autor titular.
 */
export async function salvarRascunhoArtigo(
  dados: SalvarArtigoInput,
  autorId: string
): Promise<ArtigoCompleto> {
  const agora = new Date().toISOString();
  const tempoLeitura = calcularTempoLeitura(dados.conteudo);

  const autor = PERFIS_AUTORES_MOCK.find((p) => p.id === autorId) || PERFIS_AUTORES_MOCK[0];
  const coluna =
    COLUNAS_MOCK.find((c) => c.autor_id === autor.id) || COLUNAS_MOCK[0];
  const categoria =
    CATEGORIAS_MOCK.find((c) => c.id === dados.categoria_id) || CATEGORIAS_MOCK[0];

  const tagsObj = (dados.tags || []).map((t, idx) => ({
    id: 100 + idx,
    nome: t,
    slug: slugify(t),
  }));

  const artigosStore = getArtigosStore();

  if (dados.id) {
    const indice = artigosStore.findIndex((a) => a.id === dados.id);
    if (indice === -1) {
      throw new Error(`Artigo com ID ${dados.id} não encontrado.`);
    }

    const artigoExistente = artigosStore[indice];

    // TRAVA DE AUTORIA OBRIGATÓRIA
    if (artigoExistente.autor.id !== autorId) {
      throw new Error('Acesso negado: apenas o autor titular pode alterar o conteúdo do seu ensaio.');
    }

    const atualizado: ArtigoCompleto = {
      ...artigoExistente,
      titulo: dados.titulo.trim(),
      slug: slugify(dados.titulo.trim()),
      subtitulo_lead: dados.subtitulo_lead.trim(),
      conteudo: dados.conteudo,
      categoria: {
        id: categoria.id,
        nome: categoria.nome,
        slug: categoria.slug,
        cor_acento: categoria.cor_acento,
      },
      imagem_capa_url: dados.imagem_capa_url !== undefined ? dados.imagem_capa_url : artigoExistente.imagem_capa_url,
      legenda_capa: dados.legenda_capa || null,
      creditos_capa: dados.creditos_capa || null,
      tempo_leitura_min: tempoLeitura,
      atualizado_em: agora,
      tags: tagsObj.length > 0 ? tagsObj : artigoExistente.tags,
    };

    artigosStore[indice] = atualizado;
    saveArtigosStore(artigosStore);
    return { ...atualizado };
  }

  // Criação de Novo Artigo
  const novoId = `b0000000-0000-0000-0000-${Date.now().toString().slice(-12)}`;
  const novoArtigo: ArtigoCompleto = {
    id: novoId,
    titulo: dados.titulo.trim(),
    slug: slugify(dados.titulo.trim()) || `ensaio-${Date.now()}`,
    subtitulo_lead: dados.subtitulo_lead.trim(),
    conteudo: dados.conteudo,
    imagem_capa_url: dados.imagem_capa_url || '/images/default-cover.svg',
    legenda_capa: dados.legenda_capa || null,
    creditos_capa: dados.creditos_capa || null,
    tempo_leitura_min: tempoLeitura,
    status: 'edicao',
    publicado_em: null,
    atualizado_em: agora,
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 0,
    categoria: {
      id: categoria.id,
      nome: categoria.nome,
      slug: categoria.slug,
      cor_acento: categoria.cor_acento,
    },
    coluna: {
      id: coluna.id,
      nome: coluna.nome,
      slug: coluna.slug,
    },
    autor: {
      id: autor.id,
      nome: autor.nome,
      slug: autor.slug,
      avatar_url: autor.avatar_url,
    },
    tags: tagsObj,
  };

  artigosStore.unshift(novoArtigo);
  saveArtigosStore(artigosStore);
  return { ...novoArtigo };
}

/**
 * Publicação Autônoma de Artigo.
 * TRAVA DE AUTORIA INVIOLÁVEL: Apenas o autor original pode alterar de 'edicao' para 'publicado'.
 */
export async function publicarArtigo(artigoId: string, autorId: string): Promise<ArtigoCompleto> {
  const artigosStore = getArtigosStore();
  const indice = artigosStore.findIndex((a) => a.id === artigoId);
  if (indice === -1) {
    throw new Error(`Artigo com ID ${artigoId} não encontrado.`);
  }

  const artigo = artigosStore[indice];

  if (artigo.autor.id !== autorId) {
    throw new Error('Apenas o autor titular tem autorização para publicar este ensaio.');
  }

  const agora = new Date().toISOString();
  const publicado: ArtigoCompleto = {
    ...artigo,
    status: 'publicado',
    publicado_em: agora,
    atualizado_em: agora,
  };

  artigosStore[indice] = publicado;
  saveArtigosStore(artigosStore);
  return { ...publicado };
}

/**
 * Despublica ou reverte um artigo publicado de volta para edição (apenas autor original).
 */
export async function reverterParaEdicao(artigoId: string, autorId: string): Promise<ArtigoCompleto> {
  const artigosStore = getArtigosStore();
  const indice = artigosStore.findIndex((a) => a.id === artigoId);
  if (indice === -1) {
    throw new Error(`Artigo com ID ${artigoId} não encontrado.`);
  }

  const artigo = artigosStore[indice];
  if (artigo.autor.id !== autorId) {
    throw new Error('Apenas o autor titular pode alterar o status do seu artigo.');
  }

  const atualizado: ArtigoCompleto = {
    ...artigo,
    status: 'edicao',
    atualizado_em: new Date().toISOString(),
  };

  artigosStore[indice] = atualizado;
  saveArtigosStore(artigosStore);
  return { ...atualizado };
}

/**
 * Define um artigo publicado como Manchete Principal (Hero Article) da Capa.
 * Garante que apenas 1 artigo ativo seja o Hero.
 */
export async function setArtigoHero(artigoId: string): Promise<ArtigoCompleto> {
  let artigosStore = getArtigosStore();
  const indice = artigosStore.findIndex((a) => a.id === artigoId);
  if (indice === -1) {
    throw new Error(`Artigo com ID ${artigoId} não encontrado.`);
  }

  // Remove o flag hero de todos os outros
  artigosStore = artigosStore.map((art) => ({
    ...art,
    eh_destaque_hero: art.id === artigoId,
    // Se virou hero, não pode ser apoio secundário ao mesmo tempo
    eh_destaque_secao: art.id === artigoId ? false : art.eh_destaque_secao,
  }));

  saveArtigosStore(artigosStore);
  return { ...artigosStore[indice] };
}

/**
 * Alterna ou define um artigo como destaque de seção/apoio secundário da Capa.
 */
export async function setArtigoDestaqueSecao(artigoId: string, valor: boolean): Promise<ArtigoCompleto> {
  const artigosStore = getArtigosStore();
  const indice = artigosStore.findIndex((a) => a.id === artigoId);
  if (indice === -1) {
    throw new Error(`Artigo com ID ${artigoId} não encontrado.`);
  }

  artigosStore[indice] = {
    ...artigosStore[indice],
    eh_destaque_secao: valor,
    // Se virou destaque de seção, remove do hero
    eh_destaque_hero: valor ? false : artigosStore[indice].eh_destaque_hero,
  };

  saveArtigosStore(artigosStore);
  return { ...artigosStore[indice] };
}

/**
 * Retorna todos os artigos atualmente em edição em toda a redação.
 */
export async function getArtigosEmEdicao(): Promise<ArtigoCompleto[]> {
  return getArtigosStore().filter((a) => a.status === 'edicao');
}

/**
 * Retorna todos os artigos publicados para uso no painel de curadoria da capa.
 */
export async function getArtigosParaCuradoriaCapa(): Promise<ArtigoCompleto[]> {
  return getArtigosStore().filter((a) => a.status === 'publicado');
}

/**
 * Reseta o store em memória (utilizado em testes unitários).
 */
export function _resetArtigosStore(dados = ARTIGOS_MOCK) {
  saveArtigosStore([...dados]);
}

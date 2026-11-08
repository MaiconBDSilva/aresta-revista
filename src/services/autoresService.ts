import type { Perfil, Coluna } from '@/types/autor.types';
import type { ArtigoCard } from '@/types/artigo.types';
import {
  PERFIS_AUTORES_MOCK,
  COLUNAS_MOCK,
  PERFIL_LEITOR_MOCK,
  PERFIL_ADMIN_MOCK,
  TODOS_PERFIS_PROTOTIPO,
} from './mocks/autores.mock';
import { ARTIGOS_MOCK } from './mocks/artigos.mock';
import { slugify } from '@/lib/slugify';
import { loadTable, saveTable, MOCK_DB_TABLES } from './mockRepository';

/**
 * Recupera a tabela de perfis persistida no mock DB (localStorage).
 */
export function getPerfisStore(): Perfil[] {
  return loadTable<Perfil[]>(MOCK_DB_TABLES.PERFIS, TODOS_PERFIS_PROTOTIPO);
}

function savePerfisStore(dados: Perfil[]): void {
  saveTable(MOCK_DB_TABLES.PERFIS, dados);
}

/**
 * Recupera a tabela de colunas persistida no mock DB (localStorage).
 */
export function getColunasStore(): Coluna[] {
  return loadTable<Coluna[]>(MOCK_DB_TABLES.COLUNAS, COLUNAS_MOCK);
}

function saveColunasStore(dados: Coluna[]): void {
  saveTable(MOCK_DB_TABLES.COLUNAS, dados);
}

export interface ColunistaVitrineItem {
  autor: Perfil;
  coluna: Coluna;
  ultimoArtigo: ArtigoCard | null;
}

/**
 * Retorna todos os colunistas titulares do portal.
 */
export async function getAutores(): Promise<Perfil[]> {
  return getPerfisStore().filter((p) => p.papel === 'autor');
}

/**
 * Recupera o perfil público de um colunista pelo slug biográfico (/autor/[slug]).
 */
export async function getAutorBySlug(slug: string): Promise<Perfil | null> {
  const autor = getPerfisStore().find((p) => p.slug === slug);
  return autor || null;
}

/**
 * Recupera a coluna de um autor pelo slug do acervo (/coluna-arquivo/[slug]).
 */
export async function getColunaBySlug(slug: string): Promise<Coluna | null> {
  const coluna = getColunasStore().find((c) => c.slug === slug && c.ativo);
  return coluna || null;
}

/**
 * Recupera a coluna associada a um autor pelo autor_id.
 */
export async function getColunaByAutorId(autorId: string): Promise<Coluna | null> {
  const coluna = getColunasStore().find((c) => c.autor_id === autorId && c.ativo);
  return coluna || null;
}

/**
 * Retorna todas as colunas ativas cadastradas na equipe editorial.
 */
export async function getColunasEquipe(): Promise<Coluna[]> {
  return getColunasStore().filter((c) => c.ativo);
}

/**
 * Atualiza os dados de perfil de um autor/admin no protótipo.
 */
export async function atualizarPerfilAutor(
  autorId: string,
  dados: Partial<Perfil>
): Promise<Perfil> {
  const perfisStore = getPerfisStore();
  const idx = perfisStore.findIndex((p) => p.id === autorId);
  if (idx === -1) {
    throw new Error(`Perfil com ID ${autorId} não encontrado.`);
  }

  const atualizado = {
    ...perfisStore[idx],
    ...dados,
  };
  perfisStore[idx] = atualizado;
  savePerfisStore(perfisStore);

  // Se o autor tiver uma coluna, atualiza também a referência do autor dentro da coluna
  let colunasStore = getColunasStore();
  colunasStore = colunasStore.map((c) => {
    if (c.autor_id === autorId) {
      return { ...c, autor: atualizado };
    }
    return c;
  });
  saveColunasStore(colunasStore);

  return { ...atualizado };
}

/**
 * Atualiza manifesto/slogan e nome da coluna exclusiva.
 */
export async function atualizarManifestoColuna(
  colunaId: number,
  manifesto: string,
  nome?: string
): Promise<Coluna> {
  const colunasStore = getColunasStore();
  const idx = colunasStore.findIndex((c) => c.id === colunaId);
  if (idx === -1) {
    throw new Error(`Coluna com ID ${colunaId} não encontrada.`);
  }

  const atualizada = {
    ...colunasStore[idx],
    manifesto_slogan: manifesto,
    nome: nome ? nome : colunasStore[idx].nome,
  };
  colunasStore[idx] = atualizada;
  saveColunasStore(colunasStore);
  return { ...atualizada };
}

/**
 * Retorna leitores cadastrados para o modal de busca e promoção para a equipe.
 */
export async function getUsuariosCandidatosPromocao(): Promise<Perfil[]> {
  return getPerfisStore().filter((p) => p.papel === 'leitor');
}

/**
 * Promove um usuário existente ou cria um novo membro na equipe (Admin ou Autor Titular com coluna).
 */
export async function promoverUsuarioParaEquipe(dados: {
  usuarioId?: string;
  nome: string;
  email: string;
  papel: 'autor' | 'admin';
  nomeColuna?: string;
  slugColuna?: string;
  manifesto?: string;
  avatar_url?: string;
}): Promise<{ perfil: Perfil; coluna?: Coluna }> {
  const perfisStore = getPerfisStore();
  let perfilAlvo: Perfil;

  if (dados.usuarioId) {
    const idx = perfisStore.findIndex((p) => p.id === dados.usuarioId);
    if (idx !== -1) {
      perfisStore[idx] = {
        ...perfisStore[idx],
        papel: dados.papel,
        nome: dados.nome || perfisStore[idx].nome,
        avatar_url: dados.avatar_url || perfisStore[idx].avatar_url,
      };
      perfilAlvo = perfisStore[idx];
    } else {
      throw new Error('Usuário informado não foi localizado.');
    }
  } else {
    // Cria novo perfil
    const novoId = `u0000000-0000-0000-0000-${Date.now().toString().slice(-12)}`;
    perfilAlvo = {
      id: novoId,
      nome: dados.nome,
      slug: slugify(dados.nome),
      papel: dados.papel,
      email: dados.email,
      avatar_url:
        dados.avatar_url ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80',
      bio: `Membro da equipe editorial da Aresta Revista (${dados.papel === 'autor' ? 'Colunista' : 'Administrador'}).`,
      twitter_url: null,
      instagram_url: null,
      linkedin_url: null,
      website_url: null,
      criado_em: new Date().toISOString(),
    };
    perfisStore.push(perfilAlvo);
  }

  savePerfisStore(perfisStore);

  let novaColuna: Coluna | undefined;
  const colunasStore = getColunasStore();

  // Se o papel for autor, obrigatoriamente vincula a uma coluna titular
  if (dados.papel === 'autor') {
    const nomeColunaFinal = dados.nomeColuna || `Coluna de ${perfilAlvo.nome}`;
    const slugColunaFinal = dados.slugColuna || `coluna-de-${slugify(perfilAlvo.nome)}`;

    novaColuna = {
      id: colunasStore.length + 1,
      autor_id: perfilAlvo.id,
      nome: nomeColunaFinal,
      slug: slugColunaFinal,
      manifesto_slogan:
        dados.manifesto || 'Crônicas, ensaios e reflexões autorais para a Aresta Revista.',
      capa_banner_url:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&h=400&q=80',
      ativo: true,
      autor: perfilAlvo,
      criado_em: new Date().toISOString(),
    };

    colunasStore.push(novaColuna);
    saveColunasStore(colunasStore);
  }

  return { perfil: perfilAlvo, coluna: novaColuna };
}

/**
 * Retorna os dados para a vitrine horizontal "Últimas das Colunas" na Capa Editorial.
 * Traz os colunistas com suas respectivas colunas e o artigo publicado mais recente de cada um.
 */
export async function getColunistasVitrine(): Promise<ColunistaVitrineItem[]> {
  const colunistas = getPerfisStore().filter((p) => p.papel === 'autor');
  const colunasStore = getColunasStore();
  const artigosPublicados = loadTable<typeof ARTIGOS_MOCK>(
    MOCK_DB_TABLES.ARTIGOS,
    ARTIGOS_MOCK
  ).filter((a) => a.status === 'publicado');

  return colunistas.map((autor) => {
    const coluna = colunasStore.find((c) => c.autor_id === autor.id) || {
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
    const artigosDoAutor = artigosPublicados
      .filter((a) => a.autor.id === autor.id)
      .sort((a, b) => {
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



import type { ArtigoComentarioPublico } from '@/types/artigo.types';
import { COMENTARIOS_MOCK } from './mocks/comentarios.mock';
import { loadTable, saveTable, MOCK_DB_TABLES } from './mockRepository';

function getComentariosStore(): ArtigoComentarioPublico[] {
  return loadTable<ArtigoComentarioPublico[]>(
    MOCK_DB_TABLES.COMENTARIOS,
    COMENTARIOS_MOCK
  );
}

function saveComentariosStore(dados: ArtigoComentarioPublico[]): void {
  saveTable(MOCK_DB_TABLES.COMENTARIOS, dados);
}

/**
 * Recupera todos os comentários públicos ativos de um artigo ordenados cronologicamente.
 */
export async function getComentariosByArtigoId(
  artigoId: string
): Promise<ArtigoComentarioPublico[]> {
  return getComentariosStore()
    .filter((c) => c.artigo_id === artigoId && c.ativo)
    .sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
}

/**
 * Registra um novo comentário para leitores autenticados.
 */
export async function adicionarComentario(params: {
  artigoId: string;
  leitorId: string;
  leitorNome: string;
  leitorAvatarUrl: string | null;
  conteudo: string;
}): Promise<ArtigoComentarioPublico> {
  const store = getComentariosStore();
  const novo: ArtigoComentarioPublico = {
    id: `comentario-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    artigo_id: params.artigoId,
    leitor_id: params.leitorId,
    conteudo: params.conteudo.trim(),
    ativo: true,
    criado_em: new Date().toISOString(),
    leitor: {
      id: params.leitorId,
      nome: params.leitorNome,
      avatar_url: params.leitorAvatarUrl,
    },
  };

  const atualizado = [novo, ...store];
  saveComentariosStore(atualizado);
  return novo;
}


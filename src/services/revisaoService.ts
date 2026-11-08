import type { ArtigoRevisaoComentario, CriarRevisaoComentarioDTO } from '@/types/revisao.types';
import { REVISAO_COMENTARIOS_MOCK } from './mocks/revisao.mock';
import { loadTable, saveTable, MOCK_DB_TABLES } from './mockRepository';

function getRevisaoStore(): ArtigoRevisaoComentario[] {
  return loadTable<ArtigoRevisaoComentario[]>(
    MOCK_DB_TABLES.REVISOES,
    REVISAO_COMENTARIOS_MOCK
  );
}

function saveRevisaoStore(dados: ArtigoRevisaoComentario[]): void {
  saveTable(MOCK_DB_TABLES.REVISOES, dados);
}

/**
 * Recupera os comentários de revisão editorial de um determinado artigo.
 * Ordenados por data decrescente (mais recentes primeiro).
 */
export async function getComentariosRevisao(artigoId: string): Promise<ArtigoRevisaoComentario[]> {
  return getRevisaoStore()
    .filter((c) => c.artigo_id === artigoId)
    .sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
}

/**
 * Adiciona uma sugestão ou comentário de revisão no artigo em edição.
 */
export async function adicionarComentarioRevisao(
  dto: CriarRevisaoComentarioDTO
): Promise<ArtigoRevisaoComentario> {
  const store = getRevisaoStore();
  const novo: ArtigoRevisaoComentario = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    artigo_id: dto.artigo_id,
    autor_comentario_id: dto.autor_comentario_id,
    autor_nome: dto.autor_nome,
    autor_avatar_url: dto.autor_avatar_url || null,
    trecho_selecionado: dto.trecho_selecionado || null,
    conteudo: dto.conteudo.trim(),
    resolvido: false,
    criado_em: new Date().toISOString(),
  };

  store.unshift(novo);
  saveRevisaoStore(store);
  return novo;
}

/**
 * Alterna o status de resolvido de um comentário de revisão.
 */
export async function alternarResolvidoComentario(
  comentarioId: string
): Promise<ArtigoRevisaoComentario | null> {
  const store = getRevisaoStore();
  const comentario = store.find((c) => c.id === comentarioId);
  if (!comentario) return null;

  comentario.resolvido = !comentario.resolvido;
  saveRevisaoStore(store);
  return { ...comentario };
}

/**
 * Conta a quantidade de sugestões/comentários não resolvidos para o artigo.
 */
export async function contarComentariosPendentes(artigoId: string): Promise<number> {
  return getRevisaoStore().filter((c) => c.artigo_id === artigoId && !c.resolvido).length;
}

/**
 * Conta total de comentários de um artigo.
 */
export async function contarTotalComentarios(artigoId: string): Promise<number> {
  return getRevisaoStore().filter((c) => c.artigo_id === artigoId).length;
}

/**
 * Utilitário para resetar o store durante testes automatizados.
 */
export function _resetRevisaoStore(dados = REVISAO_COMENTARIOS_MOCK) {
  saveRevisaoStore([...dados]);
}


import type { ArtigoRevisaoComentario, CriarRevisaoComentarioDTO } from '@/types/revisao.types';
import { REVISAO_COMENTARIOS_MOCK } from './mocks/revisao.mock';

// Estado reativo em memória para o ciclo do protótipo
let revisaoStore = [...REVISAO_COMENTARIOS_MOCK];

/**
 * Recupera os comentários de revisão editorial de um determinado artigo.
 * Ordenados por data decrescente (mais recentes primeiro).
 */
export async function getComentariosRevisao(artigoId: string): Promise<ArtigoRevisaoComentario[]> {
  return revisaoStore
    .filter((c) => c.artigo_id === artigoId)
    .sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
}

/**
 * Adiciona uma sugestão ou comentário de revisão no artigo em edição.
 */
export async function adicionarComentarioRevisao(
  dto: CriarRevisaoComentarioDTO
): Promise<ArtigoRevisaoComentario> {
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

  revisaoStore.unshift(novo);
  return novo;
}

/**
 * Alterna o status de resolvido de um comentário de revisão.
 */
export async function alternarResolvidoComentario(
  comentarioId: string
): Promise<ArtigoRevisaoComentario | null> {
  const comentario = revisaoStore.find((c) => c.id === comentarioId);
  if (!comentario) return null;

  comentario.resolvido = !comentario.resolvido;
  return { ...comentario };
}

/**
 * Conta a quantidade de sugestões/comentários não resolvidos para o artigo.
 */
export async function contarComentariosPendentes(artigoId: string): Promise<number> {
  return revisaoStore.filter((c) => c.artigo_id === artigoId && !c.resolvido).length;
}

/**
 * Conta total de comentários de um artigo.
 */
export async function contarTotalComentarios(artigoId: string): Promise<number> {
  return revisaoStore.filter((c) => c.artigo_id === artigoId).length;
}

/**
 * Utilitário para resetar o store durante testes automatizados.
 */
export function _resetRevisaoStore(dados = REVISAO_COMENTARIOS_MOCK) {
  revisaoStore = [...dados];
}


import type { ArtigoComentarioPublico } from '@/types/artigo.types';
import { COMENTARIOS_MOCK } from './mocks/comentarios.mock';

// Armazena comentários em memória para a simulação do protótipo
let comentariosMemoria: ArtigoComentarioPublico[] = [...COMENTARIOS_MOCK];

/**
 * Recupera todos os comentários públicos ativos de um artigo ordenados cronologicamente.
 */
export async function getComentariosByArtigoId(
  artigoId: string
): Promise<ArtigoComentarioPublico[]> {
  return comentariosMemoria
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

  comentariosMemoria = [novo, ...comentariosMemoria];
  return novo;
}


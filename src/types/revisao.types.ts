export interface ArtigoRevisaoComentario {
  id: string;
  artigo_id: string;
  autor_comentario_id: string;
  autor_nome: string;
  autor_avatar_url: string | null;
  trecho_selecionado: string | null;
  conteudo: string;
  resolvido: boolean;
  criado_em: string;
}

export interface CriarRevisaoComentarioDTO {
  artigo_id: string;
  autor_comentario_id: string;
  autor_nome: string;
  autor_avatar_url?: string | null;
  trecho_selecionado?: string | null;
  conteudo: string;
}


import type { StatusArtigo } from './database.types';
import type { Perfil, Coluna } from './autor.types';

export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  descricao: string | null;
  cor_acento: string;
  ordem_exibicao: number;
  ativo: boolean;
}

export interface ArtigoCard {
  id: string;
  titulo: string;
  slug: string;
  subtitulo_lead: string;
  imagem_capa_url: string | null;
  tempo_leitura_min: number;
  status: StatusArtigo;
  publicado_em: string | null;
  atualizado_em: string;
  eh_destaque_hero: boolean;
  eh_destaque_secao: boolean;
  categoria: Pick<Categoria, 'id' | 'nome' | 'slug' | 'cor_acento'>;
  coluna: Pick<Coluna, 'id' | 'nome' | 'slug'>;
  autor: Pick<Perfil, 'id' | 'nome' | 'slug' | 'avatar_url'>;
}

export interface ArtigoCompleto extends ArtigoCard {
  conteudo: string; // Markdown puro
  legenda_capa: string | null;
  creditos_capa: string | null;
  visualizacoes: number;
  tags: Array<{ id: number; nome: string; slug: string }>;
}

export interface RevisaoComentario {
  id: string;
  artigo_id: string;
  autor_comentario_id: string;
  trecho_selecionado: string | null;
  conteudo: string;
  resolvido: boolean;
  criado_em: string;
  autor_comentario: Pick<Perfil, 'id' | 'nome' | 'slug' | 'avatar_url' | 'papel'>;
}

export interface ArtigoComentarioPublico {
  id: string;
  artigo_id: string;
  leitor_id: string;
  conteudo: string;
  ativo: boolean;
  criado_em: string;
  leitor: Pick<Perfil, 'id' | 'nome' | 'avatar_url'>;
}


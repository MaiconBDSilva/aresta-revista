export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PapelUsuario = 'leitor' | 'autor' | 'admin';
export type StatusArtigo = 'edicao' | 'publicado';

export interface Database {
  public: {
    Tables: {
      perfis: {
        Row: {
          id: string;
          nome: string;
          slug: string;
          papel: PapelUsuario;
          avatar_url: string | null;
          bio: string | null;
          twitter_url: string | null;
          instagram_url: string | null;
          linkedin_url: string | null;
          website_url: string | null;
          email: string;
          criado_em: string;
          atualizado_em: string;
        };
        Insert: {
          id: string;
          nome: string;
          slug: string;
          papel?: PapelUsuario;
          avatar_url?: string | null;
          bio?: string | null;
          twitter_url?: string | null;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          website_url?: string | null;
          email: string;
          criado_em?: string;
          atualizado_em?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          slug?: string;
          papel?: PapelUsuario;
          avatar_url?: string | null;
          bio?: string | null;
          twitter_url?: string | null;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          website_url?: string | null;
          email?: string;
          atualizado_em?: string;
        };
      };
      colunas: {
        Row: {
          id: number;
          autor_id: string;
          nome: string;
          slug: string;
          manifesto_slogan: string;
          capa_banner_url: string | null;
          ativo: boolean;
          criado_em: string;
          atualizado_em: string;
        };
        Insert: {
          id?: number;
          autor_id: string;
          nome: string;
          slug: string;
          manifesto_slogan: string;
          capa_banner_url?: string | null;
          ativo?: boolean;
          criado_em?: string;
          atualizado_em?: string;
        };
        Update: {
          id?: number;
          autor_id?: string;
          nome?: string;
          slug?: string;
          manifesto_slogan?: string;
          capa_banner_url?: string | null;
          ativo?: boolean;
          atualizado_em?: string;
        };
      };
      categorias: {
        Row: {
          id: number;
          nome: string;
          slug: string;
          descricao: string | null;
          cor_acento: string;
          ordem_exibicao: number;
          ativo: boolean;
          criado_em: string;
        };
        Insert: {
          id?: number;
          nome: string;
          slug: string;
          descricao?: string | null;
          cor_acento?: string;
          ordem_exibicao?: number;
          ativo?: boolean;
          criado_em?: string;
        };
        Update: {
          id?: number;
          nome?: string;
          slug?: string;
          descricao?: string | null;
          cor_acento?: string;
          ordem_exibicao?: number;
          ativo?: boolean;
        };
      };
      artigos: {
        Row: {
          id: string;
          coluna_id: number;
          autor_id: string;
          categoria_id: number;
          titulo: string;
          slug: string;
          subtitulo_lead: string;
          conteudo: string;
          imagem_capa_url: string | null;
          legenda_capa: string | null;
          creditos_capa: string | null;
          tempo_leitura_min: number;
          status: StatusArtigo;
          visualizacoes: number;
          eh_destaque_hero: boolean;
          eh_destaque_secao: boolean;
          publicado_em: string | null;
          criado_em: string;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          coluna_id: number;
          autor_id: string;
          categoria_id: number;
          titulo: string;
          slug: string;
          subtitulo_lead: string;
          conteudo: string;
          imagem_capa_url?: string | null;
          legenda_capa?: string | null;
          creditos_capa?: string | null;
          tempo_leitura_min?: number;
          status?: StatusArtigo;
          visualizacoes?: number;
          eh_destaque_hero?: boolean;
          eh_destaque_secao?: boolean;
          publicado_em?: string | null;
          criado_em?: string;
          atualizado_em?: string;
        };
        Update: {
          coluna_id?: number;
          autor_id?: string;
          categoria_id?: number;
          titulo?: string;
          slug?: string;
          subtitulo_lead?: string;
          conteudo?: string;
          imagem_capa_url?: string | null;
          legenda_capa?: string | null;
          creditos_capa?: string | null;
          tempo_leitura_min?: number;
          status?: StatusArtigo;
          visualizacoes?: number;
          eh_destaque_hero?: boolean;
          eh_destaque_secao?: boolean;
          publicado_em?: string | null;
          atualizado_em?: string;
        };
      };
      artigo_revisao_comentarios: {
        Row: {
          id: string;
          artigo_id: string;
          autor_comentario_id: string;
          trecho_selecionado: string | null;
          conteudo: string;
          resolvido: boolean;
          criado_em: string;
        };
        Insert: {
          id?: string;
          artigo_id: string;
          autor_comentario_id: string;
          trecho_selecionado?: string | null;
          conteudo: string;
          resolvido?: boolean;
          criado_em?: string;
        };
        Update: {
          trecho_selecionado?: string | null;
          conteudo?: string;
          resolvido?: boolean;
        };
      };
      artigo_comentarios: {
        Row: {
          id: string;
          artigo_id: string;
          leitor_id: string;
          conteudo: string;
          ativo: boolean;
          criado_em: string;
        };
        Insert: {
          id?: string;
          artigo_id: string;
          leitor_id: string;
          conteudo: string;
          ativo?: boolean;
          criado_em?: string;
        };
        Update: {
          conteudo?: string;
          ativo?: boolean;
        };
      };
    };
  };
}


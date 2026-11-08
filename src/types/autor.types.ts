import type { PapelUsuario } from './database.types';

export interface Perfil {
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
  email?: string;
  criado_em?: string;
}

export interface Coluna {
  id: number;
  autor_id: string;
  nome: string;
  slug: string;
  manifesto_slogan: string;
  capa_banner_url: string | null;
  ativo: boolean;
  autor?: Perfil;
  criado_em?: string;
}


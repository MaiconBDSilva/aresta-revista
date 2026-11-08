import type { Categoria } from '@/types/artigo.types';
import { CATEGORIAS_MOCK } from './mocks/categorias.mock';

/**
 * Serviço de Categorias / Editorias (Mock-First).
 * Na Sprint 5, substitui a consulta interna pelo Supabase Client.
 */
export async function getCategorias(): Promise<Categoria[]> {
  // Retorna categorias ativas ordenadas por ordem_exibicao
  return CATEGORIAS_MOCK.filter((c) => c.ativo).sort((a, b) => a.ordem_exibicao - b.ordem_exibicao);
}

/**
 * Recupera uma categoria pelo slug amigável.
 */
export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  const categoria = CATEGORIAS_MOCK.find((c) => c.slug === slug && c.ativo);
  return categoria || null;
}


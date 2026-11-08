/**
 * Retorna a URL pública de um artigo.
 * No navegador usa a origem atual (Vercel/localhost/domínio oficial); no servidor usa NEXT_PUBLIC_SITE_URL.
 */
export function getArtigoUrl(slug: string): string {
  const origem =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://arestarevista.com';
  return `${origem}/coluna/${slug}`;
}


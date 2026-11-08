import type { MetadataRoute } from 'next';
import { ARTIGOS_MOCK } from '@/services/mocks/artigos.mock';
import { CATEGORIAS_MOCK } from '@/services/mocks/categorias.mock';
import { PERFIS_AUTORES_MOCK, COLUNAS_MOCK } from '@/services/mocks/autores.mock';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arestarevista.com';

  const rotasEstaticas: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const rotasEditorias: MetadataRoute.Sitemap = CATEGORIAS_MOCK.map((cat) => ({
    url: `${baseUrl}/editoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const rotasArtigos: MetadataRoute.Sitemap = ARTIGOS_MOCK.filter(
    (art) => art.status === 'publicado'
  ).map((art) => ({
    url: `${baseUrl}/coluna/${art.slug}`,
    lastModified: new Date(art.atualizado_em || art.publicado_em || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const rotasAutores: MetadataRoute.Sitemap = PERFIS_AUTORES_MOCK.map((autor) => ({
    url: `${baseUrl}/autor/${autor.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const rotasColunas: MetadataRoute.Sitemap = COLUNAS_MOCK.filter((c) => c.ativo).map(
    (coluna) => ({
      url: `${baseUrl}/coluna-arquivo/${coluna.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  );

  return [
    ...rotasEstaticas,
    ...rotasEditorias,
    ...rotasArtigos,
    ...rotasAutores,
    ...rotasColunas,
  ];
}

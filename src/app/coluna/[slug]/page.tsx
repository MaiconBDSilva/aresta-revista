import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtigoBySlug, getArtigosPublicados } from '@/services/artigosService';
import { getAutorBySlug } from '@/services/autoresService';
import { getComentariosByArtigoId } from '@/services/comentariosService';
import { ArticleReadingView } from '@/components/reading/ArticleReadingView';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { ARTIGOS_MOCK } from '@/services/mocks/artigos.mock';

interface ArtigoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTIGOS_MOCK.filter((a) => a.status === 'publicado').map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArtigoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    return {
      title: 'Artigo não encontrado | aresta.',
    };
  }

  return {
    title: `${artigo.titulo} | ${artigo.coluna.nome}`,
    description: artigo.subtitulo_lead,
    authors: [{ name: artigo.autor.nome }],
    openGraph: {
      title: artigo.titulo,
      description: artigo.subtitulo_lead,
      type: 'article',
      publishedTime: artigo.publicado_em || undefined,
      authors: [artigo.autor.nome],
      images: artigo.imagem_capa_url
        ? [
            {
              url: artigo.imagem_capa_url,
              width: 1200,
              height: 675,
              alt: artigo.titulo,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: artigo.titulo,
      description: artigo.subtitulo_lead,
      images: artigo.imagem_capa_url ? [artigo.imagem_capa_url] : [],
    },
  };
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo || artigo.status !== 'publicado') {
    notFound();
  }

  const comentarios = await getComentariosByArtigoId(artigo.id);
  const autorPerfil = await getAutorBySlug(artigo.autor.slug);

  // Busca leituras recomendadas da mesma categoria (excluindo o atual)
  const relacionados = (await getArtigosPublicados({
    categoriaSlug: artigo.categoria.slug,
    limit: 4,
  })).filter((a) => a.id !== artigo.id).slice(0, 3);

  return (
    <div className="main-content-layout">
      {/* Vista do Artigo Imersivo */}
      <ArticleReadingView
        artigo={artigo}
        autorPerfil={autorPerfil}
        comentariosIniciais={comentarios}
      />

      {/* Leituras Relacionadas */}
      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="title-section">
              Mais em {artigo.categoria.nome}
            </h2>
          </div>

          <div className="grid-magazine-feed">
            {relacionados.map((item) => (
              <ArticleCard key={item.id} artigo={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

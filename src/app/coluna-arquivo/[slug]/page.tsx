import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getColunaBySlug } from '@/services/autoresService';
import { getArtigosPublicados } from '@/services/artigosService';
import { ColumnArchiveView } from '@/components/column/ColumnArchiveView';
import { COLUNAS_MOCK } from '@/services/mocks/autores.mock';

interface ColunaArquivoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return COLUNAS_MOCK.filter((c) => c.ativo).map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: ColunaArquivoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const coluna = await getColunaBySlug(slug);

  if (!coluna) {
    return {
      title: 'Coluna não encontrada | aresta.',
    };
  }

  return {
    title: `${coluna.nome} | Acervo Editorial`,
    description: coluna.manifesto_slogan,
    openGraph: {
      title: `${coluna.nome} | aresta.`,
      description: coluna.manifesto_slogan,
      images: coluna.capa_banner_url ? [{ url: coluna.capa_banner_url, alt: coluna.nome }] : [],
    },
  };
}

export default async function ColunaArquivoPage({ params }: ColunaArquivoPageProps) {
  const { slug } = await params;
  const coluna = await getColunaBySlug(slug);

  if (!coluna || !coluna.autor) {
    notFound();
  }

  const artigos = await getArtigosPublicados({ colunaSlug: coluna.slug });

  return (
    <div className="main-content-layout">
      <ColumnArchiveView
        coluna={coluna}
        autor={coluna.autor}
        artigos={artigos}
      />
    </div>
  );
}


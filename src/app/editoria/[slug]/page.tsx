import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { getCategoriaBySlug, getCategorias } from '@/services/categoriasService';
import { getArtigosPorCategoria } from '@/services/artigosService';
import { ArticleCard } from '@/components/editorial/ArticleCard';

interface EditoriaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: EditoriaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoriaBySlug(slug);

  if (!categoria) {
    return { title: 'Editoria não encontrada | aresta.' };
  }

  return {
    title: `${categoria.nome} | aresta. revista`,
    description: categoria.descricao || `Artigos e ensaios da editoria de ${categoria.nome}`,
  };
}

export default async function EditoriaPage({ params }: EditoriaPageProps) {
  const { slug } = await params;
  const categoria = await getCategoriaBySlug(slug);

  if (!categoria) {
    notFound();
  }

  const artigos = await getArtigosPorCategoria(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-ink-muted hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para a Capa</span>
        </Link>

        <div className="border-b border-border-subtle pb-6">
          <span className="section-kicker">Editoria Oficial</span>
          <h1
            className="text-4xl sm:text-5xl mt-2 tracking-tight"
            style={{
              fontFamily: 'var(--font-logo)',
              fontWeight: 400,
              color: 'var(--color-ink-primary)',
            }}
          >
            {categoria.nome.toLowerCase()}
            <span style={{ color: 'var(--color-brand-accent)' }}>.</span>
          </h1>
          <p className="text-lead text-base mt-2 max-w-2xl">
            {categoria.descricao}
          </p>
        </div>
      </div>

      {artigos.length > 0 ? (
        <div className="grid-magazine-feed">
          {artigos.map((artigo) => (
            <ArticleCard key={artigo.id} artigo={artigo} />
          ))}
        </div>
      ) : (
        <div className="card-featured p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 mx-auto text-brand-accent" />
          <h3 className="title-article text-xl">
            Nenhum artigo publicado nesta editoria ainda
          </h3>
          <p className="text-caption text-sm max-w-md mx-auto">
            Novos ensaios e colunas de {categoria.nome} estão em fase de edição pelos nossos autores.
          </p>
          <div className="pt-2">
            <Link href="/" className="btn-accent text-xs">
              Ir para a Capa Principal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

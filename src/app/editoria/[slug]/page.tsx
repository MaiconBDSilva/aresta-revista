import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { CATEGORIAS_OFICIAIS } from '@/components/layout/HeaderPortal';

interface EditoriaPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditoriaPage({ params }: EditoriaPageProps) {
  const { slug } = await params;
  const categoria = CATEGORIAS_OFICIAIS.find((c) => c.slug === slug);

  if (!categoria) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline transition-colors"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Capa</span>
        </Link>

        <div
          className="pb-6"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <span className="section-kicker">Editoria Oficial</span>
          <h1
            className="text-4xl sm:text-5xl mt-2"
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
            Acompanhe as análises, colunas e ensaios críticos da editoria de <strong>{categoria.nome}</strong> no aresta.
          </p>
        </div>
      </div>

      {/* Espaço reservado para o feed da Sprint 1 */}
      <div className="card-featured p-12 text-center space-y-4">
        <BookOpen className="w-10 h-10 mx-auto" style={{ color: 'var(--color-brand-accent)' }} />
        <h3 className="title-article text-xl">
          Acervo da Editoria {categoria.nome}
        </h3>
        <p className="text-caption text-sm max-w-md mx-auto">
          Os artigos completos e a vitrine de colunistas desta editoria serão carregados na <strong>Sprint 1</strong> com o catálogo de mocks tipados dos 5 autores.
        </p>
        <div className="pt-2">
          <Link href="/" className="btn-accent text-xs">
            Ir para a Capa Principal
          </Link>
        </div>
      </div>
    </div>
  );
}

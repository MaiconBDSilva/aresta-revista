import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Categoria, ArtigoCard as ArtigoCardType } from '@/types/artigo.types';
import { ArticleCard } from './ArticleCard';

interface CategorySectionProps {
  categoria: Categoria;
  artigos: ArtigoCardType[];
}

export function CategorySection({ categoria, artigos }: CategorySectionProps) {
  if (artigos.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-6 flex items-end justify-between border-b border-border-subtle pb-3">
        <h2 className="title-section">
          <span>{categoria.nome}</span>
        </h2>

        <Link
          href={`/editoria/${categoria.slug}`}
          className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-ink-muted hover:text-brand-accent transition-colors"
        >
          Ver tudo em {categoria.nome}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid-magazine-feed">
        {artigos.slice(0, 3).map((artigo) => (
          <ArticleCard key={artigo.id} artigo={artigo} />
        ))}
      </div>
    </section>
  );
}


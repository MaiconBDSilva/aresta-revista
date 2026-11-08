'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import type { ArtigoCard } from '@/types/artigo.types';

interface AuthorArticlesCarouselProps {
  artigos: ArtigoCard[];
  autorNome: string;
}

export function AuthorArticlesCarousel({ artigos, autorNome }: AuthorArticlesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const verificarScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setPodeVoltar(scrollLeft > 10);
    setPodeAvancar(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    verificarScroll();
    window.addEventListener('resize', verificarScroll);
    return () => window.removeEventListener('resize', verificarScroll);
  }, [artigos]);

  const rolar = (direcao: 'esquerda' | 'direita') => {
    if (!scrollRef.current) return;
    const offset = direcao === 'esquerda' ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  if (artigos.length === 0) {
    return (
      <p className="text-sm italic text-[var(--color-ink-muted)] py-8">
        Nenhum texto publicado ainda por {autorNome}.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Controles de Navegação do Carrossel */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink-muted)]">
          Deslize para ver os ensaios
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => rolar('esquerda')}
            disabled={!podeVoltar}
            aria-label="Artigo anterior"
            className="p-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-paper-surface)] text-[var(--color-ink-primary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => rolar('direita')}
            disabled={!podeAvancar}
            aria-label="Próximo artigo"
            className="p-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-paper-surface)] text-[var(--color-ink-primary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Faixa de Scroll com Cards */}
      <div
        ref={scrollRef}
        onScroll={verificarScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {artigos.map((artigo) => (
          <div
            key={artigo.id}
            className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start flex flex-col"
          >
            <ArticleCard artigo={artigo} />
          </div>
        ))}
      </div>
    </div>
  );
}


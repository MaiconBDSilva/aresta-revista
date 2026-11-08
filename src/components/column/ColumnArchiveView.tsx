'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Coluna, Perfil } from '@/types/autor.types';
import type { ArtigoCard as ArtigoCardType } from '@/types/artigo.types';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { FollowColumnModal } from './FollowColumnModal';

interface ColumnArchiveViewProps {
  coluna: Coluna;
  autor: Perfil;
  artigos: ArtigoCardType[];
}

const ITENS_POR_PAGINA = 6;

export function ColumnArchiveView({
  coluna,
  autor,
  artigos,
}: ColumnArchiveViewProps) {
  const [modalSeguirAberto, setModalSeguirAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const totalPaginas = Math.ceil(artigos.length / ITENS_POR_PAGINA) || 1;
  const indiceInicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const artigosExibidos = artigos.slice(indiceInicio, indiceInicio + ITENS_POR_PAGINA);

  const mudarPagina = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Modal de Seguir Coluna */}
      <FollowColumnModal
        isOpen={modalSeguirAberto}
        onClose={() => setModalSeguirAberto(false)}
        colunaNome={coluna.nome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Banner / Cabeçalho da Coluna */}
        <header className="relative mb-12 p-8 sm:p-12 rounded-2xl bg-[var(--color-paper-surface)] border border-[var(--color-border-subtle)] shadow-sm overflow-hidden">
          {coluna.capa_banner_url && (
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image
                src={coluna.capa_banner_url}
                alt={coluna.nome}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="section-kicker mb-2 block">
                Acervo de Coluna Exclusiva
              </span>

              <h1 className="title-display text-4xl sm:text-5xl mb-3">
                {coluna.nome}
              </h1>

              <p className="font-serif italic text-lg sm:text-xl text-[var(--color-ink-secondary)] leading-relaxed mb-6">
                “{coluna.manifesto_slogan}”
              </p>

              {/* Informações do Colunista Titular */}
              <div className="flex items-center gap-3">
                <Link href={`/autor/${autor.slug}`} className="shrink-0 group">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-brand-accent)]">
                    {autor.avatar_url ? (
                      <Image
                        src={autor.avatar_url}
                        alt={autor.nome}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 flex items-center justify-center font-bold">
                        {autor.nome[0]}
                      </div>
                    )}
                  </div>
                </Link>

                <div>
                  <Link
                    href={`/autor/${autor.slug}`}
                    className="font-semibold text-sm text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] transition-colors block"
                  >
                    Por {autor.nome}
                  </Link>
                  <Link
                    href={`/autor/${autor.slug}`}
                    className="text-xs text-[var(--color-ink-muted)] hover:underline"
                  >
                    Ver perfil biográfico &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Botão de Seguir esta Coluna */}
            <div className="shrink-0">
              <button
                onClick={() => setModalSeguirAberto(true)}
                className="btn-primary text-sm py-3 px-6 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Bell className="w-4 h-4" />
                <span>Seguir esta Coluna</span>
              </button>
            </div>
          </div>
        </header>

        {/* Grade de Artigos */}
        <section aria-label="Artigos da Coluna">
          <div className="flex items-center justify-between mb-8">
            <h2 className="title-section">
              Todos os Textos ({artigos.length})
            </h2>
            <span className="text-xs text-[var(--color-ink-muted)]">
              Página {paginaAtual} de {totalPaginas}
            </span>
          </div>

          {artigos.length === 0 ? (
            <p className="text-sm italic text-center py-12 text-[var(--color-ink-muted)]">
              Nenhum texto publicado nesta coluna até o momento.
            </p>
          ) : (
            <div className="grid-magazine-feed mb-12">
              {artigosExibidos.map((artigo) => (
                <ArticleCard key={artigo.id} artigo={artigo} />
              ))}
            </div>
          )}

          {/* Paginação Tradicional com Números (Decisão 6) */}
          {totalPaginas > 1 && (
            <nav
              aria-label="Navegação da Paginação"
              className="flex items-center justify-center gap-2 py-8 border-t border-[var(--color-border-subtle)]"
            >
              {/* Botão Anterior */}
              <button
                onClick={() => mudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                aria-label="Página anterior"
                className="btn-outline text-xs py-2 px-3 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {/* Botões de Números de Página */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => mudarPagina(num)}
                    aria-label={`Ir para a página ${num}`}
                    aria-current={paginaAtual === num ? 'page' : undefined}
                    className={`w-9 h-9 rounded-md text-xs font-semibold transition-all ${
                      paginaAtual === num
                        ? 'bg-[var(--color-brand-accent)] text-white shadow-sm'
                        : 'border border-[var(--color-border-subtle)] bg-[var(--color-paper-surface)] text-[var(--color-ink-primary)] hover:border-[var(--color-brand-accent)]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Botão Próximo */}
              <button
                onClick={() => mudarPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                aria-label="Próxima página"
                className="btn-outline text-xs py-2 px-3 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}
        </section>
      </div>
    </>
  );
}


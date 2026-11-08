'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Perfil, Coluna } from '@/types/autor.types';
import type { ArtigoCard } from '@/types/artigo.types';
import { AuthorArticlesCarousel } from './AuthorArticlesCarousel';
import { getAutorBySlug, getColunaByAutorId } from '@/services/autoresService';
import { getArtigosPublicados } from '@/services/artigosService';
import { subscribeToTableChanges } from '@/services/mockRepository';

interface AuthorProfileClientViewProps {
  initialAutor: Perfil;
  initialColuna: Coluna | null;
  initialArtigos: ArtigoCard[];
}

export function AuthorProfileClientView({
  initialAutor,
  initialColuna,
  initialArtigos,
}: AuthorProfileClientViewProps) {
  const [autor, setAutor] = useState<Perfil>(initialAutor);
  const [coluna, setColuna] = useState<Coluna | null>(initialColuna);
  const [artigos, setArtigos] = useState<ArtigoCard[]>(initialArtigos);

  useEffect(() => {
    const sincronizar = async () => {
      const atual = await getAutorBySlug(initialAutor.slug);
      if (atual) {
        setAutor(atual);
        const col = await getColunaByAutorId(atual.id);
        setColuna(col);
      }
      const arts = await getArtigosPublicados({ autorSlug: initialAutor.slug });
      setArtigos(arts);
    };

    sincronizar();
    const unsubscribe = subscribeToTableChanges('all', sincronizar);
    return unsubscribe;
  }, [initialAutor.slug, initialAutor.id]);

  return (
    <div className="main-content-layout">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bloco de Perfil do Colunista */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[var(--color-paper-surface)] border border-[var(--color-border-subtle)] shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Foto de Perfil */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[var(--color-brand-accent)]/20 shadow-md shrink-0 bg-neutral-100">
              {autor.avatar_url ? (
                <Image
                  src={autor.avatar_url}
                  alt={autor.nome}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, 144px"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-serif text-4xl font-bold">
                  {autor.nome[0]}
                </div>
              )}
            </div>

            {/* Informações Biográficas */}
            <div className="flex-1 text-center sm:text-left">
              <span className="section-kicker mb-2 block">
                Colunista Titular
              </span>

              <h1 className="title-display text-3xl sm:text-4xl mb-4">
                {autor.nome}
              </h1>

              {autor.bio && (
                <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--color-ink-secondary)] mb-6 max-w-2xl">
                  {autor.bio}
                </p>
              )}

              {/* Redes Sociais: X e Instagram */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm font-semibold">
                {autor.twitter_url && (
                  <a
                    href={autor.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <span>X (Twitter)</span>
                  </a>
                )}

                {autor.instagram_url && (
                  <a
                    href={autor.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Destaque da Coluna Oficial do Autor */}
          {coluna && (
            <div className="mt-8 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/[0.02] dark:bg-white/[0.02] p-5 rounded-xl">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand-accent)] block mb-1">
                  Coluna Exclusiva
                </span>
                <h3 className="font-serif font-bold text-xl text-[var(--color-ink-primary)]">
                  {coluna.nome}
                </h3>
                <p className="text-sm text-[var(--color-ink-secondary)] mt-1">
                  {coluna.manifesto_slogan}
                </p>
              </div>

              <Link
                href={`/coluna-arquivo/${coluna.slug}`}
                className="btn-primary text-xs py-2.5 px-5 shrink-0 whitespace-nowrap"
              >
                Acessar Acervo da Coluna &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Seção de Textos em Carrossel */}
        <section aria-label="Textos do Colunista">
          <div className="flex items-center justify-between mb-6">
            <h2 className="title-section">
              Ensaios Publicados ({artigos.length})
            </h2>
          </div>

          <AuthorArticlesCarousel
            artigos={artigos}
            autorNome={autor.nome}
          />
        </section>
      </div>
    </div>
  );
}


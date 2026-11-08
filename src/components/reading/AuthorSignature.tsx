import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Perfil, Coluna } from '@/types/autor.types';

interface AuthorSignatureProps {
  autor: {
    id: string;
    nome: string;
    slug: string;
    avatar_url: string | null;
    bio?: string | null;
    twitter_url?: string | null;
    instagram_url?: string | null;
  };
  coluna: Pick<Coluna, 'id' | 'nome' | 'slug'>;
}

export function AuthorSignature({ autor, coluna }: AuthorSignatureProps) {
  return (
    <section
      aria-label="Sobre o Colunista"
      className="author-signature"
    >
      {/* Avatar do Autor */}
      <Link href={`/autor/${autor.slug}`} className="shrink-0 group">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-border-subtle)] group-hover:border-[var(--color-brand-accent)] transition-colors">
          {autor.avatar_url ? (
            <Image
              src={autor.avatar_url}
              alt={autor.nome}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-serif text-2xl font-bold">
              {autor.nome[0]}
            </div>
          )}
        </div>
      </Link>

      {/* Conteúdo Biográfico */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <Link
            href={`/autor/${autor.slug}`}
            className="font-serif font-bold text-xl text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] transition-colors"
          >
            {autor.nome}
          </Link>
          <span className="text-xs text-[var(--color-ink-muted)]">•</span>
          <Link
            href={`/coluna-arquivo/${coluna.slug}`}
            className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand-accent)] hover:underline"
          >
            {coluna.nome}
          </Link>
        </div>

        {autor.bio && (
          <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)] mb-3">
            {autor.bio}
          </p>
        )}

        {/* Links: Ver Coluna + Redes Sociais (X e Instagram) */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <Link
            href={`/coluna-arquivo/${coluna.slug}`}
            className="font-semibold text-[var(--color-brand-accent)] hover:underline flex items-center gap-1"
          >
            <span>Ver todos os textos desta coluna</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>

          {autor.twitter_url && (
            <a
              href={autor.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors font-medium"
            >
              X (Twitter)
            </a>
          )}

          {autor.instagram_url && (
            <a
              href={autor.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors font-medium"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

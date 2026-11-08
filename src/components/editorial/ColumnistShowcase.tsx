import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ColunistaVitrineItem } from '@/services/autoresService';

interface ColumnistShowcaseProps {
  colunistas: ColunistaVitrineItem[];
}

export function ColumnistShowcase({ colunistas }: ColumnistShowcaseProps) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-end justify-between border-b border-border-subtle pb-3">
        <div>
          <span className="section-kicker">Vozes Titulares</span>
          <h2 className="font-serif text-2xl font-bold text-ink-primary md:text-3xl">
            Últimas das Colunas
          </h2>
        </div>
        <span className="hidden font-sans text-xs text-ink-muted md:inline">
          5 colunas autorais exclusivas
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {colunistas.map(({ autor, coluna, ultimoArtigo }) => (
          <div
            key={autor.id}
            className="card-article flex flex-col justify-between p-4"
          >
            <div>
              <div className="mb-3 flex items-center gap-3">
                {autor.avatar_url && (
                  <Link href={`/autor/${autor.slug}`} className="shrink-0">
                    <Image
                      src={autor.avatar_url}
                      alt={autor.nome}
                      width={44}
                      height={44}
                      className="rounded-full object-cover ring-2 ring-brand-accent/20"
                    />
                  </Link>
                )}
                <div>
                  <Link
                    href={`/coluna-arquivo/${coluna.slug}`}
                    className="block font-serif text-sm font-bold text-ink-primary hover:text-brand-accent transition-colors"
                  >
                    {coluna.nome}
                  </Link>
                  <Link
                    href={`/autor/${autor.slug}`}
                    className="block font-sans text-xs text-ink-muted hover:text-ink-primary"
                  >
                    {autor.nome}
                  </Link>
                </div>
              </div>

              {ultimoArtigo ? (
                <p className="font-serif text-sm font-semibold leading-snug text-ink-secondary line-clamp-3 mb-3">
                  <Link
                    href={`/coluna/${ultimoArtigo.slug}`}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {ultimoArtigo.titulo}
                  </Link>
                </p>
              ) : (
                <p className="font-sans text-xs italic text-ink-muted mb-3">
                  Nenhum texto publicado ainda.
                </p>
              )}
            </div>

            <div className="border-t border-border-subtle pt-2">
              <Link
                href={`/coluna-arquivo/${coluna.slug}`}
                className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-accent hover:underline"
              >
                Acessar Acervo
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


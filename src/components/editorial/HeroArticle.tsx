import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import type { ArtigoCard } from '@/types/artigo.types';
import { ArticleCard } from './ArticleCard';

interface HeroArticleProps {
  hero: ArtigoCard;
  apoios?: ArtigoCard[];
}

export function HeroArticle({ hero, apoios = [] }: HeroArticleProps) {
  const heroBadgeClass = `badge-category badge-${hero.categoria.slug}`;

  return (
    <section className="mb-14">
      <div className="grid-magazine-hero">
        {/* Manchete Principal (Hero Article) */}
        <div className="card-featured flex flex-col justify-between">
          <div>
            {hero.imagem_capa_url && (
              <Link
                href={`/coluna/${hero.slug}`}
                className="relative mb-5 block aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
              >
                <Image
                  src={hero.imagem_capa_url}
                  alt={hero.titulo}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </Link>
            )}

            <div className="mb-3 flex items-center justify-between gap-2">
              <Link href={`/editoria/${hero.categoria.slug}`}>
                <span className={heroBadgeClass}>{hero.categoria.nome}</span>
              </Link>
              <span className="flex items-center gap-1 font-sans text-xs text-ink-muted">
                <Clock className="h-3.5 w-3.5" />
                {hero.tempo_leitura_min} min de leitura
              </span>
            </div>

            <h1 className="title-display mb-4">
              <Link
                href={`/coluna/${hero.slug}`}
                className="hover:text-brand-accent transition-colors"
              >
                {hero.titulo}
              </Link>
            </h1>

            <p className="text-lead mb-6">{hero.subtitulo_lead}</p>
          </div>

          <div className="flex items-center justify-between border-t border-border-subtle pt-4">
            <Link
              href={`/coluna-arquivo/${hero.coluna.slug}`}
              className="font-sans text-sm font-semibold text-brand-accent hover:underline"
            >
              {hero.coluna.nome}
            </Link>

            <Link
              href={`/autor/${hero.autor.slug}`}
              className="flex items-center gap-2 group"
            >
              {hero.autor.avatar_url && (
                <Image
                  src={hero.autor.avatar_url}
                  alt={hero.autor.nome}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              )}
              <span className="font-sans text-sm font-medium text-ink-primary group-hover:text-brand-accent transition-colors">
                {hero.autor.nome}
              </span>
            </Link>
          </div>
        </div>

        {/* Apoios Secundários (Coluna da Direita) */}
        {apoios.length > 0 && (
          <div className="flex flex-col gap-6">
            {apoios.map((apoio) => (
              <ArticleCard key={apoio.id} artigo={apoio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


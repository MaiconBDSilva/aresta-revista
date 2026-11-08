import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import type { ArtigoCard as ArtigoCardType } from '@/types/artigo.types';
import { EditorialImage } from '@/components/editorial/EditorialImage';

interface ArticleCardProps {
  artigo: ArtigoCardType;
  featured?: boolean;
}

export function ArticleCard({ artigo, featured = false }: ArticleCardProps) {
  const badgeClass = `badge-category badge-${artigo.categoria.slug}`;

  return (
    <article className={featured ? 'card-featured' : 'card-article'}>
      <Link
        href={`/coluna/${artigo.slug}`}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        <EditorialImage
          src={artigo.imagem_capa_url}
          alt={artigo.titulo}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <Link href={`/editoria/${artigo.categoria.slug}`}>
            <span className={badgeClass}>{artigo.categoria.nome}</span>
          </Link>
          <span className="flex items-center gap-1 font-sans text-xs text-ink-muted">
            <Clock className="h-3 w-3" />
            {artigo.tempo_leitura_min} min
          </span>
        </div>

        <h3 className={featured ? 'title-article mb-2' : 'font-serif text-xl font-bold leading-snug text-ink-primary mb-2 line-clamp-2'}>
          <Link
            href={`/coluna/${artigo.slug}`}
            className="hover:text-brand-accent transition-colors"
          >
            {artigo.titulo}
          </Link>
        </h3>

        <p className="font-sans text-sm text-ink-secondary line-clamp-2 mb-4 leading-relaxed">
          {artigo.subtitulo_lead}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-subtle">
          <Link
            href={`/coluna-arquivo/${artigo.coluna.slug}`}
            className="font-sans text-xs font-semibold text-brand-accent hover:underline"
          >
            {artigo.coluna.nome}
          </Link>

          <Link
            href={`/autor/${artigo.autor.slug}`}
            className="flex items-center gap-2 group"
          >
            {artigo.autor.avatar_url && (
              <Image
                src={artigo.autor.avatar_url}
                alt={artigo.autor.nome}
                width={22}
                height={22}
                className="rounded-full object-cover"
              />
            )}
            <span className="font-sans text-xs text-ink-muted group-hover:text-ink-primary transition-colors">
              {artigo.autor.nome}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}


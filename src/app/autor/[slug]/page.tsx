import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAutorBySlug, getColunaByAutorId, getAutores } from '@/services/autoresService';
import { getArtigosPublicados } from '@/services/artigosService';
import { AuthorProfileClientView } from '@/components/author/AuthorProfileClientView';

interface AutorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const autores = await getAutores();
  return autores.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: AutorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const autor = await getAutorBySlug(slug);

  if (!autor) {
    return {
      title: 'Autor não encontrado | aresta.',
    };
  }

  return {
    title: `${autor.nome} | Perfil do Colunista`,
    description: autor.bio || `Perfil de ${autor.nome} na revista aresta.`,
    openGraph: {
      title: `${autor.nome} | aresta.`,
      description: autor.bio || `Perfil de ${autor.nome} na revista aresta.`,
      images: autor.avatar_url ? [{ url: autor.avatar_url, alt: autor.nome }] : [],
    },
  };
}

export default async function AutorPage({ params }: AutorPageProps) {
  const { slug } = await params;
  const autor = await getAutorBySlug(slug);

  if (!autor) {
    notFound();
  }

  const coluna = await getColunaByAutorId(autor.id);
  const artigos = await getArtigosPublicados({ autorSlug: autor.slug });

  return (
    <AuthorProfileClientView
      initialAutor={autor}
      initialColuna={coluna}
      initialArtigos={artigos}
    />
  );
}


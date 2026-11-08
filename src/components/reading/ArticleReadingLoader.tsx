'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ArtigoCompleto, ArtigoComentarioPublico } from '@/types/artigo.types';
import type { Perfil } from '@/types/autor.types';
import { getArtigoBySlug } from '@/services/artigosService';
import { getAutorBySlug } from '@/services/autoresService';
import { getComentariosByArtigoId } from '@/services/comentariosService';
import { ArticleReadingView } from './ArticleReadingView';

interface ArticleReadingLoaderProps {
  slug: string;
}

/**
 * Fallback de leitura para artigos criados/publicados localmente (banco mock no navegador),
 * que não existem nos dados estáticos gerados no servidor.
 */
export function ArticleReadingLoader({ slug }: ArticleReadingLoaderProps) {
  const [artigo, setArtigo] = useState<ArtigoCompleto | null>(null);
  const [autor, setAutor] = useState<Perfil | null>(null);
  const [comentarios, setComentarios] = useState<ArtigoComentarioPublico[]>([]);
  const [estado, setEstado] = useState<'carregando' | 'ok' | 'nao-encontrado'>('carregando');

  useEffect(() => {
    let ativo = true;
    (async () => {
      const encontrado = await getArtigoBySlug(slug);
      if (!ativo) return;
      if (!encontrado || encontrado.status !== 'publicado') {
        setEstado('nao-encontrado');
        return;
      }
      const [perfilAutor, coments] = await Promise.all([
        getAutorBySlug(encontrado.autor.slug),
        getComentariosByArtigoId(encontrado.id),
      ]);
      if (!ativo) return;
      setArtigo(encontrado);
      setAutor(perfilAutor);
      setComentarios(coments);
      setEstado('ok');
    })();
    return () => {
      ativo = false;
    };
  }, [slug]);

  if (estado === 'carregando') {
    return <p className="text-caption text-center py-20">Carregando artigo…</p>;
  }

  if (estado === 'nao-encontrado' || !artigo) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="section-kicker">Erro 404</span>
        <h1 className="title-display text-4xl">Artigo não encontrado</h1>
        <Link href="/" className="btn-accent">
          Voltar para a Capa
        </Link>
      </div>
    );
  }

  return (
    <ArticleReadingView artigo={artigo} autorPerfil={autor} comentariosIniciais={comentarios} />
  );
}


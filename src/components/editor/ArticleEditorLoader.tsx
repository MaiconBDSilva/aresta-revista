'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ArtigoCompleto } from '@/types/artigo.types';
import { getArtigoById } from '@/services/artigosService';
import { ArticleEditorView } from './ArticleEditorView';

interface ArticleEditorLoaderProps {
  artigoId: string;
}

/**
 * Carrega o artigo a partir do banco mock (localStorage) diretamente no navegador,
 * para que textos criados ou editados localmente sejam encontrados (o servidor só enxerga os mocks originais).
 */
export function ArticleEditorLoader({ artigoId }: ArticleEditorLoaderProps) {
  const [artigo, setArtigo] = useState<ArtigoCompleto | null>(null);
  const [estado, setEstado] = useState<'carregando' | 'ok' | 'nao-encontrado'>('carregando');

  useEffect(() => {
    let ativo = true;
    getArtigoById(artigoId).then((encontrado) => {
      if (!ativo) return;
      setArtigo(encontrado);
      setEstado(encontrado ? 'ok' : 'nao-encontrado');
    });
    return () => {
      ativo = false;
    };
  }, [artigoId]);

  if (estado === 'carregando') {
    return <p className="text-caption text-center py-20">Carregando editor…</p>;
  }

  if (estado === 'nao-encontrado' || !artigo) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="section-kicker">Erro 404</span>
        <h1 className="title-display text-4xl">Artigo não encontrado</h1>
        <Link href="/painel" className="btn-accent">
          Voltar ao Painel
        </Link>
      </div>
    );
  }

  return <ArticleEditorView key={artigo.id} artigoInicial={artigo} modoNovo={false} />;
}


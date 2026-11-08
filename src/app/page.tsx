import React from 'react';
import { getHeroArticle, getDestaquesSecao, getArtigosPorCategoria } from '@/services/artigosService';
import { getColunistasVitrine } from '@/services/autoresService';
import { getCategorias } from '@/services/categoriasService';
import { HomeClientView } from '@/components/editorial/HomeClientView';

export const revalidate = 60; // ISR leve

export default async function HomePage() {
  const [hero, apoios, colunistas, categorias] = await Promise.all([
    getHeroArticle(),
    getDestaquesSecao(),
    getColunistasVitrine(),
    getCategorias(),
  ]);

  // Carrega artigos para cada uma das editorias em paralelo
  const artigosPorCategoria = await Promise.all(
    categorias.map(async (cat) => ({
      categoria: cat,
      artigos: await getArtigosPorCategoria(cat.slug, 3),
    }))
  );

  const dataAtualFormatada = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Faixa Editorial de Data e Lema */}
      <div className="mb-8 flex flex-col items-start justify-between gap-2 border-b border-border-subtle pb-3 sm:flex-row sm:items-center">
        <p className="font-sans text-xs font-semibold capitalize text-ink-muted">
          {dataAtualFormatada}
        </p>
        <p className="font-serif text-xs italic text-ink-secondary">
          Reflexão crítica, ensaios profundos e colunas autorais no Brasil Central.
        </p>
      </div>

      {/* Visão da Home com Suporte a Hidratação Reativa em Tempo Real */}
      <HomeClientView
        initialHero={hero}
        initialApoios={apoios}
        initialColunistas={colunistas}
        initialArtigosPorCategoria={artigosPorCategoria}
        categorias={categorias}
      />
    </div>
  );
}

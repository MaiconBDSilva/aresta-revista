'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ArtigoCard, Categoria } from '@/types/artigo.types';
import type { ColunistaVitrineItem } from '@/services/autoresService';
import { HeroArticle } from '@/components/editorial/HeroArticle';
import { ColumnistShowcase } from '@/components/editorial/ColumnistShowcase';
import { CategorySection } from '@/components/editorial/CategorySection';
import {
  getHeroArticle,
  getDestaquesSecao,
  getArtigosPorCategoria,
} from '@/services/artigosService';
import { getColunistasVitrine } from '@/services/autoresService';
import { subscribeToTableChanges } from '@/services/mockRepository';

interface CategoriaFeed {
  categoria: Categoria;
  artigos: ArtigoCard[];
}

interface HomeClientViewProps {
  initialHero: ArtigoCard | null;
  initialApoios: ArtigoCard[];
  initialColunistas: ColunistaVitrineItem[];
  initialArtigosPorCategoria: CategoriaFeed[];
  categorias: Categoria[];
}

export function HomeClientView({
  initialHero,
  initialApoios,
  initialColunistas,
  initialArtigosPorCategoria,
  categorias,
}: HomeClientViewProps) {
  const [hero, setHero] = useState<ArtigoCard | null>(initialHero);
  const [apoios, setApoios] = useState<ArtigoCard[]>(initialApoios);
  const [colunistas, setColunistas] = useState<ColunistaVitrineItem[]>(initialColunistas);
  const [artigosPorCategoria, setArtigosPorCategoria] = useState<CategoriaFeed[]>(
    initialArtigosPorCategoria
  );

  const sincronizarComLocalStorage = useCallback(async () => {
    try {
      const [novoHero, novosApoios, novosColunistas] = await Promise.all([
        getHeroArticle(),
        getDestaquesSecao(),
        getColunistasVitrine(),
      ]);

      setHero(novoHero);
      setApoios(novosApoios);
      setColunistas(novosColunistas);

      const novosFeeds = await Promise.all(
        categorias.map(async (cat) => ({
          categoria: cat,
          artigos: await getArtigosPorCategoria(cat.slug, 3),
        }))
      );
      setArtigosPorCategoria(novosFeeds);
    } catch {
      // Falha silenciosa em caso de leitura concorrente
    }
  }, [categorias]);

  useEffect(() => {
    // Sincroniza logo no primeiro carregamento do cliente
    sincronizarComLocalStorage();

    // Reage instantaneamente a qualquer modificação no mock DB
    const unsubscribe = subscribeToTableChanges('all', () => {
      sincronizarComLocalStorage();
    });

    return unsubscribe;
  }, [sincronizarComLocalStorage]);

  return (
    <>
      {/* Manchete Principal (Hero) + 2 Apoios Secundários */}
      {hero && <HeroArticle hero={hero} apoios={apoios} />}

      {/* Vitrine Horizontal "Últimas das Colunas" */}
      <ColumnistShowcase colunistas={colunistas} />

      {/* Seções Modulares para as 5 Editorias Oficiais */}
      <div className="space-y-12">
        {artigosPorCategoria.map(({ categoria, artigos }) => (
          <CategorySection
            key={categoria.id}
            categoria={categoria}
            artigos={artigos}
          />
        ))}
      </div>
    </>
  );
}

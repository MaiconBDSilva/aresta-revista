'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { buscarArtigos } from '@/services/artigosService';
import type { ArtigoCard } from '@/types/artigo.types';

export function HeaderSearchBar() {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState<ArtigoCard[]>([]);
  const [isPending, startTransition] = useTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fecha o popover ao clicar fora do componente
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }

    if (aberto) {
      document.addEventListener('mousedown', handleClickFora);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, [aberto]);

  // Foco no input ao abrir
  useEffect(() => {
    if (aberto && inputRef.current) {
      inputRef.current.focus();
    }
  }, [aberto]);

  // Busca reativa quando o termo é alterado
  useEffect(() => {
    if (!termo.trim()) {
      setResultados([]);
      return;
    }

    startTransition(async () => {
      const arts = await buscarArtigos(termo);
      setResultados(arts.slice(0, 5)); // Exibe até 5 resultados imediatos no popover
    });
  }, [termo]);

  const fechar = () => {
    setAberto(false);
    setTermo('');
    setResultados([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      fechar();
    } else if (e.key === 'Enter' && resultados.length > 0) {
      // Se pressionar Enter, navega para o primeiro resultado
      router.push(`/coluna/${resultados[0].slug}`);
      fechar();
    }
  };

  return (
    <div ref={containerRef} className="header-search-container">
      {!aberto ? (
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="header-search-btn"
          aria-label="Abrir busca rápida"
        >
          <Search className="w-3.5 h-3.5" />
          <span>BUSCAR</span>
        </button>
      ) : (
        <div className="header-search-input-box">
          <Search className="w-3.5 h-3.5 text-ink-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="BUSCAR"
            className="header-search-input"
            aria-label="Campo de busca"
          />
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-accent shrink-0" />
          ) : (
            <button
              type="button"
              onClick={fechar}
              className="header-search-clear-btn"
              aria-label="Fechar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Popover Flutuante com Seta (Estilo G1) */}
      {aberto && termo.trim().length > 0 && (
        <div className="header-search-popover">
          <div className="header-search-list">
            {resultados.length > 0 ? (
              <>
                {resultados.map((artigo) => (
                  <Link
                    key={artigo.id}
                    href={`/coluna/${artigo.slug}`}
                    onClick={fechar}
                    className="header-search-item"
                  >
                    <span className="header-search-logo">
                      a<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="header-search-title">
                        {artigo.titulo}
                      </p>
                      <p className="header-search-meta">
                        EM {artigo.categoria.nome.toUpperCase()} • {artigo.coluna.nome.toUpperCase()}
                      </p>
                    </div>
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    if (resultados[0]) {
                      router.push(`/coluna/${resultados[0].slug}`);
                      fechar();
                    }
                  }}
                  className="header-search-action w-full text-left"
                >
                  <Search className="w-3.5 h-3.5 opacity-60" />
                  <span>
                    buscar por <strong>&ldquo;{termo}&rdquo;</strong> no aresta.
                  </span>
                </button>
              </>
            ) : !isPending ? (
              <div className="header-search-empty">
                Nenhum artigo encontrado para &ldquo;{termo}&rdquo;.
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}


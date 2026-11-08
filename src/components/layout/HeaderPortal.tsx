'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PenSquare, Shield } from 'lucide-react';
import { HeaderSearchBar } from './HeaderSearchBar';

export const CATEGORIAS_OFICIAIS = [
  { nome: 'Política', slug: 'politica', cor: 'var(--color-cat-politica)' },
  { nome: 'Cultura', slug: 'cultura', cor: 'var(--color-cat-cultura)' },
  { nome: 'Entretenimento', slug: 'entretenimento', cor: 'var(--color-cat-entretenimento)' },
  { nome: 'Ensaios', slug: 'ensaios', cor: 'var(--color-cat-ensaios)' },
  { nome: 'Esporte', slug: 'esporte', cor: 'var(--color-cat-esporte)' },
];

interface EditorialNavbarBarProps {
  ariaLabel?: string;
}

/**
 * Barra de navegação completa compartilhada entre o Header de Topo (clone)
 * e o Menu Flutuante Frosted Glass.
 * - Esquerda (colada): Logo compacto "a." em Svetze
 * - Centro (absoluto): As 5 categorias oficiais com espaçamento dinâmico/variável,
 *   colapsando automaticamente quando se aproximam das ações da direita ou da logo
 * - Direita (colada): Busca, Escrever, Admin e ícone do Drawer Mobile no canto direito
 */
export function EditorialNavbarBar({ ariaLabel = 'Navegação Principal' }: EditorialNavbarBarProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [colapsado, setColapsado] = useState(false);
  const colapsadoRef = useRef(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  colapsadoRef.current = colapsado;

  const verificarColisao = useCallback(() => {
    if (!containerRef.current || !logoRef.current || !navRef.current || !actionsRef.current) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const logoRect = logoRef.current.getBoundingClientRect();
    const actionsRect = actionsRef.current.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();

    if (containerRect.width === 0) return;

    // Centro geométrico exato da barra
    const centerX = containerRect.left + containerRect.width / 2;
    const navHalfWidth = navRect.width / 2;

    // Posições dos limites esquerdo e direito dos links centrais
    const navLeft = centerX - navHalfWidth;
    const navRight = centerX + navHalfWidth;

    // Margem de segurança de 24px para evitar encostar em qualquer elemento lateral
    const BUFFER = 24;

    // Se já estiver colapsado, o toggle mobile (~44px) está em actionsRect;
    // compensamos para criar histerese e impedir oscilação (flicker)
    const toggleOffset = colapsadoRef.current ? 44 : 0;

    const colideDireita = navRight >= (actionsRect.left + toggleOffset) - BUFFER;
    const colideEsquerda = navLeft <= logoRect.right + BUFFER;

    const deveColapsar = colideDireita || colideEsquerda;

    setColapsado((prev) => {
      if (prev !== deveColapsar) {
        if (!deveColapsar) {
          setMenuAberto(false);
        }
        return deveColapsar;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    verificarColisao();

    const observer = new ResizeObserver(() => {
      verificarColisao();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    if (actionsRef.current) {
      observer.observe(actionsRef.current);
    }
    window.addEventListener('resize', verificarColisao);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', verificarColisao);
    };
  }, [verificarColisao]);

  return (
    <>
      <div ref={containerRef} className="navbar-inner">
        {/* Extrema Esquerda: Logo compacto "a." */}
        <Link
          ref={logoRef}
          href="/"
          className="navbar-logo-compact"
          aria-label="Aresta Revista - Início"
        >
          a<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
        </Link>

        {/* Centro Absoluto da Tela: 5 Editorias Oficiais com Espaçamento Variável */}
        <nav
          ref={navRef}
          className={`navbar-center-links ${colapsado ? 'is-collapsed' : ''}`}
          aria-label={ariaLabel}
        >
          {CATEGORIAS_OFICIAIS.map((cat) => {
            const estaAtivo = pathname.startsWith(`/editoria/${cat.slug}`);
            return (
              <Link
                key={cat.slug}
                href={`/editoria/${cat.slug}`}
                className={`navbar-link ${estaAtivo ? 'is-active' : ''}`}
              >
                {cat.nome}
              </Link>
            );
          })}
        </nav>

        {/* Extrema Direita: Busca Inteligente (Estilo G1), Ações e Ícone do Drawer Mobile */}
        <div ref={actionsRef} className="navbar-actions">
          <HeaderSearchBar />

          <Link href="/painel" className="navbar-btn-outline">
            <PenSquare className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-accent)' }} />
            <span>Escrever</span>
          </Link>

          <Link href="/admin" className="navbar-btn-solid">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>

          <button
            type="button"
            className={`navbar-mobile-toggle ${colapsado ? 'is-visible' : ''}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      {menuAberto && (
        <div className="navbar-mobile-drawer">
          <div className="mb-4 pb-3 border-b border-border-subtle">
            <HeaderSearchBar />
          </div>

          <p className="section-kicker">Editorias</p>
          <div className="flex flex-col gap-2">
            {CATEGORIAS_OFICIAIS.map((cat) => {
              const estaAtivo = pathname.startsWith(`/editoria/${cat.slug}`);
              return (
                <Link
                  key={cat.slug}
                  href={`/editoria/${cat.slug}`}
                  onClick={() => setMenuAberto(false)}
                  className={`navbar-link text-base py-2 ${estaAtivo ? 'is-active' : ''}`}
                >
                  {cat.nome}
                </Link>
              );
            })}
          </div>

          <div
            className="pt-4 mt-2 flex flex-col gap-2"
            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
          >
            <Link
              href="/painel"
              onClick={() => setMenuAberto(false)}
              className="navbar-link flex items-center gap-2 py-2"
            >
              <PenSquare className="w-4 h-4" style={{ color: 'var(--color-brand-accent)' }} />
              <span>Painel do Colunista</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMenuAberto(false)}
              className="navbar-link flex items-center gap-2 py-2"
            >
              <Shield className="w-4 h-4" />
              <span>Mesa Editorial / Admin</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export function HeaderPortal() {
  const pathname = usePathname();

  // Determina o título editorial com base na rota atual (estilo G1 / portal)
  let tituloEditorial = 'aresta';

  if (pathname.startsWith('/editoria/')) {
    const slug = pathname.replace('/editoria/', '').split('/')[0];
    const catEncontrada = CATEGORIAS_OFICIAIS.find((c) => c.slug === slug);
    if (catEncontrada) {
      tituloEditorial = catEncontrada.nome.toLowerCase();
    }
  }

  return (
    <div className="header-portal-top">
      {/* Parte Superior: Logo Grande / Nome da Editoria em Atelier Fleur Regular */}
      <div id="header-portal-brand" className="header-portal-brand-area">
        <Link href="/" className="header-portal-title">
          {tituloEditorial}
          <span style={{ color: 'var(--color-brand-accent)' }}>.</span>
        </Link>
      </div>

      {/* Parte Inferior: Clone Exato do Menu Flutuante */}
      <div className="header-portal-bar">
        <EditorialNavbarBar ariaLabel="Menu do Cabeçalho Principal" />
      </div>
    </div>
  );
}

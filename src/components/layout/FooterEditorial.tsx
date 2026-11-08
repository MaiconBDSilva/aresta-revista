'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIAS_OFICIAIS } from './HeaderPortal';

const COLUNAS = [
  { nome: 'Coluna de Lucas', slug: 'coluna-de-lucas', autor: 'Lucas Campos' },
  { nome: 'Coluna de Danillo', slug: 'coluna-de-danillo', autor: 'Danillo Reis' },
  { nome: 'Coluna de Sergio', slug: 'coluna-de-sergio', autor: 'Sergio Rodrigues' },
  { nome: 'Coluna de Lara', slug: 'coluna-de-lara', autor: 'Lara Lima' },
  { nome: 'Coluna de Guliver', slug: 'coluna-de-guliver', autor: 'Guliver Elias' },
];

export function FooterEditorial() {
  return (
    <footer className="footer-editorial">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Coluna 1: Marca & Missão */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="inline-block group">
            <span
              className="text-4xl tracking-tight"
              style={{
                fontFamily: 'var(--font-logo)',
                fontWeight: 400,
                color: 'var(--color-ink-primary)',
              }}
            >
              aresta<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
            </span>
          </Link>
          <p
            className="text-sm leading-relaxed font-medium"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Revista independente de ensaios culturais, colunas autorais e reflexões contemporâneas. O corte analítico sobre o nosso tempo.
          </p>
          <p className="text-caption">
            © {new Date().getFullYear()} aresta. Todos os direitos reservados.
          </p>
        </div>

        {/* Coluna 2: As 5 Editorias Oficiais */}
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--color-ink-primary)' }}
          >
            Editorias
          </h4>
          <ul className="space-y-2.5">
            {CATEGORIAS_OFICIAIS.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/editoria/${cat.slug}`}
                  className="text-sm font-semibold hover:underline transition-colors"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  {cat.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3: Nossos Colunistas */}
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--color-ink-primary)' }}
          >
            Colunistas
          </h4>
          <ul className="space-y-2.5">
            {COLUNAS.map((col) => (
              <li key={col.slug}>
                <Link
                  href={`/coluna-arquivo/${col.slug}`}
                  className="text-sm font-semibold hover:underline transition-colors"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  {col.nome}{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--color-ink-muted)' }}>
                    ({col.autor})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 4: Newsletter */}
        <div className="space-y-3">
          <h4
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-ink-primary)' }}
          >
            Newsletter Semanal
          </h4>
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Receba as melhores colunas, crônicas e ensaios da semana diretamente no seu e-mail aos sábados.
          </p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="seu@email.com"
              className="input-field text-sm"
              required
            />
            <button type="submit" className="btn-accent w-full text-xs py-2.5 font-bold">
              Assinar Gratuitamente
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

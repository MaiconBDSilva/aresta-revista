import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const editorias = [
    {
      nome: 'Política',
      slug: 'politica',
      classe: 'badge-politica',
      cor: 'var(--color-cat-politica)',
      desc: 'Análises de bastidores, instituições e jogos de poder.',
    },
    {
      nome: 'Cultura',
      slug: 'cultura',
      classe: 'badge-cultura',
      cor: 'var(--color-cat-cultura)',
      desc: 'Crítica literária, cinema, artes visuais e patrimônio.',
    },
    {
      nome: 'Entretenimento',
      slug: 'entretenimento',
      classe: 'badge-entretenimento',
      cor: 'var(--color-cat-entretenimento)',
      desc: 'Cultura pop, fenômenos digitais, streaming e contemporaneidade.',
    },
    {
      nome: 'Ensaios',
      slug: 'ensaios',
      classe: 'badge-ensaios',
      cor: 'var(--color-cat-ensaios)',
      desc: 'Ensaios profundos, debates urgentes e reflexões autorais.',
    },
    {
      nome: 'Esporte',
      slug: 'esporte',
      classe: 'badge-esporte',
      cor: 'var(--color-cat-esporte)',
      desc: 'O esporte como lente sociológica e manifestação cultural.',
    },
  ];

  const colunistas = [
    { nome: 'Lucas Campos', coluna: 'Coluna de Lucas', slug: 'coluna-de-lucas' },
    { nome: 'Danillo Reis', coluna: 'Coluna de Danillo', slug: 'coluna-de-danillo' },
    { nome: 'Sergio Rodrigues', coluna: 'Coluna de Sergio', slug: 'coluna-de-sergio' },
    { nome: 'Lara Lima', coluna: 'Coluna de Lara', slug: 'coluna-de-lara' },
    { nome: 'Guliver Elias', coluna: 'Coluna de Guliver', slug: 'coluna-de-guliver' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero de Fundação da Sprint 0 */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="section-kicker">Sprint 0 • Fundação Editorial</span>
          <span className="badge-status badge-status-publicado">
            <CheckCircle2 className="w-3.5 h-3.5" /> Fundação Validada
          </span>
        </div>

        <h1 className="title-display">
          O ponto de vista analítico sobre o nosso tempo<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
        </h1>

        <p className="text-lead font-medium">
          Bem-vindo ao <strong>aresta.</strong> — portal independente de ensaios, colunas e reflexões críticas. Esta página inicial consolida a <strong>Sprint 0</strong> com tipografia institucional em <strong>Svetze</strong> (<code>public/fonts/Svetze.otf</code>), cabeçalho estático no topo com clone completo do menu embaixo e menu flutuante <em>frosted glass</em> real dando desfoque sobre o conteúdo ao rolar a página.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/painel" className="btn-accent">
            <Sparkles className="w-4 h-4" />
            <span>Acessar Painel do Colunista</span>
          </Link>
          <Link href="/admin" className="btn-primary">
            <BookOpen className="w-4 h-4" />
            <span>Mesa Editorial / Admin</span>
          </Link>
          <a href="#catalogo" className="btn-outline font-semibold">
            Ver Catálogo de Primitivas
          </a>
        </div>
      </section>

      {/* Grid de Apresentação das 5 Editorias Oficiais */}
      <section className="space-y-6">
        <div
          className="flex items-center justify-between pb-3"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <h2 className="title-section">As 5 Grandes Editorias</h2>
          <span className="text-caption font-semibold">Eixos temáticos oficiais</span>
        </div>

        <div className="grid-magazine-feed">
          {editorias.map((ed) => (
            <div key={ed.slug} className="card-article">
              <div
                className="h-24 w-full flex items-end p-4"
                style={{
                  background: `linear-gradient(135deg, ${ed.cor} 0%, #09090B 100%)`,
                }}
              >
                <span
                  className="text-2xl text-white"
                  style={{ fontFamily: 'var(--font-logo)' }}
                >
                  {ed.nome.toLowerCase()}
                  <span style={{ color: 'var(--color-brand-accent)' }}>.</span>
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <span className={`badge-category ${ed.classe}`}>
                    {ed.nome}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink-primary)' }}
                >
                  {ed.nome}
                </h3>
                <p className="text-caption font-medium" style={{ color: 'var(--color-ink-secondary)' }}>
                  {ed.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/editoria/${ed.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline transition-colors"
                    style={{ color: 'var(--color-brand-accent)' }}
                  >
                    <span>Explorar {ed.nome}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid dos 5 Colunistas Oficiais */}
      <section className="space-y-6">
        <div
          className="flex items-center justify-between pb-3"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <h2 className="title-section">Colunistas Titulares</h2>
          <span className="text-caption font-semibold">5 Autores Oficiais do Projeto</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {colunistas.map((col) => (
            <div key={col.slug} className="card-columnist flex-col items-start text-left">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-serif)',
                  backgroundColor: 'rgba(9, 9, 11, 0.06)',
                  color: 'var(--color-ink-primary)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                {col.nome.charAt(0)}
              </div>
              <div>
                <h4
                  className="font-bold text-sm"
                  style={{ color: 'var(--color-ink-primary)' }}
                >
                  {col.nome}
                </h4>
                <p className="text-caption font-medium">
                  {col.coluna}
                </p>
              </div>
              <Link
                href={`/coluna-arquivo/${col.slug}`}
                className="text-xs font-bold hover:underline mt-2 inline-flex items-center gap-1"
                style={{ color: 'var(--color-brand-accent)' }}
              >
                <span>Ver Acervo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Amostra Visual do Catálogo Semântico */}
      <section id="catalogo" className="space-y-6">
        <div
          className="pb-3"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <h2 className="title-section">Amostra Visual de Primitivas Semânticas</h2>
          <p className="text-caption mt-1 font-medium">
            Conforme definido em <code>docs/dicionario-de-dados.md (Seção 1.3)</code>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Featured Preview */}
          <div className="card-featured space-y-4">
            <span className="section-kicker">Exemplo de Card Featured</span>
            <div>
              <span className="badge-category badge-cultura">Cultura</span>
            </div>
            <h3 className="title-article text-2xl">
              A estética do corte: por que as publicações independentes retornaram à serifa
            </h3>
            <p className="text-lead text-base">
              Uma investigação sobre o papel da lentidão, da leitura imersiva e do respeito ao leitor na internet acelerada.
            </p>
            <div
              className="flex items-center justify-between text-caption pt-3"
              style={{ borderTop: '1px solid var(--color-border-subtle)' }}
            >
              <span className="font-bold" style={{ color: 'var(--color-ink-primary)' }}>
                Por Lucas Campos
              </span>
              <span className="inline-flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-accent)' }} /> 6 min de leitura
              </span>
            </div>
          </div>

          {/* Botões e Badges */}
          <div className="card-article p-6 space-y-6">
            <div>
              <h4 className="section-kicker mb-3">
                Botões Semânticos
              </h4>
              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-primary">.btn-primary</button>
                <button type="button" className="btn-accent">.btn-accent</button>
                <button type="button" className="btn-outline">.btn-outline</button>
                <button type="button" className="btn-ghost">.btn-ghost</button>
              </div>
            </div>

            <div>
              <h4 className="section-kicker mb-3">
                Badges de Status do Ciclo Editorial
              </h4>
              <div className="flex flex-wrap gap-3">
                <span className="badge-status badge-status-edicao">
                  status: edicao (Em Edição)
                </span>
                <span className="badge-status badge-status-publicado">
                  status: publicado (Publicado)
                </span>
              </div>
            </div>

            <div>
              <h4 className="section-kicker mb-3">
                Tags Semânticas
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="badge-tag">#ensaio</span>
                <span className="badge-tag">#crítica-cultural</span>
                <span className="badge-tag">#psicanalise</span>
                <span className="badge-tag">#politica-2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

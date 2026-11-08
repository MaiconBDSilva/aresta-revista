'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ArtigoCompleto, ArtigoComentarioPublico } from '@/types/artigo.types';
import type { Perfil } from '@/types/autor.types';
import { EditorialImage } from '@/components/editorial/EditorialImage';
import { ReadingProgressBar } from './ReadingProgressBar';
import { ReadingToolbar, type TemaLeitura, type TamanhoFonte } from './ReadingToolbar';
import { QuoteCardModal } from './QuoteCardModal';
import { InstagramStoryModal } from './InstagramStoryModal';
import { MarkdownContent } from './MarkdownContent';
import { AuthorSignature } from './AuthorSignature';
import { PublicCommentsSection } from './PublicCommentsSection';

interface ArticleReadingViewProps {
  artigo: ArtigoCompleto;
  autorPerfil?: Perfil | null;
  comentariosIniciais: ArtigoComentarioPublico[];
}

export function ArticleReadingView({
  artigo,
  autorPerfil,
  comentariosIniciais,
}: ArticleReadingViewProps) {
  const [tema, setTema] = useState<TemaLeitura>('claro');
  const [tamanhoFonte, setTamanhoFonte] = useState<TamanhoFonte>('md');
  const [quoteModalAberto, setQuoteModalAberto] = useState(false);
  const [storyModalAberto, setStoryModalAberto] = useState(false);
  const [textoCitacao, setTextoCitacao] = useState('');
  const [avisoSelecao, setAvisoSelecao] = useState<string | null>(null);

  // Ao clicar no botão Quote, captura texto estritamente selecionado pelo leitor
  const handleAbrirQuoteModal = () => {
    let selecionado = '';
    if (typeof window !== 'undefined') {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        selecionado = selection.toString().trim();
      }
    }

    if (!selecionado) {
      setAvisoSelecao('Por favor, selecione com o mouse ou toque um trecho do texto antes de gerar o cartão.');
      setTimeout(() => setAvisoSelecao(null), 4000);
      return;
    }

    setTextoCitacao(selecionado);
    setAvisoSelecao(null);
    setQuoteModalAberto(true);
  };

  const badgeClassPorCategoria: Record<string, string> = {
    politica: 'badge-politica',
    cultura: 'badge-cultura',
    entretenimento: 'badge-entretenimento',
    ensaios: 'badge-ensaios',
    esporte: 'badge-esporte',
  };

  const badgeClass =
    badgeClassPorCategoria[artigo.categoria.slug] || 'badge-ensaios';

  const classeTamanhoFonte =
    tamanhoFonte === 'sm'
      ? 'font-size-sm'
      : tamanhoFonte === 'lg'
      ? 'font-size-lg'
      : 'font-size-md';

  return (
    <article
      className={`min-h-screen transition-colors duration-200 ${
        tema === 'escuro'
          ? 'article-reading-theme-dark theme-dark bg-[#09090B] text-[#FBFBF9]'
          : 'theme-paper bg-[var(--color-paper-bg)] text-[var(--color-ink-primary)]'
      }`}
    >
      {/* Barra de Progresso Carmim no Topo Medindo Estritamente o Artigo */}
      <ReadingProgressBar targetId="artigo-conteudo-leitura" />

      {/* Aviso Flutuante se o leitor clicar em Quote sem selecionar texto */}
      {avisoSelecao && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-neutral-900 text-white border border-[var(--color-brand-accent)] shadow-2xl text-xs sm:text-sm font-medium animate-fadeIn flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)] shrink-0" />
          <span>{avisoSelecao}</span>
        </div>
      )}

      {/* Controles Flutuantes de Leitura */}
      <ReadingToolbar
        tema={tema}
        onAlternarTema={setTema}
        tamanhoFonte={tamanhoFonte}
        onAlternarFonte={setTamanhoFonte}
        onAbrirQuoteCard={handleAbrirQuoteModal}
        onAbrirStoryCard={() => setStoryModalAberto(true)}
        artigoTitulo={artigo.titulo}
        artigoSubtitulo={artigo.subtitulo_lead}
        artigoSlug={artigo.slug}
        autorNome={artigo.autor.nome}
      />

      {/* Modal de Citação (Quote Card com Imagem do Artigo + Máscara Escura) */}
      <QuoteCardModal
        isOpen={quoteModalAberto}
        onClose={() => setQuoteModalAberto(false)}
        artigoTitulo={artigo.titulo}
        artigoSlug={artigo.slug}
        imagemCapaUrl={artigo.imagem_capa_url}
        autorNome={artigo.autor.nome}
        colunaNome={artigo.coluna.nome}
        selectedQuote={textoCitacao}
      />

      {/* Modal de Cartão Visual para Instagram Stories (9:16) */}
      <InstagramStoryModal
        isOpen={storyModalAberto}
        onClose={() => setStoryModalAberto(false)}
        artigoTitulo={artigo.titulo}
        artigoSubtitulo={artigo.subtitulo_lead}
        artigoSlug={artigo.slug}
        imagemCapaUrl={artigo.imagem_capa_url}
        autorNome={artigo.autor.nome}
        colunaNome={artigo.coluna.nome}
      />

      {/* Container Principal de Leitura */}
      <div className="article-reading-container">
        {/* Bloco Canônico do Conteúdo do Artigo (Mede o Progresso Exato até o Fim do Texto) */}
        <div id="artigo-conteudo-leitura">
          {/* Cabeçalho Editorial */}
          <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href={`/editoria/${artigo.categoria.slug}`}
              className={`badge-category ${badgeClass}`}
            >
              {artigo.categoria.nome}
            </Link>

            <span className="text-xs text-[var(--color-ink-muted)]">•</span>

            <Link
              href={`/coluna-arquivo/${artigo.coluna.slug}`}
              className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand-accent)] hover:underline"
            >
              {artigo.coluna.nome}
            </Link>
          </div>

          <h1 className="title-article mb-4">
            {artigo.titulo}
          </h1>

          <p className="text-lead mb-6">
            {artigo.subtitulo_lead}
          </p>

          {/* Assinatura de topo e metadados */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-muted)]">
            <div className="flex items-center gap-3">
              <Link href={`/autor/${artigo.autor.slug}`} className="shrink-0 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border-subtle)] group-hover:border-[var(--color-brand-accent)] transition-colors">
                  {artigo.autor.avatar_url ? (
                    <Image
                      src={artigo.autor.avatar_url}
                      alt={artigo.autor.nome}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold">
                      {artigo.autor.nome[0]}
                    </div>
                  )}
                </div>
              </Link>
              <div>
                <Link
                  href={`/autor/${artigo.autor.slug}`}
                  className="font-semibold text-sm text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] transition-colors block"
                >
                  {artigo.autor.nome}
                </Link>
                {artigo.publicado_em && (
                  <time dateTime={artigo.publicado_em}>
                    {new Date(artigo.publicado_em).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span>{artigo.tempo_leitura_min} min de leitura</span>
            </div>
          </div>
        </header>

        {/* Imagem de Capa com Legenda e Créditos */}
        {artigo.imagem_capa_url && (
          <figure className="mb-10 -mx-4 sm:mx-0">
            <div className="relative aspect-[16/9] w-full rounded-none sm:rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <EditorialImage
                src={artigo.imagem_capa_url}
                alt={artigo.legenda_capa || artigo.titulo}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 850px"
              />
            </div>
            {(artigo.legenda_capa || artigo.creditos_capa) && (
              <figcaption className="text-caption mt-2.5 px-2 text-center">
                {artigo.legenda_capa}{' '}
                {artigo.creditos_capa && (
                  <span className="opacity-75">({artigo.creditos_capa})</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Corpo do Artigo em Tipografia de Leitura */}
        <div className={`text-body-reading ${classeTamanhoFonte}`}>
          <MarkdownContent content={artigo.conteudo} />
        </div>

        {/* Tags do Artigo */}
        {artigo.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink-muted)] mr-2">
              Tags:
            </span>
            {artigo.tags.map((tag) => (
              <span key={tag.id} className="badge-tag">
                #{tag.nome}
              </span>
            ))}
          </div>
        )}

          {/* Assinatura do Autor */}
          <AuthorSignature
            autor={autorPerfil || artigo.autor}
            coluna={artigo.coluna}
          />
        </div>

        {/* Seção de Comentários Públicos */}
        <PublicCommentsSection
          artigoId={artigo.id}
          comentariosIniciais={comentariosIniciais}
        />
      </div>
    </article>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import type { ArtigoCompleto, ArtigoComentarioPublico } from '@/types/artigo.types';
import type { Perfil } from '@/types/autor.types';
import { useAuth } from '@/contexts/AuthContext';
import { EditorialImage } from '@/components/editorial/EditorialImage';
import { getArtigoById } from '@/services/artigosService';
import { subscribeToTableChanges, MOCK_DB_TABLES } from '@/services/mockRepository';
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
  const { perfil, isAdmin } = useAuth();
  const [artigoAtual, setArtigoAtual] = useState<ArtigoCompleto>(artigo);

  useEffect(() => {
    getArtigoById(artigo.id).then((att) => {
      if (att) setArtigoAtual(att);
    });

    const unsubscribe = subscribeToTableChanges(MOCK_DB_TABLES.ARTIGOS, () => {
      getArtigoById(artigo.id).then((att) => {
        if (att) setArtigoAtual(att);
      });
    });

    return unsubscribe;
  }, [artigo.id]);

  const art = artigoAtual;
  const podeEditar = Boolean(perfil && (perfil.id === art.autor.id || isAdmin));
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
    badgeClassPorCategoria[art.categoria.slug] || 'badge-ensaios';

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
        artigoTitulo={art.titulo}
        artigoSubtitulo={art.subtitulo_lead}
        artigoSlug={art.slug}
        autorNome={art.autor.nome}
      />

      {/* Modal de Citação (Quote Card com Imagem do Artigo + Máscara Escura) */}
      <QuoteCardModal
        isOpen={quoteModalAberto}
        onClose={() => setQuoteModalAberto(false)}
        artigoTitulo={art.titulo}
        artigoSlug={art.slug}
        imagemCapaUrl={art.imagem_capa_url}
        autorNome={art.autor.nome}
        colunaNome={art.coluna.nome}
        selectedQuote={textoCitacao}
      />

      {/* Modal de Cartão Visual para Instagram Stories (9:16) */}
      <InstagramStoryModal
        isOpen={storyModalAberto}
        onClose={() => setStoryModalAberto(false)}
        artigoTitulo={art.titulo}
        artigoSubtitulo={art.subtitulo_lead}
        artigoSlug={art.slug}
        imagemCapaUrl={art.imagem_capa_url}
        autorNome={art.autor.nome}
        colunaNome={art.coluna.nome}
      />

      {/* Container Principal de Leitura */}
      <div className="article-reading-container">
        {/* Bloco Canônico do Conteúdo do Artigo (Mede o Progresso Exato até o Fim do Texto) */}
        <div id="artigo-conteudo-leitura">
          {/* Cabeçalho Editorial */}
          <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href={`/editoria/${art.categoria.slug}`}
              className={`badge-category ${badgeClass}`}
            >
              {art.categoria.nome}
            </Link>

            <span className="text-xs text-[var(--color-ink-muted)]">•</span>

            <Link
              href={`/coluna-arquivo/${art.coluna.slug}`}
              className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand-accent)] hover:underline"
            >
              {art.coluna.nome}
            </Link>
          </div>

          <h1 className="title-article mb-4">
            {art.titulo}
          </h1>

          <p className="text-lead mb-6">
            {art.subtitulo_lead}
          </p>

          {/* Assinatura de topo e metadados */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-muted)]">
            <div className="flex items-center gap-3">
              <Link href={`/autor/${art.autor.slug}`} className="shrink-0 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border-subtle)] group-hover:border-[var(--color-brand-accent)] transition-colors">
                  {art.autor.avatar_url ? (
                    <Image
                      src={art.autor.avatar_url}
                      alt={art.autor.nome}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold">
                      {art.autor.nome[0]}
                    </div>
                  )}
                </div>
              </Link>
              <div>
                <Link
                  href={`/autor/${art.autor.slug}`}
                  className="font-semibold text-sm text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] transition-colors block"
                >
                  {art.autor.nome}
                </Link>
                {art.publicado_em && (
                  <time dateTime={art.publicado_em}>
                    {new Date(art.publicado_em).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span>{art.tempo_leitura_min} min de leitura</span>

              {podeEditar && (
                <Link
                  href={`/painel/editor/${art.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors"
                  title="Editar este artigo no painel"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Editar Artigo</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Imagem de Capa com Legenda e Créditos */}
        {art.imagem_capa_url && (
          <figure className="mb-10 -mx-4 sm:mx-0">
            <div className="relative aspect-[16/9] w-full rounded-none sm:rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <EditorialImage
                src={art.imagem_capa_url}
                alt={art.legenda_capa || art.titulo}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 850px"
              />
            </div>
            {(art.legenda_capa || art.creditos_capa) && (
              <figcaption className="text-caption mt-2.5 px-2 text-center">
                {art.legenda_capa}{' '}
                {art.creditos_capa && (
                  <span className="opacity-75">({art.creditos_capa})</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Corpo do Artigo em Tipografia de Leitura */}
        <div className={`text-body-reading ${classeTamanhoFonte}`}>
          <MarkdownContent content={art.conteudo} />
        </div>

        {/* Tags do Artigo */}
        {art.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink-muted)] mr-2">
              Tags:
            </span>
            {art.tags.map((tag) => (
              <span key={tag.id} className="badge-tag">
                #{tag.nome}
              </span>
            ))}
          </div>
        )}

          {/* Assinatura do Autor */}
          <AuthorSignature
            autor={autorPerfil || art.autor}
            coluna={art.coluna}
          />
        </div>

        {/* Seção de Comentários Públicos */}
        <PublicCommentsSection
          artigoId={art.id}
          comentariosIniciais={comentariosIniciais}
        />
      </div>
    </article>
  );
}

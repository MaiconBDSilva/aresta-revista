'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Moon,
  Quote as QuoteIcon,
  Share2,
  Check,
  ZoomIn,
  ZoomOut,
  Copy,
  MessageCircle,
  X as CloseIcon,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export type TemaLeitura = 'claro' | 'escuro';
export type TamanhoFonte = 'sm' | 'md' | 'lg';

interface ReadingToolbarProps {
  tema: TemaLeitura;
  onAlternarTema: (novoTema: TemaLeitura) => void;
  tamanhoFonte: TamanhoFonte;
  onAlternarFonte: (novoTamanho: TamanhoFonte) => void;
  onAbrirQuoteCard: () => void;
  onAbrirStoryCard: () => void;
  artigoTitulo: string;
  artigoSubtitulo: string;
  artigoSlug: string;
  autorNome: string;
}

export function ReadingToolbar({
  tema,
  onAlternarTema,
  tamanhoFonte,
  onAlternarFonte,
  onAbrirQuoteCard,
  onAbrirStoryCard,
  artigoTitulo,
  artigoSubtitulo,
  artigoSlug,
  autorNome,
}: ReadingToolbarProps) {
  const [bandejaAberta, setBandejaAberta] = useState(false);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const bandejaRef = useRef<HTMLDivElement>(null);

  const urlArtigo = `https://arestarevista.com/coluna/${artigoSlug}`;

  // Fecha a bandeja ao clicar fora
  useEffect(() => {
    const handleClickFora = (e: MouseEvent) => {
      if (bandejaRef.current && !bandejaRef.current.contains(e.target as Node)) {
        setBandejaAberta(false);
      }
    };
    if (bandejaAberta) {
      document.addEventListener('mousedown', handleClickFora);
    }
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, [bandejaAberta]);

  const handleDiminuirFonte = () => {
    if (tamanhoFonte === 'lg') onAlternarFonte('md');
    else if (tamanhoFonte === 'md') onAlternarFonte('sm');
  };

  const handleAumentarFonte = () => {
    if (tamanhoFonte === 'sm') onAlternarFonte('md');
    else if (tamanhoFonte === 'md') onAlternarFonte('lg');
  };

  // Mapeamento para P, M, G em Português (Decisão 2)
  const rotuloTamanhoFonte =
    tamanhoFonte === 'sm' ? 'P' : tamanhoFonte === 'lg' ? 'G' : 'M';

  // Compartilhamento no X (Twitter)
  const handleCompartilharX = () => {
    const texto = `“${artigoTitulo}” — ${autorNome}\n\nLeia o ensaio completo na @aresta_revista:`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(urlArtigo)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setBandejaAberta(false);
  };

  // Compartilhamento no WhatsApp
  const handleCompartilharWhatsApp = () => {
    const texto = `*${artigoTitulo}*\n_${artigoSubtitulo}_\n\nPor ${autorNome} na aresta.\n${urlArtigo}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setBandejaAberta(false);
  };

  // Compartilhamento no Instagram (Abre o Cartão Visual 9:16 de Stories)
  const handleCompartilharInstagram = () => {
    setBandejaAberta(false);
    onAbrirStoryCard();
  };

  // Copiar apenas o link do artigo
  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(urlArtigo);
      setLinkCopiado(true);
      setTimeout(() => {
        setLinkCopiado(false);
        setBandejaAberta(false);
      }, 1500);
    } catch {
      // Fallback
    }
  };

  return (
    <aside
      ref={bandejaRef}
      aria-label="Controles de Leitura"
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Bandeja de Compartilhamento Suspensa para Cima (Decisão 4) */}
      {bandejaAberta && (
        <div
          role="menu"
          aria-label="Opções de Compartilhamento"
          className="absolute bottom-full mb-3 right-0 w-64 rounded-2xl shadow-2xl p-3 border transition-all animate-fadeIn"
          style={{
            backgroundColor:
              tema === 'escuro' ? '#18181B' : '#FFFFFF',
            borderColor:
              tema === 'escuro'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.12)',
            color: tema === 'escuro' ? '#F4F4F5' : '#18181B',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-70">
              Compartilhar Ensaio
            </span>
            <button
              onClick={() => setBandejaAberta(false)}
              aria-label="Fechar opções"
              className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-colors"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {/* Opção X (Twitter) */}
            <button
              onClick={handleCompartilharX}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left"
            >
              <span className="w-6 h-6 rounded-md bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs">
                𝕏
              </span>
              <span>Postar no X (Twitter)</span>
            </button>

            {/* Opção WhatsApp */}
            <button
              onClick={handleCompartilharWhatsApp}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left text-emerald-600 dark:text-emerald-400"
            >
              <span className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              <span>Enviar no WhatsApp</span>
            </button>

            {/* Opção Instagram Stories */}
            <button
              onClick={handleCompartilharInstagram}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left text-pink-600 dark:text-pink-400"
            >
              <span className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                <InstagramIcon className="w-3.5 h-3.5" />
              </span>
              <span>Stories do Instagram</span>
            </button>

            {/* Opção Copiar Link */}
            <button
              onClick={handleCopiarLink}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left"
            >
              <span className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800 text-[var(--color-ink-primary)] flex items-center justify-center">
                {linkCopiado ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
              <span>{linkCopiado ? 'Link Copiado!' : 'Copiar Link do Artigo'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Barra de Ferramentas Pílula */}
      <div
        className="flex items-center gap-1.5 p-1.5 rounded-full shadow-xl transition-all"
        style={{
          backgroundColor:
            tema === 'escuro'
              ? 'rgba(24, 24, 27, 0.88)'
              : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border:
            tema === 'escuro'
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(0, 0, 0, 0.12)',
          color: tema === 'escuro' ? '#F4F4F5' : '#18181B',
        }}
      >
        {/* Diminuir Fonte */}
        <button
          onClick={handleDiminuirFonte}
          disabled={tamanhoFonte === 'sm'}
          aria-label="Diminuir tamanho da fonte"
          title="Fonte menor [A-]"
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors flex items-center justify-center"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Indicador de Tamanho em Português: P, M, G (Decisão 2) */}
        <span
          className="text-xs font-bold w-4 text-center select-none"
          title={`Tamanho: ${
            tamanhoFonte === 'sm' ? 'Pequeno' : tamanhoFonte === 'lg' ? 'Grande' : 'Médio'
          }`}
        >
          {rotuloTamanhoFonte}
        </span>

        {/* Aumentar Fonte */}
        <button
          onClick={handleAumentarFonte}
          disabled={tamanhoFonte === 'lg'}
          aria-label="Aumentar tamanho da fonte"
          title="Fonte maior [A+]"
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors flex items-center justify-center"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <span className="h-4 w-[1px] bg-black/15 dark:bg-white/20 mx-0.5" />

        {/* Alternar Tema: Claro / Escuro (Decisão 1) */}
        <button
          onClick={() => onAlternarTema(tema === 'claro' ? 'escuro' : 'claro')}
          aria-label={`Mudar para tema ${tema === 'claro' ? 'escuro' : 'claro'}`}
          title={`Tema ${tema === 'claro' ? 'Escuro' : 'Claro'}`}
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          {tema === 'claro' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-amber-300" />
          )}
        </button>

        <span className="h-4 w-[1px] bg-black/15 dark:bg-white/20 mx-0.5" />

        {/* Botão Quote Card */}
        <button
          onClick={onAbrirQuoteCard}
          aria-label="Criar Cartão de Citação do trecho selecionado"
          title="Criar Cartão de Citação com a imagem do artigo"
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
          style={{ color: 'var(--color-brand-accent)' }}
        >
          <QuoteIcon className="w-4 h-4 fill-current" />
        </button>

        {/* Botão de Compartilhamento (Abre a Bandeja para Cima) */}
        <button
          onClick={() => setBandejaAberta(!bandejaAberta)}
          aria-label="Opções de compartilhamento"
          aria-expanded={bandejaAberta}
          title="Compartilhar Ensaio"
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            bandejaAberta
              ? 'bg-[var(--color-brand-accent)] text-white'
              : 'hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

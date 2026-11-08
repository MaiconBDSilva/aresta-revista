'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';
import type { ArtigoCompleto } from '@/types/artigo.types';
import { setArtigoHero, setArtigoDestaqueSecao } from '@/services/artigosService';

interface AdminTabDestaquesCapaProps {
  artigosPublicados: ArtigoCompleto[];
  onArtigosAtualizados: () => void;
}

export function AdminTabDestaquesCapa({
  artigosPublicados,
  onArtigosAtualizados,
}: AdminTabDestaquesCapaProps) {
  const [modalHeroAberto, setModalHeroAberto] = useState(false);
  const [modalSecaoAberto, setModalSecaoAberto] = useState(false);
  const [categoriaAlvoSecao, setCategoriaAlvoSecao] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  const heroAtual = artigosPublicados.find((a) => a.eh_destaque_hero) || artigosPublicados[0];
  const destaquesSecao = artigosPublicados.filter((a) => a.eh_destaque_secao && !a.eh_destaque_hero);

  const handleDefinirHero = async (artigoId: string) => {
    await setArtigoHero(artigoId);
    setModalHeroAberto(false);
    onArtigosAtualizados();
    setMensagemSucesso('Manchete Principal da Capa atualizada com sucesso!');
    setTimeout(() => setMensagemSucesso(null), 3500);
  };

  const handleToggleSecao = async (artigoId: string, novoValor: boolean) => {
    await setArtigoDestaqueSecao(artigoId, novoValor);
    setModalSecaoAberto(false);
    onArtigosAtualizados();
    setMensagemSucesso('Destaques de seção atualizados com sucesso!');
    setTimeout(() => setMensagemSucesso(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Feedback Toast */}
      {mensagemSucesso && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-medium flex items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{mensagemSucesso}</span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 font-bold underline hover:opacity-80"
          >
            <span>Ver Capa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Seção 1: Manchete Principal (Hero Article) */}
      <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)]" />
              <span className="section-kicker">Posição de Máximo Destaque</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[var(--color-ink-primary)]">
              Manchete Principal da Home (Hero)
            </h2>
            <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
              O artigo que abre a capa editorial em tamanho grande, com chamada de alto impacto.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalHeroAberto(true)}
            className="btn-accent text-xs py-2 px-3.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trocar Manchete Principal</span>
          </button>
        </div>

        {heroAtual ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {heroAtual.imagem_capa_url && (
              <div className="md:col-span-5 relative aspect-16/10 rounded-xl overflow-hidden border border-[var(--color-border-subtle)] bg-neutral-100">
                <Image
                  src={heroAtual.imagem_capa_url}
                  alt={heroAtual.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-[var(--color-brand-accent)] text-white shadow-xs">
                  Hero Ativo
                </span>
              </div>
            )}

            <div className={heroAtual.imagem_capa_url ? 'md:col-span-7' : 'md:col-span-12'}>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="badge-category font-bold uppercase tracking-wider text-[10px]">
                  {heroAtual.categoria.nome}
                </span>
                <span className="text-[var(--color-ink-muted)]">•</span>
                <span className="font-semibold text-[var(--color-brand-accent)]">
                  {heroAtual.coluna.nome}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--color-ink-primary)] leading-snug mb-2">
                {heroAtual.titulo}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] line-clamp-2 mb-4 font-serif">
                {heroAtual.subtitulo_lead}
              </p>

              <div className="flex items-center gap-4 text-xs text-[var(--color-ink-muted)]">
                <span>Por <strong>{heroAtual.autor.nome}</strong></span>
                <span>•</span>
                <span>{heroAtual.tempo_leitura_min} min de leitura</span>
                <Link
                  href={`/coluna/${heroAtual.slug}`}
                  target="_blank"
                  className="ml-auto inline-flex items-center gap-1 text-[var(--color-brand-accent)] font-semibold hover:underline"
                >
                  <span>Prévia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[var(--color-ink-muted)]">Nenhum artigo publicado no momento.</p>
        )}
      </div>

      {/* Seção 2: Destaques Secundários / Seções */}
      <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="section-kicker">Apoios & Mosaicos</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[var(--color-ink-primary)]">
              Destaques Secundários da Grade
            </h2>
            <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
              Artigos configurados como apoios diretos ao lado da manchete ou em destaque nas editorias.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setCategoriaAlvoSecao(null);
              setModalSecaoAberto(true);
            }}
            className="btn-outline text-xs py-2 px-3.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Gerenciar Apoios Secundários</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destaquesSecao.map((artigo) => (
            <div
              key={artigo.id}
              className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-neutral-50/50 dark:bg-neutral-800/30 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-brand-accent)] block mb-1">
                  {artigo.categoria.nome} • {artigo.coluna.nome}
                </span>
                <Link
                  href={`/coluna/${artigo.slug}`}
                  target="_blank"
                  className="font-serif font-bold text-sm text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] line-clamp-2 transition-colors"
                >
                  {artigo.titulo}
                </Link>
                <p className="text-[11px] text-[var(--color-ink-muted)] mt-1">
                  {artigo.autor.nome}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleSecao(artigo.id, false)}
                className="shrink-0 p-1.5 rounded-md text-[var(--color-ink-muted)] hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                title="Remover dos destaques secundários"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {destaquesSecao.length === 0 && (
            <p className="col-span-2 text-xs text-[var(--color-ink-muted)] py-4 text-center">
              Nenhum apoio secundário ativo. Clique acima para selecionar.
            </p>
          )}
        </div>
      </div>

      {/* Modal Selecionar Nova Manchete Principal */}
      {modalHeroAberto && (
        <div
          className="modal-backdrop z-50 p-4"
          onClick={() => setModalHeroAberto(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-container max-w-2xl w-full p-6 animate-fadeIn max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)] shrink-0">
              <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
                Escolher Artigo para a Manchete Principal (Hero)
              </h3>
              <button
                type="button"
                onClick={() => setModalHeroAberto(false)}
                className="p-1.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--color-ink-muted)] my-3 shrink-0">
              Selecione qualquer ensaio publicado para assumir a posição de topo da Aresta Revista:
            </p>

            <div className="overflow-y-auto divide-y divide-[var(--color-border-subtle)] flex-1 pr-1">
              {artigosPublicados.map((art) => {
                const ehOAtual = art.id === heroAtual?.id;
                return (
                  <div
                    key={art.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 px-2 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-brand-accent)]">
                        {art.categoria.nome} • {art.coluna.nome}
                      </span>
                      <h4 className="font-serif font-semibold text-sm text-[var(--color-ink-primary)] line-clamp-1">
                        {art.titulo}
                      </h4>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        Por {art.autor.nome}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={ehOAtual}
                      onClick={() => handleDefinirHero(art.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                        ehOAtual
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 cursor-default'
                          : 'btn-accent'
                      }`}
                    >
                      {ehOAtual ? '✓ Manchete Atual' : 'Definir como Hero'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal Gerenciar Apoios Secundários */}
      {modalSecaoAberto && (
        <div
          className="modal-backdrop z-50 p-4"
          onClick={() => setModalSecaoAberto(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-container max-w-2xl w-full p-6 animate-fadeIn max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)] shrink-0">
              <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
                Gerenciar Destaques Secundários da Grade
              </h3>
              <button
                type="button"
                onClick={() => setModalSecaoAberto(false)}
                className="p-1.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--color-ink-muted)] my-3 shrink-0">
              Ative ou desative quais ensaios devem acompanhar a manchete nos blocos secundários:
            </p>

            <div className="overflow-y-auto divide-y divide-[var(--color-border-subtle)] flex-1 pr-1">
              {artigosPublicados
                .filter((a) => !a.eh_destaque_hero)
                .map((art) => {
                  const estaAtivo = art.eh_destaque_secao;
                  return (
                    <div
                      key={art.id}
                      className="py-3 flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 px-2 rounded-lg transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-brand-accent)]">
                          {art.categoria.nome} • {art.coluna.nome}
                        </span>
                        <h4 className="font-serif font-semibold text-sm text-[var(--color-ink-primary)] line-clamp-1">
                          {art.titulo}
                        </h4>
                        <p className="text-xs text-[var(--color-ink-muted)]">
                          Por {art.autor.nome}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSecao(art.id, !estaAtivo)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                          estaAtivo
                            ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-300'
                            : 'btn-outline'
                        }`}
                      >
                        {estaAtivo ? '✓ Destaque Ativo (Remover)' : '+ Tornar Destaque'}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


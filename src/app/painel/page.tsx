'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  getMeusArtigosPublicados,
  getArtigosEmProducao,
  getArtigosRedacaoGeral,
  publicarArtigo,
} from '@/services/artigosService';
import { contarTotalComentarios, contarComentariosPendentes } from '@/services/revisaoService';
import type { ArtigoCompleto } from '@/types/artigo.types';
import { EditorialImage } from '@/components/editorial/EditorialImage';
import { EditorialReviewSidebar } from '@/components/editor/EditorialReviewSidebar';
import {
  Plus,
  PenSquare,
  Eye,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle,
  FileText,
  Users,
  Send,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';

type AbaAtiva = 'publicados' | 'em_producao' | 'redacao_geral';

export default function PainelColunistaPage() {
  const { perfil, isAutenticado, isAutor, isAdmin } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('em_producao');

  const [publicados, setPublicados] = useState<ArtigoCompleto[]>([]);
  const [emProducao, setEmProducao] = useState<ArtigoCompleto[]>([]);
  const [redacaoGeral, setRedacaoGeral] = useState<ArtigoCompleto[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Modal de visualização dos comentários na aba "Em Produção"
  const [artigoComentariosAberto, setArtigoComentariosAberto] = useState<ArtigoCompleto | null>(null);

  // Mapa de contadores de comentários por artigo id
  const [contadoresComentarios, setContadoresComentarios] = useState<Record<string, { total: number; pendentes: number }>>({});

  const carregarDados = useCallback(async () => {
    if (!perfil) {
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      const [pub, prod, red] = await Promise.all([
        getMeusArtigosPublicados(perfil.id),
        getArtigosEmProducao(perfil.id),
        getArtigosRedacaoGeral(perfil.id),
      ]);

      setPublicados(pub);
      setEmProducao(prod);
      setRedacaoGeral(red);

      // Carrega contagens de comentários para os artigos em produção
      const contadores: Record<string, { total: number; pendentes: number }> = {};
      for (const a of [...prod, ...red]) {
        const [total, pendentes] = await Promise.all([
          contarTotalComentarios(a.id),
          contarComentariosPendentes(a.id),
        ]);
        contadores[a.id] = { total, pendentes };
      }
      setContadoresComentarios(contadores);
    } catch {
      toast.error('Erro ao carregar dados do painel.');
    } finally {
      setCarregando(false);
    }
  }, [perfil]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handlePublicarDireto = async (artigo: ArtigoCompleto) => {
    if (!perfil) return;
    const confirmou = window.confirm(
      `Deseja publicar imediatamente o ensaio "${artigo.titulo}"? Ele ficará visível publicamente no portal.`
    );
    if (!confirmou) return;

    try {
      await publicarArtigo(artigo.id, perfil.id);
      toast.success('Artigo publicado com sucesso no portal!');
      await carregarDados();
      setAbaAtiva('publicados');
    } catch (err) {
      toast.error('Não foi possível publicar o artigo.', {
        description: err instanceof Error ? err.message : undefined,
      });
    }
  };

  // Se não for autor ou admin
  if (!isAutenticado || (!isAutor && !isAdmin)) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="title-section mb-2 text-2xl font-serif">Acesso Restrito ao Painel Editorial</h1>
        <p className="mx-auto max-w-md font-sans text-sm text-ink-secondary mb-6 leading-relaxed">
          O Painel do Colunista é exclusivo para autores titulares e editores da Aresta Revista.
          Utilize o seletor flutuante de perfis no canto inferior direito para navegar como um dos
          nossos 5 colunistas.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Cabeçalho do Painel */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border-subtle pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="section-kicker">Redação &amp; Autoria</span>
            <span className="font-mono text-xs text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full font-bold">
              {perfil?.papel === 'autor' ? 'Colunista Titular' : 'Mesa Editorial'}
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink-primary tracking-tight">
            Painel de {perfil?.nome}
          </h1>
          <p className="font-sans text-sm text-ink-secondary mt-1">
            Gerencie sua produção textual, publique de forma autônoma e revise ensaios dos colegas.
          </p>
        </div>

        <Link
          href="/painel/editor/novo"
          className="btn-accent inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 shadow-md hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Ensaio</span>
        </Link>
      </div>

      {/* 3 Abas Renomeadas: Publicados, Em Produção, Redação Geral */}
      <div className="mb-6 flex border-b border-border-subtle overflow-x-auto">
        <button
          onClick={() => setAbaAtiva('em_producao')}
          className={`flex items-center gap-2 px-5 py-3 font-sans text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            abaAtiva === 'em_producao'
              ? 'border-brand-accent text-brand-accent'
              : 'border-transparent text-ink-muted hover:text-ink-primary'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Em Produção</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              abaAtiva === 'em_producao'
                ? 'bg-brand-accent text-white font-bold'
                : 'bg-neutral-200 dark:bg-neutral-800 text-ink-secondary'
            }`}
          >
            {emProducao.length}
          </span>
        </button>

        <button
          onClick={() => setAbaAtiva('publicados')}
          className={`flex items-center gap-2 px-5 py-3 font-sans text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            abaAtiva === 'publicados'
              ? 'border-brand-accent text-brand-accent'
              : 'border-transparent text-ink-muted hover:text-ink-primary'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Publicados</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              abaAtiva === 'publicados'
                ? 'bg-brand-accent text-white font-bold'
                : 'bg-neutral-200 dark:bg-neutral-800 text-ink-secondary'
            }`}
          >
            {publicados.length}
          </span>
        </button>

        <button
          onClick={() => setAbaAtiva('redacao_geral')}
          className={`flex items-center gap-2 px-5 py-3 font-sans text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            abaAtiva === 'redacao_geral'
              ? 'border-brand-accent text-brand-accent'
              : 'border-transparent text-ink-muted hover:text-ink-primary'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Redação Geral</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              abaAtiva === 'redacao_geral'
                ? 'bg-brand-accent text-white font-bold'
                : 'bg-neutral-200 dark:bg-neutral-800 text-ink-secondary'
            }`}
          >
            {redacaoGeral.length}
          </span>
        </button>
      </div>

      {/* Conteúdo das Abas */}
      {carregando ? (
        <div className="py-20 text-center text-ink-muted">
          <Clock className="w-8 h-8 mx-auto mb-2 animate-spin text-brand-accent" />
          <p className="font-serif">Carregando acervo editorial...</p>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* ABA 1: EM PRODUÇÃO (MEUS TEXTOS EM EDIÇÃO) */}
          {/* ========================================================================= */}
          {abaAtiva === 'em_producao' && (
            <div className="space-y-4">
              {emProducao.length === 0 ? (
                <div className="card-article text-center py-16 px-4">
                  <Sparkles className="w-10 h-10 text-brand-accent mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-xl font-bold text-ink-primary mb-1">
                    Nenhum ensaio em produção no momento
                  </h3>
                  <p className="font-sans text-sm text-ink-muted max-w-md mx-auto mb-6">
                    Você não possui rascunhos em aberto. Inicie uma nova redação para sua coluna.
                  </p>
                  <Link href="/painel/editor/novo" className="btn-accent inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Iniciar Novo Ensaio</span>
                  </Link>
                </div>
              ) : (
                emProducao.map((artigo) => {
                  const contagem = contadoresComentarios[artigo.id] || { total: 0, pendentes: 0 };
                  return (
                    <article
                      key={artigo.id}
                      className="card-article p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-brand-accent/40 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden border border-border-subtle bg-neutral-100 dark:bg-neutral-800 hidden sm:block">
                          <EditorialImage
                            src={artigo.imagem_capa_url}
                            alt={artigo.titulo}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`badge-category badge-${artigo.categoria.slug}`}>
                              {artigo.categoria.nome}
                            </span>
                            <span className="badge-status badge-status-edicao">Em Edição</span>
                            <span className="text-xs font-mono text-ink-muted flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {artigo.tempo_leitura_min} min de leitura
                            </span>
                          </div>

                          <h2 className="font-serif text-lg font-bold text-ink-primary leading-snug">
                            <Link
                              href={`/painel/editor/${artigo.id}`}
                              className="hover:text-brand-accent transition-colors"
                            >
                              {artigo.titulo}
                            </Link>
                          </h2>
                          <p className="font-sans text-xs text-ink-secondary line-clamp-1">
                            {artigo.subtitulo_lead}
                          </p>
                        </div>
                      </div>

                      {/* Ações da Aba Em Produção */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-border-subtle">
                        {/* Botão de Comentários da Redação */}
                        <button
                          type="button"
                          onClick={() => setArtigoComentariosAberto(artigo)}
                          className={`btn-outline text-xs px-3 py-2 flex items-center gap-1.5 ${
                            contagem.pendentes > 0 ? 'border-amber-500 text-amber-600 bg-amber-500/5' : ''
                          }`}
                          title="Visualizar sugestões deixadas pelos outros autores"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Comentários ({contagem.total})</span>
                          {contagem.pendentes > 0 && (
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                          )}
                        </button>

                        {/* Botão Editar Artigo */}
                        <Link
                          href={`/painel/editor/${artigo.id}`}
                          className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
                        >
                          <PenSquare className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </Link>

                        {/* Botão Carmim Publicar Agora */}
                        <button
                          type="button"
                          onClick={() => handlePublicarDireto(artigo)}
                          className="btn-accent text-xs px-3.5 py-2 flex items-center gap-1.5 font-semibold shadow"
                          title="Publicar imediatamente este artigo no site público"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Publicar Agora</span>
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: PUBLICADOS */}
          {/* ========================================================================= */}
          {abaAtiva === 'publicados' && (
            <div className="space-y-4">
              {publicados.length === 0 ? (
                <div className="card-article text-center py-16 px-4">
                  <CheckCircle className="w-10 h-10 text-ink-muted mx-auto mb-3 opacity-50" />
                  <h3 className="font-serif text-xl font-bold text-ink-primary mb-1">
                    Nenhum artigo publicado ainda
                  </h3>
                  <p className="font-sans text-sm text-ink-muted max-w-md mx-auto">
                    Assim que você publicar um ensaio da aba &ldquo;Em Produção&rdquo;, ele aparecerá
                    aqui com métricas de leitura e links públicos.
                  </p>
                </div>
              ) : (
                publicados.map((artigo) => (
                  <article
                    key={artigo.id}
                    className="card-article p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden border border-border-subtle bg-neutral-100 dark:bg-neutral-800 hidden sm:block">
                        <EditorialImage
                          src={artigo.imagem_capa_url}
                          alt={artigo.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`badge-category badge-${artigo.categoria.slug}`}>
                            {artigo.categoria.nome}
                          </span>
                          <span className="badge-status badge-status-publicado">No Ar</span>
                          {artigo.publicado_em && (
                            <span className="text-xs font-mono text-ink-muted">
                              Publicado em{' '}
                              {new Date(artigo.publicado_em).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                        </div>

                        <h2 className="font-serif text-lg font-bold text-ink-primary leading-snug">
                          <Link
                            href={`/coluna/${artigo.slug}`}
                            className="hover:text-brand-accent transition-colors"
                          >
                            {artigo.titulo}
                          </Link>
                        </h2>
                        <p className="font-sans text-xs text-ink-secondary line-clamp-1">
                          {artigo.subtitulo_lead}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-border-subtle">
                      <Link
                        href={`/coluna/${artigo.slug}`}
                        target="_blank"
                        className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
                        title="Ver artigo como leitor público"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver no Ar</span>
                      </Link>

                      <Link
                        href={`/painel/editor/${artigo.id}`}
                        className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
                        title="Editar artigo publicado para correções"
                      >
                        <PenSquare className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 3: REDAÇÃO GERAL (TEXTOS EM EDIÇÃO DOS COLEGAS) */}
          {/* ========================================================================= */}
          {abaAtiva === 'redacao_geral' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/60 border border-border-subtle flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="text-xs font-sans text-ink-secondary leading-relaxed">
                  <strong>Revisão Colaborativa:</strong> Estes são os textos atualmente em fase de
                  escrita pelos demais colunistas da revista. Você pode ler a prévia e deixar
                  sugestões construtivas. Lembre-se: apenas o autor titular pode alterar o texto e
                  publicá-lo.
                </div>
              </div>

              {redacaoGeral.length === 0 ? (
                <div className="card-article text-center py-16 px-4">
                  <FileText className="w-10 h-10 text-ink-muted mx-auto mb-3 opacity-50" />
                  <h3 className="font-serif text-xl font-bold text-ink-primary mb-1">
                    Nenhum outro texto em edição na redação
                  </h3>
                  <p className="font-sans text-sm text-ink-muted max-w-md mx-auto">
                    No momento, todos os demais textos da equipe já foram publicados ou estão em pauta.
                  </p>
                </div>
              ) : (
                redacaoGeral.map((artigo) => {
                  const contagem = contadoresComentarios[artigo.id] || { total: 0, pendentes: 0 };
                  return (
                    <article
                      key={artigo.id}
                      className="card-article p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden border border-border-subtle bg-neutral-100 dark:bg-neutral-800 hidden sm:block">
                          <EditorialImage
                            src={artigo.imagem_capa_url}
                            alt={artigo.titulo}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`badge-category badge-${artigo.categoria.slug}`}>
                              {artigo.categoria.nome}
                            </span>
                            <span className="badge-status badge-status-edicao">Rascunho de Par</span>
                            <span className="text-xs font-sans text-ink-muted flex items-center gap-1.5">
                              <span>Por:</span>
                              <strong className="text-brand-accent font-semibold">
                                {artigo.autor.nome}
                              </strong>
                            </span>
                          </div>

                          <h2 className="font-serif text-lg font-bold text-ink-primary leading-snug">
                            {artigo.titulo}
                          </h2>
                          <p className="font-sans text-xs text-ink-secondary line-clamp-1">
                            {artigo.subtitulo_lead}
                          </p>
                        </div>
                      </div>

                      {/* Botão de Ação: Visualizar Texto (e deixar comentários) */}
                      <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-border-subtle">
                        <Link
                          href={`/painel/editor/${artigo.id}`}
                          className="btn-outline text-xs px-4 py-2 flex items-center gap-1.5 font-semibold text-brand-accent border-brand-accent/40 hover:border-brand-accent hover:bg-brand-accent/5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visualizar Texto &amp; Comentar</span>
                          {contagem.total > 0 && (
                            <span className="ml-1 text-[10px] bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.2 rounded-full font-mono">
                              {contagem.total}
                            </span>
                          )}
                        </Link>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          )}
        </>
      )}

      {/* Modal / Gaveta de Comentários da Redação para o Autor Titular */}
      {artigoComentariosAberto && (
        <div className="modal-backdrop">
          <div
            className="modal-container max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border-subtle bg-paper-card">
              <span className="section-kicker">Sugestões Recebidas</span>
              <h3 className="font-serif text-lg font-bold text-ink-primary truncate">
                {artigoComentariosAberto.titulo}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <EditorialReviewSidebar
                artigoId={artigoComentariosAberto.id}
                autorTitularId={artigoComentariosAberto.autor.id}
                autorTitularNome={artigoComentariosAberto.autor.nome}
                onFechar={() => setArtigoComentariosAberto(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


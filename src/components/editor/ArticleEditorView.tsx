'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { ArtigoCompleto } from '@/types/artigo.types';
import {
  salvarRascunhoArtigo,
  publicarArtigo,
  reverterParaEdicao,
} from '@/services/artigosService';
import { CATEGORIAS_MOCK } from '@/services/mocks/categorias.mock';
import { calcularTempoLeitura } from '@/lib/readingTime';
import { TiptapEditor } from './TiptapEditor';
import { ArticleCoverUploader } from './ArticleCoverUploader';
import { EditorialReviewSidebar } from './EditorialReviewSidebar';
import { MarkdownContent } from '@/components/reading/MarkdownContent';
import { EditorialImage } from '@/components/editorial/EditorialImage';
import {
  ArrowLeft,
  Save,
  Send,
  MessageSquare,
  Clock,
  ShieldAlert,
  Info,
  CheckCircle,
  Eye,
  Edit3,
} from 'lucide-react';
import { toast } from 'sonner';

interface ArticleEditorViewProps {
  artigoInicial?: ArtigoCompleto | null;
  modoNovo?: boolean;
}

export function ArticleEditorView({ artigoInicial, modoNovo = false }: ArticleEditorViewProps) {
  const router = useRouter();
  const { perfil, isAutenticado, isAutor, isAdmin } = useAuth();

  // Estados dos campos do formulário
  const [titulo, setTitulo] = useState(artigoInicial?.titulo || '');
  const [subtituloLead, setSubtituloLead] = useState(artigoInicial?.subtitulo_lead || '');
  const [conteudo, setConteudo] = useState(artigoInicial?.conteudo || '');
  const [categoriaId, setCategoriaId] = useState<number>(
    artigoInicial?.categoria.id || CATEGORIAS_MOCK[0].id
  );
  const [imagemCapaUrl, setImagemCapaUrl] = useState<string | null>(
    artigoInicial?.imagem_capa_url || null
  );
  const [legendaCapa, setLegendaCapa] = useState(artigoInicial?.legenda_capa || '');
  const [creditosCapa, setCreditosCapa] = useState(artigoInicial?.creditos_capa || '');
  const [tagsTexto, setTagsTexto] = useState(
    artigoInicial?.tags.map((t) => t.nome).join(', ') || ''
  );

  // Status e controle de envio
  const [statusArtigo, setStatusArtigo] = useState<'edicao' | 'publicado'>(
    artigoInicial?.status || 'edicao'
  );
  const [salvando, setSalvando] = useState(false);
  const [publicando, setPublicando] = useState(false);

  // Mural lateral de revisão
  const [muralAberto, setMuralAberto] = useState(!modoNovo);
  const [trechoCitado, setTrechoCitado] = useState<string | null>(null);

  // Verificação da Trava de Autoria
  const autorDoArtigoId = artigoInicial ? artigoInicial.autor.id : perfil?.id;
  const souAutorTitular = modoNovo || (perfil && perfil.id === autorDoArtigoId);
  const autorNome = artigoInicial ? artigoInicial.autor.nome : perfil?.nome || 'Autor';

  // Tempo de leitura calculado em tempo real (200 ppm)
  const tempoLeituraEstimado = useMemo(() => {
    return calcularTempoLeitura(conteudo);
  }, [conteudo]);

  // Captura de seleção de texto para citar no mural de revisão (quando colega está lendo)
  const handleCapturarSelecao = () => {
    if (typeof window !== 'undefined') {
      const selection = window.getSelection();
      const txt = selection?.toString().trim();
      if (txt) {
        setTrechoCitado(txt);
        setMuralAberto(true);
        toast.info('Trecho capturado para citação na sugestão!');
      }
    }
  };

  const handleSalvarRascunho = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!perfil) return;

    if (!titulo.trim()) {
      toast.error('Informe o título do artigo.');
      return;
    }

    try {
      setSalvando(true);
      const tagsArray = tagsTexto
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const salvo = await salvarRascunhoArtigo(
        {
          id: artigoInicial?.id,
          titulo,
          subtitulo_lead: subtituloLead,
          conteudo,
          categoria_id: categoriaId,
          imagem_capa_url: imagemCapaUrl,
          legenda_capa: legendaCapa,
          creditos_capa: creditosCapa,
          tags: tagsArray,
        },
        perfil.id
      );

      toast.success('Rascunho salvo com sucesso!');
      if (modoNovo && salvo.id) {
        router.push(`/painel/editor/${salvo.id}`);
      }
    } catch (err) {
      toast.error('Erro ao salvar rascunho.', {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setSalvando(false);
    }
  };

  const handlePublicar = async () => {
    if (!perfil) return;
    if (!titulo.trim() || !conteudo.trim()) {
      toast.error('O título e o conteúdo do ensaio são obrigatórios para publicação.');
      return;
    }

    const confirmar = window.confirm(
      'Tem certeza de que deseja publicar este ensaio? Ele ficará imediatamente disponível para os leitores no portal.'
    );
    if (!confirmar) return;

    try {
      setPublicando(true);

      // Salva antes se houver alterações
      const tagsArray = tagsTexto
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const salvo = await salvarRascunhoArtigo(
        {
          id: artigoInicial?.id,
          titulo,
          subtitulo_lead: subtituloLead,
          conteudo,
          categoria_id: categoriaId,
          imagem_capa_url: imagemCapaUrl,
          legenda_capa: legendaCapa,
          creditos_capa: creditosCapa,
          tags: tagsArray,
        },
        perfil.id
      );

      await publicarArtigo(salvo.id, perfil.id);
      setStatusArtigo('publicado');
      toast.success('Ensaio publicado com sucesso no portal aresta.!');
      router.push(`/coluna/${salvo.slug}`);
    } catch (err) {
      toast.error('Não foi possível publicar.', {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setPublicando(false);
    }
  };

  const handleReverterEdicao = async () => {
    if (!perfil || !artigoInicial) return;
    const confirmar = window.confirm(
      'Deseja reverter este artigo para o status "Em Produção"? Ele sairá do ar temporariamente.'
    );
    if (!confirmar) return;

    try {
      await reverterParaEdicao(artigoInicial.id, perfil.id);
      setStatusArtigo('edicao');
      toast.info('Artigo revertido para Em Produção.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao reverter status.');
    }
  };

  if (!isAutenticado || (!isAutor && !isAdmin)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="title-section text-xl font-serif mb-2">Acesso Exclusivo à Redação</h2>
        <p className="text-sm text-ink-muted mb-6">
          Você precisa estar conectado como autor titular ou editor para acessar o editor.
        </p>
        <Link href="/painel" className="btn-outline">
          Voltar ao Painel
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Barra Superior de Navegação & Ações Rápidas */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/painel"
            className="btn-ghost p-2 rounded-full text-ink-muted hover:text-ink-primary"
            title="Voltar ao Painel"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">
                {modoNovo ? 'Nova Redação' : souAutorTitular ? 'Editor do Autor' : 'Revisão da Redação'}
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  statusArtigo === 'publicado'
                    ? 'badge-status-publicado'
                    : 'badge-status-edicao'
                }`}
              >
                {statusArtigo === 'publicado' ? 'Publicado (No Ar)' : 'Em Produção (Rascunho)'}
              </span>
            </div>
            <p className="text-xs text-ink-muted font-sans">
              Autor Titular: <strong className="text-brand-accent">{autorNome}</strong>
            </p>
          </div>
        </div>

        {/* Botões de Ação na Direita */}
        <div className="flex flex-wrap items-center gap-2.5">
          {artigoInicial && (
            <button
              type="button"
              onClick={() => setMuralAberto(!muralAberto)}
              className={`btn-outline text-xs px-3 py-2 flex items-center gap-1.5 ${
                muralAberto ? 'bg-neutral-200 dark:bg-neutral-800' : ''
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
              <span>{muralAberto ? 'Ocultar Mural' : 'Mural de Sugestões'}</span>
            </button>
          )}

          {souAutorTitular ? (
            <>
              <button
                type="button"
                onClick={handleSalvarRascunho}
                disabled={salvando}
                className="btn-outline text-xs px-4 py-2 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{salvando ? 'Salvando...' : 'Salvar Rascunho'}</span>
              </button>

              {statusArtigo === 'edicao' ? (
                <button
                  type="button"
                  onClick={handlePublicar}
                  disabled={publicando}
                  className="btn-accent text-xs px-4 py-2 flex items-center gap-1.5 shadow"
                  title="Publicar no portal imediatamente"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{publicando ? 'Publicando...' : 'Publicar Agora'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReverterEdicao}
                  className="btn-outline text-xs px-3.5 py-2 text-amber-600 border-amber-500/40 hover:bg-amber-500/10"
                  title="Retirar do ar e voltar para edição"
                >
                  Reverter para Edição
                </button>
              )}
            </>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-border-subtle text-xs text-ink-muted">
              <Eye className="w-4 h-4 text-brand-accent" />
              <span>Modo Revisão (Somente o autor titular pode publicar)</span>
            </div>
          )}
        </div>
      </div>

      {/* Banner Informativo quando for REVISOR (Outro Autor / Admin) */}
      {!souAutorTitular && artigoInicial && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-ink-secondary leading-relaxed">
            <strong className="text-ink-primary">Você está revisando um ensaio de {autorNome}.</strong>{' '}
            Como colega de redação, selecione trechos do texto com o mouse ou use o mural ao lado para
            enviar sugestões construtivas. Apenas {autorNome} tem permissão para alterar o conteúdo ou
            colocar o artigo no ar.
          </div>
        </div>
      )}

      {/* Layout Split: Editor Principal + Mural Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Principal: Formulário e Editor */}
        <div className={muralAberto && artigoInicial ? 'lg:col-span-8 space-y-6' : 'lg:col-span-12 max-w-4xl mx-auto space-y-6'}>
          {/* Se for o autor titular: Formulário Completo Editável */}
          {souAutorTitular ? (
            <form onSubmit={handleSalvarRascunho} className="space-y-6">
              {/* Título Principal */}
              <div>
                <label className="label-field text-xs uppercase tracking-wider text-ink-muted">
                  Título do Ensaio
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Escreva um título expressivo e marcante..."
                  className="input-field font-serif text-2xl font-bold py-3 text-ink-primary"
                  required
                />
              </div>

              {/* Subtítulo / Lead Editorial */}
              <div>
                <label className="label-field text-xs uppercase tracking-wider text-ink-muted">
                  Subtítulo / Lead (Síntese que orienta o leitor)
                </label>
                <textarea
                  value={subtituloLead}
                  onChange={(e) => setSubtituloLead(e.target.value)}
                  placeholder="Explique em 1 a 2 frases a ideia central do texto e o que está em jogo."
                  rows={2}
                  className="textarea-editor text-sm font-sans py-2"
                  required
                />
              </div>

              {/* Linha com Editoria e Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-field text-xs uppercase tracking-wider text-ink-muted">
                    Editoria Oficial
                  </label>
                  <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(Number(e.target.value))}
                    className="input-field text-sm font-sans"
                  >
                    {CATEGORIAS_MOCK.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-field text-xs uppercase tracking-wider text-ink-muted">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={tagsTexto}
                    onChange={(e) => setTagsTexto(e.target.value)}
                    placeholder="Ex: Política, Reforma Tributária, Goiás"
                    className="input-field text-sm font-sans"
                  >
                  </input>
                </div>
              </div>

              {/* Upload e Fallback de Capa com JPEG <= 120 KB */}
              <ArticleCoverUploader
                imagemUrl={imagemCapaUrl}
                legenda={legendaCapa}
                creditos={creditosCapa}
                onChangeImagem={setImagemCapaUrl}
                onChangeLegenda={setLegendaCapa}
                onChangeCreditos={setCreditosCapa}
                disabled={false}
              />

              {/* Editor Tiptap WYSIWYG */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label-field mb-0 text-xs uppercase tracking-wider text-ink-muted">
                    Corpo do Texto (Tiptap Editorial)
                  </label>
                  <span className="flex items-center gap-1 font-mono text-xs text-ink-muted">
                    <Clock className="w-3.5 h-3.5 text-brand-accent" />
                    Tempo estimado: <strong>{tempoLeituraEstimado} min</strong> (a 200 ppm)
                  </span>
                </div>

                <TiptapEditor
                  content={conteudo}
                  onChange={setConteudo}
                  placeholder="Desenvolva seu raciocínio, cite referências e componha seu ensaio..."
                  editable={true}
                />
              </div>
            </form>
          ) : (
            /* Modo Leitura / Revisão Paritária */
            <div
              className="card-article p-8 space-y-6"
              onMouseUp={handleCapturarSelecao}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`badge-category badge-${artigoInicial?.categoria.slug}`}>
                    {artigoInicial?.categoria.nome}
                  </span>
                  <span className="text-xs font-mono text-ink-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tempoLeituraEstimado} min de leitura
                  </span>
                </div>

                <h1 className="title-display">{titulo}</h1>
                <p className="text-lead">{subtituloLead}</p>
              </div>

              {/* Capa */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border-subtle bg-neutral-100 dark:bg-neutral-800">
                <EditorialImage
                  src={imagemCapaUrl}
                  alt={legendaCapa || titulo}
                  fill
                  className="object-cover"
                />
              </div>
              {(legendaCapa || creditosCapa) && (
                <p className="text-caption">
                  {legendaCapa} {creditosCapa && `— ${creditosCapa}`}
                </p>
              )}

              {/* Texto com tipografia editorial */}
              <div className="article-reading-container pt-4 border-t border-border-subtle">
                <MarkdownContent content={conteudo} />
              </div>
            </div>
          )}
        </div>

        {/* Coluna Lateral: Mural de Revisão da Redação */}
        {muralAberto && artigoInicial && (
          <div className="lg:col-span-4 sticky top-24">
            <EditorialReviewSidebar
              artigoId={artigoInicial.id}
              autorTitularId={artigoInicial.autor.id}
              autorTitularNome={artigoInicial.autor.nome}
              onFechar={() => setMuralAberto(false)}
              trechoCitado={trechoCitado}
              onLimparTrechoCitado={() => setTrechoCitado(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}


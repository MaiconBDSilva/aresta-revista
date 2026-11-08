'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ArtigoRevisaoComentario } from '@/types/revisao.types';
import {
  getComentariosRevisao,
  adicionarComentarioRevisao,
  alternarResolvidoComentario,
} from '@/services/revisaoService';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Send, CheckCircle2, Circle, Quote, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

interface EditorialReviewSidebarProps {
  artigoId: string;
  autorTitularId: string;
  autorTitularNome: string;
  onFechar?: () => void;
  trechoCitado?: string | null;
  onLimparTrechoCitado?: () => void;
}

export function EditorialReviewSidebar({
  artigoId,
  autorTitularId,
  autorTitularNome,
  onFechar,
  trechoCitado,
  onLimparTrechoCitado,
}: EditorialReviewSidebarProps) {
  const { perfil, isAutenticado, isAdmin, isAutor } = useAuth();
  const [comentarios, setComentarios] = useState<ArtigoRevisaoComentario[]>([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const souAutorTitular = perfil?.id === autorTitularId;
  const podeComentar = isAutenticado && (isAdmin || isAutor);

  const carregar = useCallback(async () => {
    try {
      const lista = await getComentariosRevisao(artigoId);
      setComentarios(lista);
    } catch {
      // fallback
    } finally {
      setCarregando(false);
    }
  }, [artigoId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoComentario.trim() || !perfil) return;

    try {
      setEnviando(true);
      await adicionarComentarioRevisao({
        artigo_id: artigoId,
        autor_comentario_id: perfil.id,
        autor_nome: perfil.nome,
        autor_avatar_url: perfil.avatar_url,
        trecho_selecionado: trechoCitado || null,
        conteudo: novoComentario,
      });

      setNovoComentario('');
      if (onLimparTrechoCitado) onLimparTrechoCitado();
      await carregar();
      toast.success('Sugestão enviada para a redação!');
    } catch {
      toast.error('Erro ao enviar sugestão.');
    } finally {
      setEnviando(false);
    }
  };

  const handleToggleResolvido = async (comentarioId: string) => {
    try {
      await alternarResolvidoComentario(comentarioId);
      await carregar();
      toast.info('Status da sugestão atualizado.');
    } catch {
      toast.error('Não foi possível alterar o status.');
    }
  };

  const pendentes = comentarios.filter((c) => !c.resolvido).length;

  return (
    <aside className="w-full flex flex-col h-full bg-paper-card border border-border-subtle rounded-xl shadow-lg overflow-hidden">
      {/* Cabeçalho do Mural */}
      <div className="p-4 border-b border-border-subtle bg-neutral-100/60 dark:bg-neutral-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-brand-accent/10 text-brand-accent">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-ink-primary">
              Mural de Revisão da Redação
            </h3>
            <p className="text-[11px] font-sans text-ink-muted">
              {pendentes} sugest{pendentes === 1 ? 'ão pendente' : 'ões pendentes'}
            </p>
          </div>
        </div>

        {onFechar && (
          <button
            onClick={onFechar}
            className="p-1 rounded-full text-ink-muted hover:text-ink-primary"
            aria-label="Fechar mural"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lista de Comentários / Sugestões */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 divide-y divide-border-subtle/50">
        {carregando ? (
          <p className="text-xs text-ink-muted text-center py-6">Carregando sugestões...</p>
        ) : comentarios.length === 0 ? (
          <div className="text-center py-8 px-4">
            <Sparkles className="w-7 h-7 text-ink-muted mx-auto mb-2 opacity-50" />
            <p className="font-serif text-sm font-semibold text-ink-primary">
              Nenhuma sugestão registrada ainda.
            </p>
            <p className="text-xs text-ink-muted mt-1 font-sans">
              Colegas de redação e editores podem deixar impressões e ajustes para{' '}
              <strong className="text-brand-accent">{autorTitularNome}</strong>.
            </p>
          </div>
        ) : (
          comentarios.map((item) => {
            return (
              <div
                key={item.id}
                className={`pt-3 first:pt-0 transition-opacity ${
                  item.resolvido ? 'opacity-60 bg-neutral-50/50 dark:bg-neutral-900/30 p-2 rounded' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 shrink-0 border border-border-subtle">
                      {item.autor_avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.autor_avatar_url}
                          alt={item.autor_nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-ink-secondary">
                          {item.autor_nome.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-sans text-xs font-semibold text-ink-primary">
                        {item.autor_nome}
                      </span>
                      <span className="block text-[10px] font-mono text-ink-muted">
                        {new Date(item.criado_em).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Marcar como Resolvido (apenas autor titular ou autor do comentário) */}
                  {(souAutorTitular || perfil?.id === item.autor_comentario_id) && (
                    <button
                      onClick={() => handleToggleResolvido(item.id)}
                      className={`text-xs p-1 rounded transition-colors ${
                        item.resolvido
                          ? 'text-emerald-600 hover:text-emerald-700'
                          : 'text-ink-muted hover:text-brand-accent'
                      }`}
                      title={item.resolvido ? 'Reabrir sugestão' : 'Marcar como resolvido'}
                    >
                      {item.resolvido ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Trecho Citado */}
                {item.trecho_selecionado && (
                  <div className="my-1.5 p-2 rounded bg-amber-500/10 border-l-2 border-amber-500 text-[11px] font-serif italic text-ink-secondary flex items-start gap-1.5">
                    <Quote className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>&ldquo;{item.trecho_selecionado}&rdquo;</span>
                  </div>
                )}

                {/* Conteúdo */}
                <p className="font-sans text-xs leading-relaxed text-ink-primary whitespace-pre-wrap">
                  {item.conteudo}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Formulário para Enviar Nova Sugestão */}
      {podeComentar ? (
        <form onSubmit={handleEnviar} className="p-3 border-t border-border-subtle bg-paper-card">
          {trechoCitado && (
            <div className="mb-2 p-2 rounded bg-brand-accent/5 border border-brand-accent/20 flex items-start justify-between text-[11px]">
              <div className="line-clamp-2 italic font-serif text-ink-secondary">
                Citando: &ldquo;{trechoCitado}&rdquo;
              </div>
              {onLimparTrechoCitado && (
                <button
                  type="button"
                  onClick={onLimparTrechoCitado}
                  className="text-ink-muted hover:text-ink-primary ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="relative">
            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder={`Escreva uma sugestão para ${autorTitularNome}...`}
              rows={3}
              className="textarea-editor text-xs w-full pr-8 py-2"
              required
            />
            <button
              type="submit"
              disabled={enviando || !novoComentario.trim()}
              className="absolute right-2 bottom-2 p-1.5 rounded-md bg-brand-accent text-white hover:bg-brand-accent-hover disabled:opacity-30 transition-all"
              title="Enviar sugestão"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-ink-muted mt-1 font-sans">
            Comentando como <strong>{perfil?.nome}</strong> ({perfil?.papel}).
          </p>
        </form>
      ) : (
        <div className="p-3 border-t border-border-subtle text-center text-xs text-ink-muted">
          Apenas autores e editores autenticados podem submeter comentários de revisão.
        </div>
      )}
    </aside>
  );
}


'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Lock, Send, AlertCircle } from 'lucide-react';
import type { ArtigoComentarioPublico } from '@/types/artigo.types';
import { adicionarComentario } from '@/services/comentariosService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PublicCommentsSectionProps {
  artigoId: string;
  comentariosIniciais: ArtigoComentarioPublico[];
}

export function PublicCommentsSection({
  artigoId,
  comentariosIniciais,
}: PublicCommentsSectionProps) {
  const { perfil, isAutenticado, logout } = useAuth();
  const [comentarios, setComentarios] = useState<ArtigoComentarioPublico[]>(comentariosIniciais);
  const [novoComentario, setNovoComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoComentario.trim() || !isAutenticado || !perfil) return;

    setEnviando(true);
    setFeedback(null);

    try {
      const criado = await adicionarComentario({
        artigoId,
        leitorId: perfil.id,
        leitorNome: perfil.nome,
        leitorAvatarUrl: perfil.avatar_url,
        conteudo: novoComentario,
      });

      setComentarios([criado, ...comentarios]);
      setNovoComentario('');
      setFeedback('Comentário publicado com sucesso!');
      toast.success('Comentário publicado no debate público!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Erro ao publicar comentário. Tente novamente.');
      toast.error('Erro ao publicar comentário.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      aria-label="Comentários Públicos"
      className="mt-16 pt-8 border-t border-[var(--color-border-subtle)]"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" style={{ color: 'var(--color-brand-accent)' }} />
          <h3 className="font-serif font-bold text-2xl text-[var(--color-ink-primary)]">
            Comentários ({comentarios.length})
          </h3>
        </div>
        <span className="text-xs text-[var(--color-ink-muted)]">
          Debate público moderado
        </span>
      </div>

      {/* Caixa de Ação para Comentar: Exige Autenticação Obrigatória */}
      <div className="mb-10 p-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-surface)]">
        {!isAutenticado || !perfil ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[var(--color-ink-primary)] mb-1">
              Faça login para comentar
            </h4>
            <p className="text-sm text-[var(--color-ink-secondary)] max-w-md mx-auto leading-relaxed">
              A aresta preza pela qualidade e civilidade do debate público. Comentários anônimos não são aceitos.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEnviar}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[var(--color-border-subtle)] bg-neutral-200 dark:bg-neutral-700">
                  {perfil.avatar_url ? (
                    <Image
                      src={perfil.avatar_url}
                      alt={perfil.nome}
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[11px] font-bold text-ink-secondary">
                      {perfil.nome.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                    Comentando como {perfil.nome}
                  </span>
                  <span className="ml-1.5 text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-ink-muted">
                    {perfil.papel === 'leitor' ? 'Leitor' : perfil.papel === 'autor' ? 'Colunista' : 'Redação'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-brand-accent)] transition-colors"
                title="Desconectar e navegar como visitante anônimo"
              >
                Desconectar
              </button>
            </div>

            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Deixe sua reflexão sobre o ensaio..."
              rows={3}
              className="textarea-editor text-sm w-full mb-3"
              required
            />

            <div className="flex items-center justify-between">
              {feedback && (
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {feedback}
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={enviando || !novoComentario.trim()}
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{enviando ? 'Enviando...' : 'Publicar Comentário'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Lista de Comentários */}
      <div className="space-y-6">
        {comentarios.length === 0 ? (
          <p className="text-sm italic text-center py-6 text-[var(--color-ink-muted)]">
            Nenhum comentário publicado ainda. Seja o primeiro a participar da discussão!
          </p>
        ) : (
          comentarios.map((c) => (
            <article
              key={c.id}
              className="p-4 rounded-lg bg-[var(--color-paper-surface)] border border-[var(--color-border-subtle)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--color-border-subtle)] bg-neutral-200">
                    {c.leitor.avatar_url ? (
                      <Image
                        src={c.leitor.avatar_url}
                        alt={c.leitor.nome}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center font-bold text-xs">
                        {c.leitor.nome[0]}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-sm text-[var(--color-ink-primary)]">
                    {c.leitor.nome}
                  </span>
                </div>
                <time className="text-xs text-[var(--color-ink-muted)]">
                  {new Date(c.criado_em).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)] pl-10">
                {c.conteudo}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}


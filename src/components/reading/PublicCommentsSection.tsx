'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Lock, Send, UserCheck, AlertCircle } from 'lucide-react';
import type { ArtigoComentarioPublico } from '@/types/artigo.types';
import { adicionarComentario } from '@/services/comentariosService';

interface PublicCommentsSectionProps {
  artigoId: string;
  comentariosIniciais: ArtigoComentarioPublico[];
}

export function PublicCommentsSection({
  artigoId,
  comentariosIniciais,
}: PublicCommentsSectionProps) {
  const [comentarios, setComentarios] = useState<ArtigoComentarioPublico[]>(comentariosIniciais);
  const [estaLogado, setEstaLogado] = useState(false);
  const [novoComentario, setNovoComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Usuário simulado do protótipo
  const usuarioSimulado = {
    id: 'leitor-autenticado-prototipo',
    nome: 'Mariana Mendonça',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  };

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoComentario.trim() || !estaLogado) return;

    setEnviando(true);
    setFeedback(null);

    try {
      const criado = await adicionarComentario({
        artigoId,
        leitorId: usuarioSimulado.id,
        leitorNome: usuarioSimulado.nome,
        leitorAvatarUrl: usuarioSimulado.avatar_url,
        conteudo: novoComentario,
      });

      setComentarios([criado, ...comentarios]);
      setNovoComentario('');
      setFeedback('Comentário publicado com sucesso!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Erro ao publicar comentário. Tente novamente.');
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
        {!estaLogado ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[var(--color-ink-primary)] mb-1">
              Faça login para comentar
            </h4>
            <p className="text-sm text-[var(--color-ink-secondary)] max-w-md mx-auto mb-4">
              A aresta preza pela qualidade e civilidade do debate público. Comentários anônimos não são aceitos.
            </p>
            <button
              onClick={() => setEstaLogado(true)}
              className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Entrar com sua Conta (Simular Leitor Conectado)</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleEnviar}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[var(--color-border-subtle)]">
                  <Image
                    src={usuarioSimulado.avatar_url}
                    alt={usuarioSimulado.nome}
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
                <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                  Comentando como {usuarioSimulado.nome}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEstaLogado(false)}
                className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-brand-accent)] transition-colors"
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


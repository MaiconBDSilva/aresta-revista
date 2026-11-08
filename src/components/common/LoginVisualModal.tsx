'use client';

import React, { useState } from 'react';
import { X, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { TODOS_PERFIS_PROTOTIPO } from '@/services/mocks/autores.mock';

interface LoginVisualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginVisualModal({ isOpen, onClose }: LoginVisualModalProps) {
  const { loginAs } = useAuth();
  const [email, setEmail] = useState('');
  const [sucesso, setSucesso] = useState(false);

  if (!isOpen) return null;

  const handleSimularLogin = (perfilId: string) => {
    loginAs(perfilId);
    setSucesso(true);
    setTimeout(() => {
      setSucesso(false);
      onClose();
    }, 800);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Por padrão no protótipo, loga como leitora Mariana Silva
    const leitor = TODOS_PERFIS_PROTOTIPO.find((p) => p.papel === 'leitor');
    if (leitor) {
      loginAs(leitor.id);
    }
    setSucesso(true);
    setTimeout(() => {
      setSucesso(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="modal-backdrop z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className="modal-container max-w-md w-full p-6 sm:p-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: 'var(--font-logo)',
                fontSize: '1.75rem',
                color: 'var(--color-ink-primary)',
                lineHeight: 1,
              }}
            >
              aresta<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
            </span>
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[var(--color-ink-muted)] pl-2 border-l border-[var(--color-border-subtle)]">
              Entrar
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sucesso ? (
          <div className="py-10 text-center flex flex-col items-center justify-center animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-3" />
            <h3 className="text-lg font-serif font-bold text-[var(--color-ink-primary)]">
              Acesso Autorizado!
            </h3>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Entrando na sua conta da Aresta Revista...
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <h2
                id="login-modal-title"
                className="text-xl font-serif font-bold text-[var(--color-ink-primary)]"
              >
                Acesse o portal da Aresta
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1.5 font-sans">
                Acompanhe colunas exclusivas, comente nos ensaios e receba nossa curadoria.
              </p>
            </div>

            {/* Botão Oficial: Google OAuth (Padrão de 1 clique) */}
            <button
              type="button"
              onClick={() => {
                const leitor = TODOS_PERFIS_PROTOTIPO.find((p) => p.papel === 'leitor');
                if (leitor) handleSimularLogin(leitor.id);
              }}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-[var(--color-border-subtle)] bg-white dark:bg-neutral-800 text-[var(--color-ink-primary)] font-sans text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-400 transition-all shadow-xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar com o Google</span>
            </button>

            {/* Divisor */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
              <span className="text-[11px] uppercase tracking-wider font-sans text-[var(--color-ink-muted)]">
                ou com e-mail
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
            </div>

            {/* Formulário de E-mail */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="email-login-field"
                  className="block text-xs font-sans font-medium text-[var(--color-ink-secondary)] mb-1"
                >
                  Seu endereço de e-mail
                </label>
                <input
                  id="email-login-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="input-field text-sm"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-accent py-2 text-sm">
                <LogIn className="w-4 h-4" />
                <span>Entrar com Link Mágico</span>
              </button>
            </form>

            {/* Seletor Rápido do Modo Protótipo */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-[var(--color-border-subtle)] text-xs">
              <div className="flex items-center gap-1.5 text-[var(--color-ink-primary)] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
                <span>Acesso Rápido no Protótipo:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const leitor = TODOS_PERFIS_PROTOTIPO.find((p) => p.papel === 'leitor');
                    if (leitor) handleSimularLogin(leitor.id);
                  }}
                  className="px-2.5 py-1.5 rounded-md border border-[var(--color-border-subtle)] bg-white dark:bg-neutral-800 hover:border-[var(--color-brand-accent)] text-left transition-colors"
                >
                  <p className="font-medium text-[var(--color-ink-primary)] truncate">Mariana Silva</p>
                  <p className="text-[10px] text-[var(--color-ink-muted)]">Leitora Cadastrada</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const autor = TODOS_PERFIS_PROTOTIPO.find((p) => p.papel === 'autor');
                    if (autor) handleSimularLogin(autor.id);
                  }}
                  className="px-2.5 py-1.5 rounded-md border border-[var(--color-border-subtle)] bg-white dark:bg-neutral-800 hover:border-[var(--color-brand-accent)] text-left transition-colors"
                >
                  <p className="font-medium text-[var(--color-ink-primary)] truncate">Lucas Campos</p>
                  <p className="text-[10px] text-[var(--color-ink-muted)]">Colunista / Admin</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


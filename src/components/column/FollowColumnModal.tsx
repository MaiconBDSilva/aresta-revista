'use client';

import React, { useState } from 'react';
import { X, Bell, CheckCircle2, Mail, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FollowColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  colunaNome: string;
}

export function FollowColumnModal({
  isOpen,
  onClose,
  colunaNome,
}: FollowColumnModalProps) {
  const { perfil, isAutenticado } = useAuth();
  const [opcao, setOpcao] = useState<'coluna' | 'todas'>('coluna');
  const [emailDigitado, setEmailDigitado] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const emailLogado = perfil?.email || 'leitor@arestarevista.com';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAutenticado && !emailDigitado.trim()) return;

    setSucesso(true);
    setTimeout(() => {
      setSucesso(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-follow-title"
    >
      <div className="modal-container max-w-md">
        {/* Topo */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" style={{ color: 'var(--color-brand-accent)' }} />
            <h3 id="modal-follow-title" className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
              Acompanhar Publicações
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sucesso ? (
          <div className="py-8 text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-xl text-[var(--color-ink-primary)] mb-2">
              Inscrição confirmada!
            </h4>
            <p className="text-sm text-[var(--color-ink-secondary)]">
              Você receberá avisos editoriais{' '}
              {opcao === 'coluna' ? `de ${colunaNome}` : 'de todas as colunas da aresta'}{' '}
              em <strong>{isAutenticado ? emailLogado : emailDigitado}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            <p className="text-sm text-[var(--color-ink-secondary)] mb-4 leading-relaxed">
              Receba os novos ensaios e crônicas diretamente na sua caixa de entrada, sem algoritmos ou ruído.
            </p>

            {/* Opções de Inscrição: Somente esta coluna ou Todas */}
            <div className="space-y-3 mb-5">
              <label
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  opcao === 'coluna'
                    ? 'border-[var(--color-brand-accent)] bg-red-500/5'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] hover:border-black/20'
                }`}
              >
                <input
                  type="radio"
                  name="opcao-seguir"
                  checked={opcao === 'coluna'}
                  onChange={() => setOpcao('coluna')}
                  className="mt-1 accent-[var(--color-brand-accent)]"
                />
                <div>
                  <span className="font-semibold text-sm text-[var(--color-ink-primary)] block">
                    Seguir apenas esta coluna
                  </span>
                  <span className="text-xs text-[var(--color-ink-muted)]">
                    Notificações exclusivas de {colunaNome}
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  opcao === 'todas'
                    ? 'border-[var(--color-brand-accent)] bg-red-500/5'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] hover:border-black/20'
                }`}
              >
                <input
                  type="radio"
                  name="opcao-seguir"
                  checked={opcao === 'todas'}
                  onChange={() => setOpcao('todas')}
                  className="mt-1 accent-[var(--color-brand-accent)]"
                />
                <div>
                  <span className="font-semibold text-sm text-[var(--color-ink-primary)] block">
                    Seguir todas as colunas da aresta.
                  </span>
                  <span className="text-xs text-[var(--color-ink-muted)]">
                    Boletim editorial com todos os colunistas titulares
                  </span>
                </div>
              </label>
            </div>

            {/* Campo de e-mail condicional */}
            {isAutenticado ? (
              <div className="p-3 rounded-lg bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-[var(--color-ink-muted)] block">
                    Inscrição vinculada à conta de {perfil?.nome}:
                  </span>
                  <strong className="text-sm text-[var(--color-ink-primary)] truncate block font-mono">
                    {emailLogado}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="mb-5">
                <label className="label-field text-xs mb-1 block">
                  Seu e-mail para receber notificações:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={emailDigitado}
                    onChange={(e) => setEmailDigitado(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="input-field text-sm w-full pl-9"
                  />
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost text-xs py-2 px-4"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2 px-5"
              >
                Confirmar Inscrição
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


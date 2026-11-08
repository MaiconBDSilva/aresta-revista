import React from 'react';
import { Newspaper, FileEdit, Users, MessageSquareQuote } from 'lucide-react';

interface AdminHeaderProps {
  totalPublicados: number;
  totalEmEdicao: number;
  totalColunistas: number;
}

export function AdminHeader({
  totalPublicados,
  totalEmEdicao,
  totalColunistas,
}: AdminHeaderProps) {
  return (
    <header className="mb-8 pb-6 border-b border-[var(--color-border-subtle)]">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="section-kicker">Mesa Editorial & Gestão</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink-primary)]">
            Painel Administrativo
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1 font-sans">
            Curadoria da capa, gerenciamento do corpo de colunistas e edição do seu perfil.
          </p>
        </div>
      </div>

      {/* Cards de Métricas Editoriais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] shadow-xs">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)] mb-2">
            <span className="text-xs font-sans font-medium uppercase tracking-wider">Publicados</span>
            <Newspaper className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink-primary)]">
            {totalPublicados}
          </p>
          <span className="text-[11px] text-[var(--color-ink-muted)]">Ensaios ativos no site</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] shadow-xs">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)] mb-2">
            <span className="text-xs font-sans font-medium uppercase tracking-wider">Em Edição</span>
            <FileEdit className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink-primary)]">
            {totalEmEdicao}
          </p>
          <span className="text-[11px] text-[var(--color-ink-muted)]">Rascunhos na redação</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] shadow-xs">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)] mb-2">
            <span className="text-xs font-sans font-medium uppercase tracking-wider">Colunistas</span>
            <Users className="w-4 h-4 text-[var(--color-brand-accent)]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink-primary)]">
            {totalColunistas}
          </p>
          <span className="text-[11px] text-[var(--color-ink-muted)]">Autores com coluna ativa</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] shadow-xs">
          <div className="flex items-center justify-between text-[var(--color-ink-muted)] mb-2">
            <span className="text-xs font-sans font-medium uppercase tracking-wider">Editorias</span>
            <MessageSquareQuote className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink-primary)]">
            5
          </p>
          <span className="text-[11px] text-[var(--color-ink-muted)]">Eixos temáticos oficiais</span>
        </div>
      </div>
    </header>
  );
}


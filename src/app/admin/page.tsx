'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Users,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  PenSquare,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getArtigosParaCuradoriaCapa, getArtigosEmEdicao } from '@/services/artigosService';
import { getColunasEquipe } from '@/services/autoresService';
import type { ArtigoCompleto } from '@/types/artigo.types';
import type { Coluna } from '@/types/autor.types';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTabDestaquesCapa } from '@/components/admin/AdminTabDestaquesCapa';
import { AdminTabColunistas } from '@/components/admin/AdminTabColunistas';
import { AdminTabMeuPerfil } from '@/components/admin/AdminTabMeuPerfil';

type TabAdmin = 'capa' | 'colunistas' | 'perfil';

export default function AdminPage() {
  const { isAutenticado, isAdmin, isAutor, perfil } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState<TabAdmin>('capa');

  // Estados de Dados
  const [artigosPublicados, setArtigosPublicados] = useState<ArtigoCompleto[]>([]);
  const [totalEmEdicao, setTotalEmEdicao] = useState(0);
  const [colunas, setColunas] = useState<Coluna[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = useCallback(async () => {
    try {
      const [publicados, emEdicao, colunasAtivas] = await Promise.all([
        getArtigosParaCuradoriaCapa(),
        getArtigosEmEdicao(),
        getColunasEquipe(),
      ]);
      setArtigosPublicados(publicados);
      setTotalEmEdicao(emEdicao.length);
      setColunas(colunasAtivas);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Barreira RBAC: Apenas Admin e Autores têm permissão (todo autor é um admin)
  if (!isAutenticado || (!isAdmin && !isAutor)) {
    return (
      <main className="main-content-layout min-h-[75vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] shadow-sm animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center mx-auto mb-4 text-[var(--color-brand-accent)]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="section-kicker">Acesso Restrito</span>
          <h1 className="text-xl font-serif font-bold text-[var(--color-ink-primary)] mb-2">
            Mesa Editorial da Aresta
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mb-6">
            Esta área é exclusiva para a equipe de redação, administradores e colunistas titulares da revista.
          </p>
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-secondary)] mb-6 text-left">
            <p className="font-semibold text-[var(--color-ink-primary)] mb-1">
              Dica para teste no Protótipo:
            </p>
            <p className="text-[11px] text-[var(--color-ink-muted)]">
              Utilize o botão flutuante no canto inferior esquerdo para alternar para a persona <strong>Administrador</strong> ou qualquer <strong>Colunista Titular</strong>.
            </p>
          </div>
          <Link href="/" className="btn-accent text-xs w-full">
            Voltar para a Capa da Revista
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content-layout min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho do Admin com Estatísticas */}
        <AdminHeader
          totalPublicados={artigosPublicados.length}
          totalEmEdicao={totalEmEdicao}
          totalColunistas={colunas.length}
        />

        {/* Barra de Navegação por Abas */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-2 mb-8 text-sm">
          <div className="flex overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setAbaAtiva('capa')}
              className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                abaAtiva === 'capa'
                  ? 'bg-[var(--color-brand-accent)] text-white'
                  : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Destaques da Capa</span>
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva('colunistas')}
              className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                abaAtiva === 'colunistas'
                  ? 'bg-[var(--color-brand-accent)] text-white'
                  : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Colunistas</span>
              <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] flex items-center justify-center font-bold text-[var(--color-ink-primary)]">
                {colunas.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva('perfil')}
              className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                abaAtiva === 'perfil'
                  ? 'bg-[var(--color-brand-accent)] text-white'
                  : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Meu Perfil</span>
            </button>
          </div>

          {/* Atalho Rápido para Escrever no Painel */}
          <Link
            href="/painel"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-accent)] hover:underline"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Ir para o Painel de Redação</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Conteúdo da Aba Ativa */}
        {abaAtiva === 'capa' && (
          <AdminTabDestaquesCapa
            artigosPublicados={artigosPublicados}
            onArtigosAtualizados={carregarDados}
          />
        )}

        {abaAtiva === 'colunistas' && (
          <AdminTabColunistas
            colunas={colunas}
            artigosPublicados={artigosPublicados}
            onAtualizarColunas={carregarDados}
          />
        )}

        {abaAtiva === 'perfil' && <AdminTabMeuPerfil />}
      </div>
    </main>
  );
}

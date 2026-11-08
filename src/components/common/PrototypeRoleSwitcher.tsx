'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Users,
  UserCheck,
  Shield,
  Feather,
  EyeOff,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import { PERFIS_AUTORES_MOCK } from '@/services/mocks/autores.mock';

export function PrototypeRoleSwitcher() {
  const { perfil, papel, loginAs } = useAuth();
  const [modalAberto, setModalAberto] = useState(false);

  const handleSelecionar = (perfilId: string | null, nomeLabel: string) => {
    loginAs(perfilId);
    setModalAberto(false);
    toast.success(`Visão alterada para: ${nomeLabel}`, {
      description: perfilId
        ? `Sessão ativa com permissões do perfil selecionado.`
        : `Navegando como visitante anônimo não autenticado.`,
    });
  };

  return (
    <>
      {/* Botão Flutuante Discreto no Canto Inferior Direito */}
      <button
        type="button"
        onClick={() => setModalAberto(true)}
        className="prototype-role-switcher"
        title="Alternar perfil de visualização no protótipo"
        aria-label="Alternar perfil de visualização no protótipo"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
        </span>

        <span className="text-zinc-400 font-normal">Visão:</span>
        <span className="font-semibold text-white max-w-[140px] truncate">
          {perfil ? perfil.nome : 'Visitante Anônimo'}
        </span>

        <span className="text-[10px] uppercase tracking-wider bg-brand-accent/25 text-brand-accent px-1.5 py-0.5 rounded font-mono font-bold">
          {papel}
        </span>
      </button>

      {/* Modal Central de Troca de Perfil */}
      {modalAberto && (
        <div className="modal-backdrop">
          <div
            className="modal-container max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-accent/10 rounded-full text-brand-accent">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink-primary">
                    Seletor de Perfis do Protótipo
                  </h3>
                  <p className="text-xs text-ink-muted font-sans">
                    Alterne o usuário ativo para testar travas de autoria, moderação e comentários.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                className="btn-ghost p-1.5 rounded-full text-ink-muted hover:text-ink-primary"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 pt-5">
              {/* 1. Autores Titulares */}
              <div>
                <div className="flex items-center gap-2 mb-2.5 text-xs font-sans font-bold uppercase tracking-wider text-brand-accent">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Autores Titulares (Colunistas &amp; Admins)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PERFIS_AUTORES_MOCK.map((autor) => {
                    const ativo = perfil?.id === autor.id;
                    return (
                      <button
                        key={autor.id}
                        onClick={() => handleSelecionar(autor.id, `${autor.nome} (Autor)`)}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                          ativo
                            ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent'
                            : 'border-border-subtle hover:border-zinc-400 dark:hover:border-zinc-600 bg-paper-card'
                        }`}
                      >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border-subtle">
                          {autor.avatar_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={autor.avatar_url}
                              alt={autor.nome}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-sans text-sm font-semibold text-ink-primary truncate">
                              {autor.nome}
                            </p>
                            {ativo && <Check className="w-4 h-4 text-brand-accent shrink-0 ml-1" />}
                          </div>
                          <p className="text-[11px] text-ink-muted truncate font-sans">
                            {autor.slug === 'lucas-campos' && 'Coluna de Lucas (Política)'}
                            {autor.slug === 'danillo-reis' && 'Coluna de Danillo (Cultura)'}
                            {autor.slug === 'sergio-rodrigues' && 'Coluna de Sergio (Esporte)'}
                            {autor.slug === 'lara-lima' && 'Coluna de Lara (Ensaios)'}
                            {autor.slug === 'guliver-elias' && 'Coluna de Guliver (Entretenimento)'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Administrador Geral */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-sans font-bold uppercase tracking-wider text-ink-secondary">
                  <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                  <span>Administração da Plataforma</span>
                </div>
                <button
                  onClick={() =>
                    handleSelecionar('u0000000-0000-0000-0000-000000000099', 'Redação Aresta (Admin)')
                  }
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    perfil?.id === 'u0000000-0000-0000-0000-000000000099'
                      ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent'
                      : 'border-border-subtle hover:border-zinc-400 bg-paper-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
                      AD
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-ink-primary">
                        Redação Aresta (Admin Geral)
                      </p>
                      <p className="text-xs text-ink-muted">
                        Acesso irrestrito a /admin, capa e moderação, sem coluna própria.
                      </p>
                    </div>
                  </div>
                  {perfil?.id === 'u0000000-0000-0000-0000-000000000099' && (
                    <Check className="w-4 h-4 text-brand-accent shrink-0 ml-2" />
                  )}
                </button>
              </div>

              {/* 3. Leitor Cadastrado & Visitante Anônimo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-sans font-bold uppercase tracking-wider text-ink-secondary">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Leitor Cadastrado</span>
                  </div>
                  <button
                    onClick={() =>
                      handleSelecionar('u0000000-0000-0000-0000-000000000088', 'Mariana Silva (Leitora)')
                    }
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                      perfil?.id === 'u0000000-0000-0000-0000-000000000088'
                        ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent'
                        : 'border-border-subtle hover:border-zinc-400 bg-paper-card'
                    }`}
                  >
                    <div>
                      <p className="font-sans text-sm font-semibold text-ink-primary">
                        Mariana Silva
                      </p>
                      <p className="text-xs text-ink-muted">Comenta artigos; sem /painel</p>
                    </div>
                    {perfil?.id === 'u0000000-0000-0000-0000-000000000088' && (
                      <Check className="w-4 h-4 text-brand-accent shrink-0" />
                    )}
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-sans font-bold uppercase tracking-wider text-ink-secondary">
                    <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Visitante Anônimo</span>
                  </div>
                  <button
                    onClick={() => handleSelecionar(null, 'Visitante Anônimo')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                      perfil === null
                        ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent'
                        : 'border-border-subtle hover:border-zinc-400 bg-paper-card'
                    }`}
                  >
                    <div>
                      <p className="font-sans text-sm font-semibold text-ink-primary">
                        Não Autenticado
                      </p>
                      <p className="text-xs text-ink-muted">Leitura pública de colunas</p>
                    </div>
                    {perfil === null && <Check className="w-4 h-4 text-brand-accent shrink-0" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-ink-muted">
              <span>Sprint 3 • Aresta Revista Mock Auth</span>
              <button
                onClick={() => setModalAberto(false)}
                className="btn-outline px-3 py-1.5 text-xs rounded"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

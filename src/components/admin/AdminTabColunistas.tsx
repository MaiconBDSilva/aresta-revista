'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserPlus, ExternalLink, CheckCircle2 } from 'lucide-react';
import type { Coluna } from '@/types/autor.types';
import type { ArtigoCompleto } from '@/types/artigo.types';
import { ModalRegistrarMembro } from './ModalRegistrarMembro';

interface AdminTabColunistasProps {
  colunas: Coluna[];
  artigosPublicados: ArtigoCompleto[];
  onAtualizarColunas: () => void;
}

export function AdminTabColunistas({
  colunas,
  artigosPublicados,
  onAtualizarColunas,
}: AdminTabColunistasProps) {
  const [modalRegistroAberto, setModalRegistroAberto] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  const handleMembroRegistrado = () => {
    onAtualizarColunas();
    setMensagemSucesso('Novo integrante registrado na equipe editorial com sucesso!');
    setTimeout(() => setMensagemSucesso(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {mensagemSucesso && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      {/* Cabeçalho da Aba */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <span className="section-kicker">Quadro de Autores</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[var(--color-ink-primary)]">
            Colunistas Titulares & Equipe Editorial
          </h2>
          <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
            Gerencie os colunistas da revista e adicione novos membros à redação.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalRegistroAberto(true)}
          className="btn-accent text-xs py-2 px-3.5 flex items-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Registrar Membro da Equipe</span>
        </button>
      </div>

      {/* Tabela dos Colunistas Titulares */}
      <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] bg-neutral-50/80 dark:bg-neutral-800/40 text-[var(--color-ink-muted)] uppercase tracking-wider font-sans font-semibold">
                <th className="py-3.5 px-4 sm:px-6">Colunista</th>
                <th className="py-3.5 px-4">Coluna Exclusiva</th>
                <th className="py-3.5 px-4 text-center">Artigos</th>
                <th className="py-3.5 px-4 text-center">Papel</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {colunas.map((coluna) => {
                const autor = coluna.autor;
                const autorId = autor?.id || coluna.autor_id;
                const autorNome = autor?.nome || 'Colunista';
                const autorEmail = autor?.email || '';
                const autorSlug = autor?.slug || coluna.slug;
                const avatarUrl = autor?.avatar_url;

                const totalTextos = artigosPublicados.filter(
                  (a) => a.autor.id === autorId
                ).length;

                return (
                  <tr
                    key={coluna.id}
                    className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors"
                  >
                    {/* Colunista */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border-subtle)] shrink-0 bg-neutral-100">
                          {avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt={autorNome}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-xs">
                              {autorNome[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/autor/${autorSlug}`}
                            className="font-serif font-bold text-sm text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] transition-colors block"
                          >
                            {autorNome}
                          </Link>
                          <span className="text-[11px] text-[var(--color-ink-muted)]">
                            {autorEmail}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Coluna Exclusiva */}
                    <td className="py-4 px-4">
                      <div>
                        <Link
                          href={`/coluna-arquivo/${coluna.slug}`}
                          className="font-semibold text-xs text-[var(--color-brand-accent)] hover:underline inline-flex items-center gap-1"
                        >
                          <span>{coluna.nome}</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </Link>
                        <p className="text-[11px] text-[var(--color-ink-muted)] line-clamp-1 max-w-xs mt-0.5">
                          {coluna.manifesto_slogan}
                        </p>
                      </div>
                    </td>

                    {/* Artigos */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-serif font-bold text-sm text-[var(--color-ink-primary)]">
                        {totalTextos}
                      </span>
                    </td>

                    {/* Papel */}
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-red-100 dark:bg-red-950/40 text-[var(--color-brand-accent)]">
                        Autor Titular
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/autor/${autorSlug}`}
                          target="_blank"
                          className="btn-outline text-[11px] py-1 px-2.5"
                        >
                          Ver Perfil
                        </Link>
                        <Link
                          href={`/coluna-arquivo/${coluna.slug}`}
                          target="_blank"
                          className="btn-outline text-[11px] py-1 px-2.5"
                        >
                          Ver Acervo
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ModalRegistrarMembro
        isOpen={modalRegistroAberto}
        onClose={() => setModalRegistroAberto(false)}
        onMembroRegistrado={handleMembroRegistrado}
      />
    </div>
  );
}

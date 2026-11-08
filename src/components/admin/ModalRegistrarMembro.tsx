'use client';

import React, { useState, useEffect } from 'react';
import { X, UserPlus, Search, CheckCircle2, Shield, PenTool } from 'lucide-react';
import type { Perfil } from '@/types/autor.types';
import {
  getUsuariosCandidatosPromocao,
  promoverUsuarioParaEquipe,
} from '@/services/autoresService';
import { slugify } from '@/lib/slugify';

interface ModalRegistrarMembroProps {
  isOpen: boolean;
  onClose: () => void;
  onMembroRegistrado: () => void;
}

export function ModalRegistrarMembro({
  isOpen,
  onClose,
  onMembroRegistrado,
}: ModalRegistrarMembroProps) {
  const [candidatos, setCandidatos] = useState<Perfil[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Perfil | null>(null);

  // Formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [papel, setPapel] = useState<'autor' | 'admin'>('autor');
  const [nomeColuna, setNomeColuna] = useState('');
  const [manifestoColuna, setManifestoColuna] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getUsuariosCandidatosPromocao().then((res) => setCandidatos(res));
      setUsuarioSelecionado(null);
      setNome('');
      setEmail('');
      setPapel('autor');
      setNomeColuna('');
      setManifestoColuna('');
      setErro(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelecionarCandidato = (u: Perfil) => {
    setUsuarioSelecionado(u);
    setNome(u.nome);
    setEmail(u.email || '');
    setNomeColuna(`Coluna de ${u.nome.split(' ')[0]}`);
    setManifestoColuna('Reflexões críticas e ensaios autorais para a Aresta Revista.');
  };

  const handleNomeChange = (val: string) => {
    setNome(val);
    if (!usuarioSelecionado && papel === 'autor' && !nomeColuna) {
      setNomeColuna(`Coluna de ${val.split(' ')[0]}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      setErro('Preencha os campos obrigatórios de nome e e-mail.');
      return;
    }

    if (papel === 'autor' && !nomeColuna.trim()) {
      setErro('Para colunistas, o nome da coluna é obrigatório.');
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      await promoverUsuarioParaEquipe({
        usuarioId: usuarioSelecionado?.id,
        nome: nome.trim(),
        email: email.trim(),
        papel,
        nomeColuna: papel === 'autor' ? nomeColuna.trim() : undefined,
        slugColuna: papel === 'autor' ? slugify(nomeColuna.trim()) : undefined,
        manifesto: papel === 'autor' ? manifestoColuna.trim() : undefined,
        avatar_url: usuarioSelecionado?.avatar_url || undefined,
      });

      onMembroRegistrado();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao registrar membro.';
      setErro(msg);
    } finally {
      setSalvando(false);
    }
  };

  const candidatosFiltrados = candidatos.filter(
    (c) =>
      c.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(termoBusca.toLowerCase()))
  );

  return (
    <div
      className="modal-backdrop z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-container max-w-xl w-full p-6 sm:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[var(--color-brand-accent)]" />
            <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
              Registrar Membro da Equipe
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[var(--color-ink-muted)] my-4">
          Promova um leitor cadastrado na revista ou adicione um novo integrante ao corpo editorial.
        </p>

        {/* Busca de Leitores Cadastrados */}
        <div className="mb-6 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-[var(--color-border-subtle)]">
          <label
            htmlFor="busca-leitor"
            className="block text-xs font-semibold text-[var(--color-ink-primary)] mb-1.5"
          >
            Buscar na base de leitores:
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]" />
            <input
              id="busca-leitor"
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Digite o nome ou e-mail (ex: Mariana)..."
              className="input-field text-xs pl-9 py-2"
            />
          </div>

          {candidatosFiltrados.length > 0 && (
            <div className="mt-2.5 max-h-36 overflow-y-auto divide-y divide-[var(--color-border-subtle)] border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-paper-bg)]">
              {candidatosFiltrados.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelecionarCandidato(c)}
                  className={`w-full text-left p-2 text-xs flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                    usuarioSelecionado?.id === c.id
                      ? 'bg-red-50 dark:bg-red-950/40 text-[var(--color-brand-accent)] font-semibold'
                      : 'text-[var(--color-ink-secondary)]'
                  }`}
                >
                  <div>
                    <p className="font-medium text-[var(--color-ink-primary)]">{c.nome}</p>
                    <p className="text-[10px] text-[var(--color-ink-muted)]">{c.email}</p>
                  </div>
                  {usuarioSelecionado?.id === c.id && (
                    <span className="text-[10px] uppercase font-bold text-[var(--color-brand-accent)]">
                      Selecionado
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Formulário de Registro */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {erro && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
              {erro}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="membro-nome" className="label-field text-xs">
                Nome do Integrante *
              </label>
              <input
                id="membro-nome"
                type="text"
                value={nome}
                onChange={(e) => handleNomeChange(e.target.value)}
                placeholder="Ex: Mariana Silva"
                className="input-field text-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="membro-email" className="label-field text-xs">
                E-mail Institucional *
              </label>
              <input
                id="membro-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mariana@arestarevista.com"
                className="input-field text-xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="label-field text-xs mb-1.5 block">Papel na Revista *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPapel('autor')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  papel === 'autor'
                    ? 'border-[var(--color-brand-accent)] bg-red-50/50 dark:bg-red-950/30 text-[var(--color-ink-primary)]'
                    : 'border-[var(--color-border-subtle)] text-[var(--color-ink-muted)] hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                }`}
              >
                <PenTool className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs text-[var(--color-ink-primary)]">Colunista (Autor)</p>
                  <p className="text-[10px] text-[var(--color-ink-muted)]">
                    Tem coluna exclusiva e autonomia para escrever e publicar ensaios.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPapel('admin')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  papel === 'admin'
                    ? 'border-[var(--color-brand-accent)] bg-red-50/50 dark:bg-red-950/30 text-[var(--color-ink-primary)]'
                    : 'border-[var(--color-border-subtle)] text-[var(--color-ink-muted)] hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                }`}
              >
                <Shield className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs text-[var(--color-ink-primary)]">Administrador</p>
                  <p className="text-[10px] text-[var(--color-ink-muted)]">
                    Gestão da capa e equipe sem coluna autoral própria.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Dados da Coluna Obrigatória se Papel for Autor */}
          {papel === 'autor' && (
            <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-neutral-50/70 dark:bg-neutral-800/40 space-y-3 animate-fadeIn">
              <span className="section-kicker">Coluna Exclusiva do Autor</span>

              <div>
                <label htmlFor="coluna-nome" className="label-field text-xs">
                  Nome da Coluna *
                </label>
                <input
                  id="coluna-nome"
                  type="text"
                  value={nomeColuna}
                  onChange={(e) => setNomeColuna(e.target.value)}
                  placeholder="Ex: Coluna de Mariana"
                  className="input-field text-xs"
                  required
                />
                {nomeColuna && (
                  <p className="text-[10px] text-[var(--color-ink-muted)] mt-1">
                    Slug público: <code>/coluna-arquivo/{slugify(nomeColuna)}</code>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="coluna-manifesto" className="label-field text-xs">
                  Manifesto / Linha Editorial da Coluna
                </label>
                <textarea
                  id="coluna-manifesto"
                  value={manifestoColuna}
                  onChange={(e) => setManifestoColuna(e.target.value)}
                  rows={2}
                  placeholder="Descreva a temática e a linha editorial desta nova coluna..."
                  className="input-field text-xs py-2"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="btn-accent text-xs"
            >
              {salvando ? 'Registrando...' : 'Confirmar e Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


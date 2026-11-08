'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  User,
  CheckCircle2,
  Globe,
  Share2,
  PenSquare,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  atualizarPerfilAutor,
  atualizarManifestoColuna,
  getColunaByAutorId,
} from '@/services/autoresService';
import type { Coluna } from '@/types/autor.types';

export function AdminTabMeuPerfil() {
  const { perfil, isAutor } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Dados da Coluna (se for autor)
  const [coluna, setColuna] = useState<Coluna | null>(null);
  const [nomeColuna, setNomeColuna] = useState('');
  const [manifestoColuna, setManifestoColuna] = useState('');

  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (perfil) {
      setNome(perfil.nome);
      setEmail(perfil.email || '');
      setAvatarUrl(perfil.avatar_url || '');
      setBio(perfil.bio || '');
      setTwitterUrl(perfil.twitter_url || '');
      setInstagramUrl(perfil.instagram_url || '');
      setLinkedinUrl(perfil.linkedin_url || '');
      setWebsiteUrl(perfil.website_url || '');

      if (isAutor) {
        getColunaByAutorId(perfil.id).then((col) => {
          if (col) {
            setColuna(col);
            setNomeColuna(col.nome);
            setManifestoColuna(col.manifesto_slogan);
          }
        });
      }
    }
  }, [perfil, isAutor]);

  if (!perfil) {
    return (
      <div className="p-6 text-center text-xs text-[var(--color-ink-muted)]">
        Selecione um perfil no seletor de visão para editar suas informações.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setSucesso(false);

    try {
      await atualizarPerfilAutor(perfil.id, {
        nome: nome.trim(),
        email: email.trim(),
        avatar_url: avatarUrl.trim() || null,
        bio: bio.trim(),
        twitter_url: twitterUrl.trim() || null,
        instagram_url: instagramUrl.trim() || null,
        linkedin_url: linkedinUrl.trim() || null,
        website_url: websiteUrl.trim() || null,
      });

      if (coluna) {
        await atualizarManifestoColuna(
          coluna.id,
          manifestoColuna.trim(),
          nomeColuna.trim()
        );
      }

      setSucesso(true);
      setTimeout(() => setSucesso(false), 3500);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8 animate-fadeIn max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-subtle)] mb-6">
        <div>
          <span className="section-kicker">Identidade & Assinatura</span>
          <h2 className="text-xl font-serif font-bold text-[var(--color-ink-primary)]">
            Meu Perfil de Autor / Administrador
          </h2>
          <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
            Essas informações alimentam sua assinatura pública nos artigos e na página biográfica.
          </p>
        </div>

        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-brand-accent)] bg-neutral-100 shrink-0">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={nome} fill className="object-cover" sizes="56px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-lg">
              {nome[0]}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identificação Básica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="perfil-nome" className="label-field text-xs">
              Nome Completo *
            </label>
            <input
              id="perfil-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="input-field text-xs"
              required
            />
          </div>

          <div>
            <label htmlFor="perfil-email" className="label-field text-xs">
              E-mail Institucional *
            </label>
            <input
              id="perfil-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field text-xs"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="perfil-avatar" className="label-field text-xs">
            URL da Foto de Perfil (Avatar)
          </label>
          <input
            id="perfil-avatar"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="input-field text-xs"
          />
        </div>

        {/* Biografia Editorial */}
        <div>
          <label htmlFor="perfil-bio" className="label-field text-xs">
            Minibiografia Editorial (Assinatura nos Artigos)
          </label>
          <textarea
            id="perfil-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="input-field text-xs py-2"
            placeholder="Escreva um breve resumo de sua trajetória acadêmica, editorial e temas de pesquisa..."
          />
        </div>

        {/* Redes Sociais & Links */}
        <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-4">
          <h3 className="text-xs uppercase font-bold tracking-wider text-[var(--color-brand-accent)] flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Presença Digital & Redes Sociais</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="perfil-twitter" className="label-field text-xs">
                Perfil no X (Twitter)
              </label>
              <input
                id="perfil-twitter"
                type="url"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://x.com/seu_usuario"
                className="input-field text-xs"
              />
            </div>

            <div>
              <label htmlFor="perfil-instagram" className="label-field text-xs">
                Perfil no Instagram
              </label>
              <input
                id="perfil-instagram"
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/seu_usuario"
                className="input-field text-xs"
              />
            </div>

            <div>
              <label htmlFor="perfil-linkedin" className="label-field text-xs">
                LinkedIn
              </label>
              <input
                id="perfil-linkedin"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/seu_perfil"
                className="input-field text-xs"
              />
            </div>

            <div>
              <label htmlFor="perfil-website" className="label-field text-xs">
                Site Pessoal / Lattes
              </label>
              <input
                id="perfil-website"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://meusite.com"
                className="input-field text-xs"
              />
            </div>
          </div>
        </div>

        {/* Dados da Coluna Titular (Se o usuário for Colunista) */}
        {coluna && (
          <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[var(--color-brand-accent)] flex items-center gap-1.5">
              <PenSquare className="w-3.5 h-3.5" />
              <span>Sua Coluna Exclusiva</span>
            </h3>

            <div>
              <label htmlFor="perfil-coluna-nome" className="label-field text-xs">
                Nome da Coluna
              </label>
              <input
                id="perfil-coluna-nome"
                type="text"
                value={nomeColuna}
                onChange={(e) => setNomeColuna(e.target.value)}
                className="input-field text-xs font-serif font-bold"
              />
            </div>

            <div>
              <label htmlFor="perfil-coluna-manifesto" className="label-field text-xs">
                Manifesto / Slogan da Coluna
              </label>
              <textarea
                id="perfil-coluna-manifesto"
                value={manifestoColuna}
                onChange={(e) => setManifestoColuna(e.target.value)}
                rows={2}
                className="input-field text-xs py-2"
                placeholder="Uma frase marcante que define a vocação e os temas da sua coluna..."
              />
            </div>
          </div>
        )}

        {/* Ação de Salvar */}
        <div className="pt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)]">
          {sucesso ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              Perfil atualizado com sucesso!
            </span>
          ) : (
            <span className="text-[11px] text-[var(--color-ink-muted)]">
              Alterações refletem imediatamente na sua assinatura.
            </span>
          )}

          <button
            type="submit"
            disabled={salvando}
            className="btn-accent text-xs py-2 px-5"
          >
            {salvando ? 'Salvando...' : 'Salvar Meu Perfil'}
          </button>
        </div>
      </form>
    </div>
  );
}


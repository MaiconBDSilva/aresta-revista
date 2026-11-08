'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Bell,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { COLUNAS_MOCK } from '@/services/mocks/autores.mock';
import { ARTIGOS_MOCK } from '@/services/mocks/artigos.mock';
import {
  getNewsletterInscrito,
  setNewsletterInscrito,
  getColunasSeguidas,
  toggleSeguirColuna,
  getArtigosFavoritos,
} from '@/services/interacoesService';

export default function ContaLeitorPage() {
  const router = useRouter();
  const { perfil, isAutenticado, logout } = useAuth();

  // Estados dos Dados Pessoais
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [salvandoDados, setSalvandoDados] = useState(false);
  const [sucessoSalvar, setSucessoSalvar] = useState(false);

  // Estados de Newsletter & Colunas
  const [newsletterAtiva, setNewsletterAtiva] = useState(true);
  const [colunasSeguidas, setColunasSeguidas] = useState<string[]>([]);
  const [artigosSalvos, setArtigosSalvos] = useState<string[]>([]);

  // Estado do Modal de Exclusão de Conta (LGPD)
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [confirmacaoTexto, setConfirmacaoTexto] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  // Aba ativa
  const [abaAtiva, setAbaAtiva] = useState<'dados' | 'inscricoes' | 'salvos' | 'privacidade'>('dados');

  useEffect(() => {
    if (perfil) {
      setNome(perfil.nome);
      setEmail(perfil.email || '');
      setAvatarUrl(perfil.avatar_url || '');
    }
    setNewsletterAtiva(getNewsletterInscrito());
    setColunasSeguidas(getColunasSeguidas());
    setArtigosSalvos(getArtigosFavoritos());
  }, [perfil]);

  const handleSalvarDados = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvandoDados(true);
    setTimeout(() => {
      setSalvandoDados(false);
      setSucessoSalvar(true);
      setTimeout(() => setSucessoSalvar(false), 3000);
    }, 600);
  };

  const handleToggleNewsletter = () => {
    const novoValor = !newsletterAtiva;
    setNewsletterAtiva(novoValor);
    setNewsletterInscrito(novoValor);
  };

  const handleToggleColuna = (colunaSlug: string) => {
    toggleSeguirColuna(colunaSlug);
    setColunasSeguidas(getColunasSeguidas());
  };

  const handleExcluirConta = () => {
    if (confirmacaoTexto.trim().toUpperCase() !== 'EXCLUIR') return;
    setExcluindo(true);
    setTimeout(() => {
      setExcluindo(false);
      setModalExcluirAberto(false);
      logout();
      router.push('/');
    }, 1000);
  };

  // Se o usuário não estiver logado
  if (!isAutenticado || !perfil) {
    return (
      <main className="main-content-layout min-h-[75vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-paper-bg)] shadow-sm">
          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-[var(--color-ink-muted)]">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-serif font-bold text-[var(--color-ink-primary)] mb-2">
            Identificação de Leitor
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mb-6">
            Você está navegando como visitante anônimo. Acesse sua conta ou use o seletor de visão no rodapé para simular o perfil de leitor.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/" className="btn-accent text-sm">
              Voltar para a Capa
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const artigosFavoritados = ARTIGOS_MOCK.filter((a) => artigosSalvos.includes(a.id));

  return (
    <main className="main-content-layout min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho da Conta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-subtle)] mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-brand-accent)] shrink-0 bg-neutral-100 dark:bg-neutral-800">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={nome} fill className="object-cover" sizes="56px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-lg text-[var(--color-ink-primary)]">
                  {nome[0]}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="section-kicker">Área do Leitor</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  {perfil.papel}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink-primary)]">
                {nome}
              </h1>
              <p className="text-xs text-[var(--color-ink-muted)]">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={logout}
              className="btn-outline text-xs py-2 px-3"
              title="Encerrar sessão"
            >
              Sair da Conta
            </button>
          </div>
        </div>

        {/* Abas de Navegação da Conta */}
        <div className="flex overflow-x-auto gap-2 border-b border-[var(--color-border-subtle)] pb-2 mb-8 text-sm">
          <button
            type="button"
            onClick={() => setAbaAtiva('dados')}
            className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              abaAtiva === 'dados'
                ? 'bg-[var(--color-brand-accent)] text-white'
                : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Meus Dados</span>
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva('inscricoes')}
            className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              abaAtiva === 'inscricoes'
                ? 'bg-[var(--color-brand-accent)] text-white'
                : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Newsletters & Colunas</span>
            {colunasSeguidas.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] flex items-center justify-center font-bold text-[var(--color-ink-primary)]">
                {colunasSeguidas.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva('salvos')}
            className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              abaAtiva === 'salvos'
                ? 'bg-[var(--color-brand-accent)] text-white'
                : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Salvos para Depois</span>
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva('privacidade')}
            className={`px-4 py-2 font-sans font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              abaAtiva === 'privacidade'
                ? 'bg-[var(--color-brand-accent)] text-white'
                : 'text-[var(--color-ink-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacidade & LGPD</span>
          </button>
        </div>

        {/* Conteúdo da Aba: Meus Dados */}
        {abaAtiva === 'dados' && (
          <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8 shadow-xs animate-fadeIn">
            <h2 className="text-lg font-serif font-bold text-[var(--color-ink-primary)] mb-1">
              Informações do Cadastro
            </h2>
            <p className="text-xs text-[var(--color-ink-muted)] mb-6">
              Atualize suas informações visíveis nos comentários e na identificação do portal.
            </p>

            <form onSubmit={handleSalvarDados} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome-leitor" className="label-field text-xs">
                    Nome Completo
                  </label>
                  <input
                    id="nome-leitor"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="input-field text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email-leitor" className="label-field text-xs">
                    Endereço de E-mail
                  </label>
                  <input
                    id="email-leitor"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="avatar-leitor" className="label-field text-xs">
                  URL da Foto de Perfil (Avatar)
                </label>
                <input
                  id="avatar-leitor"
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field text-sm"
                />
                <p className="text-[11px] text-[var(--color-ink-muted)] mt-1">
                  Insira uma URL pública para a imagem do seu perfil.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)]">
                {sucessoSalvar ? (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" />
                    Alterações salvas com sucesso!
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-ink-muted)]">
                    Membro desde janeiro de 2026
                  </span>
                )}

                <button
                  type="submit"
                  disabled={salvandoDados}
                  className="btn-accent text-sm"
                >
                  {salvandoDados ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Conteúdo da Aba: Newsletters & Colunas Seguidas */}
        {abaAtiva === 'inscricoes' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Card Newsletter Semanal */}
            <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-[var(--color-brand-accent)]" />
                    <h3 className="font-serif font-bold text-base text-[var(--color-ink-primary)]">
                      Newsletter Semanal Aresta
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    Curadoria com os melhores ensaios e reflexões da semana enviados aos sábados pela manhã. Sem spam.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleNewsletter}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans transition-all ${
                    newsletterAtiva
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-[var(--color-ink-muted)] border border-transparent'
                  }`}
                >
                  {newsletterAtiva ? '✓ Inscrito(a)' : '+ Ativar Inscrição'}
                </button>
              </div>
            </div>

            {/* Lista das Colunas Oficiais */}
            <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)] mb-1">
                Colunas que você acompanha
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)] mb-6">
                Receba avisos prioritários e destaque na página inicial sempre que esses colunistas publicarem novos textos.
              </p>

              <div className="divide-y divide-[var(--color-border-subtle)]">
                {COLUNAS_MOCK.map((coluna) => {
                  const estaSeguindo = colunasSeguidas.includes(coluna.slug);
                  const autorNome = coluna.autor?.nome || 'Colunista';
                  const avatarUrl = coluna.autor?.avatar_url;

                  return (
                    <div
                      key={coluna.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border-subtle)] shrink-0">
                          {avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt={autorNome}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold">
                              {autorNome[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/coluna-arquivo/${coluna.slug}`}
                            className="font-serif font-bold text-sm text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] transition-colors block"
                          >
                            {coluna.nome}
                          </Link>
                          <p className="text-xs text-[var(--color-ink-muted)]">
                            por {autorNome}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/coluna-arquivo/${coluna.slug}`}
                          className="text-xs text-[var(--color-ink-secondary)] hover:text-[var(--color-brand-accent)] underline decoration-dotted"
                        >
                          Ver Acervo
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleToggleColuna(coluna.slug)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-all ${
                            estaSeguindo
                              ? 'bg-[var(--color-brand-accent)] text-white hover:opacity-90'
                              : 'border border-[var(--color-border-subtle)] text-[var(--color-ink-secondary)] hover:border-[var(--color-ink-primary)]'
                          }`}
                        >
                          {estaSeguindo ? 'Seguindo' : '+ Seguir Coluna'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba: Salvos para Depois */}
        {abaAtiva === 'salvos' && (
          <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8 animate-fadeIn">
            <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)] mb-1">
              Artigos Salvos para Leitura
            </h3>
            <p className="text-xs text-[var(--color-ink-muted)] mb-6">
              Sua lista pessoal de artigos e ensaios guardados para ler com tranquilidade.
            </p>

            {artigosFavoritados.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[var(--color-border-subtle)] rounded-xl">
                <Bookmark className="w-8 h-8 text-[var(--color-ink-muted)] mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-[var(--color-ink-secondary)]">
                  Nenhum artigo salvo no momento.
                </p>
                <p className="text-xs text-[var(--color-ink-muted)] mt-1">
                  Ao ler um artigo na revista, clique no botão de salvar para adicioná-lo aqui.
                </p>
                <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[var(--color-brand-accent)] font-semibold mt-4 hover:underline">
                  <span>Explorar ensaios na Capa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {artigosFavoritados.map((artigo) => (
                  <div key={artigo.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-brand-accent)]">
                        {artigo.coluna.nome}
                      </span>
                      <Link
                        href={`/coluna/${artigo.slug}`}
                        className="font-serif font-bold text-base text-[var(--color-ink-primary)] hover:text-[var(--color-brand-accent)] block transition-colors"
                      >
                        {artigo.titulo}
                      </Link>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {artigo.autor.nome} • {artigo.tempo_leitura_min} min de leitura
                      </p>
                    </div>
                    <Link href={`/coluna/${artigo.slug}`} className="btn-outline text-xs py-1.5 px-3">
                      Ler Artigo
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da Aba: Privacidade & LGPD */}
        {abaAtiva === 'privacidade' && (
          <div className="bg-[var(--color-paper-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)] mb-1">
                Privacidade, Dados & LGPD
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem controle total sobre suas informações na revista.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-secondary)] space-y-2">
              <p>
                <strong>Seus direitos como leitor:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-[var(--color-ink-muted)]">
                <li>Acesso aos seus dados de cadastro a qualquer momento.</li>
                <li>Cancelamento imediato de e-mails da newsletter com 1 clique.</li>
                <li>Exclusão definitiva de conta, apagando seu cadastro do banco de dados.</li>
              </ul>
            </div>

            {/* Zona de Perigo: Exclusão de Conta */}
            <div className="pt-6 border-t border-red-200 dark:border-red-950/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
                    Excluir Conta Permanentemente
                  </h4>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                    Essa ação removerá seu perfil e preferências. Comentários públicos serão desvinculados do seu nome.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalExcluirAberto(true)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Excluir Conta</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão de Conta (LGPD) */}
      {modalExcluirAberto && (
        <div
          className="modal-backdrop z-50 p-4"
          onClick={() => setModalExcluirAberto(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-container max-w-md w-full p-6 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
                Confirmar Exclusão de Conta
              </h3>
            </div>

            <p className="text-xs text-[var(--color-ink-secondary)] mb-4">
              Esta ação é <strong>irreversível</strong>. Todos os seus dados de preferências, colunas seguidas e histórico serão excluídos permanentemente.
            </p>

            <div className="mb-4">
              <label
                htmlFor="confirm-excluir"
                className="block text-xs font-semibold text-[var(--color-ink-primary)] mb-1"
              >
                Digite <span className="text-red-600">EXCLUIR</span> para confirmar:
              </label>
              <input
                id="confirm-excluir"
                type="text"
                value={confirmacaoTexto}
                onChange={(e) => setConfirmacaoTexto(e.target.value)}
                placeholder="EXCLUIR"
                className="input-field text-sm"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
              <button
                type="button"
                onClick={() => setModalExcluirAberto(false)}
                className="btn-ghost text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={confirmacaoTexto.trim().toUpperCase() !== 'EXCLUIR' || excluindo}
                onClick={handleExcluirConta}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-40 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{excluindo ? 'Excluindo...' : 'Sim, Excluir Minha Conta'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

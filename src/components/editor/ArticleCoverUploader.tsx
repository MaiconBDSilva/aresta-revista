'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { comprimirImagemParaJpeg } from '@/lib/imageCompression';
import { EditorialImage, DEFAULT_COVER_IMAGE } from '@/components/editorial/EditorialImage';
import { toast } from 'sonner';

interface ArticleCoverUploaderProps {
  imagemUrl: string | null;
  legenda: string;
  creditos: string;
  onChangeImagem: (url: string | null) => void;
  onChangeLegenda: (legenda: string) => void;
  onChangeCreditos: (creditos: string) => void;
  disabled?: boolean;
}

const CAPAS_SUGERIDAS = [
  {
    rotulo: 'Capa Oficial aresta.',
    url: DEFAULT_COVER_IMAGE,
  },
  {
    rotulo: 'Planalto / Cerrado',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&h=675&q=82',
  },
  {
    rotulo: 'Art Déco / Cidade',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=675&q=82',
  },
  {
    rotulo: 'Futebol & Torcida',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=675&q=82',
  },
];

export function ArticleCoverUploader({
  imagemUrl,
  legenda,
  creditos,
  onChangeImagem,
  onChangeLegenda,
  onChangeCreditos,
  disabled = false,
}: ArticleCoverUploaderProps) {
  const [comprimindo, setComprimindo] = useState(false);
  const [infoTamanhoKB, setInfoTamanhoKB] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setComprimindo(true);
      const resultado = await comprimirImagemParaJpeg(file, 120, 0.82);
      onChangeImagem(resultado.dataUrl);
      setInfoTamanhoKB(resultado.tamanhoKB);
      toast.success('Imagem comprimida com sucesso!', {
        description: `Formato JPEG otimizado (${resultado.tamanhoKB} KB • max 120 KB). Compatível 100% com Open Graph e WhatsApp.`,
      });
    } catch (err) {
      toast.error('Erro na compressão da imagem', {
        description: err instanceof Error ? err.message : 'Tente outro arquivo JPEG ou PNG.',
      });
    } finally {
      setComprimindo(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-border-subtle bg-paper-card p-5">
      <div className="flex items-center justify-between">
        <label className="label-field mb-0 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-brand-accent" />
          <span>Imagem de Capa (Formato 16:9 • JPEG ≤ 120 KB)</span>
        </label>
        {infoTamanhoKB && (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <Check className="w-3 h-3" />
            {infoTamanhoKB} KB (Otimizado)
          </span>
        )}
      </div>

      {/* Preview 16:9 */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border-subtle bg-neutral-100 dark:bg-neutral-800 shadow-inner">
        <EditorialImage
          src={imagemUrl || DEFAULT_COVER_IMAGE}
          alt={legenda || 'Prévia da capa do artigo'}
          fill
          className="object-cover"
        />

        {comprimindo && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-accent" />
            <span className="text-xs font-sans font-medium">Otimizando e comprimindo JPEG...</span>
          </div>
        )}
      </div>

      {!disabled && (
        <>
          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-2.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
              disabled={comprimindo}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={comprimindo}
              className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{comprimindo ? 'Comprimindo...' : 'Fazer Upload de Imagem'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onChangeImagem(DEFAULT_COVER_IMAGE);
                setInfoTamanhoKB(null);
                toast.info('Capa oficial padrão aresta. aplicada.');
              }}
              className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Usar Capa Padrão aresta.</span>
            </button>
          </div>

          {/* Sugestões de Capas */}
          <div className="pt-2">
            <p className="text-[11px] font-sans font-semibold text-ink-muted uppercase tracking-wider mb-2">
              Ou escolha uma das capas sugeridas:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CAPAS_SUGERIDAS.map((sugestao) => (
                <button
                  key={sugestao.rotulo}
                  type="button"
                  onClick={() => {
                    onChangeImagem(sugestao.url);
                    setInfoTamanhoKB(null);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md border font-sans transition-colors ${
                    imagemUrl === sugestao.url
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-semibold'
                      : 'border-border-subtle bg-paper-card text-ink-secondary hover:border-zinc-400'
                  }`}
                >
                  {sugestao.rotulo}
                </button>
              ))}
            </div>
          </div>

          {/* Campos de Legenda e Créditos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="label-field text-xs">Legenda da Imagem</label>
              <input
                type="text"
                value={legenda}
                onChange={(e) => onChangeLegenda(e.target.value)}
                placeholder="Ex: Fachada Art Déco na Avenida Goiás ao entardecer."
                className="input-field text-xs py-1.5"
              />
            </div>
            <div>
              <label className="label-field text-xs">Créditos da Fotografia</label>
              <input
                type="text"
                value={creditos}
                onChange={(e) => onChangeCreditos(e.target.value)}
                placeholder="Ex: Foto: Lucas Campos / Acervo Aresta"
                className="input-field text-xs py-1.5"
              />
            </div>
          </div>
        </>
      )}

      {disabled && (
        <div className="text-xs text-ink-muted flex items-center gap-1.5 pt-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Modo somente-leitura: legendas e capas controladas pelo autor titular.</span>
        </div>
      )}
    </div>
  );
}


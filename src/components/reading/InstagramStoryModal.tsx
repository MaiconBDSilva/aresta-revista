'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getArtigoUrl } from '@/lib/siteUrl';
import Image from 'next/image';
import { X, Download, Copy, Check, ExternalLink, Link2 } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InstagramStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  artigoTitulo: string;
  artigoSubtitulo: string;
  artigoSlug: string;
  imagemCapaUrl: string | null;
  autorNome: string;
  colunaNome: string;
}

export function InstagramStoryModal({
  isOpen,
  onClose,
  artigoTitulo,
  artigoSubtitulo,
  artigoSlug,
  imagemCapaUrl,
  autorNome,
  colunaNome,
}: InstagramStoryModalProps) {
  const [copiado, setCopiado] = useState(false);
  const [gerandoImagem, setGerandoImagem] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const urlArtigo = getArtigoUrl(artigoSlug);

  // Utilitário de quebra de linhas para medição e renderização
  const getWrappedLines = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(currentLine);
        currentLine = words[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  const desenharCanvas = useCallback(async (): Promise<Blob | null> => {
    return new Promise(async (resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }

      // Proporção oficial de Stories: 1080 x 1920 (9:16)
      const width = 1080;
      const height = 1920;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      // Garante carregamento da fonte oficial Svetze diretamente no Canvas nativo
      try {
        if (typeof window !== 'undefined' && 'FontFace' in window) {
          const font = new FontFace('Svetze', 'url(/fonts/Svetze.otf)');
          await font.load();
          document.fonts.add(font);
        }
      } catch {
        // Fallback
      }

      const renderComOverlay = () => {
        // Máscara escura editorial profunda em degradê
        const gradiente = ctx.createLinearGradient(0, 0, 0, height);
        gradiente.addColorStop(0, 'rgba(9, 9, 11, 0.72)');
        gradiente.addColorStop(0.35, 'rgba(9, 9, 11, 0.85)');
        gradiente.addColorStop(0.7, 'rgba(9, 9, 11, 0.92)');
        gradiente.addColorStop(1, 'rgba(9, 9, 11, 0.98)');
        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, width, height);

        // Moldura decorativa interna suave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        // -------------------------------------------------------------
        // 1. TOPO: Logotipo em Svetze + Coluna
        // -------------------------------------------------------------
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '84px Svetze, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('aresta', 80, 160);

        // Ponto carmim da marca
        const arestaWidth = ctx.measureText('aresta').width;
        ctx.fillStyle = '#B91C1C';
        ctx.fillText('.', 80 + arestaWidth, 160);

        // Selo da coluna no canto superior direito
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = 'bold 30px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(colunaNome.toUpperCase(), width - 80, 150);

        // Linha divisória superior suave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(80, 205);
        ctx.lineTo(width - 80, 205);
        ctx.stroke();

        // -------------------------------------------------------------
        // 2. RODAPÉ: Assinatura + Link
        // -------------------------------------------------------------
        const footerStartY = 1530;

        // Linha carmim
        ctx.fillStyle = '#B91C1C';
        ctx.fillRect(80, footerStartY, 130, 8);

        // Nome do autor
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 52px "Georgia", serif';
        ctx.textAlign = 'left';
        ctx.fillText(autorNome, 80, footerStartY + 70);

        // Coluna
        ctx.fillStyle = '#A1A1AA';
        ctx.font = '34px sans-serif';
        ctx.fillText(colunaNome, 80, footerStartY + 125);

        // Pílula com o Link oficial do ensaio
        const pillY = footerStartY + 180;
        const pillHeight = 90;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.roundRect
          ? ctx.roundRect(80, pillY, width - 160, pillHeight, 20)
          : ctx.fillRect(80, pillY, width - 160, pillHeight);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.roundRect
          ? ctx.roundRect(80, pillY, width - 160, pillHeight, 20)
          : ctx.strokeRect(80, pillY, width - 160, pillHeight);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔗 arestarevista.com • Toque para ler', width / 2, pillY + 56);

        // -------------------------------------------------------------
        // 3. MIOLO: Aspas + Título + Subtítulo CENTRALIZADOS
        // -------------------------------------------------------------
        // Espaço vertical útil disponível entre o cabeçalho e o rodapé
        const topBoundary = 240;
        const bottomBoundary = footerStartY - 40;
        const availableHeight = bottomBoundary - topBoundary; // ~1250px
        const maxTextWidth = width - 160; // 920px

        // Escalonador tipográfico dinâmico para preenchimento imponente
        const tituloLen = artigoTitulo.length;
        const fontTituloSize = tituloLen > 110 ? 56 : tituloLen > 70 ? 66 : 76;
        const lineTituloHeight = fontTituloSize * 1.32;

        ctx.font = `bold ${fontTituloSize}px "Georgia", serif`;
        const linhasTitulo = getWrappedLines(ctx, artigoTitulo, maxTextWidth);

        // Medição do subtítulo
        const fontLeadSize = 40;
        const lineLeadHeight = 60;
        ctx.font = `italic ${fontLeadSize}px "Georgia", serif`;
        const linhasLead = getWrappedLines(ctx, artigoSubtitulo, maxTextWidth);

        // Altura total do bloco de conteúdo
        const aspasHeight = 110;
        const gapEntreTituloELead = 50;
        const totalBlockHeight =
          aspasHeight +
          linhasTitulo.length * lineTituloHeight +
          gapEntreTituloELead +
          linhasLead.length * lineLeadHeight;

        // Ponto de início vertical calculado para centralizar no espaço útil
        let startY = topBoundary + Math.max(20, (availableHeight - totalBlockHeight) / 2);

        // Desenho das Aspas carmim
        ctx.fillStyle = '#B91C1C';
        ctx.font = 'bold 180px "Georgia", serif';
        ctx.textAlign = 'left';
        ctx.fillText('“', 80, startY + 80);

        let currentY = startY + aspasHeight + 20;

        // Desenho do Título completo linha por linha
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${fontTituloSize}px "Georgia", serif`;
        ctx.textAlign = 'left';
        for (const linha of linhasTitulo) {
          ctx.fillText(linha, 80, currentY);
          currentY += lineTituloHeight;
        }

        currentY += gapEntreTituloELead - 10;

        // Desenho do Subtítulo / Lead linha por linha
        ctx.fillStyle = '#E4E4E7';
        ctx.font = `italic ${fontLeadSize}px "Georgia", serif`;
        for (const linha of linhasLead) {
          // Não desenha se encostar no rodapé
          if (currentY + lineLeadHeight > bottomBoundary) break;
          ctx.fillText(linha, 80, currentY);
          currentY += lineLeadHeight;
        }

        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.94);
      };

      if (imagemCapaUrl) {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const imgAspect = img.width / img.height;
          const canvasAspect = width / height;
          let drawWidth = width;
          let drawHeight = height;
          let offsetX = 0;
          let offsetY = 0;

          if (imgAspect > canvasAspect) {
            drawHeight = height;
            drawWidth = height * imgAspect;
            offsetX = -(drawWidth - width) / 2;
          } else {
            drawWidth = width;
            drawHeight = width / imgAspect;
            offsetY = -(drawHeight - height) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          renderComOverlay();
        };
        img.onerror = () => {
          ctx.fillStyle = '#09090B';
          ctx.fillRect(0, 0, width, height);
          renderComOverlay();
        };
        img.src = imagemCapaUrl;
      } else {
        ctx.fillStyle = '#09090B';
        ctx.fillRect(0, 0, width, height);
        renderComOverlay();
      }
    });
  }, [artigoTitulo, artigoSubtitulo, colunaNome, autorNome, imagemCapaUrl]);

  useEffect(() => {
    if (isOpen) {
      desenharCanvas();
    }
  }, [isOpen, desenharCanvas]);

  if (!isOpen) return null;

  const handleBaixarImagem = async () => {
    setGerandoImagem(true);
    try {
      const blob = await desenharCanvas();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aresta-story-${artigoSlug}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setGerandoImagem(false);
    }
  };

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(urlArtigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-story-title"
    >
      <div className="modal-container max-w-sm sm:max-w-md">
        {/* Topo do Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
              <InstagramIcon className="w-3.5 h-3.5" />
            </span>
            <h3 id="modal-story-title" className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
              Cartão para Instagram Stories
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

        {/* Pré-visualização do Story 9:16 (Fiel à imagem de download) */}
        <div className="relative my-4 aspect-[9/16] w-full max-w-[320px] mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/20 text-white flex flex-col justify-between p-5 bg-[#09090B]">
          {imagemCapaUrl && (
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={imagemCapaUrl}
                alt={artigoTitulo}
                fill
                className="object-cover"
                sizes="340px"
              />
            </div>
          )}

          {/* Máscara Escura em Degradê */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(9, 9, 11, 0.72) 0%, rgba(9, 9, 11, 0.88) 50%, rgba(9, 9, 11, 0.96) 100%)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Topo: Logo em Svetze */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2">
            <span className="font-logo text-xl tracking-tight text-white">
              aresta<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">
              {colunaNome}
            </span>
          </div>

          {/* Miolo Centralizado: Título Completo e Lead */}
          <div className="relative z-10 my-auto py-2">
            <span
              aria-hidden="true"
              className="text-3xl font-serif leading-none block mb-1 select-none"
              style={{ color: 'var(--color-brand-accent)' }}
            >
              “
            </span>
            <h4 className="font-serif font-bold text-sm leading-snug text-white mb-2">
              {artigoTitulo}
            </h4>
            <p className="font-serif italic text-[11px] leading-relaxed text-zinc-300">
              {artigoSubtitulo}
            </p>
          </div>

          {/* Rodapé: Assinatura e Indicação de Link */}
          <div className="relative z-10 pt-3 border-t border-white/15">
            <div className="w-8 h-1 bg-[var(--color-brand-accent)] mb-1.5 rounded" />
            <span className="font-serif font-bold text-xs text-white block">
              {autorNome}
            </span>
            <span className="text-[10px] text-white/60 block mb-2">
              {colunaNome}
            </span>

            <div className="py-1.5 px-2 rounded-md bg-white/10 text-center flex items-center justify-center gap-1.5 text-[10px] text-white">
              <Link2 className="w-3 h-3 text-[var(--color-brand-accent)]" />
              <span>arestarevista.com</span>
            </div>
          </div>
        </div>

        {/* Canvas oculto para exportar a imagem 1080x1920 em alta resolução */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Instrução de publicação nos Stories */}
        <p className="text-xs text-[var(--color-ink-muted)] mb-4 text-center leading-relaxed">
          1. Baixe o cartão para a galeria do seu celular.<br />
          2. Abra o Instagram e use a <strong>figurinha de Link</strong> com o endereço do ensaio.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBaixarImagem}
              disabled={gerandoImagem}
              className="btn-primary text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 flex-1 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{gerandoImagem ? 'Gerando...' : 'Baixar Imagem do Story'}</span>
            </button>

            <button
              onClick={handleCopiarLink}
              className="btn-outline text-xs py-2.5 px-4 flex items-center justify-center gap-1.5"
              title="Copiar link para a figurinha de link dos Stories"
            >
              {copiado ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiado ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs py-2 px-3 flex items-center justify-center gap-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
          >
            <span>Abrir o Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

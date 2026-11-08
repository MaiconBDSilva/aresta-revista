'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Download, Copy, Check, Share2, Quote as QuoteIcon } from 'lucide-react';

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  artigoTitulo: string;
  artigoSlug: string;
  imagemCapaUrl: string | null;
  autorNome: string;
  colunaNome: string;
  selectedQuote: string;
}

export function QuoteCardModal({
  isOpen,
  onClose,
  artigoTitulo,
  artigoSlug,
  imagemCapaUrl,
  autorNome,
  colunaNome,
  selectedQuote,
}: QuoteCardModalProps) {
  const [copiado, setCopiado] = useState(false);
  const [gerandoImagem, setGerandoImagem] = useState(false);
  const cardPreviewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const urlArtigo = `https://arestarevista.com/coluna/${artigoSlug}`;

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

  // Renderiza a imagem do Quote Card em alta resolução usando Canvas
  const desenharCanvas = useCallback(async (): Promise<Blob | null> => {
    return new Promise(async (resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }

      const width = 1080;
      const height = 1350; // Aspect ratio 4:5 ideal para Stories, WhatsApp e Instagram
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
        // Máscara escura em degradê sobre a foto
        const gradiente = ctx.createLinearGradient(0, 0, 0, height);
        gradiente.addColorStop(0, 'rgba(9, 9, 11, 0.70)');
        gradiente.addColorStop(0.5, 'rgba(9, 9, 11, 0.85)');
        gradiente.addColorStop(1, 'rgba(9, 9, 11, 0.95)');
        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, width, height);

        // Borda decorativa interna
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        // Topo: aresta. com fonte oficial Svetze
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '72px Svetze, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('aresta', 80, 140);

        // Ponto carmim da marca
        const arestaWidth = ctx.measureText('aresta').width;
        ctx.fillStyle = '#B91C1C';
        ctx.fillText('.', 80 + arestaWidth, 140);

        // Nome da Coluna no topo direito
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(colunaNome.toUpperCase(), width - 80, 130);

        // Linha divisória superior suave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(80, 180);
        ctx.lineTo(width - 80, 180);
        ctx.stroke();

        // Rodapé: Linha divisória carmim + Autor + URL oficial
        const footerStartY = height - 210;
        ctx.fillStyle = '#B91C1C';
        ctx.fillRect(80, footerStartY, 110, 7);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 46px "Georgia", serif';
        ctx.textAlign = 'left';
        ctx.fillText(autorNome, 80, footerStartY + 65);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '30px sans-serif';
        ctx.fillText(`arestarevista.com • ${colunaNome}`, 80, footerStartY + 115);

        // Miolo: Aspas + Citação CENTRALIZADAS VERTICALMENTE
        const topBoundary = 220;
        const bottomBoundary = footerStartY - 40;
        const availableHeight = bottomBoundary - topBoundary; // ~880px
        const maxTextWidth = width - 160; // 920px

        const quoteLen = selectedQuote.trim().length;
        const quoteFontSize = quoteLen > 200 ? 44 : quoteLen > 100 ? 52 : 62;
        const quoteLineHeight = quoteFontSize * 1.36;

        ctx.font = `italic ${quoteFontSize}px "Georgia", serif`;
        const linhasQuote = getWrappedLines(ctx, selectedQuote.trim(), maxTextWidth);

        const aspasHeight = 100;
        const totalBlockHeight = aspasHeight + linhasQuote.length * quoteLineHeight;
        const startY = topBoundary + Math.max(20, (availableHeight - totalBlockHeight) / 2);

        // Aspas carmim
        ctx.fillStyle = '#B91C1C';
        ctx.font = 'bold 150px "Georgia", serif';
        ctx.textAlign = 'left';
        ctx.fillText('“', 80, startY + 70);

        // Trecho citado linha por linha
        let currentY = startY + aspasHeight + 20;
        ctx.fillStyle = '#F4F4F5';
        ctx.font = `italic ${quoteFontSize}px "Georgia", serif`;
        for (const linha of linhasQuote) {
          if (currentY + quoteLineHeight > bottomBoundary) break;
          ctx.fillText(linha, 80, currentY);
          currentY += quoteLineHeight;
        }

        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.94);
      };

      if (imagemCapaUrl) {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Desenha imagem de capa cobrindo o canvas (cover)
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
          // Fallback para fundo sólido escuro se a imagem externa não carregar com CORS
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
  }, [colunaNome, selectedQuote, autorNome, imagemCapaUrl]);

  useEffect(() => {
    if (isOpen) {
      desenharCanvas();
    }
  }, [isOpen, desenharCanvas]);

  if (!isOpen) return null;

  // 1. Baixar a imagem gerada
  const handleBaixarImagem = async () => {
    setGerandoImagem(true);
    try {
      const blob = await desenharCanvas();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aresta-quote-${artigoSlug}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Falha silenciosa
    } finally {
      setGerandoImagem(false);
    }
  };

  // 2. Copiar imagem ou link formatado
  const handleCopiar = async () => {
    setGerandoImagem(true);
    try {
      const blob = await desenharCanvas();
      if (blob && navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([
            new window.ClipboardItem({
              'image/png': blob,
            }),
          ]);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2500);
          return;
        } catch {
          // Fallback para cópia de texto se o navegador recusar imagem no clipboard
        }
      }

      // Fallback: cópia de texto da citação com link
      const textoFormatado = `“${selectedQuote.trim()}”\n\n— ${autorNome} (${colunaNome})\nLeia na aresta: ${urlArtigo}`;
      await navigator.clipboard.writeText(textoFormatado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } finally {
      setGerandoImagem(false);
    }
  };

  // 3. Compartilhamento nativo da Imagem + Link (Web Share com File) ou redes
  const handleCompartilhar = async () => {
    const textoFormatado = `“${selectedQuote.trim()}” — ${autorNome} (${colunaNome})\n${urlArtigo}`;

    if (navigator.share) {
      try {
        const blob = await desenharCanvas();
        if (blob) {
          const file = new File([blob], `quote-${artigoSlug}.jpg`, { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: artigoTitulo,
              text: textoFormatado,
              url: urlArtigo,
            });
            return;
          }
        }
        await navigator.share({
          title: artigoTitulo,
          text: textoFormatado,
          url: urlArtigo,
        });
        return;
      } catch {
        // Ignora cancelamento pelo usuário
      }
    }

    // Fallback: abre no X (Twitter)
    const urlX = `https://x.com/intent/tweet?text=${encodeURIComponent(textoFormatado)}`;
    window.open(urlX, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-quote-title"
    >
      <div className="modal-container max-w-lg">
        {/* Topo do Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <QuoteIcon className="w-5 h-5" style={{ color: 'var(--color-brand-accent)' }} />
            <h3 id="modal-quote-title" className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
              Cartão de Citação Editorial
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

        {/* Pré-visualização do Card com a Imagem Principal + Máscara Escurecedora */}
        <div
          ref={cardPreviewRef}
          className="relative my-4 rounded-xl overflow-hidden shadow-2xl border border-white/20 text-white min-h-[380px] flex flex-col justify-between p-6 sm:p-8"
          style={{ backgroundColor: '#09090B' }}
        >
          {/* Imagem de Capa do Artigo */}
          {imagemCapaUrl && (
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={imagemCapaUrl}
                alt={artigoTitulo}
                fill
                className="object-cover"
                sizes="500px"
              />
            </div>
          )}

          {/* Máscara Escura em Degradê (Overlay) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(9, 9, 11, 0.72) 0%, rgba(9, 9, 11, 0.88) 60%, rgba(9, 9, 11, 0.96) 100%)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Conteúdo sobreposto */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
            <span className="font-logo text-2xl tracking-tight text-white">
              aresta<span style={{ color: 'var(--color-brand-accent)' }}>.</span>
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
              {colunaNome}
            </span>
          </div>

          <div className="relative z-10 my-6">
            <span
              aria-hidden="true"
              className="text-5xl font-serif leading-none block mb-2 select-none"
              style={{ color: 'var(--color-brand-accent)' }}
            >
              “
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-white leading-relaxed">
              {selectedQuote}
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15">
            <div className="w-8 h-1 bg-[var(--color-brand-accent)] mb-2 rounded" />
            <div className="flex items-baseline justify-between">
              <span className="font-serif font-bold text-base text-white">
                {autorNome}
              </span>
              <span className="text-xs text-white/60">
                arestarevista.com
              </span>
            </div>
          </div>
        </div>

        {/* Canvas oculto para exportação em alta resolução */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Informação de citação autêntica (sem edição manual) */}
        <p className="text-xs text-[var(--color-ink-muted)] mb-4 text-center">
          Cartão editorial oficial com o trecho literal selecionado e a imagem de capa do ensaio.
        </p>

        {/* Ações de Compartilhamento e Download */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
          <button
            onClick={handleBaixarImagem}
            disabled={gerandoImagem}
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 flex-1 justify-center shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{gerandoImagem ? 'Gerando...' : 'Baixar Imagem'}</span>
          </button>

          <button
            onClick={handleCopiar}
            disabled={gerandoImagem}
            className="btn-outline text-xs py-2.5 px-4 flex items-center gap-1.5 justify-center"
            title="Copiar imagem ou citação para a área de transferência"
          >
            {copiado ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={handleCompartilhar}
            disabled={gerandoImagem}
            className="btn-outline text-xs py-2.5 px-4 flex items-center gap-1.5 justify-center"
            title="Compartilhar imagem com link"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

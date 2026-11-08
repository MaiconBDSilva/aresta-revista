'use client';

import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  targetId?: string;
}

export function ReadingProgressBar({ targetId }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const headerOffset = 100; // Compensação visual do menu superior

          // Total de rolagem necessária para ler do topo do artigo até o final
          const totalLeitura = rect.height - windowHeight + headerOffset;

          // Se o artigo for muito curto e couber todo na tela
          if (totalLeitura <= 0) {
            setProgress(100);
            return;
          }

          // Distância já rolada a partir do topo do artigo
          const rolado = headerOffset - rect.top;

          // Se o fim do artigo já atingiu o rodapé da janela, marca 100%
          if (rect.bottom <= windowHeight || rolado >= totalLeitura) {
            setProgress(100);
            return;
          }

          if (rolado <= 0) {
            setProgress(0);
            return;
          }

          const porcentagem = (rolado / totalLeitura) * 100;
          setProgress(Math.min(100, Math.max(0, porcentagem)));
          return;
        }
      }

      // Fallback para a página inteira caso não haja targetId
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="reading-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        backgroundColor: 'var(--color-brand-accent)',
        zIndex: 100,
        transition: 'width 0.08s ease-out',
        pointerEvents: 'none',
      }}
    />
  );
}

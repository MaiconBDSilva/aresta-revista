import { describe, it, expect } from 'vitest';
import { calcularTempoLeitura } from '../readingTime';

describe('calcularTempoLeitura', () => {
  it('retorna 1 minuto para textos vazios ou nulos', () => {
    expect(calcularTempoLeitura('')).toBe(1);
    expect(calcularTempoLeitura(null as any)).toBe(1);
    expect(calcularTempoLeitura(undefined as any)).toBe(1);
  });

  it('retorna 1 minuto para textos curtos de até 200 palavras', () => {
    const textoCurto = 'Palavra '.repeat(50);
    expect(calcularTempoLeitura(textoCurto)).toBe(1);
  });

  it('calcula corretamente o tempo baseado em 200 palavras por minuto', () => {
    const texto450Palavras = 'Palavra '.repeat(450);
    expect(calcularTempoLeitura(texto450Palavras)).toBe(3); // ceil(450 / 200) = 3
  });

  it('ignora formatação de markdown ao contar palavras', () => {
    const markdown = '# Título\n\n![Imagem](https://imagem.com/foto.jpg)\n\n[Link](https://site.com)\n\nTexto com formatação.';
    expect(calcularTempoLeitura(markdown)).toBe(1);
  });
});


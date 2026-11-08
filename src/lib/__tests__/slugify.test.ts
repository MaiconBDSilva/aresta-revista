import { describe, it, expect } from 'vitest';
import { slugify } from '../slugify';

describe('slugify', () => {
  it('converte texto simples com espaços em kebab-case', () => {
    expect(slugify('Coluna de Lucas')).toBe('coluna-de-lucas');
  });

  it('remove acentuação gráfica corretamente', () => {
    expect(slugify('Opinião & Ensaios')).toBe('opiniao-ensaios');
    expect(slugify('Política & Poder')).toBe('politica-poder');
  });

  it('remove pontuação e caracteres especiais', () => {
    expect(slugify('O Futuro da Crítica Cultural: Um Ensaio! (2026)')).toBe('o-futuro-da-critica-cultural-um-ensaio-2026');
  });

  it('evita hífens consecutivos ou nas pontas', () => {
    expect(slugify('---Texto com   muitos     espaços---')).toBe('texto-com-muitos-espacos');
  });

  it('obedece à regex de validação de slug semântico', () => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const resultado = slugify('Aresta Revista - Análise Semanal');
    expect(slugRegex.test(resultado)).toBe(true);
  });
});


import { describe, it, expect } from 'vitest';
import { markdownToHtml, isHtml } from '../contentParser';

describe('contentParser', () => {
  it('deve identificar se o conteúdo já é HTML estruturado', () => {
    expect(isHtml('<p>Texto formatado</p>')).toBe(true);
    expect(isHtml('<h2>Título</h2>')).toBe(true);
    expect(isHtml('Texto comum sem tags')).toBe(false);
    expect(isHtml('## Título em markdown')).toBe(false);
  });

  it('deve converter Markdown com parágrafos, subtítulos e formatação inline para HTML do Tiptap', () => {
    const markdown = `## Primeiro Subtítulo

Este é um parágrafo com **negrito** e também *itálico*.

### Segundo Subtítulo

> Uma citação relevante sobre a política goiana.

- Item da lista 1
- Item da lista 2`;

    const html = markdownToHtml(markdown);

    expect(html).toContain('<h2>Primeiro Subtítulo</h2>');
    expect(html).toContain('<p>Este é um parágrafo com <strong>negrito</strong> e também <em>itálico</em>.</p>');
    expect(html).toContain('<h3>Segundo Subtítulo</h3>');
    expect(html).toContain('<blockquote><p>Uma citação relevante sobre a política goiana.</p></blockquote>');
    expect(html).toContain('<ul><li>Item da lista 1</li><li>Item da lista 2</li></ul>');
  });

  it('deve manter HTML existente intacto', () => {
    const originalHtml = '<p>Texto que já foi salvo pelo <strong>Tiptap</strong>.</p>';
    expect(markdownToHtml(originalHtml)).toBe(originalHtml);
  });
});


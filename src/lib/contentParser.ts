/**
 * Utilitário de conversão e normalização de conteúdo editorial.
 * Garante que textos salvos em Markdown ou texto puro sejam convertidos
 * para HTML estruturado para o editor Tiptap (WYSIWYG), garantindo que
 * o autor sempre veja o texto formatado visualmente, e nunca códigos como ## ou **.
 */

export function isHtml(str: string): boolean {
  return /<\s*(p|h1|h2|h3|h4|blockquote|ul|ol|li|strong|em|hr)[^>]*>/i.test(str);
}

/**
 * Converte Markdown ou texto com parágrafos em HTML semântico limpo para o Tiptap.
 */
export function markdownToHtml(content: string): string {
  if (!content || typeof content !== 'string') return '<p></p>';

  // Se já for HTML com tags de bloco, retorna direto
  if (isHtml(content)) {
    return content;
  }

  // Normaliza quebras de linha Windows/Unix
  const normalized = content.replace(/\r\n/g, '\n').trim();
  const blocks = normalized.split(/\n\n+/);

  const htmlBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';

    // Título H3
    if (trimmed.startsWith('### ')) {
      const text = parseInlineMarkdown(trimmed.replace(/^###\s+/, ''));
      return `<h3>${text}</h3>`;
    }

    // Título H2
    if (trimmed.startsWith('## ')) {
      const text = parseInlineMarkdown(trimmed.replace(/^##\s+/, ''));
      return `<h2>${text}</h2>`;
    }

    // Citação em Bloco (Blockquote)
    if (trimmed.startsWith('> ')) {
      const lines = trimmed
        .split('\n')
        .map((l) => l.replace(/^>\s*/, '').trim())
        .join(' ');
      const text = parseInlineMarkdown(lines);
      return `<blockquote><p>${text}</p></blockquote>`;
    }

    // Lista com Marcadores
    if (/^[-*]\s+/.test(trimmed)) {
      const items = trimmed
        .split('\n')
        .filter((line) => /^[-*]\s+/.test(line.trim()))
        .map((line) => {
          const itemText = parseInlineMarkdown(line.replace(/^[-*]\s+/, '').trim());
          return `<li>${itemText}</li>`;
        })
        .join('');
      return `<ul>${items}</ul>`;
    }

    // Lista Numerada
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed
        .split('\n')
        .filter((line) => /^\d+\.\s+/.test(line.trim()))
        .map((line) => {
          const itemText = parseInlineMarkdown(line.replace(/^\d+\.\s+/, '').trim());
          return `<li>${itemText}</li>`;
        })
        .join('');
      return `<ol>${items}</ol>`;
    }

    // Separador Horizontal
    if (/^_{3,}$|^-{3,}$|^\*{3,}$/.test(trimmed)) {
      return '<hr />';
    }

    // Parágrafo Padrão (linhas simples viram espaços ou quebras suaves)
    const paragraphText = trimmed
      .split('\n')
      .map((line) => parseInlineMarkdown(line))
      .join('<br />');

    return `<p>${paragraphText}</p>`;
  });

  return htmlBlocks.filter(Boolean).join('');
}

/**
 * Converte elementos inline: negrito, itálico, código e links.
 */
function parseInlineMarkdown(text: string): string {
  return text
    // Negrito: **texto** ou __texto__
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Itálico: *texto* ou _texto_
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Citação entre aspas curvas automáticas se aplicável
    .replace(/"([^"]*)"/g, '&ldquo;$1&rdquo;');
}


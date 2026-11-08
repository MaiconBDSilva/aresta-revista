import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitiza HTML vindo do editor (Tiptap) antes de renderizar com dangerouslySetInnerHTML,
 * mantendo apenas as tags e atributos editoriais seguros.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
  });
}

/**
 * Escapa caracteres HTML de texto bruto (Markdown legado) antes de aplicar a formatação inline.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


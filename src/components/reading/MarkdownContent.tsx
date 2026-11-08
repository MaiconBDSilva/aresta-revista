import React from 'react';
import { isHtml } from '@/lib/contentParser';

interface MarkdownContentProps {
  content: string;
}

/**
 * Renderizador editorial limpo e seguro para a Aresta Revista.
 * Suporta tanto HTML formatado gerado pelo editor Tiptap quanto
 * blocos em Markdown bruto para retrocompatibilidade.
 */
export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  // Se já for HTML (gerado e salvo pelo Tiptap), renderiza diretamente com tipografia editorial
  if (isHtml(content)) {
    return (
      <div
        className="space-y-6 leading-relaxed article-reading-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Subtítulo H3 / H2
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className="font-serif font-bold text-2xl text-[var(--color-ink-primary)] mt-10 mb-4 tracking-tight"
            >
              {trimmed.replace(/^###\s+/, '')}
            </h3>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="font-serif font-bold text-3xl text-[var(--color-ink-primary)] mt-12 mb-4 tracking-tight"
            >
              {trimmed.replace(/^##\s+/, '')}
            </h2>
          );
        }

        // Citação em bloco (Blockquote)
        if (trimmed.startsWith('> ')) {
          const quoteClean = trimmed.replace(/^>\s+/, '').replace(/^"/, '').replace(/"$/, '');
          return (
            <blockquote
              key={idx}
              className="my-8 py-4 px-6 border-l-4 rounded-r-lg font-serif italic text-xl md:text-2xl leading-relaxed bg-black/[0.02] dark:bg-white/[0.03]"
              style={{
                borderColor: 'var(--color-brand-accent)',
                color: 'var(--color-ink-primary)',
              }}
            >
              “{quoteClean}”
            </blockquote>
          );
        }

        // Lista numerada
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split('\n');
          return (
            <ol key={idx} className="list-decimal list-inside space-y-2.5 my-4 pl-2">
              {items.map((item, itemIdx) => {
                const itemContent = item.replace(/^\d+\.\s+/, '');
                return (
                  <li key={itemIdx} className="leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemContent) }} />
                  </li>
                );
              })}
            </ol>
          );
        }

        // Lista de marcadores
        if (/^[-*]\s+/.test(trimmed)) {
          const items = trimmed.split('\n');
          return (
            <ul key={idx} className="list-disc list-inside space-y-2.5 my-4 pl-2">
              {items.map((item, itemIdx) => {
                const itemContent = item.replace(/^[-*]\s+/, '');
                return (
                  <li key={itemIdx} className="leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemContent) }} />
                  </li>
                );
              })}
            </ul>
          );
        }

        // Parágrafo regular
        return (
          <p
            key={idx}
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
          />
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): string {
  return text
    // Negrito **texto**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[var(--color-ink-primary)]">$1</strong>')
    // Itálico *texto*
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Código inline `código`
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-xs font-mono">$1</code>');
}


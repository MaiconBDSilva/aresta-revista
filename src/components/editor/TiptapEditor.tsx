'use client';

import React, { useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { markdownToHtml } from '@/lib/contentParser';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Minus,
  Undo,
  Redo,
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (htmlContent: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = 'Comece a escrever seu ensaio ou crônica aqui...',
  editable = true,
}: TiptapEditorProps) {
  // Converte Markdown ou texto de entrada para HTML estruturado para que o Tiptap
  // renderize os blocos formatados visualmente desde o primeiro instante
  const formattedInitialContent = useMemo(() => {
    return markdownToHtml(content);
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: formattedInitialContent,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-editable focus:outline-none',
      },
    },
    onUpdate: ({ editor: ed }) => {
      // Retorna o HTML formatado e semântico
      onChange(ed.getHTML());
    },
  });

  // Atualiza se o prop content mudar externamente
  useEffect(() => {
    if (editor) {
      const htmlEsperado = markdownToHtml(content);
      const htmlAtual = editor.getHTML();
      if (htmlEsperado !== htmlAtual && content !== htmlAtual) {
        editor.commands.setContent(htmlEsperado, { emitUpdate: false });
      }
    }
  }, [content, editor]);

  // Atualiza editable
  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) {
    return (
      <div className="min-h-[420px] flex items-center justify-center border border-border-subtle rounded-xl bg-paper-card">
        <span className="text-sm text-ink-muted animate-pulse font-serif">Carregando editor editorial...</span>
      </div>
    );
  }

  return (
    <div className="tiptap-editor-container">
      {/* Barra de Ferramentas Editorial */}
      {editable && (
        <div className="tiptap-toolbar">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`tiptap-toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
            title="Negrito (Ctrl+B)"
            aria-label="Negrito"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`tiptap-toolbar-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
            title="Itálico (Ctrl+I)"
            aria-label="Itálico"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-border-subtle mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`tiptap-toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
            title="Subtítulo Principal (H2)"
            aria-label="Subtítulo H2"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`tiptap-toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
            title="Intertítulo Secundário (H3)"
            aria-label="Intertítulo H3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-border-subtle mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`tiptap-toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
            title="Citação em Destaque"
            aria-label="Citação em Destaque"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`tiptap-toolbar-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            title="Lista com Marcadores"
            aria-label="Lista com Marcadores"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`tiptap-toolbar-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            title="Lista Numerada"
            aria-label="Lista Numerada"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="tiptap-toolbar-btn"
            title="Separador Ornamental"
            aria-label="Separador Ornamental"
          >
            <Minus className="w-4 h-4" />
          </button>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="tiptap-toolbar-btn disabled:opacity-30"
              title="Desfazer"
              aria-label="Desfazer"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="tiptap-toolbar-btn disabled:opacity-30"
              title="Refazer"
              aria-label="Refazer"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo Renderizado do Editor com Tipografia Editorial */}
      <div className="tiptap-editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

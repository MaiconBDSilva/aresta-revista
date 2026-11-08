import type { Metadata } from 'next';
import { ArticleEditorLoader } from '@/components/editor/ArticleEditorLoader';

interface EditorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Editar Artigo | Painel do Colunista',
  robots: { index: false, follow: false },
};

export default async function EditorArtigoPage({ params }: EditorPageProps) {
  const { id } = await params;

  // A busca ocorre no navegador para enxergar artigos criados/editados no banco mock local.
  return <ArticleEditorLoader artigoId={id} />;
}

import { Metadata } from 'next';
import { ArticleEditorView } from '@/components/editor/ArticleEditorView';

export const metadata: Metadata = {
  title: 'Novo Ensaio | Painel do Colunista',
  description: 'Redija um novo ensaio autoral ou crônica para a Aresta Revista.',
};

export default function NovoArtigoPage() {
  return <ArticleEditorView modoNovo={true} />;
}


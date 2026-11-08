import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtigoById } from '@/services/artigosService';
import { ArticleEditorView } from '@/components/editor/ArticleEditorView';

interface EditorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: EditorPageProps): Promise<Metadata> {
  const { id } = await params;
  const artigo = await getArtigoById(id);

  if (!artigo) {
    return {
      title: 'Artigo Não Encontrado | Aresta Revista',
    };
  }

  return {
    title: `Editar: ${artigo.titulo} | Painel do Colunista`,
    description: artigo.subtitulo_lead,
  };
}

export default async function EditorArtigoPage({ params }: EditorPageProps) {
  const { id } = await params;
  const artigo = await getArtigoById(id);

  if (!artigo) {
    notFound();
  }

  return <ArticleEditorView artigoInicial={artigo} modoNovo={false} />;
}


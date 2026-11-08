import type { Categoria } from '@/types/artigo.types';

export const CATEGORIAS_MOCK: Categoria[] = [
  {
    id: 1,
    nome: 'Política',
    slug: 'politica',
    descricao: 'Debates contemporâneos sobre poder, conjuntura institucional, direitos civis e políticas públicas no Brasil e em Goiás.',
    cor_acento: '#1E3A8A',
    ordem_exibicao: 1,
    ativo: true,
  },
  {
    id: 2,
    nome: 'Cultura',
    slug: 'cultura',
    descricao: 'Literatura, artes visuais, cinema de autor, patrimônio histórico, memória e reflexão estética.',
    cor_acento: '#854D0E',
    ordem_exibicao: 2,
    ativo: true,
  },
  {
    id: 3,
    nome: 'Entretenimento',
    slug: 'entretenimento',
    descricao: 'Análises sobre streaming, cinema de grande público, música contemporânea, televisão e cibercultura.',
    cor_acento: '#701A75',
    ordem_exibicao: 3,
    ativo: true,
  },
  {
    id: 4,
    nome: 'Ensaios',
    slug: 'ensaios',
    descricao: 'Artigos de fundo, debates teóricos aprofundados, filosofia, sociologia e grandes reflexões críticas.',
    cor_acento: '#9A3412',
    ordem_exibicao: 4,
    ativo: true,
  },
  {
    id: 5,
    nome: 'Esporte',
    slug: 'esporte',
    descricao: 'O esporte como espelho da sociedade, paixão coletiva, crônica de arquibancada e identidade cultural.',
    cor_acento: '#0F766E',
    ordem_exibicao: 5,
    ativo: true,
  },
];


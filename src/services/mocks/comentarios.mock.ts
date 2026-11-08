import type { ArtigoComentarioPublico } from '@/types/artigo.types';

export const COMENTARIOS_MOCK: ArtigoComentarioPublico[] = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    artigo_id: 'b0000000-0000-0000-0000-000000000001',
    leitor_id: 'l0000000-0000-0000-0000-000000000001',
    conteudo: 'Excelente reflexão sobre o Urucuia. Aqui em Cristalina o rebaixamento do lençol freático já é visível até nos poços artesianos residenciais.',
    ativo: true,
    criado_em: '2026-11-05T14:20:00Z',
    leitor: {
      id: 'l0000000-0000-0000-0000-000000000001',
      nome: 'Mariana Mendonça',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    },
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    artigo_id: 'b0000000-0000-0000-0000-000000000001',
    leitor_id: 'l0000000-0000-0000-0000-000000000002',
    conteudo: 'A questão das outorgas na Semad precisa urgentemente de uma revisão técnica sem pressões de bancada. Parabéns ao Lucas pela coragem do texto.',
    ativo: true,
    criado_em: '2026-11-05T16:45:00Z',
    leitor: {
      id: 'l0000000-0000-0000-0000-000000000002',
      nome: 'Eduardo Silveira',
      avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80',
    },
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    artigo_id: 'b0000000-0000-0000-0000-000000000002',
    leitor_id: 'l0000000-0000-0000-0000-000000000003',
    conteudo: 'A arquitetura de Goiânia é uma das mais ricas e menos compreendidas do país. O Danillo conseguiu traduzir a alma do centro histórico.',
    ativo: true,
    criado_em: '2026-11-04T18:10:00Z',
    leitor: {
      id: 'l0000000-0000-0000-0000-000000000003',
      nome: 'Carolina Peixoto',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    },
  },
];


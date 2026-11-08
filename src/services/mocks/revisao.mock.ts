import type { ArtigoRevisaoComentario } from '@/types/revisao.types';
import { PERFIS_AUTORES_MOCK } from './autores.mock';

export const REVISAO_COMENTARIOS_MOCK: ArtigoRevisaoComentario[] = [
  {
    id: 'rev-001',
    artigo_id: 'b0000000-0000-0000-0000-000000000015', // Artigo do Lucas em edição
    autor_comentario_id: PERFIS_AUTORES_MOCK[1].id, // Danillo Reis
    autor_nome: PERFIS_AUTORES_MOCK[1].nome,
    autor_avatar_url: PERFIS_AUTORES_MOCK[1].avatar_url,
    trecho_selecionado: 'mudança do princípio de origem para o princípio de destino da arrecadação',
    conteudo: 'Lucas, excelente ponto. Vale citar brevemente o prazo de transição de 50 anos previsto para a distribuição federativa para tranquilizar o leitor sobre a velocidade do impacto.',
    resolvido: false,
    criado_em: '2026-11-06T15:30:00Z',
  },
  {
    id: 'rev-002',
    artigo_id: 'b0000000-0000-0000-0000-000000000015', // Artigo do Lucas em edição
    autor_comentario_id: PERFIS_AUTORES_MOCK[3].id, // Lara Lima
    autor_nome: PERFIS_AUTORES_MOCK[3].nome,
    autor_avatar_url: PERFIS_AUTORES_MOCK[3].avatar_url,
    trecho_selecionado: null,
    conteudo: 'O lead está muito claro e direto. O título também tem bastante apelo para debate público.',
    resolvido: true,
    criado_em: '2026-11-06T16:15:00Z',
  },
  {
    id: 'rev-003',
    artigo_id: 'b0000000-0000-0000-0000-000000000016', // Artigo do Danillo em edição
    autor_comentario_id: PERFIS_AUTORES_MOCK[0].id, // Lucas Campos
    autor_nome: PERFIS_AUTORES_MOCK[0].nome,
    autor_avatar_url: PERFIS_AUTORES_MOCK[0].avatar_url,
    trecho_selecionado: 'tombamento tipográfico como patrimônio imaterial',
    conteudo: 'Danillo, acho que caberia cruzar com a lei municipal de ordenamento da paisagem urbana de Goiânia, que às vezes força a retirada dessas placas.',
    resolvido: false,
    criado_em: '2026-11-07T15:00:00Z',
  },
];


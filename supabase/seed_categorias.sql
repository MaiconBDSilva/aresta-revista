-- ==============================================================================
-- ARESTA REVISTA - SEED DAS 5 GRANDES EDITORIAS OFICIAIS
-- Arquivo: supabase/seed_categorias.sql
-- ==============================================================================

INSERT INTO public.categorias (nome, slug, descricao, cor_acento, ordem_exibicao, ativo)
VALUES
    (
        'Política',
        'politica',
        'Debates contemporâneos sobre poder, conjuntura institucional, direitos civis e políticas públicas.',
        '#1E3A8A',
        1,
        true
    ),
    (
        'Cultura',
        'cultura',
        'Literatura, artes visuais, cinema de autor, música, teatro, memória e reflexão estética.',
        '#854D0E',
        2,
        true
    ),
    (
        'Entretenimento',
        'entretenimento',
        'Análises sobre streaming, cinema de grande público, séries, televisão e fenômenos da cultura digital.',
        '#701A75',
        3,
        true
    ),
    (
        'Ensaios',
        'ensaios',
        'Artigos de fundo, debates teóricos aprofundados e grandes reflexões críticas.',
        '#9A3412',
        4,
        true
    ),
    (
        'Esporte',
        'esporte',
        'O esporte como espelho da sociedade, paixão coletiva e manifestação cultural.',
        '#0F766E',
        5,
        true
    )
ON CONFLICT (slug) DO UPDATE
SET
    nome = EXCLUDED.nome,
    descricao = EXCLUDED.descricao,
    cor_acento = EXCLUDED.cor_acento,
    ordem_exibicao = EXCLUDED.ordem_exibicao,
    ativo = EXCLUDED.ativo;

-- ==============================================================================
-- ARESTA REVISTA - SEED DAS 6 GRANDES EDITORIAS OFICIAIS
-- Arquivo: supabase/seed_categorias.sql
-- ==============================================================================

INSERT INTO public.categorias (nome, slug, descricao, cor_acento, ordem_exibicao, ativo)
VALUES
    (
        'Política & Poder',
        'politica',
        'Debates contemporâneos sobre poder, conjuntura institucional, direitos civis e políticas públicas.',
        '#1E3A8A',
        1,
        true
    ),
    (
        'Cultura & Artes',
        'cultura',
        'Literatura, artes visuais, cinema de autor, música, teatro, memória e reflexão estética.',
        '#854D0E',
        2,
        true
    ),
    (
        'Entretenimento & Pop',
        'entretenimento',
        'Análises sobre streaming, cinema de grande público, séries, televisão e fenômenos da cultura digital.',
        '#701A75',
        3,
        true
    ),
    (
        'Subjetividades',
        'subjetividades',
        'Crônicas de vivência, psicanálise, comportamento, memórias, intimismo e reflexões da vida cotidiana.',
        '#065F46',
        4,
        true
    ),
    (
        'Opinião & Ensaios',
        'opiniao',
        'Artigos de fundo, debates teóricos aprofundados e grandes reflexões reflexivas.',
        '#9A3412',
        5,
        true
    ),
    (
        'Esporte & Sociedade',
        'esporte',
        'Análises culturais e humanas do esporte, futebol, bastidores e impacto social.',
        '#0F766E',
        6,
        true
    )
ON CONFLICT (slug) DO UPDATE
SET
    nome = EXCLUDED.nome,
    descricao = EXCLUDED.descricao,
    cor_acento = EXCLUDED.cor_acento,
    ordem_exibicao = EXCLUDED.ordem_exibicao,
    ativo = EXCLUDED.ativo;

-- ==============================================================================
-- ARESTA REVISTA - SCHEMA INICIAL DO BANCO DE DADOS (SUPABASE / POSTGRESQL)
-- Arquivo: supabase/migrations/20261107_init_schema.sql
-- ==============================================================================

-- 1. ENUMS DE DOMÍNIO
-- Regra de Domínio: Todo 'autor' possui automaticamente privilégios de 'admin' e tem uma coluna obrigatória;
-- Já o papel 'admin' representa um administrador que não é colunista (nem todo admin é autor).
DO $$ BEGIN
    CREATE TYPE public.papel_usuario AS ENUM ('leitor', 'autor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.status_artigo AS ENUM ('edicao', 'publicado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABELA: PERFIS (Vinculada a auth.users)
CREATE TABLE IF NOT EXISTS public.perfis (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome VARCHAR(120) NOT NULL,
    slug VARCHAR(140) UNIQUE NOT NULL,
    papel public.papel_usuario NOT NULL DEFAULT 'leitor',
    avatar_url TEXT,
    bio TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    linkedin_url TEXT,
    website_url TEXT,
    email VARCHAR(255) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. TABELA: COLUNAS (Todo autor possui obrigatoriamente uma coluna exclusiva - /coluna-arquivo/[slug])
CREATE TABLE IF NOT EXISTS public.colunas (
    id SERIAL PRIMARY KEY,
    autor_id UUID NOT NULL UNIQUE REFERENCES public.perfis(id) ON DELETE RESTRICT,
    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    manifesto_slogan VARCHAR(280) NOT NULL,
    capa_banner_url TEXT,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. TABELA: CATEGORIAS (As 6 Editorias da Revista)
CREATE TABLE IF NOT EXISTS public.categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    slug VARCHAR(80) UNIQUE NOT NULL,
    descricao TEXT,
    cor_acento VARCHAR(20) DEFAULT '#B91C1C',
    ordem_exibicao INTEGER NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. TABELA: TAGS (Marcadores Livres)
CREATE TABLE IF NOT EXISTS public.tags (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    slug VARCHAR(60) UNIQUE NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. TABELA: ARTIGOS (Status: 'edicao' ou 'publicado')
-- Somente o autor original (autor_id) pode alterar o texto e mudar para 'publicado'.
CREATE TABLE IF NOT EXISTS public.artigos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    autor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE RESTRICT,
    coluna_id INTEGER NOT NULL REFERENCES public.colunas(id) ON DELETE RESTRICT,
    categoria_id INTEGER NOT NULL REFERENCES public.categorias(id) ON DELETE RESTRICT,
    titulo VARCHAR(140) NOT NULL,
    slug VARCHAR(160) UNIQUE NOT NULL,
    subtitulo_lead VARCHAR(280) NOT NULL,
    conteudo TEXT NOT NULL,
    imagem_capa_url TEXT,
    legenda_capa VARCHAR(255),
    creditos_capa VARCHAR(120),
    tempo_leitura_min INTEGER NOT NULL DEFAULT 1,
    status public.status_artigo NOT NULL DEFAULT 'edicao',
    publicado_em TIMESTAMPTZ,
    eh_destaque_hero BOOLEAN NOT NULL DEFAULT false,
    eh_destaque_secao BOOLEAN NOT NULL DEFAULT false,
    visualizacoes INTEGER NOT NULL DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. TABELA: ARTIGO_TAGS (Relacionamento N:N)
CREATE TABLE IF NOT EXISTS public.artigo_tags (
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (artigo_id, tag_id)
);

-- 8. TABELA: ARTIGO_REVISAO_COMENTARIOS (Sugestões de outros autores e admins em textos em 'edicao')
CREATE TABLE IF NOT EXISTS public.artigo_revisao_comentarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    autor_comentario_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    trecho_selecionado TEXT,
    conteudo TEXT NOT NULL,
    resolvido BOOLEAN NOT NULL DEFAULT false,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. TABELA: ARTIGO_COMENTARIOS (Comentários públicos de leitores em artigos publicados)
CREATE TABLE IF NOT EXISTS public.artigo_comentarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    leitor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. TABELA: NEWSLETTER_ASSINANTES
CREATE TABLE IF NOT EXISTS public.newsletter_assinantes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. TABELA: COLUNA_SEGUIDORES
CREATE TABLE IF NOT EXISTS public.coluna_seguidores (
    coluna_id INTEGER NOT NULL REFERENCES public.colunas(id) ON DELETE CASCADE,
    leitor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (coluna_id, leitor_id)
);

-- 12. TABELA: LEITORES_FAVORITOS (Salvos para ler depois)
CREATE TABLE IF NOT EXISTS public.leitores_favoritos (
    leitor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (leitor_id, artigo_id)
);

-- 13. ÍNDICES DE PERFORMANCE E INTEGRIDADE
CREATE INDEX IF NOT EXISTS idx_artigos_status_publicado ON public.artigos(status, publicado_em DESC);
CREATE INDEX IF NOT EXISTS idx_artigos_categoria ON public.artigos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_artigos_coluna ON public.artigos(coluna_id);
CREATE INDEX IF NOT EXISTS idx_artigos_autor ON public.artigos(autor_id);
CREATE INDEX IF NOT EXISTS idx_artigos_slug ON public.artigos(slug);
CREATE INDEX IF NOT EXISTS idx_colunas_slug ON public.colunas(slug);
CREATE INDEX IF NOT EXISTS idx_perfis_slug ON public.perfis(slug);
CREATE INDEX IF NOT EXISTS idx_revisao_comentarios_artigo ON public.artigo_revisao_comentarios(artigo_id, criado_em ASC);

-- Garante que apenas 1 artigo por vez seja a Manchete Hero
CREATE UNIQUE INDEX IF NOT EXISTS idx_unico_artigo_hero
ON public.artigos (eh_destaque_hero) WHERE (eh_destaque_hero = true);

-- 14. FUNÇÃO E TRIGGER: ATUALIZAR TIMESTAMP DE MODIFICAÇÃO
CREATE OR REPLACE FUNCTION public.set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_atualizado_em_perfis ON public.perfis;
CREATE TRIGGER trigger_set_atualizado_em_perfis
    BEFORE UPDATE ON public.perfis
    FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

DROP TRIGGER IF EXISTS trigger_set_atualizado_em_colunas ON public.colunas;
CREATE TRIGGER trigger_set_atualizado_em_colunas
    BEFORE UPDATE ON public.colunas
    FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

DROP TRIGGER IF EXISTS trigger_set_atualizado_em_artigos ON public.artigos;
CREATE TRIGGER trigger_set_atualizado_em_artigos
    BEFORE UPDATE ON public.artigos
    FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

-- 15. FUNÇÕES AUXILIARES DE SEGURANÇA (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.obter_papel_usuario_atual()
RETURNS public.papel_usuario
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT papel FROM public.perfis WHERE id = auth.uid();
$$;

-- Verifica se o usuário tem privilégios administrativos (todo 'autor' também é 'admin')
CREATE OR REPLACE FUNCTION public.eh_admin_ou_autor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.perfis
        WHERE id = auth.uid() AND papel IN ('autor', 'admin')
    );
$$;

CREATE OR REPLACE FUNCTION public.incrementar_visualizacao_artigo(p_artigo_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.artigos
    SET visualizacoes = visualizacoes + 1
    WHERE id = p_artigo_id AND status = 'publicado';
END;
$$;

-- Função para Admin ou Autor (já que todo autor é admin) definir o destaque Hero sem tocar no texto do autor
CREATE OR REPLACE FUNCTION public.definir_destaque_hero(p_artigo_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT public.eh_admin_ou_autor() THEN
        RAISE EXCEPTION 'Apenas administradores e autores podem alterar a manchete Hero.';
    END IF;

    UPDATE public.artigos SET eh_destaque_hero = false WHERE eh_destaque_hero = true;
    UPDATE public.artigos SET eh_destaque_hero = true WHERE id = p_artigo_id AND status = 'publicado';
END;
$$;

-- 16. ATIVAÇÃO DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colunas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artigos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artigo_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artigo_revisao_comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artigo_comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_assinantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coluna_seguidores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leitores_favoritos ENABLE ROW LEVEL SECURITY;

-- 17. POLÍTICAS RLS COMPLETAS (Considerando que todo autor é admin, mas só o autor original edita seu texto)
-- Categorias & Tags & Colunas
CREATE POLICY "Leitura pública categorias" ON public.categorias FOR SELECT USING (true);
CREATE POLICY "Admin ou autor gerencia categorias" ON public.categorias FOR ALL USING (public.eh_admin_ou_autor());

CREATE POLICY "Leitura pública tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Autores e admins criam tags" ON public.tags FOR INSERT WITH CHECK (public.eh_admin_ou_autor());

CREATE POLICY "Leitura pública colunas" ON public.colunas FOR SELECT USING (true);
CREATE POLICY "Autor ou admin gerencia colunas" ON public.colunas FOR ALL USING (public.eh_admin_ou_autor());

-- Perfis
CREATE POLICY "Leitura pública perfis" ON public.perfis FOR SELECT USING (true);
CREATE POLICY "Usuário ou admin atualiza perfil" ON public.perfis FOR UPDATE USING (auth.uid() = id OR public.eh_admin_ou_autor());

-- Artigos:
-- 1) Público vê 'publicado'; Autores e Admins veem também todos os artigos em 'edicao'
CREATE POLICY "Leitura artigos publicados ou em edicao para equipe" ON public.artigos
    FOR SELECT USING (
        status = 'publicado'
        OR public.eh_admin_ou_autor()
    );

-- 2) Somente usuários com papel 'autor' (titulares de coluna) criam artigos, e somente o autor original modifica e publica seu artigo
CREATE POLICY "Autor cria próprios artigos" ON public.artigos
    FOR INSERT WITH CHECK (auth.uid() = autor_id AND public.obter_papel_usuario_atual() = 'autor');

CREATE POLICY "Somente autor original modifica e publica seu artigo" ON public.artigos
    FOR UPDATE USING (auth.uid() = autor_id)
    WITH CHECK (auth.uid() = autor_id);

CREATE POLICY "Somente autor original exclui seu artigo" ON public.artigos
    FOR DELETE USING (auth.uid() = autor_id);

-- Artigo Tags
CREATE POLICY "Leitura artigo_tags" ON public.artigo_tags FOR SELECT USING (true);
CREATE POLICY "Autor gerencia tags do próprio artigo" ON public.artigo_tags
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.artigos a WHERE a.id = artigo_id AND a.autor_id = auth.uid())
    );

-- Comentários Internos de Revisão (Textos em Edição - Autores e Admins)
CREATE POLICY "Autores e admins leem sugestões em edicao" ON public.artigo_revisao_comentarios
    FOR SELECT USING (public.eh_admin_ou_autor());

CREATE POLICY "Autores e admins comentam sugestões em edicao" ON public.artigo_revisao_comentarios
    FOR INSERT WITH CHECK (
        auth.uid() = autor_comentario_id
        AND public.eh_admin_ou_autor()
    );

CREATE POLICY "Autor do artigo ou autor do comentário marca sugestão como resolvida" ON public.artigo_revisao_comentarios
    FOR UPDATE USING (
        auth.uid() = autor_comentario_id
        OR EXISTS (SELECT 1 FROM public.artigos a WHERE a.id = artigo_id AND a.autor_id = auth.uid())
    );

-- Comentários Públicos de Leitores
CREATE POLICY "Leitura pública comentários ativos" ON public.artigo_comentarios
    FOR SELECT USING (ativo = true OR public.eh_admin_ou_autor());

CREATE POLICY "Leitor autenticado comenta" ON public.artigo_comentarios
    FOR INSERT WITH CHECK (auth.uid() = leitor_id);

CREATE POLICY "Leitor, autor ou admin remove comentário" ON public.artigo_comentarios
    FOR DELETE USING (auth.uid() = leitor_id OR public.eh_admin_ou_autor());

-- Newsletter, Seguidores e Favoritos
CREATE POLICY "Inserção newsletter pública" ON public.newsletter_assinantes FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin ou autor lê assinantes newsletter" ON public.newsletter_assinantes FOR SELECT USING (public.eh_admin_ou_autor());

CREATE POLICY "Leitor gerencia colunas seguidas" ON public.coluna_seguidores
    FOR ALL USING (auth.uid() = leitor_id) WITH CHECK (auth.uid() = leitor_id);

CREATE POLICY "Leitor gerencia próprios favoritos" ON public.leitores_favoritos
    FOR ALL USING (auth.uid() = leitor_id) WITH CHECK (auth.uid() = leitor_id);

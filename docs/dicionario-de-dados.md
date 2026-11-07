# 📖 Dicionário de Dados & Tokens do Sistema | Aresta Revista

> **Arquivo:** `docs/dicionario-de-dados.md`  
> **Finalidade:** Fonte única da verdade para Design Tokens (`src/styles/theme.css`), Catálogo Oficial de Classes Semânticas CSS (com definição e mapeamento de onde cada classe será utilizada), esquemas de tabelas PostgreSQL/Supabase, enums, contratos TypeScript e políticas RLS.  
> **Regra Obrigatória:** Qualquer adição de coluna no banco, nova classe CSS semântica ou novo contrato TypeScript **DEVE** ser documentada neste dicionário antes de ser considerada concluída.  
> **Última Atualização:** 07/11/2026

---

## 📑 Sumário

- [1. Dicionário de Design Tokens & Classes CSS Semânticas](#1-dicionário-de-design-tokens--classes-css-semânticas)
  - [1.1 Paleta de Cores Editorial (`src/styles/theme.css`)](#11-paleta-de-cores-editorial-srcstylesthemecss)
  - [1.2 Tipografia Centralizada](#12-tipografia-centralizada)
  - [1.3 Catálogo Oficial de Classes Semânticas (Regra Anti-Class Boom)](#13-catálogo-oficial-de-classes-semânticas-regra-anti-class-boom)
- [2. Esquema do Banco de Dados (PostgreSQL / Supabase)](#2-esquema-do-banco-de-dados-postgresql--supabase)
  - [2.1 Tabela `perfis`](#21-tabela-perfis)
  - [2.2 Tabela `colunas`](#22-tabela-colunas)
  - [2.3 Tabela `categorias` (As 6 Editorias)](#23-tabela-categorias-as-6-editorias)
  - [2.4 Tabela `tags`](#24-tabela-tags)
  - [2.5 Tabela `artigos`](#25-tabela-artigos)
  - [2.6 Tabela `artigo_tags`](#26-tabela-artigo_tags)
  - [2.7 Tabela `artigo_revisao_comentarios` (Sugestões Internas em Edição)](#27-tabela-artigo_revisao_comentarios-sugestões-internas-em-edição)
  - [2.8 Tabela `artigo_comentarios` (Comentários Públicos de Leitores)](#28-tabela-artigo_comentarios-comentários-públicos-de-leitores)
  - [2.9 Tabela `newsletter_assinantes`](#29-tabela-newsletter_assinantes)
  - [2.10 Tabela `coluna_seguidores`](#210-tabela-coluna_seguidores)
  - [2.11 Tabela `leitores_favoritos`](#211-tabela-leitores_favoritos)
- [3. Dicionário de Enums e Estados de Domínio](#3-dicionário-de-enums-e-estados-de-domínio)
- [4. Dicionário de Contratos TypeScript (`src/types/`)](#4-dicionário-de-contratos-typescript-srctypes)
- [5. Expressões Regulares (RegEx) & Validações](#5-expressões-regulares-regex--validações)
- [6. Funções PostgreSQL (`SECURITY DEFINER`), Índices & Políticas RLS](#6-funções-postgresql-security-definer-índices--políticas-rls)

---

## 1. Dicionário de Design Tokens & Classes CSS Semânticas

Todas as cores e variáveis visuais do sistema são parametrizadas no arquivo central `src/styles/theme.css` via CSS Custom Properties. A cor de destaque da marca é unificada no **vermelho carmim (`#B91C1C`)**.

### 1.1 Paleta de Cores Editorial (`src/styles/theme.css`)

| Token Semântico | Variável CSS | HEX (Claro) | HEX (Noturno `.dark`) | Tailwind Class | Finalidade / Regra de Uso |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Ink Primary** | `--color-ink-primary` | `#111827` | `#FBFBF9` | `text-ink-primary`, `bg-ink-primary` | Preto tipográfico profundo para títulos, manchetes e logotipo `aresta.`. |
| **Ink Secondary** | `--color-ink-secondary` | `#374151` | `#D4D4D8` | `text-ink-secondary` | Corpo de leitura de artigos de longa duração (alto contraste sem fadiga visual). |
| **Ink Muted** | `--color-ink-muted` | `#6B7280` | `#A1A1AA` | `text-ink-muted` | Metadados, tempo de leitura, datas, legendas de imagens e notas de rodapé. |
| **Paper Background** | `--color-paper-bg` | `#FBFBF9` | `#09090B` | `bg-paper-bg` | Fundo principal da revista (papel linho no modo claro; carvão no modo escuro). |
| **Paper Surface** | `--color-paper-surface` | `#FFFFFF` | `#18181B` | `bg-paper-surface` | Superfície de cartões, gavetas de navegação, painéis e modais. |
| **Brand Accent (Carmim)** | `--color-brand-accent` | `#B91C1C` | `#DC2626` | `text-brand-accent`, `bg-brand-accent` | **Cor central de destaque da marca.** Usada no ponto final de `aresta.`, barra de progresso de leitura, kickers de seção e botões nobres. |
| **Brand Accent Hover** | `--color-brand-accent-hover` | `#991B1B` | `#B91C1C` | `bg-brand-accent-hover` | Estados de hover/active para botões e links em vermelho carmim. |
| **Category Política** | `--color-cat-politica` | `#1E3A8A` | `#3B82F6` | `text-cat-politica` | Azul sóbrio para a editoria de Política & Poder. |
| **Category Cultura** | `--color-cat-cultura` | `#854D0E` | `#D97706` | `text-cat-cultura` | Âmbar terroso para Cultura & Artes. |
| **Category Entretenimento** | `--color-cat-entretenimento` | `#701A75` | `#C026D3` | `text-cat-entretenimento` | Roxo fúcsia refinado para Entretenimento & Pop. |
| **Category Subjetividades** | `--color-cat-subjetividades` | `#065F46` | `#10B981` | `text-cat-subjetividades` | Verde esmeralda profundo para Subjetividades. |
| **Category Opinião** | `--color-cat-opiniao` | `#9A3412` | `#F97316` | `text-cat-opiniao` | Laranja ferrugem/terracota para Opinião & Ensaios. |
| **Category Esporte** | `--color-cat-esporte` | `#0F766E` | `#14B8A6` | `text-cat-esporte` | Verde petróleo para Esporte & Sociedade. |
| **Border Subtle** | `--color-border-subtle` | `#E5E7EB` | `#27272A` | `border-border-subtle` | Fios de corte tipográficos e bordas divisórias sutis. |

---

### 1.2 Tipografia Centralizada

| Token Tipográfico | Variável CSS | Família Tipográfica | Pesos | Finalidade |
| :--- | :--- | :--- | :--- | :--- |
| **Font Serif** | `--font-serif` | `'Newsreader', 'Playfair Display', Georgia, serif` | 400, 500, 600, 700 | Logotipo `aresta.`, manchetes, títulos de artigos e citações de destaque. |
| **Font Sans** | `--font-sans` | `'Plus Jakarta Sans', system-ui, sans-serif` | 400, 500, 600, 700 | Interface do usuário, navegação, botões, metadados e formulários. |
| **Font Reading** | `--font-reading` | `'Lora', 'Charter', Georgia, serif` | 400, 400i, 600 | Corpo dos textos das colunas (otimizada para leitura confortável e ritmo visual). |

---

### 1.3 Catálogo Oficial de Classes Semânticas (Regra Anti-Class Boom)

> **Regra Obrigatória:** É proibido aninhar longas cadeias utilitárias inline (`className="..."`) nos componentes JSX. Utilize as classes semânticas definidas e comentadas abaixo:

#### A. Primitivas Editoriais Universais (`src/styles/components/primitives.css`)

| Classe Semântica | Definição Visual | Onde Será Utilizada (Telas e Componentes) |
| :--- | :--- | :--- |
| `.card-article` | Card editorial limpo com imagem 16:9, badge de editoria, título serifado, lead truncado e assinatura compacta. | • Feeds de editorias na Capa (`/`)<br>• Páginas de editoria (`/editoria/[slug]`)<br>• Acervo da coluna (`/coluna-arquivo/[slug]`)<br>• Resultados de busca (`/busca`) |
| `.card-featured` | Variação de destaque com moldura sutil, fundo `--color-paper-surface` e tipografia ampliada. | • Manchete Principal (*Hero*) e os 2 apoios secundários da Capa (`/`)<br>• Destaque de topo no perfil do colunista (`/autor/[slug]`) |
| `.card-compact` | Card horizontal/ enxuto sem imagem grande, focado em título, nome da coluna e tempo de leitura. | • Listagens laterais de "Mais Lidas"<br>• Rodapé de recomendações ao final do artigo (`/coluna/[slug]`)<br>• Listagem de artigos no `/painel` e `/admin` |
| `.card-columnist` | Cartão autoral exibindo avatar redondo do colunista, nome da coluna em destaque, slogan/manifesto e link para o último texto. | • Vitrine horizontal *"Últimas das Colunas"* na Capa (`/`)<br>• Cabeçalho do acervo (`/coluna-arquivo/[slug]`)<br>• Bloco de vínculo da coluna no perfil (`/autor/[slug]`) |
| `.title-display` | Manchete de impacto máximo em `--font-serif` (`2.25rem` mobile a `3.5rem` desktop, `line-height: 1.1`). | • Título do *Hero Article* na Capa (`/`)<br>• Cabeçalho principal do acervo da coluna (`/coluna-arquivo/[slug]`) |
| `.title-article` | Título nobre de leitura em `--font-serif` (`1.875rem` a `2.75rem`, `line-height: 1.15`). | • Topo da página de leitura do artigo (`/coluna/[slug]`)<br>• Pré-visualização de texto em edição no `/painel` e `/admin` |
| `.title-section` | Título de divisão de seção com fio superior e acento carmim (`1.35rem` a `1.85rem`). | • Cabeçalhos dos blocos das 6 Editorias na Capa (`/`)<br>• Títulos de seções no `/painel` e na Mesa Editorial (`/admin`) |
| `.text-lead` | Subtítulo / linha-fina com `--font-sans` ou serifa leve (`1.125rem` a `1.25rem`, cor `--color-ink-secondary`, `line-height: 1.6`). | • Abaixo do título em `/coluna/[slug]`<br>• Abaixo da manchete principal no `HeroArticle` (`/`) |
| `.text-body-reading` | Corpo de leitura imersiva em `--font-reading` (`1.125rem` / 18px padrão, `line-height: 1.75`, `max-w-[68ch]`). Suporta modificadores `.font-size-sm` (16px), `.font-size-md` (18px) e `.font-size-lg` (21px). | • Corpo do artigo em `/coluna/[slug]` (`ArticleBody.tsx`)<br>• Área de escrita e pré-visualização do `TiptapEditor.tsx` em `/painel/editor` |
| `.text-caption` | Texto auxiliar discreto em `--font-sans` (`0.75rem` a `0.875rem`, cor `--color-ink-muted`). | • Datas de publicação, tempo de leitura (`5 min de leitura`), legendas e créditos fotográficos de capa |
| `.section-kicker` | Rótulo pré-título em caixa alta (`0.75rem`, `font-weight: 700`, `letter-spacing: 0.08em`, cor `--color-brand-accent`). | • Acima de títulos de seções na Capa (`/`)<br>• Identificador do nome da Coluna acima do título do artigo |
| `.badge-category` | Pílula temática de editoria com modificadores `.badge-politica`, `.badge-cultura`, `.badge-entretenimento`, `.badge-subjetividades`, `.badge-opiniao` e `.badge-esporte`. | • Cards de artigos (`HeroArticle`, `CategoryFeed`)<br>• Topo do artigo (`/coluna/[slug]`)<br>• Card dinâmico Open Graph (`/api/og`) |
| `.badge-tag` | Pílula neutra de cantos arredondados para marcadores livres (`#psicanalise`, `#eleicoes-2026`). | • Rodapé do artigo (`/coluna/[slug]`)<br>• Filtros rápidos na página de busca (`/busca`) |
| `.badge-status` | Indicador visual do estado do artigo com variações `.badge-status-edicao` (âmbar) e `.badge-status-publicado` (verde esmeralda). | • Listagem de textos do autor em `/painel`<br>• Vitrine de textos em edição em `/admin` e na bancada colaborativa |
| `.grid-magazine-hero` | Grid assimétrico de capa (8 colunas para a manchete Hero + 4 colunas para os 2 destaques secundários no desktop; empilhado no mobile). | • Dobra principal da Capa (`/`, componente `HeroArticle.tsx` + `SecondaryGrid.tsx`) |
| `.grid-magazine-feed` | Grid responsivo de 1 coluna (mobile), 2 colunas (tablet) e 3 colunas (desktop) com espaçamento editorial. | • Blocos das 6 editorias na Capa (`/`)<br>• Listagem de artigos em `/editoria/[slug]`, `/coluna-arquivo/[slug]` e `/busca` |
| `.grid-split` | Layout de 2 colunas assimétricas (conteúdo principal largo + barra lateral de apoio sticky). | • Página de revisão de texto em edição (Artigo à esquerda + Painel de Comentários/Sugestões de outros autores à direita)<br>• Página de perfil (`/autor/[slug]`) |
| `.article-reading-container` | Container centralizado de leitura imersiva com margens confortáveis e suporte aos temas `.theme-paper`, `.theme-white` e `.theme-dark`. | • Envoltório principal da rota `/coluna/[slug]` |
| `.author-signature` | Bloco de encerramento de artigo com borda superior carmim, avatar, minibiografia, redes sociais e botões para `/autor/[slug]` e `/coluna-arquivo/[slug]`. | • Final de todo artigo publicado em `/coluna/[slug]` (`AuthorSignature.tsx`) |

#### B. Layout Mestre, Navegação & Protótipo (`src/styles/components/layout.css`)

| Classe Semântica | Definição Visual | Onde Será Utilizada (Telas e Componentes) |
| :--- | :--- | :--- |
| `.header-editorial-frosted` | Header fixo no topo (`height: var(--header-height)`, `z-index: 50`, `backdrop-filter: blur(12px)` e fundo papel translúcido). | • Componente global `HeaderFrostedGlass.tsx` presente no `src/app/layout.tsx` |
| `.main-content-layout` | **Obrigatória:** Container `<main>` com `min-height: 100vh` e `padding-top: var(--header-height)` (`4.5rem` desktop / `4rem` mobile) para impedir sobreposição pelo menu fixo. | • Container principal `<main>` de todas as páginas (`layout.tsx` / `page.tsx`) |
| `.reading-progress` | Barra superior ultrafina (`2px`) na cor `--color-brand-accent` (`#B91C1C`) cuja largura varia de `0%` a `100%` conforme o scroll. | • Topo da tela na página de leitura `/coluna/[slug]` (`ReadingProgress.tsx`) |
| `.footer-editorial` | Rodapé institucional com logotipo `aresta.`, links das 6 editorias, formulário de captura de newsletter e expediente. | • Componente global `FooterEditorial.tsx` no `src/app/layout.tsx` |
| `.prototype-role-switcher` | Barra flutuante compacta (`position: fixed`, canto inferior direito, `z-index: 60`) exclusiva do modo protótipo para alternar instantaneamente a sessão ativa (`Admin`, `Autor Titular`, `Autor Convidado`, `Leitor`, `Anônimo`). | • Componente `PrototypeRoleSwitcher.tsx` renderizado globalmente no protótipo da Vercel |

#### C. Botões Semânticos (`src/styles/components/buttons.css`)

| Classe Semântica | Definição Visual | Onde Será Utilizada (Telas e Componentes) |
| :--- | :--- | :--- |
| `.btn-primary` | Botão principal sólido em `--color-ink-primary` com texto claro e transição suave. | • Ações primárias de formulários, login com Google e botão "Novo Texto" em `/painel` |
| `.btn-accent` | Botão de destaque em vermelho carmim `--color-brand-accent` (`#B91C1C`) com hover em `#991B1B`. | • Botão **"Publicar Agora"** (exclusivo do autor original em `/painel/editor`)<br>• Botão **"Assinar Newsletter"** e **"Seguir Coluna"** |
| `.btn-outline` | Botão com borda sutil `--color-border-subtle` e fundo transparente. | • Botões de compartilhamento social, filtros de editoria e botão "Voltar para Edição" |
| `.btn-ghost` | Botão discreto sem borda com hover translúcido para barras de ferramentas. | • Controles tipográficos `[A-]` `[A+]`, alternador de tema de leitura e atalhos da barra do Tiptap |

#### D. Formulários & Editor (`src/styles/components/forms.css`)

| Classe Semântica | Definição Visual | Onde Será Utilizada (Telas e Componentes) |
| :--- | :--- | :--- |
| `.input-field` | Campo de entrada de texto com borda sutil, foco em vermelho carmim (`#B91C1C`) e suporte a modo noturno. | • Campos de Título, Subtítulo/Lead, Tags, Busca (`/busca`) e e-mail de Newsletter |
| `.label-field` | Rótulo tipográfico estruturado acima dos inputs com indicador de obrigatoriedade. | • Formulário do editor de artigos (`ArticleForm.tsx`) e edição de perfil/coluna |
| `.textarea-editor` | Área de texto auto-expansível para comentários públicos e sugestões internas de revisão. | • Formulário de comentários públicos (`/coluna/[slug]`)<br>• Painel de sugestões de outros autores/admins em textos em `'edicao'` |

#### E. Modais & Gavetas Unificadas (`src/styles/components/modals.css`)

| Classe Semântica | Definição Visual | Onde Será Utilizada (Telas e Componentes) |
| :--- | :--- | :--- |
| `.modal-backdrop` | Overlay escuro translúcido (`backdrop-filter: blur(4px)`) cobrindo a viewport. | • Modal de prévia de Card do Instagram no Desktop<br>• Modal de geração de *Quote Card*<br>• Menu gaveta mobile (`MobileMenu.tsx`) |
| `.modal-container` | Caixa centralizada em `--color-paper-surface` com borda sutil, sombra editorial e animação de entrada. | • Todos os diálogos de compartilhamento e confirmação de publicação |

---

## 2. Esquema do Banco de Dados (PostgreSQL / Supabase)

### 2.1 Tabela `perfis`
> **Nota de Privacidade (LGPD):** O e-mail não é exposto publicamente para usuários anônimos; a leitura pública contempla apenas os dados editoriais do perfil (`nome`, `slug`, `papel`, `avatar_url`, `bio` e redes sociais).
```sql
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
```

### 2.2 Tabela `colunas`
Entidade que representa a Coluna Exclusiva do autor (`/coluna-arquivo/[slug]`).
```sql
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
```

### 2.3 Tabela `categorias` (As 6 Editorias)
```sql
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
```

### 2.4 Tabela `tags`
```sql
CREATE TABLE IF NOT EXISTS public.tags (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    slug VARCHAR(60) UNIQUE NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### 2.5 Tabela `artigos`
Possui exclusivamente dois estados (`'edicao'` e `'publicado'`). Apenas o `autor_id` pode modificar o texto e alterar o `status` para `'publicado'`.
```sql
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
```

### 2.6 Tabela `artigo_tags`
```sql
CREATE TABLE IF NOT EXISTS public.artigo_tags (
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (artigo_id, tag_id)
);
```

### 2.7 Tabela `artigo_revisao_comentarios` (Sugestões Internas em Edição)
Armazena os comentários e sugestões de melhoria feitos por **outros autores e administradores** enquanto o artigo está em `status = 'edicao'`. Visível apenas internamente no painel para `autor` e `admin`.
```sql
CREATE TABLE IF NOT EXISTS public.artigo_revisao_comentarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    autor_comentario_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    trecho_selecionado TEXT,
    conteudo TEXT NOT NULL,
    resolvido BOOLEAN NOT NULL DEFAULT false,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### 2.8 Tabela `artigo_comentarios` (Comentários Públicos de Leitores)
Comentários públicos de leitores autenticados em artigos com `status = 'publicado'`.
```sql
CREATE TABLE IF NOT EXISTS public.artigo_comentarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    leitor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### 2.9 Tabela `newsletter_assinantes`
```sql
CREATE TABLE IF NOT EXISTS public.newsletter_assinantes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### 2.10 Tabela `coluna_seguidores`
```sql
CREATE TABLE IF NOT EXISTS public.coluna_seguidores (
    coluna_id INTEGER NOT NULL REFERENCES public.colunas(id) ON DELETE CASCADE,
    leitor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (coluna_id, leitor_id)
);
```

### 2.11 Tabela `leitores_favoritos`
```sql
CREATE TABLE IF NOT EXISTS public.leitores_favoritos (
    leitor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (leitor_id, artigo_id)
);
```

---

## 3. Dicionário de Enums e Estados de Domínio

### 3.1 `papel_usuario`
* **Regra de Domínio:** Todo `'autor'` é também um `'admin'` (possui 100% dos privilégios administrativos além de ser titular obrigatório de uma coluna em `colunas`). Já o papel `'admin'` representa um administrador que não é autor/colunista (nem todo admin é autor).
```sql
CREATE TYPE public.papel_usuario AS ENUM ('leitor', 'autor', 'admin');
```

### 3.2 `status_artigo`
```sql
CREATE TYPE public.status_artigo AS ENUM ('edicao', 'publicado');
```

---

## 4. Dicionário de Contratos TypeScript (`src/types/`)

```typescript
export type PapelUsuario = 'leitor' | 'autor' | 'admin';
export type StatusArtigo = 'edicao' | 'publicado';

export interface Perfil {
  id: string;
  nome: string;
  slug: string;
  papel: PapelUsuario;
  avatar_url: string | null;
  bio: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  email?: string; // Visível apenas para o próprio usuário e admins
}

export interface Coluna {
  id: number;
  autor_id: string;
  nome: string;
  slug: string;
  manifesto_slogan: string;
  capa_banner_url: string | null;
  ativo: boolean;
  autor?: Perfil;
}

export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  descricao: string | null;
  cor_acento: string;
  ordem_exibicao: number;
  ativo: boolean;
}

export interface ArtigoCard {
  id: string;
  titulo: string;
  slug: string;
  subtitulo_lead: string;
  imagem_capa_url: string | null;
  tempo_leitura_min: number;
  status: StatusArtigo;
  publicado_em: string | null;
  atualizado_em: string;
  eh_destaque_hero: boolean;
  eh_destaque_secao: boolean;
  categoria: Pick<Categoria, 'id' | 'nome' | 'slug' | 'cor_acento'>;
  coluna: Pick<Coluna, 'id' | 'nome' | 'slug'>;
  autor: Pick<Perfil, 'id' | 'nome' | 'slug' | 'avatar_url'>;
}

export interface ArtigoCompleto extends ArtigoCard {
  conteudo: string; // Markdown puro
  legenda_capa: string | null;
  creditos_capa: string | null;
  visualizacoes: number;
  tags: Array<{ id: number; nome: string; slug: string }>;
}

export interface RevisaoComentario {
  id: string;
  artigo_id: string;
  autor_comentario_id: string;
  trecho_selecionado: string | null;
  conteudo: string;
  resolvido: boolean;
  criado_em: string;
  autor_comentario: Pick<Perfil, 'id' | 'nome' | 'slug' | 'avatar_url' | 'papel'>;
}

export interface ArtigoComentarioPublico {
  id: string;
  artigo_id: string;
  leitor_id: string;
  conteudo: string;
  ativo: boolean;
  criado_em: string;
  leitor: Pick<Perfil, 'id' | 'nome' | 'avatar_url'>;
}
```

---

## 5. Expressões Regulares (RegEx) & Validações

* **Slug Semântico:** `^[a-z0-9]+(?:-[a-z0-9]+)*$`
* **E-mail:** Validação padrão via Zod (`z.string().email()`)

---

## 6. Funções PostgreSQL (`SECURITY DEFINER`), Índices & Políticas RLS

* **Índice Único Parcial para Manchete Hero:**
  Garante no nível do banco que apenas 1 artigo possua `eh_destaque_hero = true`:
  ```sql
  CREATE UNIQUE INDEX IF NOT EXISTS idx_unico_artigo_hero
  ON public.artigos (eh_destaque_hero) WHERE (eh_destaque_hero = true);
  ```
* **Função Auxiliar de Privilégio (`eh_admin_ou_autor()`):** Retorna `true` para usuários com papel `'autor'` ou `'admin'` (pois todo autor é um admin no sistema).
* **Função de Destaque da Capa (`definir_destaque_hero(p_artigo_id UUID)`):** Executável por qualquer `autor` ou `admin`, desmarca o Hero anterior e marca o artigo publicado selecionado em uma única transação.
* **Incremento Seguro de Visualizações:** `incrementar_visualizacao_artigo(p_artigo_id UUID)` para artigos com `status = 'publicado'`.
* **Políticas RLS Principais:**
  * `artigos (SELECT)`: Público lê apenas `status = 'publicado'`; usuários com papel `'autor'` ou `'admin'` leem também todos os artigos com `status = 'edicao'`.
  * `artigos (INSERT / UPDATE / DELETE)`: Apenas usuários `'autor'` (titulares de coluna) criam artigos, e **exclusivamente o próprio autor (`auth.uid() = autor_id`)** pode editar o texto e mudar o status entre `'edicao'` e `'publicado'`.
  * `artigo_revisao_comentarios (SELECT / INSERT)`: Permitido apenas para usuários com papel `'autor'` ou `'admin'`, viabilizando sugestões colaborativas nos textos em `'edicao'`.

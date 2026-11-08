# 📰 aresta.

Plataforma editorial contemporânea e independente para publicação e leitura de colunas de opinião, ensaios culturais e crônicas autorais.

* **Logotipo Oficial & Cor de Destaque:** **`aresta.`** (em caixa baixa com ponto final e destaques em vermelho carmim `#B91C1C` / `--color-brand-accent`)
* **As 5 Editorias:** Política & Poder, Cultura & Artes, Entretenimento & Pop, Subjetividades, Opinião & Ensaios e Esporte & Sociedade.
* **Autores & Colunas Oficiais:** **Lucas Campos** (*Coluna de Lucas*), **Danillo Reis** (*Coluna de Danillo*), **Sergio Rodrigues** (*Coluna de Sergio*), **Lara Lima** (*Coluna de Lara*) e **Guliver Elias** (*Coluna de Guliver*) — com no mínimo 3 textos de cada autor distribuídos entre as editorias no protótipo.
* **Modelo Operacional:** **Todo autor é um admin, mas nem todo admin é autor; e todo autor tem uma coluna.** Fluxo direto de **2 estados (`edicao` e `publicado`)**, publicação autônoma exclusiva pelo autor original e espaço de sugestões/comentários internos para outros autores e administradores.
* **Stack Tecnológica:** Next.js 15/16 (App Router, Turbopack, React 19, TypeScript), Tailwind CSS 4, Supabase (PostgreSQL + RLS + Auth + Storage), React Hook Form, Zod, Lucide React, Sonner, Vitest e Vercel.

---

## 📑 Sumário

- [1. Estrutura de Diretórios do Repositório](#1-estrutura-de-diretórios-do-repositório)
- [2. Arquitetura da Documentação Oficial (`docs/`)](#2-arquitetura-da-documentação-oficial-docs)
- [3. Scripts Operacionais do Projeto](#3-scripts-operacionais-do-projeto)
- [4. Status do Roadmap & Próximos Passos](#4-status-do-roadmap--próximos-passos)

---

## 1. Estrutura de Diretórios do Repositório

```text
aresta-revista/
├── docs/                                 # Documentação técnica oficial (DRY — 7 documentos canônicos)
│   ├── contexto-ia.md                    # 1. Contexto mestre, linha editorial da revista e índice de navegação
│   ├── identidade-visual.md              # 2. Manual da marca aresta., cor carmim (#B91C1C), menu frosted e padding
│   ├── regras-de-negocio.md              # 3. As 5 editorias, /autor vs /coluna-arquivo, RBAC e status edicao/publicado
│   ├── dicionario-de-dados.md            # 4. Design Tokens, catálogo completo de classes CSS, tabelas SQL e RLS
│   ├── guia-de-desenvolvimento.md        # 5. Arquitetura Mock-First (7 serviços), Role Switcher e Anti-Class Boom
│   ├── roteiro-sprints.md                # 6. Cronograma das Sprints (0 a 6), roteiro de deploy e transição
│   └── tutorial-do-sistema.md            # 7. Manual passo a passo (Leitor, Autor, Admin /admin e Manutenção)
├── public/                               # Assets estáticos, ícones e logotipo oficial da revista
│   ├── images/                           # Identidade visual, logotipo logo-aresta.png
│   └── favicon.ico                       # Favicon da revista
├── src/                                  # Código-fonte da aplicação Next.js
│   ├── app/                              # Rotas e páginas (App Router)
│   │   ├── page.tsx                      # Capa da revista (Hero, Destaques, Feeds por Editoria, Colunistas)
│   │   ├── layout.tsx                    # Layout raiz com Header Frosted Glass, main (.main-content-layout) e Role Switcher
│   │   ├── globals.css                   # Importação centralizada dos módulos de estilo
│   │   ├── coluna/                       # Rota de leitura imersiva do artigo publicado (/coluna/[slug])
│   │   ├── editoria/                     # Listagem de artigos filtrados por editoria (/editoria/[slug])
│   │   ├── autor/                        # Página biográfica de perfil do colunista (/autor/[slug])
│   │   ├── coluna-arquivo/               # Acervo histórico da coluna do autor (/coluna-arquivo/[slug])
│   │   ├── conta/                        # Área e configurações do Leitor (/conta - dados, colunas seguidas, newsletters e LGPD)
│   │   ├── painel/                       # Painel do Colunista (/painel) e Editor (/painel/editor/[id] e /novo)
│   │   ├── admin/                        # Mesa Editorial (/admin - Destaques da Capa, Colunistas e Meu Perfil)
│   │   ├── not-found.tsx                 # Página 404 personalizada e acolhedora com retorno à capa
│   │   ├── error.tsx                     # Error boundary client-side com recuperação graciosa
│   │   ├── sitemap.ts                    # Gerador dinâmico de sitemap.xml para indexação de artigos publicados
│   │   └── robots.ts                     # Regras de rastreamento para motores de busca
│   ├── components/                       # Componentes de interface desacoplados
│   │   ├── admin/                        # Módulos do /admin (TextosEmEdicaoList, EditoriaCapas, GestaoUsuarios)
│   │   ├── artigo/                       # Componentes do leitor (ArticleBody, ReadingProgress, AuthorSignature)
│   │   ├── autor/                        # Componentes de perfil e acervo (AuthorBio, ColumnHeader, ColumnCard)
│   │   ├── capa/                         # Módulos da capa (HeroArticle, SecondaryGrid, CategoryFeed)
│   │   ├── layout/                       # HeaderFrostedGlass, HeaderPortal, HeaderSearchBar (estilo G1), FooterEditorial, PrototypeRoleSwitcher
│   │   ├── painel/                       # Editor e bancada (TiptapEditor, ArticleForm, RevisaoCommentsSidebar)
│   │   └── ui/                           # Componentes atômicos e primitivas
│   ├── contexts/                         # Provedores de estado global (AuthContext com suporte a Role Switcher)
│   ├── lib/                              # Clientes de infraestrutura e utilitários
│   │   ├── supabase/                     # Clientes Supabase (browser client e server client via SSR)
│   │   ├── __tests__/                    # Testes unitários de utilitários e regras de domínio
│   │   ├── readingTime.ts                # Cálculo automático do tempo de leitura (200 palavras/minuto)
│   │   ├── imageOptimizer.ts             # Otimizador client-side universal em JPEG (image/jpeg, <= 120 KB)
│   │   └── slugify.ts                    # Normalizador de slugs semânticos para URLs
│   ├── schemas/                          # Schemas de validação em tempo de execução com Zod (artigo, revisao, autor)
│   ├── services/                         # Camada de serviços desacoplada (7 Repositórios / Mock-First)
│   │   ├── mocks/                        # Mocks tipados para desenvolvimento frontend desacoplado
│   │   ├── artigosService.ts             # Vitrine, leitura, CRUD (edicao/publicado exclusivo do autor) e capa
│   │   ├── revisaoService.ts             # Listagem de textos em 'edicao' e comentários/sugestões entre autores/admins
│   │   ├── autoresService.ts             # Perfis públicos (/autor), acervos (/coluna-arquivo) e papéis de usuários
│   │   ├── categoriasService.ts          # Metadados e listagem das 5 editorias oficiais
│   │   ├── interacoesService.ts          # Comentários públicos, favoritos, seguidores de coluna e newsletter
│   │   ├── authService.ts                # Autenticação Google OAuth e alternador de visão no protótipo
│   │   └── storageService.ts             # Upload seguro de capas e avatares JPEG no Supabase Storage
│   ├── styles/                           # Centralização de Design Tokens e Módulos CSS
│   │   ├── theme.css                     # Fonte da verdade de tokens (--color-brand-accent: #B91C1C, fontes, temas)
│   │   ├── components/                   # primitives.css, buttons.css, forms.css, modals.css, layout.css
│   │   └── modules/                      # capa.css, leitura.css, autor.css, painel.css, admin.css
│   └── types/                            # Contratos TypeScript e tipagem gerada do Supabase
│       ├── database.types.ts             # Tipos espelhados do banco PostgreSQL
│       ├── artigo.types.ts               # Tipagens de domínio para colunas, artigos e sugestões de revisão
│       └── autor.types.ts                # Tipagens de perfis e colunistas
├── supabase/                             # Infraestrutura e migrações SQL para o PostgreSQL
│   ├── migrations/                       # Scripts versionados DDL, RLS e funções de segurança
│   │   └── 20261107_init_schema.sql      # Schema completo (perfis, colunas, categorias, artigos, revisao, RLS)
│   └── seed_categorias.sql               # Seed SQL inicial com as 6 grandes editorias cadastradas
├── AGENTS.md                             # Diretrizes obrigatórias de governança para agentes de IA
└── README.md                             # Este documento de referência estrutural
```

---

## 2. Arquitetura da Documentação Oficial (`docs/`)

Toda a documentação do projeto segue o princípio **DRY (Don't Repeat Yourself)**: cada informação reside em um único documento canônico com sumário navegável no topo:

| # | Arquivo | Responsabilidade Exclusiva |
| :-: | :--- | :--- |
| **1** | [`docs/contexto-ia.md`](./docs/contexto-ia.md) | **Contexto Mestre & Índice:** Linha editorial, missão da revista, visão executiva e personas do protótipo. |
| **2** | [`docs/identidade-visual.md`](./docs/identidade-visual.md) | **Identidade Visual & Layout:** Manual da marca `aresta.`, cor carmim (`#B91C1C`), menu *frosted glass* e regra de padding superior. |
| **3** | [`docs/regras-de-negocio.md`](./docs/regras-de-negocio.md) | **Regras de Negócio & Domínio:** As 5 editorias, `/autor` vs `/coluna-arquivo`, RBAC, status `edicao`/`publicado` e revisão colaborativa. |
| **4** | [`docs/dicionario-de-dados.md`](./docs/dicionario-de-dados.md) | **Dicionário de Dados & Tokens:** Paleta editorial (`theme.css`), Catálogo Completo de Classes CSS (e onde usar), tabelas SQL e RLS. |
| **5** | [`docs/guia-de-desenvolvimento.md`](./docs/guia-de-desenvolvimento.md) | **Guia de Engenharia:** Arquitetura nos 7 serviços (`src/services/` Mock-First), `PrototypeRoleSwitcher`, Anti-Class Boom e testes. |
| **6** | [`docs/roteiro-sprints.md`](./docs/roteiro-sprints.md) | **Roteiro & Planejamento de Sprints:** Sprints 0 a 6, roteiro de deploy do protótipo e checklist de transição. |
| **7** | [`docs/tutorial-do-sistema.md`](./docs/tutorial-do-sistema.md) | **Tutorial & Manual de Uso:** Guia passo a passo para **Leitores**, **Autores / Colunistas**, **Admins (`/admin`)** e **Desenvolvedores**. |

---

## 3. Scripts Operacionais do Projeto

```bash
# Instalar dependências do projeto
npm install

# Iniciar servidor de desenvolvimento local (Next.js com Turbopack)
npm run dev

# Validar conformidade de código e regras de ESLint
npm run lint

# Executar verificação estrita de tipagem TypeScript
npx tsc --noEmit

# Executar suíte de testes unitários automatizados (Vitest)
npm test

# Executar validação completa (TypeScript + ESLint + Vitest)
npm run validate

# Compilar aplicação para produção
npm run build

# Iniciar servidor de produção local após o build
npm run start
```

---

## 4. Status do Roadmap & Próximos Passos

* **Fase Atual:** **Sprint 3 Concluída (Editor do Autor `/painel`, Publicação Autônoma & Revisão Colaborativa)** — Painel do Colunista completo com as 3 abas essenciais (**Publicados**, **Em Produção** e **Redação Geral**), editor imersivo WYSIWYG Tiptap, otimização e compressão client-side em JPEG ($\le 120\text{ KB}$), fallback oficial `default-cover.svg` (`EditorialImage`), trava de autoria inviolável (apenas o autor titular modifica e publica), mural lateral de sugestões da redação (`EditorialReviewSidebar`), `AuthContext` e botão flutuante `PrototypeRoleSwitcher` para troca dinâmica de perfil em 1 clique.
* **Cobertura de Testes Automatizados:** 31 testes unitários no Vitest aprovados com 100% de sucesso, validação estrita TypeScript (`tsc --noEmit`) e ESLint com 0 erros, compilação de produção com 35 páginas estáticas e dinâmicas geradas no build.
* **Estratégia Adotada:** **Protótipo Navegável Completo (Mock-First)** — ecossistema autoral, editorial e público totalmente operacionais em dados mock tipados para validação prévia antes da conexão com banco real.
* **Marco de Validação:** Deploy público na Vercel ao final da **Sprint 4** para testes com pessoas reais via link no WhatsApp.
* **Próxima Etapa:** **Sprint 4 (Painel Admin `/admin`, Textos em Edição na Redação, Gestão dos Destaques da Capa Hero/Secundários e Gestão de Colunistas)**.

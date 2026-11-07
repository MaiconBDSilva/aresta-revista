# 🤖 Diretrizes e Protocolos do Agente | Aresta Revista

Este arquivo define as **regras obrigatórias e permanentes** de atuação para qualquer instância de IA (Antigravity / Gemini / Claude) que operar neste repositório.

---

## 1. 🔄 Leitura Obrigatória no Início de Toda Conversa (Warm-up)

Ao iniciar uma nova sessão de chat, antes de propor ou executar qualquer alteração no código, você **DEVE consultar os seguintes documentos** para carregar o contexto completo e atualizado do projeto:

1. **[`docs/contexto-ia.md`](./docs/contexto-ia.md):** Visão editorial da marca, resumo executivo da plataforma e índice mestre de navegação.
2. **[`docs/identidade-visual.md`](./docs/identidade-visual.md):** Manual oficial da marca `aresta.`, cor de destaque centralizada no vermelho carmim (`#B91C1C`), menu *frosted glass* e regra de padding superior.
3. **[`docs/regras-de-negocio.md`](./docs/regras-de-negocio.md):** Catálogo oficial de regras de negócio (as 6 editorias, `/autor/[slug]` vs `/coluna-arquivo/[slug]`, papéis RBAC, ciclo de 2 status `edicao` e `publicado`, revisão colaborativa e compartilhamento dinâmico).
4. **[`docs/dicionario-de-dados.md`](./docs/dicionario-de-dados.md):** Fonte única da verdade para esquemas de banco Supabase (tabelas, colunas, enums, RLS), Design Tokens editoriais e Catálogo Completo de Classes CSS Semânticas (com mapeamento de onde são usadas).
5. **[`docs/guia-de-desenvolvimento.md`](./docs/guia-de-desenvolvimento.md):** Guia arquitetural, estratégia Mock-First nos 7 serviços (`src/services/`), Seletor de Visão (`PrototypeRoleSwitcher`), governança Anti-Class Boom e testes automatizados.
6. **[`docs/roteiro-sprints.md`](./docs/roteiro-sprints.md):** Cronograma de sprints (0 a 6), roteiro de deploy, checklist de validação e backlog evolutivo.
7. **[`docs/tutorial-do-sistema.md`](./docs/tutorial-do-sistema.md):** Manual de estrutura e uso passo a passo para Leitores, Autores/Colunistas, Administradores (`/admin`) e Desenvolvedores.
8. **[`README.md`](./README.md):** Estrutura completa de pastas e scripts operacionais.

---

## 2. 📝 Governança de Atualização Contínua da Documentação (Princípio DRY)

Todos os documentos em `docs/` possuem responsabilidade única (sem repetição de conteúdo entre arquivos) e **DEVEM manter um Sumário (`## 📑 Sumário`) atualizado no topo**. Sempre que realizar alterações consideráveis no projeto, atualize o documento canônico correspondente antes de encerrar o turno:

* **Mudança em Marca, Logotipo, Cores Institucionais (`#B91C1C`), Tipografia ou Header:**
  👉 Atualizar [`docs/identidade-visual.md`](./docs/identidade-visual.md).
* **Mudança em Regras de Publicação (`edicao`/`publicado`), Permissões, Editorias ou Políticas Editoriais:**
  👉 Atualizar [`docs/regras-de-negocio.md`](./docs/regras-de-negocio.md).
* **Mudança em Tabelas, Colunas, Migrations, RLS ou Tipos do Banco:**
  👉 Atualizar [`docs/dicionario-de-dados.md`](./docs/dicionario-de-dados.md), [`supabase/migrations/20261107_init_schema.sql`](./supabase/migrations/20261107_init_schema.sql) e `src/types/database.types.ts`.
* **Criação de Novas Classes CSS ou Módulos Visuais:**
  👉 Documentar na Seção 1.3 de [`docs/dicionario-de-dados.md`](./docs/dicionario-de-dados.md) indicando definição e onde é utilizada.
* **Criação de Novas Telas, Rotas, Serviços ou Componentes:**
  👉 Atualizar a árvore de diretórios do [`README.md`](./README.md) e o guia de uso em [`docs/tutorial-do-sistema.md`](./docs/tutorial-do-sistema.md).
* **Mudança no Status de Entrega, Testes ou Planejamento de Sprints:**
  👉 Atualizar a checklist em [`docs/roteiro-sprints.md`](./docs/roteiro-sprints.md) e [`README.md`](./README.md).

---

## 3. 🎨 Limpeza de Código CSS, Reutilização e Prevenção Anti-Class Boom

1. **Proibição de classNames Gigantescos no JSX:**
   * É estritamente **proibido aninhar dezenas de classes utilitárias inline** no JSX (ex: cadeias intermináveis poluindo os componentes).
   * O JSX deve ser limpo, legível, semântico e declarativo, focado na estrutura e na lógica do componente.
2. **Prioridade Absoluta para o Catálogo de Classes Semânticas (`docs/dicionario-de-dados.md` — Seção 1.3):**
   * Antes de propor qualquer estilo novo, **o agente DEVE consultar o catálogo da Seção 1.3 de `docs/dicionario-de-dados.md`**:
     * **Cards de Artigos (`primitives.css`):** `.card-article`, `.card-featured`, `.card-compact`, `.card-columnist`.
     * **Tipografia Editorial (`primitives.css`):** `.title-display`, `.title-article`, `.title-section`, `.text-lead`, `.text-body-reading`, `.text-caption`, `.section-kicker`.
     * **Badges & Tags (`primitives.css`):** `.badge-category` (`.badge-politica` ... `.badge-esporte`), `.badge-tag`, `.badge-status` (`.badge-status-edicao`, `.badge-status-publicado`).
     * **Grids & Containers (`primitives.css`):** `.grid-magazine-hero`, `.grid-magazine-feed`, `.grid-split`, `.article-reading-container`, `.author-signature`.
     * **Layout, Botões, Forms & Modais:** `.header-editorial-frosted`, `.main-content-layout`, `.reading-progress`, `.footer-editorial`, `.prototype-role-switcher`, `.btn-primary`, `.btn-accent`, `.btn-outline`, `.btn-ghost`, `.input-field`, `.label-field`, `.textarea-editor`, `.modal-backdrop`, `.modal-container`.
3. **Prevenção Ativa do Anti-Padrão "Class Boom" (Explosão de Classes):**
   * É **estritamente proibido criar uma classe CSS hiper-específica para cada tag HTML** de um componente.
   * **Consolidação Obrigatória:** Se duas regras visuais em arquivos diferentes tiverem a mesma finalidade ou propriedades semelhantes, elas **DEVEM ser consolidadas em uma única classe comum** nas primitivas ou no módulo centralizado.
4. **Catálogo de Classes Documentado:**
   * Toda classe semântica nova ou consolidada deve estar documentada na Seção 1.3 de [`docs/dicionario-de-dados.md`](./docs/dicionario-de-dados.md).

---

## 4. ⚖️ Regras de Domínio Editorial, Design & Engenharia Invioláveis

1. **Logotipo Oficial e Cor Carmim Centralizada:**
   * O nome da revista é estilizado como **`aresta.`** (sempre em caixa baixa) e toda a cor de destaque institucional do sistema é centralizada no **vermelho carmim `#B91C1C`** (`--color-brand-accent`).
2. **Regra de Layout do Menu Fixo (*Frosted Glass*):**
   * O menu superior possui efeito de vidro fosco (`backdrop-filter: blur(12px)` e fundo translúcido) com posicionamento fixo no topo (`.header-editorial-frosted`).
   * **OBRIGATÓRIO:** Toda página (`page.tsx`) ou o container principal `<main>` deve aplicar a classe `.main-content-layout` com `padding-top` igual à altura do menu (`--header-height: 4.5rem;` no desktop e `4rem;` no mobile), impedindo categoricamente que o menu corte ou sobreponha o início do conteúdo da página.
3. **Hierarquia Autor/Admin, Ciclo de 2 Estados (`edicao` e `publicado`), Autonomia do Autor & Revisão Colaborativa:**
   * **Todo autor é um admin, mas nem todo admin é autor; e todo autor tem obrigatoriamente uma coluna:** Usuários com papel `'autor'` acumulam 100% das permissões administrativas do portal (`/admin`, gestão de capa, moderação) e possuem sua coluna exclusiva em `colunas`. Usuários com papel `'admin'` exercem a administração da plataforma sem possuir coluna própria.
   * Não existe agendamento: os artigos possuem apenas os status `'edicao'` e `'publicado'`.
   * Artigos em `'edicao'` ficam visíveis internamente apenas para usuários com papel `'autor'` e `'admin'`.
   * **Somente o autor original (`autor_id`)** pode modificar o texto do seu artigo e mudar o status de `'edicao'` para `'publicado'` (quando passa a aparecer no site público).
   * Outros autores e administradores podem visualizar os textos em `'edicao'` na listagem do painel (`/painel` e `/admin`) e deixar comentários/sugestões de melhoria (`artigo_revisao_comentarios`).
4. **Duas Rotas Autorais Públicas Complementares:**
   * `/autor/[slug]` é a página biográfica de perfil do colunista; `/coluna-arquivo/[slug]` é o acervo cronológico da sua coluna.
5. **Estratégia Mock-First, Elenco Oficial de Autores & Seletor de Visão (`PrototypeRoleSwitcher`):**
   * Nos dados gerados para o protótipo (`src/services/mocks/`), utilizar obrigatoriamente os **5 autores reais do projeto**: **Lucas Campos** (*Coluna de Lucas*), **Danillo Reis** (*Coluna de Danillo*), **Sergio Rodrigues** (*Coluna de Sergio*), **Lara Lima** (*Coluna de Lara*) e **Guliver Elias** (*Coluna de Guliver*), com **pelo menos 3 textos de cada autor (mínimo de 15 textos)** divididos entre as 6 editorias, acompanhados do componente `PrototypeRoleSwitcher`.
6. **Tempo de Leitura Determinístico:**
   * O cálculo de tempo estimado de leitura deve ser automático e calculado no salvamento do artigo com base em 200 palavras por minuto.
7. **Política de Otimização de Imagens (Compatibilidade 100% Open Graph):**
   * Utilizar `images: { unoptimized: true }` no `next.config.ts`, aliado à compressão client-side proporcional em **JPEG (`image/jpeg`, qualidade 0.82, $\le 120\text{ KB}$)** antes do upload, garantindo compatibilidade nativa total com `@vercel/og` (Satori), WhatsApp e Instagram.
8. **Qualidade de Código e Tipagem Estrita:**
   * Antes de qualquer entrega, garantir que `npx tsc --noEmit` e `npm run lint` passem com **0 erros**.

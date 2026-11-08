# 🧠 Contexto Geral & Índice Mestre | Aresta Revista

> **Arquivo:** `docs/contexto-ia.md`  
> **Finalidade:** Ponto de entrada único para desenvolvedores e agentes de IA. Apresenta a visão editorial do Aresta Revista, a identidade oficial da marca centrada no vermelho carmim (`#B91C1C`), o elenco de autores reais do projeto, o resumo executivo da plataforma e o mapa de navegação canônico.  
> **Última Atualização:** 07/11/2026

---

## 📑 Sumário

- [1. Visão Geral da Revista & Linha Editorial](#1-visão-geral-da-revista--linha-editorial)
- [2. Resumo Executivo da Plataforma](#2-resumo-executivo-da-plataforma)
- [3. Arquitetura da Documentação (Fonte Única da Verdade)](#3-arquitetura-da-documentação-fonte-única-da-verdade)
- [4. Regras de Ouro Invioláveis (Quick Reference)](#4-regras-de-ouro-invioláveis-quick-reference)
- [5. Autores Oficiais do Protótipo, Seletor de Visão & Variáveis de Ambiente](#5-autores-oficiais-do-protótipo-seletor-de-visão--variáveis-de-ambiente)
- [6. Status Atual & Próximas Etapas](#6-status-atual--próximas-etapas)

---

## 1. Visão Geral da Revista & Linha Editorial

| Item | Informação Oficial |
| :--- | :--- |
| **Nome da Publicação** | **Aresta Revista** |
| **Domínio Oficial** | **`arestarevista.com`** |
| **Grafia do Logotipo** | **`aresta.`** (em caixa baixa com ponto final em vermelho carmim `#B91C1C`) |
| **Cor Central de Destaque** | **Vermelho Carmim `#B91C1C`** (`--color-brand-accent`) |
| **Asset Oficial da Logo** | [`public/images/logo-aresta.png`](../public/images/logo-aresta.png) |
| **Natureza Editorial** | Portal independente de colunas autorais, ensaios críticos, análises culturais e crônicas contemporâneas. |
| **Eixos Temáticos (5 Editorias)** | **Política**, **Cultura**, **Entretenimento**, **Ensaios** e **Esporte**. |
| **Autores & Colunas Oficiais** | **Lucas Campos** (*Coluna de Lucas*), **Danillo Reis** (*Coluna de Danillo*), **Sergio Rodrigues** (*Coluna de Sergio*), **Lara Lima** (*Coluna de Lara*) e **Guliver Elias** (*Coluna de Guliver*). |
| **Governança de Autores & Admins** | **Todo autor é um admin, mas nem todo admin é autor.** Todo autor possui obrigatoriamente uma coluna exclusiva e acesso completo de administração; já um admin não-autor gerencia a plataforma sem ter coluna própria. |
| **Stack Tecnológica** | Next.js 15/16 (App Router, Turbopack, React 19), TypeScript 5, Tailwind CSS 4 + Design Tokens (`theme.css`), Supabase (PostgreSQL + RLS + Auth + Storage), Zod, Lucide React, Sonner, Vitest, Vercel. |

---

## 2. Resumo Executivo da Plataforma

O **Aresta Revista** é um ecossistema digital projetado com foco em excelência tipográfica, performance de carregamento e colaboração editorial:

1. **Vitrine Pública, Colunas & Experiência de Leitura (`/`, `/coluna/[slug]`, `/autor/[slug]` e `/coluna-arquivo/[slug]`):**
   * **Header Flutuante Frosted Glass:** Menu fixo no topo com efeito de vidro fosco translúcido (`backdrop-filter: blur(12px)`) e navegação pelas 5 grandes editorias.
   * **Padding Superior Obrigatório:** Todas as páginas aplicam `.main-content-layout` para que o menu flutuante nunca sobreponha o conteúdo.
   * **Capa Editorial Dinâmica:** Destaque principal (*Hero Article*), mosaico de manchetes secundárias, vitrine horizontal *"Últimas das Colunas"* e feeds por editoria (exibindo artigos com `status = 'publicado'`).
   * **Dupla Presença Autoral:** Cada um dos colunistas conta com sua **Página de Perfil (`/autor/[slug]`)** (biografia, foto, redes sociais e últimos textos) e com a **Página de Acervo da Coluna (`/coluna-arquivo/[slug]`)** (manifesto da coluna, botão *"Seguir"* e histórico completo de artigos).
   * **Leitor Imersivo & Compartilhamento Dinâmico:** Controles `[A-] [A+]`, temas de leitura, barra de progresso carmim, *Quote Cards*, comentários públicos com Google Auth e geração de cards via `@vercel/og` (com capas otimizadas em `image/jpeg` para 100% de compatibilidade com Satori, WhatsApp e Instagram Stories).
2. **Painel do Autor & Revisão Colaborativa (`/painel` e `/painel/editor`):**
   * Ciclo de vida enxuto com apenas **2 status (`status_artigo`)**: **`edicao`** (Em Edição) e **`publicado`** (Publicado).
   * **Autonomia Estrita do Autor:** Somente o autor original do artigo pode modificar seu texto e alterar seu status de `'edicao'` para `'publicado'`.
   * **Sugestões Colaborativas em Edição:** Enquanto um texto está em `'edicao'`, ele fica visível internamente para **outros autores e administradores**, que podem lê-lo e deixar comentários/sugestões de melhoria (`artigo_revisao_comentarios`) sem alterar o texto original.
3. **Administração & Curadoria da Capa (`/admin`):**
   * Acessível por todos os **Autores** (pois todo autor é admin) e por **Administradores não-autores**.
   * Listagem central de todos os textos em `'edicao'` para acompanhamento e envio de sugestões aos autores.
   * Montagem da grade de destaques da capa (seleção do artigo `eh_destaque_hero` e `eh_destaque_secao` dentre os publicados) e gestão de usuários.

---

## 3. Arquitetura da Documentação (Fonte Única da Verdade)

Para eliminar redundâncias e garantir facilidade de manutenção (princípio DRY), a documentação do projeto está dividida em **7 documentos canônicos**:

| Documento | Escopo Exclusivo (Quando Consultar) |
| :--- | :--- |
| **[`docs/contexto-ia.md`](./contexto-ia.md)** *(Este arquivo)* | Visão editorial da revista, resumo executivo da arquitetura, regras de ouro e elenco de autores do protótipo. |
| **[`docs/identidade-visual.md`](./identidade-visual.md)** | Manual oficial da marca `aresta.`, cor de destaque vermelho carmim (`#B91C1C`), menu *frosted glass* e regra de padding superior. |
| **[`docs/regras-de-negocio.md`](./regras-de-negocio.md)** | As 5 editorias, os 5 autores oficiais, regra *"Todo autor é admin, nem todo admin é autor"*, `/autor` vs `/coluna-arquivo`, status `edicao`/`publicado` e mídia JPEG. |
| **[`docs/dicionario-de-dados.md`](./dicionario-de-dados.md)** | Design Tokens (`theme.css`), Catálogo Completo de Classes Semânticas CSS (e onde são usadas), tabelas SQL, enums, contratos TS e RLS. |
| **[`docs/guia-de-desenvolvimento.md`](./guia-de-desenvolvimento.md)** | Stack técnica, os 7 serviços em `src/services/` (Mock-First), `PrototypeRoleSwitcher`, governança Anti-Class Boom e testes. |
| **[`docs/roteiro-sprints.md`](./roteiro-sprints.md)** | Planejamento de sprints de desenvolvimento (Sprints 0 a 6), deploy do protótipo na Vercel e checklist de transição para o Supabase. |
| **[`docs/tutorial-do-sistema.md`](./tutorial-do-sistema.md)** | Manual passo a passo para Leitores, Autores/Colunistas, Administradores (`/admin`) e Desenvolvedores. |
| **[`docs/guia-de-teste-do-prototipo.md`](./guia-de-teste-do-prototipo.md)** | Roteiro oficial de teste do protótipo navegável para a equipe, limitações da camada mock, checklist e coleta de feedback. |

> **Nota sobre Estrutura de Pastas e Scripts:** A árvore de diretórios atualizada do projeto e os comandos `npm` oficiais ficam centralizados exclusivamente no [`README.md`](../README.md).

---

## 4. Regras de Ouro Invioláveis (Quick Reference)

1. **Grafia Oficial e Cor Carmim Centralizada:** O logotipo é estilizado como **`aresta.`** (em caixa baixa) e toda a cor de destaque do sistema é centralizada no **vermelho carmim `#B91C1C`** (`--color-brand-accent`).
2. **Padding Superior Obrigatório para o Menu Flutuante:** Toda página deve implementar `.main-content-layout` com `padding-top` equivalente à altura do menu flutuante *frosted glass* (`--header-height: 4.5rem;` no desktop e `4rem;` no mobile).
3. **Hierarquia Autor / Admin e Coluna Obrigatória:** **Todo autor é um admin, mas nem todo admin é autor.** Todo autor possui obrigatoriamente uma coluna exclusiva (`colunas`) e tem acesso administrativo completo; já um admin não-autor gerencia a plataforma sem ter coluna.
4. **Ciclo de 2 Estados (`edicao` e `publicado`) & Autonomia do Autor:** Não há agendamento. Artigos em `edicao` são visíveis apenas para `autor` e `admin` (que podem deixar comentários/sugestões internas), mas **somente o autor original pode modificar seu texto e mudá-lo para `publicado`**.
5. **Duas Rotas Autorais Complementares:** `/autor/[slug]` exibe o perfil biográfico do colunista e `/coluna-arquivo/[slug]` exibe o acervo histórico da sua coluna.
6. **Dados Reais dos Envolvidos no Protótipo:** Os mocks do protótipo utilizam os 5 autores oficiais (**Lucas Campos**, **Danillo Reis**, **Sergio Rodrigues**, **Lara Lima** e **Guliver Elias**), com **pelo menos 3 textos por autor (mínimo de 15 textos)** divididos entre as 5 editorias, além do componente `PrototypeRoleSwitcher`.
7. **Política de Imagens 100% Compatível com Open Graph:** `images: { unoptimized: true }` no `next.config.ts`, com compressão client-side em **JPEG (`image/jpeg`, qualidade 0.82, $\le 120\text{ KB}$)** para compatibilidade nativa total com `@vercel/og` (Satori), WhatsApp e Instagram.
8. **Zero Erros em Verificações:** Todo commit ou entrega deve passar sem falhas em `npx tsc --noEmit` e `npm run lint`.
9. **URLs Semânticas e Humanas (Sem IDs de Banco de Dados):** As rotas de leitura pública de artigos utilizam exclusivamente o padrão `/coluna/[slug]`, onde o `slug` é gerado via `slugify` a partir do título do artigo em `kebab-case` (sem acentos, minúsculas, palavras separadas por hífen). É estritamente proibido exibir IDs numéricos ou UUIDs nas URLs públicas.

---

## 5. Autores Oficiais do Protótipo, Seletor de Visão & Variáveis de Ambiente

* **Os 5 Autores Titulares (Colunistas + Admins) nos Mocks (`src/services/mocks/`):**
  1. **Lucas Campos** (`lucas@aresta.com.br`, `papel = 'autor'`) — **Coluna de Lucas** (`/coluna-arquivo/coluna-de-lucas`) — $\ge 3$ textos.
  2. **Danillo Reis** (`danillo@aresta.com.br`, `papel = 'autor'`) — **Coluna de Danillo** (`/coluna-arquivo/coluna-de-danillo`) — $\ge 3$ textos.
  3. **Sergio Rodrigues** (`sergio@aresta.com.br`, `papel = 'autor'`) — **Coluna de Sergio** (`/coluna-arquivo/coluna-de-sergio`) — $\ge 3$ textos.
  4. **Lara Lima** (`lara@aresta.com.br`, `papel = 'autor'`) — **Coluna de Lara** (`/coluna-arquivo/coluna-de-lara`) — $\ge 3$ textos.
  5. **Guliver Elias** (`guliver@aresta.com.br`, `papel = 'autor'`) — **Coluna de Guliver** (`/coluna-arquivo/coluna-de-guliver`) — $\ge 3$ textos.
* **Demais Personas do `PrototypeRoleSwitcher`:**
  * **🛡️ Admin (Não-Autor):** `admin@aresta.com.br` (`papel = 'admin'`, sem coluna própria) — acessa `/admin`, gerencia capa e comenta sugestões em textos em `'edicao'`.
  * **📖 Leitor Logado:** `leitor@aresta.com.br` (`papel = 'leitor'`) — vê apenas textos publicados, comenta e favorita.
  * **👀 Visitante Anônimo:** Sessão deslogada (`user = null`).
* **Variáveis de Ambiente Futuras (`.env.local` na Sprint 5):**
  * `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`.

---

## 6. Status Atual & Próximas Etapas

* **Fase Atual:** Sprint 4 concluída — protótipo navegável completo (mocks + `PrototypeRoleSwitcher`), com 36 testes Vitest e build de 40 páginas, pronto para o deploy na Vercel.
* **Próxima Fase:** Deploy na Vercel (definir `NEXT_PUBLIC_SITE_URL`, ver `.env.example`) e, em seguida, **Sprint 5** (Supabase).

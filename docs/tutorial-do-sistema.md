# 📘 Tutorial Completo & Manual de Uso do Sistema | Aresta Revista

> **Arquivo:** `docs/tutorial-do-sistema.md`  
> **Finalidade:** Explicar de forma didática e passo a passo a estrutura do portal, os fluxos de navegação, o ciclo de 2 status (`edicao` e `publicado`), a revisão colaborativa entre autores/admins e o uso do Seletor de Visão (`PrototypeRoleSwitcher`).  
> **Última Atualização:** 07/11/2026

---

## 📑 Sumário

- [1. Visão Geral da Estrutura do Portal (Mapa de Telas)](#1-visão-geral-da-estrutura-do-portal-mapa-de-telas)
  - [1.1 Fluxograma de Navegação](#11-fluxograma-de-navegação)
  - [1.2 Anatomia das Rotas e Componentes](#12-anatomia-das-rotas-e-componentes)
  - [1.3 Como Usar o Seletor de Visão no Protótipo (`PrototypeRoleSwitcher`)](#13-como-usar-o-seletor-de-visão-no-protótipo-prototyperoleswitcher)
- [2. Manual do Leitor: Como Navegar, Ler e Compartilhar](#2-manual-do-leitor-como-navegar-ler-e-compartilhar)
  - [2.1 Navegando pela Capa Editorial e pelas 5 Editorias](#21-navegando-pela-capa-editorial-e-pelas-5-editorias)
  - [2.2 Experiência de Leitura Imersiva (`/coluna/[slug]`)](#22-experiência-de-leitura-imersiva-colunaslug)
  - [2.3 Perfil do Colunista (`/autor/[slug]`) vs. Acervo da Coluna (`/coluna-arquivo/[slug]`)](#23-perfil-do-colunista-autorslug-vs-acervo-da-coluna-coluna-arquivoslug)
- [3. Manual do Autor / Colunista: Escrita, Revisão Colaborativa e Publicação](#3-manual-do-autor--colunista-escrita-revisão-colaborativa-e-publicação)
  - [3.1 Acessando o Painel do Autor (`/painel`)](#31-acessando-o-painel-do-autor-painel)
  - [3.2 Redigindo um Artigo: Título, Lead, Editoria, Capa JPEG e Corpo](#32-redigindo-um-artigo-título-lead-editoria-capa-jpeg-e-corpo)
  - [3.3 Comentando Textos em Edição de Outros Autores](#33-comentando-textos-em-edição-de-outros-autores)
  - [3.4 Publicando Seu Próprio Texto (`edicao` → `publicado`)](#34-publicando-seu-próprio-texto-edicao--publicado)
- [4. Manual do Administrador (`/admin`): Destaques da Capa, Colunistas e Meu Perfil](#4-manual-do-administrador-admin-destaques-da-capa-colunistas-e-meu-perfil)
  - [4.1 Montando a Grade de Destaques da Capa (Hero e Apoios)](#41-montando-a-grade-de-destaques-da-capa-hero-e-apoios)
  - [4.2 Gerenciando o Corpo de Colunistas e Registrando Novos Membros da Equipe](#42-gerenciando-o-corpo-de-colunistas-e-registrando-novos-membros-da-equipe)
  - [4.3 Editando Seu Próprio Perfil e Assinatura Editorial](#43-editando-seu-próprio-perfil-e-assinatura-editorial)
- [5. Manual da Área do Leitor (`/conta`)](#5-manual-da-área-do-leitor-conta)
  - [5.1 Acessando a Conta](#51-acessando-a-conta)
  - [5.2 Funcionalidades Disponíveis para o Leitor](#52-funcionalidades-disponíveis-para-o-leitor)
- [6. Guia Rápido de Manutenção para Desenvolvedores](#6-guia-rápido-de-manutenção-para-desenvolvedores)
  - [6.1 Onde Alterar Cada Regra, Estilo ou Dado?](#61-onde-alterar-cada-regra-estilo-ou-dado)
  - [6.2 Comandos e Validação Local](#62-comandos-e-validação-local)

---

## 1. Visão Geral da Estrutura do Portal (Mapa de Telas)

### 1.1 Fluxograma de Navegação

```mermaid
flowchart TD
    CAPA["📰 Capa da Revista (/)<br/>Hero, Destaques, 5 Editorias e Colunistas"] --> ARTIGO["📖 Leitor Imersivo (/coluna/[slug])<br/>Artigo Publicado, Conforto Visual e Assinatura"]
    CAPA --> CAT["🏷️ As 5 Editorias (/editoria/[slug])<br/>Política, Cultura, Entretenimento, Ensaios, Esporte"]
    CAPA --> COL_ARQ["📚 Acervo da Coluna (/coluna-arquivo/[slug])<br/>Manifesto da Coluna, Seguir e Todos os Artigos"]
    CAPA --> AUTOR["✍️ Perfil do Colunista (/autor/[slug])<br/>Biografia, Redes Sociais e Link da Coluna"]
    CAT --> ARTIGO
    COL_ARQ --> ARTIGO
    AUTOR --> COL_ARQ
    AUTOR --> ARTIGO
    LOGIN["🔐 Login Google (/login)<br/>ou Role Switcher no Protótipo"] --> PAINEL["📝 Painel do Autor (/painel)<br/>Meus Textos (Edição / Publicado) e Redação"]
    LOGIN --> ADMIN["🛡️ Administração (/admin)<br/>Textos em Edição, Destaques da Capa e Usuários"]
    PAINEL --> EDITOR["🖋️ Editor & Bancada (/painel/editor)<br/>Autor edita/publica; colegas deixam sugestões"]
```

---

### 1.2 Anatomia das Rotas e Componentes

| Rota | Público | Finalidade Principal |
| :--- | :--- | :--- |
| **`/`** | Público Geral | Capa editorial com manchete principal (*Hero*), destaques secundários, vitrine *"Últimas das Colunas"* e feeds das 5 editorias. |
| **`/coluna/[slug]`** | Público Geral | Página de leitura imersiva para artigos com `status = 'publicado'`, controles tipográficos `[A-] [A+]`, temas, *Quote Card* e comentários. |
| **`/editoria/[slug]`** | Público Geral | Arquivo de artigos publicados filtrados por uma das **5 grandes editorias** (*Política*, *Cultura*, *Entretenimento*, *Ensaios*, *Esporte*). |
| **`/autor/[slug]`** | Público Geral | **Página de Perfil do Colunista:** biografia completa, foto, redes sociais, destaque da sua coluna titular e seus 3 textos mais recentes. |
| **`/coluna-arquivo/[slug]`** | Público Geral | **Acervo da Coluna do Autor:** banner, manifesto da coluna, botão *"Seguir esta Coluna"* e listagem cronológica completa de todos os textos publicados na coluna. |
| **`/conta`** | Leitores Autenticados | **Área do Leitor:** dados cadastrais, preferências de newsletters, colunas que está seguindo e zona de privacidade/LGPD com exclusão de conta. |
| **`/busca`** | Público Geral | Busca em tempo real integrada ao Header com popover e resultados instantâneos. |
| **`/painel`** | Autores e Admins | Centro de controle do colunista com seus textos (`edicao` e `publicado`) e a aba *"Redação Geral"* para ver e comentar textos em edição de outros autores. |
| **`/painel/editor`** | Autores e Admins | Editor Tiptap/Markdown (editável **apenas pelo autor titular do texto**) + Mural Lateral de Revisão Colaborativa para outros autores e admins. |
| **`/admin`** | Administradores e Autores | Mesa editorial: curadoria dos Destaques da Capa (Hero e seções), gestão do corpo de Colunistas (com modal para registrar membros da equipe) e Meu Perfil. |

---

### 1.3 Como Usar o Seletor de Visão no Protótipo (`PrototypeRoleSwitcher`)

No link público de testes da Vercel (`aresta-revista.vercel.app`), há uma barra flutuante no canto inferior esquerdo que permite alternar em 1 clique entre os autores reais do projeto (**Lucas Campos**, **Danillo Reis**, **Sergio Rodrigues**, **Lara Lima** e **Guliver Elias**) e demais perfis:
* **✍️ Autor / Admin (Lucas, Danillo, Sergio, Lara ou Guliver):** Como **todo autor é um admin e tem sua própria coluna**, essa visão libera tanto o `/painel` (para editar e publicar textos da própria coluna) quanto o `/admin` (para gerir a capa e ver todos os textos em `'edicao'`). Ao abrir o texto em `'edicao'` de outro autor, o modo é somente leitura com envio de sugestões.
* **🛡️ Admin Não-Autor (`admin@aresta.com.br`):** Demonstra que *nem todo admin é autor*: acessa o `/admin`, escolhe os destaques da capa e comenta sugestões nos textos em `'edicao'`, mas não possui coluna própria.
* **📖 Leitor Logado:** Vê apenas artigos publicados e pode postar comentários públicos e favoritar artigos.
* **👀 Visitante Anônimo:** Simula um leitor sem login.

---

## 2. Manual do Leitor: Como Navegar, Ler e Compartilhar

### 2.1 Navegando pela Capa Editorial e pelas 5 Editorias
1. **Acesso à Capa:** Na página principal, o leitor visualiza a manchete *Hero* e os destaques curados da edição.
2. **Filtragem por Temas:** O menu superior com efeito *frosted glass* permite navegar pelas **5 editorias oficiais**:
   * **Política:** Conjuntura institucional, cidadania, sustentabilidade e poder no Brasil Central.
   * **Cultura:** Literatura, patrimônio histórico, arquitetura, música e memória.
   * **Entretenimento:** Cinema, audiovisual, festivais, streaming e cultura pop.
   * **Ensaios:** Ensaios teóricos, reflexões críticas de fundo e debates estéticos.
   * **Esporte:** Crônicas esportivas, futebol popular, arquibancadas e impacto social.

### 2.2 Experiência de Leitura Imersiva (`/coluna/[slug]`)
* O texto é apresentado em coluna centralizada (`max-w-[68ch]`) com controles `[A-]` e `[A+]` e alternância entre os temas *Papel Linho*, *Branco Puro* e *Modo Noturno*.
* Ao selecionar um trecho do texto, surge o botão flutuante **"Criar Card de Citação"** (*Quote Card*).

### 2.3 Perfil do Colunista (`/autor/[slug]`) vs. Acervo da Coluna (`/coluna-arquivo/[slug]`)
* Clique no **nome ou foto do autor** para abrir `/autor/[slug]` e conhecer sua biografia e redes sociais.
* Clique no **nome da coluna** para abrir `/coluna-arquivo/[slug]`, ler o manifesto da coluna, clicar em *"Seguir esta Coluna"* e navegar por todo o histórico de artigos publicados nela.

---

## 3. Manual do Autor / Colunista: Escrita, Revisão Colaborativa e Publicação

### 3.1 Acessando o Painel do Autor (`/painel`)
O painel do colunista organiza a rotina da redação em três abas objetivas:
1. **Em Produção:** Seus rascunhos e ensaios em fase de escrita (invisíveis no site público). Cada artigo conta com:
   * Botão **"Editar"** (`/painel/editor/[id]`);
   * Botão **"Comentários (n)"** que abre o modal de sugestões recebidas da redação com indicador de pendências;
   * Botão carmim de destaque **"Publicar Agora"** com confirmação imediata.
2. **Publicados:** Artigos de sua autoria que já estão no ar na revista, com data de publicação, link para a página pública no ar e botão de edição para correções.
3. **Redação Geral:** Textos em fase de produção (`status = 'edicao'`) dos demais colunistas da revista, com identificação do colega titular e botão **"Visualizar Texto & Comentar"**.

### 3.2 Redigindo um Ensaio: Título, Lead, Editoria, Capa Otimizada e Editor Tiptap
1. Clique em **"Novo Ensaio"** no topo do painel para abrir a página dedicada `/painel/editor/novo`.
2. Preencha Título, Subtítulo/Lead, selecione 1 das 5 Editorias Oficiais e informe as Tags.
3. Gerencie a imagem de capa:
   * Faça upload de imagem: o sistema redimensiona e comprime proporcionalmente no navegador para **JPEG (`image/jpeg`, qualidade 0.82, $\le 120\text{ KB}$)**, exibindo o selo de otimização;
   * Ou utilize em 1 clique o botão **"Usar Capa Padrão aresta."**, que aplica o asset oficial com fundo carmim `#B91C1C` e a logo dentro da pílula branca (`/images/default-cover.svg`), prevenindo qualquer falha de imagem no portal.
4. Escreva no editor WYSIWYG **Tiptap**, com barra de ferramentas para negrito, itálico, subtítulos H2/H3, citações em destaque e listas, com cálculo automático em tempo real do tempo estimado de leitura (baseado em 200 palavras/minuto).
5. Clique em **"Salvar Rascunho"** para persistir as alterações mantendo o status em produção.

### 3.3 Revisando Textos dos Colegas na Redação Geral
* Na aba **"Redação Geral"**, clique em **"Visualizar Texto & Comentar"** em qualquer artigo de outro colunista.
* A tela abrirá em **modo leitura/revisão** para proteger a autoria do colega (os botões de editar e publicar ficam bloqueados com aviso explicativo).
* Selecione qualquer trecho do texto com o mouse para citá-lo automaticamente no **Mural Lateral de Sugestões** (`EditorialReviewSidebar`) ou digite observações gerais e clique em Enviar.
* Apenas o autor titular do texto e o autor do comentário podem marcar sugestões como resolvidas.

### 3.4 Publicando Seu Próprio Texto (`edicao` → `publicado`)
* **Autonomia Total do Autor:** Quando considerar o texto pronto para o público, clique no botão carmim **"Publicar Agora"** no painel ou no topo do editor.
* **Trava de Autoria Inviolável:** O sistema valida estritamente se o usuário conectado é o autor titular (`autor_id`). Ninguém além do autor original tem autorização técnica para colocar o texto no ar.
* Assim que publicado, o artigo entra imediatamente na capa, na página da editoria, na página da coluna e no perfil do autor. Caso precise fazer ajustes depois, o autor pode reverter o artigo para o status de produção a qualquer momento.

---

## 4. Manual do Administrador (`/admin`): Destaques da Capa, Colunistas e Meu Perfil

### 4.1 Montando a Grade de Destaques da Capa (Hero e Apoios)
1. Acesse `/admin` e abra a aba **"Destaques da Capa"**.
2. Veja a Manchete Principal (*Hero Article*) atual. Para alterá-la, clique em **"Trocar Manchete Principal"**, selecione qualquer artigo publicado no modal e confirme. O sistema atribui o destaque Hero e remove o status anterior automaticamente.
3. Clique em **"Gerenciar Apoios Secundários"** para ativar ou remover artigos secundários da grade de apoio superior da Home.

### 4.2 Gerenciando o Corpo de Colunistas e Registrando Novos Membros da Equipe
1. Na aba **"Colunistas"**, visualize a listagem exclusiva dos colunistas titulares da casa, contagem de artigos publicados e links diretos para seus perfis e acervos.
2. Clique no botão **"Registrar Membro da Equipe"**:
   * O modal permite buscar um leitor cadastrado na base (por exemplo, buscando por "Mariana") ou registrar um novo membro.
   * Selecione o papel (`Autor Titular` ou `Administrador`).
   * Se for promovido a `Autor`, insira o **Nome da Coluna** e o **Manifesto da Coluna** (garantindo a regra inviolável de que *todo autor tem uma coluna exclusiva*).

### 4.3 Editando Seu Próprio Perfil e Assinatura Editorial
1. Na aba **"Meu Perfil"**, o autor ou administrador pode editar em tempo real:
   * Nome completo e e-mail institucional;
   * URL da foto de perfil (avatar);
   * Minibiografia editorial (utilizada na assinatura de rodapé dos ensaios e na página biográfica `/autor/[slug]`);
   * Presença digital: perfis no X (Twitter), Instagram, LinkedIn e site pessoal;
   * Nome e manifesto da sua coluna titular (para colunistas).
2. As alterações são persistidas imediatamente e refletem em todas as páginas públicas do site.

---

## 5. Manual da Área do Leitor (`/conta`)

### 5.1 Acessando a Conta
* Visitantes anônimos contam com o botão **"Entrar"** no cabeçalho do portal, que abre o modal de boas-vindas com simulação de login com Google em 1 clique.
* Leitores autenticados podem clicar em seu nome no topo para acessar diretamente [`/conta`](file:///e:/Maicon/DEV/aresta-revista/src/app/conta).

### 5.2 Funcionalidades Disponíveis para o Leitor
* **Meus Dados:** Edição de nome, e-mail e foto de perfil.
* **Newsletters & Colunas Seguidas:** Controle da inscrição na *Newsletter Semanal Aresta* e gerenciamento com 1 clique das colunas que está seguindo (com botões de toggle ativo/inativo).
* **Artigos Salvos para Depois:** Lista de leitura particular com ensaios favoritados.
* **Privacidade & LGPD:** Esclarecimento de direitos e botão de **Exclusão Definitiva de Conta** com modal de segurança exigindo digitação da palavra "EXCLUIR" para confirmação.

---

## 6. Guia Rápido de Manutenção para Desenvolvedores

### 6.1 Onde Alterar Cada Regra, Estilo ou Dado?
* **Cores (`#B91C1C`), Fontes e Classes Semânticas:** `src/styles/theme.css` e [`docs/dicionario-de-dados.md`](./dicionario-de-dados.md).
* **Regras de Negócio e Fluxo `edicao`/`publicado`:** [`docs/regras-de-negocio.md`](./regras-de-negocio.md).
* **Camada de Serviços (7 Repositórios):** `src/services/` (`artigosService`, `revisaoService`, `autoresService`, `categoriasService`, `interacoesService`, `authService`, `storageService`).

### 6.2 Comandos e Validação Local
```bash
# Servidor de desenvolvimento
npm run dev

# Checagem de tipagem estrita
npx tsc --noEmit

# Análise estática com ESLint
npm run lint

# Execução de testes unitários
npm test
```

# 🎨 Manual de Identidade Visual, Marca & Layout | Aresta Revista

> **Arquivo:** `docs/identidade-visual.md`  
> **Finalidade:** Definir os padrões de design, anatomia do logotipo oficial em **Svetze** (`public/fonts/Svetze.otf`), paleta cromática centralizada no vermelho carmim (`#B91C1C`) com alto contraste escuro (`#09090B`), tipografia editorial, especificações do Header Duplo (Header Estático estilo Portal/G1 com clone completo do menu + Menu Flutuante *Frosted Glass* real com `bg-white/30 backdrop-blur-md border-white/20 shadow-lg`) e regras de layout.  
> **Última Atualização:** 07/11/2026

---

## 📑 Sumário

- [1. Anatomia da Marca & Logotipo Oficial](#1-anatomia-da-marca--logotipo-oficial)
  - [1.1 Construção do Logotipo `aresta.` & Fonte Oficial (`Svetze`)](#11-construção-do-logotipo-aresta--fonte-oficial-svetze)
  - [1.2 O Ponto Vermelho Carmim (`.`)](#12-o-ponto-vermelho-carmim-)
  - [1.3 Versões de Aplicação](#13-versões-de-aplicação)
- [2. Paleta de Cores Institucional](#2-paleta-de-cores-institucional)
  - [2.1 Cores Base da Revista (Modo Claro & Modo Noturno)](#21-cores-base-da-revista-modo-claro--modo-noturno)
  - [2.2 Cores Temáticas das 5 Editorias Oficiais](#22-cores-temáticas-das-5-editorias-oficiais)
- [3. Sistema Tipográfico Editorial](#3-sistema-tipográfico-editorial)
  - [3.1 Tipografia da Marca & Header (`Svetze`)](#31-tipografia-da-marca--header-svetze)
  - [3.2 Tipografia de Títulos de Artigos](#32-tipografia-de-títulos-de-artigos)
  - [3.3 Tipografia de Leitura Imersiva](#33-tipografia-de-leitura-imersiva)
  - [3.4 Tipografia de Interface & Metadados](#34-tipografia-de-interface--metadados)
- [4. Header Duplo: Header Estático de Topo (Portal / G1) & Menu Flutuante Frosted Glass](#4-header-duplo-header-estático-de-topo-portal--g1--menu-flutuante-frosted-glass)
  - [4.1 Header Estático de Topo (Logo Grande + Clone Completo do Menu)](#41-header-estático-de-topo-logo-grande--clone-completo-do-menu)
  - [4.2 Menu Flutuante Fixo com Efeito Frosted Glass Real](#42-menu-flutuante-fixo-com-efeito-frosted-glass-real)
- [5. Governança de Tema & Prevenção de Letras Brancas em Fundo Branco](#5-governança-de-tema--prevenção-de-letras-brancas-em-fundo-branco)
- [6. Elementos Gráficos & Compartilhamento Visual](#6-elementos-gráficos--compartilhamento-visual)
  - [6.1 Máscara de Degradê Editorial para Redes](#61-máscara-de-degradê-editorial-para-redes)
  - [6.2 Cartões de Citação (*Quote Cards*)](#62-cartões-de-citação-quote-cards)

---

## 1. Anatomia da Marca & Logotipo Oficial

### 1.1 Construção do Logotipo `aresta.` & Fonte Oficial (`Svetze`)

O logotipo oficial da publicação e o título principal do Header são compostos estritamente em **caixa baixa** utilizando a fonte **`Svetze`** (`public/fonts/Svetze.otf`, `font-weight: 400`) e ponto final colorido.
* **Grafia Oficial Completa:** `aresta.` (sempre em letras minúsculas, peso Regular 400, acompanhado do ponto final carmim).
* **Versão Compacta da Barra de Menu:** `a.` (letra `a` minúscula em `Svetze` na cor escura `#09090B` seguida do ponto vermelho carmim `#B91C1C`).
* **Arquivo Oficial da Fonte Local:** [`public/fonts/Svetze.otf`](../public/fonts/Svetze.otf) (carregado via `next/font/local` no `layout.tsx` e `@font-face` no `src/styles/theme.css`).
* **Conceito:** O uso da caixa baixa desmistifica a empáfia dos jornais tradicionais, conferindo proximidade intimista, elegância literária e modernidade editorial.

### 1.2 O Ponto Vermelho Carmim (`.`)

O ponto final e toda a cor de destaque institucional da revista são centralizados no tom **vermelho carmim (`#B91C1C` / `--color-brand-accent`)**:
* Simboliza o **ponto de vista**, o fim da hesitação e a precisão do corte analítico.
* Atua tanto no ponto do logotipo `aresta.` quanto na versão compacta `a.`, além de fios de divisão, kickers de seção, indicadores de navegação ativa e botões nobres da interface.

### 1.3 Versões de Aplicação

1. **Aplicação Principal (Fundo Claro / Papel):** Texto em preto profundo carvão (`#09090B`) e ponto em vermelho carmim (`#B91C1C`) sobre fundo linho/off-white (`#FBFBF9`).
2. **Aplicação Invertida (Modo Noturno / Dark):** Texto em off-white (`#FBFBF9`) e ponto em vermelho carmim (`#DC2626`) sobre fundo preto carvão (`#09090B`).
3. **Versão Compacta / Favicon:** A letra `a.` minúscula em `Svetze` com o ponto vermelho carmim, colada à esquerda na barra de navegação.

---

## 2. Paleta de Cores Institucional

### 2.1 Cores Base da Revista (Modo Claro & Modo Noturno)

A cor de destaque institucional é unificada no token `--color-brand-accent` (`#B91C1C`). Os tons de texto são escuros e profundos para garantir contraste máximo sobre fundos claros.

| Nome do Token | Variável CSS | HEX (Claro) | HEX (Noturno `.dark`) | Finalidade no Layout |
| :--- | :--- | :---: | :---: | :--- |
| **Ink Primary** | `--color-ink-primary` | `#09090B` | `#FBFBF9` | Tipografia da logo, links do menu, manchetes e títulos principais. |
| **Ink Secondary** | `--color-ink-secondary` | `#18181B` | `#E4E4E7` | Corpo dos artigos de longa duração e subtítulos (máxima nitidez). |
| **Ink Muted** | `--color-ink-muted` | `#3F3F46` | `#A1A1AA` | Metadados, tempo de leitura, datas e legendas. |
| **Brand Accent** | `--color-brand-accent` | `#B91C1C` | `#DC2626` | Ponto do logotipo `aresta.`, ponto de `a.`, barra de progresso e botões nobres. |
| **Brand Accent Hover** | `--color-brand-accent-hover` | `#991B1B` | `#B91C1C` | Estado de hover/active em botões e links de destaque carmim. |
| **Paper Background** | `--color-paper-bg` | `#FBFBF9` | `#09090B` | Fundo principal da revista (papel linho no claro / carvão no escuro). |
| **Paper Surface** | `--color-paper-surface` | `#FFFFFF` | `#18181B` | Superfície de cartões, modais, gavetas e áreas destacadas. |
| **Border Subtle** | `--color-border-subtle` | `#E4E4E7` | `#27272A` | Linhas de corte tipográficas ultrafinas e divisórias. |

### 2.2 Cores Temáticas das 5 Editorias Oficiais

Nomes enxutos compostos por uma única palavra, utilizados em pílulas (*badges*), kickers de manchete e marcadores temáticos:

| Editoria | Token CSS | Código HEX | Amostra Visual |
| :--- | :--- | :---: | :--- |
| **Política** | `--color-cat-politica` | `#1E3A8A` | Azul Sóbrio Institucional |
| **Cultura** | `--color-cat-cultura` | `#854D0E` | Âmbar Terroso Literário |
| **Entretenimento** | `--color-cat-entretenimento` | `#701A75` | Púrpura Editorial Contemporâneo |
| **Ensaios** | `--color-cat-ensaios` | `#9A3412` | Terracota / Ferrugem |
| **Esporte** | `--color-cat-esporte` | `#0F766E` | Verde Petróleo / Esmalte |

---

## 3. Sistema Tipográfico Editorial

### 3.1 Tipografia da Marca & Header (`Svetze`)
* **Token CSS:** `--font-logo` (`var(--font-svetze, 'Svetze'), 'Svetze', Georgia, serif`)
* **Arquivo Local:** `public/fonts/Svetze.otf` (`font-weight: 400`).
* **Uso:** Logotipo principal `aresta.`, títulos dinâmicos de editoria no header de topo (`política.`, `cultura.`, `entretenimento.`, `ensaios.`, `esporte.`), logotipo compacto `a.` das barras de menu e logotipo no rodapé.

### 3.2 Tipografia de Títulos de Artigos
* **Token CSS:** `--font-serif` (`'Newsreader', 'Playfair Display', Georgia, serif`)
* **Uso:** Manchete principal (*Hero*), títulos de artigos e citações de grande escala.

### 3.3 Tipografia de Leitura Imersiva
* **Token CSS:** `--font-reading` (`'Lora', 'Charter', Georgia, serif`)
* **Entrelinha (*Line-Height*):** `1.75` (ampla e arejada).
* **Largura Máxima:** `68ch` (aproximadamente 68 a 72 caracteres por linha).

### 3.4 Tipografia de Interface & Metadados
* **Token CSS:** `--font-sans` (`'Plus Jakarta Sans', system-ui, sans-serif`)
* **Pesos:** 500 (Medium), 600 (Semi-Bold), 700 (Bold).
* **Uso:** Links de navegação do menu (em cor escura `#09090B` de alto contraste), botões, tags, tempo de leitura e formulários.

---

## 4. Header Duplo: Header Estático de Topo (Portal / G1) & Menu Flutuante Frosted Glass

A navegação da revista opera sob uma arquitetura de dois momentos perfeitamente sincronizados através do componente compartilhado `EditorialNavbarBar`:

### 4.1 Header Estático de Topo (Logo Grande + Clone Completo do Menu)
* Posicionado no fluxo normal do topo de toda página (`HeaderPortal.tsx`).
* **Parte Superior (`.header-portal-brand-area`):**
  * Exibe o título editorial dinâmico em **`Svetze`** (`--font-logo`, peso 400):
    * Na Capa (`/`): exibe **`aresta.`**.
    * Nas páginas de editoria: exibe o nome explícito da categoria em caixa baixa com ponto carmim (**`política.`**, **`cultura.`**, **`entretenimento.`**, **`ensaios.`** ou **`esporte.`**), exatamente como no portal G1.
* **Parte Inferior (`.header-portal-bar` — Clone Exato do Menu Flutuante):**
  * Renderiza o componente `<EditorialNavbarBar />`, contendo exatamente os mesmos componentes do menu flutuante:
    * **Extrema Esquerda:** Logotipo compacto `a.` em `Svetze` colado na esquerda.
    * **Centro Absoluto da Tela com Espaçamento Variável & Auto-Colapso por Colisão:** Os 5 links de navegação (`Política`, `Cultura`, `Entretenimento`, `Ensaios`, `Esporte`) mantêm centralização absoluta (`left: 50%`, `transform: translate(-50%, -50%)`) com espaçamento responsivo fluido (`gap: clamp(0.5rem, 1.4vw, 2rem)` e padding adaptativo). Um observador de geometria contínua (`ResizeObserver`) mede a proximidade do menu com a logo à esquerda e os botões à direita: se a distância para qualquer elemento lateral atingir a margem de segurança de `24px` (ou em telas mobile/tablet), os links centrais colapsam de forma limpa e ativam o ícone hambúrguer no canto direito da barra, impedindo qualquer sobreposição.
    * **Extrema Direita:** Busca (`/busca`), botão "Escrever" (`/painel`), botão "Admin" (`/admin`) e o ícone do menu drawer posicionado no canto direito da tela (exibido em mobile e quando os links centrais colapsam).

### 4.2 Menu Flutuante Fixo com Efeito Frosted Glass Real
* Assim que o leitor rola a página e a faixa da logo grande (`.header-portal-brand-area`) sai pelo topo da viewport, o `<HeaderFrostedGlass />` assume instantaneamente no topo da tela (`position: fixed; top: 0; left: 0; right: 0;`), dando continuidade contínua à barra de menu.
* **Especificação CSS do Vidro Fosco (`bg-white/30 backdrop-blur-md border-white/20 shadow-lg`):**
  * Utiliza transparência de `30%` (`rgba(255, 255, 255, 0.30)`), `backdrop-filter: blur(12px)`, borda inferior translúcida (`rgba(255, 255, 255, 0.20)`) e sombra `shadow-lg`, preservando o ponto carmim `#B91C1C` intacto (diferente de `mix-blend-difference`, que inverteria o vermelho carmim para ciano) e desfocando com nitidez tudo que passa por baixo:

```css
/* Definição em src/styles/components/layout.css */
.header-editorial-frosted {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height, 4rem);
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  transition: opacity 0.25s ease, visibility 0.25s ease;
  opacity: 1;
  visibility: visible;
}

.header-editorial-frosted.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
```

---

## 5. Governança de Tema & Prevenção de Letras Brancas em Fundo Branco

> ⚠️ **REGRA TÉCNICA OBRIGATÓRIA:**  
> No Tailwind CSS 4, a variante `dark:` nunca deve responder à media query `@media (prefers-color-scheme: dark)` de forma isolada, pois isso causaria letras claras sobre fundo claro (`--color-paper-bg: #FBFBF9`) quando o sistema operacional do usuário estivesse em modo escuro.
> * Em `src/app/globals.css`, é obrigatória a diretiva `@custom-variant dark (&:where(.dark, .dark *));`.
> * Todos os componentes de menu e tipografia utilizam as classes semânticas (`.navbar-link`, `.navbar-logo-compact`, `.navbar-btn-outline`, `.navbar-btn-solid`) vinculadas às variáveis de `src/styles/theme.css`.

---

## 6. Elementos Gráficos & Compartilhamento Visual

### 6.1 Máscara de Degradê Editorial para Redes
Para a geração automática de imagens de compartilhamento (WhatsApp, X e Instagram Stories):
* Uma máscara escura em degradê vertical cobre a foto principal do artigo:
  `linear-gradient(180deg, rgba(9, 9, 11, 0.72) 0%, rgba(9, 9, 11, 0.88) 60%, rgba(9, 9, 11, 0.96) 100%)`.
* O título do artigo em tipografia serifa clara repousa sobre a máscara com contraste legível em qualquer tela.
* URL oficial estampada nos cartões: **`arestarevista.com`**.

### 6.2 Cartões de Citação (*Quote Cards*)
* Composição sobre a foto de capa com máscara escura;
* Aspas decorativas nobres em vermelho carmim (`#B91C1C`) e o trecho literal selecionado pelo leitor (sem edição manual);
* Logotipo oficial `aresta.` estritamente na fonte **`Svetze`** com ponto carmim `#B91C1C`;
* Assinatura do colunista e endereço canônico `arestarevista.com`.

### 6.3 Cartão de Instagram Story (9:16 - 1080x1920)
* Proporção vertical oficial de Stories (1080x1920) gerada via Canvas nativo;
* Foto de capa do artigo com máscara escurecedora contínua;
* Logotipo `aresta.` em **`Svetze`** no topo com ponto carmim `#B91C1C`;
* Título do ensaio, subtítulo e aspas editoriais;
* Assinatura do autor, coluna e indicação visual para uso da figurinha de link com destino para `arestarevista.com/coluna/[slug]`.

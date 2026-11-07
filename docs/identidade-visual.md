# 🎨 Manual de Identidade Visual, Marca & Layout | Aresta Revista

> **Arquivo:** `docs/identidade-visual.md`  
> **Finalidade:** Definir os padrões de design, anatomia do logotipo oficial, paleta cromática centralizada no vermelho carmim (`#B91C1C`), tipografia editorial, especificações do menu superior com efeito *frosted glass* (vidro fosco) e regras arquiteturais de layout para todas as páginas.  
> **Última Atualização:** 07/11/2026

---

## 📑 Sumário

- [1. Anatomia da Marca & Logotipo Oficial](#1-anatomia-da-marca--logotipo-oficial)
  - [1.1 Construção do Logotipo `aresta.`](#11-construção-do-logotipo-aresta)
  - [1.2 O Ponto Vermelho Carmim (`.`)](#12-o-ponto-vermelho-carmim-)
  - [1.3 Versões de Aplicação](#13-versões-de-aplicação)
- [2. Paleta de Cores Institucional](#2-paleta-de-cores-institucional)
  - [2.1 Cores Base da Revista (Modo Claro & Modo Noturno)](#21-cores-base-da-revista-modo-claro--modo-noturno)
  - [2.2 Cores Temáticas das 6 Editorias](#22-cores-temáticas-das-6-editorias)
- [3. Sistema Tipográfico Editorial](#3-sistema-tipográfico-editorial)
  - [3.1 Tipografia de Títulos e Logomarca](#31-tipografia-de-títulos-e-logomarca)
  - [3.2 Tipografia de Leitura Imersiva](#32-tipografia-de-leitura-imersiva)
  - [3.3 Tipografia de Interface & Metadados](#33-tipografia-de-interface--metadados)
- [4. Header Fixo & Efeito Frosted Glass (Vidro Fosco)](#4-header-fixo--efeito-frosted-glass-vidro-fosco)
  - [4.1 Comportamento Sticky / Flutuante](#41-comportamento-sticky--flutuante)
  - [4.2 Especificação CSS do Vidro Fosco](#42-especificação-css-do-vidro-fosco)
- [5. Regra Arquitetural Obrigatória: Padding Superior das Páginas](#5-regra-arquitetural-obrigatória-padding-superior-das-páginas)
  - [5.1 Prevenção de Sobreposição de Conteúdo](#51-prevenção-de-sobreposição-de-conteúdo)
  - [5.2 Padrão de Implementação](#52-padrão-de-implementação)
- [6. Elementos Gráficos & Compartilhamento Visual](#6-elementos-gráficos--compartilhamento-visual)
  - [6.1 Máscara de Degradê Editorial para Redes](#61-máscara-de-degradê-editorial-para-redes)
  - [6.2 Cartões de Citação (*Quote Cards*)](#62-cartões-de-citação-quote-cards)

---

## 1. Anatomia da Marca & Logotipo Oficial

### 1.1 Construção do Logotipo `aresta.`

O logotipo oficial da publicação é composto estritamente em **caixa baixa** com serifa clássica e ponto final colorido.
* **Grafia Oficial:** `aresta.` (sempre em letras minúsculas e acompanhado do ponto final).
* **Arquivo Oficial:** [`public/images/logo-aresta.png`](../public/images/logo-aresta.png).
* **Conceito:** O uso da caixa baixa desmistifica a empáfia dos jornais tradicionais, conferindo proximidade intimista, elegância literária e modernidade editorial.

### 1.2 O Ponto Vermelho Carmim (`.`)

O ponto final e toda a cor de destaque institucional da revista são centralizados no tom **vermelho carmim (`#B91C1C` / `--color-brand-accent`)**:
* Simboliza o **ponto de vista**, o fim da hesitação e a precisão do corte analítico.
* Atua tanto no ponto do logotipo `aresta.` quanto em fios de divisão, kickers de seção, indicadores de navegação ativa e botões nobres da interface.

### 1.3 Versões de Aplicação

1. **Aplicação Principal (Fundo Claro / Papel):** Texto em preto profundo (`#111827`) e ponto em vermelho carmim (`#B91C1C`) sobre fundo linho/off-white (`#FBFBF9`).
2. **Aplicação Invertida (Modo Noturno / Dark):** Texto em off-white (`#FBFBF9`) e ponto em vermelho carmim (`#B91C1C`) sobre fundo preto carvão (`#09090B`).
3. **Favicon / Ícone Compacto:** A letra `a.` em serifa com o ponto vermelho carmim.

---

## 2. Paleta de Cores Institucional

### 2.1 Cores Base da Revista (Modo Claro & Modo Noturno)

A cor de destaque institucional é unificada no token `--color-brand-accent` (`#B91C1C`). Para a tabela completa de tokens e equivalências Tailwind, consulte a Seção 1.1 de [`docs/dicionario-de-dados.md`](./dicionario-de-dados.md).

| Nome do Token | Variável CSS | HEX (Claro) | HEX (Noturno `.dark`) | Finalidade no Layout |
| :--- | :--- | :---: | :---: | :--- |
| **Ink Primary** | `--color-ink-primary` | `#111827` | `#FBFBF9` | Tipografia da logo, manchetes e títulos principais. |
| **Ink Secondary** | `--color-ink-secondary` | `#374151` | `#D4D4D8` | Corpo dos artigos de longa duração (máximo conforto). |
| **Ink Muted** | `--color-ink-muted` | `#6B7280` | `#A1A1AA` | Metadados, tempo de leitura, datas e legendas. |
| **Brand Accent** | `--color-brand-accent` | `#B91C1C` | `#DC2626` | Ponto do logotipo `aresta.`, fios de destaque, kickers e botões nobres. |
| **Brand Accent Hover** | `--color-brand-accent-hover` | `#991B1B` | `#B91C1C` | Estado de hover/active em botões e links de destaque carmim. |
| **Paper Background** | `--color-paper-bg` | `#FBFBF9` | `#09090B` | Fundo principal da revista (papel linho no claro / carvão no escuro). |
| **Paper Surface** | `--color-paper-surface` | `#FFFFFF` | `#18181B` | Superfície de cartões, modais, gavetas e áreas destacadas. |
| **Border Subtle** | `--color-border-subtle` | `#E5E7EB` | `#27272A` | Linhas de corte tipográficas ultrafinas e divisórias. |

### 2.2 Cores Temáticas das 6 Editorias

Utilizadas em pílulas (*badges*), kickers de manchete e marcadores temáticos:

| Editoria | Token CSS | Código HEX | Amostra Visual |
| :--- | :--- | :---: | :--- |
| **Política & Poder** | `--color-cat-politica` | `#1E3A8A` | Azul Sóbrio Institucional |
| **Cultura & Artes** | `--color-cat-cultura` | `#854D0E` | Âmbar Terroso Literário |
| **Entretenimento & Pop** | `--color-cat-entretenimento` | `#701A75` | Púrpura Editorial Contemporâneo |
| **Subjetividades** | `--color-cat-subjetividades` | `#065F46` | Verde Esmeralda Profundo |
| **Opinião & Ensaios** | `--color-cat-opiniao` | `#9A3412` | Terracota / Ferrugem |
| **Esporte & Sociedade** | `--color-cat-esporte` | `#0F766E` | Verde Petróleo / Esmalte |

---

## 3. Sistema Tipográfico Editorial

### 3.1 Tipografia de Títulos e Logomarca
* **Família:** `'Newsreader', 'Playfair Display', Georgia, serif`
* **Características:** Contraste marcante entre traços finos e grossos, terminais em gota refinados e elegância clássica.
* **Uso:** Logotipo `aresta.`, manchete principal (*Hero*), títulos de artigos e citações de grande escala.

### 3.2 Tipografia de Leitura Imersiva
* **Família:** `'Lora', 'Charter', Georgia, serif`
* **Entrelinha (*Line-Height*):** `1.75` (ampla e arejada).
* **Largura Máxima:** `68ch` (aproximadamente 68 a 72 caracteres por linha, padrão ouro para não fatigar o leitor).

### 3.3 Tipografia de Interface & Metadados
* **Família:** `'Plus Jakarta Sans', system-ui, sans-serif`
* **Pesos:** 500 (Medium), 600 (Semi-Bold), 700 (Bold).
* **Uso:** Links de navegação do menu, botões, tags, tempo de leitura e formulários.

---

## 4. Header Fixo & Efeito Frosted Glass (Vidro Fosco)

### 4.1 Comportamento Sticky / Flutuante
* O menu superior permanece fixo no topo da janela durante toda a navegação e rolagem da página (`position: fixed`, `top: 0`, com `z-index: 50`).
* Altura fixa padronizada: **`72px` (4.5rem)** no desktop e **`64px` (4rem)** no mobile.

### 4.2 Especificação CSS do Vidro Fosco
Para que o conteúdo da página deslize suavemente sob o menu sem comprometer a legibilidade dos links:

```css
/* Definição em src/styles/components/layout.css */
.header-editorial-frosted {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height, 4.5rem);
  z-index: 50;
  background-color: rgba(251, 251, 249, 0.85); /* Fundo papel translúcido */
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(229, 231, 235, 0.7);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Modo Noturno / Dark */
.dark .header-editorial-frosted {
  background-color: rgba(9, 9, 11, 0.85);
  border-bottom: 1px solid rgba(39, 39, 42, 0.7);
}
```

---

## 5. Regra Arquitetural Obrigatória: Padding Superior das Páginas

### 5.1 Prevenção de Sobreposição de Conteúdo

> ⚠️ **REGRA TÉCNICA INVIOLÁVEL:**  
> Como o cabeçalho possui posicionamento fixo/flutuante (`position: fixed`), o fluxo normal de layout do HTML não reserva espaço para ele. Portanto, **toda página (`page.tsx`) ou o container principal (`<main>`) deve obrigatoriamente possuir um espaçamento superior (`padding-top`) rigorosamente igual à altura do menu**, impedindo que a manchete, títulos ou elementos do início da página fiquem escondidos ou cortados sob o menu.

### 5.2 Padrão de Implementação

* **Variável Global de Altura:** `--header-height: 4.5rem;` (desktop) e `4rem;` (mobile).
* **Classe Semântica de Layout Obrigatória (`src/styles/components/layout.css`):**
  ```css
  .main-content-layout {
    min-height: 100vh;
    padding-top: var(--header-height, 4.5rem);
  }
  ```
* **No JSX de todas as páginas:**
  ```tsx
  <main className="main-content-layout">
    {/* O conteúdo da página inicia aqui com 100% de visibilidade garantida */}
  </main>
  ```

---

## 6. Elementos Gráficos & Compartilhamento Visual

### 6.1 Máscara de Degradê Editorial para Redes
Para a geração automática de imagens de compartilhamento (WhatsApp, X e Instagram Stories):
* Uma máscara preta em degradê vertical cobre a metade inferior da foto:
  `linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 50%, transparent 100%)`.
* O título do artigo em tipografia serifa clara repousa sobre a máscara com contraste legível em qualquer tela.

### 6.2 Cartões de Citação (*Quote Cards*)
* Fundo linho com aspas decorativas nobres em vermelho carmim (`#B91C1C`) e a frase selecionada pelo leitor;
* Assinatura do colunista e logotipo `aresta.` com ponto vermelho carmim no canto inferior direito.

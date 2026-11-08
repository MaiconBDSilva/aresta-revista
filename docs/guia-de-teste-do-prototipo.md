# 🧪 Guia de Teste do Protótipo Navegável | Aresta Revista

> **Arquivo:** `docs/guia-de-teste-do-prototipo.md`  
> **Finalidade:** Servir como roteiro oficial e amigável de apresentação e testes do protótipo navegável para os colunistas titulares (**Lucas Campos**, **Danillo Reis**, **Sergio Rodrigues**, **Lara Lima** e **Guliver Elias**), editores e parceiros da revista aresta.  
> **Última Atualização:** 08/11/2026

---

## 📑 Sumário

- [1. Boas-Vindas & Objetivo deste Protótipo](#1-boas-vindas--objetivo-deste-protótipo)
- [2. Como o Protótipo Funciona (e Suas Limitações Técnicas)](#2-como-o-protótipo-funciona-e-suas-limitações-técnicas)
  - [2.1 Por que Não Há Banco de Dados Central Conectado Ainda?](#21-por-que-não-há-banco-de-dados-central-conectado-ainda)
  - [2.2 Isolamento Entre Aparelhos (O Que Você Faz Fica no Seu Navegador)](#22-isolamento-entre-aparelhos-o-que-você-faz-fica-no-seu-navegador)
  - [2.3 Como Restaurar os Dados de Fábrica (Botão Mágico de Reset)](#23-como-restaurar-os-dados-de-fábrica-botão-mágico-de-reset)
  - [2.4 Upload de Imagens no Protótipo](#24-upload-de-imagens-no-protótipo)
- [3. A Chave dos Testes: O Seletor de Visão (`PrototypeRoleSwitcher`)](#3-a-chave-dos-testes-o-seletor-de-visão-prototyperoleswitcher)
  - [3.1 Onde Encontrá-lo e Como Usar](#31-onde-encontrá-lo-e-como-usar)
  - [3.2 Os Perfis Prontos para Simulação](#32-os-perfis-prontos-para-simulação)
- [4. Checklist Passo a Passo por Funcionalidade](#4-checklist-passo-a-passo-por-funcionalidade)
  - [4.1 Módulo 1: Capa Editorial & Navegação](#41-módulo-1-capa-editorial--navegação)
  - [4.2 Módulo 2: Experiência de Leitura Imersiva (`/coluna/[slug]`)](#42-módulo-2-experiência-de-leitura-imersiva-colunaslug)
  - [4.3 Módulo 3: Duas Rotas Autorais (`/autor/[slug]` vs. `/coluna-arquivo/[slug]`)](#43-módulo-3-duas-rotas-autorais-autorslug-vs-coluna-arquivoslug)
  - [4.4 Módulo 4: Painel do Colunista & Redação Geral (`/painel`)](#44-módulo-4-painel-do-colunista--redação-geral-painel)
  - [4.5 Módulo 5: Editor de Texto & Trava de Autoria (`/painel/editor`)](#45-módulo-5-editor-de-texto--trava-de-autoria-paineleditor)
  - [4.6 Módulo 6: Mural de Revisão Colaborativa na Redação](#46-módulo-6-mural-de-revisão-colaborativa-na-redação)
  - [4.7 Módulo 7: Mesa Editorial & Administração (`/admin`)](#47-módulo-7-mesa-editorial--administração-admin)
  - [4.8 Módulo 8: Área do Leitor (`/conta`) & Login Simulado](#48-módulo-8-área-do-leitor-conta--login-simulado)
- [5. Roteiro Estruturado para Coleta de Feedback](#5-roteiro-estruturado-para-coleta-de-feedback)
  - [5.1 Feedback sobre Funcionalidades & Fluxos de Redação](#51-feedback-sobre-funcionalidades--fluxos-de-redação)
  - [5.2 Feedback sobre Layout & Experiência de Leitura](#52-feedback-sobre-layout--experiência-de-leitura)
  - [5.3 Feedback sobre Identidade Visual & Marca](#53-feedback-sobre-identidade-visual--marca)
  - [5.4 Novas Ideias para o Backlog Pós-Lançamento](#54-novas-ideias-para-o-backlog-pós-lançamento)

---

## 1. Boas-Vindas & Objetivo deste Protótipo

Prezados colunistas e equipe editorial da **revista aresta.**,

Este protótipo navegável reúne **100% das telas, fluxos de leitura, ferramentas de redação e painéis administrativos** projetados para o lançamento da nossa revista.

O objetivo desta etapa é permitir que você:
1. **Navegue livremente** pela revista como leitor público, apreciando a diagramação dos textos e a identidade visual.
2. **Experimente o editor de texto** como colunista, testando a facilidade de escrever, anexar capas e formatar seu ensaio.
3. **Comprove as travas de segurança**: certificar-se de que nenhum outro autor ou administrador pode alterar uma vírgula do seu texto sem sua expressa autorização.
4. **Avalie o mural de revisão colaborativa**: veja como os colegas de redação podem sugerir melhorias em textos antes da publicação.
5. **Nos dê seu feedback sincero** sobre layout, facilidade de uso, identidade da marca e ideias para os próximos passos.

---

## 2. Como o Protótipo Funciona (e Suas Limitações Técnicas)

Para que a equipe pudesse testar tudo com agilidade e liberdade antes da contratação e configuração final da infraestrutura de nuvem, adotamos uma arquitetura moderna chamada **Mock-First (Persistência Local)**.

### 2.1 Por que Não Há Banco de Dados Central Conectado Ainda?
* Neste momento, o protótipo não se conecta a um servidor central de banco de dados (PostgreSQL/Supabase).
* A conexão com o banco de dados oficial acontecerá na **Sprint 5**, logo após colhermos e aplicarmos os ajustes que você e a equipe sugerirem neste teste.
* Isso significa que você pode criar textos, editar matérias, apagar comentários e testar a vontade **sem medo de estragar nada**.

### 2.2 Isolamento Entre Aparelhos (O Que Você Faz Fica no Seu Navegador)
* Todas as alterações que você fizer (publicar um texto novo, alterar a manchete da capa no `/admin`, deixar um comentário) são salvas **exclusivamente no armazenamento local do seu próprio navegador (`localStorage`)**.
* **Exemplo Prático:** Se o **Lucas** publicar um novo artigo no computador dele durante o teste, o **Danillo** *não* verá esse artigo no computador do Danillo. Cada membro da equipe possui seu próprio "universo local" de testes independente.

### 2.3 Como Restaurar os Dados de Fábrica (Botão Mágico de Reset)
* Fez muitos testes, criou textos de rascunho ou alterou a capa e quer voltar o site ao estado original de apresentação?
* Basta abrir o **Seletor de Visão** no canto inferior da tela e clicar em **"Restaurar Dados Originais de Fábrica"**. O sistema recarregará os 17 textos oficiais e as configurações iniciais imediatamente.

### 2.4 Upload de Imagens no Protótipo
* No editor de artigos, você pode fazer upload de fotos reais do seu computador.
* As fotos são processadas diretamente no seu navegador, sofrendo compressão automática em **JPEG proporcional (qualidade 0.82 e até 120 KB)** para caber no armazenamento local sem travar o dispositivo, exatamente como ocorrerá na versão final com o bucket de nuvem.

---

## 3. A Chave dos Testes: O Seletor de Visão (`PrototypeRoleSwitcher`)

Como não exigimos que você crie senhas ou faça login real pelo Google nesta fase, criamos uma ferramenta especial para você vestir o papel de qualquer membro da revista com apenas 1 clique.

```text
┌─────────────────────────────────────────────────────────────┐
│ 🔴 Visão: Lucas Campos  [AUTOR]                             │  <- Botão flutuante no canto
└─────────────────────────────────────────────────────────────┘     inferior da tela
```

### 3.1 Onde Encontrá-lo e Como Usar
* Em qualquer página do site, observe o **botão flutuante no canto inferior direito/esquerdo** com o texto `"Visão: [Nome do Perfil] [PAPEL]"`.
* Ao clicar nele, abre-se um modal elegante listando todos os perfis disponíveis. Basta clicar em um deles para que a sessão seja imediatamente alternada!

### 3.2 Os Perfis Prontos para Simulação

1. **✍️ Os 5 Colunistas Titulares:**
   * **Lucas Campos** (*Coluna de Lucas*) — Foco em política, território e sustentabilidade.
   * **Danillo Reis** (*Coluna de Danillo*) — Foco em cultura, patrimônio e Art Déco.
   * **Sergio Rodrigues** (*Coluna de Sergio*) — Foco em esporte popular e arquibancadas.
   * **Lara Lima** (*Coluna de Lara*) — Foco em cinema, festivais e ensaios femininos.
   * **Guliver Elias** (*Coluna de Guliver*) — Foco em entretenimento, música e cultura digital.
   > **Regra de Ouro do Sistema:** *Todo autor é também um administrador da revista e possui obrigatoriamente sua coluna exclusiva.* Como autor, você tem acesso total ao `/painel` para gerenciar seus textos e ao `/admin` para colaborar na curadoria da revista.
2. **🛡️ Administrador Geral (`admin@aresta.com.br`):**
   * Demonstra que *nem todo admin é autor*: tem poderes totais no `/admin`, mas não possui coluna própria nem publica ensaios autorais.
3. **📖 Leitora Cadastrada (Mariana Silva):**
   * Simula um assinante logado. Acessa a área `/conta`, pode seguir colunas, favoritar textos e publicar comentários nos artigos.
4. **👀 Visitante Anônimo:**
   * Simula um visitante comum que acessou o link pela primeira vez. Não vê botões de edição e é convidado a entrar ao tentar comentar.

---

## 4. Checklist Passo a Passo por Funcionalidade

Recomendamos que você siga este roteiro de testes para conhecer todos os cantos da plataforma.

### 4.1 Módulo 1: Capa Editorial & Navegação
- [ ] **Header Duplo (Portal + Menu Flutuante):**
  - No topo da página, repare no nome grande **`aresta.`** em fonte *Svetze* com ponto vermelho carmim (`#B91C1C`).
  - Role a página para baixo e veja o menu flutuante assumir o topo com efeito suave de **vidro fosco (*frosted glass*)**, borrando o conteúdo que passa por baixo.
- [ ] **Grade Editorial da Capa:**
  - Analise a **Manchete Principal (*Hero Article*)** com foto ampla e tipografia imponente.
  - Veja os 2 artigos de apoio secundário logo abaixo.
  - Confira a vitrine horizontal *"Últimas das Colunas"* exibindo os avatares dos 5 colunistas.
  - Percorra as seções dedicadas a cada uma das **5 editorias oficiais** (*Política*, *Cultura*, *Entretenimento*, *Ensaios* e *Esporte*).
- [ ] **Busca em Tempo Real:**
  - Clique no botão carmim **"BUSCAR"** na barra de navegação.
  - Digite termos como *"água"*, *"cerrado"*, *"futebol"* ou *"déco"*.
  - Observe os resultados surgirem instantaneamente no popover sem recarregar a página.

---

### 4.2 Módulo 2: Experiência de Leitura Imersiva (`/coluna/[slug]`)
- [ ] **Acesso ao Artigo:** Clique em qualquer matéria da capa ou acesse uma coluna.
- [ ] **Header Temático:** Observe que o topo agora estampa o nome da coluna do autor (ex: *Coluna de Lucas.* ou *Coluna de Lara.*).
- [ ] **Controles de Conforto Visual:**
  - No topo do texto, clique nos botões **`[A-]`** e **`[A+]`** para diminuir ou aumentar o corpo da fonte.
  - Alterne entre o modo **Claro (Papel Linho)** e o modo **Escuro (Noturno)** e veja o contraste de leitura.
- [ ] **Barra de Progresso:** Conforme você rola a página, observe a fina linha vermelha carmim indicando o progresso da leitura.
- [ ] **Cartão de Citação (*Quote Card*):**
  - Selecione qualquer parágrafo do artigo com o cursor do mouse (ou com o dedo no celular).
  - Clique no botão flutuante que surge: **"Criar Card de Citação"**.
  - Veja o modal diagramar o trecho como uma arte pronta para redes sociais. Teste copiar a citação formatada para o X (Twitter) ou WhatsApp.
- [ ] **Assinatura do Autor (`AuthorSignature`):** Ao final do texto, confira a caixa biográfica do colunista com foto, minibiografia, links de redes sociais e atalhos para seu perfil e acervo.
- [ ] **Comentários do Artigo:**
  - Role até o final e leia os comentários existentes.
  - Experimente adicionar um comentário como leitor e veja o feedback imediato.
- [ ] **Atalho Contextual "Editar Artigo":** Se você estiver logado com o perfil do autor daquele texto (ou como admin), repare que surge no cabeçalho um botão discreto **"Editar Artigo"**, que leva direto para a bancada do editor.

---

### 4.3 Módulo 3: Duas Rotas Autorais (`/autor/[slug]` vs. `/coluna-arquivo/[slug]`)
- [ ] **Página de Perfil Biográfico (`/autor/[slug]`):**
  - Clique na foto do autor ao final do artigo ou em seu nome.
  - Veja a foto em tamanho grande, a biografia curricular completa, redes sociais e o **carrossel horizontal fluido** com seus ensaios mais recentes.
- [ ] **Página de Acervo Cronológico da Coluna (`/coluna-arquivo/[slug]`):**
  - Clique no banner ou link da coluna (ex: *"Ver acervo da Coluna de Danillo"*).
  - Repare no manifesto/slogan editorial da coluna no topo.
  - Clique no botão **"Seguir esta Coluna"**: teste o modal escolhendo receber avisos por e-mail desta coluna ou de todas as publicações da revista.
  - Veja a paginação tradicional com números ao final da listagem.

---

### 4.4 Módulo 4: Painel do Colunista & Redação Geral (`/painel`)
> *Para testar esta área, selecione no switcher qualquer um dos 5 autores.*

- [ ] **Acesso ao Painel:** Clique no ícone de caneta **"Escrever"** no menu superior ou acesse [`/painel`](file:///e:/Maicon/DEV/aresta-revista/src/app/painel).
- [ ] **Aba "Publicados":** Veja a lista de todos os seus ensaios que já estão no ar, com data de veiculação, visualizações estimadas e botão para visualizar no site.
- [ ] **Aba "Em Produção":**
  - Veja os textos que estão atualmente em status de rascunho (`status = 'edicao'`).
  - Observe a indicação de quantas notas/sugestões os colegas deixaram no texto.
  - Veja o botão carmim **"Publicar Agora"** disponível para você lançar o ensaio no site no momento em que desejar.
- [ ] **Aba "Redação Geral":**
  - Esta aba lista os textos em edição dos **outros autores da revista**.
  - Veja como ela estimula a cooperação entre a equipe: você pode abrir o rascunho de um colega para ler previamente e deixar notas colaborativas.

---

### 4.5 Módulo 5: Editor de Texto & Trava de Autoria (`/painel/editor`)
- [ ] **Criando um Novo Artigo:**
  - No painel, clique em **"Novo Ensaio"** ([`/painel/editor/novo`](file:///e:/Maicon/DEV/aresta-revista/src/app/painel/editor/novo)).
  - Preencha o Título e o Subtítulo (Lead editorial).
  - Selecione a Editoria correspondente.
  - Faça upload de uma foto de capa do seu computador (ou selecione uma das fotos sugeridas do acervo).
  - Digite no corpo do texto: teste negrito, itálico, títulos H2 e H3, listas e citações em bloco.
  - Observe o **tempo estimado de leitura** sendo recalculado automaticamente a cada palavra digitada (com base no padrão de 200 palavras por minuto).
  - Clique em **"Salvar Rascunho"** e veja o texto aparecer na sua aba "Em Produção".
- [ ] **🔒 Teste da Trava de Autoria Inviolável (Muito Importante!):**
  1. No Seletor de Visão, selecione **Lucas Campos**.
  2. Vá em `/painel` > aba *"Redação Geral"* e abra o texto em edição do colega **Danillo Reis** (ex: *"A Geometria do Esquecimento"*).
  3. **Comprove a segurança:**
     - Uma faixa de aviso amarela surge no topo informando que você está em **modo de leitura e revisão colaborativa**.
     - O editor de texto fica bloqueado para digitação (você não pode apagar nem mudar as palavras do Danillo).
     - O botão de "Publicar" fica desabilitado para você: **somente o Danillo pode publicar a própria coluna**.
     - O mural lateral de sugestões fica aberto para você deixar seus apontamentos.
  4. Agora mude no Seletor de Visão para o **Danillo Reis**:
     - Abra o mesmo texto. Repare que agora o editor está 100% destravado e o botão **"Publicar Agora"** está ativo e pronto para uso!

---

### 4.6 Módulo 6: Mural de Revisão Colaborativa na Redação
- [ ] Abra um texto em edição de um colega pela aba "Redação Geral".
- [ ] Na barra lateral direita (**"Mural da Redação"**), digite uma sugestão no campo de texto e clique em **"Enviar Apontamento"**.
- [ ] Selecione uma frase do texto antes de comentar e veja a frase ser anexada como citação de contexto ao seu comentário.
- [ ] Alterne entre marcar sugestões como **"Resolvida"** ou **"Pendente"**.

---

### 4.7 Módulo 7: Mesa Editorial & Administração (`/admin`)
> *Acesso exclusivo para perfis com papel de Autor ou Administrador.*

- [ ] Acesse [`/admin`](file:///e:/Maicon/DEV/aresta-revista/src/app/admin) pelo link do menu ou digitando a URL.
- [ ] **Aba "Destaques da Capa":**
  - Veja como é simples fazer a curadoria da Capa da Revista.
  - No campo **"Manchete Principal (Hero)"**, escolha qualquer outro artigo publicado na lista e clique em **"Atualizar Grade da Capa"**.
  - Abra a Capa (`/`) em outra aba do navegador e veja a nova manchete assumir o topo imediatamente!
- [ ] **Aba "Colunistas":**
  - Visualize a lista dos 5 colunistas da casa, a quantidade de textos de cada um e o status de suas colunas.
  - Clique em **"Registrar Membro da Equipe"** para conhecer o modal de promoção de leitores e criação de novas colunas.
- [ ] **Aba "Meu Perfil":**
  - Edite seu nome de exibição, minibiografia editorial, redes sociais (X, Instagram, LinkedIn, site) e o manifesto/slogan da sua coluna.
  - Salve e confira as atualizações refletidas na sua página de perfil.

---

### 4.8 Módulo 8: Área do Leitor (`/conta`) & Login Simulado
- [ ] No Seletor de Visão, selecione a leitora **Mariana Silva**.
- [ ] Clique no menu do topo em **"Minha Conta"** ([`/conta`](file:///e:/Maicon/DEV/aresta-revista/src/app/conta)).
- [ ] **Preferências de Leitura:** Ative e desative os switches das colunas que deseja seguir e da newsletter semanal.
- [ ] **Zona de Privacidade (LGPD):** Conheça a área de conformidade com a Lei Geral de Proteção de Dados e o fluxo com confirmação para exclusão de conta.
- [ ] **Modal Visual de Login:** Mude para "Visitante Anônimo" e clique no botão **"Entrar"** no topo da página. Veja a janela de login em 1 clique simulando o futuro acesso com Google Account.

---

## 5. Roteiro Estruturado para Coleta de Feedback

Após testar o protótipo, por favor copie as perguntas abaixo e envie suas respostas no grupo da redação ou diretamente para os coordenadores do projeto. Suas opiniões moldarão a versão final antes do lançamento público.

### 5.1 Feedback sobre Funcionalidades & Fluxos de Redação
1. **Editor de Ensaios:** A experiência de escrever e formatar textos no editor Tiptap foi agradável? Sentiu falta de algum botão de formatação específico (como notas de rodapé, tabelas ou imagens no meio do corpo)?
2. **Trava de Autoria:** O funcionamento da trava de autoria (onde você tem controle absoluto da sua coluna e seus colegas colaboram por sugestões) pareceu claro, seguro e respeitoso com o trabalho autoral?
3. **Mural de Revisão:** O mural de sugestões da redação parece prático para trocarmos ideias sobre os textos antes do lançamento?
4. **Curadoria da Capa (`/admin`):** A seleção da Manchete Principal e dos apoios secundários atende às necessidades de quem for fechar a edição da semana?

### 5.2 Feedback sobre Layout & Experiência de Leitura
1. **Header Duplo:** O que você achou do título grande no topo que se transforma em um menu flutuante com vidro fosco (*frosted glass*) ao rolar a página? Funcionou bem no seu computador e no seu celular?
2. **Conforto Tipográfico:** A largura da coluna de leitura, os tamanhos de fonte e o espaçamento entre linhas tornam a leitura de ensaios longos prazerosa?
3. **Controles de Conforto & Modo Escuro:** Como foi a experiência de alternar entre o modo claro (*papel linho*) e o modo noturno?
4. **Quote Cards:** O recurso de selecionar uma frase e gerar um card de citação para redes sociais é atraente para divulgar seus textos?

### 5.3 Feedback sobre Identidade Visual & Marca
1. **Tipografia Svetze:** O desenho do logotipo **`aresta.`** no cabeçalho e da versão compacta **`a.`** na barra fixa transmite a sofisticação e seriedade que você espera da publicação?
2. **O Ponto Carmim (`#B91C1C`):** O tom de vermelho carmim aplicado nos pontos, botões de ação e linhas de destaque soou elegante e equilibrado?
3. **Tom Geral:** A estética da revista transmite a sensação de um veículo de ensaios contemporâneo e independente?

### 5.4 Novas Ideias para o Backlog Pós-Lançamento
* Quais recursos, seções ou integrações você adoraria ver implementadas nas próximas fases da **aresta.**?
  *(Exemplos: disparo automático de newsletter diagramada por e-mail, versão em áudio/podcast dos ensaios narrada pelo autor, clube de apoiadores financeiros para os colunistas, etc.)*


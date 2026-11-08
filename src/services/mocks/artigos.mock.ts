import type { ArtigoCompleto } from '@/types/artigo.types';
import { CATEGORIAS_MOCK } from './categorias.mock';
import { PERFIS_AUTORES_MOCK, COLUNAS_MOCK } from './autores.mock';

export const ARTIGOS_MOCK: ArtigoCompleto[] = [
  // ============================================================================
  // 1. LUCAS CAMPOS - POLÍTICA (MANCHETE HERO)
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    titulo: 'A Batalha das Águas no Cerrado: A Disputa pelo Aquífero Urucuia e o Futuro do Agro Sustentável em Goiás',
    slug: 'a-batalha-das-aguas-no-cerrado-a-disputa-pelo-aquifero-urucuia-e-o-futuro-do-agro-sustentavel-em-goias',
    subtitulo_lead: 'No coração do Centro-Oeste, a expansão acelerada dos pivôs centrais de irrigação coloca em xeque a recarga dos mananciais e expõe o impasse entre produtividade recorde e soberania ecológica.',
    conteudo: `No horizonte plano do sudoeste goiano, gigantescas estruturas metálicas circulares giram ininterruptamente, desenhando círculos verdes perfeitos visíveis até mesmo de satélites em órbita. São os pivôs centrais de irrigação, motores da colheita recorde que impulsiona o Produto Interno Bruto de Goiás e consolida o Brasil como celeiro global. No entanto, por baixo dessa superfície de abundância tecnológica, uma crise silenciosa e profunda avança pelas camadas geológicas do Cerrado.

A bacia do Rio Araguaia e a porção goiana do Aquífero Urucuia registram rebaixamento histórico em seus níveis médios de vazão ao longo da estiagem de 2026. A disputa pelo uso outorgado da água deixou de ser uma preocupação circunscrita a relatórios acadêmicos e converteu-se no mais agudo dilema político e econômico do estado.

> "A água não é um insumo elástico que se multiplica por decreto orçamentário. Quando o regime de chuvas oscila e as outorgas superam a capacidade de recarga das nascentes, o que está em jogo não é apenas a safra seguinte, mas a viabilidade da vida nas cidades e nos assentamentos."

### O Conflito Invisível entre Pivôs e Comunidades

Em municípios como Cristalina e Rio Verde, onde se concentra uma das maiores densidades de irrigação por pivô central da América Latina, produtores familiares e comunidades ribeirinhas relatam o esgotamento precoce de córregos que outrora corriam fartos durante todo o ano. A equação hídrica é impiedosa: um único pivô de grande porte consome diariamente um volume de água equivalente ao abastecimento de uma cidade média.

Na Assembleia Legislativa de Goiás (Alego), o debate sobre a reformulação das outorgas d'água pela Secretaria de Meio Ambiente e Desenvolvimento Sustentável (Semad) encontrou resistências imediatas das bancadas ligadas ao agronegócio exportador. De um lado, argumenta-se que a tecnologia de telemetria e o gotejamento de precisão já mitigam o desperdício; de outro, pesquisadores da Universidade Federal de Goiás (UFG) alertam que a retirada bruta supera os limites de segurança hidrogeológica estabelecidos pela Agência Nacional de Águas (ANA).

### Entre a Rentabilidade e a Vulnerabilidade Climática

O paradoxo goiano reside no fato de que o próprio agronegócio é o setor mais vulnerável à degradação do Cerrado. Conhecido historicamente como a *"caixa-d'água do Brasil"*, o bioma abriga as nascentes de oito das doze grandes regiões hidrográficas do país. À medida que a vegetação nativa com suas raízes profundas é suprimida, o solo perde a sua capacidade esponjosa de reter as águas pluviais para alimentar o lençol freático.

1. **Rebaixamento das vazões:** 42% dos pontos monitorados no alto Araguaia operam em cota de alerta na estação seca;
2. **Pressão demográfica:** As cidades do entorno do Distrito Federal e da Região Metropolitana de Goiânia dependem diretamente de mananciais sobrecarregados;
3. **Custo energético:** A demanda de energia elétrica para bombear água de profundidades cada vez maiores onera a cadeia de produção e encarece as tarifas públicas.

O caminho para uma transição responsável não passa pela negação do poder produtivo de Goiás, mas pelo reconhecimento irrestrito de que a produtividade futura depende da preservação intransigente dos corredores ecológicos e da recarga dos aquíferos. Sem água na nascente, a tecnologia mais sofisticada do mundo torna-se inerte sob o sol escaldante do Centro-Oeste.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Pivôs de irrigação no interior goiano sob o pôr do sol do Cerrado.',
    creditos_capa: 'Foto: Ricardo Teles / Acervo Editorial',
    tempo_leitura_min: 5,
    status: 'publicado',
    publicado_em: '2026-11-05T08:30:00Z',
    atualizado_em: '2026-11-05T08:30:00Z',
    eh_destaque_hero: true,
    eh_destaque_secao: false,
    visualizacoes: 1420,
    categoria: {
      id: CATEGORIAS_MOCK[0].id,
      nome: CATEGORIAS_MOCK[0].nome,
      slug: CATEGORIAS_MOCK[0].slug,
      cor_acento: CATEGORIAS_MOCK[0].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[0].id,
      nome: COLUNAS_MOCK[0].nome,
      slug: COLUNAS_MOCK[0].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[0].id,
      nome: PERFIS_AUTORES_MOCK[0].nome,
      slug: PERFIS_AUTORES_MOCK[0].slug,
      avatar_url: PERFIS_AUTORES_MOCK[0].avatar_url,
    },
    tags: [
      { id: 1, nome: 'Cerrado', slug: 'cerrado' },
      { id: 2, nome: 'Agronegócio', slug: 'agronegocio' },
      { id: 3, nome: 'Crise Hídrica', slug: 'crise-hidrica' },
      { id: 4, nome: 'Políticas Públicas', slug: 'politicas-publicas' },
    ],
  },

  // ============================================================================
  // 2. DANILLO REIS - CULTURA (APOIO SEÇÃO 1)
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    titulo: 'Art Déco no Coração do Brasil: O Patrimônio Ameaçado de Goiânia e o Silêncio das Fachadas Históricas',
    slug: 'art-deco-no-coracao-do-brasil-o-patrimonio-ameacado-de-goiania-e-o-silencio-das-fachadas-historicas',
    subtitulo_lead: 'Entre o traçado moderno de Attilio Corrêa Lima e a especulação imobiliária predatória, os edifícios monumentais da Praça Cívica agonizam à espera de políticas de restauro que transcendam a retórica oficial.',
    conteudo: `Caminhar pelo centro histórico de Goiânia sob a luz oblíqua do entardecer é testemunhar um dos mais fascinantes diálogos arquitetônicos do século XX latino-americano. O projeto urbanístico delineado por Attilio Corrêa Lima e materializado pelos irmãos Coimbra Bueno na década de 1930 não foi apenas a transferência de uma capital; foi a tentativa deliberada de esculpir a modernidade no coração do Planalto Central, quando o Brasil ainda se definia predominantemente pelo seu litoral.

Goiânia abriga um dos mais expressivos acervos de arquitetura Art Déco do mundo, reconhecido e tombado pelo Instituto do Patrimônio Histórico e Artístico Nacional (Iphan). Contudo, a monumentalidade das linhas geométricas, dos mastros imponentes e dos ornatos aerodinâmicos do Palácio das Esmeraldas, do Coreto e da antiga Estação Ferroviária contrasta violentamente com o abandono material que corrói o tecido urbano central.

> "A preservação de um centro urbano não se consolida com tintas de palanque ou placas comemorativas. Ela exige a permanência viva das pessoas, habitação popular qualificada e um combate destemido aos vazios especulativos que transformam patrimônio em ruína induzida."

### A Fragmentação do Traçado Original

Nas últimas duas décadas, o eixo de dinamismo econômico de Goiânia migrou aceleradamente em direção ao sul, engolido pelos condomínios fechados horizontais e pelas torres verticais envidraçadas dos setores Bueno e Marista. O Centro, antes o coração pulsante da vida cívica e comercial, foi submetido a uma política de desinvestimento sistemático.

Fachadas históricas de valor inestimável foram desfiguradas por letreiros comerciais caóticos, marquises improvisadas e umidade crônica. Projetos grandiosos de revitalização, sucessivamente anunciados pela prefeitura e pelo governo estadual, naufragaram na burocracia ou em reformas pontuais que não atacaram o cerne do problema: a ausência de um plano integrado de uso misto do solo que atraia novos moradores para a região central.

### Memória Como Direito à Cidade

Resgatar o patrimônio Déco de Goiânia não é um capricho nostálgico de arquitetos e historiadores. É, antes de tudo, garantir o direito à memória coletiva e à identidade de uma cidade jovem que já ameaça esquecer suas próprias origens.

* **O desafio da habitação:** Recuperar edifícios históricos ociosos para programas de moradia estudantil e habitação de interesse social;
* **Cultura como âncora:** Reativar os cinemas de rua e os espaços de convivência da Avenida Goiás;
* **Zeladoria permanente:** Superar a lógica do abandono para justificar demolições silenciosas.

Uma cidade que destrói suas pedras angulares condena seus cidadãos a um presente sem lastro e a um futuro sem contornos. O Art Déco de Goiânia grita em suas formas elegantes; cabe a nós a dignidade de escutá-lo.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Detalhe geométrico do patrimônio Art Déco no centro histórico de Goiânia.',
    creditos_capa: 'Foto: Acervo Histórico / Iphan Goiás',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-11-04T14:15:00Z',
    atualizado_em: '2026-11-04T14:15:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: true,
    visualizacoes: 980,
    categoria: {
      id: CATEGORIAS_MOCK[1].id,
      nome: CATEGORIAS_MOCK[1].nome,
      slug: CATEGORIAS_MOCK[1].slug,
      cor_acento: CATEGORIAS_MOCK[1].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[1].id,
      nome: COLUNAS_MOCK[1].nome,
      slug: COLUNAS_MOCK[1].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[1].id,
      nome: PERFIS_AUTORES_MOCK[1].nome,
      slug: PERFIS_AUTORES_MOCK[1].slug,
      avatar_url: PERFIS_AUTORES_MOCK[1].avatar_url,
    },
    tags: [
      { id: 5, nome: 'Art Déco', slug: 'art-deco' },
      { id: 6, nome: 'Goiânia', slug: 'goiania' },
      { id: 7, nome: 'Patrimônio Histórico', slug: 'patrimonio-historico' },
      { id: 8, nome: 'Urbanismo', slug: 'urbanismo' },
    ],
  },

  // ============================================================================
  // 3. SERGIO RODRIGUES - ESPORTE (APOIO SEÇÃO 2)
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    titulo: 'O Renascimento do Clássico dos Clássicos: O Que o Dérbi Goiás e Vila Nova Revela Sobre a Cidade',
    slug: 'o-renascimento-do-classico-dos-classicos-o-que-o-derbi-goias-e-vila-nova-revela-sobre-a-cidade',
    subtitulo_lead: 'Para além das quatro linhas do Serra Dourada, a rivalidade centenária sintetiza as fraturas sociais, a geografia afetiva e a disputa simbólica de classes na capital goiana.',
    conteudo: `Nas arquibancadas de concreto rústico do Estádio Serra Dourada, projetado por Paulo Mendes da Rocha com sua monumental cobertura de linhas brutas, não se desenrola apenas uma partida de noventa minutos com bola rolando. Quando Goiás Esporte Clube e Vila Nova Futebol Clube entram em campo para disputar o Clássico dos Clássicos, é a própria alma de Goiânia que se divide em dois hemisférios emocionais irreconciliáveis.

A história dessa rivalidade transcende os números das estatísticas de títulos e confrontos diretos. Ela espelha com fidelidade cirúrgica a gênese sociológica da capital. O Goiás, forjado historicamente no seio das famílias tradicionais e consolidado como o clube de estrutura invejável da Serrinha; e o Vila Nova, nascido operário nas vielas do Setor Universitário e do Setor Leste Universitário, carregando o epíteto orgulhoso de *"Tigrão"* e o peso de uma das torcidas mais apaixonadas e sofridas do futebol brasileiro.

> "O futebol não é o ópio do povo; é a sua dramaturgia pública mais sincera. Em 90 minutos de dérbi goiano, o trabalhador que enfrenta ônibus lotados na Avenida Anhanguera recupera a voz, o protagonismo e a soberania do pertencimento."

### A Modernização Fria e a Resistência da Arquibancada

O debate contemporâneo sobre a adoção do modelo de Sociedade Anônima do Futebol (SAF) nos dois clubes expõe tensões agudas. Enquanto os gestores defendem a injeção milionária de fundos de investimento para alcançar a competitividade da Série A do Campeonato Brasileiro, torcedores de longa data temem a descaracterização cultural que asfixia a festa popular:

* A imposição de ingressos caros que afastam os setores mais vulneráveis;
* A proibição burocrática de bandeirões e charangas tradicionais;
* A transformação do torcedor em mero consumidor de produtos oficiais padronizados.

O clássico de 2026 marca o reencontro das torcidas em sua plenitude, demonstrando que o futebol no Centro-Oeste possui força para disputar protagonismo nacional sem abdicar do seu calor regional e de suas raízes comunitárias. O Serra Dourada não é um shopping center; é um templo civil onde Goiânia se reconhece viva.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Vista aérea do Estádio Serra Dourada em dia de clássico goiano lotado.',
    creditos_capa: 'Foto: Gabriel Neves / Esporte Goiano',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-11-03T16:00:00Z',
    atualizado_em: '2026-11-03T16:00:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: true,
    visualizacoes: 1150,
    categoria: {
      id: CATEGORIAS_MOCK[4].id,
      nome: CATEGORIAS_MOCK[4].nome,
      slug: CATEGORIAS_MOCK[4].slug,
      cor_acento: CATEGORIAS_MOCK[4].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[2].id,
      nome: COLUNAS_MOCK[2].nome,
      slug: COLUNAS_MOCK[2].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[2].id,
      nome: PERFIS_AUTORES_MOCK[2].nome,
      slug: PERFIS_AUTORES_MOCK[2].slug,
      avatar_url: PERFIS_AUTORES_MOCK[2].avatar_url,
    },
    tags: [
      { id: 9, nome: 'Futebol Goiano', slug: 'futebol-goiano' },
      { id: 10, nome: 'Serra Dourada', slug: 'serra-dourada' },
      { id: 11, nome: 'Cultura Popular', slug: 'cultura-popular' },
      { id: 12, nome: 'Sociedade', slug: 'sociedade' },
    ],
  },

  // ============================================================================
  // 4. LARA LIMA - CULTURA
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    titulo: 'O FICA e a Resistência do Cinema Ambiental: Reflexões a Partir da Cidade de Goiás',
    slug: 'o-fica-e-a-resistencia-do-cinema-ambiental-reflexoes-a-partir-da-cidade-de-goias',
    subtitulo_lead: 'Entre pedras calcadas a mão e o calor do Rio Vermelho, o festival consolida o audiovisual independente como trincheira crítica diante do colapso ecológico global.',
    conteudo: `Quando as primeiras projeções ao ar livre iluminam as fachadas coloniais da antiga Vila Boa de Goiás, um silêncio reverente toma conta do Largo do Chafariz. O Festival Internacional de Cinema e Vídeo Ambiental (FICA) completa mais de duas décadas provando que as discussões mais urgentes sobre a biosfera da Terra não precisam emanar exclusivamente das metrópoles globais ou dos fóruns diplomáticos europeus.

Nascido em 1999 às margens do Rio Vermelho, cantado em versos eternos por Cora Coralina, o FICA tornou-se uma das mais prestigiadas janelas de exibição para realizadores que documentam as feridas abertas do Antropoceno: queimadas descontroladas na Amazônia e no Pantanal, o envenenamento de cursos d'água por agrotóxicos no Cerrado e a sobrevivência de povos originários e comunidades quilombolas.

### O Cinema Como Testemunho e Provocação

A edição mais recente do festival evidenciou uma maturidade estética notável no audiovisual goiano. Longe de limitar-se à denúncia panfletária, novos diretores e diretoras articulam narrativas poéticas que exploram a delicadeza dos saberes ancestrais e a relação visceral dos povos tradicionais com a terra.

> "O cinema ambiental que nasce no Brasil não é contemplativo; ele é fruto direto do conflito territorial. A câmera funciona como um escudo contra o esquecimento forçado e a violência do silenciamento."

As oficinas de formação comunitária e as mostras paralelas de curta-metragem revelam uma geração que já não aceita ser apenas objeto de estudos antropológicos externos, assumindo a direção e a montagem de suas próprias histórias com vigor incomparável.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Projeção ao ar livre no centro histórico da Cidade de Goiás durante o festival.',
    creditos_capa: 'Foto: Débora Cavalcanti / CineFICA',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-11-02T11:00:00Z',
    atualizado_em: '2026-11-02T11:00:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 740,
    categoria: {
      id: CATEGORIAS_MOCK[1].id,
      nome: CATEGORIAS_MOCK[1].nome,
      slug: CATEGORIAS_MOCK[1].slug,
      cor_acento: CATEGORIAS_MOCK[1].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[3].id,
      nome: COLUNAS_MOCK[3].nome,
      slug: COLUNAS_MOCK[3].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[3].id,
      nome: PERFIS_AUTORES_MOCK[3].nome,
      slug: PERFIS_AUTORES_MOCK[3].slug,
      avatar_url: PERFIS_AUTORES_MOCK[3].avatar_url,
    },
    tags: [
      { id: 13, nome: 'Cinema', slug: 'cinema' },
      { id: 14, nome: 'FICA', slug: 'fica' },
      { id: 15, nome: 'Cidade de Goiás', slug: 'cidade-de-goias' },
      { id: 16, nome: 'Meio Ambiente', slug: 'meio-ambiente' },
    ],
  },

  // ============================================================================
  // 5. GULIVER ELIAS - ENTRETENIMENTO
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    titulo: 'A Ditadura dos Algoritmos na Música: Como o Sertanejo se Adaptou ao TikTok e Redefiniu a Produção em Goiânia',
    slug: 'a-ditadura-dos-algoritmos-na-musica-como-o-sertanejo-se-adaptou-ao-tiktok-e-redefiniu-a-producao-em-goiania',
    subtitulo_lead: 'Nos estúdios de ponta da capital, composições são milimetricamente desenhadas para prender a atenção em 15 segundos, transformando a canção em vinheta viral de dança.',
    conteudo: `Em uma sala de gravação isolada acusticamente no Setor Sul de Goiânia, um produtor musical analisa gráficos de retenção de tela em uma estação de trabalho digital antes mesmo de finalizar o arranjo da sanfona e do violão. A pergunta fundamental que orienta os novos lançamentos da bilionária indústria sertaneja já não é se o refrão é emocionante ou poético, mas sim: *"esse gancho de 15 segundos sustenta uma coreografia no TikTok e no Instagram Reels?"*

Goiânia é indiscutivelmente a capital dos negócios da música no Brasil Central. No entanto, a transição definitiva para a lógica dos algoritmos de recomendação acelerada operou uma verdadeira revolução industrial na estrutura das composições. Canções de três ou quatro minutos, com introduções elaboradas e solos instrumentais meditativos, foram sumariamente expurgadas das planilhas de investimento.

> "A canção perdeu seu estatuto de obra contínua e virou um chamariz de tráfego. Quem não prende o usuário nos primeiros quatro segundos é sumariamente descartado pelo dedo impaciente que rola o feed para cima."

### A Linha de Montagem dos Hits de Bolso

As famosas salas de composição coletiva que funcionam dia e noite em hotéis de Goiânia adotaram métricas dignas de laboratórios de software. Letras são testadas com palavras-chave que já demonstraram alta indexação em buscas e trends de redes sociais. O resultado é um produto fonográfico de altíssima eficiência mercadológica, mas de efemeridade avassaladora: músicas que lideram as paradas em uma semana e desaparecem da memória pública no mês subsequente.

A pergunta que ecoa entre músicos tradicionais é qual será o saldo cultural de uma geração inteira condicionada a ouvir música fragmentada em refrões pré-fabricados para impulsionar dancinhas descartáveis.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Mesa de som e sintetizadores em estúdio de alta produção musical.',
    creditos_capa: 'Foto: Rodrigo Santos / Som do Cerrado',
    tempo_leitura_min: 3,
    status: 'publicado',
    publicado_em: '2026-11-01T19:30:00Z',
    atualizado_em: '2026-11-01T19:30:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 1310,
    categoria: {
      id: CATEGORIAS_MOCK[2].id,
      nome: CATEGORIAS_MOCK[2].nome,
      slug: CATEGORIAS_MOCK[2].slug,
      cor_acento: CATEGORIAS_MOCK[2].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[4].id,
      nome: COLUNAS_MOCK[4].nome,
      slug: COLUNAS_MOCK[4].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[4].id,
      nome: PERFIS_AUTORES_MOCK[4].nome,
      slug: PERFIS_AUTORES_MOCK[4].slug,
      avatar_url: PERFIS_AUTORES_MOCK[4].avatar_url,
    },
    tags: [
      { id: 17, nome: 'Música Sertaneja', slug: 'musica-sertaneja' },
      { id: 18, nome: 'TikTok', slug: 'tiktok' },
      { id: 19, nome: 'Algoritmos', slug: 'algoritmos' },
      { id: 20, nome: 'Indústria Cultural', slug: 'industria-cultural' },
    ],
  },

  // ============================================================================
  // 6. LUCAS CAMPOS - ENSAIOS
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    titulo: 'A Nova Geopolítica do Centro-Oeste: Entre a Ferrovia Norte-Sul e a Rota Bioceânica',
    slug: 'a-nova-geopolitica-do-centro-oeste-entre-a-ferrovia-norte-sul-e-a-rota-bioceanica',
    subtitulo_lead: 'Com a consolidação do Porto Seco de Anápolis e as saídas pelo Pacífico, o interior brasileiro deixa de ser entreposto subserviente para se tornar o eixo articulador da integração sul-americana.',
    conteudo: `Por quase cinco séculos de colonização e república, o Brasil foi uma nação que teimava em viver de costas para o próprio continente, voltando seus olhos, seus trilhos e suas rotas comerciais exclusivamente para o Oceano Atlântico e para as metrópoles europeias e norte-americanas. O interior continental era tratado no imaginário nacional como um vasto sertão desabitado, terra de passagem ou mero fornecedor de matérias-primas brutas para escoamento litorâneo.

Essa cartografia secular ruiu definitivamente na primeira metade da década de 2020. A plena operacionalização da Ferrovia Norte-Sul (FNS), cruzando de ponta a ponta o estado de Goiás e conectando-se ao Porto Seco de Anápolis, somada às obras avançadas do Corredor Bioceânico que enlaça o Centro-Oeste ao Paraguai, à Argentina e aos portos chilenos no Oceano Pacífico, alterou tectonicamente a dinâmica geopolítica da América do Sul.

### O Coração Logístico do Brasil

Anápolis deixou de ser apenas a terceira maior cidade goiana para converter-se em um dos mais cobiçados nós logísticos da América Latina. O entroncamento multimodal reúne ferrovia de alta tonelagem, rodovias federais estratégicas (BR-153 e BR-060) e o polo farmoquímico de maior densidade do país.

> "A integração física com o Pacífico não reduz apenas em até duas semanas o tempo de navegação das cargas brasileiras até o mercado asiático; ela desloca o centro de gravidade das decisões econômicas nacionais para o interior do continente."

Contudo, para que Goiás não repita os erros históricos de um modelo meramente extrativista e exportador de grãos in natura, faz-se imperativo que essa infraestrutura sirva como alavanca de reindustrialização sustentável e adensamento tecnológico local.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Linha férrea de escoamento logístico cortando a paisagem do Centro-Oeste.',
    creditos_capa: 'Foto: Paulo Henrique / FNS Brasil',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-10-30T10:15:00Z',
    atualizado_em: '2026-10-30T10:15:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 890,
    categoria: {
      id: CATEGORIAS_MOCK[3].id,
      nome: CATEGORIAS_MOCK[3].nome,
      slug: CATEGORIAS_MOCK[3].slug,
      cor_acento: CATEGORIAS_MOCK[3].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[0].id,
      nome: COLUNAS_MOCK[0].nome,
      slug: COLUNAS_MOCK[0].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[0].id,
      nome: PERFIS_AUTORES_MOCK[0].nome,
      slug: PERFIS_AUTORES_MOCK[0].slug,
      avatar_url: PERFIS_AUTORES_MOCK[0].avatar_url,
    },
    tags: [
      { id: 21, nome: 'Geopolítica', slug: 'geopolitica' },
      { id: 22, nome: 'Ferrovia Norte-Sul', slug: 'ferrovia-norte-sul' },
      { id: 23, nome: 'Infraestrutura', slug: 'infraestrutura' },
      { id: 24, nome: 'Anápolis', slug: 'anapolis' },
    ],
  },

  // ============================================================================
  // 7. DANILLO REIS - ENSAIOS
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    titulo: 'Cora Coralina e o Mito do Isolamento: Por uma Releitura Contemporânea das Vielas de Goiás',
    slug: 'cora-coralina-e-o-mito-do-isolamento-por-uma-releitura-contemporanea-das-vielas-de-goias',
    subtitulo_lead: 'Longe do estereótipo ingênuo da doceira reclusa, a lírica de Ana Lins dos Guimarães Peixoto Bretas constitui uma das mais lúcidas e subversivas críticas sociais da modernidade brasileira.',
    conteudo: `A historiografia literária e a publicidade turística frequentemente aprisionam a figura de Cora Coralina em uma moldura folclórica e complacente: a idosa simpática que produzia doces de tacho de cobre no casarão da ponte e começou a publicar livros em idade avançada por mero passatempo nostálgico. Nada pode ser mais desonesto com a densidade estética e política de sua obra.

Uma leitura desarmada de *Poemas dos Becos de Goiás e Estórias Mais* desvela uma escritora visceralmente atenta às violências de gênero, às exclusões de classe e ao jugo patriarcal que estruturava a sociedade brasileira da primeira metade do século XX. Cora viveu por décadas no interior de São Paulo, acompanhou de perto a Semana de Arte Moderna de 1922 e conhecia profundamente as tensões que moldavam o país urbano.

> "Quando voltei para Goiás, não voltei para o passado; voltei para as raízes da terra que o Brasil oficial preferia fingir que não existia."

Ao retornar à sua Cidade de Goiás natal, Cora não realizou um movimento de fuga ou isolamento; operou um gesto estético consciente de reencontro com as vozes marginais: lavadeiras, roceiros analfabetos, prostitutas dos becos esquecidos e crianças sem futuro delimitado pelas elites coronelistas. Reler Cora Coralina em 2026 é reencontrar uma poesia de gume cortante, que desafia a complacência contemporânea com a mesma contundência com que desafiava os barões do século passado.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Manuscritos e máquina de escrever sobre mesa de madeira rústica.',
    creditos_capa: 'Foto: Marcos Vinícius / Casa Velha da Ponte',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-10-28T15:40:00Z',
    atualizado_em: '2026-10-28T15:40:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 620,
    categoria: {
      id: CATEGORIAS_MOCK[3].id,
      nome: CATEGORIAS_MOCK[3].nome,
      slug: CATEGORIAS_MOCK[3].slug,
      cor_acento: CATEGORIAS_MOCK[3].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[1].id,
      nome: COLUNAS_MOCK[1].nome,
      slug: COLUNAS_MOCK[1].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[1].id,
      nome: PERFIS_AUTORES_MOCK[1].nome,
      slug: PERFIS_AUTORES_MOCK[1].slug,
      avatar_url: PERFIS_AUTORES_MOCK[1].avatar_url,
    },
    tags: [
      { id: 25, nome: 'Literatura', slug: 'literatura' },
      { id: 26, nome: 'Cora Coralina', slug: 'cora-coralina' },
      { id: 27, nome: 'Crítica Literária', slug: 'critica-literaria' },
      { id: 28, nome: 'Memória', slug: 'memoria' },
    ],
  },

  // ============================================================================
  // 8. SERGIO RODRIGUES - ESPORTE
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    titulo: 'A Sociedade Anônima do Futebol e o Centro-Oeste: Entre o Capitalismo Esportivo e a Paixão das Arquibancadas',
    slug: 'a-sociedade-anonima-do-futebol-e-o-centro-oeste-entre-o-capitalismo-esportivo-e-a-paixao-das-arquibancadas',
    subtitulo_lead: 'A transformação dos clubes centenários em empresas privadas promete salvar finanças endividadas, mas coloca sob risco o último refúgio da comunhão popular nas cidades.',
    conteudo: `O futebol brasileiro ingressou em uma encruzilhada histórica da qual não haverá retorno. Com a sanção da Lei das SAFs, as agremiações centenárias de torcedores e conselheiros amadores dão lugar a consórcios internacionais, fundos de private equity e executivos formados em finanças corporativas.

No Centro-Oeste, onde as receitas de direitos televisivos historicamente representam uma fração irrisória da verba direcionada ao eixo Rio-São Paulo, a promessa da SAF ressoa como um canto de sereia irresistível. Dirigentes endividados acenam para torcedores esperançosos com a ilusão de que a venda do controle acionário trará automaticamente contratações estelares e taças incontestáveis.

> "Um clube de futebol não é uma fábrica de calçados ou uma rede de farmácias. Ele é um bem cultural imaterial cuja falência financeira pode ser remediada, mas cuja desassociação afetiva da comunidade é irreversível."

O perigo iminente reside na perda de governança dos torcedores comuns sobre símbolos, cores e decisões históricas. Quando o objetivo único da operação torna-se o lucro trimestral de acionistas anônimos, a arquibancada é a primeira a ser alijada da tomada de decisões.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Bola de futebol clássica sobre o gramado sob iluminação de refletores.',
    creditos_capa: 'Foto: Lucas Moura / Lance Editorial',
    tempo_leitura_min: 3,
    status: 'publicado',
    publicado_em: '2026-10-25T17:20:00Z',
    atualizado_em: '2026-10-25T17:20:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 510,
    categoria: {
      id: CATEGORIAS_MOCK[4].id,
      nome: CATEGORIAS_MOCK[4].nome,
      slug: CATEGORIAS_MOCK[4].slug,
      cor_acento: CATEGORIAS_MOCK[4].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[2].id,
      nome: COLUNAS_MOCK[2].nome,
      slug: COLUNAS_MOCK[2].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[2].id,
      nome: PERFIS_AUTORES_MOCK[2].nome,
      slug: PERFIS_AUTORES_MOCK[2].slug,
      avatar_url: PERFIS_AUTORES_MOCK[2].avatar_url,
    },
    tags: [
      { id: 29, nome: 'SAF', slug: 'saf' },
      { id: 30, nome: 'Economia do Esporte', slug: 'economia-do-esporte' },
      { id: 31, nome: 'Futebol', slug: 'futebol' },
    ],
  },

  // ============================================================================
  // 9. LARA LIMA - ENTRETENIMENTO
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000009',
    titulo: 'O Circuito dos Festivais Alternativos de Música: O Legado do Goiânia Noise e Bananada na Cena Indie Brasileira',
    slug: 'o-circuito-dos-festivais-alternativos-de-musica-o-legado-do-goiania-noise-e-bananada-na-cena-indie-brasileira',
    subtitulo_lead: 'Durante décadas, a capital do sertanejo comercial também foi o polo mais subversivo e efervescente do rock e da música independente nacional.',
    conteudo: `Para quem contempla Goiânia a partir das manchetes dos grandes portais de fofoca, a cidade parece resumir-se a uma imensa incubadora de duplas sertanejas. No entanto, por trás dessa vitrine unívoca, corre há mais de trinta anos uma das cenas alternativas mais aguerridas e autônomas do hemisfério sul.

Eventos como o Goiânia Noise Festival e o Festival Bananada construíram um ecossistema autossuficiente de selos, estúdios, casas de show e distribuidoras que influenciou diretamente o surgimento de festivais semelhantes por todo o Brasil. Bandas dos Estados Unidos, Europa e América Latina desembarcavam no cerrado com o mesmo entusiasmo com que tocavam em São Paulo ou no Rio de Janeiro.

> "A resistência cultural de Goiânia sempre foi dialética: quanto mais homogênea a indústria da superfície tentava ser, mais feroz e criativa tornava-se a resposta das guitarras e da cena independente no subsolo."

Embora as dificuldades econômicas pós-pandemia tenham fragilizado esse circuito, uma nova safra de produtores retoma o formato nos teatros municipais e praças públicas, provando que o DNA underground goiano permanece pulsando.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Público em frente ao palco em noite de festival independente.',
    creditos_capa: 'Foto: Felipe Brandão / Noise Imagens',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-10-22T21:00:00Z',
    atualizado_em: '2026-10-22T21:00:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 780,
    categoria: {
      id: CATEGORIAS_MOCK[2].id,
      nome: CATEGORIAS_MOCK[2].nome,
      slug: CATEGORIAS_MOCK[2].slug,
      cor_acento: CATEGORIAS_MOCK[2].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[3].id,
      nome: COLUNAS_MOCK[3].nome,
      slug: COLUNAS_MOCK[3].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[3].id,
      nome: PERFIS_AUTORES_MOCK[3].nome,
      slug: PERFIS_AUTORES_MOCK[3].slug,
      avatar_url: PERFIS_AUTORES_MOCK[3].avatar_url,
    },
    tags: [
      { id: 32, nome: 'Música Indie', slug: 'musica-indie' },
      { id: 33, nome: 'Festivais', slug: 'festivais' },
      { id: 34, nome: 'Goiânia Noise', slug: 'goiania-noise' },
      { id: 35, nome: 'Contracultura', slug: 'contracultura' },
    ],
  },

  // ============================================================================
  // 10. GULIVER ELIAS - ENSAIOS
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000010',
    titulo: 'Inteligência Artificial e a Crise da Autoria: As Novas Fronteiras da Criação no Jornalismo e nas Artes',
    slug: 'inteligencia-artificial-e-a-crise-da-autoria-as-novas-fronteiras-da-criacao-no-jornalismo-e-nas-artes',
    subtitulo_lead: 'Quando modelos probabilísticos de linguagem sintetizam ensaios, roteiros e canções com perfeição cirúrgica, a singularidade do pensamento humano deixa de ser uma garantia e passa a ser uma escolha ética.',
    conteudo: `A disseminação veloz e ubiquitária dos grandes modelos de linguagem (LLMs) confronta a humanidade com uma pergunta que filósofos da linguagem e teóricos da arte debatem desde a antiguidade clássica: o que confere valor, densidade e sentido à palavra escrita?

A capacidade técnica dessas redes neurais de organizar sintaxes complexas, sintetizar terabytes de referências bibliográficas e emular estilos narrativos individuais é inegável. Todavia, a escrita literária e a reflexão jornalística genuína nunca consistiram na mera junção estatística de palavras mais prováveis.

> "A inteligência artificial não escreve porque tem uma angústia existencial, uma indignação política ou uma dor que não cabe no peito. Ela gera texto porque calculou o próximo token vetorial com maior correlação semântica. Confundir isso com consciência é confundir o mapa com o território."

A tarefa premente das revistas de pensamento e dos criadores contemporâneos não é rejeitar as ferramentas computacionais em uma revolta tecnofóbica inútil, mas reafirmar o que nenhuma máquina é capaz de gerar por cálculo de probabilidades: a experiência encarnada do corpo que sente o calor da terra, o sabor do atrito social e o espanto diante da finitude humana.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Composição abstrata evocando sinapses digitais e circuitos cibernéticos.',
    creditos_capa: 'Foto: Arte Digital / Unsplash Pro',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-10-20T12:00:00Z',
    atualizado_em: '2026-10-20T12:00:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 920,
    categoria: {
      id: CATEGORIAS_MOCK[3].id,
      nome: CATEGORIAS_MOCK[3].nome,
      slug: CATEGORIAS_MOCK[3].slug,
      cor_acento: CATEGORIAS_MOCK[3].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[4].id,
      nome: COLUNAS_MOCK[4].nome,
      slug: COLUNAS_MOCK[4].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[4].id,
      nome: PERFIS_AUTORES_MOCK[4].nome,
      slug: PERFIS_AUTORES_MOCK[4].slug,
      avatar_url: PERFIS_AUTORES_MOCK[4].avatar_url,
    },
    tags: [
      { id: 36, nome: 'Inteligência Artificial', slug: 'inteligencia-artificial' },
      { id: 37, nome: 'Filosofia', slug: 'filosofia' },
      { id: 38, nome: 'Autoria', slug: 'autoria' },
      { id: 39, nome: 'Tecnologia', slug: 'tecnologia' },
    ],
  },

  // ============================================================================
  // 11. DANILLO REIS - CULTURA
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000011',
    titulo: 'Das Cavalhadas de Pirenópolis à Bienal de São Paulo: Os Caminhos da Tradição na Contemporaneidade',
    slug: 'das-cavalhadas-de-pirenopolis-a-bienal-de-sao-paulo-os-caminhos-da-tradicao-na-contemporaneidade',
    subtitulo_lead: 'Como as festas populares e os mascarados de Goiás desafiam as categorias engessadas da arte erudita e inspiram os novos caminhos da produção visual brasileira.',
    conteudo: `Sob o sol fulgurante da Festa do Divino Espírito Santo em Pirenópolis, o chão de pedras treme com o galope dos cavalos vestidos de plumas coloridas, veludos ricamente bordados e elmos de flores de papel. Os Mascarados — com suas cabeças de boi e de onça esculpidas em papel machê e tinta caseira — tomam as ladeiras históricas quebrando a solenidade litúrgica com deboche, dança e irreverência carnavalesca.

Essa celebração com mais de dois séculos de existência contínua não é um relicário inerte para turistas de fim de semana. Ela é um território vivo de disputa simbólica onde crenças católicas, mitologias ibéricas medievais e sobrevivências espirituais indígenas e afro-brasileiras se fundem em um espetáculo estético de rara potência.

Nas últimas edições da Bienal de São Paulo e nas galerias de arte contemporânea de Belo Horizonte e Rio de Janeiro, artistas formados no Centro-Oeste têm resgatado a visualidade e as matérias-primas dessa cultura popular — o barro vermelho, a cera de abelha, o couro curtido e os bordados tradicionais — para desestruturar a hegemonia eurocêntrica que por décadas ditou o que é *"arte contemporânea de vanguarda"*.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Mascarado tradicional das Cavalhadas em cortejo pelas ruas de Pirenópolis.',
    creditos_capa: 'Foto: Mariana Vasconcelos / Goiás Turismo',
    tempo_leitura_min: 3,
    status: 'publicado',
    publicado_em: '2026-10-18T14:30:00Z',
    atualizado_em: '2026-10-18T14:30:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 490,
    categoria: {
      id: CATEGORIAS_MOCK[1].id,
      nome: CATEGORIAS_MOCK[1].nome,
      slug: CATEGORIAS_MOCK[1].slug,
      cor_acento: CATEGORIAS_MOCK[1].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[1].id,
      nome: COLUNAS_MOCK[1].nome,
      slug: COLUNAS_MOCK[1].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[1].id,
      nome: PERFIS_AUTORES_MOCK[1].nome,
      slug: PERFIS_AUTORES_MOCK[1].slug,
      avatar_url: PERFIS_AUTORES_MOCK[1].avatar_url,
    },
    tags: [
      { id: 40, nome: 'Pirenópolis', slug: 'pirenopolis' },
      { id: 41, nome: 'Cavalhadas', slug: 'cavalhadas' },
      { id: 42, nome: 'Arte Popular', slug: 'arte-popular' },
    ],
  },

  // ============================================================================
  // 12. SERGIO RODRIGUES - ESPORTE
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000012',
    titulo: 'O Interior no Mapa da Bola: Como Anápolis e Goianésia Redefinem o Cenário do Futebol Goiano',
    slug: 'o-interior-no-mapa-da-bola-como-anapolis-e-goianesia-redefinem-o-cenario-do-futebol-goiano',
    subtitulo_lead: 'A descentralização das forças do campeonato estadual reflete uma nova pujança econômica e coloca clubes regionais em evidência nas divisões de acesso nacionais.',
    conteudo: `Por quase meio século, o Campeonato Goiano de Futebol foi um feudo absoluto controlado quase exclusivamente pelos três gigantes da capital: Goiás, Vila Nova e Atlético Goianiense. As equipes do interior eram encaradas nos manuais de crônica esportiva como coadjuvantes passageiros, cujo único papel consistia em fornecer partidas difíceis em gramados pesados durante a fase classificatória.

Esse cenário desmoronou com estrondo nos últimos anos. Clubes como a Associação Atlética Anapolina, o Anápolis Futebol Clube e o Goianésia Esporte Clube passaram a investir pesado em gestão profissional, categorias de base e captação de talentos de outros estados. A ascensão do Anápolis à Série C do Campeonato Brasileiro e as campanhas históricas na Copa do Brasil mostram que a hegemonia da capital não é mais inquebrantável.

O futebol interiorano mobiliza comunidades inteiras que encontram no estádio local uma bandeira de afirmação regional diante do cosmopolitismo de Goiânia.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Comemoração de gol diante de torcida fervorosa no interior goiano.',
    creditos_capa: 'Foto: Marcos Lima / Foco Esportivo',
    tempo_leitura_min: 3,
    status: 'publicado',
    publicado_em: '2026-10-15T18:00:00Z',
    atualizado_em: '2026-10-15T18:00:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 410,
    categoria: {
      id: CATEGORIAS_MOCK[4].id,
      nome: CATEGORIAS_MOCK[4].nome,
      slug: CATEGORIAS_MOCK[4].slug,
      cor_acento: CATEGORIAS_MOCK[4].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[2].id,
      nome: COLUNAS_MOCK[2].nome,
      slug: COLUNAS_MOCK[2].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[2].id,
      nome: PERFIS_AUTORES_MOCK[2].nome,
      slug: PERFIS_AUTORES_MOCK[2].slug,
      avatar_url: PERFIS_AUTORES_MOCK[2].avatar_url,
    },
    tags: [
      { id: 43, nome: 'Futebol do Interior', slug: 'futebol-do-interior' },
      { id: 44, nome: 'Anápolis FC', slug: 'anapolis-fc' },
      { id: 45, nome: 'Campeonato Goiano', slug: 'campeonato-goiano' },
    ],
  },

  // ============================================================================
  // 13. LARA LIMA - ENSAIOS
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000013',
    titulo: 'Vozes do Sertão Feminino: A Escrita das Mulheres nas Fronteiras do Brasil Central',
    slug: 'vozes-do-sertao-feminino-a-escrita-das-mulheres-nas-fronteiras-do-brasil-central',
    subtitulo_lead: 'Autoras contemporâneas rompem com a mística patriarcal da fronteira agrária para inventar uma poética descolonizada que ecoa as dores e a força do cerrado.',
    conteudo: `Durante gerações, a literatura sobre o sertão e os confins do Centro-Oeste foi escrita e canonizada quase que exclusivamente por homens. De Guimarães Rosa a Bernardo Élis, a narrativa dominante da terra foi forjada sob os códigos do épico patriarcal: o desbravador que abre picadas na mata fechada, o jagunço em transe ético e o fazendeiro cuja autoridade não tolera vacilo.

Nas últimas duas décadas, contudo, uma prolífica geração de escritoras, poetas e cronistas do Centro-Oeste subverteu radicalmente esse cânone. A terra não é mais vista como objeto de conquista ou posse violenta, mas como espaço de afetos, de acolhimento de perdas e de denúncia de corpos femininos historicamente invisibilizados.

> "A poética do cerrado que nasce da escrita feminina não teme o pó, o ressecamento das cascas de árvore e a dureza das pedras; ela faz da aridez do terreno um espelho de resistência contra o apagamento social."

Trabalhos de autoras como Lêda Selma e Cida Pedrosa, aliados a publicações de editoras independentes de Goiânia e Pirenópolis, desenham um novo mapa lírico que coloca o Brasil Central na vanguarda da ficção nacional mais arrojada.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Livros de literatura e poesia sobre mesa de leitura à luz natural.',
    creditos_capa: 'Foto: Clara Fonseca / Poesia Aberta',
    tempo_leitura_min: 4,
    status: 'publicado',
    publicado_em: '2026-10-12T10:45:00Z',
    atualizado_em: '2026-10-12T10:45:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 580,
    categoria: {
      id: CATEGORIAS_MOCK[3].id,
      nome: CATEGORIAS_MOCK[3].nome,
      slug: CATEGORIAS_MOCK[3].slug,
      cor_acento: CATEGORIAS_MOCK[3].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[3].id,
      nome: COLUNAS_MOCK[3].nome,
      slug: COLUNAS_MOCK[3].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[3].id,
      nome: PERFIS_AUTORES_MOCK[3].nome,
      slug: PERFIS_AUTORES_MOCK[3].slug,
      avatar_url: PERFIS_AUTORES_MOCK[3].avatar_url,
    },
    tags: [
      { id: 46, nome: 'Literatura Feminina', slug: 'literatura-feminina' },
      { id: 47, nome: 'Poesia', slug: 'poesia' },
      { id: 48, nome: 'Cerrado', slug: 'cerrado' },
    ],
  },

  // ============================================================================
  // 14. GULIVER ELIAS - ENTRETENIMENTO
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000014',
    titulo: 'A Crise do Streaming e a Fadiga do Espectador: O Que Restou da Era de Ouro da Televisão sob Demanda',
    slug: 'a-crise-do-streaming-e-a-fadiga-do-espectador-o-que-restou-da-era-de-ouro-da-televisao-sob-demanda',
    subtitulo_lead: 'Entre aumentos sucessivos de assinaturas, retorno de anúncios publicitários e cancelamentos sumários de séries autorais, os gigantes do streaming recriam os mesmos vícios da velha TV a cabo.',
    conteudo: `Há uma década, a promessa das plataformas de streaming parecia incontestável: libertar os espectadores da ditadura dos comerciais invasivos, das grades horárias inflexíveis e dos pacotes caríssimos da televisão a cabo tradicional. Em troca de uma modesta mensalidade única, o usuário tinha ao alcance de um clique um acervo quase infinito de filmes de arte, documentários reveladores e séries de alta voltagem cinematográfica.

Em 2026, esse paraíso prometido ruiu sob o peso da busca desenfreada por margens de lucro de Wall Street. O que temos hoje é um ecossistema fragmentado em uma dezena de serviços caros, planos com anúncios que interrompem cenas no momento mais inoportuno e cancelamentos rotineiros de obras sofisticadas logo após sua primeira temporada por não atingirem picos virais na primeira semana.

O espectador brasileiro médio, sobrecarregado por uma inflação crônica de assinaturas que já rivaliza com as antigas contas de TV por assinatura, enfrenta a chamada fadiga da escolha: navega por 40 minutos em catálogos abarrotados de produções medianas e termina por desligar a televisão sem escolher nada.`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Televisor inteligente em sala escura exibindo menu de filmes sob demanda.',
    creditos_capa: 'Foto: Bruno Ribeiro / Tela Aberta',
    tempo_leitura_min: 3,
    status: 'publicado',
    publicado_em: '2026-10-10T19:00:00Z',
    atualizado_em: '2026-10-10T19:00:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 860,
    categoria: {
      id: CATEGORIAS_MOCK[2].id,
      nome: CATEGORIAS_MOCK[2].nome,
      slug: CATEGORIAS_MOCK[2].slug,
      cor_acento: CATEGORIAS_MOCK[2].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[4].id,
      nome: COLUNAS_MOCK[4].nome,
      slug: COLUNAS_MOCK[4].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[4].id,
      nome: PERFIS_AUTORES_MOCK[4].nome,
      slug: PERFIS_AUTORES_MOCK[4].slug,
      avatar_url: PERFIS_AUTORES_MOCK[4].avatar_url,
    },
    tags: [
      { id: 49, nome: 'Streaming', slug: 'streaming' },
      { id: 50, nome: 'Televisão', slug: 'televisao' },
      { id: 51, nome: 'Cultura Pop', slug: 'cultura-pop' },
    ],
  },

  // ============================================================================
  // 15. LUCAS CAMPOS - POLÍTICA (EM EDIÇÃO - PARA TESTES DE REVISÃO E STATUS)
  // ============================================================================
  {
    id: 'b0000000-0000-0000-0000-000000000015',
    titulo: 'A Reforma Tributária e os Impactos Fiscais nos Fundos Estaduais do Centro-Oeste',
    slug: 'a-reforma-tributaria-e-os-impactos-fiscais-nos-fundos-estaduais-do-centro-oeste',
    subtitulo_lead: 'Como a transição do ICMS para o IBS e a CBS desafia o Fundeinfra em Goiás e reabre o embate federativo entre estados produtores e grandes centros consumidores.',
    conteudo: `A promulgação e as leis complementares da Reforma Tributária sobre o consumo colocam as finanças públicas dos estados do Centro-Oeste sob o mais rigoroso teste de estresse das últimas décadas. Goiás, cuja estrutura de arrecadação dependeu historicamente da tributação de commodities agrícolas e da criação de contribuições setoriais sobre a infraestrutura produtiva (como o Fundeinfra), ingressa em um período de transição que exige engenharia fiscal de alta precisão.

O cerne da disputa repousa na mudança do princípio de origem para o princípio de destino da arrecadação. Enquanto estados com grande densidade populacional celebram o aumento de arrecadação proporcional ao consumo, estados exportadores de bens primários e agropecuários veem diminuir sua margem de manobra para conceder incentivos fiscais e reter excedentes dentro do território.

Este ensaio analisa em detalhe os cenários orçamentários do Tesouro Estadual goiano e as negociações em curso no Comitê Gestor do Imposto sobre Bens e Serviços (IBS).`,
    imagem_capa_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&h=675&q=82',
    legenda_capa: 'Documentos fiscais e cálculos orçamentários sobre mesa de gabinete.',
    creditos_capa: 'Foto: Agência Brasil / Arquivo',
    tempo_leitura_min: 3,
    status: 'edicao', // EM EDIÇÃO! Para testar restrição e comentários na redação!
    publicado_em: null,
    atualizado_em: '2026-11-06T11:20:00Z',
    eh_destaque_hero: false,
    eh_destaque_secao: false,
    visualizacoes: 0,
    categoria: {
      id: CATEGORIAS_MOCK[0].id,
      nome: CATEGORIAS_MOCK[0].nome,
      slug: CATEGORIAS_MOCK[0].slug,
      cor_acento: CATEGORIAS_MOCK[0].cor_acento,
    },
    coluna: {
      id: COLUNAS_MOCK[0].id,
      nome: COLUNAS_MOCK[0].nome,
      slug: COLUNAS_MOCK[0].slug,
    },
    autor: {
      id: PERFIS_AUTORES_MOCK[0].id,
      nome: PERFIS_AUTORES_MOCK[0].nome,
      slug: PERFIS_AUTORES_MOCK[0].slug,
      avatar_url: PERFIS_AUTORES_MOCK[0].avatar_url,
    },
    tags: [
      { id: 52, nome: 'Reforma Tributária', slug: 'reforma-tributaria' },
      { id: 53, nome: 'Fundeinfra', slug: 'fundeinfra' },
      { id: 54, nome: 'Economia', slug: 'economia' },
      { id: 55, nome: 'Pacto Federativo', slug: 'pacto-federativo' },
    ],
  },
];


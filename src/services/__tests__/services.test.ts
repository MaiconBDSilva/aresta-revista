import { describe, it, expect } from 'vitest';
import { getCategorias, getCategoriaBySlug } from '../categoriasService';
import {
  getAutores,
  getAutorBySlug,
  getColunaBySlug,
  getColunaByAutorId,
  getColunistasVitrine,
} from '../autoresService';
import {
  getHeroArticle,
  getDestaquesSecao,
  getArtigosPublicados,
  getArtigosPorCategoria,
  getArtigoBySlug,
  buscarArtigos,
} from '../artigosService';
import { getComentariosByArtigoId, adicionarComentario } from '../comentariosService';

describe('categoriasService', () => {
  it('deve retornar as 5 categorias oficiais ativas ordenadas por ordem_exibicao', async () => {
    const categorias = await getCategorias();
    expect(categorias).toHaveLength(5);
    expect(categorias.map((c) => c.slug)).toEqual([
      'politica',
      'cultura',
      'entretenimento',
      'ensaios',
      'esporte',
    ]);
  });

  it('deve recuperar uma categoria pelo slug amigável', async () => {
    const politica = await getCategoriaBySlug('politica');
    expect(politica).not.toBeNull();
    expect(politica?.nome).toBe('Política');
    expect(politica?.cor_acento).toBe('#1E3A8A');
  });

  it('deve retornar null para categoria inexistente', async () => {
    const inexistente = await getCategoriaBySlug('categoria-que-nao-existe');
    expect(inexistente).toBeNull();
  });
});

describe('autoresService', () => {
  it('deve listar os 5 autores oficiais do projeto', async () => {
    const autores = await getAutores();
    expect(autores).toHaveLength(5);
    const nomes = autores.map((a) => a.nome);
    expect(nomes).toContain('Lucas Campos');
    expect(nomes).toContain('Danillo Reis');
    expect(nomes).toContain('Sergio Rodrigues');
    expect(nomes).toContain('Lara Lima');
    expect(nomes).toContain('Guliver Elias');
  });

  it('deve recuperar o perfil de um colunista pelo slug biográfico', async () => {
    const lucas = await getAutorBySlug('lucas-campos');
    expect(lucas).not.toBeNull();
    expect(lucas?.nome).toBe('Lucas Campos');
    expect(lucas?.papel).toBe('autor');
  });

  it('deve recuperar uma coluna pelo slug do acervo', async () => {
    const coluna = await getColunaBySlug('coluna-de-lara');
    expect(coluna).not.toBeNull();
    expect(coluna?.nome).toBe('Coluna de Lara');
  });

  it('deve montar a vitrine das colunas com os 5 colunistas e seus últimos textos', async () => {
    const vitrine = await getColunistasVitrine();
    expect(vitrine).toHaveLength(5);
    for (const item of vitrine) {
      expect(item.autor).toBeDefined();
      expect(item.coluna).toBeDefined();
      expect(item.ultimoArtigo).toBeDefined();
      expect(item.ultimoArtigo?.status).toBe('publicado');
    }
  });
});

describe('artigosService', () => {
  it('deve recuperar a manchete principal (Hero Article) com status publicado', async () => {
    const hero = await getHeroArticle();
    expect(hero).not.toBeNull();
    expect(hero?.eh_destaque_hero).toBe(true);
    expect(hero?.status).toBe('publicado');
    // Verifica que o slug é semântico kebab-case
    expect(hero?.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it('deve recuperar 2 apoios secundários com status publicado', async () => {
    const apoios = await getDestaquesSecao();
    expect(apoios.length).toBeLessThanOrEqual(2);
    for (const apoio of apoios) {
      expect(apoio.eh_destaque_secao).toBe(true);
      expect(apoio.eh_destaque_hero).toBe(false);
      expect(apoio.status).toBe('publicado');
    }
  });

  it('deve filtrar artigos publicados por editoria', async () => {
    const cultura = await getArtigosPorCategoria('cultura');
    expect(cultura.length).toBeGreaterThan(0);
    for (const art of cultura) {
      expect(art.categoria.slug).toBe('cultura');
      expect(art.status).toBe('publicado');
    }
  });

  it('deve recuperar artigo completo por slug semântico com Markdown', async () => {
    const hero = await getHeroArticle();
    expect(hero).not.toBeNull();

    const completo = await getArtigoBySlug(hero!.slug);
    expect(completo).not.toBeNull();
    expect(completo?.conteudo).toContain('### ');
    expect(completo?.tempo_leitura_min).toBeGreaterThan(0);
    expect(completo?.tags.length).toBeGreaterThan(0);
  });

  it('deve não expor artigos em edição em consultas públicas', async () => {
    const publicados = await getArtigosPublicados();
    const emEdicao = publicados.filter((a) => a.status === 'edicao');
    expect(emEdicao).toHaveLength(0);
  });

  it('deve realizar busca textual em tempo real respeitando acentuação e termos', async () => {
    const resultadosGoias = await buscarArtigos('Goiás');
    expect(resultadosGoias.length).toBeGreaterThan(0);

    const resultadosGoiásSemAcento = await buscarArtigos('goias');
    expect(resultadosGoiásSemAcento.length).toEqual(resultadosGoias.length);

    const resultadosArtDeco = await buscarArtigos('Art Déco');
    expect(resultadosArtDeco.length).toBeGreaterThan(0);
    expect(resultadosArtDeco[0].titulo).toContain('Art Déco');
  });
});

describe('comentariosService', () => {
  it('deve listar comentários de um artigo com dados do leitor', async () => {
    const comentarios = await getComentariosByArtigoId('b0000000-0000-0000-0000-000000000001');
    expect(comentarios.length).toBeGreaterThan(0);
    expect(comentarios[0].leitor.nome).toBeDefined();
    expect(comentarios[0].conteudo).toBeDefined();
  });

  it('deve adicionar novo comentário para leitor autenticado', async () => {
    const novo = await adicionarComentario({
      artigoId: 'b0000000-0000-0000-0000-000000000001',
      leitorId: 'l-test-user',
      leitorNome: 'Leitor Teste',
      leitorAvatarUrl: null,
      conteudo: 'Comentário teste adicionado com sucesso.',
    });

    expect(novo.id).toBeDefined();
    expect(novo.conteudo).toBe('Comentário teste adicionado com sucesso.');

    const listagem = await getComentariosByArtigoId('b0000000-0000-0000-0000-000000000001');
    expect(listagem[0].id).toBe(novo.id);
  });
});


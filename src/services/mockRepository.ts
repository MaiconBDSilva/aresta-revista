/**
 * Gerenciador de Repositório Local (Mock-First Database Adapter)
 * 
 * Finalidade:
 * - Emular o comportamento de um banco de dados relacional (PostgreSQL/Supabase)
 *   no navegador através de tabelas persistidas no localStorage.
 * - Manter as mesmas entidades e contratos das tabelas SQL de 20261107_init_schema.sql.
 * - Permitir transição transparente e sem atrito para o Supabase Client na Sprint 5.
 */

export const MOCK_DB_TABLES = {
  ARTIGOS: 'aresta_db_artigos',
  PERFIS: 'aresta_db_perfis',
  COLUNAS: 'aresta_db_colunas',
  REVISOES: 'aresta_db_artigo_revisao_comentarios',
  COMENTARIOS: 'aresta_db_artigo_comentarios',
} as const;

export type MockDbTable = (typeof MOCK_DB_TABLES)[keyof typeof MOCK_DB_TABLES];

export const MOCK_DB_VERSION = 'v1.4_comments_reviews_reset';
const DB_VERSION_KEY = 'aresta_mock_db_version';

const DB_CHANGE_EVENT = 'aresta_mock_db_changed';

/**
 * Verifica se o código está executando no ambiente do navegador.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

let versionChecked = false;

/**
 * Auto-sincronização: Quando a versão dos mocks do código for atualizada,
 * limpa tabelas obsoletas no localStorage para refletir as novas alterações do código.
 */
function checkVersionMigration(): void {
  if (!isBrowser() || versionChecked) return;
  versionChecked = true;

  try {
    const currentVersion = localStorage.getItem(DB_VERSION_KEY);
    if (currentVersion !== MOCK_DB_VERSION) {
      // Limpa dados em cache do localStorage para que os novos arquivos de mock tenham precedência
      localStorage.removeItem(MOCK_DB_TABLES.PERFIS);
      localStorage.removeItem(MOCK_DB_TABLES.COLUNAS);
      localStorage.removeItem(MOCK_DB_TABLES.ARTIGOS);
      localStorage.removeItem(MOCK_DB_TABLES.COMENTARIOS);
      localStorage.removeItem(MOCK_DB_TABLES.REVISOES);
      localStorage.setItem(DB_VERSION_KEY, MOCK_DB_VERSION);
    }
  } catch {}
}

const memoryStore = new Map<string, unknown>();

/**
 * Carrega os dados de uma tabela do localStorage.
 * Se não houver dados gravados ou se estiver no servidor (SSR/SSG/Node), retorna o fallback original dos mocks.
 */
export function loadTable<T>(tableName: MockDbTable, fallback: T): T {
  if (!isBrowser()) {
    if (!memoryStore.has(tableName)) {
      memoryStore.set(tableName, fallback);
    }
    return memoryStore.get(tableName) as T;
  }

  checkVersionMigration();

  try {
    const raw = localStorage.getItem(tableName);
    if (!raw) {
      // Primeira inicialização: salva o fallback no storage para consistência
      localStorage.setItem(tableName, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[MockDB] Falha ao ler tabela "${tableName}", usando dados padrão:`, error);
    return fallback;
  }
}

/**
 * Salva os dados de uma tabela no localStorage e notifica os componentes inscritos.
 */
export function saveTable<T>(tableName: MockDbTable, data: T): void {
  if (!isBrowser()) {
    memoryStore.set(tableName, data);
    return;
  }

  try {
    localStorage.setItem(tableName, JSON.stringify(data));
    notifyTableChange(tableName);
  } catch (error) {
    console.error(`[MockDB] Falha ao persistir tabela "${tableName}":`, error);
  }
}

/**
 * Dispara um evento no navegador para que componentes e páginas reajam em tempo real
 * quando dados forem atualizados no painel ou na administração.
 */
export function notifyTableChange(tableName: MockDbTable): void {
  if (!isBrowser()) return;

  try {
    window.dispatchEvent(
      new CustomEvent(DB_CHANGE_EVENT, {
        detail: { table: tableName, timestamp: Date.now() },
      })
    );
  } catch {}
}

/**
 * Permite que componentes React se inscrevam para reagir a alterações no banco mock.
 */
export function subscribeToTableChanges(
  targetTable: MockDbTable | 'all',
  callback: (table: string) => void
): () => void {
  if (!isBrowser()) return () => {};

  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ table: MockDbTable; timestamp: number }>;
    if (targetTable === 'all' || custom.detail?.table === targetTable) {
      callback(custom.detail?.table);
    }
  };

  window.addEventListener(DB_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener(DB_CHANGE_EVENT, handler);
  };
}

/**
 * Restaura todas as tabelas aos dados originais de fábrica (Reset de Mock).
 */
export function resetMockDatabase(mocks: {
  artigos: unknown;
  perfis: unknown;
  colunas: unknown;
  revisoes: unknown;
  comentarios: unknown;
}): void {
  if (!isBrowser()) return;

  saveTable(MOCK_DB_TABLES.ARTIGOS, mocks.artigos);
  saveTable(MOCK_DB_TABLES.PERFIS, mocks.perfis);
  saveTable(MOCK_DB_TABLES.COLUNAS, mocks.colunas);
  saveTable(MOCK_DB_TABLES.REVISOES, mocks.revisoes);
  saveTable(MOCK_DB_TABLES.COMENTARIOS, mocks.comentarios);

  notifyTableChange(MOCK_DB_TABLES.ARTIGOS);
  notifyTableChange(MOCK_DB_TABLES.PERFIS);
  notifyTableChange(MOCK_DB_TABLES.COLUNAS);
}


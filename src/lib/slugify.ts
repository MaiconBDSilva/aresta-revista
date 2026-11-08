/**
 * Converte uma string para o padrão de slug kebab-case.
 * Validação: ^[a-z0-9]+(?:-[a-z0-9]+)*$ (docs/dicionario-de-dados.md - Seção 5)
 * @param texto String a ser convertida em slug
 * @returns Slug formatado em kebab-case limpo
 */
export function slugify(texto: string): string {
  if (!texto) return '';

  return texto
    .toString()
    .normalize('NFD') // Separa acentos das letras base
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/[\s_]+/g, '-') // Converte espaços e underlines em hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-+|-+$/g, ''); // Remove hífens no início e fim
}


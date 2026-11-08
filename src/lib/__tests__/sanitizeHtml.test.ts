import { describe, it, expect } from 'vitest';
import { sanitizeHtml, escapeHtml } from '../sanitizeHtml';

describe('sanitizeHtml', () => {
  it('remove scripts e handlers inline mantendo o texto editorial', () => {
    const limpo = sanitizeHtml('<p onclick="x()">Olá <strong>mundo</strong></p><script>alert(1)</script>');
    expect(limpo).toContain('<strong>mundo</strong>');
    expect(limpo).not.toContain('script');
    expect(limpo).not.toContain('onclick');
  });

  it('escapa HTML em texto bruto', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;');
  });
});


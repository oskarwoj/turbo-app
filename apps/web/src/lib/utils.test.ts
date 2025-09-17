import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names and resolves conflicts', () => {
    const result = cn('p-2', 'p-4', ['text-sm', null, undefined], {
      'font-bold': true,
      hidden: false,
    });
    expect(result).toContain('p-4');
    expect(result).not.toContain('p-2');
    expect(result).toContain('text-sm');
    expect(result).toContain('font-bold');
    expect(result).not.toContain('hidden');
  });
});

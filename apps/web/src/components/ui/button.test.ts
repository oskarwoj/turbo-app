import { describe, expect, it } from 'vitest';
import { buttonVariants } from './button';

describe('buttonVariants', () => {
  it('returns classes for default variant', () => {
    const classes = buttonVariants();
    expect(typeof classes).toBe('string');
    expect(classes).toContain('inline-flex');
  });

  it('includes destructive styles when variant is destructive', () => {
    const classes = buttonVariants({ variant: 'destructive' });
    expect(classes).toContain('bg-destructive');
  });

  it('includes link styles when variant is link', () => {
    const classes = buttonVariants({ variant: 'link' });
    expect(classes).toContain('underline');
  });
});

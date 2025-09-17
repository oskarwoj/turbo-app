import { z } from 'zod';

export const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).nullable().optional(),
  createdAt: z.string()
});

export type User = z.infer<typeof User>;

export const CreateUserInput = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional()
});

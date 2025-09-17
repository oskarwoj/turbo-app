import { getDb, users } from '@packages/db';
import { CreateUserInput } from '@packages/validators';
import cors from 'cors';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import express from 'express';
import helmet from 'helmet';
import { z } from 'zod';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    // @ts-expect-error attach parsed
    req.valid = parsed.data;
    next();
  };

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/users', validate(CreateUserInput), async (req, res, next) => {
  try {
    const db = getDb();
    // @ts-expect-error from middleware
    const body: z.infer<typeof CreateUserInput> = req.valid;
    const [row] = await db
      .insert(users)
      .values({ email: body.email, name: body.name ?? null })
      .returning();
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

app.get('/users/:id', async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params?.id;
    const [row] = await db.select().from(users).where(eq(users.id, id));
    if (!row) return res.status(404).end();
    res.json(row);
  } catch (err) {
    next(err);
  }
});

app.use((err: unknown, _req: express.Request, res: express.Response) => {
  const message = (err as Error)?.message ?? 'Internal Error';
  res.status(500).json({ message });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});

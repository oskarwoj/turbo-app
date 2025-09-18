export const API_BASE: string = (import.meta.env.VITE_API_URL ?? '/api') as string;

type JsonFetchInit = RequestInit & { parse?: 'json' | 'text' };

export async function fetchJson<TResponse = unknown>(
  path: string,
  init?: JsonFetchInit,
): Promise<TResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    const message = await safeErrorMessage(res);
    throw new Error(message ?? `Request failed with status ${res.status}`);
  }

  const mode = init?.parse ?? 'json';
  return mode === 'json'
    ? (res.json() as Promise<TResponse>)
    : (res.text() as unknown as Promise<TResponse>);
}

async function safeErrorMessage(res: Response): Promise<string | null> {
  try {
    const data = (await res.json()) as { message?: string };
    return data?.message ?? null;
  } catch {
    return null;
  }
}

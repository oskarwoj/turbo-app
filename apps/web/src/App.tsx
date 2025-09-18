import { Button } from '@/components/ui/button';
import { fetchJson } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const {
    data: health,
    isLoading: isHealthLoading,
    error: healthError,
  } = useQuery({
    queryKey: ['health'],
    queryFn: () => fetchJson('/health'),
  });

  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchJson('/users'),
  });

  return (
    <div className="p-6">
      <Button variant="default">Turbo App</Button>
      <section className="mt-4">
        <h2 className="font-semibold">Health</h2>
        {isHealthLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : healthError ? (
          <p className="text-sm text-red-600">{(healthError as Error).message}</p>
        ) : (
          <pre className="mt-2 text-sm">{JSON.stringify(health ?? {}, null, 2)}</pre>
        )}
      </section>
      <section className="mt-6">
        <h2 className="font-semibold">Users</h2>
        {isUsersLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : usersError ? (
          <p className="text-sm text-red-600">{(usersError as Error).message}</p>
        ) : (
          <pre className="mt-2 text-sm">{JSON.stringify(users ?? {}, null, 2)}</pre>
        )}
      </section>
    </div>
  );
}

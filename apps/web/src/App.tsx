import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const { data } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${base}/health`);
      return res.json();
    },
  });

  return (
    <div className="p-6">
      <Button variant="default">Turbo App</Button>
      <pre className="mt-4 text-sm">{JSON.stringify(data ?? {}, null, 2)}</pre>
    </div>
  );
}

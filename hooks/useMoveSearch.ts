import { useQuery } from '@tanstack/react-query';
import { NamedAPIResourceList } from '@/types/pokemon';
import { useMemo, useState } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2';

function extractId(url: string): string {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

export function useMoveSearch() {
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['move-list-full'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/move?limit=1000&offset=0`);
      if (!res.ok) throw new Error('Failed to fetch move list');
      return res.json() as Promise<NamedAPIResourceList>;
    },
    staleTime: Infinity,
  });

  const allMoves = data?.results ?? [];

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return allMoves
      .filter((m) => m.name.includes(q))
      .slice(0, 8)
      .map((m) => ({
        name: m.name,
        id: extractId(m.url),
      }));
  }, [query, allMoves]);

  const paginatedMoves = useMemo(() => {
    if (query.length >= 2) return [];
    return allMoves;
  }, [query, allMoves]);

  return {
    query,
    setQuery,
    suggestions,
    paginatedMoves,
    isLoading,
  };
}
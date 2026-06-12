import { fetchPokemonList } from "@/lib/api/pokemon";
import { NamedAPIResource } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const POPULAR = [
  { name: "pikachu", id: "25" },
  { name: "charizard", id: "6" },
  { name: "mewtwo", id: "150" },
  { name: "lucario", id: "448" },
  { name: "gardevoir", id: "282" },
  { name: "rayquaza", id: "384" },
];

function extractIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function usePokemonSearch() {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-list-full"],
    queryFn: () => fetchPokemonList(1302, 0),
    staleTime: Infinity,
  });

  const allPokemon: NamedAPIResource[] = data?.results ?? [];

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return allPokemon
      .filter(
        (p) => p.name.includes(q) || extractIdFromUrl(p.url).startsWith(q),
      )
      .slice(0, 8)
      .map((p) => ({
        name: p.name,
        id: extractIdFromUrl(p.url),
      }));
  }, [query, allPokemon]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    popular: POPULAR,
  };
}

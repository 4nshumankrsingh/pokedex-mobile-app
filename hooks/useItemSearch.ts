import { NamedAPIResourceList } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

function extractId(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function getItemSpriteUrl(name: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
}

export function useItemSearch() {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["item-list-full"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/item?limit=2200&offset=0`);
      if (!res.ok) throw new Error("Failed to fetch item list");
      return res.json() as Promise<NamedAPIResourceList>;
    },
    staleTime: Infinity,
  });

  const allItems = data?.results ?? [];

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return allItems
      .filter((i) => i.name.includes(q))
      .slice(0, 8)
      .map((i) => ({ name: i.name, id: extractId(i.url) }));
  }, [query, allItems]);

  const paginatedItems = useMemo(() => {
    if (query.length >= 2) return [];
    return allItems;
  }, [query, allItems]);

  return {
    query,
    setQuery,
    suggestions,
    paginatedItems,
    isLoading,
  };
}

export { getItemSpriteUrl };


import { ApiEndpoints } from "@/constants/api";
import { PokemonType } from "@/types/types";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchType = (idOrName: string | number) =>
  apiFetch<PokemonType>(ApiEndpoints.type(idOrName));

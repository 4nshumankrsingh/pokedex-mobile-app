import { ApiEndpoints } from "@/constants/api";
import { EvolutionChain, EvolutionTrigger } from "@/types/evolution";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchEvolutionChain = (id: number) =>
  apiFetch<EvolutionChain>(ApiEndpoints.evolutionChain(id));

export const fetchEvolutionTrigger = (idOrName: string | number) =>
  apiFetch<EvolutionTrigger>(ApiEndpoints.evolutionTrigger(idOrName));

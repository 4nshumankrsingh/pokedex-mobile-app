import { ApiEndpoints } from "@/constants/api";
import { Ability } from "@/types/abilities";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchAbility = (idOrName: string | number) =>
  apiFetch<Ability>(ApiEndpoints.ability(idOrName));

import { ApiEndpoints } from "@/constants/api";
import {
    Characteristic,
    ContestEffect,
    EncounterCondition,
    EncounterMethod,
    Generation,
    GrowthRate,
    Machine,
    Nature,
    PokeathlonStat,
    Pokedex,
    Region,
    Stat,
    SuperContestEffect,
} from "@/types/misc";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchGeneration = (idOrName: string | number) =>
  apiFetch<Generation>(ApiEndpoints.generation(idOrName));

export const fetchPokedex = (idOrName: string | number) =>
  apiFetch<Pokedex>(ApiEndpoints.pokedex(idOrName));

export const fetchRegion = (idOrName: string | number) =>
  apiFetch<Region>(ApiEndpoints.region(idOrName));

export const fetchNature = (idOrName: string | number) =>
  apiFetch<Nature>(ApiEndpoints.nature(idOrName));

export const fetchGrowthRate = (idOrName: string | number) =>
  apiFetch<GrowthRate>(ApiEndpoints.growthRate(idOrName));

export const fetchStat = (idOrName: string | number) =>
  apiFetch<Stat>(ApiEndpoints.stat(idOrName));

export const fetchMachine = (id: number) =>
  apiFetch<Machine>(ApiEndpoints.machine(id));

export const fetchContestEffect = (id: number) =>
  apiFetch<ContestEffect>(ApiEndpoints.contestEffect(id));

export const fetchSuperContestEffect = (id: number) =>
  apiFetch<SuperContestEffect>(ApiEndpoints.superContestEffect(id));

export const fetchEncounterMethod = (idOrName: string | number) =>
  apiFetch<EncounterMethod>(ApiEndpoints.encounterMethod(idOrName));

export const fetchEncounterCondition = (idOrName: string | number) =>
  apiFetch<EncounterCondition>(ApiEndpoints.encounterCondition(idOrName));

export const fetchCharacteristic = (id: number) =>
  apiFetch<Characteristic>(ApiEndpoints.characteristic(id));

export const fetchPokeathlonStat = (idOrName: string | number) =>
  apiFetch<PokeathlonStat>(ApiEndpoints.pokeathlonStat(idOrName));

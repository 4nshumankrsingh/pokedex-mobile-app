import { ApiEndpoints } from "@/constants/api";
import {
    LocationAreaEncounter,
    NamedAPIResourceList,
    Pokemon,
    PokemonForm,
    PokemonHabitat,
    PokemonSpecies,
} from "@/types/pokemon";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchPokemon = (idOrName: string | number) =>
  apiFetch<Pokemon>(ApiEndpoints.pokemon(idOrName));

export const fetchPokemonSpecies = (idOrName: string | number) =>
  apiFetch<PokemonSpecies>(ApiEndpoints.pokemonSpecies(idOrName));

export const fetchPokemonEncounters = (idOrName: string | number) =>
  apiFetch<LocationAreaEncounter[]>(ApiEndpoints.pokemonEncounters(idOrName));

export const fetchPokemonForm = (idOrName: string | number) =>
  apiFetch<PokemonForm>(ApiEndpoints.pokemonForm(idOrName));

export const fetchPokemonHabitat = (idOrName: string | number) =>
  apiFetch<PokemonHabitat>(ApiEndpoints.pokemonHabitat(idOrName));

export const fetchPokemonList = (limit = 20, offset = 0) =>
  apiFetch<NamedAPIResourceList>(ApiEndpoints.pokemonList(limit, offset));

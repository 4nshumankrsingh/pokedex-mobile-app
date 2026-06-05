import { fetchAbility } from "@/lib/api/abilities";
import {
    fetchEvolutionChain,
    fetchEvolutionTrigger,
} from "@/lib/api/evolution";
import { fetchItem, fetchItemFlingEffect } from "@/lib/api/items";
import {
    fetchCharacteristic,
    fetchContestEffect,
    fetchEncounterCondition,
    fetchEncounterMethod,
    fetchGeneration,
    fetchGrowthRate,
    fetchMachine,
    fetchNature,
    fetchPokeathlonStat,
    fetchPokedex,
    fetchRegion,
    fetchStat,
    fetchSuperContestEffect,
} from "@/lib/api/misc";
import {
    fetchMove,
    fetchMoveBattleStyle,
    fetchMoveCategory,
    fetchMoveDamageClass,
    fetchMoveLearnMethod,
} from "@/lib/api/moves";
import {
    fetchPokemon,
    fetchPokemonEncounters,
    fetchPokemonForm,
    fetchPokemonHabitat,
    fetchPokemonList,
    fetchPokemonSpecies,
} from "@/lib/api/pokemon";
import { fetchType } from "@/lib/api/types";
import { useQuery } from "@tanstack/react-query";

// ---------- Pokemon ----------

export const usePokemon = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => fetchPokemon(idOrName),
    enabled: !!idOrName,
  });

export const usePokemonSpecies = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokemon-species", idOrName],
    queryFn: () => fetchPokemonSpecies(idOrName),
    enabled: !!idOrName,
  });

export const usePokemonEncounters = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokemon-encounters", idOrName],
    queryFn: () => fetchPokemonEncounters(idOrName),
    enabled: !!idOrName,
  });

export const usePokemonForm = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokemon-form", idOrName],
    queryFn: () => fetchPokemonForm(idOrName),
    enabled: !!idOrName,
  });

export const usePokemonHabitat = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokemon-habitat", idOrName],
    queryFn: () => fetchPokemonHabitat(idOrName),
    enabled: !!idOrName,
  });

export const usePokemonList = (limit = 20, offset = 0) =>
  useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
  });

// ---------- Evolution ----------

export const useEvolutionChain = (id: number) =>
  useQuery({
    queryKey: ["evolution-chain", id],
    queryFn: () => fetchEvolutionChain(id),
    enabled: !!id,
  });

export const useEvolutionTrigger = (idOrName: string | number) =>
  useQuery({
    queryKey: ["evolution-trigger", idOrName],
    queryFn: () => fetchEvolutionTrigger(idOrName),
    enabled: !!idOrName,
  });

// ---------- Abilities ----------

export const useAbility = (idOrName: string | number) =>
  useQuery({
    queryKey: ["ability", idOrName],
    queryFn: () => fetchAbility(idOrName),
    enabled: !!idOrName,
  });

// ---------- Types ----------

export const useType = (idOrName: string | number) =>
  useQuery({
    queryKey: ["type", idOrName],
    queryFn: () => fetchType(idOrName),
    enabled: !!idOrName,
  });

// ---------- Moves ----------

export const useMove = (idOrName: string | number) =>
  useQuery({
    queryKey: ["move", idOrName],
    queryFn: () => fetchMove(idOrName),
    enabled: !!idOrName,
  });

export const useMoveBattleStyle = (idOrName: string | number) =>
  useQuery({
    queryKey: ["move-battle-style", idOrName],
    queryFn: () => fetchMoveBattleStyle(idOrName),
    enabled: !!idOrName,
  });

export const useMoveCategory = (idOrName: string | number) =>
  useQuery({
    queryKey: ["move-category", idOrName],
    queryFn: () => fetchMoveCategory(idOrName),
    enabled: !!idOrName,
  });

export const useMoveDamageClass = (idOrName: string | number) =>
  useQuery({
    queryKey: ["move-damage-class", idOrName],
    queryFn: () => fetchMoveDamageClass(idOrName),
    enabled: !!idOrName,
  });

export const useMoveLearnMethod = (idOrName: string | number) =>
  useQuery({
    queryKey: ["move-learn-method", idOrName],
    queryFn: () => fetchMoveLearnMethod(idOrName),
    enabled: !!idOrName,
  });

// ---------- Items ----------

export const useItem = (idOrName: string | number) =>
  useQuery({
    queryKey: ["item", idOrName],
    queryFn: () => fetchItem(idOrName),
    enabled: !!idOrName,
  });

export const useItemFlingEffect = (idOrName: string | number) =>
  useQuery({
    queryKey: ["item-fling-effect", idOrName],
    queryFn: () => fetchItemFlingEffect(idOrName),
    enabled: !!idOrName,
  });

// ---------- Misc ----------

export const useGeneration = (idOrName: string | number) =>
  useQuery({
    queryKey: ["generation", idOrName],
    queryFn: () => fetchGeneration(idOrName),
    enabled: !!idOrName,
  });

export const usePokedex = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokedex", idOrName],
    queryFn: () => fetchPokedex(idOrName),
    enabled: !!idOrName,
  });

export const useRegion = (idOrName: string | number) =>
  useQuery({
    queryKey: ["region", idOrName],
    queryFn: () => fetchRegion(idOrName),
    enabled: !!idOrName,
  });

export const useNature = (idOrName: string | number) =>
  useQuery({
    queryKey: ["nature", idOrName],
    queryFn: () => fetchNature(idOrName),
    enabled: !!idOrName,
  });

export const useGrowthRate = (idOrName: string | number) =>
  useQuery({
    queryKey: ["growth-rate", idOrName],
    queryFn: () => fetchGrowthRate(idOrName),
    enabled: !!idOrName,
  });

export const useStat = (idOrName: string | number) =>
  useQuery({
    queryKey: ["stat", idOrName],
    queryFn: () => fetchStat(idOrName),
    enabled: !!idOrName,
  });

export const useMachine = (id: number) =>
  useQuery({
    queryKey: ["machine", id],
    queryFn: () => fetchMachine(id),
    enabled: !!id,
  });

export const useContestEffect = (id: number) =>
  useQuery({
    queryKey: ["contest-effect", id],
    queryFn: () => fetchContestEffect(id),
    enabled: !!id,
  });

export const useSuperContestEffect = (id: number) =>
  useQuery({
    queryKey: ["super-contest-effect", id],
    queryFn: () => fetchSuperContestEffect(id),
    enabled: !!id,
  });

export const useEncounterMethod = (idOrName: string | number) =>
  useQuery({
    queryKey: ["encounter-method", idOrName],
    queryFn: () => fetchEncounterMethod(idOrName),
    enabled: !!idOrName,
  });

export const useEncounterCondition = (idOrName: string | number) =>
  useQuery({
    queryKey: ["encounter-condition", idOrName],
    queryFn: () => fetchEncounterCondition(idOrName),
    enabled: !!idOrName,
  });

export const useCharacteristic = (id: number) =>
  useQuery({
    queryKey: ["characteristic", id],
    queryFn: () => fetchCharacteristic(id),
    enabled: !!id,
  });

export const usePokeathlonStat = (idOrName: string | number) =>
  useQuery({
    queryKey: ["pokeathlon-stat", idOrName],
    queryFn: () => fetchPokeathlonStat(idOrName),
    enabled: !!idOrName,
  });

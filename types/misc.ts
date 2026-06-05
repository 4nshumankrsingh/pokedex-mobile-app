import { APIResource, NamedAPIResource } from "./pokemon";

export interface Generation {
  id: number;
  name: string;
  abilities: NamedAPIResource[];
  names: { name: string; language: NamedAPIResource }[];
  main_region: NamedAPIResource;
  moves: NamedAPIResource[];
  pokemon_species: NamedAPIResource[];
  types: NamedAPIResource[];
  version_groups: NamedAPIResource[];
}

export interface Pokedex {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: { description: string; language: NamedAPIResource }[];
  names: { name: string; language: NamedAPIResource }[];
  pokemon_entries: {
    entry_number: number;
    pokemon_species: NamedAPIResource;
  }[];
  region: NamedAPIResource | null;
  version_groups: NamedAPIResource[];
}

export interface Region {
  id: number;
  name: string;
  locations: NamedAPIResource[];
  main_generation: NamedAPIResource;
  names: { name: string; language: NamedAPIResource }[];
  pokedexes: NamedAPIResource[];
  version_groups: NamedAPIResource[];
}

export interface Nature {
  id: number;
  name: string;
  decreased_stat: NamedAPIResource | null;
  increased_stat: NamedAPIResource | null;
  hates_flavor: NamedAPIResource | null;
  likes_flavor: NamedAPIResource | null;
  pokeathlon_stat_changes: {
    max_change: number;
    pokeathlon_stat: NamedAPIResource;
  }[];
  move_battle_style_preferences: {
    low_hp_preference: number;
    high_hp_preference: number;
    move_battle_style: NamedAPIResource;
  }[];
  names: { name: string; language: NamedAPIResource }[];
}

export interface GrowthRate {
  id: number;
  name: string;
  formula: string;
  descriptions: { description: string; language: NamedAPIResource }[];
  levels: { experience: number; level: number }[];
  pokemon_species: NamedAPIResource[];
}

export interface Stat {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: {
    increase: { change: number; move: NamedAPIResource }[];
    decrease: { change: number; move: NamedAPIResource }[];
  };
  affecting_natures: {
    increase: NamedAPIResource[];
    decrease: NamedAPIResource[];
  };
  characteristics: APIResource[];
  move_damage_class: NamedAPIResource | null;
  names: { name: string; language: NamedAPIResource }[];
}

export interface Machine {
  id: number;
  item: NamedAPIResource;
  move: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface ContestEffect {
  id: number;
  appeal: number;
  jam: number;
  effect_entries: { effect: string; language: NamedAPIResource }[];
  flavor_text_entries: { flavor_text: string; language: NamedAPIResource }[];
}

export interface SuperContestEffect {
  id: number;
  appeal: number;
  flavor_text_entries: { flavor_text: string; language: NamedAPIResource }[];
  moves: NamedAPIResource[];
}

export interface EncounterMethod {
  id: number;
  name: string;
  order: number;
  names: { name: string; language: NamedAPIResource }[];
}

export interface EncounterCondition {
  id: number;
  name: string;
  names: { name: string; language: NamedAPIResource }[];
  values: NamedAPIResource[];
}

export interface Characteristic {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: NamedAPIResource;
  descriptions: { description: string; language: NamedAPIResource }[];
}

export interface PokeathlonStat {
  id: number;
  name: string;
  names: { name: string; language: NamedAPIResource }[];
  affecting_natures: {
    increase: { max_change: number; nature: NamedAPIResource }[];
    decrease: { max_change: number; nature: NamedAPIResource }[];
  };
}

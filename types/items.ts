import { APIResource, NamedAPIResource } from "./pokemon";

export interface Item {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  fling_effect: NamedAPIResource | null;
  attributes: NamedAPIResource[];
  category: NamedAPIResource;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
  }[];
  flavor_text_entries: {
    text: string;
    version_group: NamedAPIResource;
    language: NamedAPIResource;
  }[];
  game_indices: { game_index: number; generation: NamedAPIResource }[];
  names: { name: string; language: NamedAPIResource }[];
  sprites: { default: string | null };
  held_by_pokemon: {
    pokemon: NamedAPIResource;
    version_details: { rarity: number; version: NamedAPIResource }[];
  }[];
  baby_trigger_for: APIResource | null;
  machines: { machine: APIResource; version_group: NamedAPIResource }[];
}

export interface ItemFlingEffect {
  id: number;
  name: string;
  effect_entries: { effect: string; language: NamedAPIResource }[];
  items: NamedAPIResource[];
}

import { NamedAPIResource } from "./pokemon";

export interface TypeRelations {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
}

export interface PokemonType {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: {
    damage_relations: TypeRelations;
    generation: NamedAPIResource;
  }[];
  game_indices: { game_index: number; generation: NamedAPIResource }[];
  generation: NamedAPIResource;
  move_damage_class: NamedAPIResource | null;
  names: { name: string; language: NamedAPIResource }[];
  pokemon: { slot: number; pokemon: NamedAPIResource }[];
  moves: NamedAPIResource[];
}

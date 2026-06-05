import { APIResource, NamedAPIResource } from "./pokemon";

export interface MoveFlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  contest_combos: {
    normal: {
      use_before: NamedAPIResource[] | null;
      use_after: NamedAPIResource[] | null;
    };
    super: {
      use_before: NamedAPIResource[] | null;
      use_after: NamedAPIResource[] | null;
    };
  } | null;
  contest_type: NamedAPIResource | null;
  contest_effect: APIResource | null;
  damage_class: NamedAPIResource;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
  }[];
  effect_changes: {
    effect_entries: { effect: string; language: NamedAPIResource }[];
    version_group: NamedAPIResource;
  }[];
  learned_by_pokemon: NamedAPIResource[];
  flavor_text_entries: MoveFlavorText[];
  generation: NamedAPIResource;
  machines: { machine: APIResource; version_group: NamedAPIResource }[];
  meta: {
    ailment: NamedAPIResource;
    category: NamedAPIResource;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
  } | null;
  names: { name: string; language: NamedAPIResource }[];
  past_values: {
    accuracy: number | null;
    effect_chance: number | null;
    power: number | null;
    pp: number | null;
    effect_entries: {
      effect: string;
      short_effect: string;
      language: NamedAPIResource;
    }[];
    type: NamedAPIResource | null;
    version_group: NamedAPIResource;
  }[];
  stat_changes: { change: number; stat: NamedAPIResource }[];
  super_contest_effect: APIResource | null;
  target: NamedAPIResource;
  type: NamedAPIResource;
}

export interface MoveBattleStyle {
  id: number;
  name: string;
  names: { name: string; language: NamedAPIResource }[];
}

export interface MoveCategory {
  id: number;
  name: string;
  moves: NamedAPIResource[];
  descriptions: { description: string; language: NamedAPIResource }[];
}

export interface MoveDamageClass {
  id: number;
  name: string;
  descriptions: { description: string; language: NamedAPIResource }[];
  moves: NamedAPIResource[];
  names: { name: string; language: NamedAPIResource }[];
}

export interface MoveLearnMethod {
  id: number;
  name: string;
  descriptions: { description: string; language: NamedAPIResource }[];
  names: { name: string; language: NamedAPIResource }[];
  version_groups: NamedAPIResource[];
}

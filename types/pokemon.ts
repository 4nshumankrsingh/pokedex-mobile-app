export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    home: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      front_default: string | null;
      back_default: string | null;
    };
  };
}

// ---------- Pokemon ----------

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  held_items: PokemonHeldItem[];
  moves: PokemonMove[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: {
    generation: NamedAPIResource;
    types: PokemonType[];
  }[];
}

// ---------- Pokemon Species ----------

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: {
    entry_number: number;
    pokedex: NamedAPIResource;
  }[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource | null;
  evolution_chain: APIResource;
  habitat: NamedAPIResource | null;
  generation: NamedAPIResource;
  names: { name: string; language: NamedAPIResource }[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: { description: string; language: NamedAPIResource }[];
  genera: Genus[];
  varieties: { is_default: boolean; pokemon: NamedAPIResource }[];
}

// ---------- Encounters ----------

export interface LocationAreaEncounter {
  location_area: NamedAPIResource;
  version_details: {
    max_chance: number;
    version: NamedAPIResource;
    encounter_details: {
      min_level: number;
      max_level: number;
      chance: number;
      condition_values: NamedAPIResource[];
      method: NamedAPIResource;
    }[];
  }[];
}

// ---------- Pokemon Form ----------

export interface PokemonForm {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: NamedAPIResource;
  types: PokemonType[];
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
  };
  version_group: NamedAPIResource;
  names: { name: string; language: NamedAPIResource }[];
  form_names: { name: string; language: NamedAPIResource }[];
}

// ---------- Pokemon Habitat ----------

export interface PokemonHabitat {
  id: number;
  name: string;
  names: { name: string; language: NamedAPIResource }[];
  pokemon_species: NamedAPIResource[];
}

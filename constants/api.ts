const BASE_URL = "https://pokeapi.co/api/v2";

export const ApiEndpoints = {
  // Pokemon
  pokemon: (idOrName: string | number) => `${BASE_URL}/pokemon/${idOrName}/`,
  pokemonEncounters: (idOrName: string | number) =>
    `${BASE_URL}/pokemon/${idOrName}/encounters`,
  pokemonForm: (idOrName: string | number) =>
    `${BASE_URL}/pokemon-form/${idOrName}/`,
  pokemonHabitat: (idOrName: string | number) =>
    `${BASE_URL}/pokemon-habitat/${idOrName}/`,
  pokemonSpecies: (idOrName: string | number) =>
    `${BASE_URL}/pokemon-species/${idOrName}/`,
  pokemonList: (limit = 20, offset = 0) =>
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,

  // Evolution
  evolutionChain: (id: number) => `${BASE_URL}/evolution-chain/${id}/`,
  evolutionTrigger: (idOrName: string | number) =>
    `${BASE_URL}/evolution-trigger/${idOrName}/`,

  // Moves
  move: (idOrName: string | number) => `${BASE_URL}/move/${idOrName}/`,
  moveBattleStyle: (idOrName: string | number) =>
    `${BASE_URL}/move-battle-style/${idOrName}/`,
  moveCategory: (idOrName: string | number) =>
    `${BASE_URL}/move-category/${idOrName}/`,
  moveDamageClass: (idOrName: string | number) =>
    `${BASE_URL}/move-damage-class/${idOrName}/`,
  moveLearnMethod: (idOrName: string | number) =>
    `${BASE_URL}/move-learn-method/${idOrName}/`,

  // Types & Abilities
  type: (idOrName: string | number) => `${BASE_URL}/type/${idOrName}/`,
  ability: (idOrName: string | number) => `${BASE_URL}/ability/${idOrName}/`,

  // Stats & Growth
  stat: (idOrName: string | number) => `${BASE_URL}/stat/${idOrName}/`,
  characteristic: (id: number) => `${BASE_URL}/characteristic/${id}/`,
  growthRate: (idOrName: string | number) =>
    `${BASE_URL}/growth-rate/${idOrName}/`,
  nature: (idOrName: string | number) => `${BASE_URL}/nature/${idOrName}/`,
  pokeathlonStat: (idOrName: string | number) =>
    `${BASE_URL}/pokeathlon-stat/${idOrName}/`,

  // Items
  item: (idOrName: string | number) => `${BASE_URL}/item/${idOrName}/`,
  itemFlingEffect: (idOrName: string | number) =>
    `${BASE_URL}/item-fling-effect/${idOrName}/`,

  // World
  generation: (idOrName: string | number) =>
    `${BASE_URL}/generation/${idOrName}/`,
  pokedex: (idOrName: string | number) => `${BASE_URL}/pokedex/${idOrName}/`,
  version: (idOrName: string | number) => `${BASE_URL}/version/${idOrName}/`,
  versionGroup: (idOrName: string | number) =>
    `${BASE_URL}/version-group/${idOrName}/`,
  region: (idOrName: string | number) => `${BASE_URL}/region/${idOrName}/`,
  machine: (id: number) => `${BASE_URL}/machine/${id}/`,

  // Contest
  contestEffect: (id: number) => `${BASE_URL}/contest-effect/${id}/`,
  superContestEffect: (id: number) => `${BASE_URL}/super-contest-effect/${id}/`,

  // Encounters
  encounterMethod: (idOrName: string | number) =>
    `${BASE_URL}/encounter-method/${idOrName}/`,
  encounterCondition: (idOrName: string | number) =>
    `${BASE_URL}/encounter-condition/${idOrName}/`,
};

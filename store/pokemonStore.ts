import { create } from "zustand";

interface PokemonStore {
  selectedPokemonId: string | number | null;
  setSelectedPokemonId: (id: string | number) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedPokemonId: null,
  setSelectedPokemonId: (id) => set({ selectedPokemonId: id }),
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),
}));

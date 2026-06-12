import PokemonDisplay from "@/components/pokemon/PokemonDisplay";
import PokemonSearch from "@/components/pokemon/PokemonSearch";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PokedexTab() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <PokemonSearch />
      <PokemonDisplay />
    </View>
  );
}

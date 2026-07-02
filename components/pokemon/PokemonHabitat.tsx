import { usePokemonSpecies } from "@/hooks/usePokemon";
import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

const HABITAT_COLORS: Record<string, string> = {
  cave: "#A88A1D",
  forest: "#36A832",
  grassland: "#8C9B2E",
  mountain: "#9099A8",
  rare: "#7C2EE0",
  "rough-terrain": "#E0B82E",
  sea: "#3B5FE0",
  urban: "#9CA3AF",
  "waters-edge": "#5CE0E0",
};

export default function PokemonHabitat({
  speciesName,
}: {
  speciesName: string;
}) {
  const { data: species } = usePokemonSpecies(speciesName);

  const habitat = species?.habitat;
  if (!habitat) return null;

  const color = HABITAT_COLORS[habitat.name] ?? "#9CA3AF";

  return (
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
        >
          HABITAT
        </Text>
        <View
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </View>

      <View className="flex-row items-center gap-3">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center border"
          style={{ backgroundColor: color + "22", borderColor: color }}
        >
          <MapPin size={18} color={color} strokeWidth={1.8} />
        </View>
        <Text
          className="text-base capitalize"
          style={{ fontFamily: "RobotoMono_600SemiBold", color: "#D1D5DB" }}
        >
          {habitat.name.replace(/-/g, " ")}
        </Text>
      </View>
    </View>
  );
}

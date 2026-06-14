import { usePokemonStore } from "@/store/pokemonStore";
import * as Haptics from "expo-haptics";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const MAX_POKEMON = 1025;

export default function PokemonNavigation({
  currentId,
}: {
  currentId: number;
}) {
  const { setSelectedPokemonId } = usePokemonStore();

  const hasPrev = currentId > 1;
  const hasNext = currentId < MAX_POKEMON;

  const navigate = (id: number) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPokemonId(id);
  };

  return (
    <View className="mx-4 mt-3 mb-2 flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => hasPrev && navigate(currentId - 1)}
        disabled={!hasPrev}
        className={`flex-row items-center gap-1 px-4 py-2 rounded-xl border ${
          hasPrev
            ? "border-pokedex-border bg-bg-input"
            : "border-pokedex-border/30 bg-bg-input/30"
        }`}
      >
        <ChevronLeft
          size={16}
          color={hasPrev ? "#A0A0B0" : "#606070"}
          strokeWidth={1.8}
        />
        <Text
          className="text-xs"
          style={{
            fontFamily: "ShareTechMono",
            color: hasPrev ? "#A0A0B0" : "#606070",
          }}
        >
          #{String(currentId - 1).padStart(3, "0")}
        </Text>
      </TouchableOpacity>

      <Text
        className="text-xs tracking-widest"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        #{String(currentId).padStart(4, "0")}
      </Text>

      <TouchableOpacity
        onPress={() => hasNext && navigate(currentId + 1)}
        disabled={!hasNext}
        className={`flex-row items-center gap-1 px-4 py-2 rounded-xl border ${
          hasNext
            ? "border-pokedex-border bg-bg-input"
            : "border-pokedex-border/30 bg-bg-input/30"
        }`}
      >
        <Text
          className="text-xs"
          style={{
            fontFamily: "ShareTechMono",
            color: hasNext ? "#A0A0B0" : "#606070",
          }}
        >
          #{String(currentId + 1).padStart(3, "0")}
        </Text>
        <ChevronRight
          size={16}
          color={hasNext ? "#A0A0B0" : "#606070"}
          strokeWidth={1.8}
        />
      </TouchableOpacity>
    </View>
  );
}

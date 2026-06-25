import { useAbility } from "@/hooks/usePokemon";
import { PokemonAbility } from "@/types/pokemon";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function AbilityRow({
  ability,
  isHidden,
}: {
  ability: PokemonAbility;
  isHidden: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const { data } = useAbility(ability.ability.name);

  const englishEffect =
    data?.effect_entries?.find((e) => e.language.name === "en")?.short_effect ??
    "";

  return (
    <TouchableOpacity
      onPress={() => setExpanded((v) => !v)}
      activeOpacity={0.7}
      className="p-3 rounded-xl border border-pokedex-border bg-bg-input mb-2"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {isHidden ? (
            <EyeOff size={14} color="#FFCC33" strokeWidth={1.8} />
          ) : (
            <Eye size={14} color="#4C7DF0" strokeWidth={1.8} />
          )}
          <Text
            className="text-white text-xs capitalize"
            style={{ fontFamily: "RobotoMono_400Regular" }}
          >
            {ability.ability.name.replace(/-/g, " ")}
          </Text>
        </View>
        {isHidden && (
          <View className="bg-pokedex-border rounded-full px-2 py-0.5">
            <Text
              className="text-xs"
              style={{ fontFamily: "Orbitron", color: "#9CA3AF" }}
            >
              HIDDEN
            </Text>
          </View>
        )}
      </View>
      {expanded && englishEffect ? (
        <Text
          className="text-xs mt-2 leading-5"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#9CA3AF" }}
        >
          {englishEffect}
        </Text>
      ) : null}
      {!englishEffect && expanded ? (
        <Text
          className="text-xs mt-2"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          No description available.
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

export default function PokemonAbilities({
  abilities,
}: {
  abilities: PokemonAbility[];
}) {
  const normalCount = abilities.filter((a) => !a.is_hidden).length;
  const hiddenCount = abilities.filter((a) => a.is_hidden).length;

  return (
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
        >
          ABILITIES
        </Text>
        <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
      </View>

      {abilities.map((a) => (
        <AbilityRow key={a.ability.name} ability={a} isHidden={a.is_hidden} />
      ))}

      <Text
        className="text-xs text-center mt-1"
        style={{ fontFamily: "Orbitron", color: "#6B7280" }}
      >
        {normalCount} NORMAL · {hiddenCount} HIDDEN
      </Text>
    </View>
  );
}

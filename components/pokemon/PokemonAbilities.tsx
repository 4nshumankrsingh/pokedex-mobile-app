import { useAbility } from "@/hooks/usePokemon";
import { PokemonAbility } from "@/types/pokemon";
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
      className={`p-3 rounded-xl border mb-2 ${
        isHidden
          ? "border-pokedex-border bg-pokedex-panel"
          : "border-pokedex-border bg-bg-input"
      }`}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-white text-xs capitalize"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          {ability.ability.name.replace("-", " ")}
        </Text>
        {isHidden && (
          <View className="bg-pokedex-border rounded-full px-2 py-0.5">
            <Text
              className="text-xs"
              style={{ fontFamily: "ShareTechMono", color: "#606070" }}
            >
              HIDDEN
            </Text>
          </View>
        )}
      </View>
      {expanded && englishEffect ? (
        <Text
          className="text-xs mt-2 leading-5"
          style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
        >
          {englishEffect}
        </Text>
      ) : null}
      {!englishEffect && expanded ? (
        <Text
          className="text-xs mt-2"
          style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
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
  return (
    <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
      <Text
        className="text-xs tracking-widest mb-3"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        ABILITIES
      </Text>
      <Text
        className="text-xs mb-3"
        style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
      >
        Tap an ability to see its effect.
      </Text>
      {abilities.map((a) => (
        <AbilityRow key={a.ability.name} ability={a} isHidden={a.is_hidden} />
      ))}
    </View>
  );
}

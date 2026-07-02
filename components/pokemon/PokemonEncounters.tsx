import { usePokemonEncounters } from "@/hooks/usePokemon";
import { ActivityIndicator, Text, View } from "react-native";

export default function PokemonEncounters({
  pokemonName,
}: {
  pokemonName: string;
}) {
  const { data, isLoading, isError } = usePokemonEncounters(pokemonName);

  if (isLoading) {
    return (
      <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border items-center">
        <ActivityIndicator color="#4C7DF0" size="small" />
      </View>
    );
  }

  if (isError || !data) return null;
  if (data.length === 0) return null;

  return (
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-4">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
        >
          ENCOUNTER LOCATIONS
        </Text>
        <View className="w-2 h-2 rounded-full bg-pokedex-green" />
      </View>

      {data.map((encounter, i) => {
        const locationName = encounter.location_area.name.replace(/-/g, " ");

        const methods = encounter.version_details.flatMap((vd) =>
          vd.encounter_details.map((ed) => ed.method.name.replace(/-/g, " ")),
        );
        const uniqueMethods = [...new Set(methods)];

        const versions = encounter.version_details.map((vd) =>
          vd.version.name.replace(/-/g, " "),
        );
        const uniqueVersions = [...new Set(versions)];

        const maxChance = Math.max(
          ...encounter.version_details.map((vd) => vd.max_chance),
        );

        return (
          <View
            key={encounter.location_area.name}
            className={`py-3 ${
              i < data.length - 1 ? "border-b border-pokedex-border" : ""
            }`}
          >
            <Text
              className="text-sm capitalize mb-1"
              style={{ fontFamily: "RobotoMono_600SemiBold", color: "#D1D5DB" }}
            >
              {locationName}
            </Text>

            <View className="flex-row flex-wrap gap-x-4 gap-y-1 mt-1">
              {uniqueMethods.length > 0 && (
                <View className="flex-row items-center gap-1">
                  <Text
                    className="text-xs"
                    style={{ fontFamily: "Orbitron", color: "#6B7280" }}
                  >
                    VIA
                  </Text>
                  <Text
                    className="text-xs capitalize"
                    style={{
                      fontFamily: "RobotoMono_400Regular",
                      color: "#9CA3AF",
                    }}
                  >
                    {uniqueMethods.join(", ")}
                  </Text>
                </View>
              )}

              {maxChance > 0 && (
                <View className="flex-row items-center gap-1">
                  <Text
                    className="text-xs"
                    style={{ fontFamily: "Orbitron", color: "#6B7280" }}
                  >
                    CHANCE
                  </Text>
                  <Text
                    className="text-xs"
                    style={{
                      fontFamily: "RobotoMono_400Regular",
                      color: "#9CA3AF",
                    }}
                  >
                    {maxChance}%
                  </Text>
                </View>
              )}
            </View>

            {uniqueVersions.length > 0 && (
              <View className="flex-row flex-wrap gap-1 mt-2">
                {uniqueVersions.map((v) => (
                  <View
                    key={v}
                    className="bg-bg-input border border-pokedex-border rounded-full px-2 py-0.5"
                  >
                    <Text
                      className="text-xs capitalize"
                      style={{ fontFamily: "Orbitron", color: "#6B7280" }}
                    >
                      {v}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

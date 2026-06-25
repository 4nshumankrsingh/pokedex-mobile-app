import { FlavorTextEntry } from "@/types/pokemon";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function cleanFlavorText(text: string) {
  return text.replace(/\f|\n/g, " ").replace(/\s+/g, " ").trim();
}

export default function PokemonDescription({
  entries,
}: {
  entries: FlavorTextEntry[];
}) {
  const englishEntries = entries.filter((e) => e.language.name === "en");

  const versions = Array.from(
    new Map(englishEntries.map((e) => [e.version.name, e])).values(),
  );

  const [selectedVersion, setSelectedVersion] = useState(
    versions[versions.length - 1]?.version.name ?? "",
  );

  const currentEntry = versions.find((v) => v.version.name === selectedVersion);

  if (!versions.length) return null;

  return (
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
        >
          POKÉDEX ENTRY
        </Text>
        <View className="w-2 h-2 rounded-full bg-pokedex-green" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-3"
      >
        <View className="flex-row gap-2">
          {versions.map((v) => {
            const isSelected = v.version.name === selectedVersion;
            return (
              <TouchableOpacity
                key={v.version.name}
                onPress={() => setSelectedVersion(v.version.name)}
                className={`px-3 py-1 rounded-full border ${
                  isSelected
                    ? "border-pokedex-blue bg-pokedex-blue/20"
                    : "border-pokedex-border bg-bg-input"
                }`}
              >
                <Text
                  className="text-xs capitalize"
                  style={{
                    fontFamily: "Orbitron_500Medium",
                    color: isSelected ? "#4C7DF0" : "#6B7280",
                  }}
                >
                  {v.version.name.replace(/-/g, " ")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {currentEntry ? (
        <Text
          className="text-sm leading-6"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#D1D5DB" }}
        >
          {cleanFlavorText(currentEntry.flavor_text)}
        </Text>
      ) : null}
    </View>
  );
}

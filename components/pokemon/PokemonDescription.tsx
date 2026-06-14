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
    <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
      <Text
        className="text-xs tracking-widest mb-3"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        DESCRIPTION
      </Text>

      {/* Version selector */}
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
                    ? "border-pokedex-red bg-pokedex-red/20"
                    : "border-pokedex-border bg-bg-input"
                }`}
              >
                <Text
                  className="text-xs capitalize"
                  style={{
                    fontFamily: "ShareTechMono",
                    color: isSelected ? "#CC0000" : "#606070",
                  }}
                >
                  {v.version.name.replace("-", " ")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {currentEntry ? (
        <Text
          className="text-sm leading-6"
          style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
        >
          {cleanFlavorText(currentEntry.flavor_text)}
        </Text>
      ) : null}
    </View>
  );
}

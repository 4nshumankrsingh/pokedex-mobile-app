import { useGeneration } from "@/hooks/usePokemon";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAGE_SIZE = 20;

function extractId(url: string) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function GenerationDetailScreen() {
  const { generation } = useLocalSearchParams<{ generation: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGeneration(generation);

  const species = data?.pokemon_species ?? [];
  const totalPages = Math.ceil(species.length / PAGE_SIZE);
  const visibleSpecies = species.slice(0, page * PAGE_SIZE);

  const handlePress = (name: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/types/pokemon/${name}`);
  };

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-3 px-4 pt-4 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-xl border border-pokedex-border bg-bg-input"
        >
          <ChevronLeft size={18} color="#9CA3AF" strokeWidth={1.8} />
        </TouchableOpacity>
        <Text
          className="text-white text-base capitalize"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          {generation.replace(/-/g, " ")}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#4C7DF0" size="large" />
        </View>
      ) : isError || !data ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text
            className="text-pokedex-red text-sm"
            style={{ fontFamily: "Orbitron_700Bold" }}
          >
            FAILED TO LOAD
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 16,
          }}
        >
          {/* Info block */}
          <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                MAIN REGION
              </Text>
              <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
            </View>
            <Text
              className="text-sm capitalize"
              style={{ fontFamily: "RobotoMono_400Regular", color: "#D1D5DB" }}
            >
              {data.main_region?.name?.replace(/-/g, " ") ?? "—"}
            </Text>
          </View>

          {/* Species list */}
          <View className="bg-screen-bg rounded-2xl border border-pokedex-border overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-pokedex-border">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                POKÉMON
              </Text>
              <Text
                className="text-xs"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#6B7280",
                }}
              >
                {species.length} total
              </Text>
            </View>

            {visibleSpecies.map((s, i) => {
              const id = extractId(s.url);
              return (
                <TouchableOpacity
                  key={s.name}
                  onPress={() => handlePress(s.name)}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    i < visibleSpecies.length - 1
                      ? "border-b border-pokedex-border"
                      : ""
                  }`}
                >
                  <Text
                    className="text-sm capitalize"
                    style={{
                      fontFamily: "RobotoMono_400Regular",
                      color: "#D1D5DB",
                    }}
                  >
                    {s.name.replace(/-/g, " ")}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ fontFamily: "Orbitron", color: "#6B7280" }}
                  >
                    #{id.padStart(4, "0")}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {page < totalPages && (
              <TouchableOpacity
                onPress={() => setPage((p) => p + 1)}
                className="py-3 items-center border-t border-pokedex-border bg-bg-input"
              >
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_500Medium", color: "#9CA3AF" }}
                >
                  LOAD MORE
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

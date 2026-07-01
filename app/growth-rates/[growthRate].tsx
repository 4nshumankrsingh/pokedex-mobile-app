import { useGrowthRate } from "@/hooks/usePokemon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAGE_SIZE = 20;

export default function GrowthRateDetailScreen() {
  const { growthRate } = useLocalSearchParams<{ growthRate: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGrowthRate(growthRate);

  const species = data?.pokemon_species ?? [];
  const totalPages = Math.ceil(species.length / PAGE_SIZE);
  const visibleSpecies = species.slice(0, page * PAGE_SIZE);

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
          {growthRate.replace(/-/g, " ").toUpperCase()}
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
          {/* Formula */}
          {data.formula ? (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
              <Text
                className="text-xs mb-2"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                FORMULA
              </Text>
              <Text
                className="text-sm leading-6"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {data.formula}
              </Text>
            </View>
          ) : null}

          {/* Level XP table */}
          {data.levels?.length > 0 && (
            <View className="bg-screen-bg rounded-2xl border border-pokedex-border overflow-hidden mb-4">
              <View className="flex-row px-4 py-3 border-b border-pokedex-border">
                <Text
                  className="flex-1 text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  LEVEL
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  EXPERIENCE
                </Text>
              </View>
              {data.levels.map((lvl, i) => (
                <View
                  key={lvl.level}
                  className={`flex-row px-4 py-2.5 ${
                    i < data.levels.length - 1
                      ? "border-b border-pokedex-border"
                      : ""
                  }`}
                >
                  <Text
                    className="flex-1 text-sm"
                    style={{
                      fontFamily: "RobotoMono_400Regular",
                      color: "#D1D5DB",
                    }}
                  >
                    {lvl.level}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      fontFamily: "RobotoMono_400Regular",
                      color: "#9CA3AF",
                    }}
                  >
                    {lvl.experience.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          )}

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
            {visibleSpecies.map((s, i) => (
              <View
                key={s.name}
                className={`px-4 py-3 ${
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
              </View>
            ))}
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

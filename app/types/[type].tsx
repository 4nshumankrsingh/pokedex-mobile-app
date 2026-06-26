import { TypeColors } from "@/constants/colors";
import { useType } from "@/hooks/usePokemon";
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

function DamageSection({
  label,
  types,
  multiplier,
}: {
  label: string;
  types: { name: string; url: string }[];
  multiplier: string;
}) {
  if (!types.length) return null;
  return (
    <View className="mb-4">
      <View className="flex-row items-center gap-2 mb-2">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_500Medium", color: "#6B7280" }}
        >
          {label}
        </Text>
        <View className="bg-bg-input border border-pokedex-border rounded-full px-2 py-0.5">
          <Text
            className="text-xs"
            style={{ fontFamily: "RobotoMono_400Regular", color: "#9CA3AF" }}
          >
            {multiplier}
          </Text>
        </View>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {types.map((t) => {
          const color = TypeColors[t.name] ?? "#8E9B92";
          return (
            <View
              key={t.name}
              className="rounded-full px-3 py-1"
              style={{
                backgroundColor: color + "33",
                borderWidth: 1,
                borderColor: color,
              }}
            >
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_500Medium", color }}
              >
                {t.name.toUpperCase()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function TypeDetailScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useType(type);
  const color = TypeColors[type] ?? "#8E9B92";

  const allPokemon = data?.pokemon ?? [];
  const totalPages = Math.ceil(allPokemon.length / PAGE_SIZE);
  const visiblePokemon = allPokemon.slice(0, page * PAGE_SIZE);

  const handlePokemonPress = (name: string) => {
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
        <View
          className="rounded-full px-4 py-1.5"
          style={{
            backgroundColor: color + "33",
            borderWidth: 1,
            borderColor: color,
          }}
        >
          <Text
            className="text-sm"
            style={{ fontFamily: "Orbitron_700Bold", color }}
          >
            {type.toUpperCase()}
          </Text>
        </View>
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
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        >
          <View className="mx-4 mt-2 p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                DAMAGE RELATIONS
              </Text>
              <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
            </View>

            <Text
              className="text-xs mb-3"
              style={{ fontFamily: "Orbitron_500Medium", color: "#D1D5DB" }}
            >
              ATTACKING
            </Text>
            <DamageSection
              label="SUPER EFFECTIVE"
              types={data.damage_relations.double_damage_to}
              multiplier="2×"
            />
            <DamageSection
              label="NOT VERY EFFECTIVE"
              types={data.damage_relations.half_damage_to}
              multiplier="0.5×"
            />
            <DamageSection
              label="NO EFFECT"
              types={data.damage_relations.no_damage_to}
              multiplier="0×"
            />

            <View className="h-px bg-pokedex-border my-3" />

            <Text
              className="text-xs mb-3"
              style={{ fontFamily: "Orbitron_500Medium", color: "#D1D5DB" }}
            >
              DEFENDING
            </Text>
            <DamageSection
              label="WEAK TO"
              types={data.damage_relations.double_damage_from}
              multiplier="2×"
            />
            <DamageSection
              label="RESISTANT TO"
              types={data.damage_relations.half_damage_from}
              multiplier="0.5×"
            />
            <DamageSection
              label="IMMUNE TO"
              types={data.damage_relations.no_damage_from}
              multiplier="0×"
            />
          </View>

          <View className="mx-4 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
            <View className="flex-row items-center justify-between mb-3">
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
                {allPokemon.length} total
              </Text>
            </View>

            {visiblePokemon.map((entry, i) => {
              const id = extractId(entry.pokemon.url);
              return (
                <TouchableOpacity
                  key={entry.pokemon.name}
                  onPress={() => handlePokemonPress(entry.pokemon.name)}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between py-3 px-1 ${
                    i < visiblePokemon.length - 1
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
                    {entry.pokemon.name.replace(/-/g, " ")}
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
                className="mt-4 py-3 rounded-xl border border-pokedex-border bg-bg-input items-center"
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

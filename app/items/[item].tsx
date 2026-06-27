import { getItemSpriteUrl } from "@/hooks/useItemSearch";
import { useItem } from "@/hooks/usePokemon";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-2.5 border-b border-pokedex-border">
      <Text
        className="text-xs"
        style={{ fontFamily: "Orbitron", color: "#6B7280" }}
      >
        {label}
      </Text>
      <Text
        className="text-sm capitalize"
        style={{ fontFamily: "RobotoMono_400Regular", color: "#D1D5DB" }}
      >
        {value}
      </Text>
    </View>
  );
}

export default function ItemDetailScreen() {
  const { item: itemName } = useLocalSearchParams<{ item: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: item, isLoading, isError } = useItem(itemName);

  const englishEffect =
    item?.effect_entries?.find((e) => e.language.name === "en")?.short_effect ??
    "";

  const englishFlavorText =
    item?.flavor_text_entries?.find((e) => e.language.name === "en")?.text ??
    "";

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
          className="text-white text-base capitalize flex-1"
          style={{ fontFamily: "Orbitron_700Bold" }}
          numberOfLines={1}
        >
          {itemName.replace(/-/g, " ").toUpperCase()}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#4C7DF0" size="large" />
          <Text
            className="text-xs mt-4"
            style={{ fontFamily: "Orbitron_500Medium", color: "#9CA3AF" }}
          >
            LOADING DATA...
          </Text>
        </View>
      ) : isError || !item ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text
            className="text-pokedex-red text-sm mb-2"
            style={{ fontFamily: "Orbitron_700Bold" }}
          >
            NOT FOUND
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        >
          {/* Identity block */}
          <View className="items-center px-4 pt-6 pb-6 bg-screen-bg mx-4 rounded-2xl border border-pokedex-border mt-2">
            <Image
              source={{
                uri: item.sprites?.default ?? getItemSpriteUrl(itemName),
              }}
              style={{ width: 64, height: 64 }}
              contentFit="contain"
            />
            <Text
              className="text-white text-xl capitalize mt-3"
              style={{ fontFamily: "Orbitron_900Black" }}
            >
              {item.name.replace(/-/g, " ")}
            </Text>
            {item.category?.name ? (
              <View className="bg-bg-input border border-pokedex-border rounded-full px-3 py-1 mt-2">
                <Text
                  className="text-xs capitalize"
                  style={{ fontFamily: "Orbitron_500Medium", color: "#9CA3AF" }}
                >
                  {item.category.name.replace(/-/g, " ")}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Stats */}
          <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                DETAILS
              </Text>
              <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
            </View>
            <StatRow label="COST" value={`${item.cost ?? 0}₽`} />
            <StatRow
              label="FLING POWER"
              value={item.fling_power != null ? String(item.fling_power) : "—"}
            />
            <StatRow
              label="FLING EFFECT"
              value={item.fling_effect?.name?.replace(/-/g, " ") ?? "—"}
            />
          </View>

          {/* Effect */}
          {englishEffect && (
            <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs mb-3"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                EFFECT
              </Text>
              <Text
                className="text-sm leading-6"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {englishEffect}
              </Text>
            </View>
          )}

          {/* Flavor text */}
          {englishFlavorText ? (
            <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs mb-3"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                DESCRIPTION
              </Text>
              <Text
                className="text-sm leading-6"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {englishFlavorText.replace(/\f|\n/g, " ").trim()}
              </Text>
            </View>
          ) : null}

          {/* Held by Pokémon */}
          {item.held_by_pokemon?.length > 0 && (
            <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  HELD BY
                </Text>
                <Text
                  className="text-xs"
                  style={{
                    fontFamily: "RobotoMono_400Regular",
                    color: "#6B7280",
                  }}
                >
                  {item.held_by_pokemon.length} Pokémon
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {item.held_by_pokemon.map((p) => (
                  <View
                    key={p.pokemon.name}
                    className="bg-bg-input border border-pokedex-border rounded-lg px-3 py-1.5"
                  >
                    <Text
                      className="text-xs capitalize"
                      style={{
                        fontFamily: "RobotoMono_400Regular",
                        color: "#D1D5DB",
                      }}
                    >
                      {p.pokemon.name.replace(/-/g, " ")}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

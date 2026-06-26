import { TypeColors } from "@/constants/colors";
import { useMachineDetails } from "@/hooks/useMachineDetails";
import { useMove } from "@/hooks/usePokemon";
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

const DAMAGE_CLASS_COLORS: Record<string, string> = {
  physical: "#E8772E",
  special: "#3B5FE0",
  status: "#9CA3AF",
};

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
        className="text-sm"
        style={{ fontFamily: "RobotoMono_400Regular", color: "#D1D5DB" }}
      >
        {value}
      </Text>
    </View>
  );
}

export default function MoveDetailScreen() {
  const { move: moveName } = useLocalSearchParams<{ move: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: move, isLoading, isError } = useMove(moveName);
  const typeColor = move?.type?.name
    ? (TypeColors[move.type.name] ?? "#9CA3AF")
    : "#9CA3AF";

  const machineUrls = move?.machines?.map((m) => m.machine.url) ?? [];
  const { machines: machineDetails, isLoading: machinesLoading } =
    useMachineDetails(machineUrls);

  const englishEffect = move?.effect_entries?.find(
    (e) => e.language.name === "en",
  );

  const englishFlavorText =
    move?.flavor_text_entries
      ?.filter((e) => e.language.name === "en")
      ?.slice(-1)[0]?.flavor_text ?? "";

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
          {moveName.replace(/-/g, " ").toUpperCase()}
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
      ) : isError || !move ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text
            className="text-pokedex-red text-sm mb-2"
            style={{ fontFamily: "Orbitron_700Bold" }}
          >
            NOT FOUND
          </Text>
          <Text
            className="text-center text-xs"
            style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
          >
            Could not load move data.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        >
          <View className="mx-4 mt-2 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
            <View className="flex-row items-center gap-3 mb-4">
              <View
                className="rounded-full px-3 py-1"
                style={{
                  backgroundColor: typeColor + "33",
                  borderWidth: 1,
                  borderColor: typeColor,
                }}
              >
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_500Medium", color: typeColor }}
                >
                  {move.type.name.toUpperCase()}
                </Text>
              </View>

              {move.damage_class && (
                <View className="rounded-full px-3 py-1 border border-pokedex-border bg-bg-input">
                  <Text
                    className="text-xs"
                    style={{
                      fontFamily: "Orbitron_500Medium",
                      color:
                        DAMAGE_CLASS_COLORS[move.damage_class.name] ??
                        "#9CA3AF",
                    }}
                  >
                    {move.damage_class.name.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <StatRow
              label="POWER"
              value={move.power != null ? String(move.power) : "—"}
            />
            <StatRow
              label="ACCURACY"
              value={move.accuracy != null ? `${move.accuracy}%` : "—"}
            />
            <StatRow
              label="PP"
              value={move.pp != null ? String(move.pp) : "—"}
            />
            <StatRow
              label="PRIORITY"
              value={move.priority != null ? String(move.priority) : "0"}
            />
            <StatRow
              label="TARGET"
              value={move.target?.name?.replace(/-/g, " ") ?? "—"}
            />
            <StatRow
              label="GENERATION"
              value={move.generation?.name?.replace(/-/g, " ") ?? "—"}
            />
            {move.effect_chance != null && (
              <StatRow label="EFFECT CHANCE" value={`${move.effect_chance}%`} />
            )}
          </View>

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
                {englishEffect.effect.replace(
                  /\$effect_chance/g,
                  `${move.effect_chance ?? "—"}%`,
                )}
              </Text>
            </View>
          )}

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

          {move.meta && (
            <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs mb-3"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                BATTLE DATA
              </Text>
              <StatRow
                label="CATEGORY"
                value={move.meta.category?.name?.replace(/-/g, " ") ?? "—"}
              />
              <StatRow
                label="AILMENT"
                value={move.meta.ailment?.name?.replace(/-/g, " ") ?? "—"}
              />
              {move.meta.min_hits != null && (
                <StatRow
                  label="HITS"
                  value={
                    move.meta.min_hits === move.meta.max_hits
                      ? String(move.meta.min_hits)
                      : `${move.meta.min_hits}–${move.meta.max_hits}`
                  }
                />
              )}
              {move.meta.drain !== 0 && (
                <StatRow label="DRAIN" value={`${move.meta.drain}%`} />
              )}
              {move.meta.healing !== 0 && (
                <StatRow label="HEALING" value={`${move.meta.healing}%`} />
              )}
              {move.meta.crit_rate !== 0 && (
                <StatRow label="CRIT RATE" value={`+${move.meta.crit_rate}`} />
              )}
              {move.meta.ailment_chance !== 0 && (
                <StatRow
                  label="AILMENT CHANCE"
                  value={`${move.meta.ailment_chance}%`}
                />
              )}
              {move.meta.flinch_chance !== 0 && (
                <StatRow
                  label="FLINCH CHANCE"
                  value={`${move.meta.flinch_chance}%`}
                />
              )}
            </View>
          )}

          {machineUrls.length > 0 && (
            <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs mb-3"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                TM / HM
              </Text>
              {machinesLoading ? (
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_500Medium", color: "#6B7280" }}
                >
                  LOADING...
                </Text>
              ) : (
                machineDetails.map((m, i) => (
                  <View
                    key={i}
                    className={`flex-row items-center justify-between py-2.5 ${
                      i < machineDetails.length - 1
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
                      {m.item.name.toUpperCase()}
                    </Text>
                    <Text
                      className="text-xs"
                      style={{ fontFamily: "Orbitron", color: "#6B7280" }}
                    >
                      {m.versionGroup.replace(/-/g, " ")}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}

          {move.learned_by_pokemon?.length > 0 && (
            <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  LEARNED BY
                </Text>
                <Text
                  className="text-xs"
                  style={{
                    fontFamily: "RobotoMono_400Regular",
                    color: "#6B7280",
                  }}
                >
                  {move.learned_by_pokemon.length} Pokémon
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {move.learned_by_pokemon.map((p) => (
                  <View
                    key={p.name}
                    className="bg-bg-input border border-pokedex-border rounded-lg px-3 py-1.5"
                  >
                    <Text
                      className="text-xs capitalize"
                      style={{
                        fontFamily: "RobotoMono_400Regular",
                        color: "#D1D5DB",
                      }}
                    >
                      {p.name.replace(/-/g, " ")}
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

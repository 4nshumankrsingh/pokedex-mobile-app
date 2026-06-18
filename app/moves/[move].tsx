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
  physical: "#F5AC78",
  special: "#9DB7F5",
  status: "#A0A0B0",
};

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-2.5 border-b border-pokedex-border">
      <Text
        className="text-xs tracking-widest"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        {label}
      </Text>
      <Text
        className="text-sm"
        style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
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
    ? (TypeColors[move.type.name] ?? "#A0A0B0")
    : "#A0A0B0";

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
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 pt-4 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-xl border border-pokedex-border bg-bg-input"
        >
          <ChevronLeft size={18} color="#A0A0B0" strokeWidth={1.8} />
        </TouchableOpacity>
        <Text
          className="text-white text-base tracking-widest capitalize flex-1"
          style={{ fontFamily: "ShareTechMono" }}
          numberOfLines={1}
        >
          {moveName.replace(/-/g, " ").toUpperCase()}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#CC0000" size="large" />
          <Text
            className="text-xs tracking-widest mt-4"
            style={{ fontFamily: "ShareTechMono", color: "#606070" }}
          >
            LOADING...
          </Text>
        </View>
      ) : isError || !move ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text
            className="text-pokedex-red text-sm tracking-widest mb-2"
            style={{ fontFamily: "ShareTechMono" }}
          >
            NOT FOUND
          </Text>
          <Text
            className="text-center text-xs"
            style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
          >
            Could not load move data.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        >
          {/* Identity block */}
          <View className="mx-4 mt-2 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
            <View className="flex-row items-center gap-3 mb-4">
              {/* Type badge */}
              <View
                className="rounded-full px-3 py-1"
                style={{
                  backgroundColor: typeColor + "33",
                  borderWidth: 1,
                  borderColor: typeColor,
                }}
              >
                <Text
                  className="text-xs tracking-widest"
                  style={{ fontFamily: "ShareTechMono", color: typeColor }}
                >
                  {move.type.name.toUpperCase()}
                </Text>
              </View>

              {/* Damage class badge */}
              {move.damage_class && (
                <View className="rounded-full px-3 py-1 border border-pokedex-border bg-bg-input">
                  <Text
                    className="text-xs tracking-widest"
                    style={{
                      fontFamily: "ShareTechMono",
                      color:
                        DAMAGE_CLASS_COLORS[move.damage_class.name] ??
                        "#A0A0B0",
                    }}
                  >
                    {move.damage_class.name.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            {/* Core stats */}
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

          {/* Effect description */}
          {englishEffect && (
            <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs tracking-widest mb-3"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                EFFECT
              </Text>
              <Text
                className="text-sm leading-6"
                style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
              >
                {englishEffect.effect.replace(
                  /\$effect_chance/g,
                  `${move.effect_chance ?? "—"}%`,
                )}
              </Text>
            </View>
          )}

          {/* Flavor text */}
          {englishFlavorText ? (
            <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs tracking-widest mb-3"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                DESCRIPTION
              </Text>
              <Text
                className="text-sm leading-6"
                style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
              >
                {englishFlavorText.replace(/\f|\n/g, " ").trim()}
              </Text>
            </View>
          ) : null}

          {/* Move meta */}
          {move.meta && (
            <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs tracking-widest mb-3"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
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

          {/* Machines (TM/HM) */}
          {machineUrls.length > 0 && (
            <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs tracking-widest mb-3"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                TM / HM
              </Text>
              {machinesLoading ? (
                <Text
                  className="text-xs"
                  style={{ fontFamily: "ShareTechMono", color: "#606070" }}
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
                        fontFamily: "Nunito_400Regular",
                        color: "#A0A0B0",
                      }}
                    >
                      {m.item.name.toUpperCase()}
                    </Text>
                    <Text
                      className="text-xs"
                      style={{ fontFamily: "ShareTechMono", color: "#606070" }}
                    >
                      {m.versionGroup.replace(/-/g, " ")}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Learned by */}
          {move.learned_by_pokemon?.length > 0 && (
            <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-xs tracking-widest"
                  style={{ fontFamily: "ShareTechMono", color: "#606070" }}
                >
                  LEARNED BY
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "ShareTechMono", color: "#606070" }}
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
                        fontFamily: "Nunito_400Regular",
                        color: "#A0A0B0",
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

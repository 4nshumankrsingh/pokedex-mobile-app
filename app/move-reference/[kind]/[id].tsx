import {
    useMoveBattleStyle,
    useMoveCategory,
    useMoveDamageClass,
    useMoveLearnMethod,
} from "@/hooks/usePokemon";
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

type MoveRefKind =
  | "category"
  | "damage-class"
  | "battle-style"
  | "learn-method";

function useMoveRefData(kind: MoveRefKind, id: string) {
  const category = useMoveCategory(kind === "category" ? id : "");
  const damageClass = useMoveDamageClass(kind === "damage-class" ? id : "");
  const battleStyle = useMoveBattleStyle(kind === "battle-style" ? id : "");
  const learnMethod = useMoveLearnMethod(kind === "learn-method" ? id : "");

  if (kind === "category") return category;
  if (kind === "damage-class") return damageClass;
  if (kind === "battle-style") return battleStyle;
  return learnMethod;
}

const KIND_LABELS: Record<MoveRefKind, string> = {
  category: "MOVE CATEGORY",
  "damage-class": "DAMAGE CLASS",
  "battle-style": "BATTLE STYLE",
  "learn-method": "LEARN METHOD",
};

export default function MoveReferenceDetailScreen() {
  const { kind, id } = useLocalSearchParams<{ kind: string; id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError } = useMoveRefData(kind as MoveRefKind, id);

  const englishDescription =
    (data as any)?.descriptions?.find((d: any) => d.language.name === "en")
      ?.description ??
    (data as any)?.effect_entries?.find((e: any) => e.language.name === "en")
      ?.effect ??
    "";

  const moves: { name: string }[] = (data as any)?.moves ?? [];
  const versionGroups: { name: string }[] = (data as any)?.version_groups ?? [];

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-3 px-4 pt-4 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-xl border border-pokedex-border bg-bg-input"
        >
          <ChevronLeft size={18} color="#9CA3AF" strokeWidth={1.8} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text
            className="text-xs mb-0.5"
            style={{ fontFamily: "Orbitron", color: "#6B7280" }}
          >
            {KIND_LABELS[kind as MoveRefKind] ?? kind.toUpperCase()}
          </Text>
          <Text
            className="text-white text-base capitalize"
            style={{ fontFamily: "Orbitron_700Bold" }}
            numberOfLines={1}
          >
            {id.replace(/-/g, " ").toUpperCase()}
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
            NOT FOUND
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 24,
          }}
        >
          {/* Description */}
          {englishDescription ? (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mt-2 mb-4">
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
                {englishDescription}
              </Text>
            </View>
          ) : null}

          {/* Version groups (learn methods) */}
          {versionGroups.length > 0 && (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
              <Text
                className="text-xs mb-3"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                VERSION GROUPS
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {versionGroups.map((vg) => (
                  <View
                    key={vg.name}
                    className="bg-bg-input border border-pokedex-border rounded-lg px-3 py-1.5"
                  >
                    <Text
                      className="text-xs capitalize"
                      style={{
                        fontFamily: "RobotoMono_400Regular",
                        color: "#9CA3AF",
                      }}
                    >
                      {vg.name.replace(/-/g, " ")}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Moves list */}
          {moves.length > 0 && (
            <View className="bg-screen-bg rounded-2xl border border-pokedex-border overflow-hidden">
              <View className="flex-row items-center justify-between px-4 py-3 border-b border-pokedex-border">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  MOVES
                </Text>
                <Text
                  className="text-xs"
                  style={{
                    fontFamily: "RobotoMono_400Regular",
                    color: "#6B7280",
                  }}
                >
                  {moves.length} total
                </Text>
              </View>
              {moves.map((move, i) => (
                <TouchableOpacity
                  key={move.name}
                  onPress={() => router.push(`/moves/${move.name}`)}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    i < moves.length - 1 ? "border-b border-pokedex-border" : ""
                  }`}
                >
                  <Text
                    className="text-sm capitalize"
                    style={{
                      fontFamily: "RobotoMono_400Regular",
                      color: "#D1D5DB",
                    }}
                  >
                    {move.name.replace(/-/g, " ")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

import { PokemonMove } from "@/types/pokemon";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Platform, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const LEARN_METHODS = ["level-up", "machine", "egg", "tutor"] as const;
type LearnMethod = (typeof LEARN_METHODS)[number];

const METHOD_LABELS: Record<LearnMethod, string> = {
  "level-up": "LEVEL UP",
  machine: "TM / HM",
  egg: "EGG",
  tutor: "TUTOR",
};

export default function PokemonMoves({ moves }: { moves: PokemonMove[] }) {
  const [activeMethod, setActiveMethod] = useState<LearnMethod>("level-up");
  const router = useRouter();

  const filtered = moves
    .filter((m) =>
      m.version_group_details.some(
        (v) => v.move_learn_method.name === activeMethod,
      ),
    )
    .map((m) => {
      const detail = m.version_group_details
        .filter((v) => v.move_learn_method.name === activeMethod)
        .sort((a, b) =>
          b.version_group.name.localeCompare(a.version_group.name),
        )[0];
      return {
        name: m.move.name,
        level: detail?.level_learned_at ?? 0,
      };
    })
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));

  const handleMovePress = (name: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/moves/${name}`);
  };

  return (
    <View className="mx-4 mt-3 p-4 bg-pokedex-screen rounded-2xl border border-pokedex-border">
      <Text
        className="text-xs tracking-widest mb-3"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        MOVES
      </Text>

      {/* Learn method tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-3"
      >
        <View className="flex-row gap-2">
          {LEARN_METHODS.map((method) => {
            const isActive = method === activeMethod;
            return (
              <TouchableOpacity
                key={method}
                onPress={() => setActiveMethod(method)}
                className={`px-3 py-1.5 rounded-lg border ${
                  isActive
                    ? "border-pokedex-red bg-pokedex-red/20"
                    : "border-pokedex-border bg-bg-input"
                }`}
              >
                <Text
                  className="text-xs"
                  style={{
                    fontFamily: "ShareTechMono",
                    color: isActive ? "#CC0000" : "#606070",
                  }}
                >
                  {METHOD_LABELS[method]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Move list */}
      {filtered.length === 0 ? (
        <Text
          className="text-xs"
          style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
        >
          No moves via this method.
        </Text>
      ) : (
        <View>
          {/* Header */}
          <View className="flex-row mb-2 px-1">
            <Text
              className="text-xs flex-1"
              style={{ fontFamily: "ShareTechMono", color: "#606070" }}
            >
              MOVE
            </Text>
            {activeMethod === "level-up" && (
              <Text
                className="text-xs w-10 text-right"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                LVL
              </Text>
            )}
            <View className="w-5" />
          </View>

          {filtered.map((move, i) => (
            <TouchableOpacity
              key={move.name}
              onPress={() => handleMovePress(move.name)}
              activeOpacity={0.7}
              className={`flex-row items-center py-2.5 px-1 ${
                i < filtered.length - 1 ? "border-b border-pokedex-border" : ""
              }`}
            >
              <Text
                className="flex-1 text-sm capitalize"
                style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
              >
                {move.name.replace(/-/g, " ")}
              </Text>
              {activeMethod === "level-up" && (
                <Text
                  className="text-xs w-10 text-right"
                  style={{ fontFamily: "ShareTechMono", color: "#606070" }}
                >
                  {move.level === 0 ? "—" : move.level}
                </Text>
              )}
              <ChevronRight
                size={14}
                color="#606070"
                strokeWidth={1.8}
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

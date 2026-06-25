import { PokemonMove } from "@/types/pokemon";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
        >
          MOVES
        </Text>
        <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
      </View>

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
                    fontFamily: "Orbitron_500Medium",
                    color: isActive ? "#E53E3E" : "#6B7280",
                  }}
                >
                  {METHOD_LABELS[method]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {filtered.length === 0 ? (
        <Text
          className="text-xs"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          No moves via this method.
        </Text>
      ) : (
        <View>
          <View className="flex-row mb-2 px-1">
            <Text
              className="text-xs flex-1"
              style={{ fontFamily: "Orbitron", color: "#6B7280" }}
            >
              MOVE
            </Text>
            {activeMethod === "level-up" && (
              <Text
                className="text-xs w-10 text-right"
                style={{ fontFamily: "Orbitron", color: "#6B7280" }}
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
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {move.name.replace(/-/g, " ")}
              </Text>
              {activeMethod === "level-up" && (
                <Text
                  className="text-xs w-10 text-right"
                  style={{
                    fontFamily: "RobotoMono_400Regular",
                    color: "#6B7280",
                  }}
                >
                  {move.level === 0 ? "—" : move.level}
                </Text>
              )}
              <ChevronRight
                size={14}
                color="#6B7280"
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

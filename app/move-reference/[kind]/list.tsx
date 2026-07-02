import { NamedAPIResourceList } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const KIND_CONFIG: Record<string, { label: string; endpoint: string }> = {
  category: { label: "MOVE CATEGORIES", endpoint: "move-category" },
  "damage-class": { label: "DAMAGE CLASSES", endpoint: "move-damage-class" },
  "battle-style": { label: "BATTLE STYLES", endpoint: "move-battle-style" },
  "learn-method": { label: "LEARN METHODS", endpoint: "move-learn-method" },
};

export default function MoveReferenceListScreen() {
  const { kind } = useLocalSearchParams<{ kind: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const config = KIND_CONFIG[kind] ?? {
    label: kind?.toUpperCase(),
    endpoint: kind,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["move-ref-list", kind],
    queryFn: async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/${config.endpoint}?limit=50`,
      );
      if (!res.ok) throw new Error(`Failed to fetch ${kind} list`);
      return res.json() as Promise<NamedAPIResourceList>;
    },
    staleTime: Infinity,
    enabled: !!kind,
  });

  const handlePress = (name: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/move-reference/${kind}/${name}`);
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
          className="text-pokedex-red text-xl"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          {config.label}
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
          <View className="bg-screen-bg rounded-2xl border border-pokedex-border overflow-hidden">
            {data.results.map((item, i) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => handlePress(item.name)}
                activeOpacity={0.7}
                className={`flex-row items-center justify-between px-4 py-4 ${
                  i < data.results.length - 1
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
                  {item.name.replace(/-/g, " ")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

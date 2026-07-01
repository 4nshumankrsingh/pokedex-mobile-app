import { useNature } from "@/hooks/usePokemon";
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

function StatRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
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
        style={{
          fontFamily: "RobotoMono_400Regular",
          color: color ?? "#D1D5DB",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export default function NatureDetailScreen() {
  const { nature } = useLocalSearchParams<{ nature: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError } = useNature(nature);

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
          {nature.toUpperCase()}
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
            paddingBottom: insets.bottom + 24,
          }}
        >
          {/* Stat modifiers */}
          <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mt-2 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                STAT MODIFIERS
              </Text>
              <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
            </View>
            <StatRow
              label="INCREASED STAT"
              value={
                data.increased_stat?.name?.replace(/-/g, " ") ??
                "None (neutral)"
              }
              color={data.increased_stat ? "#E53E3E" : "#6B7280"}
            />
            <StatRow
              label="DECREASED STAT"
              value={
                data.decreased_stat?.name?.replace(/-/g, " ") ??
                "None (neutral)"
              }
              color={data.decreased_stat ? "#4C7DF0" : "#6B7280"}
            />
          </View>

          <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                FLAVOR PREFERENCES
              </Text>
              <View className="w-2 h-2 rounded-full bg-pokedex-yellow" />
            </View>
            <StatRow
              label="LIKES FLAVOR"
              value={data.likes_flavor?.name ?? "None"}
              color={data.likes_flavor ? "#FFCC33" : "#6B7280"}
            />
            <StatRow
              label="HATES FLAVOR"
              value={data.hates_flavor?.name ?? "None"}
              color={data.hates_flavor ? "#E53E3E" : "#6B7280"}
            />
          </View>

          {data.pokeathlon_stat_changes?.length > 0 && (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  POKÉATHLON CHANGES
                </Text>
                <View className="w-2 h-2 rounded-full bg-pokedex-green" />
              </View>
              {data.pokeathlon_stat_changes.map((change, i) => (
                <View
                  key={change.pokeathlon_stat.name}
                  className={`flex-row items-center justify-between py-2.5 ${
                    i < data.pokeathlon_stat_changes.length - 1
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
                    {change.pokeathlon_stat.name.replace(/-/g, " ")}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      fontFamily: "RobotoMono_600SemiBold",
                      color: change.max_change > 0 ? "#16A34A" : "#E53E3E",
                    }}
                  >
                    {change.max_change > 0
                      ? `+${change.max_change}`
                      : change.max_change}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

import { usePokeathlonStat } from "@/hooks/usePokemon";
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

export default function PokeathlonStatDetailScreen() {
  const { stat } = useLocalSearchParams<{ stat: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError } = usePokeathlonStat(stat);

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
          {stat.replace(/-/g, " ").toUpperCase()}
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
          {/* Natures that increase */}
          {data.affecting_natures.increase.length > 0 && (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  INCREASED BY NATURES
                </Text>
                <View className="w-2 h-2 rounded-full bg-pokedex-green" />
              </View>
              <View className="flex-row flex-wrap gap-2">
                {data.affecting_natures.increase.map((n) => (
                  <TouchableOpacity
                    key={n.nature.name}
                    onPress={() => router.push(`/natures/${n.nature.name}`)}
                    className="bg-bg-input border border-pokedex-border rounded-lg px-3 py-1.5"
                  >
                    <Text
                      className="text-xs capitalize"
                      style={{
                        fontFamily: "RobotoMono_400Regular",
                        color: "#16A34A",
                      }}
                    >
                      {n.nature.name} (+{n.max_change})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {data.affecting_natures.decrease.length > 0 && (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  DECREASED BY NATURES
                </Text>
                <View className="w-2 h-2 rounded-full bg-pokedex-red" />
              </View>
              <View className="flex-row flex-wrap gap-2">
                {data.affecting_natures.decrease.map((n) => (
                  <TouchableOpacity
                    key={n.nature.name}
                    onPress={() => router.push(`/natures/${n.nature.name}`)}
                    className="bg-bg-input border border-pokedex-border rounded-lg px-3 py-1.5"
                  >
                    <Text
                      className="text-xs capitalize"
                      style={{
                        fontFamily: "RobotoMono_400Regular",
                        color: "#E53E3E",
                      }}
                    >
                      {n.nature.name} ({n.max_change})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

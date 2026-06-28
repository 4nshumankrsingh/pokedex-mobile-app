import { useRegion } from "@/hooks/usePokemon";
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

export default function RegionDetailScreen() {
  const { region } = useLocalSearchParams<{ region: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError } = useRegion(region);

  const handleGenerationPress = (name: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/generations/${name}`);
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
          className="text-white text-base capitalize"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          {region.replace(/-/g, " ")}
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
          {/* Main generation */}
          {data.main_generation && (
            <TouchableOpacity
              onPress={() => handleGenerationPress(data.main_generation.name)}
              activeOpacity={0.7}
              className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4"
            >
              <View className="flex-row items-center justify-between mb-1">
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
                >
                  MAIN GENERATION
                </Text>
                <View className="w-2 h-2 rounded-full bg-pokedex-green" />
              </View>
              <Text
                className="text-sm capitalize"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {data.main_generation.name.replace(/-/g, " ")} →
              </Text>
            </TouchableOpacity>
          )}

          {/* Locations */}
          <View className="bg-screen-bg rounded-2xl border border-pokedex-border overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-pokedex-border">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                LOCATIONS
              </Text>
              <Text
                className="text-xs"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#6B7280",
                }}
              >
                {data.locations.length} total
              </Text>
            </View>

            {data.locations.map((loc, i) => (
              <View
                key={loc.name}
                className={`px-4 py-3 ${
                  i < data.locations.length - 1
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
                  {loc.name.replace(/-/g, " ")}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

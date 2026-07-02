import { useCharacteristic } from "@/hooks/usePokemon";
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

export default function CharacteristicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError } = useCharacteristic(parseInt(id, 10));

  const englishDescription =
    data?.descriptions?.find((d) => d.language.name === "en")?.description ??
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
          className="text-white text-base"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          CHARACTERISTIC #{id}
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

          {/* Stat info */}
          <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                DETAILS
              </Text>
              <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
            </View>
            <View className="flex-row items-center justify-between py-2.5 border-b border-pokedex-border">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron", color: "#6B7280" }}
              >
                HIGHEST STAT
              </Text>
              <Text
                className="text-sm capitalize"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {data.highest_stat?.name?.replace(/-/g, " ") ?? "—"}
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-2.5">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron", color: "#6B7280" }}
              >
                GENE MODULO
              </Text>
              <Text
                className="text-sm"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#D1D5DB",
                }}
              >
                {data.gene_modulo}
              </Text>
            </View>
          </View>

          {/* Possible values */}
          {data.possible_values?.length > 0 && (
            <View className="p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
              <Text
                className="text-xs mb-3"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                POSSIBLE IV VALUES
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {data.possible_values.map((v) => (
                  <View
                    key={v}
                    className="bg-bg-input border border-pokedex-border rounded-lg px-3 py-1.5"
                  >
                    <Text
                      className="text-xs"
                      style={{
                        fontFamily: "RobotoMono_600SemiBold",
                        color: "#4C7DF0",
                      }}
                    >
                      {v}
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

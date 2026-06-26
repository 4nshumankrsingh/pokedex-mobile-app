import { TypeColors } from "@/constants/colors";
import { usePokemonStore } from "@/store/pokemonStore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TYPE_LIST = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function TypesTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setSelectedType } = usePokemonStore();

  const handleTypePress = (type: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(type);
    router.push(`/types/${type}`);
  };

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-4 pb-2">
        <Text
          className="text-pokedex-red text-2xl mb-1"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          TYPES
        </Text>
        <Text
          className="text-xs mb-4"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          Select a type to view damage relations and Pokémon
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View className="flex-row flex-wrap gap-3">
          {TYPE_LIST.map((type) => {
            const color = TypeColors[type];
            return (
              <TouchableOpacity
                key={type}
                onPress={() => handleTypePress(type)}
                activeOpacity={0.7}
                style={{
                  width: "47%",
                  backgroundColor: color + "1A",
                  borderColor: color,
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <View
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: color }}
                />
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Orbitron_700Bold", color }}
                >
                  {type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

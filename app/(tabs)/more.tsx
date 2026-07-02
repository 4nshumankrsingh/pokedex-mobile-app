import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import {
  BookMarked,
  Globe2,
  Layers3,
  Leaf,
  Shield,
  Swords,
  TrendingUp,
  Zap,
} from "lucide-react-native";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SECTIONS = [
  {
    title: "WORLD",
    items: [
      {
        key: "generations",
        label: "GENERATIONS",
        description: "Browse Pokémon by generation",
        Icon: Layers3,
        route: "/generations",
      },
      {
        key: "regions",
        label: "REGIONS",
        description: "Explore game regions",
        Icon: Globe2,
        route: "/regions",
      },
      {
        key: "pokedexes",
        label: "POKÉDEXES",
        description: "Regional Pokédex listings",
        Icon: BookMarked,
        route: "/pokedexes",
      },
    ],
  },
  {
    title: "POKÉMON",
    items: [
      {
        key: "natures",
        label: "NATURES",
        description: "Stat modifiers and flavor preferences",
        Icon: Leaf,
        route: "/natures",
      },
      {
        key: "growth-rates",
        label: "GROWTH RATES",
        description: "Experience curves for levelling up",
        Icon: TrendingUp,
        route: "/growth-rates",
      },
      {
        key: "pokeathlon-stats",
        label: "POKÉATHLON",
        description: "Pokéathlon performance stats",
        Icon: Zap,
        route: "/pokeathlon-stats",
      },
    ],
  },
  {
    title: "MOVES",
    items: [
      {
        key: "move-categories",
        label: "MOVE CATEGORIES",
        description: "Ailment, damage, and status categories",
        Icon: Swords,
        route: "/move-reference/category/list",
      },
      {
        key: "damage-classes",
        label: "DAMAGE CLASSES",
        description: "Physical, special, and status",
        Icon: Shield,
        route: "/move-reference/damage-class/list",
      },
    ],
  },
];

export default function MoreTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handlePress = (route: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-4 pb-2">
        <Text
          className="text-pokedex-red text-2xl mb-1"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          MORE
        </Text>
        <Text
          className="text-xs mb-4"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          Additional game data and references
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        {SECTIONS.map((section) => (
          <View key={section.title} className="mb-6">
            <Text
              className="text-xs mb-3 ml-1"
              style={{ fontFamily: "Orbitron_500Medium", color: "#6B7280" }}
            >
              {section.title}
            </Text>
            <View className="gap-3">
              {section.items.map((item) => {
                const { Icon } = item;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => handlePress(item.route)}
                    activeOpacity={0.7}
                    className="flex-row items-center gap-4 p-4 bg-screen-bg rounded-2xl border border-pokedex-border"
                  >
                    <View className="w-11 h-11 rounded-xl bg-bg-input border border-pokedex-border items-center justify-center">
                      <Icon size={20} color="#4C7DF0" strokeWidth={1.8} />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-sm"
                        style={{
                          fontFamily: "Orbitron_700Bold",
                          color: "#FFFFFF",
                        }}
                      >
                        {item.label}
                      </Text>
                      <Text
                        className="text-xs mt-0.5"
                        style={{
                          fontFamily: "RobotoMono_400Regular",
                          color: "#6B7280",
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

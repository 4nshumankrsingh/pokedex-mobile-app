import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { BookOpen, Layers, Package, Search, Swords } from "lucide-react-native";
import { Platform, Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { name: "index", label: "POKÉDEX", Icon: Search },
  { name: "types", label: "TYPES", Icon: Layers },
  { name: "moves", label: "MOVES", Icon: Swords },
  { name: "items", label: "ITEMS", Icon: Package },
  { name: "more", label: "MORE", Icon: BookOpen },
];

function TabItem({
  tab,
  isFocused,
  onPress,
}: {
  tab: (typeof TABS)[0];
  isFocused: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const indicatorOpacity = useSharedValue(isFocused ? 1 : 0);
  const indicatorWidth = useSharedValue(isFocused ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
    scaleX: indicatorWidth.value,
  }));

  if (isFocused) {
    indicatorOpacity.value = withTiming(1, { duration: 200 });
    indicatorWidth.value = withSpring(1, { damping: 15 });
  } else {
    indicatorOpacity.value = withTiming(0, { duration: 150 });
    indicatorWidth.value = withTiming(0, { duration: 150 });
  }

  const handlePress = () => {
    scale.value = withSpring(0.85, { damping: 10 }, () => {
      scale.value = withSpring(1, { damping: 12 });
    });
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const { Icon } = tab;
  const color = isFocused ? "#CC0000" : "#606070";

  return (
    <Pressable
      onPress={handlePress}
      className="flex-1 items-center justify-center py-2"
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={tab.label}
    >
      <Animated.View style={animatedStyle} className="items-center gap-1">
        {/* Active indicator line at top */}
        <Animated.View
          style={indicatorStyle}
          className="absolute -top-2 w-6 h-0.5 bg-pokedex-red rounded-full"
        />
        <Icon size={22} color={color} strokeWidth={isFocused ? 2.5 : 1.8} />
        <Text
          className="text-[9px] tracking-widest"
          style={{
            fontFamily: "ShareTechMono",
            color,
          }}
        >
          {tab.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="flex-row bg-pokedex-panel border-t border-pokedex-border"
    >
      {state.routes.map((route, index) => {
        const tab = TABS.find((t) => t.name === route.name);
        if (!tab) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={route.key}
            tab={tab}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

import { useAppStore } from "@/store/appStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function LoadingScreen() {
  const router = useRouter();
  const setAppReady = useAppStore((s) => s.setAppReady);

  const textOpacity = useSharedValue(1);

  // Progress bar fill
  const progressWidth = useSharedValue(0);

  // Overlay fade-out when done
  const overlayOpacity = useSharedValue(1);

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  function onLoadingComplete() {
    setAppReady(true);
    router.replace("/(tabs)");
  }

  useEffect(() => {
    textOpacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    // Fill progress bar over 2.8s then fade out and navigate
    progressWidth.value = withTiming(100, {
      duration: 2800,
      easing: Easing.out(Easing.quad),
    });

    overlayOpacity.value = withDelay(
      3000,
      withTiming(
        0,
        { duration: 400, easing: Easing.in(Easing.ease) },
        (finished) => {
          if (finished) runOnJS(onLoadingComplete)();
        },
      ),
    );
  }, []);

  return (
    <Animated.View style={[overlayStyle]} className="flex-1 bg-bg-dark">
      {/* Loading image — fills the screen */}
      <Image
        source={require("@/assets/images/loading.jpg")}
        style={{ width, height }}
        contentFit="cover"
        transition={200}
      />

      <View className="absolute bottom-0 left-0 right-0 px-8 pb-14 pt-6 bg-pokedex-screen/90">
        {/* LOADING... text */}
        <Animated.View style={textStyle} className="mb-4 items-center">
          <Text className="font-mono text-pokedex-red text-sm tracking-widest uppercase">
            Loading...
          </Text>
        </Animated.View>

        {/* Progress bar track */}
        <View className="h-1.5 w-full bg-pokedex-border rounded-full overflow-hidden">
          <Animated.View
            style={progressStyle}
            className="h-full bg-pokedex-red rounded-full"
          />
        </View>

        {/* POKÉDEX label */}
        <View className="mt-4 items-center">
          <Text className="font-mono text-white text-xs tracking-[0.3em] opacity-60">
            POKÉDEX
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

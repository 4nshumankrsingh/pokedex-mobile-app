import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      retry: 2,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Orbitron: require("../assets/fonts/Orbitron-Regular.ttf"),
    Orbitron_500Medium: require("../assets/fonts/Orbitron-Medium.ttf"),
    Orbitron_700Bold: require("../assets/fonts/Orbitron-Bold.ttf"),
    Orbitron_900Black: require("../assets/fonts/Orbitron-Black.ttf"),
    RobotoMono_400Regular: require("../assets/fonts/RobotoMono-Regular.ttf"),
    RobotoMono_500Medium: require("../assets/fonts/RobotoMono-Medium.ttf"),
    RobotoMono_600SemiBold: require("../assets/fonts/RobotoMono-SemiBold.ttf"),
    RobotoMono_700Bold: require("../assets/fonts/RobotoMono-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}

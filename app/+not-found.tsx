import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 items-center justify-center bg-bg-dark">
        <Text className="font-mono text-pokedex-red text-2xl">404</Text>
        <Text className="font-mono text-white text-base mt-2">
          Screen not found
        </Text>
        <Link href="/" className="mt-6">
          <Text className="font-mono text-type-electric text-sm">
            ← Back to Pokédex
          </Text>
        </Link>
      </View>
    </>
  );
}

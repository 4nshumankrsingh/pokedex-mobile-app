import TabBar from "@/components/ui/TabBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="types" />
      <Tabs.Screen name="moves" />
      <Tabs.Screen name="items" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}

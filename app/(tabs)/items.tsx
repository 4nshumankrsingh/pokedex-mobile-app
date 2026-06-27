import { getItemSpriteUrl, useItemSearch } from "@/hooks/useItemSearch";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Search, X } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAGE_SIZE = 20;

export default function ItemsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { query, setQuery, suggestions, paginatedItems, isLoading } =
    useItemSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [page, setPage] = useState(1);
  const inputRef = useRef<TextInput>(null);

  const showSuggestions = isFocused && suggestions.length > 0;
  const visibleItems = paginatedItems.slice(0, page * PAGE_SIZE);
  const totalPages = Math.ceil(paginatedItems.length / PAGE_SIZE);

  const handleSelect = (name: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQuery("");
    inputRef.current?.blur();
    router.push(`/items/${name}`);
  };

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-4 pb-2">
        <Text
          className="text-pokedex-red text-2xl mb-1"
          style={{ fontFamily: "Orbitron_700Bold" }}
        >
          ITEMS
        </Text>
        <Text
          className="text-xs mb-4"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          Browse and search all Pokémon items
        </Text>

        {/* Search input */}
        <View
          className={`flex-row items-center bg-bg-input rounded-lg px-3 gap-2 border mb-2 ${
            isFocused ? "border-pokedex-red" : "border-pokedex-border"
          }`}
          style={{ height: 44 }}
        >
          <Search size={16} color="#9CA3AF" strokeWidth={1.8} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={(t) => {
              setQuery(t);
              setPage(1);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search items..."
            placeholderTextColor="#6B7280"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (suggestions.length > 0) handleSelect(suggestions[0].name);
            }}
            className="flex-1 text-white text-sm"
            style={{ fontFamily: "RobotoMono_400Regular" }}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <X size={16} color="#6B7280" strokeWidth={1.8} />
            </TouchableOpacity>
          )}
        </View>

        {/* Autocomplete suggestions */}
        {showSuggestions && (
          <View className="bg-bg-card border border-pokedex-border rounded-lg mb-2 overflow-hidden">
            {suggestions.map((s, i) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => handleSelect(s.name)}
                className={`flex-row items-center gap-3 px-4 py-3 ${
                  i < suggestions.length - 1
                    ? "border-b border-pokedex-border"
                    : ""
                }`}
              >
                <Image
                  source={{ uri: getItemSpriteUrl(s.name) }}
                  style={{ width: 28, height: 28 }}
                  contentFit="contain"
                />
                <Text
                  className="text-white text-sm capitalize flex-1"
                  style={{ fontFamily: "RobotoMono_400Regular" }}
                >
                  {s.name.replace(/-/g, " ")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Item list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        {isLoading ? (
          <View className="items-center py-8">
            <Text
              className="text-xs"
              style={{ fontFamily: "Orbitron_500Medium", color: "#9CA3AF" }}
            >
              LOADING ITEMS...
            </Text>
          </View>
        ) : (
          <View className="bg-screen-bg rounded-2xl border border-pokedex-border overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-pokedex-border">
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
              >
                ALL ITEMS
              </Text>
              <Text
                className="text-xs"
                style={{
                  fontFamily: "RobotoMono_400Regular",
                  color: "#6B7280",
                }}
              >
                {paginatedItems.length} total
              </Text>
            </View>

            {visibleItems.map((item, i) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => handleSelect(item.name)}
                activeOpacity={0.7}
                className={`flex-row items-center gap-3 px-4 py-3 ${
                  i < visibleItems.length - 1
                    ? "border-b border-pokedex-border"
                    : ""
                }`}
              >
                <Image
                  source={{ uri: getItemSpriteUrl(item.name) }}
                  style={{ width: 32, height: 32 }}
                  contentFit="contain"
                />
                <Text
                  className="text-sm capitalize flex-1"
                  style={{
                    fontFamily: "RobotoMono_400Regular",
                    color: "#D1D5DB",
                  }}
                >
                  {item.name.replace(/-/g, " ")}
                </Text>
              </TouchableOpacity>
            ))}

            {page < totalPages && (
              <TouchableOpacity
                onPress={() => setPage((p) => p + 1)}
                className="py-3 items-center border-t border-pokedex-border bg-bg-input"
              >
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Orbitron_500Medium", color: "#9CA3AF" }}
                >
                  LOAD MORE
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

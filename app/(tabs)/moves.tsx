import { useMoveSearch } from "@/hooks/useMoveSearch";
import * as Haptics from "expo-haptics";
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

export default function MovesTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { query, setQuery, suggestions, paginatedMoves, isLoading } =
    useMoveSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [page, setPage] = useState(1);
  const inputRef = useRef<TextInput>(null);

  const showSuggestions = isFocused && suggestions.length > 0;
  const visibleMoves = paginatedMoves.slice(0, page * PAGE_SIZE);
  const totalPages = Math.ceil(paginatedMoves.length / PAGE_SIZE);

  const handleSelect = (name: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQuery("");
    inputRef.current?.blur();
    router.push(`/moves/${name}`);
  };

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-4 pb-2">
        <Text
          className="text-pokedex-red text-2xl tracking-widest mb-1"
          style={{ fontFamily: "ShareTechMono" }}
        >
          MOVES
        </Text>
        <Text
          className="text-xs mb-4"
          style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
        >
          Browse and search all Pokémon moves
        </Text>

        {/* Search input */}
        <View
          className={`flex-row items-center bg-bg-input rounded-lg px-3 gap-2 border mb-2 ${
            isFocused ? "border-pokedex-red" : "border-pokedex-border"
          }`}
          style={{ height: 44 }}
        >
          <Search size={16} color="#606070" strokeWidth={1.8} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={(t) => {
              setQuery(t);
              setPage(1);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search moves..."
            placeholderTextColor="#606070"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (suggestions.length > 0) handleSelect(suggestions[0].name);
            }}
            className="flex-1 text-white text-sm"
            style={{ fontFamily: "Nunito_400Regular" }}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <X size={16} color="#606070" strokeWidth={1.8} />
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
                className={`flex-row items-center justify-between px-4 py-3 ${
                  i < suggestions.length - 1
                    ? "border-b border-pokedex-border"
                    : ""
                }`}
              >
                <Text
                  className="text-white text-sm capitalize"
                  style={{ fontFamily: "Nunito_400Regular" }}
                >
                  {s.name.replace(/-/g, " ")}
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "ShareTechMono", color: "#606070" }}
                >
                  #{s.id.padStart(4, "0")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Move list */}
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
              className="text-xs tracking-widest"
              style={{ fontFamily: "ShareTechMono", color: "#606070" }}
            >
              LOADING MOVES...
            </Text>
          </View>
        ) : (
          <View className="bg-pokedex-screen rounded-2xl border border-pokedex-border overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-pokedex-border">
              <Text
                className="text-xs tracking-widest"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                ALL MOVES
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                {paginatedMoves.length} total
              </Text>
            </View>

            {visibleMoves.map((move, i) => {
              const id = move.url.split("/").filter(Boolean).pop() ?? "";
              return (
                <TouchableOpacity
                  key={move.name}
                  onPress={() => handleSelect(move.name)}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    i < visibleMoves.length - 1
                      ? "border-b border-pokedex-border"
                      : ""
                  }`}
                >
                  <Text
                    className="text-sm capitalize flex-1"
                    style={{
                      fontFamily: "Nunito_400Regular",
                      color: "#A0A0B0",
                    }}
                  >
                    {move.name.replace(/-/g, " ")}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ fontFamily: "ShareTechMono", color: "#606070" }}
                  >
                    #{id.padStart(4, "0")}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {page < totalPages && (
              <TouchableOpacity
                onPress={() => setPage((p) => p + 1)}
                className="py-3 items-center border-t border-pokedex-border bg-bg-input"
              >
                <Text
                  className="text-xs tracking-widest"
                  style={{ fontFamily: "ShareTechMono", color: "#A0A0B0" }}
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

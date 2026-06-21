import { TypeColors } from "@/constants/colors";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { usePokemonStore } from "@/store/pokemonStore";
import * as Haptics from "expo-haptics";
import { Dices, Search, SlidersHorizontal, X } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function PokemonSearch() {
  const { query, setQuery, suggestions, isLoading, popular } =
    usePokemonSearch();
  const { setSelectedPokemonId, selectedType, setSelectedType } =
    usePokemonStore();
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleSelect = (idOrName: string) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPokemonId(idOrName);
    setQuery("");
    inputRef.current?.blur();
  };

  const handleRandom = () => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const randomId = Math.floor(Math.random() * 1025) + 1;
    setSelectedPokemonId(randomId);
  };

  const handleTypeSelect = (type: string | null) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(type);
    setTypeModalVisible(false);
  };

  const showSuggestions = isFocused && suggestions.length > 0;

  return (
    <View className="px-4 pt-4 pb-2">
      <Text
        className="text-pokedex-red text-2xl mb-4"
        style={{ fontFamily: "Orbitron_700Bold" }}
      >
        POKÉDEX
      </Text>

      <View className="flex-row items-center gap-2 mb-3">
        <View
          className={`flex-1 flex-row items-center bg-bg-input rounded-lg px-3 gap-2 border ${
            isFocused ? "border-pokedex-red" : "border-pokedex-border"
          }`}
          style={{ height: 44 }}
        >
          <Search size={16} color="#9CA3AF" strokeWidth={1.8} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Name or number..."
            placeholderTextColor="#6B7280"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (query.trim()) handleSelect(query.trim().toLowerCase());
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

        <TouchableOpacity
          onPress={() => setTypeModalVisible(true)}
          className={`items-center justify-center rounded-lg border ${
            selectedType
              ? "border-pokedex-red bg-pokedex-red/20"
              : "border-pokedex-border bg-bg-input"
          }`}
          style={{ width: 44, height: 44 }}
        >
          <SlidersHorizontal
            size={18}
            color={selectedType ? "#E53E3E" : "#9CA3AF"}
            strokeWidth={1.8}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRandom}
          className="items-center justify-center rounded-lg border border-pokedex-border bg-bg-input"
          style={{ width: 44, height: 44 }}
        >
          <Dices size={18} color="#9CA3AF" strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      {/* Active type filter badge */}
      {selectedType && (
        <View className="flex-row items-center mb-3">
          <View
            className="flex-row items-center gap-2 rounded-full px-3 py-1"
            style={{ backgroundColor: TypeColors[selectedType] + "33" }}
          >
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: TypeColors[selectedType] }}
            />
            <Text
              className="text-xs"
              style={{
                fontFamily: "Orbitron_500Medium",
                color: TypeColors[selectedType],
              }}
            >
              {selectedType.toUpperCase()}
            </Text>
            <TouchableOpacity onPress={() => setSelectedType(null)}>
              <X size={12} color={TypeColors[selectedType]} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showSuggestions && (
        <View className="bg-bg-card border border-pokedex-border rounded-lg mb-3 overflow-hidden">
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
                style={{ fontFamily: "RobotoMono_400Regular" }}
              >
                {s.name}
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "Orbitron", color: "#6B7280" }}
              >
                #{s.id.padStart(4, "0")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Popular Pokémon chips */}
      {!isFocused && !query && (
        <View>
          <Text
            className="text-xs mb-2"
            style={{ fontFamily: "Orbitron_500Medium", color: "#6B7280" }}
          >
            POPULAR
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {popular.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  onPress={() => handleSelect(p.name)}
                  className="bg-bg-card border border-pokedex-border rounded-lg px-3 py-2"
                >
                  <Text
                    className="text-white text-xs capitalize"
                    style={{ fontFamily: "RobotoMono_400Regular" }}
                  >
                    {p.name}
                  </Text>
                  <Text
                    className="text-xs mt-0.5"
                    style={{ fontFamily: "Orbitron", color: "#6B7280" }}
                  >
                    #{p.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Type filter modal */}
      <Modal
        visible={typeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60"
          onPress={() => setTypeModalVisible(false)}
        />
        <View className="bg-pokedex-panel border-t border-pokedex-border rounded-t-2xl px-4 pt-4 pb-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-white text-sm"
              style={{ fontFamily: "Orbitron_700Bold" }}
            >
              FILTER BY TYPE
            </Text>
            <TouchableOpacity onPress={() => setTypeModalVisible(false)}>
              <X size={20} color="#9CA3AF" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleTypeSelect(null)}
            className={`mb-3 py-2 px-4 rounded-lg border ${
              !selectedType
                ? "border-pokedex-red bg-pokedex-red/20"
                : "border-pokedex-border bg-bg-input"
            }`}
          >
            <Text
              className="text-center text-xs"
              style={{
                fontFamily: "Orbitron_500Medium",
                color: !selectedType ? "#E53E3E" : "#9CA3AF",
              }}
            >
              ALL TYPES
            </Text>
          </TouchableOpacity>

          <View className="flex-row flex-wrap gap-2">
            {TYPE_LIST.map((type) => {
              const isSelected = selectedType === type;
              const color = TypeColors[type];
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => handleTypeSelect(type)}
                  className="rounded-lg px-3 py-2 border"
                  style={{
                    borderColor: isSelected ? color : "#1E40AF",
                    backgroundColor: isSelected ? color + "33" : "#262A3D",
                    minWidth: "28%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    className="text-xs"
                    style={{
                      fontFamily: "Orbitron_500Medium",
                      color: isSelected ? color : "#9CA3AF",
                    }}
                  >
                    {type.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

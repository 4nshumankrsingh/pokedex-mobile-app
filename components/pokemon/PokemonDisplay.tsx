import PokemonAbilities from "@/components/pokemon/PokemonAbilities";
import PokemonDescription from "@/components/pokemon/PokemonDescription";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";
import PokemonMoves from "@/components/pokemon/PokemonMoves";
import PokemonNavigation from "@/components/pokemon/PokemonNavigation";
import PokemonStats from "@/components/pokemon/PokemonStats";
import { TypeColors } from "@/constants/colors";
import { usePokemon, usePokemonSpecies } from "@/hooks/usePokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { Image } from "expo-image";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TypeBadge({ type }: { type: string }) {
  const color = TypeColors[type] ?? "#8E9B92";
  return (
    <View
      className="rounded-full px-3 py-1"
      style={{
        backgroundColor: color + "33",
        borderWidth: 1,
        borderColor: color,
      }}
    >
      <Text
        className="text-xs"
        style={{ fontFamily: "Orbitron_500Medium", color }}
      >
        {type.toUpperCase()}
      </Text>
    </View>
  );
}

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="w-16 h-16 rounded-full bg-bg-card border border-pokedex-border items-center justify-center mb-4">
        <View className="w-8 h-8 rounded-full bg-pokedex-border" />
      </View>
      <Text
        className="text-center text-sm mb-2"
        style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
      >
        NO POKÉMON SELECTED
      </Text>
      <Text
        className="text-center text-xs"
        style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
      >
        Search by name or number, or tap a popular Pokémon above
      </Text>
      <View className="mt-6 flex-row items-center gap-2">
        <View className="h-px flex-1 bg-pokedex-border" />
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_500Medium", color: "#16A34A" }}
        >
          SYSTEM ONLINE
        </Text>
        <View className="h-px flex-1 bg-pokedex-border" />
      </View>
      <Text
        className="text-xs mt-2"
        style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
      >
        API: POKEAPI.CO — CONNECTED
      </Text>
    </View>
  );
}

function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ActivityIndicator color="#4C7DF0" size="large" />
      <Text
        className="text-xs mt-4"
        style={{ fontFamily: "Orbitron_500Medium", color: "#9CA3AF" }}
      >
        LOADING DATA...
      </Text>
    </View>
  );
}

function ErrorState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Text
        className="text-pokedex-red text-sm mb-2"
        style={{ fontFamily: "Orbitron_700Bold" }}
      >
        NOT FOUND
      </Text>
      <Text
        className="text-center text-xs"
        style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
      >
        No Pokémon matched your search. Try a different name or number.
      </Text>
    </View>
  );
}

export default function PokemonDisplay() {
  const { selectedPokemonId } = usePokemonStore();
  const insets = useSafeAreaInsets();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = usePokemon(selectedPokemonId ?? "");

  const { data: species } = usePokemonSpecies(pokemon?.species?.name ?? "");

  if (!selectedPokemonId) return <EmptyState />;
  if (isLoading) return <LoadingState />;
  if (isError || !pokemon) return <ErrorState />;

  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  const types = pokemon.types.map((t) => t.type.name);

  const englishGenus =
    species?.genera?.find((g) => g.language.name === "en")?.genus ?? "";

  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  const evolutionChainId = species?.evolution_chain?.url
    ? (() => {
        const parts = species.evolution_chain.url.split("/").filter(Boolean);
        return parseInt(parts[parts.length - 1], 10);
      })()
    : null;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
    >
      <PokemonNavigation currentId={pokemon.id} />

      {/* Sprite + identity block */}
      <View className="items-center px-4 pt-4 pb-6 bg-screen-bg mx-4 rounded-2xl border border-pokedex-border">
        <Text
          className="text-xs mb-1"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          #{String(pokemon.id).padStart(4, "0")}
        </Text>

        <Image
          source={{ uri: sprite ?? undefined }}
          style={{ width: 180, height: 180 }}
          contentFit="contain"
          transition={300}
        />

        <Text
          className="text-white text-2xl mt-2"
          style={{ fontFamily: "Orbitron_900Black" }}
        >
          {pokemon.name.toUpperCase()}
        </Text>

        {englishGenus ? (
          <Text
            className="text-xs mt-1"
            style={{ fontFamily: "RobotoMono_400Regular", color: "#9CA3AF" }}
          >
            {englishGenus}
          </Text>
        ) : null}

        <View className="flex-row gap-2 mt-3">
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </View>

        <View className="flex-row mt-4 gap-4">
          {[
            { label: "HEIGHT", value: `${heightM}m` },
            { label: "WEIGHT", value: `${weightKg}kg` },
            { label: "BASE XP", value: String(pokemon.base_experience ?? "—") },
          ].map((item) => (
            <View key={item.label} className="items-center flex-1">
              <Text
                className="text-white text-sm"
                style={{ fontFamily: "RobotoMono_600SemiBold" }}
              >
                {item.value}
              </Text>
              <Text
                className="text-xs mt-0.5"
                style={{ fontFamily: "Orbitron", color: "#6B7280" }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {species?.flavor_text_entries?.length ? (
        <PokemonDescription entries={species.flavor_text_entries} />
      ) : null}

      <PokemonStats stats={pokemon.stats} />
      <PokemonAbilities abilities={pokemon.abilities} />

      {evolutionChainId ? (
        <PokemonEvolution evolutionChainId={evolutionChainId} />
      ) : null}

      <PokemonMoves moves={pokemon.moves} />
    </ScrollView>
  );
}

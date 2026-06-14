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
  const color = TypeColors[type] ?? "#A8A878";
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
        className="text-xs tracking-widest"
        style={{ fontFamily: "ShareTechMono", color }}
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
        className="text-center text-sm tracking-widest mb-2"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        NO POKÉMON SELECTED
      </Text>
      <Text
        className="text-center text-xs"
        style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
      >
        Search by name or number, or tap a popular Pokémon above
      </Text>
      <View className="mt-6 flex-row items-center gap-2">
        <View className="h-px flex-1 bg-pokedex-border" />
        <Text
          className="text-xs tracking-widest"
          style={{ fontFamily: "ShareTechMono", color: "#606070" }}
        >
          SYSTEM ONLINE
        </Text>
        <View className="h-px flex-1 bg-pokedex-border" />
      </View>
      <Text
        className="text-xs mt-2"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        API: POKEAPI.CO — CONNECTED
      </Text>
    </View>
  );
}

function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ActivityIndicator color="#CC0000" size="large" />
      <Text
        className="text-xs tracking-widest mt-4"
        style={{ fontFamily: "ShareTechMono", color: "#606070" }}
      >
        LOADING...
      </Text>
    </View>
  );
}

function ErrorState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Text
        className="text-pokedex-red text-sm tracking-widest mb-2"
        style={{ fontFamily: "ShareTechMono" }}
      >
        NOT FOUND
      </Text>
      <Text
        className="text-center text-xs"
        style={{ fontFamily: "Nunito_400Regular", color: "#606070" }}
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
      <View className="items-center px-4 pt-4 pb-6 bg-pokedex-screen mx-4 rounded-2xl border border-pokedex-border">
        {/* ID */}
        <Text
          className="text-xs tracking-widest mb-1"
          style={{ fontFamily: "ShareTechMono", color: "#606070" }}
        >
          #{String(pokemon.id).padStart(4, "0")}
        </Text>

        {/* Sprite */}
        <Image
          source={{ uri: sprite ?? undefined }}
          style={{ width: 180, height: 180 }}
          contentFit="contain"
          transition={300}
        />

        {/* Name */}
        <Text
          className="text-white text-2xl tracking-widest mt-2"
          style={{ fontFamily: "ShareTechMono" }}
        >
          {pokemon.name.toUpperCase()}
        </Text>

        {/* Genus */}
        {englishGenus ? (
          <Text
            className="text-xs mt-1"
            style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
          >
            {englishGenus}
          </Text>
        ) : null}

        {/* Type badges */}
        <View className="flex-row gap-2 mt-3">
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </View>

        {/* Height / Weight / Base XP row */}
        <View className="flex-row mt-4 gap-4">
          {[
            { label: "HEIGHT", value: `${heightM}m` },
            { label: "WEIGHT", value: `${weightKg}kg` },
            { label: "BASE XP", value: String(pokemon.base_experience ?? "—") },
          ].map((item) => (
            <View key={item.label} className="items-center flex-1">
              <Text
                className="text-white text-sm"
                style={{ fontFamily: "Nunito_400Regular" }}
              >
                {item.value}
              </Text>
              <Text
                className="text-xs mt-0.5"
                style={{ fontFamily: "ShareTechMono", color: "#606070" }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Description */}
      {species?.flavor_text_entries?.length ? (
        <PokemonDescription entries={species.flavor_text_entries} />
      ) : null}

      {/* Stats */}
      <PokemonStats stats={pokemon.stats} />

      {/* Abilities */}
      <PokemonAbilities abilities={pokemon.abilities} />

      {/* Evolution */}
      {evolutionChainId ? (
        <PokemonEvolution evolutionChainId={evolutionChainId} />
      ) : null}

      {/* Moves */}
      <PokemonMoves moves={pokemon.moves} />
    </ScrollView>
  );
}

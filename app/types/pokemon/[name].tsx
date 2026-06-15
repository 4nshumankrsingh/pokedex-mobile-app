import PokemonAbilities from "@/components/pokemon/PokemonAbilities";
import PokemonDescription from "@/components/pokemon/PokemonDescription";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";
import PokemonMoves from "@/components/pokemon/PokemonMoves";
import PokemonStats from "@/components/pokemon/PokemonStats";
import { TypeColors } from "@/constants/colors";
import { usePokemon, usePokemonSpecies } from "@/hooks/usePokemon";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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

export default function TypePokemonDetail() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: pokemon, isLoading, isError } = usePokemon(name);
  const { data: species } = usePokemonSpecies(pokemon?.species?.name ?? "");

  const sprite =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon?.sprites?.front_default;

  const types = pokemon?.types.map((t) => t.type.name) ?? [];
  const englishGenus =
    species?.genera?.find((g) => g.language.name === "en")?.genus ?? "";
  const heightM = pokemon ? (pokemon.height / 10).toFixed(1) : "—";
  const weightKg = pokemon ? (pokemon.weight / 10).toFixed(1) : "—";

  const evolutionChainId = species?.evolution_chain?.url
    ? (() => {
        const parts = species.evolution_chain.url.split("/").filter(Boolean);
        return parseInt(parts[parts.length - 1], 10);
      })()
    : null;

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 pt-4 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-xl border border-pokedex-border bg-bg-input"
        >
          <ChevronLeft size={18} color="#A0A0B0" strokeWidth={1.8} />
        </TouchableOpacity>
        <Text
          className="text-white text-base tracking-widest capitalize"
          style={{ fontFamily: "ShareTechMono" }}
        >
          {name}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#CC0000" size="large" />
          <Text
            className="text-xs tracking-widest mt-4"
            style={{ fontFamily: "ShareTechMono", color: "#606070" }}
          >
            LOADING...
          </Text>
        </View>
      ) : isError || !pokemon ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text
            className="text-pokedex-red text-sm tracking-widest mb-2"
            style={{ fontFamily: "ShareTechMono" }}
          >
            NOT FOUND
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        >
          {/* Identity block */}
          <View className="items-center px-4 pt-4 pb-6 bg-pokedex-screen mx-4 rounded-2xl border border-pokedex-border mt-2">
            <Text
              className="text-xs tracking-widest mb-1"
              style={{ fontFamily: "ShareTechMono", color: "#606070" }}
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
              className="text-white text-2xl tracking-widest mt-2"
              style={{ fontFamily: "ShareTechMono" }}
            >
              {pokemon.name.toUpperCase()}
            </Text>

            {englishGenus ? (
              <Text
                className="text-xs mt-1"
                style={{ fontFamily: "Nunito_400Regular", color: "#A0A0B0" }}
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
                {
                  label: "BASE XP",
                  value: String(pokemon.base_experience ?? "—"),
                },
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
      )}
    </View>
  );
}

import { useEvolutionChain, usePokemon } from "@/hooks/usePokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { ChainLink } from "@/types/evolution";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

function SpriteNode({
  name,
  onPress,
  isActive,
}: {
  name: string;
  onPress: () => void;
  isActive: boolean;
}) {
  const { data } = usePokemon(name);
  const sprite =
    data?.sprites?.other?.["official-artwork"]?.front_default ??
    data?.sprites?.front_default;
  const id = data?.id;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="items-center"
    >
      <View
        className={`w-16 h-16 rounded-full items-center justify-center border-2 ${
          isActive
            ? "border-pokedex-red bg-pokedex-red/10"
            : "border-pokedex-border bg-bg-input"
        }`}
      >
        {sprite ? (
          <Image
            source={{ uri: sprite }}
            style={{ width: 48, height: 48 }}
            contentFit="contain"
          />
        ) : (
          <View className="w-8 h-8 rounded-full bg-pokedex-border" />
        )}
      </View>
      <Text
        className="text-xs mt-1 capitalize text-center"
        style={{ fontFamily: "RobotoMono_400Regular", color: "#9CA3AF" }}
        numberOfLines={1}
      >
        {name}
      </Text>
      {id ? (
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron", color: "#6B7280" }}
        >
          #{String(id).padStart(3, "0")}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

function EvolutionRow({
  from,
  to,
  detail,
}: {
  from: string;
  to: string;
  detail: string;
}) {
  const { setSelectedPokemonId, selectedPokemonId } = usePokemonStore();

  return (
    <View className="flex-row items-center justify-between mb-4">
      <SpriteNode
        name={from}
        onPress={() => setSelectedPokemonId(from)}
        isActive={selectedPokemonId === from}
      />
      <View className="flex-1 items-center px-2">
        <ChevronRight size={16} color="#6B7280" strokeWidth={1.8} />
        {detail ? (
          <Text
            className="text-xs text-center mt-1"
            style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
            numberOfLines={2}
          >
            {detail}
          </Text>
        ) : null}
      </View>
      <SpriteNode
        name={to}
        onPress={() => setSelectedPokemonId(to)}
        isActive={selectedPokemonId === to}
      />
    </View>
  );
}

function buildEvolutionRows(
  chain: ChainLink,
  rows: { from: string; to: string; detail: string }[] = [],
) {
  for (const next of chain.evolves_to) {
    const detail = next.evolution_details[0];
    let label = "";

    if (detail) {
      if (detail.min_level) label = `Lv. ${detail.min_level}`;
      else if (detail.item) label = detail.item.name.replace(/-/g, " ");
      else if (detail.held_item)
        label = detail.held_item.name.replace(/-/g, " ");
      else if (detail.min_happiness) label = "High friendship";
      else label = detail.trigger?.name?.replace(/-/g, " ") ?? "";
    }

    rows.push({
      from: chain.species.name,
      to: next.species.name,
      detail: label,
    });
    buildEvolutionRows(next, rows);
  }
  return rows;
}

export default function PokemonEvolution({
  evolutionChainId,
}: {
  evolutionChainId: number;
}) {
  const { data, isLoading } = useEvolutionChain(evolutionChainId);

  if (isLoading) return null;
  if (!data) return null;

  const rows = buildEvolutionRows(data.chain);

  if (!rows.length) {
    return (
      <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="text-xs"
            style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
          >
            EVOLUTION CHAIN
          </Text>
          <View className="w-2 h-2 rounded-full bg-pokedex-border" />
        </View>
        <Text
          className="text-xs"
          style={{ fontFamily: "RobotoMono_400Regular", color: "#6B7280" }}
        >
          This Pokémon does not evolve.
        </Text>
      </View>
    );
  }

  return (
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-4">
        <Text
          className="text-xs"
          style={{ fontFamily: "Orbitron_700Bold", color: "#9CA3AF" }}
        >
          EVOLUTION CHAIN
        </Text>
        <View className="w-2 h-2 rounded-full bg-pokedex-green" />
      </View>
      {rows.map((row, i) => (
        <EvolutionRow key={i} from={row.from} to={row.to} detail={row.detail} />
      ))}
    </View>
  );
}

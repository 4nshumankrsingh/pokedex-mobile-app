import { Text, View } from "react-native";
import { usePokemonStore } from '@/store/pokemonStore';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TYPE_LIST = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

const TYPE_ICONS: Record<string, string> = {
  normal: '◯', fire: '▲', water: '◆', electric: '★', grass: '❋',
  ice: '❄', fighting: '✊', poison: '☠', ground: '⬡', flying: '◁',
  psychic: '✦', bug: '✿', rock: '⬟', ghost: '◈', dragon: '◉',
  dark: '◑', steel: '⬣', fairy: '✧',
};

export default function TypesTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setSelectedType } = usePokemonStore();

  const handleTypePress = (type: string) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(type);
    router.push(`/types/${type}`);
  };

  return (
    <View className="flex-1 bg-bg-dark" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-4 pb-2">
        <Text
          className="text-pokedex-red text-2xl tracking-widest mb-1"
          style={{ fontFamily: 'ShareTechMono' }}
        >
          TYPES
        </Text>
        <Text
          className="text-xs mb-4"
          style={{ fontFamily: 'Nunito_400Regular', color: '#606070' }}
        >
          Select a type to view damage relations and Pokémon
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row flex-wrap gap-3">
          {TYPE_LIST.map((type) => {
            const color = TypeColors[type];
            return (
              <TouchableOpacity
                key={type}
                onPress={() => handleTypePress(type)}
                activeOpacity={0.7}
                style={{
                  width: '47%',
                  backgroundColor: color + '22',
                  borderColor: color,
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <Text
                  className="text-2xl mb-2"
                  style={{ color }}
                >
                  {TYPE_ICONS[type]}
                </Text>
                <Text
                  className="text-sm tracking-widest"
                  style={{ fontFamily: 'ShareTechMono', color }}
                >
                  {type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
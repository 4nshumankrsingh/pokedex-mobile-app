import { StatColors } from '@/constants/colors';
import { PokemonStat } from '@/types/pokemon';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'SPD',
};

const MAX_STAT = 255;

function StatBar({ stat, index }: { stat: PokemonStat; index: number }) {
  const name = stat.stat.name;
  const value = stat.base_stat;
  const color = StatColors[name] ?? '#9CA3AF';
  const label = STAT_LABELS[name] ?? name.toUpperCase();
  const percentage = Math.min((value / MAX_STAT) * 100, 100);

  const width = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  useEffect(() => {
    width.value = withDelay(
      index * 80,
      withTiming(percentage, { duration: 600 })
    );
  }, [value]);

  return (
    <View className="flex-row items-center gap-3 mb-2">
      <Text
        className="text-xs w-8"
        style={{ fontFamily: 'Orbitron', color: '#6B7280' }}
      >
        {label}
      </Text>
      <Text
        className="text-xs w-6 text-right"
        style={{ fontFamily: 'RobotoMono_600SemiBold', color: '#9CA3AF' }}
      >
        {value}
      </Text>
      <View className="flex-1 h-1.5 bg-pokedex-border rounded-full overflow-hidden">
        <Animated.View
          style={[animatedStyle, { backgroundColor: color }]}
          className="h-full rounded-full"
        />
      </View>
    </View>
  );
}

export default function PokemonStats({ stats }: { stats: PokemonStat[] }) {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <View className="mx-4 mt-3 p-4 bg-screen-bg rounded-2xl border border-pokedex-border">
      <View className="flex-row items-center justify-between mb-4">
        <Text
          className="text-xs"
          style={{ fontFamily: 'Orbitron_700Bold', color: '#9CA3AF' }}
        >
          BASE STATS
        </Text>
        <View className="w-2 h-2 rounded-full bg-pokedex-blue" />
      </View>

      {stats.map((stat, i) => (
        <StatBar key={stat.stat.name} stat={stat} index={i} />
      ))}

      <View className="flex-row items-center gap-3 mt-2 pt-2 border-t border-pokedex-border">
        <Text
          className="text-xs w-8"
          style={{ fontFamily: 'Orbitron', color: '#6B7280' }}
        >
          TOT
        </Text>
        <Text
          className="text-xs"
          style={{ fontFamily: 'RobotoMono_700Bold', color: '#FFFFFF' }}
        >
          {total}
        </Text>
      </View>
    </View>
  );
}
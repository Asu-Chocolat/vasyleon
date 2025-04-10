import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function PerformanceDetails() {
  const { id } = useLocalSearchParams();
  return <Text>Détail de la perf : {id}</Text>;
}
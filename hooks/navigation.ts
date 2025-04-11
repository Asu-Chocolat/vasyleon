// lib/navigation.ts
import { useRouter } from 'expo-router';

export const useLeonNavigation = () => {
  const router = useRouter();

  return {
    home: () => router.push('/'),
    conseils: () => router.push('/conseils'),
    performances: () => router.push('/performances'),
    entrainements: () => router.push('/entrainements'),
		performanceForm: () => router.push('/performances/form')
  };
};

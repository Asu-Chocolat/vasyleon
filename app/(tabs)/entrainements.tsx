import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useRouter } from "expo-router";

// SVG Icons
const logoSvg = `
<svg width="300" height="300" viewBox="0 0 300 300" fill="none">
  <path d="M155 100C155 122.091 137.091 140 115 140C92.9086 140 75 122.091 75 100C75 77.9086 92.9086 60 115 60C137.091 60 155 77.9086 155 100Z" fill="#0D3C5F"/>
  <path d="M40 180C60 150 90 130 130 140C170 150 210 130 250 150C255 155 260 160 260 180C200 170 180 200 130 190C90 182 70 190 40 180Z" fill="#4EAAE5"/>
  <path d="M60 210C80 200 100 195 130 205C160 215 210 205 240 215C245 220 245 225 240 230C180 220 160 235 130 225C100 215 80 220 60 210Z" fill="#4EAAE5"/>
</svg>
`;

const profileIconSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#0D3C5F"/>
</svg>
`;

// Mock data for training sessions
const trainingsData = [
  {
    id: "1",
    type: "Course à pied",
    date: "07/04/2025",
    duration: "30 min",
    intensity: "Modérée",
  },
  {
    id: "2",
    type: "Musculation",
    date: "01/04/2025",
    duration: "45 min",
    intensity: "Intense",
  },
  {
    id: "3",
    type: "Étirements",
    date: "28/03/2025",
    duration: "20 min",
    intensity: "Faible",
  },
  {
    id: "4",
    type: "Course à pied",
    date: "20/03/2025",
    duration: "25 min",
    intensity: "Modérée",
  },
];

interface TrainingItem {
  type: string;
  date: string;
  duration: string;
  intensity: string;
  // Ajoutez d'autres propriétés si nécessaire
}

export default function EntrainementsScreen() {
  const router = useRouter();

  const goToEntrainements = () => {
    router.push("/entrainements");
  };

  // Mock data for training items (replace with your actual data)
  const trainingData: TrainingItem[] = [
    {
      type: "Natation",
      date: "09/04/2025",
      duration: "1h",
      intensity: "Modérée",
    },
    {
      type: "Course à pied",
      date: "10/04/2025",
      duration: "45min",
      intensity: "Intense",
    },
    {
      type: "Musculation",
      date: "11/04/2025",
      duration: "1h15min",
      intensity: "Élevée",
    },
    // ... autres éléments
  ];

  // Render each training item
  const renderTrainingItem = ({ item }: { item: TrainingItem }) => (
    <View style={styles.trainingCard}>
      <Text style={styles.trainingType}>{item.type}</Text>
      <Text style={styles.trainingDate}>
        {item.date} - {item.duration}
      </Text>
      <Text style={styles.trainingIntensity}>Intensité: {item.intensity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <SvgXml xml={logoSvg} width={40} height={40} />
          <Text style={styles.title}>VAS-Y LÉON</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <SvgXml xml={profileIconSvg} width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Add Training Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToEntrainements}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>AJOUTER UN ENTRAÎNEMENT</Text>
        </TouchableOpacity>

        {/* Trainings List */}
        <FlatList
          data={trainingsData}
          renderItem={renderTrainingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Navigation is handled by the TabLayout in _layout.tsx */}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0D3C5F",
    marginLeft: 8,
  },
  profileButton: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0D3C5F",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 16,
  },
  trainingCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  trainingType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  trainingDate: {
    fontSize: 14,
    marginBottom: 4,
    color: "#6B7280",
  },
  trainingIntensity: {
    fontSize: 14,
    color: "#6B7280",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
  KeyboardAvoidingView,
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

// Mock data for conseils
const conseilsMockData = [
  {
    id: 1,
    date: "07/04/2025",
    conseils: {
      brasse: [
        "Bon virage, continue comme ça",
        "Attention au rythme sur les 25 derniers m",
      ],
      papillon: ["Améliorer le départ et la poussée"],
    },
    notes:
      "J'étais un peu stressé avant la brasse mais ça s'est bien passé. Pour le papillon, j'ai ressenti de la fatigue dans les bras à mi-parcours.",
  },
  {
    id: 2,
    date: "01/04/2025",
    conseils: {
      brasse: ["Continue comme ça"],
      papillon: ["Attention à la coulée"],
    },
    notes: "",
  },
  {
    id: 3,
    date: "27/06/2025",
    conseils: {
      brasse: ["Belle progression"],
    },
    notes: "Je me sens plus à l'aise avec la technique de brasse maintenant.",
  },
];

export default function ConseilsScreen() {
  const router = useRouter();

  // State for note editing
  const [notes, setNotes] = useState<string[]>(
    conseilsMockData.map((item) => item.notes || "")
  );

  // Update a specific note
  const updateNote = (index: number, text: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = text;
    setNotes(updatedNotes);
  };

  // Navigation handlers
  const goToIndex = () => {
    router.push("/");
  };

  const goToPerformances = () => {
    router.push("/performances");
  };

  const goToEntrainements = () => {
    router.push("/entrainements");
  };

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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Conseils cards */}
        {conseilsMockData.map((conseil, index) => (
          <View key={conseil.id} style={styles.conseilCard}>
            <Text style={styles.dateText}>{conseil.date}</Text>

            {/* Conseils du coach section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Conseils du coach</Text>

              {/* Brasse conseils */}
              {conseil.conseils.brasse && (
                <View style={styles.styleContainer}>
                  <Text style={styles.styleTitle}>Brasse:</Text>
                  {conseil.conseils.brasse.map((item, idx) => (
                    <View key={idx} style={styles.conseilItem}>
                      <Text style={styles.conseilBullet}>-</Text>
                      <Text style={styles.conseilText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Papillon conseils */}
              {conseil.conseils.papillon && (
                <View style={styles.styleContainer}>
                  <Text style={styles.styleTitle}>Papillon:</Text>
                  {conseil.conseils.papillon.map((item, idx) => (
                    <View key={idx} style={styles.conseilItem}>
                      <Text style={styles.conseilBullet}>-</Text>
                      <Text style={styles.conseilText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Notes section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Mes notes</Text>

              {index === 1 ? (
                // Editable text input for the second card
                <TextInput
                  style={styles.noteInput}
                  placeholder="Écrire ici pour ajouter une nouvelle note..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  value={notes[index]}
                  onChangeText={(text) => updateNote(index, text)}
                />
              ) : (
                // Normal text for other cards
                <Text style={styles.noteText}>{notes[index]}</Text>
              )}
            </View>
          </View>
        ))}

        {/* Bottom padding for scrolling */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Navigation - will be handled by TabLayout */}
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  conseilCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  sectionContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3C5F",
    marginBottom: 8,
  },
  styleContainer: {
    marginBottom: 12,
  },
  styleTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    color: "#4B5563",
  },
  conseilItem: {
    flexDirection: "row",
    paddingLeft: 8,
    marginBottom: 4,
  },
  conseilBullet: {
    marginRight: 8,
    color: "#4B5563",
  },
  conseilText: {
    flex: 1,
    color: "#4B5563",
  },
  noteText: {
    color: "#4B5563",
    lineHeight: 20,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 12,
    color: "#4B5563",
    fontStyle: "italic",
    minHeight: 80,
    textAlignVertical: "top",
  },
  bottomSpace: {
    height: 50,
  },
});

import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { useLeonNavigation } from "@/hooks/navigation";

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

const arrowIconSvg = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#0D3C5F"/>
</svg>
`;

export default function HomeScreen() {
  const { performanceForm, conseils, performances, entrainements } =
    useLeonNavigation();
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
        {/* Add Performance Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={performanceForm}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>AJOUTER UN NOUVEAU TEMPS</Text>
        </TouchableOpacity>

        {/* Performances Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={performances}
            activeOpacity={0.6}
          >
            <Text style={styles.sectionTitle}>Performances</Text>
            <SvgXml xml={arrowIconSvg} width={20} height={20} />
          </TouchableOpacity>

          {/* Performance Card 1 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Régionale - Cholet (07/04/2025)
            </Text>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>100m Brasse: </Text>
              <Text style={styles.performanceValue}>1:18.35</Text>
              <View style={styles.qualifiedBadge}>
                <Text style={styles.qualifiedText}>qualifié</Text>
              </View>
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>50m Papillon: </Text>
              <Text style={styles.performanceValue}>0:34.76</Text>
            </View>
          </View>

          {/* Performance Card 2 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Interrégionale - Nantes (12/03/2025)
            </Text>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>50m Nage Libre: </Text>
              <Text style={styles.performanceValue}>0:27.41</Text>
            </View>
          </View>
        </View>

        {/* Advices Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={conseils}
            activeOpacity={0.6}
          >
            <Text style={styles.sectionTitle}>Derniers conseils</Text>
            <SvgXml xml={arrowIconSvg} width={20} height={20} />
          </TouchableOpacity>

          {/* Advice Card 1 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>07/04/2025</Text>
            <Text style={styles.adviceText}>
              1 conseil du coach - "Brasse..."
            </Text>
            <Text style={styles.adviceText}>
              1 note personnelle - "J'étais un peu stressé..."
            </Text>
          </View>

          {/* Advice Card 2 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>01/03/2025</Text>
            <Text style={styles.adviceText}>
              1 conseil du coach - "Brasse..."
            </Text>
            <Text style={styles.adviceText}>Pas de note personnelle</Text>
          </View>
        </View>

        {/* Trainings Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={entrainements}
            activeOpacity={0.6}
          >
            <Text style={styles.sectionTitle}>Derniers entraînements</Text>
            <SvgXml xml={arrowIconSvg} width={20} height={20} />
          </TouchableOpacity>

          {/* Training Card 1 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Course à pied (07/04/2025)</Text>
            <View style={styles.trainingRow}>
              <Text style={styles.trainingTime}>30 min</Text>
              <View style={styles.intensityBadgeMedium}>
                <Text style={styles.intensityText}>Intensité: Modérée</Text>
              </View>
            </View>
          </View>

          {/* Training Card 2 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Musculation (01/04/2025)</Text>
            <View style={styles.trainingRow}>
              <Text style={styles.trainingTime}>45 min</Text>
              <View style={styles.intensityBadgeHigh}>
                <Text style={styles.intensityText}>Intensité: Intense</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Space at the bottom for navigation bar */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 200,
    resizeMode: "contain",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
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
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D3C5F",
    marginRight: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  performanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  performanceLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0D3C5F",
  },
  performanceValue: {
    fontSize: 14,
    color: "#333333",
    marginLeft: 4,
  },
  qualifiedBadge: {
    backgroundColor: "#E8F5E9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: "auto",
  },
  qualifiedText: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "500",
  },
  adviceText: {
    fontSize: 14,
    color: "#333333",
    marginVertical: 2,
  },
  trainingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  trainingTime: {
    fontSize: 14,
    color: "#333333",
    marginRight: 8,
  },
  intensityBadgeMedium: {
    backgroundColor: "#FFF8E1",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  intensityBadgeHigh: {
    backgroundColor: "#FFEBEE",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  intensityText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#BF360C",
  },
  bottomSpace: {
    height: 20,
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navItemText: {
    fontSize: 12,
    marginTop: 4,
    color: "#8E8E93",
  },
  navItemTextActive: {
    fontSize: 12,
    marginTop: 4,
    color: "#0D3C5F",
    fontWeight: "500",
  },
});

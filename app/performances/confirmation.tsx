import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useRoute, ParamListBase, RouteProp } from "@react-navigation/native";
import { PerformanceData, PerformanceConfirmationParams, RootStackParamList } from "@/models/performances";
import { useColorScheme } from "@/hooks/useColorScheme";
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

const checkmarkIconSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>
`;

type PerformanceConfirmationRouteProp = RouteProp<
  RootStackParamList,
  "PerformanceConfirmation"
>;

// Valeur par défaut pour PerformanceData
const defaultPerformance: PerformanceData = {
  time: { minutes: 0, seconds: 0, centiseconds: 0 }, // Valeurs par défaut sûres
  poolLength: "",
  swimStyle: "",
  distance: 0,
  date: "",
  location: "",
  eventType: "",
};

export default function PerformanceConfirmationScreen() {
  const router = useRouter();
  const route = useRoute<PerformanceConfirmationRouteProp>();
  const colorScheme = useColorScheme();

  // Récupérer et désérialiser les données de performance avec une valeur par défaut sûre
  const performance: PerformanceData = route.params?.performance
    ? JSON.parse(route.params.performance) // Parse uniquement si performance existe
    : defaultPerformance;

// Format time for display (performance est maintenant garanti d'avoir une structure)
const formattedTime = `${
performance.time?.minutes > 0 ? `${performance.time.minutes}:` : ""
}${String(performance.time?.seconds).padStart(2, "0")}.${String(
performance.time?.centiseconds
).padStart(2, "0")}`;


  // Mock reference times for the demo
  const referenceTime = "25.89";
  const referenceTimeDiff = "+0.53";
  const qualifyingTime = "27.50";
  const qualifyingTimeDiff = "-1.08";
  const isQualified = true;

  const handleContinue = () => {
    // Navigate back to performances list using the custom hook
    router.push("/");
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

      <View style={styles.container}>
        {/* Success Message */}
        <View style={styles.successContainer}>
          <View style={styles.checkmarkCircle}>
            <SvgXml
              xml={checkmarkIconSvg}
              width={48}
              height={48}
              color="#22C55E"
            />
          </View>
          <Text style={styles.successTitle}>
            Votre performance est enregistrée
          </Text>
          <Text style={styles.successMessage}>
            Vous pouvez la retrouver dans l'historique de vos performances.
          </Text>
        </View>

        {/* Performance Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.swimTypeTitle}>{`${performance.distance}m ${
                performance.swimStyle === "NL"
                  ? "Nage Libre"
                  : performance.swimStyle
              }`}</Text>
              <Text
                style={styles.summarySubtitle}
              >{`bassin ${performance.poolLength}`}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.summaryDate}>{performance.date}</Text>
              <Text style={styles.summaryType}>{performance.eventType}</Text>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Temps réalisé</Text>
            <Text style={styles.timeValue}>{formattedTime}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Temps de référence</Text>
              <Text style={styles.statValue}>{referenceTime}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Écart</Text>
              <Text style={styles.statValueNegative}>{referenceTimeDiff}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Temps qualificatif</Text>
              <Text style={styles.statValue}>{qualifyingTime}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Écart</Text>
              <Text style={styles.statValuePositive}>
                {qualifyingTimeDiff} {isQualified && "- qualifié"}
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUER</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  checkmarkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  swimTypeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3C5F",
  },
  summarySubtitle: {
    fontSize: 14,
    color: "#666666",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  summaryDate: {
    fontSize: 14,
    color: "#666666",
  },
  summaryType: {
    fontSize: 14,
    color: "#666666",
  },
  timeContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  statsContainer: {
    gap: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  statValuePositive: {
    fontSize: 14,
    fontWeight: "500",
    color: "#22C55E",
  },
  statValueNegative: {
    fontSize: 14,
    fontWeight: "500",
    color: "#EF4444",
  },
  continueButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

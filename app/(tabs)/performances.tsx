import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRoute, ParamListBase, RouteProp } from "@react-navigation/native";
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

const checkIconSvg = `
<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
</svg>
`;

const chevronDownIconSvg = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>
`;

const chevronRightIconSvg = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
</svg>
`;

export default function PerformancesScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const goToPerformances = () => {
    router.push("/performances/form");
  };

  const goToPerformanceDetails = (performanceId: string) => {
    router.push({
      pathname: "/performances/[id]",
      params: { id: performanceId },
    });
  };

  // Toggle competition expanded state
  const [expandedCompetition, setExpandedCompetition] = React.useState<
    string | null
  >("reg-cholet");

  const toggleCompetition = (id: any) => {
    if (expandedCompetition === id) {
      setExpandedCompetition(null);
    } else {
      setExpandedCompetition(id);
    }
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
        {/* Add Performance Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToPerformances}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>AJOUTER UN NOUVEAU TEMPS</Text>
        </TouchableOpacity>

        {/* Competitions List */}
        <View style={styles.competitionsContainer}>
          {/* Competition 1 - Expanded by default */}
          <View style={styles.competitionCard}>
            <View style={styles.competitionContent}>
              <Text style={styles.competitionTitle}>Régionale - Cholet</Text>
              <Text style={styles.competitionDate}>07/04/2025</Text>

              <View style={styles.competitionStats}>
                <Text style={styles.statText}>3 performances enregistrées</Text>
                <Text style={styles.statText}>
                  1 temps qualificatif atteint
                </Text>
              </View>

              {expandedCompetition === "reg-cholet" && (
                <View style={styles.performancesList}>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceText}>
                      100m brasse - bassin 50m - 1:18:35
                    </Text>
                    <SvgXml
                      xml={checkIconSvg}
                      width={16}
                      height={16}
                      color="#22C55E"
                    />
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceText}>
                      50m brasse - bassin 50m - 0:38:725
                    </Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceText}>
                      50m dos - bassin 50m - 0:40:377
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleCompetition("reg-cholet")}
            >
              <SvgXml
                xml={
                  expandedCompetition === "reg-cholet"
                    ? chevronDownIconSvg
                    : chevronRightIconSvg
                }
                width={20}
                height={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Competition 2 */}
          <View style={styles.competitionCard}>
            <View style={styles.competitionContent}>
              <Text style={styles.competitionTitle}>
                Interrégionale - Nantes
              </Text>
              <Text style={styles.competitionDate}>12/03/2025</Text>

              <View style={styles.competitionStats}>
                <Text style={styles.statText}>5 performances enregistrées</Text>
                <Text style={styles.statText}>
                  2 temps qualificatifs atteints
                </Text>
              </View>

              {expandedCompetition === "interreg-nantes" && (
                <View style={styles.performancesList}>
                  {/* Performance items would be here */}
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleCompetition("interreg-nantes")}
            >
              <SvgXml
                xml={
                  expandedCompetition === "interreg-nantes"
                    ? chevronDownIconSvg
                    : chevronRightIconSvg
                }
                width={20}
                height={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Competition 3 */}
          <View style={styles.competitionCard}>
            <View style={styles.competitionContent}>
              <Text style={styles.competitionTitle}>
                Entraînement chronométré - Club
              </Text>
              <Text style={styles.competitionDate}>01/03/2025</Text>

              <View style={styles.competitionStats}>
                <Text style={styles.statText}>2 performances enregistrées</Text>
                <Text style={styles.statText}>
                  0 temps qualificatif atteint
                </Text>
              </View>

              {expandedCompetition === "entrainement-club" && (
                <View style={styles.performancesList}>
                  {/* Performance items would be here */}
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleCompetition("entrainement-club")}
            >
              <SvgXml
                xml={
                  expandedCompetition === "entrainement-club"
                    ? chevronDownIconSvg
                    : chevronRightIconSvg
                }
                width={20}
                height={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Competition 4 */}
          <View style={styles.competitionCard}>
            <View style={styles.competitionContent}>
              <Text style={styles.competitionTitle}>
                Départementale - Angers
              </Text>
              <Text style={styles.competitionDate}>22/01/2025</Text>

              <View style={styles.competitionStats}>
                <Text style={styles.statText}>4 performances enregistrées</Text>
                <Text style={styles.statText}>
                  1 temps qualificatif atteint
                </Text>
              </View>

              {expandedCompetition === "dep-angers" && (
                <View style={styles.performancesList}>
                  {/* Performance items would be here */}
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleCompetition("dep-angers")}
            >
              <SvgXml
                xml={
                  expandedCompetition === "dep-angers"
                    ? chevronDownIconSvg
                    : chevronRightIconSvg
                }
                width={20}
                height={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Space at the bottom for navigation bar */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Navigation is handled by the TabLayout in _layout.tsx */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
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
    padding: 16,
  },
  addButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  competitionsContainer: {
    marginBottom: 20,
  },
  competitionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    overflow: "hidden",
  },
  competitionContent: {
    padding: 16,
  },
  competitionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  competitionDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  competitionStats: {
    marginTop: 8,
  },
  statText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  performancesList: {
    marginTop: 12,
    paddingLeft: 8,
  },
  performanceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  performanceText: {
    fontSize: 14,
    color: "#333333",
    marginRight: 8,
  },
  expandButton: {
    alignItems: "flex-end",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  bottomSpace: {
    height: 20,
  },
});

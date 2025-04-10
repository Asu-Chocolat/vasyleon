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
  Animated,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";
// import  from @/models/performance;
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

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

const calendarIconSvg = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
`;

const plusIconSvg = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
</svg>
`;

const minusIconSvg = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
</svg>
`;

export default function AddPerformanceScreen() {
  // const colorScheme = useColorScheme();
  // const navigation = useNavigation();

  // State for form inputs
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [centiseconds, setCentiseconds] = useState("");
  const [poolLength, setPoolLength] = useState("25m");
  const [swimStyle, setSwimStyle] = useState("NL");
  const [distance, setDistance] = useState("25");
  const [showLongDistances, setShowLongDistances] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("Compétition");
  const [notes, setNotes] = useState("");

  // Animation for expanding distances
  const [expandAnim] = useState(new Animated.Value(0));

  const toggleLongDistances = () => {
    const newValue = !showLongDistances;
    setShowLongDistances(newValue);

    Animated.timing(expandAnim, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const expandHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50], // Adjust based on your row height
  });

  const handleSave = async () => {
    // Create performance object
    const performance = {
      time: {
        minutes: parseInt(minutes) || 0,
        seconds: parseInt(seconds) || 0,
        centiseconds: parseInt(centiseconds) || 0,
      },
      poolLength,
      swimStyle,
      distance: parseInt(distance),
      date,
      location,
      eventType,
      notes,
      createdAt: new Date(), // Ajouter un timestamp de création
      // Vous pourriez également vouloir lier la performance à un utilisateur authentifié ici
      // userId: auth.currentUser?.uid, // Si vous utilisez l'authentification
    };

    try {
      // Ajouter un nouveau document à la collection 'performances'
      const docRef = await addDoc(collection(db, "performances"), performance);
      console.log("Performance enregistrée avec l'ID: ", docRef.id);
      console.log("Performance avant navigation:", performance);
      // Naviguer vers l'écran de confirmation
      router.push({
        pathname: "/performances/confirmation",
        params: { performance: JSON.stringify(performance) },
      });
    } catch (error: any) {
      console.error(
        "Erreur lors de l'enregistrement de la performance: ",
        error.message
      );
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  console.log("Performance sauvée :", performance);

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Time Input */}
          <View style={styles.formSection}>
            <View style={styles.timeInputContainer}>
              <View style={styles.timeInput}>
                <Text style={styles.timeInputLabel}>minutes</Text>
                <TextInput
                  style={styles.timeInputField}
                  placeholder="00"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={minutes}
                  onChangeText={setMinutes}
                />
              </View>
              <Text style={styles.timeSeparator}>:</Text>
              <View style={styles.timeInput}>
                <Text style={styles.timeInputLabel}>secondes</Text>
                <TextInput
                  style={styles.timeInputField}
                  placeholder="00"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={seconds}
                  onChangeText={setSeconds}
                />
              </View>
              <Text style={styles.timeSeparator}>:</Text>
              <View style={styles.timeInput}>
                <Text style={styles.timeInputLabel}>centièmes</Text>
                <TextInput
                  style={styles.timeInputField}
                  placeholder="00"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={centiseconds}
                  onChangeText={setCentiseconds}
                />
              </View>
            </View>
          </View>

          {/* Pool Length Selection */}
          <View style={styles.formSection}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.buttonOption,
                  poolLength === "25m" && styles.buttonOptionSelected,
                  { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                ]}
                onPress={() => setPoolLength("25m")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    poolLength === "25m" && styles.buttonTextSelected,
                  ]}
                >
                  25m
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonOption,
                  poolLength === "50m" && styles.buttonOptionSelected,
                  { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                ]}
                onPress={() => setPoolLength("50m")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    poolLength === "50m" && styles.buttonTextSelected,
                  ]}
                >
                  50m
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Swim Style Selection */}
          <View style={styles.formSection}>
            <View style={styles.swimStyleGrid}>
              <TouchableOpacity
                style={[
                  styles.swimStyleButton,
                  swimStyle === "NL" && styles.buttonOptionSelected,
                ]}
                onPress={() => setSwimStyle("NL")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    swimStyle === "NL" && styles.buttonTextSelected,
                  ]}
                >
                  NL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swimStyleButton,
                  swimStyle === "DOS" && styles.buttonOptionSelected,
                ]}
                onPress={() => setSwimStyle("DOS")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    swimStyle === "DOS" && styles.buttonTextSelected,
                  ]}
                >
                  DOS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swimStyleButton,
                  swimStyle === "BRASSE" && styles.buttonOptionSelected,
                ]}
                onPress={() => setSwimStyle("BRASSE")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    swimStyle === "BRASSE" && styles.buttonTextSelected,
                  ]}
                >
                  BRASSE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swimStyleButton,
                  swimStyle === "4N" && styles.buttonOptionSelected,
                ]}
                onPress={() => setSwimStyle("4N")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    swimStyle === "4N" && styles.buttonTextSelected,
                  ]}
                >
                  4N
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swimStyleButton,
                  swimStyle === "PAP" && styles.buttonOptionSelected,
                ]}
                onPress={() => setSwimStyle("PAP")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    swimStyle === "PAP" && styles.buttonTextSelected,
                  ]}
                >
                  PAP
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Distance Selection */}
          <View style={styles.formSection}>
            <View style={styles.distanceGrid}>
              <TouchableOpacity
                style={[
                  styles.distanceButton,
                  distance === "25" && styles.buttonOptionSelected,
                ]}
                onPress={() => setDistance("25")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    distance === "25" && styles.buttonTextSelected,
                  ]}
                >
                  25
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.distanceButton,
                  distance === "50" && styles.buttonOptionSelected,
                ]}
                onPress={() => setDistance("50")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    distance === "50" && styles.buttonTextSelected,
                  ]}
                >
                  50
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.distanceButton,
                  distance === "100" && styles.buttonOptionSelected,
                ]}
                onPress={() => setDistance("100")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    distance === "100" && styles.buttonTextSelected,
                  ]}
                >
                  100
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.distanceButton,
                  distance === "200" && styles.buttonOptionSelected,
                ]}
                onPress={() => setDistance("200")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    distance === "200" && styles.buttonTextSelected,
                  ]}
                >
                  200
                </Text>
              </TouchableOpacity>

              {/* Plus/Minus button that toggles to show long distances */}
              {!showLongDistances ? (
                <TouchableOpacity
                  style={styles.distanceButton}
                  onPress={toggleLongDistances}
                >
                  <SvgXml
                    xml={plusIconSvg}
                    width={20}
                    height={20}
                    color="#4A5568"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.distanceButton,
                    distance === "400" && styles.buttonOptionSelected,
                  ]}
                  onPress={() => {
                    setDistance("400");
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      distance === "400" && styles.buttonTextSelected,
                    ]}
                  >
                    400
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Animated row for long distances */}
            <Animated.View
              style={[
                styles.longDistanceRow,
                { height: expandHeight, overflow: "hidden" },
              ]}
            >
              <View style={styles.distanceGrid}>
                <TouchableOpacity
                  style={[
                    styles.distanceButton,
                    distance === "800" && styles.buttonOptionSelected,
                  ]}
                  onPress={() => setDistance("800")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      distance === "800" && styles.buttonTextSelected,
                    ]}
                  >
                    800
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.distanceButton,
                    distance === "1500" && styles.buttonOptionSelected,
                  ]}
                  onPress={() => setDistance("1500")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      distance === "1500" && styles.buttonTextSelected,
                    ]}
                  >
                    1500
                  </Text>
                </TouchableOpacity>
                <View style={styles.distanceButton} />
                <View style={styles.distanceButton} />
                <TouchableOpacity
                  style={styles.distanceButton}
                  onPress={toggleLongDistances}
                >
                  <SvgXml
                    xml={minusIconSvg}
                    width={20}
                    height={20}
                    color="#4A5568"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>

          {/* Date Selection - No label */}
          <View style={styles.formSection}>
            <TouchableOpacity style={styles.datePickerButton}>
              <Text style={styles.datePickerText}>{date}</Text>
              <SvgXml
                xml={calendarIconSvg}
                width={20}
                height={20}
                color="#4A5568"
              />
            </TouchableOpacity>
          </View>

          {/* Location Input - No label */}
          <View style={styles.formSection}>
            <TextInput
              style={styles.textInput}
              placeholder="[Lieu de la compétition]"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Event Type Selection */}
          <View style={styles.formSection}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.buttonOption,
                  eventType === "Compétition" && styles.buttonOptionSelected,
                  { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                ]}
                onPress={() => setEventType("Compétition")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    eventType === "Compétition" && styles.buttonTextSelected,
                  ]}
                >
                  Compétition
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonOption,
                  eventType === "Entraînement" && styles.buttonOptionSelected,
                  { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                ]}
                onPress={() => setEventType("Entraînement")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    eventType === "Entraînement" && styles.buttonTextSelected,
                  ]}
                >
                  Entraînement
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Notes Input */}
          <View style={styles.formSection}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Note / ressenti</Text>
              <TextInput
                style={styles.textAreaInput}
                placeholder="[Zone de texte]"
                multiline={true}
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>ENREGISTRER</Text>
          </TouchableOpacity>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>

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
  },
  scrollView: {
    flexGrow: 1, // Important for ScrollView within KeyboardAvoidingView
    padding: 16,
  },
  formSection: {
    marginBottom: 20,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  timeInput: {
    flex: 1,
    alignItems: "center",
  },
  timeInputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  timeInputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 16,
    width: 60,
  },
  timeSeparator: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonOptionSelected: {
    backgroundColor: "#0D3C5F",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  buttonTextSelected: {
    color: "#FFFFFF",
  },
  swimStyleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  swimStyleButton: {
    width: 60,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  distanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  distanceButton: {
    width: 50,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  longDistanceRow: {
    marginTop: 10,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  datePickerText: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  fieldColumn: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
    height: 100,
  },
  saveButton: {
    backgroundColor: "#0D3C5F",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSpace: {
    height: 50, // Adjust as needed for bottom navigation bar
  },
});


import React, { useState } from 'react';
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
  KeyboardAvoidingView
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
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

const calendarIconSvg = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
`;

export default function AjouterEntrainementScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // State for form inputs
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('Modérée');
  const [notes, setNotes] = useState('');
  
  const handleSave = () => {
    // Create training object
    const training = {
      type: activityType,
      date,
      duration,
      intensity,
      notes
    };
    
    console.log('Saving training:', training);
    // Navigate back to trainings list
    router.push('/performances');
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

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Date Input */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.datePickerButton}>
              <Text style={styles.inputText}>{date}</Text>
              <SvgXml xml={calendarIconSvg} width={20} height={20} color="#4A5568" />
            </TouchableOpacity>
          </View>
          
          {/* Activity Type Input */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Type d'activité</Text>
            <TextInput
              style={styles.textInput}
              placeholder="[Type d'activité]"
              value={activityType}
              onChangeText={setActivityType}
            />
          </View>
          
          {/* Duration Input */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Durée</Text>
            <TextInput
              style={styles.textInput}
              placeholder="[Durée]"
              value={duration}
              onChangeText={setDuration}
            />
          </View>
          
          {/* Intensity Selection */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Intensité</Text>
            <View style={styles.intensityContainer}>
              <TouchableOpacity 
                style={[
                  styles.intensityButton, 
                  intensity === 'Faible' && styles.intensityButtonSelected,
                  { backgroundColor: intensity === 'Faible' ? '#FFFFFF' : '#F3F4F6' }
                ]}
                onPress={() => setIntensity('Faible')}
              >
                <Text style={styles.intensityButtonText}>Faible</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.intensityButton, 
                  intensity === 'Modérée' && styles.intensityButtonSelected,
                  { backgroundColor: intensity === 'Modérée' ? '#000000' : '#FFFFFF' }
                ]}
                onPress={() => setIntensity('Modérée')}
              >
                <Text style={[
                  styles.intensityButtonText, 
                  intensity === 'Modérée' && { color: '#FFFFFF' }
                ]}>Modérée</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.intensityButton, 
                  intensity === 'Intense' && styles.intensityButtonSelected
                ]}
                onPress={() => setIntensity('Intense')}
              >
                <Text style={styles.intensityButtonText}>Intense</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Notes Input */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Notes / Observations</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="[Zone de texte]"
              multiline={true}
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
          
          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>ENREGISTRER</Text>
          </TouchableOpacity>
          
          {/* Bottom spacing */}
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
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D3C5F',
    marginLeft: 8,
  },
  profileButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0D3C5F',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4B5563',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputText: {
    fontSize: 16,
    color: '#374151',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    height: 120,
    textAlignVertical: 'top',
  },
  intensityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
  },
  intensityButtonSelected: {
    borderColor: '#111111',
  },
  intensityButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  saveButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 50,
  },
});

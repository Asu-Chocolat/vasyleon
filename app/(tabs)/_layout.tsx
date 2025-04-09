import { Tabs } from "expo-router";
import React from "react";
import { Platform, Image } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Définition du type pour le paramètre tabBarIcon
type TabBarIconProps = {
  color: string;
  size: number;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Image 
              source={require("@/assets/images/home.png")}
              style={{ 
                width: 28,
                resizeMode: 'contain'
               }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="performances"
        options={{
          title: "Performances",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Image 
              source={require("@/assets/images/performances.png")}
              style={{ 
                width: 28,
                resizeMode: 'contain'
               }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="conseils"
        options={{
          title: "Conseils",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Image 
              source={require("@/assets/images/conseils.png")}
              style={{ 
                width: 28,
                resizeMode: 'contain'
               }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="entrainements"
        options={{
          title: "Entrainements",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Image 
              source={require("@/assets/images/entrainements.png")}
              style={{ 
                width: 28,
                resizeMode: 'contain'
               }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

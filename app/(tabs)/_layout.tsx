import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D3C5F",
        tabBarStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/home.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="performances"
        options={{
          title: "Performances",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/performances.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="conseils"
        options={{
          title: "Conseils",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/conseils.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="entrainements"
        options={{
          title: "Entrainements",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/entrainements.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Onglets principaux */}
        <Stack.Screen name="(tabs)" />

        {/* Écrans hors onglets */}
        <Stack.Screen
          name="(stack)/performances/form"
          options={{ title: "Ajouter une performance", headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/performances/[id]"
          options={{ title: "Détails de la performance", headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/performances/confirmation"
          options={{ title: "Confirmation", headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/entrainements/form"
          options={{ title: "Ajouter un entraînement", headerShown: true }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

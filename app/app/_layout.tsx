import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    codaBold: require("../assets/fonts/Coda-ExtraBold.ttf"),
    codaRegular: require("../assets/fonts/Coda-Regular.ttf"),
    nunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    nunitoRegular: require("../assets/fonts/Nunito-Regular.ttf"),
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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="login/index"
          options={{
            header: () => <></>,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

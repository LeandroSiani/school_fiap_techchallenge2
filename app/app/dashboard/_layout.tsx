import { useFonts } from "expo-font";
import { SplashScreen, Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";

export default function TabLayout() {
  const [loaded] = useFonts({
    codaBold: require("../../assets/fonts/Coda-ExtraBold.ttf"),
    codaRegular: require("../../assets/fonts/Coda-Regular.ttf"),
    nunitoBold: require("../../assets/fonts/Nunito-Bold.ttf"),
    nunitoRegular: require("../../assets/fonts/Nunito-Regular.ttf"),
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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="createPost/index" />
    </Stack>
  );
}

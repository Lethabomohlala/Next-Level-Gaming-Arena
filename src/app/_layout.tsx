import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// Prevent auto-hiding the splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Map custom font family names to the exact file paths
    "Inter_24pt-Bold": require("../../assets/fonts/Inter/static/Inter_24pt-Bold.ttf"),
    "Inter_28pt-Bold": require("../../assets/fonts/Inter/static/Inter_28pt-Bold.ttf"),
    "Inter_18pt-Light": require("../../assets/fonts/Inter/static/Inter_18pt-Light.ttf"),
    "Inter_24pt-Light": require("../../assets/fonts/Inter/static/Inter_24pt-Light.ttf"),
    // Add any other weights you plan to use:
    "Inter_24pt-Regular": require("../../assets/fonts/Inter/static/Inter_24pt-Regular.ttf"),
    "Inter_24pt-SemiBold": require("../../assets/fonts/Inter/static/Inter_24pt-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

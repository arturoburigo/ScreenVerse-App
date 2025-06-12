import { Slot, useRouter, usePathname } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { ActivityIndicator, View, SafeAreaView } from "react-native";
import { tokenCache } from "./storage/tokenCache";
import BottomNavbar from "@/components/Navbar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

// Prevent the splash screen from disappearing automatically
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || isLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/auth");
    } else {
      router.replace("/public");
    }
  }, [isSignedIn]);

  const isAuthRoute =
    pathname.startsWith("/auth") ||
    pathname === "/search" ||
    pathname === "/myspace";

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <ActivityIndicator size="large" color="#B75A5A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={{ flex: 1 }}>
        <Slot />
        {isSignedIn && isAuthRoute && <BottomNavbar />}
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}

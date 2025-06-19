import { Slot, useRouter, usePathname } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { tokenCache } from "./storage/tokenCache";
import BottomNavbar from "@/components/Navbar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

// Prevent the splash screen from disappearing automatically
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [activeTab, setActiveTab] = useState(pathname);

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || isLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (!isLoaded || !fontsLoaded) return;

    if (isSignedIn) {
      router.replace("/home");
    } else {
      router.replace("/public");
    }
  }, [isSignedIn, isLoaded, fontsLoaded, isInitialRender]);

  const isAuthRoute =
    pathname === "/home" ||
    pathname === "/search" ||
    pathname === "/myspace" ||
    pathname === "/profile";

  if (!isLoaded || !fontsLoaded) {
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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }} edges={["top"]}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }} edges={["bottom"]}>
          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1 }}>
            <Slot />
            {isSignedIn && isAuthRoute && (
              <View style={{ backgroundColor: "#121212" }}>
                <SafeAreaView edges={["bottom"]}>
                  <BottomNavbar activeRoute={activeTab} onTabChange={setActiveTab} />
                </SafeAreaView>
              </View>
            )}
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  if (!PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.error("Missing Clerk Publishable Key");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <ActivityIndicator size="large" color="#B75A5A" />
      </View>
    );
  }

  return (
    <ClerkProvider
      publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

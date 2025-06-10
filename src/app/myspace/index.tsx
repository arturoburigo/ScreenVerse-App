import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Button from "@/components/Button";
import { Header } from "@/components/Header";

export default function MySpace() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Header />



      {/* <Text style={styles.text}>My Space</Text>
      <Text style={styles.subtext}>Welcome, {user?.firstName}!</Text>
      <Button icon="exit" title="Sair" onPress={() => signOut()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#121212",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtext: {
    fontSize: 18,
    color: "#676D75",
  },
});

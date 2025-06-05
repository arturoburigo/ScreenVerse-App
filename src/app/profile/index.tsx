import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Header } from "@/components/Header";
import Button from "@/components/Button";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Text style={styles.subtext}>Welcome, {user?.firstName}!</Text>
      <Button icon="exit" title="Sair" onPress={() => signOut()} />
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

import { Header } from "@/components/Header";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Search() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Search Page</Text>
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
  },
});

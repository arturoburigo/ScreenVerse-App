import { Header } from "@/components/Header";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "@/components/SearchBar";

export default function Search() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar value={search} onChangeText={setSearch} />
      <Text style={styles.text}>Search Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

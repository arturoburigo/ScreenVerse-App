import { View, Text } from "react-native";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import movies from "@/utils/movies.json";
import React from "react";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Rate() {
  const { id } = useLocalSearchParams();
  const movie = movies.find((m) => String(m.id) === id);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Avalie: {movie?.title}</Text>
      <Navbar />
    </View>
  );
}

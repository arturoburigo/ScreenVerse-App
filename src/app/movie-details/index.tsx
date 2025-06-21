import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import movies from "@/utils/movies.json";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import BottomNavbar from "@/components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const movie = movies.find((m) => String(m.id) === String(id));

  // Busca seasons e episodes do primeiro source, se existir
  const seasons = movie?.sources?.[0]?.seasons;
  const episodes = movie?.sources?.[0]?.episodes;

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Filme não encontrado.</Text>
      </View>
    );
  }

  const saveWatchlist = async () => {
    try {
      const existingWatchlist = JSON.parse(
        (await AsyncStorage.getItem("watchlistMovies")) || "[]"
      );

      // Verifica se o filme já está na watchlist para não duplicar
      const isAlreadyInWatchlist = existingWatchlist.some(
        (item: any) => item.id === movie?.id
      );

      if (isAlreadyInWatchlist) {
        console.log("Filme já está na watchlist.");
        router.push("/myspace"); // Apenas navega se já existir
        return;
      }

      const addWatchlist = {
        id: movie?.id,
        title: movie?.title,
        poster: movie?.posterMedium,
        type: movie?.type,
        watched: false, // Adiciona o estado 'watched'
      };

      const updatedWatchlist = [...existingWatchlist, addWatchlist];

      // Salva na chave correta: "watchlistMovies"
      await AsyncStorage.setItem(
        "watchlistMovies",
        JSON.stringify(updatedWatchlist)
      );

      router.push("/myspace");
    } catch (error) {
      console.error("Erro ao salvar na watchlist:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: movie.posterMedium }} style={styles.poster} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.title}>{movie.title}</Text>
            {seasons ? (
              <Text style={styles.info}>{seasons} seasons</Text>
            ) : null}
            <Text style={styles.info}>{movie.year}</Text>
            {episodes ? <Text style={styles.info}>{episodes} eps</Text> : null}
            <Text style={styles.info}>{movie.genre_names?.join(", ")}</Text>
            <Text style={styles.imdb}>IMDb : {movie.user_rating}</Text>
            <Text style={styles.platform}>{movie.sources?.[0]?.name}</Text>
          </View>
        </View>
        <Text style={styles.overview}>{movie.plot_overview}</Text>
        <Text style={styles.section}>Relacionados</Text>
        <View style={styles.relatedRow}>
          {movie.similar_titles?.slice(0, 4).map((relatedId, idx) => {
            const related = movies.find((m) => m.id === relatedId);
            if (!related) return null;
            return (
              <Image
                key={idx}
                source={{ uri: related.posterMedium }}
                style={styles.relatedImg}
              />
            );
          })}
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.watchlistBtn}>
            <Text style={styles.btnText} onPress={saveWatchlist}>
              Watchlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rateBtn}
            onPress={() => {
              router.push({
                pathname: "../rate",
                params: { id: movie.id, title: movie.title },
              });
            }}
          >
            <Text style={styles.btnText}>Rate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}

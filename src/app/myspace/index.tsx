import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Header } from "@/components/Header";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router, useFocusEffect } from "expo-router";

export default function MySpace() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [activeTab, setActiveTab] = useState("Watchlist");
  const [activeFilter, setActiveFilter] = useState("Filmes");
  const [ratedMovies, setRatedMovies] = useState<any[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchLists = async () => {
        try {
          const savedRated = JSON.parse(
            (await AsyncStorage.getItem("ratedMovies")) || "[]"
          );
          setRatedMovies(savedRated);

          const savedWatchlist = JSON.parse(
            (await AsyncStorage.getItem("watchlistMovies")) || "[]"
          );
          setWatchlistMovies(savedWatchlist);
        } catch (error) {
          console.error("Erro ao buscar listas:", error);
        }
      };
      fetchLists();
    }, [])
  );

  const deleteReview = async (idRate: string) => {
    try {
      const updatedReviews = ratedMovies.filter(
        (movie: any) => movie.idRate !== idRate
      );
      await AsyncStorage.setItem("ratedMovies", JSON.stringify(updatedReviews));
      setRatedMovies(updatedReviews);
    } catch (error) {
      console.error("Erro ao apagar avaliação:", error);
    }
  };

  const editReview = (id: string, idRate?: string) => {
    router.push({ pathname: "/rate", params: { id, idRate } });
  };

  const deleteFromWatchlist = async (id: string) => {
    try {
      const updatedWatchlist = watchlistMovies.filter((movie: any) => movie.id !== id);
      await AsyncStorage.setItem(
        "watchlistMovies",
        JSON.stringify(updatedWatchlist)
      );
      setWatchlistMovies(updatedWatchlist);
    } catch (error) {
      console.error("Erro ao remover da watchlist:", error);
    }
  };

  const markAsWatched = async (id: string) => {
    try {
      const updatedWatchlist = watchlistMovies.map((movie: any) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      );
      await AsyncStorage.setItem(
        "watchlistMovies",
        JSON.stringify(updatedWatchlist)
      );
      setWatchlistMovies(updatedWatchlist);
    } catch (error) {
      console.error("Erro ao marcar como assistido:", error);
    }
  };

  const navButtons = ["Watchlist", "Rated"];
  const filterButtons = ["Filmes", "Séries"];

  const filteredRatedMovies = ratedMovies.filter((movie: any) => {
    if (activeFilter === "Filmes") return movie.type === "movie";
    if (activeFilter === "Séries") return movie.type === "series";
    return false;
  });

  const filteredWatchlistMovies = watchlistMovies.filter((movie: any) => {
    if (activeFilter === "Filmes") return movie.type === "movie";
    if (activeFilter === "Séries") return movie.type === "series";
    return false;
  });

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.containerNav}>
        {navButtons.map((title) => (
          <TouchableOpacity
            key={title}
            style={[
              styles.buttonNav,
              activeTab === title ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setActiveTab(title)}
          >
            <Text
              style={[
                styles.buttonText,
                activeTab === title ? styles.activeText : styles.inactiveText,
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.containerNav}>
        {filterButtons.map((title) => (
          <TouchableOpacity
            key={title}
            style={[
              styles.buttonNav,
              activeFilter === title
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setActiveFilter(title)}
          >
            <Text
              style={[
                styles.buttonText,
                activeFilter === title
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentArea}>
        {activeTab === "Rated" ? (
          <ScrollView>
            {filteredRatedMovies.map((movie: any) => (
              <View key={movie.idRate} style={styles.movieCard}>
                <Image
                  source={{ uri: movie.poster }}
                  style={styles.moviePoster}
                />
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                  <Text style={styles.movieRating}>Rating: {movie.rating}</Text>
                  <Text style={styles.movieReview}>{movie.review}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => deleteReview(movie.idRate)}
                    style={styles.deleteButton}
                  >
                    <FontAwesome name="trash" size={20} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => editReview(movie.id, movie.idRate)}
                    style={styles.editButton}
                  >
                    <FontAwesome name="pencil" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView>
            {filteredWatchlistMovies.map((movie: any) => (
              <View
                key={movie.id}
                style={[styles.movieCard, movie.watched && { opacity: 0.6 }]}
              >
                <Image
                  source={{ uri: movie.poster }}
                  style={styles.moviePoster}
                />
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => deleteFromWatchlist(movie.id)}
                    style={styles.deleteButton}
                  >
                    <FontAwesome name="trash" size={20} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => markAsWatched(movie.id)}
                    style={styles.editButton}
                  >
                    <FontAwesome
                      name={movie.watched ? "eye-slash" : "eye"}
                      size={20}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

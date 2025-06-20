import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Header } from "@/components/Header";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

export default function MySpace() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [activeTab, setActiveTab] = useState("Watchlist");
  const [activeFilter, setActiveFilter] = useState("Filmes");
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      const savedMovies = JSON.parse(
        (await AsyncStorage.getItem("ratedMovies")) || "[]"
      );
      setRatedMovies(savedMovies);
    };
    fetchRatedMovies();
  }, []);

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

  const navButtons = ["Watchlist", "Rated"];
  const filterButtons = ["Filmes", "Séries"];

  const filteredRatedMovies = ratedMovies.filter((movie: any) => {
    if (activeFilter === "Filmes") {
      return movie.type === "movie";
    }
    if (activeFilter === "Séries") {
      return movie.type === "series";
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <Header />

      {/* 2. Container da navegação */}
      <View style={styles.containerNav}>
        {navButtons.map((title) => (
          <TouchableOpacity
            key={title}
            // 3. Estilo condicional para o botão
            style={[
              styles.buttonNav,
              activeTab === title ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setActiveTab(title)}
          >
            {/* 4. Estilo condicional para o texto */}
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

      {/* 2. Container da navegação */}
      <View style={styles.containerNav}>
        {filterButtons.map((title) => (
          <TouchableOpacity
            key={title}
            // 3. Estilo condicional para o botão
            style={[
              styles.buttonNav,
              activeFilter === title
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setActiveFilter(title)}
          >
            {/* 4. Estilo condicional para o texto */}
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
            {filteredRatedMovies.map((movie: any, index) => (
              <View key={index} style={styles.movieCard}>
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
                    <FontAwesome name="times" size={20} color="#FFF" />
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
          <Text style={styles.text}>
            Conteúdo de {activeTab} - {activeFilter}
          </Text>
        )}
      </View>
    </View>
  );
}

import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Header } from "@/components/Header";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { watchlistService, WatchlistResponse } from "@/services/watchlistService";
import { ratedService, RatedResponse } from "@/services/ratedService";

export default function MySpace() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [activeTab, setActiveTab] = useState("Watchlist");
  const [activeFilter, setActiveFilter] = useState("Filmes");
  const [ratedMovies, setRatedMovies] = useState<RatedResponse[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<WatchlistResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  useFocusEffect(
    useCallback(() => {
      fetchLists();
    }, [])
  );

  const fetchLists = async () => {
    setLoading(true);
    try {
      // Fetch watchlist from backend
      const watchlistData = await watchlistService.getAllWatchlistItems();
      console.log('Watchlist data from backend:', watchlistData);
      setWatchlistMovies(watchlistData);

      // Fetch rated items from backend
      const ratedData = await ratedService.getAllRatedItems();
      console.log('Rated data from backend:', ratedData);
      setRatedMovies(ratedData);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
      Alert.alert("Erro", "Erro ao carregar suas listas");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: number) => {
    Alert.alert(
      "Confirmar",
      "Deseja realmente remover esta avaliação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              setUpdatingItems(prev => new Set(prev).add(id));
              await ratedService.deleteRatedItem(id);
              setRatedMovies(prev => prev.filter(item => item.id !== id));
              Alert.alert("Sucesso", "Avaliação removida com sucesso");
            } catch (error) {
              console.error("Erro ao apagar avaliação:", error);
              Alert.alert("Erro", "Erro ao remover avaliação");
            } finally {
              setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
              });
            }
          }
        }
      ]
    );
  };

  const editReview = (movie: RatedResponse) => {
    router.push({
      pathname: "/rate",
      params: {
        id: movie.titleId,
        title: movie.name,
        poster: movie.poster || '',
        type: movie.type || 'movie',
        year: movie.year || '',
        plotOverview: movie.plotOverview || '',
        genreName: movie.genreName || '',
        ratedId: movie.id
      }
    });
  };

  const deleteFromWatchlist = async (id: number) => {
    Alert.alert(
      "Confirmar",
      "Deseja realmente remover da watchlist?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              setUpdatingItems(prev => new Set(prev).add(id));
              await watchlistService.deleteWatchlistItem(id);
              setWatchlistMovies(prev => prev.filter(item => item.id !== id));
              Alert.alert("Sucesso", "Removido da watchlist");
            } catch (error) {
              console.error("Erro ao remover da watchlist:", error);
              Alert.alert("Erro", "Erro ao remover da watchlist");
            } finally {
              setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
              });
            }
          }
        }
      ]
    );
  };

  const markAsWatched = async (id: number, currentStatus: boolean) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(id));
      await watchlistService.markAsWatched(id, !currentStatus);
      setWatchlistMovies(prev =>
        prev.map(item =>
          item.id === id ? { ...item, watched: !currentStatus } : item
        )
      );
    } catch (error) {
      console.error("Erro ao marcar como assistido:", error);
      Alert.alert("Erro", "Erro ao atualizar status");
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const navButtons = ["Watchlist", "Rated"];
  const filterButtons = ["Filmes", "Séries"];

  const filteredRatedMovies = ratedMovies.filter((movie) => {
    const movieType = movie.type?.toLowerCase();
    if (activeFilter === "Filmes") return movieType === "movie" || movieType === "filme";
    if (activeFilter === "Séries") return movieType === "tv_series" || movieType === "series" || movieType === "série";
    return false;
  });

  const filteredWatchlistMovies = watchlistMovies.filter((movie) => {
    const movieType = movie.type?.toLowerCase();
    if (activeFilter === "Filmes") return movieType === "movie" || movieType === "filme";
    if (activeFilter === "Séries") return movieType === "tv_series" || movieType === "series" || movieType === "série";
    return false;
  });

  const openMovieDetails = (movie: WatchlistResponse | RatedResponse) => {
    router.push({
      pathname: "/movie-details",
      params: {
        id: movie.titleId,
        title: movie.name,
        poster: movie.poster || '',
        type: movie.type || 'movie',
        year: movie.year || '',
        description: movie.plotOverview || ''
      }
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando suas listas...</Text>
      </View>
    );
  }

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
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredRatedMovies.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Você ainda não avaliou nenhum {activeFilter.toLowerCase().slice(0, -1)}
                </Text>
              </View>
            ) : (
              filteredRatedMovies.map((movie) => (
                <TouchableOpacity
                  key={movie.id}
                  style={styles.movieCard}
                  onPress={() => openMovieDetails(movie)}
                  activeOpacity={0.8}
                >
                  {movie.poster ? (
                    <Image
                      source={{ uri: movie.poster }}
                      style={styles.moviePoster}
                    />
                  ) : (
                    <View style={[styles.moviePoster, { backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }]}>
                      <Ionicons name="film-outline" size={30} color="#666" />
                    </View>
                  )}
                  <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle} numberOfLines={1}>
                      {movie.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#FFD700" />
                      <Text style={styles.movieRating}>{movie.rating}</Text>
                    </View>
                    {movie.year && (
                      <Text style={styles.movieYear}>Ano: {movie.year}</Text>
                    )}
                    {movie.type && (
                      <Text style={styles.movieYear}>Tipo: {movie.type}</Text>
                    )}
                    {movie.genreName && (
                      <Text style={styles.movieYear}>{movie.genreName}</Text>
                    )}
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => deleteReview(movie.id)}
                      style={styles.deleteButton}
                      disabled={updatingItems.has(movie.id)}
                    >
                      {updatingItems.has(movie.id) ? (
                        <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                        <FontAwesome name="trash" size={20} color="#FFF" />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => editReview(movie)}
                      style={styles.editButton}
                    >
                      <FontAwesome name="pencil" size={20} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredWatchlistMovies.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Sua watchlist de {activeFilter.toLowerCase()} está vazia
                </Text>
              </View>
            ) : (
              filteredWatchlistMovies.map((movie) => (
                <TouchableOpacity
                  key={movie.id}
                  style={[styles.movieCard, movie.watched && styles.watchedCard]}
                  onPress={() => openMovieDetails(movie)}
                  activeOpacity={0.8}
                >
                  {movie.poster ? (
                    <Image
                      source={{ uri: movie.poster }}
                      style={[styles.moviePoster, movie.watched && styles.watchedPoster]}
                    />
                  ) : (
                    <View style={[styles.moviePoster, { backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }, movie.watched && styles.watchedPoster]}>
                      <Ionicons name="film-outline" size={30} color="#666" />
                    </View>
                  )}
                  <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle} numberOfLines={1}>
                      {movie.name}
                    </Text>
                    {movie.year && (
                      <Text style={styles.movieYear}>{movie.year}</Text>
                    )}
                    {movie.watched && (
                      <Text style={styles.watchedLabel}>Assistido</Text>
                    )}
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => deleteFromWatchlist(movie.id)}
                      style={styles.deleteButton}
                      disabled={updatingItems.has(movie.id)}
                    >
                      {updatingItems.has(movie.id) ? (
                        <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                        <FontAwesome name="trash" size={20} color="#FFF" />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => markAsWatched(movie.id, movie.watched || false)}
                      style={styles.watchedButton}
                      disabled={updatingItems.has(movie.id)}
                    >
                      {updatingItems.has(movie.id) ? (
                        <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                        <FontAwesome
                          name={movie.watched ? "eye-slash" : "eye"}
                          size={20}
                          color="#FFF"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
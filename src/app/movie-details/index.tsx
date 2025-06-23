import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import movies from "@/utils/movies.json";
import series from "@/utils/series.json";
import recommended from "@/utils/recommended.json";
import { Ionicons, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import BottomNavbar from "@/components/Navbar";
import { watchlistService } from "@/services/watchlistService";
import { ratedService } from "@/services/ratedService";

export default function MovieDetails() {
  const params = useLocalSearchParams();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [watchlistItemId, setWatchlistItemId] = useState<number | null>(null);
  const [ratedItemId, setRatedItemId] = useState<number | null>(null);
  
  // Verificar se veio da busca (com parâmetros) ou da lista local
  const isFromSearch = params.title && params.poster;
  
  let movie;
  
  if (isFromSearch) {
    // Dados vindos da busca
    movie = {
      id: params.id,
      title: params.title as string,
      posterMedium: params.poster as string,
      type: params.type as string,
      year: params.year as string,
      plot_overview: params.description as string,
      user_rating: "N/A",
      genre_names: [],
      sources: [],
      similar_titles: []
    };
  } else {
    // Buscar na lista local de filmes, séries e recomendados
    movie = movies.find((m) => String(m.id) === String(params.id)) || 
            series.find((s) => String(s.id) === String(params.id)) ||
            recommended.find((r) => String(r.id) === String(params.id));
  }

  // Busca seasons e episodes do primeiro source, se existir
  const seasons = movie?.sources?.[0]?.seasons;
  const episodes = movie?.sources?.[0]?.episodes;

  useEffect(() => {
    checkMovieStatus();
  }, [movie?.id]);

  const checkMovieStatus = async () => {
    if (!movie?.id) return;
    
    setLoading(true);
    try {
      const titleId = Array.isArray(movie.id) ? parseInt(movie.id[0]) : (typeof movie.id === 'string' ? parseInt(movie.id) : movie.id);
      
      // Check if in watchlist
      const watchlistItem = await watchlistService.isInWatchlist(titleId);
      if (watchlistItem) {
        setIsInWatchlist(true);
        setWatchlistItemId(watchlistItem.id);
      }
      
      // Check if rated
      const ratedItem = await ratedService.isRatedByUser(titleId);
      if (ratedItem) {
        setIsRated(true);
        setRatedItemId(ratedItem.id);
      }
    } catch (error) {
      console.error('Error checking movie status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Filme não encontrado.</Text>
      </View>
    );
  }

  const handleWatchlist = async () => {
    try {
      const titleId = typeof movie.id === 'string' ? parseInt(movie.id) : movie.id;
      
      if (isInWatchlist && watchlistItemId) {
        // Remove from watchlist
        await watchlistService.deleteWatchlistItem(watchlistItemId);
        setIsInWatchlist(false);
        setWatchlistItemId(null);
        Alert.alert('Sucesso', 'Removido da watchlist');
      } else {
        // Add to watchlist
        const watchlistItem = {
          titleId: Array.isArray(movie.id) ? parseInt(movie.id[0]) : (typeof movie.id === 'string' ? parseInt(movie.id) : movie.id),
          name: movie.title,
          poster: movie.posterMedium,
          type: movie.type || 'movie',
          year: movie.year ? (typeof movie.year === 'string' ? parseInt(movie.year) : movie.year) : undefined,
          plotOverview: movie.plot_overview,
          genreName: movie.genre_names?.join(', ') || '',
          watched: false
        };
        
        console.log('Adding to watchlist:', watchlistItem);
        
        const response = await watchlistService.addToWatchlist(watchlistItem);
        setIsInWatchlist(true);
        setWatchlistItemId(response.id);
        Alert.alert('Sucesso', 'Adicionado à watchlist');
      }
    } catch (error: any) {
      console.error('Error handling watchlist:', error);
      if (error.response?.status === 409) {
        Alert.alert('Aviso', 'Este título já está na sua watchlist');
      } else {
        Alert.alert('Erro', 'Erro ao atualizar watchlist');
      }
    }
  };

  const handleRate = () => {
    const titleId = typeof movie.id === 'string' ? parseInt(movie.id) : movie.id;
    
    router.push({
      pathname: "../rate",
      params: { 
        id: titleId,
        title: movie.title,
        poster: movie.posterMedium,
        type: movie.type || 'movie',
        year: movie.year || '',
        plotOverview: movie.plot_overview || '',
        genreName: movie.genre_names?.join(', ') || '',
        ratedId: ratedItemId || undefined
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}> 
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
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
            {movie.genre_names?.length > 0 && (
              <Text style={styles.info}>{movie.genre_names.join(", ")}</Text>
            )}
            {movie.user_rating !== "N/A" && (
              <Text style={styles.imdb}>IMDb : {movie.user_rating}</Text>
            )}
            {movie.sources?.[0]?.name && (
              <Text style={styles.platform}>{movie.sources[0].name}</Text>
            )}
          </View>
        </View>
        {movie.plot_overview && (
          <Text style={styles.overview}>{movie.plot_overview}</Text>
        )}
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.watchlistBtn, isInWatchlist && styles.watchlistBtnActive]} 
            onPress={handleWatchlist}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Ionicons 
                  name={isInWatchlist ? "checkmark-circle" : "add-circle-outline"} 
                  size={20} 
                  color="#000" 
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.btnText}>
                  {isInWatchlist ? 'Na Watchlist' : 'Watchlist'}
                </Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rateBtn, isRated && styles.rateBtnActive]}
            onPress={handleRate}
          >
            <AntDesign 
              name={isRated ? "star" : "staro"} 
              size={20} 
              color="#000" 
              style={{ marginRight: 4 }}
            />
            <Text style={styles.btnText}>{isRated ? 'Rated' : 'Rate'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}
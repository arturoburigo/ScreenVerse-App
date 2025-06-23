import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ratedService } from "@/services/ratedService";

export default function Rate() {
  const params = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [existingRatedId, setExistingRatedId] = useState<number | null>(null);

  // Extract movie data from params
  const movieData = {
    id: params.id as string,
    title: params.title as string,
    poster: params.poster as string,
    type: params.type as string,
    year: params.year as string,
    plotOverview: params.plotOverview as string,
    genreName: params.genreName as string,
  };

  useEffect(() => {
    loadExistingRating();
  }, [movieData.id]);

  const loadExistingRating = async () => {
    if (!movieData.id) return;
    
    setLoadingData(true);
    try {
      const titleId = parseInt(movieData.id);
      const existingRating = await ratedService.isRatedByUser(titleId);
      
      if (existingRating) {
        setRating(existingRating.rating);
        setReview(existingRating.plotOverview || "");
        setExistingRatedId(existingRating.id);
      }
    } catch (error) {
      console.error('Error loading existing rating:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleRating = (rate: number) => {
    if (rating === rate - 0.5) {
      setRating(rate);
    } else {
      setRating(rate - 0.5);
    }
  };

  const renderStar = (rate: number) => {
    if (rate <= rating) {
      return "star";
    } else if (rate - 0.5 === rating) {
      return "star-half-o";
    } else {
      return "star-o";
    }
  };

  const saveReview = async () => {
    if (rating === 0) {
      Alert.alert('Atenção', 'Por favor, selecione uma avaliação');
      return;
    }

    setLoading(true);
    try {
      const titleId = parseInt(movieData.id);
      
      const ratedItem = {
        titleId: titleId,
        name: movieData.title,
        rating: rating,
        watched: true,
        plotOverview: review || movieData.plotOverview || '',
        year: movieData.year ? parseInt(movieData.year) : undefined,
        type: movieData.type || 'movie',
        genreName: movieData.genreName || '',
        poster: movieData.poster || ''
      };

      console.log('Saving rated item:', ratedItem);

      if (existingRatedId) {
        // Update existing rating - send all fields
        await ratedService.updateRatedItem(existingRatedId, ratedItem);
        Alert.alert('Sucesso', 'Avaliação atualizada com sucesso!');
      } else {
        // Create new rating
        await ratedService.rateTitle(ratedItem);
        Alert.alert('Sucesso', 'Filme avaliado com sucesso!');
      }

      router.back();
    } catch (error: any) {
      console.error('Error saving review:', error);
      if (error.response?.status === 409) {
        Alert.alert('Erro', 'Este título já foi avaliado');
      } else {
        Alert.alert('Erro', 'Erro ao salvar avaliação');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{movieData.title}</Text>
      {movieData.poster && (
        <Image source={{ uri: movieData.poster }} style={styles.poster} />
      )}

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <TouchableOpacity
            key={rate}
            onPress={() => handleRating(rate)}
            style={styles.star}
          >
            <FontAwesome
              name={renderStar(rate)}
              size={40}
              color={rate - 0.5 <= rating ? "#FFD700" : "#FFF"}
            />
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.ratingText}>
        {rating > 0 ? `Sua avaliação: ${rating}` : 'Toque nas estrelas para avaliar'}
      </Text>
      
      <Text style={styles.reviewText}>Deixe seu comentário (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="O que você achou do filme?"
        placeholderTextColor="#888"
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={saveReview}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {existingRatedId ? 'Atualizar Avaliação' : 'Salvar Avaliação'}
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      
      <Navbar />
    </View>
  );
}
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { router, useLocalSearchParams } from "expo-router";
import movies from "@/utils/movies.json";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Rate() {
  const { id, idRate } = useLocalSearchParams();
  const movie = movies.find((m) => String(m.id) === id);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const loadPreviousReview = async () => {
      // Apenas carrega a avaliação se um idRate for fornecido (modo de edição)
      if (idRate) {
        try {
          const savedMovies = JSON.parse(
            (await AsyncStorage.getItem("ratedMovies")) || "[]"
          );
          const movieReview = savedMovies.find(
            (m: any) => String(m.idRate) === String(idRate)
          );
          if (movieReview) {
            setRating(movieReview.rating);
            setReview(movieReview.review);
          } else {
            setRating(0);
            setReview("");
          }
        } catch (error) {
          console.error("Erro ao carregar avaliação anterior:", error);
          setRating(0);
          setReview("");
        }
      } else {
        // Se não houver idRate, começa com os campos limpos para uma nova avaliação
        setRating(0);
        setReview("");
      }
    };
    loadPreviousReview();
  }, [idRate]);

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
    try {
      const existingReviews = JSON.parse(
        (await AsyncStorage.getItem("ratedMovies")) || "[]"
      );

      // Modo de edição: idRate está presente
      if (idRate) {
        const updatedReviews = existingReviews.map((r: any) => {
          if (String(r.idRate) === String(idRate)) {
            return { ...r, rating, review };
          }
          return r;
        });
        await AsyncStorage.setItem(
          "ratedMovies",
          JSON.stringify(updatedReviews)
        );
      } else {
        // Modo de criação/atualização: idRate não está presente, usa o id do filme
        const existingReviewIndex = existingReviews.findIndex(
          (r: any) => String(r.id) === String(id)
        );

        if (existingReviewIndex !== -1) {
          const lastIdRate =
            existingReviews.length > 0
              ? Math.max(0, ...existingReviews.map((r: any) => r.idRate || 0))
              : 0;
          const newReview = {
            idRate: lastIdRate + 1,
            id: movie?.id,
            title: movie?.title,
            poster: movie?.posterMedium,
            rating,
            review,
            type: movie?.type,
          };
          const updatedReviews = [...existingReviews, newReview];
          await AsyncStorage.setItem(
            "ratedMovies",
            JSON.stringify(updatedReviews)
          );
        }
      }

      router.push("/myspace");
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{movie?.title}</Text>
      <Image source={{ uri: movie?.posterMedium }} style={styles.poster} />

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
      <Text style={styles.reviewText}>Deixe seu comentário</Text>
      <TextInput
        style={styles.input}
        placeholder="Dê uma nota sobre o filme"
        placeholderTextColor="#888"
        value={review}
        onChangeText={setReview}
      />
      <TouchableOpacity style={styles.button} onPress={saveReview}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <Navbar />
    </View>
  );
}

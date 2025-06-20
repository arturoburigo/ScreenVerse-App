import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import movies from "@/utils/movies.json";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Rate() {
  const { id } = useLocalSearchParams();
  const movie = movies.find((m) => String(m.id) === id);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <Navbar />
    </View>
  );
}

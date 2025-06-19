import { Header } from "@/components/Header";
import { useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { styles } from "./styles";
import Card from "@/components/Card";
import { useRouter } from "expo-router";
import movies from "@/utils/movies.json";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const handleMoviePress = (movieId: number) => {
    router.push(`/movie-details?id=${movieId}`);
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.text}>Filmes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 16 }}>
          {movies.map((movie) => (
            <Card
              key={movie.id}
              image={{ uri: movie.posterMedium }}
              title={movie.title}
              type="vertical"
              onPress={() => handleMoviePress(movie.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

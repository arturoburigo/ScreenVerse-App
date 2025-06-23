import { Header } from "@/components/Header";
import { useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { styles } from "./styles";
import Card from "@/components/Card";
import { useRouter } from "expo-router";
import movies from "@/utils/movies.json";
import series from "@/utils/series.json";
import recommended from "@/utils/recommended.json";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const handleMoviePress = (movieId: number) => {
    router.push(`/movie-details?id=${movieId}`);
  };

  const handleSeriesPress = (seriesId: number) => {
    router.push(`/movie-details?id=${seriesId}`);
  };

  const handleRecommendedPress = (itemId: number) => {
    router.push(`/movie-details?id=${itemId}`);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.content}>
          <Text style={styles.text}>Recomendados</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 2 }}>
            {recommended.map((item) => (
              <Card
                key={item.id}
                image={{ uri: item.posterMedium }}
                title={item.title}
                type="vertical"
                onPress={() => handleRecommendedPress(item.id)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Filmes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 2 }}>
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
        <View style={styles.content}>
          <Text style={styles.text}>Séries</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 2 }}>
            {series.map((serie) => (
              <Card
                key={serie.id}
                image={{ uri: serie.posterMedium }}
                title={serie.title}
                type="vertical"
                onPress={() => handleSeriesPress(serie.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

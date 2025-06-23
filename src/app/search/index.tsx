import { Header } from "@/components/Header";
import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchBar from "@/components/SearchBar";
import { styles } from "./styles";
import { searchService, SearchResult } from "../../services/searchService";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchService.search(search.trim());
      console.log('Search results:', searchResults);
      setResults(searchResults);
    } catch (error) {
      console.error('Erro na busca:', error);
      Alert.alert('Erro', 'Não foi possível realizar a busca. Tente novamente.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = (item: SearchResult) => {
    console.log('Navigating with item:', item);
    
    // Garantir que todos os dados estejam presentes e no formato correto
    const params = {
      id: item.id,
      title: item.title,
      poster: item.poster || '',
      type: item.type || 'movie',
      year: item.year?.toString() || '',
      description: item.description || ''
    };
    
    console.log('Navigation params:', params);
    
    router.push({
      pathname: "/movie-details",
      params: params
    });
  };

  const renderResult = ({ item }: { item: SearchResult }) => {
    console.log('Rendering item:', item);
    
    return (
      <TouchableOpacity 
        style={styles.resultItem}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.posterContainer}>
          {item.poster ? (
            <Image 
              source={{ uri: item.poster }} 
              style={styles.poster}
              resizeMode="cover"
              onError={(error) => console.log('Image error for', item.title, ':', error.nativeEvent.error)}
            />
          ) : (
            <Ionicons 
              name="film-outline" 
              size={30} 
              color="#666" 
              style={styles.posterPlaceholder}
            />
          )}
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.resultTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.resultType}>
            {item.type === 'movie' ? 'Filme' : 'Série'}
            {item.year && ` • ${item.year}`}
          </Text>
          {item.description && (
            <Text style={styles.resultDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar 
        value={search} 
        onChangeText={setSearch} 
        onSubmitEditing={handleSearch}
        placeholder="Buscar filmes e séries..."
      />
      
      {loading ? (
        <View style={styles.resultsContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          style={styles.resultsContainer}
          data={results}
          renderItem={renderResult}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            search.trim() && !loading ? (
              <Text style={styles.noResults}>
                Nenhum resultado encontrado para "{search}"
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
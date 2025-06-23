import api from './api';
import tokenCache from '@/app/storage/tokenCache';
import { AxiosError } from 'axios';

export interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'series';
  year?: number;
  description?: string;
  poster?: string;
}

interface ApiSearchResponse {
  people_results: any[];
  title_results: Array<{
    id: number;
    imdb_id: string | null;
    name: string;
    resultType: string;
    tmdb_id: number;
    tmdb_type: string;
    type: string;
    year: number | null;
    details: {
      id: number;
      title: string;
      original_title: string;
      plot_overview: string;
      type: string;
      runtime_minutes: number | null;
      year: number;
      end_year?: number;
      release_date: string;
      imdb_id: string;
      tmdb_id: number;
      tmdb_type: string;
      genres: number[];
      genre_names: string[];
      user_rating: number;
      critic_score: number;
      us_rating: string;
      poster: string;
    } | null;
    poster: string | null;
  }>;
}

export const searchService = {
  async search(searchValue: string): Promise<SearchResult[]> {
    try {
      // Verificar se o token existe
      const token = await tokenCache.getToken(tokenCache.ACCESS_TOKEN_KEY);
      console.log('Token exists:', !!token);
      console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'No token');
      
      // Codificar o valor de busca para tratar espaços e caracteres especiais
      const encodedSearchValue = encodeURIComponent(searchValue);
      console.log('Search value encoded:', encodedSearchValue);
      
      const response = await api.get(`/api/search?searchValue=${encodedSearchValue}`);
      
      // Log para verificar se o token foi enviado (apenas em desenvolvimento)
      console.log('Request headers:', response.config.headers);
      console.log('Response data:', response.data);
      
      const data: ApiSearchResponse = response.data;
      
      // Mapear os resultados da API para nossa interface
      const mappedResults: SearchResult[] = data.title_results.map(item => ({
        id: item.id.toString(),
        title: item.name,
        type: item.type === 'tv_series' ? 'series' : 'movie',
        year: item.year || undefined,
        description: item.details?.plot_overview || undefined,
        poster: item.details?.poster || undefined
      }));
      
      console.log('Mapped results:', mappedResults);
      
      return mappedResults;
    } catch (error) {
      console.error('Erro na busca:', error);
      if (error instanceof AxiosError) {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
      }
      throw error;
    }
  }
}; 
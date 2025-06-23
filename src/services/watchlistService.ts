import api from './api';

export interface WatchlistItem {
  id?: number;
  titleId: number;
  name: string;
  watched?: boolean;
  plotOverview?: string;
  year?: number;
  type?: string;
  genreName?: string;
  poster?: string;
}

export interface WatchlistResponse extends WatchlistItem {
  id: number;
}

export const watchlistService = {
  // Get all watchlist items for the authenticated user
  async getAllWatchlistItems(): Promise<WatchlistResponse[]> {
    try {
      const response = await api.get('/api/watchlist');
      return response.data;
    } catch (error) {
      console.error('Error fetching watchlist items:', error);
      throw error;
    }
  },

  // Add a title to watchlist
  async addToWatchlist(watchlistItem: WatchlistItem): Promise<WatchlistResponse> {
    try {
      const response = await api.post('/api/watchlist', watchlistItem);
      return response.data;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }
  },

  // Update a watchlist item
  async updateWatchlistItem(id: number, watchlistItem: Partial<WatchlistItem>): Promise<WatchlistResponse> {
    try {
      const response = await api.put(`/api/watchlist/${id}`, watchlistItem);
      return response.data;
    } catch (error) {
      console.error('Error updating watchlist item:', error);
      throw error;
    }
  },

  // Delete a watchlist item
  async deleteWatchlistItem(id: number): Promise<void> {
    try {
      await api.delete(`/api/watchlist/${id}`);
    } catch (error) {
      console.error('Error deleting watchlist item:', error);
      throw error;
    }
  },

  // Mark a watchlist item as watched or unwatched
  async markAsWatched(id: number, watched: boolean): Promise<WatchlistResponse> {
    try {
      const response = await api.patch(`/api/watchlist/${id}/watched?watched=${watched}`);
      return response.data;
    } catch (error) {
      console.error('Error marking as watched:', error);
      throw error;
    }
  },

  // Check if a title is already in watchlist
  async isInWatchlist(titleId: number): Promise<WatchlistResponse | null> {
    try {
      const allWatchlist = await this.getAllWatchlistItems();
      return allWatchlist.find(item => item.titleId === titleId) || null;
    } catch (error) {
      console.error('Error checking if title is in watchlist:', error);
      return null;
    }
  }
};
import api from './api';

export interface RatedItem {
  id?: number;
  titleId: number;
  name: string;
  watched?: boolean;
  rating: number;
  plotOverview?: string;
  year?: number;
  type?: string;
  genreName?: string;
  poster?: string;
}

export interface RatedResponse extends RatedItem {
  id: number;
}

export const ratedService = {
  // Get all rated items for the authenticated user
  async getAllRatedItems(): Promise<RatedResponse[]> {
    try {
      const response = await api.get('/api/rated');
      return response.data;
    } catch (error) {
      console.error('Error fetching rated items:', error);
      throw error;
    }
  },

  // Rate a title (create or update)
  async rateTitle(ratedItem: RatedItem): Promise<RatedResponse> {
    try {
      const response = await api.post('/api/rated', ratedItem);
      return response.data;
    } catch (error) {
      console.error('Error rating title:', error);
      throw error;
    }
  },

  // Update a rated item
  async updateRatedItem(id: number, ratedItem: Partial<RatedItem>): Promise<RatedResponse> {
    try {
      const response = await api.put(`/api/rated/${id}`, ratedItem);
      return response.data;
    } catch (error) {
      console.error('Error updating rated item:', error);
      throw error;
    }
  },

  // Delete a rated item
  async deleteRatedItem(id: number): Promise<void> {
    try {
      await api.delete(`/api/rated/${id}`);
    } catch (error) {
      console.error('Error deleting rated item:', error);
      throw error;
    }
  },

  // Check if a title is already rated by the user
  async isRatedByUser(titleId: number): Promise<RatedResponse | null> {
    try {
      const allRated = await this.getAllRatedItems();
      return allRated.find(item => item.titleId === titleId) || null;
    } catch (error) {
      console.error('Error checking if title is rated:', error);
      return null;
    }
  }
};
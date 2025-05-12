import api from './api';

export interface UserRequestDTO {
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  authProvider: string;
}

export interface UserResponseDTO {
  id: number;
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  authProvider: string;
}

export const userService = {
  createUser: async (userData: UserRequestDTO): Promise<UserResponseDTO> => {
    const response = await api.post<UserResponseDTO>('/users', userData);
    return response.data;
  },

  getAllUsers: async (): Promise<UserResponseDTO[]> => {
    const response = await api.get<UserResponseDTO[]>('/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<UserResponseDTO> => {
    const response = await api.get<UserResponseDTO>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, userData: UserRequestDTO): Promise<UserResponseDTO> => {
    const response = await api.put<UserResponseDTO>(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
}; 
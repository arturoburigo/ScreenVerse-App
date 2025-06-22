import tokenCache from '@/app/storage/tokenCache';
import api from './api';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  isNewUser: boolean;
}

export interface ClerkAuthData {
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  authProvider: string;
}

export interface UserCheckResponse {
  exists: boolean;
  message: string;
}

class AuthService {
  // Verificar se usuário existe
  async checkUserExists(email?: string, clerkUserId?: string): Promise<UserCheckResponse> {
    try {
      const response = await api.get<UserCheckResponse>('/auth/check-user', {
        params: { email, clerkUserId }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return { exists: false, message: 'Error checking user' };
    }
  }

  // Signup - Criar novo usuário
  async signUp(clerkData: ClerkAuthData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', clerkData);
      
      const { accessToken, refreshToken, ...userData } = response.data;
      
      await this.saveTokens({ accessToken, refreshToken });
      await this.saveUserData(userData);
      
      return response.data;
    } catch (error: any) {
      // Se o usuário já existe, retorna erro específico
      if (error.response?.status === 409) {
        throw {
          type: 'USER_ALREADY_EXISTS',
          message: error.response.data.message,
          action: error.response.data.action
        };
      }
      throw error;
    }
  }

  // SignIn - Login de usuário existente
  async signIn(clerkUserId?: string, email?: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/signin', {
        clerkUserId,
        email
      });
      
      const { accessToken, refreshToken, ...userData } = response.data;
      
      await this.saveTokens({ accessToken, refreshToken });
      await this.saveUserData(userData);
      
      return response.data;
    } catch (error: any) {
      // Se o usuário não existe, retorna erro específico
      if (error.response?.status === 404) {
        throw {
          type: 'USER_NOT_FOUND',
          message: error.response.data.message,
          action: error.response.data.action
        };
      }
      throw error;
    }
  }

  // Método unificado (tenta signin, se não existir faz signup)
  async authenticateWithClerk(clerkData: ClerkAuthData): Promise<AuthResponse> {
    try {
      console.log('Enviando dados para autenticação:', JSON.stringify(clerkData, null, 2));
      
      const response = await api.post<AuthResponse>('/auth/clerk/auth', clerkData);
      
      console.log('Resposta do backend:', JSON.stringify(response.data, null, 2));
      
      if (!response.data) {
        throw new Error('Resposta do backend não contém dados');
      }
      
      const { accessToken, refreshToken, ...userData } = response.data;
      
      if (!accessToken || !refreshToken) {
        throw new Error('Tokens não encontrados na resposta do backend');
      }
      
      await this.saveTokens({ accessToken, refreshToken });
      await this.saveUserData(userData);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao autenticar com backend:', error);
      throw error;
    }
  }

  // Salvar tokens
  async saveTokens(tokens: AuthTokens): Promise<void> {
    await tokenCache.saveToken(tokenCache.ACCESS_TOKEN_KEY, tokens.accessToken);
    await tokenCache.saveToken(tokenCache.REFRESH_TOKEN_KEY, tokens.refreshToken);
  }

  // Salvar dados do usuário
  async saveUserData(data: Omit<AuthResponse, 'accessToken' | 'refreshToken'>): Promise<void> {
    await tokenCache.saveToken(tokenCache.USER_DATA_KEY, JSON.stringify(data));
  }

  // Obter access token
  async getAccessToken(): Promise<string | null> {
    return await tokenCache.getToken(tokenCache.ACCESS_TOKEN_KEY);
  }

  // Obter refresh token
  async getRefreshToken(): Promise<string | null> {
    return await tokenCache.getToken(tokenCache.REFRESH_TOKEN_KEY);
  }

  // Obter dados do usuário
  async getUserData(): Promise<any> {
    const data = await tokenCache.getToken(tokenCache.USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }

  // Logout
  async logout(): Promise<void> {
    await tokenCache.clearAllTokens();
  }

  // Verificar se está autenticado
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }
}

export const authService = new AuthService();
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'screenverse_access_token';
const REFRESH_TOKEN_KEY = 'screenverse_refresh_token';
const USER_DATA_KEY = 'screenverse_user_data';

async function getToken(key: string): Promise<string | null> {
    try {
        return await SecureStore.getItem(key);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

async function saveToken(key: string, value: string): Promise<void> {
    try {
        await SecureStore.setItem(key, value);
    } catch (error) {
        console.error('Error saving token:', error);
    }
}

async function removeToken(key: string): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error('Error removing token:', error);
    }
}

async function clearAllTokens(): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
        console.error('Error clearing tokens:', error);
    }
}

async function hasToken(key: string): Promise<boolean> {
    try {
        const token = await SecureStore.getItem(key);
        return !!token;
    } catch (error) {
        console.error('Error checking token:', error);
        return false;
    }
}

const tokenCache = {
    getToken,
    saveToken,
    removeToken,
    clearAllTokens,
    hasToken,
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    USER_DATA_KEY
}

export { tokenCache };
export default tokenCache;
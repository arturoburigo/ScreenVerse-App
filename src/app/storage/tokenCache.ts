import * as SecureStore from 'expo-secure-store';

async function getToken(key: string) {
    try {
        return SecureStore.getItem(key)
    } catch (error) {
        console.error(error)
    }
}

async function saveToken(key: string, value: string) {
    try {
        return SecureStore.setItem(key, value)
    } catch (error) {
        console.error(error)
    }
}

export const tokenCache = {
    getToken,
    saveToken
}
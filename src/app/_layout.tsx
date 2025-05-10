import {  Slot, useRouter } from "expo-router";
import {ClerkProvider, SignedIn, useAuth} from '@clerk/clerk-expo'
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "./storage/tokenCache";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

function InitialLayout () {
    const {isLoaded, isSignedIn} = useAuth()
    const router = useRouter()
    useEffect(() => {
          if (!isLoaded) return

          if (isSignedIn) {
              router.replace("./auth")
          } else {
            router.replace("./public")  
            
            return
             
        }
    },[isSignedIn])
    return isLoaded ? <Slot/> : (
        <ActivityIndicator style={{flex:1 , justifyContent: "center", alignItems: "center"}}/>
    )
}

export default function Layout() {
    return (
        <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
            <InitialLayout  />
        </ClerkProvider>
    )
} 
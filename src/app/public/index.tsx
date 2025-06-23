import { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Button from "@/components/Button";
import { useSSO, useAuth, useClerk } from "@clerk/clerk-expo";
import { styles } from "./styles";
const logo = require("../../../assets/images/logo.png");
import { authService } from "@/services/authService";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const redirectURL = Linking.createURL("/");

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const { startSSOFlow } = useSSO();
  const { isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();

  const showError = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const createUserInBackend = async (authProvider: string, userData: any) => {
    try {
      console.log("Dados do usuário recebidos:", JSON.stringify(userData, null, 2));
      
      // Validações para garantir que os dados existem
      if (!userData || !userData.id) {
        throw new Error("Dados do usuário inválidos: ID não encontrado");
      }
      
      // Extrair email de diferentes possíveis localizações
      let email = "";
      if (userData.emailAddresses && userData.emailAddresses[0] && userData.emailAddresses[0].emailAddress) {
        email = userData.emailAddresses[0].emailAddress;
      } else if (userData.primaryEmailAddress && userData.primaryEmailAddress.emailAddress) {
        email = userData.primaryEmailAddress.emailAddress;
      }
      
      if (!email) {
        throw new Error("Dados do usuário inválidos: Email não encontrado");
      }

      // Extrair nome
      const firstName = userData.firstName || "";
      const lastName = userData.lastName || "";

      const userRequest = {
        clerkUserId: userData.id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        authProvider: authProvider,
      };

      console.log("Requisição para o backend:", JSON.stringify(userRequest, null, 2));

      await authService.authenticateWithClerk(userRequest);
    } catch (error) {
      console.error("Error creating user in backend:", error);
      if (error instanceof Error) {
        showError("Erro de Autenticação", error.message);
      } else {
        showError("Erro de Autenticação", "Erro desconhecido ao criar usuário no backend");
      }
      throw error;
    }
  };

  const handleAuthenticationSuccess = async (authProvider: string, sessionId: string) => {
    try {
      console.log("Waiting for user session to load...");
      
      // Wait and retry to get the user data
      let attempts = 0;
      let currentUser = null;
      
      while (attempts < 10 && !currentUser) {
        await new Promise(resolve => setTimeout(resolve, 500));
        currentUser = clerk.user;
        attempts++;
        console.log(`Attempt ${attempts}: User found:`, !!currentUser);
      }
      
      if (!currentUser) {
        // Try to get the user from session
        const session = clerk.session;
        if (session && session.user) {
          currentUser = session.user;
          console.log("Got user from session:", !!currentUser);
        }
      }
      
      if (!currentUser) {
        throw new Error("Usuário não encontrado após múltiplas tentativas");
      }

      console.log("User object from Clerk:", JSON.stringify(currentUser, null, 2));
      
      await createUserInBackend(authProvider, currentUser);
    } catch (error) {
      console.error("Erro ao processar usuário:", error);
      showError("Erro", "Erro ao processar dados do usuário. Tente novamente.");
    }
  };

  async function signInWithGoogle() {
    try {
      setIsGoogleLoading(true);
      const google_oAuthFlow = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: redirectURL,
      });
      
      console.log("Google OAuth Flow Result:", google_oAuthFlow.authSessionResult);
      
      if (google_oAuthFlow.authSessionResult?.type === "success") {
        if (google_oAuthFlow.setActive) {
          await google_oAuthFlow.setActive({
            session: google_oAuthFlow.createdSessionId,
          });
          
          // Handle the authentication success
          if (google_oAuthFlow.createdSessionId) {
            await handleAuthenticationSuccess("google", google_oAuthFlow.createdSessionId);
          }
        }
      }
    } catch (error) {
      console.error("Erro durante a autenticação Google:", error);
      showError("Erro", "Erro durante a autenticação Google. Por favor, tente novamente.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  async function signInWithGithub() {
    try {
      setIsGithubLoading(true);
      const github_oAuthFlow = await startSSOFlow({
        strategy: "oauth_github",
        redirectUrl: redirectURL,
      });

      console.log("GitHub OAuth Flow Result:", github_oAuthFlow.authSessionResult);

      if (github_oAuthFlow.authSessionResult?.type === "success") {
        if (github_oAuthFlow.setActive) {
          await github_oAuthFlow.setActive({
            session: github_oAuthFlow.createdSessionId,
          });
          
          // Handle the authentication success
          if (github_oAuthFlow.createdSessionId) {
            await handleAuthenticationSuccess("github", github_oAuthFlow.createdSessionId);
          }
        }
      }
    } catch (error) {
      console.error("Erro durante a autenticação GitHub:", error);
      showError("Erro", "Erro durante a autenticação GitHub. Por favor, tente novamente.");
    } finally {
      setIsGithubLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Rate</Text>
          <Text style={styles.text}>Connect</Text>
          <Text style={styles.text}>Discover</Text>
        </View>
      </View>

      <Button
        icon="logo-google"
        title="Sign with Google"
        backgroundColor="#E0E0E0"
        textColor="#000"
        iconColor="#000"
        onPress={signInWithGoogle}
        isLoading={isGoogleLoading}
      />
      <Button
        backgroundColor="#000"
        textColor="#E0E0E0"
        iconColor="#E0E0E0"
        icon="logo-github"
        title="Sign with Github"
        onPress={signInWithGithub}
        isLoading={isGithubLoading}
      />
    </View>
  );
}
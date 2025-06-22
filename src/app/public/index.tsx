import { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Button from "@/components/Button";
import { useSSO } from "@clerk/clerk-expo";
import { styles } from "./styles";
const logo = require("../../../assets/images/logo.png");
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const redirectURL = Linking.createURL("/");

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const { startSSOFlow } = useSSO();

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
      } else if (userData.email) {
        email = userData.email;
      } else if (userData.primaryEmailAddress && userData.primaryEmailAddress.emailAddress) {
        email = userData.primaryEmailAddress.emailAddress;
      }
      
      if (!email) {
        throw new Error("Dados do usuário inválidos: Email não encontrado");
      }

      // Extrair nome de diferentes possíveis localizações
      let firstName = "";
      let lastName = "";
      
      if (userData.firstName) {
        firstName = userData.firstName;
      } else if (userData.givenName) {
        firstName = userData.givenName;
      }
      
      if (userData.lastName) {
        lastName = userData.lastName;
      } else if (userData.familyName) {
        lastName = userData.familyName;
      }

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
      throw error; // Re-throw para que o erro seja tratado no componente
    }
  };

  async function signInWithGoogle() {
    try {
      setIsGoogleLoading(true);
      const google_oAuthFlow = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: redirectURL,
      });
      console.log(
        "Resposta completa do fluxo OAuth:",
        google_oAuthFlow.authSessionResult
      );
      
      if (google_oAuthFlow.authSessionResult?.type === "success") {
        if (google_oAuthFlow.setActive) {
          await google_oAuthFlow.setActive({
            session: google_oAuthFlow.createdSessionId,
          });
          await createUserInBackend(
            "google",
            google_oAuthFlow.authSessionResult
          );
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

      if (github_oAuthFlow.authSessionResult?.type === "success") {
        if (github_oAuthFlow.setActive) {
          await github_oAuthFlow.setActive({
            session: github_oAuthFlow.createdSessionId,
          });
          await createUserInBackend(
            "github",
            github_oAuthFlow.authSessionResult
          );
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
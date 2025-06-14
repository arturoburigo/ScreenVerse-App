import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Button from "@/components/Button";
import { useSSO } from "@clerk/clerk-expo";
import { styles } from "./styles";
const logo = require("../../../assets/images/logo.png");
import { userService } from "@/services/userService";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const redirectURL = Linking.createURL("/");

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  const createUserInBackend = async (authProvider: string, userData: any) => {
    try {
      const userRequest = {
        clerkUserId: userData.id,
        email: userData.emailAddresses[0].emailAddress,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        authProvider: authProvider,
      };

      await userService.createUser(userRequest);
    } catch (error) {
      console.error("Error creating user in backend:", error);
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
      setIsGoogleLoading(false);
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
      console.error("Erro durante a autenticação:", error);
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
      setIsGithubLoading(false);

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
      console.error(error);
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

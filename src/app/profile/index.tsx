import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerkAuth();
  const { logout: logoutBackend } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Limpar tokens do backend
      await logoutBackend();
      
      // Fazer logout do Clerk
      await signOut();
      
      // Redirecionar para tela de login
      router.replace("/public");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}> 
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Card do usuário */}
      <View style={styles.profileCard}>
        <Image
          source={user?.imageUrl ? { uri: user.imageUrl } : require("../../../assets/images/icon.png")}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.fullName || "Usuário"}</Text>
          <Text style={styles.profileEmail}>{user?.primaryEmailAddress?.emailAddress || "-"}</Text>
        </View>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Feather name="file-text" size={22} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Termos De Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="database" size={22} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Alterar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="help-circle" size={22} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonExit} onPress={handleSignOut}>
          <AntDesign name="closecircle" size={22} color="#F44" style={styles.buttonIcon} />
          <Text style={styles.buttonExitText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

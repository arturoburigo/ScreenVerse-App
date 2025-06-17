import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}> 
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
        <TouchableOpacity style={styles.buttonExit}>
          <AntDesign name="closecircle" size={22} color="#F44" style={styles.buttonIcon} />
          <Text style={styles.buttonExitText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

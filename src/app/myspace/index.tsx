import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Header } from "@/components/Header";

export default function MySpace() {
  const { user } = useUser();
  const { signOut } = useAuth();
  
  // 1. Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("My list");

  const navButtons = ["My list", "Series", "Movies"];

  return (
    <View style={styles.container}>
      <Header />

      {/* 2. Container da navegação */}
      <View style={styles.containerNav}>
        {navButtons.map((title) => (
          <TouchableOpacity
            key={title}
            // 3. Estilo condicional para o botão
            style={[
              styles.buttonNav,
              activeTab === title ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setActiveTab(title)}
          >
            {/* 4. Estilo condicional para o texto */}
            <Text
              style={[
                styles.buttonText,
                activeTab === title ? styles.activeText : styles.inactiveText,
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentArea}>
         <Text style={styles.text}>Conteúdo de {activeTab}</Text>
         {/* <Text style={styles.subtext}>Welcome, {user?.firstName}!</Text>
         <Button icon="exit" title="Sair" onPress={() => signOut()} /> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // Padding horizontal para não colar nas bordas
    paddingTop: 8,
    backgroundColor: "#121212",
  },
  containerNav: {
    flexDirection: "row",
    gap: 12, // Espaço entre os botões
    marginTop: 24, // Espaço abaixo do Header
    marginBottom: 24,
  },
  // Estilo base para os botões
  buttonNav: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // Cantos bem arredondados
    borderWidth: 1,
  },
  // Estilo para o botão ATIVO
  activeButton: {
    backgroundColor: "#E5E5E5",
    borderColor: '#E5E5E5',
  },
  // Estilo para o botão INATIVO
  inactiveButton: {
    backgroundColor: "transparent",
    borderColor: '#555',
  },
  // Estilo base para o texto dos botões
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // Estilo para o texto ATIVO
  activeText: {
    color: "#121212",
  },
  // Estilo para o texto INATIVO
  inactiveText: {
    color: "#E5E5E5",
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtext: {
    fontSize: 18,
    color: "#676D75",
  },
});
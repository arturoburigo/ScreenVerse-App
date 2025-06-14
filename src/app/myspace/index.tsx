import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Header } from "@/components/Header";
import { styles } from "./styles";

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
      </View>
    </View>
  );
}

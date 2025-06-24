import React from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { styles } from "./styles";
import * as Device from "expo-device";

export function NotificationLimitationsInfo() {
  const isPhysicalDevice = Device.isDevice;

  const handleOpenDevBuildGuide = () => {
    Alert.alert(
      "Desenvolvimento Build",
      "Para usar todas as funcionalidades de notificação, você precisa criar um development build. Isso permite que as notificações funcionem completamente.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Abrir Guia",
          onPress: () =>
            Linking.openURL(
              "https://docs.expo.dev/develop/development-builds/introduction/"
            ),
        },
      ]
    );
  };

  const handleTestInPhysicalDevice = () => {
    Alert.alert(
      "Testar em Dispositivo Físico",
      "As notificações funcionam melhor em dispositivos físicos. Você pode:\n\n1. Conectar seu celular via USB\n2. Instalar o Expo Go\n3. Escanear o QR code\n4. Testar as notificações",
      [{ text: "Entendi", style: "default" }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ℹ️ Informações sobre Notificações</Text>

      {!isPhysicalDevice && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>⚠️ Emulador Detectado</Text>
          <Text style={styles.warningText}>
            Você está usando um emulador. As notificações podem não funcionar
            completamente.
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleTestInPhysicalDevice}
          >
            <Text style={styles.actionButtonText}>Como Testar no Celular</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>📱 Limitações do Expo Go</Text>
        <Text style={styles.infoText}>
          • Notificações locais funcionam (como lembretes)
        </Text>
        <Text style={styles.infoText}>
          • Funciona melhor em dispositivos físicos
        </Text>
        <Text style={styles.infoText}>
          • Para funcionalidade completa, use Development Build
        </Text>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={handleOpenDevBuildGuide}
        >
          <Text style={styles.linkButtonText}>
            📖 Saiba mais sobre Development Build
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status Atual:</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Dispositivo:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: isPhysicalDevice ? "#4CAF50" : "#FF9800" },
            ]}
          >
            {isPhysicalDevice ? "Físico ✓" : "Emulador"}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Notificações Locais:</Text>
          <Text style={[styles.statusValue, { color: "#4CAF50" }]}>
            Suportadas ✓
          </Text>
        </View>
      </View>

      {isPhysicalDevice && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            ✅ Ótimo! Você está em um dispositivo físico. As notificações devem
            funcionar normalmente.
          </Text>
        </View>
      )}
    </View>
  );
}

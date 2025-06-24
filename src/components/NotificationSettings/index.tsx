import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNotifications } from "../../hooks";
import { NotificationLimitationsInfo } from "../NotificationLimitationsInfo";
import { StyleSheet } from "react-native";

interface NotificationSettingsProps {
  showTestButton?: boolean;
}

export function NotificationSettings({
  showTestButton = false,
}: NotificationSettingsProps) {
  const {
    permissionStatus,
    isReminderActive,
    isLoading,
    error,
    requestPermissions,
    startMovieRatingReminder,
    stopMovieRatingReminder,
    sendTestNotification,
    clearError,
  } = useNotifications();

  const handleToggleReminder = async () => {
    if (!permissionStatus?.granted) {
      Alert.alert(
        "Permissões necessárias",
        "Para ativar os lembretes, precisamos de permissão para enviar notificações.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Permitir", onPress: requestPermissions },
        ]
      );
      return;
    }

    if (isReminderActive) {
      await stopMovieRatingReminder();
      Alert.alert(
        "Lembretes desativados",
        "Os lembretes para avaliar filmes foram desativados."
      );
    } else {
      await startMovieRatingReminder();
      Alert.alert(
        "Lembretes ativados",
        "Você receberá um lembrete a cada 1 minuto para avaliar filmes no ScreenVerse!"
      );
    }
  };

  const handleTestNotification = async () => {
    if (!permissionStatus?.granted) {
      Alert.alert(
        "Permissões necessárias",
        "Para enviar notificações de teste, precisamos de permissão.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Permitir", onPress: requestPermissions },
        ]
      );
      return;
    }

    await sendTestNotification();
    Alert.alert("Teste enviado", "Uma notificação de teste foi enviada!");
  };

  const handleRequestPermissions = async () => {
    await requestPermissions();
    if (permissionStatus?.granted) {
      Alert.alert(
        "Permissões concedidas",
        "Agora você pode ativar os lembretes de filmes!"
      );
    }
  };
  return (
    <>
      {/* Informações sobre limitações */}
      {/* <NotificationLimitationsInfo /> */}
      <View style={styles.container}>
        <Text style={styles.title}>Lembretes de Filmes</Text>{" "}
        <Text style={styles.description}>
          Receba lembretes a cada 1 minuto para avaliar os filmes que você
          assistiu
        </Text>
        {/* Status das permissões */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status das permissões:</Text>
          <Text
            style={[
              styles.statusText,
              { color: permissionStatus?.granted ? "#4CAF50" : "#F44336" },
            ]}
          >
            {permissionStatus?.granted ? "Concedidas ✓" : "Não concedidas ✗"}
          </Text>
        </View>
        {/* Status do lembrete */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Lembretes:</Text>
          <Text
            style={[
              styles.statusText,
              { color: isReminderActive ? "#4CAF50" : "#757575" },
            ]}
          >
            {isReminderActive ? "Ativados ✓" : "Desativados"}
          </Text>
        </View>
        {/* Botões de ação */}
        <View style={styles.buttonsContainer}>
          {!permissionStatus?.granted && (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleRequestPermissions}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Permitir Notificações</Text>
              )}
            </TouchableOpacity>
          )}

          {permissionStatus?.granted && (
            <TouchableOpacity
              style={[
                styles.button,
                isReminderActive ? styles.dangerButton : styles.successButton,
              ]}
              onPress={handleToggleReminder}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  {isReminderActive
                    ? "Desativar Lembretes"
                    : "Ativar Lembretes"}
                </Text>
              )}
            </TouchableOpacity>
          )}

          {showTestButton && permissionStatus?.granted && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleTestNotification}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#666666" />
              ) : (
                <Text style={[styles.buttonText, { color: "#666666" }]}>
                  Testar Notificação
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        {/* Exibir erro se houver */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.clearErrorButton}
              onPress={clearError}
            >
              <Text style={styles.clearErrorText}>✗</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Informações adicionais */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            💡 Dica: Os lembretes funcionam mesmo quando o app está fechado!
          </Text>
          <Text style={styles.infoText}>
            🎬 Toque na notificação para ir direto para a tela de avaliação.{" "}
          </Text>
        </View>
      </View>{" "}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 16,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: "#007BFF",
  },
  successButton: {
    backgroundColor: "#4CAF50",
  },
  dangerButton: {
    backgroundColor: "#F44336",
  },
  secondaryButton: {
    backgroundColor: "#E0E0E0",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: "#D32F2F",
    lineHeight: 18,
  },
  clearErrorButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearErrorText: {
    fontSize: 16,
    color: "#D32F2F",
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoText: {
    fontSize: 12,
    color: "#1976D2",
    lineHeight: 16,
    marginBottom: 4,
  },
});

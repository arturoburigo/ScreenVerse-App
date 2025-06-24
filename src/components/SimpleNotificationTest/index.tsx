import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import {
  testSimpleNotification,
  testDelayedNotification,
  cancelAllNotifications,
  checkScheduledNotifications,
} from "../../utils/notificationTestUtils";

export function SimpleNotificationTest() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSimpleTest = async () => {
    setIsLoading(true);
    const success = await testSimpleNotification();
    setIsLoading(false);

    if (success) {
      Alert.alert("Sucesso!", "Notificação enviada! Verifique se apareceu.");
    } else {
      Alert.alert(
        "Erro",
        "Não foi possível enviar a notificação. Verifique as permissões."
      );
    }
  };

  const handleDelayedTest = async () => {
    setIsLoading(true);
    const success = await testDelayedNotification();
    setIsLoading(false);

    if (success) {
      Alert.alert(
        "Agendado!",
        "Notificação agendada para 10 segundos. Aguarde!"
      );
    } else {
      Alert.alert("Erro", "Não foi possível agendar a notificação.");
    }
  };

  const handleCancelAll = async () => {
    const success = await cancelAllNotifications();
    if (success) {
      Alert.alert("Cancelado", "Todas as notificações foram canceladas.");
    }
  };

  const handleCheckScheduled = async () => {
    const notifications = await checkScheduledNotifications();
    Alert.alert(
      "Notificações Agendadas",
      `Você tem ${notifications.length} notificação(ões) agendada(s). Verifique o console para detalhes.`
    );
  };

  return (
    <View style={testStyles.container}>
      <Text style={testStyles.title}>🧪 Teste Simples de Notificações</Text>

      <TouchableOpacity
        style={[testStyles.button, testStyles.primaryButton]}
        onPress={handleSimpleTest}
        disabled={isLoading}
      >
        <Text style={testStyles.buttonText}>
          {isLoading ? "Enviando..." : "📱 Teste Imediato"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[testStyles.button, testStyles.secondaryButton]}
        onPress={handleDelayedTest}
        disabled={isLoading}
      >
        <Text style={testStyles.buttonText}>⏰ Teste com Delay (10s)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[testStyles.button, testStyles.infoButton]}
        onPress={handleCheckScheduled}
      >
        <Text style={testStyles.buttonText}>📋 Ver Agendadas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[testStyles.button, testStyles.dangerButton]}
        onPress={handleCancelAll}
      >
        <Text style={testStyles.buttonText}>🗑️ Cancelar Todas</Text>
      </TouchableOpacity>

      <Text style={testStyles.helpText}>
        Use estes botões para testar se as notificações estão funcionando no seu
        dispositivo.
      </Text>
    </View>
  );
}

const testStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FF",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderStyle: "dashed",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007BFF",
  },
  secondaryButton: {
    backgroundColor: "#6C757D",
  },
  infoButton: {
    backgroundColor: "#17A2B8",
  },
  dangerButton: {
    backgroundColor: "#DC3545",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  helpText: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic",
  },
});

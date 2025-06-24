// Exemplo de uso do sistema de notificações
// Este arquivo demonstra como integrar as notificações em diferentes partes do app

import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
import { useNotifications } from "@/hooks";
import { NotificationSettings } from "@/components/NotificationSettings";

/**
 * Exemplo 1: Componente completo com interface
 */
export function NotificationExample1() {
  return (
    <View>
      <NotificationSettings showTestButton={true} />
    </View>
  );
}

/**
 * Exemplo 2: Uso básico do hook sem interface
 */
export function NotificationExample2() {
  const {
    isReminderActive,
    startMovieRatingReminder,
    stopMovieRatingReminder,
    requestPermissions,
  } = useNotifications();

  const handleToggleNotifications = async () => {
    if (isReminderActive) {
      await stopMovieRatingReminder();
      Alert.alert("Sucesso", "Lembretes desativados!");
    } else {
      try {
        await startMovieRatingReminder();
        Alert.alert(
          "Sucesso",
          "Lembretes ativados! Você receberá uma notificação a cada 1 minuto."
        );
      } catch (error) {
        // Se der erro, provavelmente é permissão
        await requestPermissions();
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={isReminderActive ? "Desativar Lembretes" : "Ativar Lembretes"}
        onPress={handleToggleNotifications}
      />
    </View>
  );
}

/**
 * Exemplo 3: Auto-ativação de notificações quando o usuário faz login
 */
export function NotificationExample3() {
  const { startMovieRatingReminder, permissionStatus } = useNotifications();

  useEffect(() => {
    // Auto-ativar notificações quando o usuário faz login
    const autoStartNotifications = async () => {
      if (permissionStatus?.granted) {
        try {
          await startMovieRatingReminder();
          console.log("Notificações ativadas automaticamente");
        } catch (error) {
          console.log("Erro ao ativar notificações:", error);
        }
      }
    };

    autoStartNotifications();
  }, [permissionStatus?.granted]);

  return null; // Componente invisível
}

/**
 * Exemplo 4: Botão simples para testar notificações
 */
export function NotificationTestButton() {
  const { sendTestNotification, permissionStatus } = useNotifications();

  const handleTest = async () => {
    if (!permissionStatus?.granted) {
      Alert.alert("Erro", "Permissões de notificação não concedidas");
      return;
    }

    try {
      await sendTestNotification();
      Alert.alert("Sucesso", "Notificação de teste enviada!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao enviar notificação de teste");
    }
  };

  return (
    <Button
      title="🔔 Testar Notificação"
      onPress={handleTest}
      disabled={!permissionStatus?.granted}
    />
  );
}

/**
 * Exemplo 5: Hook personalizado para lidar com navegação por notificação
 */
export function useNotificationNavigation() {
  const {} = useNotifications();

  useEffect(() => {
    // Este listener seria ativado quando o usuário toca numa notificação
    // Você pode usar isso para navegar para uma tela específica
    // Exemplo de implementação:
    // const subscription = addNotificationResponseReceivedListener((response) => {
    //   const data = response.notification.request.content.data;
    //
    //   if (data?.type === 'movie-rating-reminder') {
    //     // Navegar para tela de avaliação
    //     navigation.navigate('rate');
    //   }
    // });
    // return () => subscription.remove();
  }, []);
}

// Como usar nos seus componentes:

// 1. Na tela principal (já implementado):
// import { NotificationSettings } from '@/components/NotificationSettings';
// <NotificationSettings showTestButton={true} />

// 2. Em qualquer tela que queira controlar notificações:
// import { useNotifications } from '@/hooks';
// const { isReminderActive, startMovieRatingReminder } = useNotifications();

// 3. Para testar rapidamente:
// import { NotificationTestButton } from './examples';
// <NotificationTestButton />

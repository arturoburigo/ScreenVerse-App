import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Configurar como as notificações devem se comportar quando o app está em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: Notifications.PermissionStatus;
}

class NotificationService {
  private notificationIdentifier: string | null = null;

  /**
   * Solicita permissões para notificações
   */ async requestPermissions(): Promise<NotificationPermissionStatus> {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("movie-reminders", {
          name: "Lembretes de Filmes",
          description: "Notificações para lembrar de avaliar filmes",
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return {
        granted: finalStatus === "granted",
        canAskAgain: existingStatus !== "denied",
        status: finalStatus,
      };
    } catch (error) {
      console.error("Erro ao solicitar permissões:", error);
      return {
        granted: false,
        canAskAgain: true,
        status: "denied" as Notifications.PermissionStatus,
      };
    }
  }
  /**
   * Programa notificação recorrente a cada 1 minuto para lembrar de avaliar filmes
   */
  async scheduleMovieRatingReminder(): Promise<void> {
    try {
      // Cancela notificação anterior se existir
      if (this.notificationIdentifier) {
        await this.cancelMovieRatingReminder();
      }

      const permissionStatus = await this.requestPermissions();

      if (!permissionStatus.granted) {
        throw new Error("Permissão para notificações não concedida");
      }

      // Lista de mensagens variadas para tornar as notificações mais interessantes
      const messages = [
        "🎬 Que tal avaliar alguns filmes que você assistiu?",
        "⭐ Compartilhe sua opinião sobre os filmes!",
        "🍿 Lembre-se de avaliar os filmes no ScreenVerse!",
        "🎭 Sua avaliação ajuda outros usuários!",
        "🌟 Avalie os filmes e descubra novos favoritos!",
        "🎪 Que filme você gostaria de avaliar agora?",
      ];

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      // Programa notificação recorrente a cada 1 minuto (60 segundos)
      this.notificationIdentifier =
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "ScreenVerse",
            body: randomMessage,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.DEFAULT,
            data: {
              type: "movie-rating-reminder",
              timestamp: Date.now(),
            },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 60, // 1 minuto
            repeats: true,
          },
        });

      console.log("Lembrete de avaliação de filmes agendado com sucesso");
    } catch (error) {
      console.error("Erro ao agendar lembrete de filmes:", error);
      throw error;
    }
  }

  /**
   * Cancela o lembrete de avaliação de filmes
   */
  async cancelMovieRatingReminder(): Promise<void> {
    try {
      if (this.notificationIdentifier) {
        await Notifications.cancelScheduledNotificationAsync(
          this.notificationIdentifier
        );
        this.notificationIdentifier = null;
        console.log("Lembrete de avaliação de filmes cancelado");
      }
    } catch (error) {
      console.error("Erro ao cancelar lembrete de filmes:", error);
      throw error;
    }
  }

  /**
   * Cancela todas as notificações agendadas
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      this.notificationIdentifier = null;
      console.log("Todas as notificações foram canceladas");
    } catch (error) {
      console.error("Erro ao cancelar todas as notificações:", error);
      throw error;
    }
  }

  /**
   * Verifica se há notificações agendadas
   */
  async getScheduledNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Erro ao obter notificações agendadas:", error);
      return [];
    }
  }

  /**
   * Envia uma notificação imediata (para teste)
   */
  async sendTestNotification(): Promise<void> {
    try {
      const permissionStatus = await this.requestPermissions();

      if (!permissionStatus.granted) {
        throw new Error("Permissão para notificações não concedida");
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "ScreenVerse - Teste",
          body: "🎬 Esta é uma notificação de teste!",
          sound: true,
          data: {
            type: "test",
            timestamp: Date.now(),
          },
        },
        trigger: null, // Envia imediatamente
      });

      console.log("Notificação de teste enviada");
    } catch (error) {
      console.error("Erro ao enviar notificação de teste:", error);
      throw error;
    }
  }

  /**
   * Verifica o status atual das permissões
   */
  async getPermissionStatus(): Promise<NotificationPermissionStatus> {
    const { status } = await Notifications.getPermissionsAsync();
    return {
      granted: status === "granted",
      canAskAgain: status !== "denied",
      status,
    };
  }
}

// Instância singleton do serviço de notificações
export const notificationService = new NotificationService();

// Tipos para listeners de notificações
export type NotificationListener = (
  notification: Notifications.Notification
) => void;
export type NotificationResponseListener = (
  response: Notifications.NotificationResponse
) => void;

/**
 * Adiciona listener para notificações recebidas quando o app está em primeiro plano
 */
export function addNotificationReceivedListener(
  listener: NotificationListener
): Notifications.Subscription {
  return Notifications.addNotificationReceivedListener(listener);
}

/**
 * Adiciona listener para quando o usuário interage com uma notificação
 */
export function addNotificationResponseReceivedListener(
  listener: NotificationResponseListener
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener(listener);
}

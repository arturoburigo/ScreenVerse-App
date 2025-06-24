import { useEffect, useState, useCallback } from "react";
import * as Notifications from "expo-notifications";
import {
  notificationService,
  NotificationPermissionStatus,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from "../services/notificationService";

export interface UseNotificationsReturn {
  permissionStatus: NotificationPermissionStatus | null;
  isReminderActive: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermissions: () => Promise<void>;
  startMovieRatingReminder: () => Promise<void>;
  stopMovieRatingReminder: () => Promise<void>;
  sendTestNotification: () => Promise<void>;
  clearError: () => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus | null>(null);
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar status inicial das permissões
  useEffect(() => {
    const checkInitialPermissions = async () => {
      try {
        const status = await notificationService.getPermissionStatus();
        setPermissionStatus(status);

        // Verificar se há notificações agendadas
        const scheduledNotifications =
          await notificationService.getScheduledNotifications();
        const hasMovieReminder = scheduledNotifications.some(
          (notification) =>
            notification.content.data?.type === "movie-rating-reminder"
        );
        setIsReminderActive(hasMovieReminder);
      } catch (err) {
        console.error(
          "Erro ao verificar status inicial das notificações:",
          err
        );
      }
    };

    checkInitialPermissions();
  }, []);

  // Configurar listeners para notificações
  useEffect(() => {
    // Listener para notificações recebidas quando o app está em primeiro plano
    const notificationListener = addNotificationReceivedListener(
      (notification) => {
        console.log("Notificação recebida:", notification);
        // Aqui você pode adicionar lógica adicional, como mostrar um toast
      }
    );

    // Listener para quando o usuário interage com uma notificação
    const responseListener = addNotificationResponseReceivedListener(
      (response) => {
        console.log("Resposta da notificação:", response);
        const notificationData = response.notification.request.content.data;

        if (notificationData?.type === "movie-rating-reminder") {
          // Aqui você pode navegar para a tela de avaliação de filmes
          console.log("Usuário tocou na notificação de lembrete de filmes");
          // Exemplo: navigation.navigate('rate');
        }
      }
    );

    // Cleanup dos listeners
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  const requestPermissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const status = await notificationService.requestPermissions();
      setPermissionStatus(status);

      if (!status.granted) {
        setError(
          "Permissões de notificação não concedidas. Verifique as configurações do seu dispositivo."
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao solicitar permissões";
      setError(errorMessage);
      console.error("Erro ao solicitar permissões:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startMovieRatingReminder = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await notificationService.scheduleMovieRatingReminder();
      setIsReminderActive(true);
      console.log("Lembrete de avaliação de filmes iniciado");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao iniciar lembrete";
      setError(errorMessage);
      console.error("Erro ao iniciar lembrete:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopMovieRatingReminder = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await notificationService.cancelMovieRatingReminder();
      setIsReminderActive(false);
      console.log("Lembrete de avaliação de filmes parado");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao parar lembrete";
      setError(errorMessage);
      console.error("Erro ao parar lembrete:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendTestNotification = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await notificationService.sendTestNotification();
      console.log("Notificação de teste enviada");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao enviar notificação de teste";
      setError(errorMessage);
      console.error("Erro ao enviar notificação de teste:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    permissionStatus,
    isReminderActive,
    isLoading,
    error,
    requestPermissions,
    startMovieRatingReminder,
    stopMovieRatingReminder,
    sendTestNotification,
    clearError,
  };
}

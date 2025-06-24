import * as Notifications from "expo-notifications";

// Função simples para testar notificações imediatas
export async function testSimpleNotification() {
  try {
    // Solicitar permissões
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      console.log("Permissões de notificação negadas");
      return false;
    }

    console.log("Permissões concedidas, enviando notificação de teste...");

    // Enviar notificação imediata
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Teste ScreenVerse! 🎬",
        body: "Se você está vendo isso, as notificações estão funcionando!",
        sound: true,
      },
      trigger: null, // Imediato
    });

    console.log("Notificação de teste enviada com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao testar notificação:", error);
    return false;
  }
}

// Função para agendar notificação em 10 segundos (para teste)
export async function testDelayedNotification() {
  try {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      console.log("Permissões de notificação negadas");
      return false;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Teste com Delay! ⏰",
        body: "Esta notificação foi agendada para 10 segundos!",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        repeats: false,
      },
    });

    console.log("Notificação com delay agendada! Aguarde 10 segundos...");
    return true;
  } catch (error) {
    console.error("Erro ao agendar notificação:", error);
    return false;
  }
}

// Função para cancelar todas as notificações
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Todas as notificações foram canceladas");
    return true;
  } catch (error) {
    console.error("Erro ao cancelar notificações:", error);
    return false;
  }
}

// Função para verificar notificações agendadas
export async function checkScheduledNotifications() {
  try {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();
    console.log("Notificações agendadas:", notifications.length);
    notifications.forEach((notification, index) => {
      console.log(
        `${index + 1}. ${notification.content.title} - ${
          notification.content.body
        }`
      );
    });
    return notifications;
  } catch (error) {
    console.error("Erro ao verificar notificações agendadas:", error);
    return [];
  }
}

# Sistema de Notificações - ScreenVerse

## Visão Geral

O ScreenVerse agora inclui um sistema completo de notificações que lembra os usuários a cada 1 minuto para avaliar filmes. O sistema é construído usando Expo Notifications e inclui:

- Notificações recorrentes automáticas
- Gerenciamento de permissões
- Interface de usuário para controle
- Mensagens variadas para manter o engajamento

## Funcionalidades Implementadas

### 1. Serviço de Notificações (`notificationService.ts`)

- **Gerenciamento de Permissões**: Solicita e verifica permissões de notificação
- **Notificações Recorrentes**: Programa lembretes a cada 1 minuto
- **Mensagens Variadas**: 6 mensagens diferentes para manter o interesse
- **Suporte a Canais**: Configuração de canais para Android
- **Notificações de Teste**: Funcionalidade para testar o sistema

### 2. Hook Personalizado (`useNotifications.ts`)

- **Estado Reativo**: Gerencia estado das permissões e lembretes
- **Listeners de Eventos**: Escuta notificações recebidas e interações
- **Tratamento de Erros**: Captura e exibe erros de forma amigável
- **Carregamento**: Estados de loading para melhor UX

### 3. Componente de Interface (`NotificationSettings`)

- **Interface Intuitiva**: Botões claros para ativar/desativar lembretes
- **Status Visual**: Indicadores visuais do estado das permissões e lembretes
- **Alertas Informativos**: Feedback claro para o usuário
- **Botão de Teste**: Permite testar notificações instantaneamente

## Como Usar

### Para o Usuário Final

1. **Na tela inicial do app**, role para baixo para encontrar a seção "Lembretes de Filmes"
2. **Clique em "Permitir Notificações"** se as permissões não estiverem concedidas
3. **Clique em "Ativar Lembretes"** para começar a receber notificações a cada 1 minuto
4. **Use "Testar Notificação"** para verificar se tudo está funcionando
5. **Toque nas notificações** para ser direcionado ao app (funcionalidade pode ser expandida)

### Para Desenvolvedores

#### Importação e Uso Básico

```typescript
import { useNotifications } from '@/hooks';
import { NotificationSettings } from '@/components/NotificationSettings';

// Em um componente React
function MyComponent() {
  const {
    permissionStatus,
    isReminderActive,
    startMovieRatingReminder,
    stopMovieRatingReminder
  } = useNotifications();

  // Usar o componente pronto
  return <NotificationSettings showTestButton={true} />;
}
```

#### Uso Avançado do Serviço

```typescript
import { notificationService } from '@/services/notificationService';

// Programar lembrete
await notificationService.scheduleMovieRatingReminder();

// Cancelar lembrete
await notificationService.cancelMovieRatingReminder();

// Verificar notificações agendadas
const scheduled = await notificationService.getScheduledNotifications();

// Enviar notificação de teste
await notificationService.sendTestNotification();
```

## Configurações Técnicas

### Frequência das Notificações
- **Intervalo**: 1 minuto (60 segundos)
- **Tipo**: Recorrente (repeats: true)
- **Comportamento**: Funciona mesmo com o app fechado

### Permissões Necessárias
- **iOS**: Alertas, sons e badges
- **Android**: Canal de notificação personalizado
- **Verificação**: Automática na inicialização

### Mensagens Disponíveis
1. "🎬 Que tal avaliar alguns filmes que você assistiu?"
2. "⭐ Compartilhe sua opinião sobre os filmes!"
3. "🍿 Lembre-se de avaliar os filmes no ScreenVerse!"
4. "🎭 Sua avaliação ajuda outros usuários!"
5. "🌟 Avalie os filmes e descubra novos favoritos!"
6. "🎪 Que filme você gostaria de avaliar agora?"

## Estrutura de Arquivos

```
src/
├── services/
│   └── notificationService.ts     # Serviço principal de notificações
├── hooks/
│   ├── useNotifications.ts        # Hook para gerenciar notificações
│   └── index.ts                   # Exportações dos hooks
├── components/
│   └── NotificationSettings/
│       ├── index.tsx              # Componente de interface
│       └── styles.ts              # Estilos do componente
└── app/
    └── home/
        └── index.tsx              # Integração na tela inicial
```

## Dependências Utilizadas

- `expo-notifications`: Biblioteca principal para notificações
- `expo-device`: Verificação de dispositivo físico
- `react-native`: Componentes de interface
- `@expo/vector-icons`: Ícones (se necessário)

## Melhorias Futuras Sugeridas

1. **Navegação Inteligente**: Direcionar para tela específica ao tocar na notificação
2. **Frequência Personalizada**: Permitir que usuário escolha o intervalo
3. **Horário Inteligente**: Não enviar notificações durante a madrugada
4. **Contexto Inteligente**: Baseado em filmes recentemente assistidos
5. **Analytics**: Rastrear engajamento com as notificações
6. **Push Notifications**: Para usuários que não abrem o app

## Problemas Conhecidos e Soluções

### Permissões Negadas
- **Problema**: Usuário nega permissões
- **Solução**: Interface guia para configurações do sistema

### Notificações Não Aparecem
- **Problema**: Dispositivo pode ter configurações restritivas
- **Solução**: Botão de teste e instruções claras

### Performance
- **Problema**: Muitas notificações podem irritar usuários
- **Solução**: Interface clara para desativar e mensagens variadas

## Comandos para Teste

### Instalação (se necessário)
```bash
npx expo install expo-notifications expo-device
```

### Testar em Dispositivo Físico
1. Build do app: `expo build`
2. Instalar em dispositivo físico
3. Ativar lembretes na interface
4. Aguardar 1 minuto ou usar "Testar Notificação"

### Debug
```typescript
// Ver notificações agendadas
const scheduled = await notificationService.getScheduledNotifications();
console.log('Notificações agendadas:', scheduled);

// Ver status de permissões
const status = await notificationService.getPermissionStatus();
console.log('Status das permissões:', status);
```

## Considerações de UX

- **Não Intrusivo**: Fácil de desativar se o usuário não quiser
- **Feedback Visual**: Estados claros na interface
- **Mensagens Amigáveis**: Tom conversacional e emojis
- **Teste Simples**: Botão para verificar se está funcionando
- **Informações Claras**: Explicações sobre o que faz cada botão

Este sistema de notificações foi projetado para aumentar o engajamento dos usuários com o app, lembrando-os regularmente de contribuir com suas avaliações de filmes, mantendo a comunidade ativa e os dados atualizados.

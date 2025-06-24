# Guia de Solução de Problemas - Notificações ScreenVerse

## 🔧 Problemas Comuns e Soluções

### 1. "Não consigo receber notificações"

#### Causa: Usando Expo Go com limitações
**Solução:**
- ✅ Use o componente "Teste Simples de Notificações" na tela inicial
- ✅ Teste com um dispositivo físico (não emulador)
- ✅ Para funcionalidade completa, crie um Development Build

#### Passos para testar:
1. Abra o app no seu celular (não emulador)
2. Na tela inicial, encontre a seção "🧪 Teste Simples de Notificações"
3. Clique em "📱 Teste Imediato"
4. Permita notificações quando solicitado
5. Você deve ver uma notificação instantânea

### 2. "Permissões negadas"

#### Solução Android:
1. Vá em Configurações → Apps → Expo Go
2. Toque em "Permissões" ou "Permissions"
3. Ative "Notificações"

#### Solução iOS:
1. Vá em Configurações → Notificações
2. Encontre "Expo Go"
3. Ative "Permitir Notificações"

### 3. "Notificações não aparecem no emulador"

#### Causa: Limitação técnica
**Solução:**
- ❌ Emuladores têm limitações com notificações
- ✅ Use um dispositivo físico para testes reais
- ✅ Use o simulador iOS (funciona melhor que emulador Android)

### 4. "Expo Go diz que notificações não são suportadas"

#### Causa: SDK 53 removeu algumas funcionalidades push do Expo Go
**Solução:**
- ✅ Notificações locais ainda funcionam (nosso caso)
- ✅ Use Development Build para funcionalidade completa
- ✅ Teste com os botões de teste fornecidos

### 5. "Como criar um Development Build"

#### Passos:
```bash
# 1. Instalar EAS CLI
npm install -g @expo/eas-cli

# 2. Login no Expo
eas login

# 3. Configurar projeto
eas build:configure

# 4. Build para dispositivo
eas build --platform android --profile development
# ou
eas build --platform ios --profile development
```

## 🧪 Como Testar Agora

### Teste Rápido (5 minutos):
1. **Abra o app no seu celular** (escaneie o QR code)
2. **Na tela inicial**, role para baixo
3. **Encontre "🧪 Teste Simples de Notificações"**
4. **Clique "📱 Teste Imediato"**
5. **Permita notificações**
6. **Veja se a notificação aparece**

### Teste com Delay:
1. **Clique "⏰ Teste com Delay (10s)"**
2. **Aguarde 10 segundos**
3. **A notificação deve aparecer**

### Teste dos Lembretes:
1. **Role para "Lembretes de Filmes"**
2. **Clique "Permitir Notificações"** (se necessário)
3. **Clique "Ativar Lembretes"**
4. **Aguarde 1 minuto**
5. **Deve receber um lembrete automático**

## 📱 Dispositivos Testados

### ✅ Funcionam Bem:
- iPhone físico + Expo Go
- Android físico + Expo Go
- iOS Simulator (limitado)

### ⚠️ Limitações:
- Emulador Android (pode não funcionar)
- Expo Go (algumas limitações no SDK 53)

### 🚀 Funcionalidade Completa:
- Development Build + dispositivo físico
- Build de produção

## 🔍 Debug

### Verificar no Console:
```javascript
// No console do Chrome DevTools, você verá:
"Permissões concedidas, enviando notificação de teste..."
"Notificação de teste enviada com sucesso!"
```

### Comandos de Debug:
- **"📋 Ver Agendadas"** - mostra quantas notificações estão agendadas
- **"🗑️ Cancelar Todas"** - limpa todas as notificações

## 📞 Suporte

Se ainda não conseguir fazer funcionar:

1. **Verifique o dispositivo**: Físico funciona melhor que emulador
2. **Verifique as permissões**: Configure manualmente se necessário
3. **Use os testes simples**: Comece com "Teste Imediato"
4. **Console**: Verifique mensagens de erro no console
5. **Development Build**: Para funcionalidade 100% completa

## 🎯 Resultado Esperado

Quando funcionando corretamente, você deve:
- ✅ Receber notificação imediata no teste
- ✅ Receber notificação com delay de 10s
- ✅ Receber lembretes a cada 1 minuto (quando ativado)
- ✅ Ver status "Permissões: Concedidas ✓"
- ✅ Ver status "Lembretes: Ativados ✓"

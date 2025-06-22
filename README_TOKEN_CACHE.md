# Sistema de Cache de Token - Screenverse

## Visão Geral

Este sistema implementa um cache seguro de tokens de autenticação usando `expo-secure-store` para armazenar tokens de acesso, refresh tokens e dados do usuário de forma segura.

## Estrutura

### 1. Token Cache (`src/app/storage/tokenCache.ts`)

Sistema de cache seguro que utiliza `expo-secure-store` para armazenar:
- Access Token
- Refresh Token  
- Dados do usuário

**Métodos disponíveis:**
- `getToken(key)`: Obtém um token específico
- `saveToken(key, value)`: Salva um token
- `removeToken(key)`: Remove um token específico
- `clearAllTokens()`: Limpa todos os tokens
- `hasToken(key)`: Verifica se um token existe

### 2. Auth Service (`src/services/authService.ts`)

Serviço que gerencia toda a lógica de autenticação e integra com o cache de token.

**Funcionalidades principais:**
- Autenticação com Clerk
- Gerenciamento de tokens (salvar, obter, renovar)
- Logout (limpa tokens)
- Verificação de autenticação

### 3. API Interceptors (`src/services/api.ts`)

Interceptors automáticos que:
- Adicionam token de autorização em todas as requisições
- Renovam token automaticamente quando expira (401)
- Fazem logout automático se não conseguir renovar

### 4. Hook useAuth (`src/hooks/useAuth.ts`)

Hook personalizado para gerenciar estado de autenticação nos componentes.

## Como Usar

### 1. Em Componentes

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, userData, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    // Redirecionar para login
  };
  
  return (
    // seu componente
  );
}
```

### 2. Logout no Perfil

O perfil já está configurado para limpar tokens ao fazer logout:

```typescript
const handleSignOut = async () => {
  try {
    // Limpar tokens do backend
    await logoutBackend();
    
    // Fazer logout do Clerk
    await signOut();
    
    // Redirecionar para tela de login
    router.replace("/public");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
```

### 3. Verificar Autenticação

```typescript
import { authService } from '@/services/authService';

const isAuth = await authService.isAuthenticated();
const userData = await authService.getUserData();
```

## Segurança

- Tokens são armazenados usando `expo-secure-store` (criptografado)
- Refresh automático de tokens expirados
- Logout automático em caso de falha na renovação
- Limpeza completa de tokens no logout

## Fluxo de Autenticação

1. **Login**: Usuário faz login via Clerk (Google/GitHub)
2. **Backend**: Token é criado no backend e salvo no cache seguro
3. **Requisições**: Interceptor adiciona token automaticamente
4. **Expiração**: Token é renovado automaticamente quando necessário
5. **Logout**: Todos os tokens são limpos do cache

## Dados Locais vs Tokens

- **Tokens**: Armazenados de forma segura no `expo-secure-store`
- **Dados locais** (watchlist, avaliações): Continuam usando `AsyncStorage` pois não são sensíveis 
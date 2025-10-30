# 📝 Guia de Configuração Google OAuth

## 📋 Checklist de Passos

### 1. Acessar Google Cloud Console

- ✅ URL: https://console.cloud.google.com/
- ✅ Fazer login com sua conta Google

### 2. Criar Novo Projeto

- ✅ Nome: "Família Alcantara"
- ✅ Selecionar o projeto criado

### 3. Habilitar APIs Necessárias

- ✅ Google Calendar API
- ✅ People API (para informações do usuário)

### 4. Configurar Tela de Consentimento

- ✅ Tipo: Externo
- ✅ Nome: "Família Alcantara"
- ✅ Email de suporte
- ✅ Adicionar usuários de teste

### 5. Criar Credenciais OAuth

- ✅ Tipo: Aplicativo da Web
- ✅ Redirecionamento: `http://localhost:5000/api/auth/google/callback`
- ✅ Copiar Client ID
- ✅ Copiar Client Secret

### 6. Configurar arquivo .env no Backend

```env
GOOGLE_CLIENT_ID=seu_client_id_aqui
GOOGLE_CLIENT_SECRET=seu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

### 7. Configurar Calendário Compartilhado

- ✅ Criar calendário "Família Alcantara" no Google Calendar
- ✅ Compartilhar com os emails da família
- ✅ Copiar o ID do calendário
- ✅ Adicionar no .env: `SHARED_CALENDAR_ID=id_do_calendario`

## 🔗 Links Úteis

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Calendar](https://calendar.google.com/)
- [Documentação OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

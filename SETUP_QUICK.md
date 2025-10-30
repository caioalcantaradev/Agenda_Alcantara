# 🚀 Guia Rápido de Configuração

## Passo 1: Instalar MongoDB

### Opção A - Local (Windows)
```bash
# Baixe e instale do site oficial
# https://www.mongodb.com/try/download/community

# Após instalar, inicie o serviço (geralmente inicia automaticamente)
```

### Opção B - MongoDB Atlas (Recomendado)
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie conta gratuita
3. Crie um cluster gratuito
4. Gere connection string
5. Use a connection string no arquivo `.env` do backend

## Passo 2: Configurar Google OAuth

1. Acesse: https://console.cloud.google.com/
2. Siga o guia completo em: `GOOGLE_OAUTH_SETUP.md`

**Links Rápidos:**
- Criar projeto → https://console.cloud.google.com/projectcreate
- Ativar APIs → https://console.cloud.google.com/apis/library
- Credenciais → https://console.cloud.google.com/apis/credentials

## Passo 3: Configurar arquivos .env

### Backend (backend/.env)
```env
GOOGLE_CLIENT_ID=seu_client_id_aqui
GOOGLE_CLIENT_SECRET=seu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
SHARED_CALENDAR_ID=seu_calendar_id_aqui
MONGODB_URI=mongodb://localhost:27017/agenda_alcantara
# OU para Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/agenda_alcantara
JWT_SECRET=uma_senha_secreta_forte_aqui
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_client_id_aqui
```

## Passo 4: Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Passo 5: Criar Calendário Compartilhado

1. Acesse: https://calendar.google.com/
2. Crie um novo calendário chamado "Família Alcantara"
3. Compartilhe com os emails da família
4. Copie o ID do calendário (nas configurações)
5. Cole no `SHARED_CALENDAR_ID` do backend/.env

## Passo 6: Rodar o Projeto

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## Passo 7: Testar

1. Acesse: http://localhost:3000/login
2. Clique em "Entrar com Google"
3. Autorize o acesso
4. Pronto! 🎉

## 🔧 Verificar se está funcionando

```bash
# Verificar se backend está rodando
curl http://localhost:5000/api/health

# Verificar se frontend está rodando
curl http://localhost:3000
```

## ⚠️ Problemas Comuns

### Backend não inicia
- Verifique se MongoDB está rodando
- Verifique se as credenciais do .env estão corretas

### Login não funciona
- Verifique se as credenciais OAuth estão corretas
- Verifique se o redirect URI está configurado no Google Cloud
- Verifique se as APIs estão habilitadas (Calendar API, People API)

### Tela branca
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique o console do navegador (F12)


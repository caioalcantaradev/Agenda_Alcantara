# Família Alcantara

Um aplicativo web de agenda compartilhada integrado com Google Calendar, permitindo que você e sua esposa compartilhem compromissos em um único calendário.

## 🚀 Tecnologias

### Backend

- **Node.js** + **Express** - API REST
- **TypeScript** - Tipagem estática
- **MongoDB** + **Mongoose** - Banco de dados
- **Google APIs** - Integração com Google Calendar
- **JWT** - Autenticação

### Frontend

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou MongoDB Atlas)
- Conta Google com acesso ao Google Calendar
- Google Cloud Console configurado

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd agenda_alcantara
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` baseado no `env.example`:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Shared Calendar ID (criar um calendário compartilhado no Google Calendar)
SHARED_CALENDAR_ID=id_do_calendario_compartilhado

# Database
MONGODB_URI=mongodb://localhost:27017/agenda_alcantara

# JWT Secret
JWT_SECRET=sua_chave_secreta_jwt

# Server Port
PORT=5000
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env.local` na pasta `frontend` baseado no `env.local.example`:

```env
# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google OAuth Client ID (mesmo do backend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_google_client_id
```

## 🔧 Configuração do Google Cloud Console

### 1. Criar Projeto

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente

### 2. Habilitar APIs

1. Vá para "APIs & Services" > "Library"
2. Procure e habilite:
   - Google Calendar API
   - Google+ API (para informações do usuário)

### 3. Configurar OAuth 2.0

1. Vá para "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure:
   - **Application type**: Web application
   - **Name**: Família Alcantara
   - **Authorized redirect URIs**: `http://localhost:5000/api/auth/google/callback`

### 4. Configurar Tela de Consentimento

1. Vá para "APIs & Services" > "OAuth consent screen"
2. Configure as informações básicas
3. Adicione os usuários de teste (você e sua esposa)

## 📅 Configuração do Calendário Compartilhado

### 1. Criar Calendário

1. Acesse [Google Calendar](https://calendar.google.com/)
2. Clique no "+" ao lado de "Outros calendários"
3. Selecione "Criar novo calendário"
4. Nome: "Família Alcantara"
5. Clique em "Criar calendário"

### 2. Compartilhar Calendário

1. Vá para as configurações do calendário criado
2. Clique em "Compartilhar com pessoas específicas"
3. Adicione os emails de você e sua esposa
4. Defina as permissões como "Fazer alterações nos eventos"
5. Copie o ID do calendário (encontrado nas configurações)

### 3. Configurar no Backend

1. Cole o ID do calendário na variável `SHARED_CALENDAR_ID` do arquivo `.env`

## 🚀 Executando o Projeto

### 1. Iniciar o Backend

```bash
cd backend
npm run dev
```

O backend estará rodando em `http://localhost:5000`

### 2. Iniciar o Frontend

```bash
cd frontend
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 📱 Como Usar

1. **Login**: Acesse `http://localhost:3000` e clique em "Entrar com Google"
2. **Autorização**: Autorize o acesso ao Google Calendar
3. **Calendário**: Visualize o calendário mensal com os compromissos
4. **Adicionar**: Clique em "Adicionar Compromisso" ou em uma data no calendário
5. **Compartilhamento**: Todos os eventos aparecerão para ambos os usuários

## 🔐 Segurança

- Autenticação via Google OAuth 2.0
- Tokens JWT para sessões
- Validação de usuários autorizados
- CORS configurado para o frontend

## 📝 Funcionalidades

- ✅ Login com Google OAuth
- ✅ Calendário mensal interativo
- ✅ Criação de compromissos
- ✅ Visualização de eventos
- ✅ Interface responsiva
- ✅ Sincronização com Google Calendar
- ✅ Compartilhamento entre usuários

## 🐛 Solução de Problemas

### Erro de CORS

- Verifique se o `FRONTEND_URL` está configurado corretamente no backend

### Erro de Autenticação

- Verifique se as credenciais do Google OAuth estão corretas
- Confirme se o redirect URI está configurado no Google Cloud Console

### Erro de Calendário

- Verifique se o `SHARED_CALENDAR_ID` está correto
- Confirme se o calendário está compartilhado com os usuários

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.


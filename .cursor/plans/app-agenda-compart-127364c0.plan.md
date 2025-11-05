<!-- 127364c0-d542-418e-bccb-e55c87a61c8b a2f9b4d6-db1c-483a-b882-680fb0fe017e -->
# App de Agenda Compartilhada

## Arquitetura do Sistema

**Frontend**: Next.js 14 (App Router) + React + TailwindCSS

**Backend**: Node.js + Express

**Banco de Dados**: MongoDB (usuários e configurações)

**Autenticação**: Google OAuth 2.0

**API Externa**: Google Calendar API

## Estrutura do Projeto

```
agenda_alcantara/
├── frontend/          # Next.js app
├── backend/           # Express API
└── README.md
```

## Implementação

### 1. Configuração Inicial

- Criar estrutura de pastas (frontend e backend)
- Configurar Next.js com TypeScript e TailwindCSS
- Configurar Express com TypeScript
- Configurar MongoDB (Mongoose)
- Criar arquivo .env para variáveis de ambiente

### 2. Google Cloud Setup

- Configurar projeto no Google Cloud Console
- Habilitar Google Calendar API
- Criar credenciais OAuth 2.0
- Configurar tela de consentimento OAuth
- Adicionar usuários de teste (você e sua esposa)

### 3. Backend - Autenticação e API

**Modelos de Dados (MongoDB)**:

- User: email, googleId, name, picture, accessToken, refreshToken, calendarId

**Endpoints principais**:

- `POST /api/auth/google` - Login com Google OAuth
- `GET /api/auth/me` - Obter usuário autenticado
- `GET /api/events` - Listar eventos do calendário compartilhado
- `POST /api/events` - Criar novo evento
- `PUT /api/events/:id` - Atualizar evento
- `DELETE /api/events/:id` - Deletar evento

**Funcionalidades**:

- Middleware de autenticação JWT
- Integração com Google Calendar API
- Refresh token automático
- CORS configurado para o frontend

### 4. Frontend - Interface do Usuário

**Páginas**:

- `/login` - Tela de login com botão "Entrar com Google"
- `/` (protegida) - Dashboard com calendário mensal

**Componentes principais**:

- `LoginButton` - Botão de autenticação Google
- `Calendar` - Visualização mensal do calendário
- `EventModal` - Modal para criar/editar compromissos
- `EventForm` - Formulário com campos: data, hora início, hora fim, descrição
- `ProtectedRoute` - HOC para rotas autenticadas

**Features**:

- Navegação entre meses (anterior/próximo)
- Visualização de eventos no calendário
- Botão flutuante para adicionar compromisso
- Modal responsivo para formulário
- Loading states e tratamento de erros

### 5. Integração Google Calendar

- Usar biblioteca `googleapis` no backend
- Configurar OAuth 2.0 flow
- Criar/conectar ao calendário compartilhado específico
- Sincronização bidirecional de eventos
- Tratamento de tokens expirados

### 6. Configuração do Calendário Compartilhado

- Criar um calendário específico no Google Calendar
- Compartilhar com ambos os emails (você e sua esposa)
- Armazenar o ID do calendário compartilhado no backend
- Todos os eventos serão criados neste calendário

### 7. Estilização e UX

- Design moderno e responsivo com TailwindCSS
- Cores e visual clean para o calendário
- Feedback visual para ações (loading, sucesso, erro)
- Mobile-first approach

### 8. Variáveis de Ambiente Necessárias

**Backend (.env)**:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
SHARED_CALENDAR_ID=
MONGODB_URI=
JWT_SECRET=
PORT=5000
```

**Frontend (.env.local)**:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

## Fluxo de Autenticação

1. Usuário clica em "Entrar com Google"
2. Redirecionado para consentimento Google
3. Google retorna código de autorização
4. Backend troca código por tokens de acesso
5. Backend salva/atualiza usuário no MongoDB
6. Backend retorna JWT para o frontend
7. Frontend armazena JWT e redireciona para dashboard

## Fluxo de Criação de Evento

1. Usuário clica no botão "Adicionar Compromisso"
2. Modal abre com formulário
3. Usuário preenche: data, hora início, hora fim, descrição
4. Submit envia para backend
5. Backend cria evento no Google Calendar compartilhado
6. Frontend atualiza visualização do calendário

## Tecnologias e Bibliotecas

**Frontend**:

- next: ^14.0.0
- react: ^18.0.0
- axios: ^1.6.0
- date-fns: ^3.0.0 (manipulação de datas)
- react-calendar: ^4.6.0 ou implementação custom
- tailwindcss: ^3.4.0

**Backend**:

- express: ^4.18.0
- googleapis: ^128.0.0
- mongoose: ^8.0.0
- jsonwebtoken: ^9.0.0
- cors: ^2.8.5
- dotenv: ^16.0.0

### To-dos

- [ ] Configurar estrutura inicial do projeto (frontend Next.js e backend Express)
- [ ] Configurar MongoDB e criar modelo de User com Mongoose
- [ ] Implementar autenticação Google OAuth no backend com JWT
- [ ] Integrar Google Calendar API no backend (CRUD de eventos)
- [ ] Criar endpoints REST para autenticação e gerenciamento de eventos
- [ ] Implementar tela de login e fluxo de autenticação no frontend
- [ ] Criar componente de calendário mensal com visualização de eventos
- [ ] Implementar modal e formulário para criar/editar compromissos
- [ ] Aplicar estilização com TailwindCSS e melhorar UX/responsividade
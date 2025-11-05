# Família Alcantara (Frontend + Backend)

Aplicativo web de agenda compartilhada com login local (email/senha) para dois usuários e backend Node.js/Express com MongoDB Atlas. O frontend (Next.js) consome a API para autenticação via JWT e CRUD de eventos.

## 🚀 Tecnologias

- **Next.js 14** (React)
- **TypeScript**
- **TailwindCSS**
- **date-fns**
- **Express** (API REST)
- **MongoDB/Mongoose**
- **JWT** (autenticação)

## 📋 Pré-requisitos

- Node.js (18 ou superior)
- Conta no MongoDB Atlas (ou MongoDB acessível)

## 🔧 Configuração

1. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` com:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster/db
JWT_SECRET=troque-este-segredo
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

Opcional: execute o seed para criar os 2 usuários iniciais (edite emails/senhas em `src/seed.ts` se desejar):

```bash
npm run seed
```

Inicie o backend:

```bash
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
```

Crie `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Execute o frontend:

```bash
npm run dev
```

## 📅 Agenda compartilhada

Os eventos são salvos no MongoDB e exibidos no calendário do app. Não há mais integração direta com Google Calendar.

## 🛠️ Estrutura

1. Clone o repositório

```bash
git clone https://github.com/caioalcantaradev/Agenda_Alcantara.git
cd Agenda_Alcantara/frontend
npm install
```

Pastas principais:

- `frontend/` (Next.js)
- `backend/` (Express/Mongoose)

3. Rode o app

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## 📱 Como usar

1. Acesse `/login`, informe email e senha
2. Após login, o app carrega os eventos do período atual
3. Crie, edite e exclua eventos pelo calendário

## 🔐 Segurança

- JWT com expiração de 7 dias
- Hash de senha com bcrypt
- CORS restrito ao domínio do frontend

## 🚀 Deploy

- Backend: Render/Railway/Servidor próprio
- Frontend: Vercel/Netlify; configure `NEXT_PUBLIC_API_URL` apontando para o backend

## 📝 Funcionalidades

- ✅ Login local (JWT)
- ✅ Visualização mensal, semanal e diária
- ✅ Criar, editar e excluir eventos
- ✅ Modal de detalhes do evento
- ✅ Modo claro/escuro
- ✅ Feriados brasileiros destacados
- ✅ Detecção de conflitos de horário

## 🐛 Solução de Problemas

- "A autenticação não abre/funciona":
  - Verifique `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
  - Confirme que o domínio está em Authorized JavaScript origins
- "Eventos não carregam":
  - Verifique se a Calendar API está habilitada
  - Confirme `NEXT_PUBLIC_GOOGLE_CALENDAR_ID` (use `primary` ou o ID correto)
  - Garanta que a agenda está compartilhada com a conta logada

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

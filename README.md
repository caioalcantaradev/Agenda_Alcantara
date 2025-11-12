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

### 1. Configurar MongoDB Atlas

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com/) e crie uma conta (gratuita)
2. Crie um novo cluster (escolha o tier gratuito M0)
3. Configure o acesso:
   - Na seção "Database Access", crie um usuário com senha
   - Na seção "Network Access", adicione seu IP (ou `0.0.0.0/0` para permitir todos - apenas para desenvolvimento)
4. Obtenha a connection string:
   - Clique em "Connect" no cluster
   - Escolha "Connect your application"
   - Copie a connection string (formato: `mongodb+srv://usuario:senha@cluster.mongodb.net/`)
   - Adicione o nome do banco no final: `mongodb+srv://usuario:senha@cluster.mongodb.net/agenda`

### 2. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado no `env.example`:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/agenda
JWT_SECRET=seu-secret-jwt-aqui
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**Importante**: Substitua `usuario:senha` pelos dados do usuário criado no MongoDB Atlas e `cluster.mongodb.net` pelo endereço do seu cluster.

Opcional: execute o seed para criar os 2 usuários iniciais (edite emails/senhas em `src/seed.ts` se desejar):

```bash
npm run seed
```

Teste a conexão com o MongoDB:

```bash
npm run test:connection
```

Valide a configuração:

```bash
npm run validate:config
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

### Configurar MongoDB Atlas

**IMPORTANTE**: Você precisa configurar o MongoDB Atlas antes de fazer o deploy. O MongoDB do Railway pausou após o período gratuito.

Siga o guia completo em [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md) para:

- Criar conta no MongoDB Atlas (gratuito)
- Configurar cluster e acesso
- Obter connection string
- Configurar no deploy

### Backend

O backend pode ser deployado em qualquer plataforma que suporte Node.js:

- **Render**: Configure a variável `MONGODB_URI` nas variáveis de ambiente
- **Railway**: Configure a variável `MONGODB_URI` nas variáveis de ambiente (veja [RAILWAY-SETUP.md](./RAILWAY-SETUP.md))
- **Vercel/Netlify**: Configure as variáveis de ambiente no painel
- **Servidor próprio**: Configure o `.env` no servidor

**Variáveis de ambiente necessárias no deploy:**

- `MONGODB_URI`: Connection string do MongoDB Atlas (obrigatório)
- `JWT_SECRET`: Secret para JWT (use uma string aleatória e segura)
- `PORT`: Porta do servidor (geralmente fornecido pela plataforma)
- `CORS_ORIGIN`: URL do frontend (ex: `https://seu-app.vercel.app`)

### Frontend

- **Vercel/Netlify**: Configure `NEXT_PUBLIC_API_URL` apontando para o backend
- Configure também no `.env.local` a URL do backend em produção

## 📝 Funcionalidades

- ✅ Login local (JWT)
- ✅ Visualização mensal, semanal e diária
- ✅ Criar, editar e excluir eventos
- ✅ Modal de detalhes do evento
- ✅ Modo claro/escuro
- ✅ Feriados brasileiros destacados
- ✅ Detecção de conflitos de horário

## 🐛 Solução de Problemas

### Erro: "MONGODB_URI não está definido"

- Verifique se o arquivo `.env` existe no diretório `backend`
- Verifique se a variável `MONGODB_URI` está configurada corretamente

### Erro: "Authentication failed" ou "Network access denied"

- Verifique se o usuário e senha estão corretos na connection string
- Verifique se seu IP está na lista de Network Access no MongoDB Atlas
- Verifique se o cluster está ativo (não pausado)

### Erro: "Failed to fetch" no frontend

- Verifique se `NEXT_PUBLIC_API_URL` está configurada corretamente
- Verifique se o backend está rodando
- Verifique se o CORS está configurado corretamente

### Erro: "Email ou senha incorretos"

- Execute o seed: `npm run seed` no backend
- Verifique se os usuários foram criados corretamente

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

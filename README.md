# Família Alcantara

Aplicativo web de agenda compartilhada com login local (email/senha) para dois usuários. Frontend e backend rodam na Vercel usando Next.js API Routes (Serverless Functions) com MongoDB Atlas.

## 🚀 Tecnologias

- **Next.js 14** (React + API Routes)
- **TypeScript**
- **TailwindCSS**
- **date-fns**
- **MongoDB/Mongoose**
- **JWT** (autenticação)
- **Vercel** (deploy)

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

### 2. Frontend

```bash
cd frontend
npm install
```

Crie `frontend/.env.local`:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/agenda
JWT_SECRET=seu-secret-jwt-aqui
```

**Importante**: Substitua `usuario:senha` pelos dados do usuário criado no MongoDB Atlas e `cluster.mongodb.net` pelo endereço do seu cluster.

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

2. Configure o `.env.local` (veja passo 2 acima)

3. Rode o app

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## 📁 Estrutura do Projeto

- `frontend/` - Next.js app com API Routes (Serverless Functions)
  - `src/app/api/` - API Routes (backend)
  - `src/app/` - Páginas do frontend
  - `src/lib/` - Utilitários (db, auth, config)
  - `src/models/` - Modelos MongoDB (User, Event)

## 📱 Como usar

1. Acesse `/login`, informe email e senha
2. Após login, o app carrega os eventos do período atual
3. Crie, edite e exclua eventos pelo calendário

## 🔐 Segurança

- JWT com expiração de 7 dias
- Hash de senha com bcrypt
- CORS restrito ao domínio do frontend

## 🚀 Deploy na Vercel

**IMPORTANTE**: Este projeto está configurado para rodar **tudo na Vercel** (frontend + backend via API Routes).

### Configurar MongoDB Atlas

Siga o guia completo em [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md) para:

- Criar conta no MongoDB Atlas (gratuito)
- Configurar cluster e acesso
- Obter connection string
- Configurar Network Access para `0.0.0.0/0`

### Deploy na Vercel

Siga o guia completo em [VERCEL-SETUP.md](./VERCEL-SETUP.md) para:

- Configurar variáveis de ambiente na Vercel
- Fazer deploy do projeto
- Verificar se está funcionando

**Variáveis de ambiente necessárias na Vercel:**

- `MONGODB_URI`: Connection string do MongoDB Atlas (obrigatório)
- `JWT_SECRET`: Secret para JWT (use uma string aleatória e segura)

**Nota**: O frontend e o backend rodam no mesmo projeto na Vercel. As API Routes são Serverless Functions que se conectam ao MongoDB Atlas.

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

- Verifique se o arquivo `.env.local` existe no diretório `frontend`
- Verifique se a variável `MONGODB_URI` está configurada corretamente
- Verifique se a variável está configurada na Vercel (para deploy)

### Erro: "Authentication failed" ou "Network access denied"

- Verifique se o usuário e senha estão corretos na connection string
- Verifique se seu IP está na lista de Network Access no MongoDB Atlas
- Verifique se o cluster está ativo (não pausado)

### Erro: "Failed to fetch" no frontend

- Verifique se as API Routes estão funcionando: `/api/health`
- Verifique os logs da Vercel para identificar o erro
- Verifique se o MongoDB está acessível

### Erro: "Email ou senha incorretos"

- O seed automático é executado no primeiro login
- Verifique se o MongoDB está conectado corretamente
- Verifique se os usuários foram criados no MongoDB Atlas

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

# 🔧 Configuração do MongoDB Atlas

Este guia explica como configurar o MongoDB Atlas (gratuito) para usar com a aplicação Agenda Alcantara.

## 📋 Passo a Passo

### 1. Criar conta no MongoDB Atlas

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Preencha o formulário e confirme seu email

### 2. Criar um Cluster

1. Após fazer login, clique em "Build a Database"
2. Escolha o plano **FREE (M0)**
3. Selecione um provedor (AWS, Google Cloud ou Azure)
4. Escolha uma região próxima ao Brasil (ex: `São Paulo` ou `N. Virginia`)
5. Clique em "Create"

**Nota**: O cluster gratuito pode levar alguns minutos para ser criado.

### 3. Configurar Acesso ao Banco de Dados

1. Na seção **"Database Access"** (lateral esquerda):
   - Clique em "Add New Database User"
   - Escolha "Password" como método de autenticação
   - Crie um usuário e senha (anote essas informações!)
   - Selecione "Atlas Admin" como privilégio
   - Clique em "Add User"

### 4. Configurar Network Access

1. Na seção **"Network Access"** (lateral esquerda):
   - Clique em "Add IP Address"
   - Para desenvolvimento local, clique em "Allow Access from Anywhere" (adiciona `0.0.0.0/0`)
   - **Para produção**, adicione apenas os IPs da sua plataforma de deploy
   - Clique em "Confirm"

### 5. Obter Connection String

1. Volte para a seção **"Database"** (cluster)
2. Clique em "Connect" no seu cluster
3. Escolha "Connect your application"
4. Selecione o driver: **Node.js** e versão mais recente
5. Copie a connection string (formato: `mongodb+srv://usuario:senha@cluster.mongodb.net/`)
6. Substitua `<password>` pela senha do usuário criado
7. Adicione o nome do banco no final: `/agenda`

**Exemplo de connection string final:**
```
mongodb+srv://meuusuario:minhasenha@cluster0.abc123.mongodb.net/agenda
```

### 6. Configurar no Projeto

1. No diretório `backend`, crie um arquivo `.env`:
```bash
cd backend
cp env.example .env
```

2. Edite o arquivo `.env` e adicione sua connection string:
```env
MONGODB_URI=mongodb+srv://meuusuario:minhasenha@cluster0.abc123.mongodb.net/agenda
JWT_SECRET=seu-secret-jwt-aqui
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### 7. Testar a Conexão

1. Inicie o backend:
```bash
npm run dev
```

2. Você deve ver a mensagem: `✅ Conectado ao MongoDB Atlas`

## 🚀 Configurar no Deploy (Render/Railway/Vercel)

### Render

1. Acesse o dashboard do Render
2. Vá em "Environment Variables"
3. Adicione a variável:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://usuario:senha@cluster.mongodb.net/agenda`

### Railway

1. Acesse o dashboard do Railway
2. Vá em "Variables"
3. Adicione a variável:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://usuario:senha@cluster.mongodb.net/agenda`

### Vercel

1. Acesse o dashboard do Vercel
2. Vá em "Settings" > "Environment Variables"
3. Adicione a variável:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://usuario:senha@cluster.mongodb.net/agenda`
   - Selecione os ambientes: Production, Preview, Development

## ⚠️ Importante

- **Nunca compartilhe** sua connection string publicamente
- **Nunca commite** o arquivo `.env` no Git
- Para produção, configure o Network Access apenas com os IPs necessários
- O MongoDB Atlas gratuito tem algumas limitações, mas é suficiente para desenvolvimento e projetos pequenos

## 🐛 Solução de Problemas

### Erro: "MONGODB_URI não está definido"
- Verifique se o arquivo `.env` existe no diretório `backend`
- Verifique se a variável `MONGODB_URI` está configurada corretamente

### Erro: "Authentication failed"
- Verifique se o usuário e senha estão corretos na connection string
- Verifique se o usuário foi criado no MongoDB Atlas

### Erro: "Network access denied"
- Verifique se seu IP está na lista de Network Access
- Para desenvolvimento, adicione `0.0.0.0/0` (permite todos os IPs)

### Erro: "Server selection timeout"
- Verifique se o cluster está ativo no MongoDB Atlas
- Verifique se a connection string está correta
- Verifique sua conexão com a internet

## 📚 Recursos

- [Documentação MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/free)
- [Connection String Guide](https://docs.atlas.mongodb.com/getting-started/)


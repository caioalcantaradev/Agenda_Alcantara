# Configuração do Deploy na Vercel - Passo a Passo

## 🚀 Visão Geral

Este projeto está configurado para rodar **tudo na Vercel**:

- **Frontend**: Next.js (SSR/SSG)
- **Backend**: API Routes do Next.js (Serverless Functions)
- **Banco de Dados**: MongoDB Atlas (gratuito)

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com/) (gratuita)
2. Conta no [MongoDB Atlas](https://cloud.mongodb.com/) (gratuita)
3. Repositório no GitHub (opcional, mas recomendado)

## 🔧 Configuração

### 1. Configurar MongoDB Atlas

**IMPORTANTE**: Você precisa configurar o MongoDB Atlas antes de fazer o deploy.

Siga o guia completo em [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md) para:

1. Criar conta no MongoDB Atlas (gratuito)
2. Configurar cluster e acesso
3. Obter connection string
4. Configurar Network Access para `0.0.0.0/0` (permitir todos os IPs)

### 2. Configurar Variáveis de Ambiente na Vercel

1. Acesse o painel da Vercel: https://vercel.com/
2. Crie um novo projeto ou abra um projeto existente
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/agenda
JWT_SECRET=seu-secret-jwt-aqui
```

**Importante**:

- Substitua `MONGODB_URI` pela sua connection string do MongoDB Atlas
- Substitua `JWT_SECRET` por uma string aleatória e segura (ex: `openssl rand -base64 32`)
- Essas variáveis são **privadas** e não aparecem no código do cliente

### 3. Deploy na Vercel

#### Opção 1: Deploy via GitHub (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure o **Root Directory** como `frontend` (se necessário)
3. Configure as variáveis de ambiente (veja passo 2)
4. Clique em **Deploy**

A Vercel vai:

- Instalar dependências (`npm install`)
- Compilar o projeto (`npm run build`)
- Fazer deploy das Serverless Functions (API Routes)
- Fazer deploy do frontend (Next.js)

#### Opção 2: Deploy via CLI

```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

Siga as instruções e configure as variáveis de ambiente quando solicitado.

### 4. Verificar Deploy

Após o deploy:

1. Acesse a URL do projeto (ex: `https://seu-projeto.vercel.app`)
2. Teste a API: `https://seu-projeto.vercel.app/api/health`
3. Teste o login: `https://seu-projeto.vercel.app/login`

## 🔍 Estrutura do Projeto na Vercel

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes (Serverless Functions)
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── me/
│   │   │   │   └── change-password/
│   │   │   ├── events/
│   │   │   │   └── [id]/
│   │   │   └── health/
│   │   ├── login/
│   │   ├── alterar-senha/
│   │   └── page.tsx
│   ├── lib/
│   │   ├── db.ts            # Conexão MongoDB
│   │   ├── config.ts        # Configuração
│   │   ├── auth.ts          # Autenticação JWT
│   │   └── seed-auto.ts     # Seed automático
│   └── models/
│       ├── User.ts          # Modelo User
│       └── Event.ts         # Modelo Event
```

## ✅ Checklist

- [ ] MongoDB Atlas configurado (veja [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md))
- [ ] Variável `MONGODB_URI` configurada na Vercel
- [ ] Variável `JWT_SECRET` configurada na Vercel
- [ ] Root Directory configurado como `frontend` (se necessário)
- [ ] Deploy realizado com sucesso
- [ ] Health check funciona: `/api/health`
- [ ] Login funciona: `/login`
- [ ] API Routes funcionam: `/api/auth/login`, `/api/events`

## 🐛 Problemas Comuns

### Erro: "MONGODB_URI não está definido"

**Solução**:

- Verifique se a variável `MONGODB_URI` está configurada na Vercel
- Verifique se a variável está configurada para o ambiente correto (Production, Preview, Development)
- Faça um novo deploy após configurar as variáveis

### Erro: "Authentication failed" ou "Network access denied"

**Solução**:

- Verifique se o usuário e senha estão corretos na connection string
- Verifique se o Network Access no MongoDB Atlas está configurado para `0.0.0.0/0`
- Verifique se o cluster está ativo (não pausado)

### Erro: "Failed to fetch" no frontend

**Solução**:

- Verifique se as API Routes estão funcionando: `/api/health`
- Verifique os logs da Vercel para identificar o erro
- Verifique se o MongoDB está acessível

### Erro: "Module not found" ou "Cannot find module"

**Solução**:

- Verifique se todas as dependências estão no `package.json`
- Verifique se o build está funcionando: `npm run build`
- Verifique os logs da Vercel para identificar o erro

## 📝 Notas

- As API Routes do Next.js são Serverless Functions na Vercel
- Cada API Route é uma função serverless independente
- A conexão MongoDB é reutilizada entre requisições (cache)
- O seed automático é executado no primeiro login
- As variáveis de ambiente são privadas e não aparecem no código do cliente

## 🔗 Links Úteis

- [Documentação da Vercel](https://vercel.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Guia de MongoDB Atlas](./MONGODB-ATLAS-SETUP.md)

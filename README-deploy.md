# Guia de Deploy - Agenda Alcantara

Este guia explica como fazer o deploy completo do projeto (frontend + backend) na Vercel e Render.

## 📋 Pré-requisitos

- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)
- Conta no [Render](https://render.com) (gratuito) ou [Railway](https://railway.app) (gratuito)
- Conta no [Vercel](https://vercel.com) (gratuito)
- Repositório no GitHub já conectado

---

## 1️⃣ Configurar MongoDB Atlas

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) e crie uma conta/login
2. Crie um novo cluster (escolha o plano **Free M0**)
3. Aguarde a criação do cluster (pode levar alguns minutos)

4. **Criar usuário do banco de dados:**
   - Clique em "Database Access" → "Add New Database User"
   - Escolha "Password" e defina um usuário e senha
   - Anote essas credenciais (você vai precisar)

5. **Configurar acesso de rede:**
   - Clique em "Network Access" → "Add IP Address"
   - Selecione "Allow Access from Anywhere" (0.0.0.0/0) para facilitar
   - Ou adicione os IPs específicos do Render/Railway depois

6. **Obter a connection string:**
   - Clique em "Database" → "Connect"
   - Escolha "Connect your application"
   - Copie a connection string (algo como: `mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/agenda?retryWrites=true&w=majority`)
   - Substitua `<password>` pela senha do usuário que você criou
   - Esta será sua `MONGODB_URI`

---

## 2️⃣ Deploy do Backend (Render)

### Passo 1: Criar o serviço

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Selecione o repositório `Agenda_Alcantara`

### Passo 2: Configurar o serviço

**Configurações básicas:**
- **Name**: `agenda-alcantara-api` (ou outro nome)
- **Region**: escolha a mais próxima (ex: `Oregon (US West)`)
- **Branch**: `main` (ou a branch principal)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Passo 3: Variáveis de ambiente

Adicione as seguintes variáveis na seção "Environment Variables":

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/agenda?retryWrites=true&w=majority
JWT_SECRET=SEU-SEGREDO-JWT-AQUI-GERE-UM-ALEATORIO
PORT=5000
CORS_ORIGIN=https://agenda-alcantara.vercel.app
```

**Importante:**
- Substitua `MONGODB_URI` pela string completa do Atlas
- Para `JWT_SECRET`, gere um valor aleatório forte (ex: use um gerador online ou `openssl rand -base64 32`)
- Para `CORS_ORIGIN`, use a URL da Vercel que você vai obter no passo 3 (ou atualize depois)

### Passo 4: Criar o serviço

- Clique em "Create Web Service"
- Aguarde o build e deploy (pode levar 2-5 minutos)

### Passo 5: Obter a URL do backend

- Após o deploy, você verá uma URL como: `https://agenda-alcantara-api.onrender.com`
- **Anote esta URL** - você vai precisar para o frontend

### Passo 6: Rodar o seed (criar usuários iniciais)

1. No Render, vá em "Background Jobs" (ou crie um "Cron Job" temporário)
2. Ou use o terminal via SSH:
   - Clique em "Shell" no seu serviço
   - Execute: `cd backend && npm run seed`
3. Ou execute localmente apontando para o MongoDB:
   - Configure um `.env` local com `MONGODB_URI` do Atlas
   - Execute: `cd backend && npm run seed`

**Alternativa (Railway):**
- Se usar Railway, crie um "Service" a partir do repositório
- Configure `Root Directory: backend`
- Adicione as mesmas variáveis de ambiente
- Para o seed, use a opção "Run Command" ou execute localmente

---

## 3️⃣ Deploy do Frontend (Vercel)

### Passo 1: Importar projeto

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em "Add New..." → "Project"
3. Importe o repositório `Agenda_Alcantara` do GitHub

### Passo 2: Configurar o projeto

**Configurações do projeto:**
- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (ou deixe automático)
- **Output Directory**: `.next` (ou deixe automático)
- **Install Command**: `npm install` (ou deixe automático)

### Passo 3: Variáveis de ambiente

Adicione a variável:

```
NEXT_PUBLIC_API_URL=https://agenda-alcantara-api.onrender.com
```

**Importante:** Substitua pela URL real do seu backend no Render/Railway.

### Passo 4: Deploy

- Clique em "Deploy"
- Aguarde o build e deploy (pode levar 1-3 minutos)

### Passo 5: Obter a URL do frontend

- Após o deploy, você verá uma URL como: `https://agenda-alcantara.vercel.app`
- **Anote esta URL** - você vai precisar para atualizar o CORS do backend

---

## 4️⃣ Atualizar CORS do Backend

1. Volte ao Render (ou Railway) onde está o backend
2. Vá em "Environment" → edite a variável `CORS_ORIGIN`
3. Atualize para a URL completa da Vercel:
   ```
   CORS_ORIGIN=https://agenda-alcantara.vercel.app
   ```
4. Salve e aguarde o redeploy automático

---

## 5️⃣ Testar o Deploy

### Testar o backend:

1. Acesse no navegador: `https://agenda-alcantara-api.onrender.com/api/health`
2. Deve retornar: `{"ok":true}`

### Testar o frontend:

1. Acesse a URL da Vercel: `https://agenda-alcantara.vercel.app`
2. Você deve ser redirecionado para `/login`
3. Faça login com:
   - **Email**: `caiocralcantara@gmail.com` ou `viviansarodrigues@gmail.com`
   - **Senha inicial**: `Senha123`
4. Você será redirecionado para `/alterar-senha` (primeiro acesso)
5. Defina uma nova senha
6. Após trocar a senha, você será redirecionado para a agenda
7. Teste criando, editando e excluindo um evento

---

## 🔄 Deploys Automáticos

Ambos os serviços (Render e Vercel) estão conectados ao GitHub:

- **Push na branch `main`** → Deploy automático no Render (backend) e Vercel (frontend)
- Você pode verificar os logs de deploy em cada plataforma

---

## 🐛 Troubleshooting

### Backend não conecta ao MongoDB:

- Verifique se o `MONGODB_URI` está correto (com a senha substituída)
- Verifique se o IP do Render está liberado no MongoDB Atlas (Network Access)
- Confira os logs do Render para erros específicos

### Frontend não acessa o backend:

- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Verifique se o `CORS_ORIGIN` no backend está com a URL certa da Vercel
- Teste acessar a URL do backend diretamente no navegador

### Erro 401 ao fazer login:

- Verifique se o seed foi executado (usuários foram criados)
- Verifique se o `JWT_SECRET` está configurado no backend

### Erro 500 no backend:

- Verifique os logs do Render
- Verifique se todas as variáveis de ambiente estão configuradas

---

## 📝 Checklist Final

- [ ] MongoDB Atlas configurado e connection string obtida
- [ ] Backend deployado no Render/Railway com todas as variáveis
- [ ] Seed executado (usuários criados)
- [ ] Frontend deployado na Vercel com `NEXT_PUBLIC_API_URL`
- [ ] CORS atualizado no backend com a URL da Vercel
- [ ] Teste de login funcionando
- [ ] Troca de senha no primeiro acesso funcionando
- [ ] Criação de eventos funcionando

---

## 🔗 URLs Finais

Após o deploy completo, você terá:

- **Frontend**: `https://agenda-alcantara.vercel.app`
- **Backend API**: `https://agenda-alcantara-api.onrender.com`
- **MongoDB**: Gerenciado pelo Atlas

---

**Pronto!** Seu app está no ar! 🚀


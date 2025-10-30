# 🚀 Guia de Deployment - Família Alcantara

## 📋 Visão Geral

Este projeto precisa de **2 deploys separados**:

1. **Frontend** → Vercel (Next.js)
2. **Backend** → Render / Railway / Heroku (Node.js + Express)

---

## 1️⃣ Deploy do Frontend (Vercel)

### Passo 1: Preparar Frontend
```bash
cd frontend
npm run build
```
Se o build passou, está pronto!

### Passo 2: Conectar com Vercel

**Opção A - Via GitHub (Recomendado):**
1. Acesse: https://vercel.com
2. Login com GitHub
3. Clique em "Add New Project"
4. Selecione: `caioalcantaradev/Agenda_Alcantara`
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

**Opção B - Via CLI:**
```bash
cd frontend
npm i -g vercel
vercel login
vercel
```

### Passo 3: Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
```

⚠️ **IMPORTANTE**: Substitua `https://seu-backend.onrender.com` pela URL real do backend após deploy

### Passo 4: Deploy
Clique em "Deploy" e aguarde!

🔗 **URL**: Sua aplicação estará em: `https://agenda-alcantara.vercel.app`

---

## 2️⃣ Deploy do Backend (Render / Railway)

### ⚙️ Opção A: Render (GRATUITO)

#### 1. Criar Conta
- Acesse: https://render.com
- Login com GitHub

#### 2. Criar Web Service
- Clique: "New" → "Web Service"
- Conecte ao repositório: `caioalcantaradev/Agenda_Alcantara`
- Configure:
  - **Name**: `agenda-alcantara-backend`
  - **Runtime**: Node
  - **Branch**: `main`
  - **Root Directory**: `backend`
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`

#### 3. Variáveis de Ambiente
Adicione as seguintes variáveis:

```env
GOOGLE_CLIENT_ID=348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=https://agenda-alcantara-backend.onrender.com/api/auth/google/callback
SHARED_CALENDAR_ID=76272a2b0f3224f3835adb0c9cc2bfce8a2d023f9c705e98845a474981a2efe3@group.calendar.google.com
MONGODB_URI=mongodb+srv://caioalcantaradev_db_user:K9cAfEtux3kTWCen@agendaalcantara.btom26f.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
JWT_SECRET=uma_senha_secreta_segura_aqui
PORT=10000
FRONTEND_URL=https://agenda-alcantara.vercel.app
```

⚠️ **IMPORTANTE**: `FRONTEND_URL` deve ser a URL do seu frontend no Vercel

#### 4. Deploy
- Clique em "Create Web Service"
- Aguarde o deploy (pode levar 10-15 minutos)

🔗 **URL**: `https://agenda-alcantara-backend.onrender.com`

---

### ⚙️ Opção B: Railway (GRATUITO)

#### 1. Criar Conta
- Acesse: https://railway.app
- Login com GitHub

#### 2. Criar Projeto
- Clique: "New Project"
- Selecione: "Deploy from GitHub repo"
- Escolha: `caioalcantaradev/Agenda_Alcantara`

#### 3. Configurar Serviço
- Railway detecta automaticamente o `backend/`
- Configure as variáveis de ambiente (mesmas do Render)

#### 4. Deploy
- Clique em "Deploy"
- Aguarde alguns minutos

🔗 **URL**: Terá uma URL automática tipo: `https://agenda-alcantara-production.up.railway.app`

---

## 3️⃣ Atualizar Google OAuth

⚠️ **CRÍTICO**: Após fazer deploy do backend, você PRECISA atualizar o OAuth!

### 1. Google Cloud Console
1. Acesse: https://console.cloud.google.com/
2. Vá em: APIs & Services → Credentials
3. Edite seu OAuth Client
4. Em "Authorized redirect URIs", ADICIONE:
   ```
   https://seu-backend.onrender.com/api/auth/google/callback
   ```
   (ou a URL do seu backend no Railway)

### 2. Salvar e Aguardar
- Clique em "Save"
- Aguarde 5-10 minutos para propagar

---

## 4️⃣ Atualizar Frontend com URL do Backend

### No Vercel:
1. Vá em Settings → Environment Variables
2. Edite `NEXT_PUBLIC_API_URL`
3. Coloque a URL real do seu backend
4. Faça Redeploy

### Ou edite localmente e faça commit:
```bash
# Em frontend/.env.local
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com
git commit -am "feat: atualizar URL do backend para produção"
git push
```

---

## 5️⃣ Testar Produção

1. **Frontend**: Acesse sua URL Vercel
2. **Login**: Teste login com Google
3. **Calendário**: Verifique se os eventos carregam
4. **Criar Evento**: Teste criar um evento

---

## 🐛 Troubleshooting

### Erro: "redirect_uri_mismatch"
- Verifique se a URL do redirect está correta no Google Console
- Aguarde 10 minutos após mudança

### Erro: CORS
- Verifique se `FRONTEND_URL` no backend está correto
- Deve ser a URL completa do Vercel

### Backend não inicia
- Verifique logs no Render/Railway
- Confirme que `PORT` está configurado (10000 para Render)

### Frontend não conecta ao backend
- Verifique `NEXT_PUBLIC_API_URL` no Vercel
- Confirme que o backend está online

---

## 📊 Check-list de Deployment

### Backend
- [ ] Build passa localmente (`npm run build`)
- [ ] Deploy no Render/Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Backend está online (health check)
- [ ] Redirect URI atualizado no Google Console

### Frontend
- [ ] Build passa localmente (`npm run build`)
- [ ] Deploy no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] URL do backend atualizada

### Testes
- [ ] Login funciona
- [ ] Calendário carrega
- [ ] Eventos aparecem
- [ ] Criar evento funciona
- [ ] Editar evento funciona

---

## 🎉 URLs Finais

- **Frontend**: `https://agenda-alcantara.vercel.app`
- **Backend**: `https://agenda-alcantara-backend.onrender.com`
- **Repositório**: https://github.com/caioalcantaradev/Agenda_Alcantara

---

## 💡 Dicas

- **Render**: Free tier permite 750h/mês (mais que suficiente)
- **Vercel**: Ilimitado no free tier
- **Updates**: A cada push no GitHub, faz deploy automático!
- **Domínio**: Você pode adicionar domínio customizado depois

---

## 📞 Precisa de Ajuda?

- Verifique logs no Vercel (Deployments → Build/Function Logs)
- Verifique logs no Render (Logs)
- Console do navegador (F12 → Console)


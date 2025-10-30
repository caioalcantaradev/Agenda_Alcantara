# ⚡ Deploy Rápido - 10 Minutos

## 🎯 Resumo

- **Frontend** → Vercel (gratuito e automático)
- **Backend** → Render (gratuito)
- **MongoDB** → Já configurado no Atlas ✅

---

## 1️⃣ BACKEND (Render) - 5 minutos

### Passo 1: Criar conta e projeto
1. Acesse: https://render.com
2. Login com GitHub
3. Clique em "New" → "Web Service"
4. Conecte o repositório: `caioalcantaradev/Agenda_Alcantara`

### Passo 2: Configurar
- **Name**: `agenda-alcantara-backend`
- **Runtime**: Node
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`

### Passo 3: Variáveis de Ambiente (IMPORTANTE!)
Clique em "Advanced" → "Add Environment Variable" e adicione:

```env
GOOGLE_CLIENT_ID=348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=https://seu-backend.onrender.com/api/auth/google/callback
SHARED_CALENDAR_ID=76272a2b0f3224f3835adb0c9cc2bfce8a2d023f9c705e98845a474981a2efe3@group.calendar.google.com
MONGODB_URI=mongodb+srv://caioalcantaradev_db_user:K9cAfEtux3kTWCen@agendaalcantara.btom26f.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
JWT_SECRET=uma_senha_secreta_segura_aqui
PORT=10000
FRONTEND_URL=https://agenda-alcantara.vercel.app
```

⚠️ **ATENÇÃO**: Na `GOOGLE_REDIRECT_URI`, substitua `seu-backend` pela URL que o Render vai gerar!

### Passo 4: Deploy
- Clique em "Create Web Service"
- Aguarde 10-15 minutos (primeiro deploy é mais lento)
- Copie a URL: `https://agenda-alcantara-backend.onrender.com`

### Passo 5: Atualizar Google OAuth
1. Google Cloud: https://console.cloud.google.com/
2. APIs & Services → Credentials
3. Edite seu OAuth Client
4. Adicione na lista de redirect URIs:
```
https://agenda-alcantara-backend.onrender.com/api/auth/google/callback
```
5. Salve

---

## 2️⃣ FRONTEND (Vercel) - 5 minutos

### Passo 1: Conectar ao GitHub
1. Acesse: https://vercel.com
2. Login com GitHub
3. "Add New Project"
4. Selecione: `caioalcantaradev/Agenda_Alcantara`

### Passo 2: Configurar Build
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Passo 3: Variáveis de Ambiente
Clique em "Environment Variables" e adicione:

```env
NEXT_PUBLIC_API_URL=https://agenda-alcantara-backend.onrender.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
```

### Passo 4: Deploy
- Clique em "Deploy"
- Aguarde 2-3 minutos
- URL: `https://agenda-alcantara.vercel.app`

---

## 3️⃣ ATUALIZAR FRONTEND_URL NO BACKEND

Após o deploy do frontend, volte no Render:

1. Settings → Environment
2. Edite `FRONTEND_URL`
3. Coloque: `https://agenda-alcantara.vercel.app`
4. Save Changes → Manual Deploy → Deploy latest commit

---

## 4️⃣ TESTAR

1. Acesse: https://agenda-alcantara.vercel.app
2. Clique em "Entrar com Google"
3. Autorize
4. Pronto! 🎉

---

## 📋 URLs Finais

- **Frontend**: https://agenda-alcantara.vercel.app
- **Backend**: https://agenda-alcantara-backend.onrender.com
- **Health Check**: https://agenda-alcantara-backend.onrender.com/api/health

---

## 🐛 Problemas?

### Backend não inicia
→ Verifique logs no Render (Logs tab)

### Login não funciona
→ Verifique se redirect URI está correto no Google Console
→ Aguarde 10 minutos após mudança

### CORS error
→ Verifique `FRONTEND_URL` no backend

### Frontend não carrega
→ Verifique build logs no Vercel
→ Verifique `NEXT_PUBLIC_API_URL`

---

## ✅ Checklist

- [ ] Backend deployado no Render
- [ ] Frontend deployado no Vercel
- [ ] Google OAuth configurado
- [ ] Variáveis de ambiente corretas
- [ ] Login funciona
- [ ] Calendário carrega

---

## 🎉 Deploy Automático!

A partir de agora, **todo push no GitHub** faz deploy automático:
- Push no `main` → Deploy automático no Vercel e Render

**Você nunca mais precisa fazer deploy manual!** 🚀


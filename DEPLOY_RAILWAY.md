# 🚂 Deploy Backend no Railway

## ✅ Por que Railway?

- ✅ Free tier generoso
- ✅ Deploy super rápido
- ✅ Interface simples
- ✅ Auto-deploy do GitHub

---

## 📋 Passo a Passo

### 1️⃣ Criar Conta
1. Acesse: https://railway.app
2. Login com GitHub
3. Aceite as permissões

### 2️⃣ Criar Projeto
1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Escolha: `caioalcantaradev/Agenda_Alcantara`
4. Clique em "Deploy Now"

### 3️⃣ Configurar o Serviço

O Railway vai detectar automaticamente que é um projeto Node.js. Você precisa apenas ajustar:

1. **Settings** → **Root Directory**: `backend`
2. **Variables** → Adicione as variáveis:

```env
GOOGLE_CLIENT_ID=348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=https://agenda-alcantara-production.up.railway.app/api/auth/google/callback
SHARED_CALENDAR_ID=76272a2b0f3224f3835adb0c9cc2bfce8a2d023f9c705e98845a474981a2efe3@group.calendar.google.com
MONGODB_URI=mongodb+srv://caioalcantaradev_db_user:K9cAfEtux3kTWCen@agendaalcantara.btom26f.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
JWT_SECRET=uma_senha_secreta_segura_aqui
NODE_ENV=production
FRONTEND_URL=https://agenda-alcantara.vercel.app
```

⚠️ **IMPORTANTE**: 
- `GOOGLE_REDIRECT_URI` deve usar a URL que o Railway vai gerar
- `FRONTEND_URL` deve ser a URL do Vercel

### 4️⃣ Ver URL do Deploy
1. Na aba "Settings" → "Networking"
2. Clique em "Generate Domain"
3. Copie a URL: `https://seu-projeto.up.railway.app`

### 5️⃣ Atualizar Variáveis com URL Correta
1. Vá em "Variables"
2. Edite `GOOGLE_REDIRECT_URI`:
```
https://seu-projeto.up.railway.app/api/auth/google/callback
```
3. Salve as mudanças

### 6️⃣ Atualizar Google OAuth
1. Acesse: https://console.cloud.google.com/
2. Vá em: APIs & Services → Credentials
3. Edite seu OAuth Client
4. Adicione no "Authorized redirect URIs":
```
https://seu-projeto.up.railway.app/api/auth/google/callback
```
5. Salve

### 7️⃣ Redeploy
1. No Railway, clique em "Redeploy"
2. Aguarde 2-3 minutos

---

## 🔧 Configurações Adicionais

### Build & Start Commands

O Railway detecta automaticamente, mas você pode ajustar em Settings:

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Variáveis de Ambiente Necessárias

```env
NODE_ENV=production
PORT=railway usa automaticamente
```

---

## 🎯 Após Configurar Backend

### Atualizar Frontend no Vercel

1. Vercel Dashboard
2. Seu Projeto → Settings → Environment Variables
3. Edite `NEXT_PUBLIC_API_URL`:
```
https://seu-projeto.up.railway.app
```
4. Salve
5. Vá em Deployments → Redeploy

---

## 📊 Vantagens do Railway vs Render

### Railway ✅
- Deploy mais rápido (~2-3 min)
- Interface moderna
- Auto-deploy perfeito
- Free tier estável

### Render ⚠️
- Free tier pode pausar após inatividade
- Primeiro deploy mais lento (~10-15 min)
- Interface mais simples

**Recomendação**: Railway é melhor para este projeto! 🚂

---

## 🐛 Troubleshooting

### Build falha
→ Verifique logs em "Deploy Logs"
→ Confirme que `Root Directory` está como `backend`

### Porta em uso
→ Railway atribui PORT automaticamente
→ Não precisa configurar manualmente

### Não conecta ao MongoDB
→ Verifique se Network Access no Atlas permite "0.0.0.0/0"
→ Verifique connection string

### CORS error
→ Verifique `FRONTEND_URL` nas variáveis
→ Deve ser a URL do Vercel

---

## 📈 Monitoramento

No Railway você pode ver:
- ✅ CPU Usage
- ✅ Memory Usage
- ✅ Network Traffic
- ✅ Logs em tempo real
- ✅ Métricas de deploy

---

## 💰 Custos

**Free Tier Railway:**
- $5 créditos grátis/mês
- Suficiente para ~100 horas de uso
- Mais que suficiente para uso pessoal!

---

## 🎉 Pronto!

Seu backend estará rodando em:
```
https://seu-projeto.up.railway.app
```

**Health Check:**
```
https://seu-projeto.up.railway.app/api/health
```

Devia retornar: `{"message": "API funcionando!"}`

---

## 📝 Checklist Railway

- [ ] Conta criada no Railway
- [ ] Projeto conectado ao GitHub
- [ ] Root Directory configurado: `backend`
- [ ] Todas variáveis de ambiente configuradas
- [ ] URL do deploy copiada
- [ ] Google OAuth atualizado
- [ ] Backend rodando corretamente
- [ ] Health check funciona
- [ ] Frontend atualizado com URL do backend


# 🎯 Guia Completo de Deploy - Família Alcantara

## 📊 Visão Geral

```
┌─────────────────────────────────────────────────┐
│  GitHub: caioalcantaradev/Agenda_Alcantara      │
└─────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼─────────┐
│   Vercel       │    │    Railway       │
│   (Frontend)   │◄───┤    (Backend)     │
│   Next.js      │    │    Express       │
└────────────────┘    └──────────────────┘
         │                      │
         └──────────┬───────────┘
                    │
         ┌──────────▼──────────┐
         │   MongoDB Atlas     │
         │   (Database)        │
         └─────────────────────┘
```

---

## 🚀 ORDEM CORRETA DE DEPLOY

### ⚠️ IMPORTANTE: Faça nesta ordem!

1. **Backend no Railway** (primeiro)
2. **Frontend no Vercel** (depois)
3. **Atualizar OAuth** (último)

---

## 📋 PASSO 1: Backend no Railway

### 1.1 Criar Conta
👉 https://railway.app

### 1.2 Criar Projeto
```
New Project → Deploy from GitHub → Agenda_Alcantara
```

### 1.3 Configurar
- **Settings → Root Directory**: `backend`

### 1.4 Variáveis de Ambiente
Veja todas em: **`DEPLOY_RAILWAY.md`**

### 1.5 Deploy
- Aguarde 2-3 minutos
- Copie a URL: `https://xxxxx.up.railway.app`

### 1.6 Health Check
Teste: `https://xxxxx.up.railway.app/api/health`

**Deve retornar**: `{"message": "API funcionando!"}`

✅ **Anote esta URL!** Você vai precisar!

---

## 📋 PASSO 2: Frontend no Vercel

### 2.1 Criar Conta
👉 https://vercel.com/signup

### 2.2 Criar Projeto
```
Add New → Project → Import Agenda_Alcantara
```

### 2.3 Configurar
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build**: `npm run build`

### 2.4 Variáveis de Ambiente

**Variável 1:**
```
Key: NEXT_PUBLIC_API_URL
Value: [URL DO SEU RAILWAY AQUI]
```
Exemplo: `https://xxxxx.up.railway.app`

**Variável 2:**
```
Key: NEXT_PUBLIC_GOOGLE_CLIENT_ID
Value: 348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
```

### 2.5 Deploy
- Aguarde 2-3 minutos
- Copie a URL: `https://agenda-alcantara.vercel.app`

✅ **Anote esta URL!**

---

## 📋 PASSO 3: Atualizar Google OAuth

### 3.1 Acessar Google Cloud
👉 https://console.cloud.google.com

### 3.2 Editar OAuth
```
APIs & Services → Credentials → Edit OAuth Client
```

### 3.3 Adicionar Redirect URI
```
Authorized redirect URIs:
+ https://xxxxx.up.railway.app/api/auth/google/callback
```

### 3.4 Salvar e Aguardar
- Clique em **Save**
- Aguarde 5-10 minutos para propagar

---

## 🎉 PRONTO!

Acesse: `https://agenda-alcantara.vercel.app`

---

## 🧪 Testar

1. ✅ Login com Google funciona?
2. ✅ Calendário carrega?
3. ✅ Eventos aparecem?
4. ✅ Criar evento funciona?

---

## 📚 Documentação Completa

Veja os guias detalhados:

- **`DEPLOY_RAILWAY.md`** → Deploy backend
- **`VERCEL_SETUP_STEP_BY_STEP.md`** → Deploy frontend
- **`DEPLOY_GUIDE.md`** → Guia completo
- **`DEPLOY_QUICK.md`** → Resumo rápido

---

## 🐛 Troubleshooting

### Erro: "API connection failed"
→ Verifique `NEXT_PUBLIC_API_URL` no Vercel
→ Deve ser a URL do Railway

### Erro: "redirect_uri_mismatch"
→ Verifique se adicionou a URL correta no Google Console
→ Aguarde 10 minutos

### Erro: "CORS"
→ Verifique `FRONTEND_URL` no Railway
→ Deve ser a URL do Vercel

### Build Failed no Vercel
→ Verifique Root Directory: `frontend`
→ Verifique logs para detalhes

---

## 📊 Status dos Deploys

Você pode monitorar em tempo real:

- **Vercel**: https://vercel.com/dashboard
- **Railway**: https://railway.app/dashboard
- **MongoDB**: https://cloud.mongodb.com

---

## 🔄 Auto-Deploy

**Agora toda vez que você fizer push:**
```
git add .
git commit -m "minha mudança"
git push
```

→ **Deploy automático em Vercel e Railway!** 🚀

---

## 💡 Dicas

- ✅ Use sempre HTTPS nas URLs
- ✅ Nunca commite o arquivo `.env`
- ✅ Teste localmente antes de deployar
- ✅ Monitore os logs em caso de erro

---

## 📞 Precisa de Ajuda?

Se travar em algum passo, me avise:
- Em qual passo você está
- Qual erro aparece
- Print da tela (se possível)


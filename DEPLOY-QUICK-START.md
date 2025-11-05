# Deploy Rápido - Configurações

## ✅ Configurações Prontas

O projeto já está configurado para deploy em:

- ✅ **Railway** (`railway.json`)
- ✅ **Render** (`render.yaml`)
- ✅ **Vercel** (frontend - detecta automaticamente)

## 📦 Arquivos de Configuração

### Backend

- `backend/package.json` - Scripts `build` e `start` configurados
- `backend/.nvmrc` - Node.js 20
- `backend/Procfile` - Para compatibilidade com Heroku/Render
- `backend/tsconfig.json` - Configuração TypeScript

### Root

- `railway.json` - Configuração do Railway
- `render.yaml` - Configuração do Render

## 🚀 Railway - Deploy Rápido

1. Acesse [Railway](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Selecione o repositório
4. Railway detecta automaticamente o `railway.json`
5. Configure as variáveis de ambiente:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (opcional, padrão 5000)
   - `CORS_ORIGIN`
6. Railway faz o build e deploy automaticamente

**Nota:** O Railway detecta automaticamente que o backend está em `backend/` pelo `railway.json`.

## 🔧 Render - Deploy Rápido

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. "New +" → "Web Service"
3. Conecte o repositório GitHub
4. Render detecta automaticamente o `render.yaml`
5. Ou configure manualmente:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Configure as variáveis de ambiente

## 📝 Variáveis de Ambiente Necessárias

### Backend (Railway/Render)

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=seu-segredo-aqui
PORT=5000
CORS_ORIGIN=https://seu-frontend.vercel.app
```

### Frontend (Vercel)

```
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
```

## 🎯 Próximos Passos

1. Configure o MongoDB Atlas (veja `README-deploy.md`)
2. Faça deploy do backend (Railway ou Render)
3. Faça deploy do frontend (Vercel)
4. Execute o seed: `cd backend && npm run seed` (localmente ou via Railway CLI)
5. Atualize o CORS do backend com a URL do frontend

---

**Tudo pronto para deploy!** 🚀


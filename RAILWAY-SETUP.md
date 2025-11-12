# Configuração do Railway - Passo a Passo

## ⚠️ IMPORTANTE: Configuração Obrigatória

O Railway **PRECISA** estar configurado corretamente para funcionar. Siga estes passos:

### 1. Configurar Root Directory (CRÍTICO)

1. Acesse o painel do Railway: https://railway.app
2. Clique no seu serviço `agenda-alcantara-backend-production`
3. Vá em **Settings** (ícone de ⚙️ no topo)
4. Procure por **"Root Directory"** ou **"Service Source"**
5. **Configure como: `backend`** (sem aspas, apenas `backend`)
6. Clique em **Save** ou **Update**

**IMPORTANTE:** Sem essa configuração, o Railway não vai encontrar o `package.json` e vai tentar executar comandos errados!

### 2. Configurar MongoDB Atlas

**IMPORTANTE**: O MongoDB do Railway pausou após o período gratuito. Você precisa usar MongoDB Atlas (gratuito).

1. Siga o guia em [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md) para configurar o MongoDB Atlas
2. Obtenha sua connection string do MongoDB Atlas
3. Configure a variável `MONGODB_URI` no Railway com sua connection string

### 3. Variáveis de Ambiente

No mesmo painel de Settings, vá em **Variables** e configure:

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/agenda
JWT_SECRET=seu-segredo-jwt-aqui
PORT=5000
CORS_ORIGIN=https://agenda-alcantara.vercel.app
```

**Importante**: 
- Substitua `MONGODB_URI` pela sua connection string do MongoDB Atlas
- Não use a connection string do Railway (ela não funciona mais)
- Veja [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md) para mais detalhes

### 4. Verificar Deploy

Após configurar o Root Directory e as variáveis de ambiente:
1. Vá em **Deployments**
2. Clique em **Redeploy** ou **Deploy** novamente
3. O Railway deve detectar o `nixpacks.toml` no diretório `backend`
4. O build deve funcionar corretamente

### 5. Verificar Logs

Se ainda houver problemas:
1. Vá em **Deployments**
2. Clique no deploy mais recente
3. Veja os logs para identificar o erro
4. Confirme que o Root Directory está como `backend`

## ✅ Checklist

- [ ] Root Directory configurado como `backend`
- [ ] MongoDB Atlas configurado (veja [MONGODB-ATLAS-SETUP.md](./MONGODB-ATLAS-SETUP.md))
- [ ] Variável `MONGODB_URI` configurada no Railway com connection string do MongoDB Atlas
- [ ] Variáveis de ambiente configuradas (`JWT_SECRET`, `CORS_ORIGIN`, etc.)
- [ ] Deploy realizado após configurar Root Directory
- [ ] Logs mostram que o build está funcionando
- [ ] Logs mostram "✅ Conectado ao MongoDB Atlas"

## 🐛 Problemas Comuns

**Erro: `npm: command not found`**
→ Root Directory não está configurado como `backend`

**Erro: `EBUSY` ou `npm ci` falhando**
→ Root Directory não está configurado corretamente

**Erro: `package.json not found`**
→ Root Directory não está apontando para `backend`

**Solução:** Sempre verifique o Root Directory primeiro!


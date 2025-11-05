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

### 2. Variáveis de Ambiente

No mesmo painel de Settings, vá em **Variables** e configure:

```
MONGODB_URI=mongodb+srv://caioalcantaradev_db_user:Cvv2BdcvOWvNPJEM@agenda-alcantara.dxxyho2.mongodb.net/?appName=Agenda-Alcantara
JWT_SECRET=seu-segredo-jwt-aqui
PORT=5000
CORS_ORIGIN=https://seu-frontend.vercel.app
```

### 3. Verificar Deploy

Após configurar o Root Directory:
1. Vá em **Deployments**
2. Clique em **Redeploy** ou **Deploy** novamente
3. O Railway deve detectar o `nixpacks.toml` no diretório `backend`
4. O build deve funcionar corretamente

### 4. Verificar Logs

Se ainda houver problemas:
1. Vá em **Deployments**
2. Clique no deploy mais recente
3. Veja os logs para identificar o erro
4. Confirme que o Root Directory está como `backend`

## ✅ Checklist

- [ ] Root Directory configurado como `backend`
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado após configurar Root Directory
- [ ] Logs mostram que o build está funcionando

## 🐛 Problemas Comuns

**Erro: `npm: command not found`**
→ Root Directory não está configurado como `backend`

**Erro: `EBUSY` ou `npm ci` falhando**
→ Root Directory não está configurado corretamente

**Erro: `package.json not found`**
→ Root Directory não está apontando para `backend`

**Solução:** Sempre verifique o Root Directory primeiro!


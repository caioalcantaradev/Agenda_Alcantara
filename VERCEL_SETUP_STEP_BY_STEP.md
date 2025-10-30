# 🚀 Deploy Frontend no Vercel - Passo a Passo Visual

## ⚠️ IMPORTANTE

**Primeiro você precisa criar a conta e fazer o deploy!** O link só vai funcionar DEPOIS do deploy.

---

## 📋 Passo a Passo DETALHADO

### 1️⃣ Criar Conta no Vercel (2 minutos)

1. Acesse: https://vercel.com/signup
2. Escolha: **"Continue with GitHub"**
3. Autorize o Vercel a acessar seus repositórios
4. Complete o cadastro

### 2️⃣ Criar Novo Projeto (5 minutos)

1. Após login, clique em **"Add New"** → **"Project"**
2. Você verá uma lista dos seus repositórios GitHub
3. Procure por: **`Agenda_Alcantara`** (ou `caioalcantaradev/Agenda_Alcantara`)
4. Clique em **"Import"**

### 3️⃣ Configurar Build Settings

Na tela de configuração, ajuste:

#### **Framework Preset**

⚠️ **Se NÃO detectar automaticamente como Next.js:**

1. Clique em **"Override"** ou procure por "Framework Settings"
2. Selecione manualmente: **Next.js**
3. Ou deixe "Other" e configure manualmente (ver abaixo)

#### **Root Directory**

⚠️ **IMPORTANTE**: Clique em "Edit" ao lado de Root Directory

- Selecione: **`frontend`**
- Ou digite: `frontend`

#### **Build and Output Settings**

**Se detectou Next.js:**

- Deixe tudo padrão

**Se NÃO detectou (mostra "Other" ou vazio):**
Configure manualmente:

- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `.next`
- **Install Command**: `cd frontend && npm install`

**OU se Root Directory = `frontend`:**

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4️⃣ Adicionar Variáveis de Ambiente

Antes de fazer o deploy, clique em **"Environment Variables"**

Adicione as seguintes variáveis:

#### Variável 1:

```
Key: NEXT_PUBLIC_API_URL
Value: https://agenda-alcantara-production.up.railway.app
```

⚠️ **Importante**: Use a URL do seu backend no Railway (você vai obter essa URL depois)

#### Variável 2:

```
Key: NEXT_PUBLIC_GOOGLE_CLIENT_ID
Value: 348669216349-vusinhi22q9epgjqmdt6f59d4c07d5lu.apps.googleusercontent.com
```

### 5️⃣ Fazer Deploy

1. Clique no botão **"Deploy"** (grande, azul)
2. Aguarde de 2 a 5 minutos
3. Verifique o progresso nos logs

### 6️⃣ Obter URL de Produção

Após o deploy completar:

1. Você verá uma mensagem de sucesso
2. A URL estará assim: **`https://agenda-alcantara.vercel.app`**
3. Clique na URL para acessar

---

## 🔧 Se Algo Der Errado

### Erro: "Build Failed"

**Causa**: Root Directory não configurado corretamente

**Solução**:

1. Settings → General → Root Directory
2. Certifique-se de que está `frontend`
3. Save
4. Redeploy

### Erro: "Build Command Error"

**Solução**: Ajuste os comandos de build:

Se Root Directory = `frontend`:

- Build: `npm run build`
- Install: `npm install`

Se Root Directory = `.`:

- Build: `cd frontend && npm run build`
- Install: `cd frontend && npm install`

### Erro: "Cannot find module"

**Solução**:

1. Limpe o cache: Settings → General → Clear Build Cache
2. Delete `.next` e `node_modules` localmente
3. Commit e push novamente
4. Redeploy

---

## 📱 Deploy Automático Futuro

Uma vez configurado, **todo push na branch `main`** fará deploy automático:

1. Faça `git push` no seu código
2. Vercel detecta automaticamente
3. Faz build automático
4. Deploy em 2-3 minutos
5. **URL sempre atualizada!** 🎉

---

## 🎯 URL Final

Após o deploy, sua aplicação estará em:

**`https://agenda-alcantara.vercel.app`**

Ou uma URL aleatória similar.

---

## 📊 Onde Ver Status

1. **Dashboard**: https://vercel.com/dashboard
2. **Deployments**: Veja todos os deploys
3. **Logs**: Abra qualquer deploy para ver logs
4. **Settings**: Configure variáveis de ambiente

---

## 🔄 Como Atualizar Variáveis de Ambiente

Depois de ter feito o deploy:

1. Vá em Settings → Environment Variables
2. Edite a variável
3. Salve
4. Vá em Deployments
5. Clique nos 3 pontinhos do último deploy
6. Selecione "Redeploy"

---

## 💡 Dica

**Faça primeiro o deploy do backend no Railway**, pegue a URL do backend, e DEPOIS configure as variáveis no Vercel!

---

## ✅ Checklist

- [ ] Conta Vercel criada
- [ ] Projeto importado do GitHub
- [ ] Root Directory: `frontend`
- [ ] Build settings configurados
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy executado com sucesso
- [ ] URL de produção copiada
- [ ] Testado login

---

## 🆘 Precisa de Ajuda?

Se travar em algum passo, me avise qual erro apareceu!

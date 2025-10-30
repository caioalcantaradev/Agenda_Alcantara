# 🚀 Passos Rápidos MongoDB Atlas

## ⚡ Configuração Express (5 minutos)

### 1️⃣ Acesse e Crie Conta
🔗 https://www.mongodb.com/cloud/atlas/register

### 2️⃣ Criar Cluster Gratuito
1. Login em: https://cloud.mongodb.com/
2. Clique: **"Build a Database"**
3. Escolha: **FREE (M0)** - plano gratuito
4. Provider: AWS | Region: **São Paulo (sa-east-1)** ou próximo
5. Deixe tudo padrão
6. Clique: **"Create"**
⏱️ Aguarde 1-2 minutos

### 3️⃣ Configurar Network Access (Permitir seu IP)
1. Em "Quickstart" → clique **"Connect"**
2. Escolha: **"Connect your application"**
3. Vá para aba **"Network Access"** (lateral esquerda)
4. Clique: **"Add IP Address"**
5. Selecione: **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Confirme: **"Confirm"**

### 4️⃣ Criar Usuário do Banco
1. Aba lateral: **"Database Access"**
2. Clique: **"Add New Database User"**
3. Configure:
   - **Username**: `familia_alcantara`
   - **Password**: Cole uma senha forte (ex: `FamiliaAlcantara2024!`)
   - **Database User Privileges**: Deixe "Read and write to any database"
4. Clique: **"Add User"**
5. **⚠️ ANOTE A SENHA!**

### 5️⃣ Pegar Connection String
1. Vá em **"Connect"** → **"Connect your application"**
2. Driver: **Node.js** | Version: **5.5 or later**
3. Você verá algo assim:
```
mongodb+srv://<username>:<password>@familiaalcantara.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6️⃣ Montar Connection String Completa

**Substitua:**
- `<username>` por: `familia_alcantara`
- `<password>` pela senha que você criou
- Adicione o nome do banco no final

**Exemplo final:**
```
mongodb+srv://familia_alcantara:FamiliaAlcantara2024!@familiaalcantara.xxxxx.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
```

### 7️⃣ Atualizar backend/.env

Abra `backend/.env` e atualize apenas a linha MONGODB_URI:

**DE:**
```env
MONGODB_URI=mongodb://localhost:27017/agenda_alcantara
```

**PARA:**
```env
MONGODB_URI=mongodb+srv://familia_alcantara:FamiliaAlcantara2024!@familiaalcantara.xxxxx.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
```

⚠️ **Cole sua connection string real aqui!**

### 8️⃣ Testar!

```bash
cd backend
npm run dev
```

**Você deve ver:**
```
Conectado ao MongoDB
Servidor rodando na porta 5000
```

Se aparecer erro de conexão, verifique:
- ✅ Usuário e senha estão corretos na connection string
- ✅ IP está liberado (Allow from anywhere)
- ✅ Cluster está ativo (não está "paused")

---

## 🎯 Checkbox de Verificação

- [ ] Conta MongoDB Atlas criada
- [ ] Cluster gratuito criado (M0)
- [ ] Network Access configurado (Allow from anywhere)
- [ ] Usuário do banco criado
- [ ] Connection String copiada
- [ ] Connection String atualizada no backend/.env
- [ ] Backend iniciado com sucesso
- [ ] Mensagem "Conectado ao MongoDB" aparece

---

## 📱 Próximos Passos

Depois que o MongoDB estiver funcionando:

1. Certifique-se que o backend está rodando
2. Certifique-se que o frontend está rodando
3. Acesse: http://localhost:3000/login
4. Teste o login!

---

## 🆘 Precisa de Ajuda?

Todo o processo está documentado em: `MONGODB_ATLAS_SETUP.md`


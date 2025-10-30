# 🍃 Configurar MongoDB Atlas (GRATUITO)

## Por que Atlas é melhor?
✅ Não precisa instalar nada no PC  
✅ Funciona em qualquer lugar  
✅ Backup automático  
✅ Clusters de até 512MB grátis  
✅ Interface web para gerenciar dados  

## Passo a Passo

### 1️⃣ Criar Conta
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Preencha email, senha, nome
3. Confirme o email

### 2️⃣ Criar Cluster Gratuito
1. Faça login em: https://cloud.mongodb.com/
2. Clique em "Build a Database"
3. Escolha o plano **FREE** (512MB grátis)
4. Deixe as configurações padrão:
   - Provider: AWS
   - Region: Escolha a mais próxima (ex: São Paulo)
   - Cluster Name: `FamiliaAlcantara`
5. Clique em "Create"

⏱️ Aguarde 1-3 minutos enquanto o cluster é criado

### 3️⃣ Configurar Acesso
1. Na tela "Quickstart", clique em "Connect"
2. Vá para a aba "Network Access"
3. Clique em "Add IP Address"
4. Selecione "Allow Access from Anywhere" (0.0.0.0/0)
   - Ou adicione seu IP específico
5. Confirme

### 4️⃣ Criar Usuário do Banco
1. Volte para "Database Access"
2. Clique em "Add New Database User"
3. Configure:
   - Authentication: Password
   - Username: `familia_alcantara` (ou outro)
   - Password: Cole uma senha forte
4. **IMPORTANTE**: Guarde esta senha!
5. Role: "Atlas Admin" (deixe padrão)
6. Clique em "Add User"

### 5️⃣ Obter Connection String
1. Volte para "Connect"
2. Selecione "Connect your application"
3. Escolha:
   - Driver: Node.js
   - Version: 5.5 or later
4. Copie a connection string que aparece
   - Exemplo: `mongodb+srv://<username>:<password>@familiaalcantara.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 6️⃣ Atualizar Connection String
Substitua na connection string:
- `<username>` pelo usuário que você criou
- `<password>` pela senha que você criou

**Exemplo final:**
```
mongodb+srv://familia_alcantara:MinhaSenh@123@familiaalcantara.xxxxx.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
```

### 7️⃣ Configurar no backend
Edite o arquivo `backend/.env`:

```env
MONGODB_URI=mongodb+srv://familia_alcantara:MinhaSenh@123@familiaalcantara.xxxxx.mongodb.net/agenda_alcantara?retryWrites=true&w=majority
```

⚠️ **IMPORTANTE**: Substitua pelos seus dados reais!

### 8️⃣ Testar Conexão
```bash
cd backend
npm run dev
```

Se conectou com sucesso, verá:
```
Conectado ao MongoDB
```

## 📸 Screenshots Úteis

### Interface do MongoDB Atlas
- Dashboard: https://cloud.mongodb.com/
- Coleções: Seções "Browse Collections"
- Logs: "Activity Feed"

## 🔒 Segurança

✅ Senha forte (mínimo 12 caracteres)  
✅ Backup automático habilitado  
✅ Acesso apenas por IP autorizado  
✅ Connection string segura

## 💡 Dicas

- Cluster grátis pode ficar "dormindo" após inatividade
- Redeploy automático se houver tentativas de conexão
- Backup automático é ativado em clusters pagos
- Dados são criptografados em trânsito

## 🆘 Problemas?

### "Authentication failed"
- Verifique usuário e senha no connection string
- Confirme que o usuário tem permissão "Atlas Admin"

### "Connection timeout"
- Verifique se adicionou seu IP no Network Access
- Tente "Allow from anywhere" temporariamente

### "Database not found"
- Não precisa criar manualmente, o Mongoose cria

## 🎉 Pronto!
Agora seu backend pode conectar ao MongoDB sem instalar nada localmente!


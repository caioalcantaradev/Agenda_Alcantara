# 🔍 Verificação de Conexão com MongoDB Atlas

## Status do Cluster

✅ **Cluster está ATIVO** (ponto verde visível)
✅ **Conexões ativas**: 11-12 conexões
✅ **Atividade**: Writes e bandwidth ativos
✅ **Região**: AWS / São Paulo (sa-east-1)
✅ **Versão**: MongoDB 8.0.15

## ❌ Problema Atual

**Erro**: `querySrv ETIMEOUT` ao resolver DNS
**Hostname**: `agenda-alcantara.dxxyho2.mongodb.net`

## 🔍 Possíveis Causas

Como o cluster está ativo, o problema pode ser:

### 1. Network Access não configurado

- Seu IP local pode não estar na lista de Network Access
- Verifique se há IPs permitidos no MongoDB Atlas

### 2. Connection String incorreta

- O hostname na connection string pode estar incorreto
- Verifique a connection string atual no MongoDB Atlas

### 3. Problema de DNS local

- O DNS local pode não estar conseguindo resolver o hostname
- Pode ser um problema de rede/firewall

### 4. Firewall/Antivírus

- Algum firewall ou antivírus pode estar bloqueando a conexão
- Verifique as configurações de firewall

## ✅ Soluções

### 1. Verificar Network Access no MongoDB Atlas

1. Acesse: https://cloud.mongodb.com/
2. Vá em **Network Access** (menu lateral)
3. Verifique se há IPs permitidos:
   - Se não houver nenhum IP, adicione seu IP ou `0.0.0.0/0` (desenvolvimento)
   - Se houver IPs, verifique se seu IP está na lista
4. Para desenvolvimento local, adicione:
   - Clique em **"Add IP Address"**
   - Clique em **"Allow Access from Anywhere"** (adiciona `0.0.0.0/0`)
   - Clique em **"Confirm"**
   - ⚠️ Aguarde alguns minutos para a mudança ser aplicada

### 2. Obter Connection String Atual

1. No MongoDB Atlas, vá em **Database** (menu lateral)
2. Clique em **"Connect"** no cluster `Agenda-Alcantara`
3. Escolha **"Connect your application"**
4. Selecione driver: **Node.js** e versão mais recente
5. Copie a connection string atual:
   ```
   mongodb+srv://<username>:<password>@agenda-alcantara.dxxyho2.mongodb.net/?...
   ```
6. **Substitua** `<username>` e `<password>` pelos dados corretos
7. **Adicione** `/agenda` antes do `?` para especificar o banco
8. **Atualize** o arquivo `.env` no backend com a connection string correta

### 3. Verificar Connection String no .env

1. Abra o arquivo `backend/.env`
2. Verifique se a connection string está no formato correto:
   ```
   MONGODB_URI=mongodb+srv://usuario:senha@agenda-alcantara.dxxyho2.mongodb.net/agenda?appName=Agenda-Alcantara
   ```
3. **Importante**:
   - Substitua `usuario` pelo usuário correto (`caioalcantaradev_db_user`)
   - Substitua `senha` pela senha correta
   - O hostname deve ser exatamente `agenda-alcantara.dxxyho2.mongodb.net`
   - Deve incluir `/agenda` antes do `?`

### 4. Testar Connection String Manualmente

1. No MongoDB Atlas, clique em **"Connect"** no cluster
2. Escolha **"Connect your application"**
3. Copie a connection string completa
4. Teste no terminal:
   ```bash
   # Substitua pela connection string real
   mongosh "mongodb+srv://usuario:senha@agenda-alcantara.dxxyho2.mongodb.net/agenda"
   ```

### 5. Verificar Firewall/Antivírus

1. Verifique se há algum firewall bloqueando a conexão
2. Verifique se o antivírus não está bloqueando
3. Tente desabilitar temporariamente para testar

## 🧪 Testar Novamente

Após verificar/ajustar:

1. **Verificar Network Access**:

   - Adicione seu IP ou `0.0.0.0/0` (desenvolvimento)
   - Aguarde alguns minutos

2. **Verificar Connection String**:

   - Obtenha a connection string atual no MongoDB Atlas
   - Atualize o arquivo `.env` com a connection string correta

3. **Testar conexão**:
   ```bash
   cd backend
   npm run validate:config
   npm run build
   node dist/scripts/test-connection-simple.js
   ```

## 📝 Checklist

- [ ] Network Access configurado (IP adicionado ou `0.0.0.0/0`)
- [ ] Connection string obtida do MongoDB Atlas (atual)
- [ ] Connection string atualizada no `.env`
- [ ] Usuário e senha corretos na connection string
- [ ] Hostname correto na connection string
- [ ] `/agenda` incluído na connection string
- [ ] Firewall/Antivírus não está bloqueando
- [ ] Aguardou alguns minutos após configurar Network Access

## 🔗 Links Úteis

- MongoDB Atlas: https://cloud.mongodb.com/
- Network Access: https://cloud.mongodb.com/v2#/security/network/whitelist
- Database Access: https://cloud.mongodb.com/v2#/security/database/users

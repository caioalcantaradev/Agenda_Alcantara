# 🔗 Como Obter a Connection String Correta

## Passo a Passo

### 1. Acesse o MongoDB Atlas

1. Acesse: https://cloud.mongodb.com/
2. Faça login na sua conta
3. Selecione o projeto **Agenda-Alcantara**

### 2. Vá para o Cluster

1. No menu lateral, clique em **Database**
2. Você verá o cluster **Agenda-Alcantara** (com ponto verde)
3. Clique no botão **"Connect"** ao lado do cluster

### 3. Escolha "Connect your application"

1. Na janela que abrir, escolha **"Connect your application"**
2. Selecione o driver: **Node.js**
3. Selecione a versão: **5.5 or later** (ou a mais recente)
4. Você verá uma connection string como:
   ```
   mongodb+srv://<username>:<password>@agenda-alcantara.dxxyho2.mongodb.net/?retryWrites=true&w=majority&appName=Agenda-Alcantara
   ```

### 4. Copie a Connection String

1. Clique no botão **"Copy"** para copiar a connection string
2. **IMPORTANTE**: Não feche a janela ainda!

### 5. Formatar a Connection String

A connection string copiada terá `<username>` e `<password>` que você precisa substituir:

**Formato original:**
```
mongodb+srv://<username>:<password>@agenda-alcantara.dxxyho2.mongodb.net/?retryWrites=true&w=majority&appName=Agenda-Alcantara
```

**Formato correto (substitua os valores):**
```
mongodb+srv://caioalcantaradev_db_user:Cvv2BdcvOWvNPJEM@agenda-alcantara.dxxyho2.mongodb.net/agenda?retryWrites=true&w=majority&appName=Agenda-Alcantara
```

**Mudanças necessárias:**
1. Substitua `<username>` por `caioalcantaradev_db_user`
2. Substitua `<password>` por `Cvv2BdcvOWvNPJEM`
3. **Adicione** `/agenda` antes do `?` para especificar o banco de dados

### 6. Verificar o Hostname

O hostname deve ser algo como:
- `agenda-alcantara.dxxyho2.mongodb.net`
- Ou outro hostname fornecido pelo MongoDB Atlas

**IMPORTANTE**: Se o hostname na connection string for diferente de `agenda-alcantara.dxxyho2.mongodb.net`, use o hostname fornecido pelo MongoDB Atlas!

### 7. Atualizar o arquivo .env

1. Abra o arquivo `backend/.env`
2. Atualize a linha `MONGODB_URI` com a connection string formatada:
   ```env
   MONGODB_URI=mongodb+srv://caioalcantaradev_db_user:Cvv2BdcvOWvNPJEM@agenda-alcantara.dxxyho2.mongodb.net/agenda?retryWrites=true&w=majority&appName=Agenda-Alcantara
   ```
3. Salve o arquivo

### 8. Verificar Network Access

1. No MongoDB Atlas, vá em **Network Access** (menu lateral)
2. Verifique se há IPs permitidos
3. Se não houver nenhum IP, adicione:
   - Clique em **"Add IP Address"**
   - Clique em **"Allow Access from Anywhere"** (adiciona `0.0.0.0/0`)
   - Clique em **"Confirm"**
   - ⚠️ Aguarde alguns minutos para a mudança ser aplicada

### 9. Testar a Conexão

Após atualizar a connection string e configurar o Network Access:

```bash
cd backend
npm run validate:config
npm run build
node dist/scripts/test-connection-simple.js
```

## 🔍 Verificar se o Hostname está Correto

Se o DNS ainda não resolver, verifique:

1. **No MongoDB Atlas**, clique em **"Connect"** no cluster
2. Veja qual é o hostname exato na connection string
3. Compare com o hostname no arquivo `.env`
4. Se forem diferentes, atualize o `.env` com o hostname correto

## ⚠️ Importante

- O hostname pode ser diferente do que está no `.env` atual
- Use sempre a connection string fornecida pelo MongoDB Atlas
- Verifique se o Network Access está configurado
- Aguarde alguns minutos após configurar o Network Access


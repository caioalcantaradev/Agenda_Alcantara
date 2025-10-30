# 📋 Como Pegar a Connection String do MongoDB Atlas

## 🔍 Onde encontrar

### Após criar o cluster:
1. Clique em **"Connect"** (botão verde/grande)
2. Escolha: **"Connect your application"**
3. Escolha Driver: **Node.js** | Version: **5.5 or later**
4. Você verá:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## 📝 O que me enviar:

**Me envie:**
- Sua connection string completa
- OU me diga username e password que você quer usar

**Exemplo do que enviar:**
```
mongodb+srv://familia_alcantara:MinhaSenha123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

OU simplesmente diga:
```
Username: familia_alcantara
Password: MinhaSenha123
Host: cluster0.abc123.mongodb.net
```

## 🚨 Importante:

⚠️ A connection string que você me enviar será adicionada ao arquivo `.env` que está no `.gitignore` (seguro)

⚠️ Depois de eu configurar, você NUNCA deve fazer commit do arquivo `.env` no GitHub

⚠️ Sempre que clonar o projeto, você precisará criar o `.env` novamente

## ✅ Depois que eu configurar:

1. Você só precisa rodar: `npm run dev` no backend
2. O MongoDB vai conectar automaticamente
3. Pronto para usar! 🎉


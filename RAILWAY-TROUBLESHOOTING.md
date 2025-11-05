# Troubleshooting - Railway Crash

## 🔍 Como Diagnosticar o Crash

### 1. Verificar Logs no Railway

1. Acesse o painel do Railway
2. Clique no seu serviço `agenda-alcantara-backend-production`
3. Vá em **Deployments**
4. Clique no deploy mais recente
5. Veja os **Logs** para identificar o erro

### 2. Problemas Comuns e Soluções

#### ❌ Erro: "Cannot connect to MongoDB"
**Causa:** Variável `MONGODB_URI` não configurada ou incorreta

**Solução:**
1. Vá em **Settings** → **Variables**
2. Verifique se `MONGODB_URI` está configurada
3. Verifique se a connection string está correta
4. Certifique-se de que o MongoDB Atlas permite conexões do Railway (Network Access)

#### ❌ Erro: "Port already in use"
**Causa:** A porta está sendo usada por outro processo

**Solução:**
- O Railway fornece a porta via variável `PORT` automaticamente
- Não defina `PORT` manualmente, deixe o Railway gerenciar

#### ❌ Erro: "JWT_SECRET not set"
**Causa:** Variável `JWT_SECRET` não configurada

**Solução:**
1. Vá em **Settings** → **Variables**
2. Adicione `JWT_SECRET` com um valor aleatório forte
3. Exemplo: gere com `openssl rand -base64 32`

#### ❌ Servidor inicia mas crasha depois
**Possíveis causas:**
- Conexão com MongoDB perde (timeout)
- Erro não tratado na aplicação
- Memória insuficiente

**Solução:**
1. Verifique os logs para ver o erro exato
2. Verifique se o MongoDB Atlas está acessível
3. Verifique se todas as variáveis de ambiente estão configuradas

### 3. Verificar Variáveis de Ambiente

No Railway, vá em **Settings** → **Variables** e confirme:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=seu-segredo-aqui
PORT=5000 (ou deixe o Railway gerenciar)
CORS_ORIGIN=https://seu-frontend.vercel.app
```

### 4. Testar Health Check

Após o deploy, teste o endpoint de health:

```
https://seu-app.railway.app/api/health
```

Deve retornar:
```json
{
  "ok": true,
  "timestamp": "2025-01-05T..."
}
```

### 5. Verificar MongoDB Atlas

1. Acesse o MongoDB Atlas
2. Vá em **Network Access**
3. Certifique-se de que há uma regra permitindo `0.0.0.0/0` (todos os IPs)
   - Ou adicione os IPs específicos do Railway

### 6. Logs Úteis para Verificar

Procure por estas mensagens nos logs:

✅ **Sucesso:**
- `🚀 Iniciando servidor...`
- `✅ Conectado ao MongoDB Atlas`
- `✅ API rodando na porta X`

❌ **Erro:**
- `❌ Erro ao conectar ao MongoDB`
- `❌ Falha ao iniciar servidor`
- `❌ Porta X já está em uso`

## 🔧 Melhorias Aplicadas

As correções incluem:

1. ✅ Servidor escuta em `0.0.0.0` (necessário para Railway)
2. ✅ Timeout de conexão MongoDB configurado (10s)
3. ✅ Logs mais detalhados para diagnóstico
4. ✅ Tratamento de erros melhorado
5. ✅ Graceful shutdown (SIGTERM/SIGINT)
6. ✅ Health check endpoint melhorado

## 📝 Checklist de Diagnóstico

- [ ] Logs do Railway verificados
- [ ] Variáveis de ambiente configuradas
- [ ] MongoDB Atlas acessível
- [ ] Health check funcionando
- [ ] Porta correta sendo usada
- [ ] JWT_SECRET configurado


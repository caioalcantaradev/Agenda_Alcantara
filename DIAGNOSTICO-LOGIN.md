# 🔍 Diagnóstico de Problemas de Login

## ✅ Melhorias Implementadas

### Backend

1. **CORS melhorado**: Agora aceita múltiplas origens (Vercel, localhost, etc.)
2. **Logs detalhados**: Cada requisição de login agora gera logs no Railway
3. **Health check**: Endpoint `/api/health` para testar se o backend está rodando

### Frontend

1. **Health check antes do login**: Testa se o backend está acessível antes de tentar fazer login
2. **Mensagens de erro melhoradas**: Mensagens mais específicas e em português
3. **Timeouts**: Health check tem timeout de 5s, login tem timeout de 10s
4. **Logs detalhados**: Console do navegador mostra passo a passo o que está acontecendo

## 🧪 Como Diagnosticar

### 1. Verificar se o Backend está Rodando

**No Railway:**

1. Acesse seu projeto no Railway
2. Vá em "Deployments"
3. Verifique se o último deploy está com status "Active"
4. Clique no serviço e verifique os logs

**Teste manual:**
Abra no navegador ou use curl:

```bash
curl https://sua-url-railway.railway.app/api/health
```

Deve retornar:

```json
{ "ok": true, "timestamp": "2025-11-05T..." }
```

### 2. Verificar Variáveis de Ambiente

**Vercel:**

1. Settings → Environment Variables
2. Verifique se `NEXT_PUBLIC_API_URL` está configurada
3. Valor deve ser: `https://sua-url-railway.railway.app` (sem barra final)

**Railway:**

1. Settings → Variables
2. Verifique se estas variáveis estão configuradas:
   - `MONGODB_URI` (opcional, tem fallback)
   - `JWT_SECRET` (opcional, tem fallback)
   - `CORS_ORIGIN` (opcional, mas recomendado)
   - `PORT` (geralmente é automático)

### 3. Verificar Logs

**No navegador (F12 → Console):**
Ao tentar fazer login, você verá:

- 🔗 Tentando login em: [URL]
- 🌐 API_URL configurada: [URL]
- 🏥 Testando health check: [URL]
- ✅ Health check OK ou ❌ Health check falhou

**No Railway (Logs do serviço):**
Você verá:

- 🚀 Iniciando servidor...
- 📡 Porta: [porta]
- 🔗 CORS Origin: [origem]
- `POST /api/auth/login - Origin: [origem]`
- 🔐 Tentativa de login recebida
- 🔍 Buscando usuário: [email]
- ✅ Usuário encontrado ou ❌ Login falhou

### 4. Problemas Comuns

#### Erro: "Failed to fetch" ou "NetworkError"

**Causa:** Backend não está acessível ou URL incorreta
**Solução:**

1. Verifique se o backend está rodando no Railway
2. Verifique se a URL está correta na Vercel (sem barra final)
3. Teste o health check manualmente

#### Erro: "Timeout"

**Causa:** Backend está muito lento ou não está respondendo
**Solução:**

1. Verifique os logs do Railway para ver se há erros
2. Verifique se o MongoDB está acessível
3. Verifique se o serviço não está em "Sleep mode"

#### Erro: "Email ou senha incorretos"

**Causa:** Credenciais incorretas ou usuário não existe no banco
**Solução:**

1. Verifique se executou o seed: `npm run seed` no backend
2. Use as credenciais corretas:
   - Email: `caiocralcantara@gmail.com` ou `viviansarodrigues@gmail.com`
   - Senha: `Senha123`

#### Erro: CORS

**Causa:** Backend não está permitindo a origem do frontend
**Solução:**

1. O CORS agora está configurado para aceitar todas as origens (temporariamente para debug)
2. Verifique os logs do Railway para ver se há avisos de CORS

## 📝 Checklist Rápido

- [ ] Backend está rodando no Railway (status "Active")
- [ ] Health check funciona: `https://sua-url/api/health`
- [ ] `NEXT_PUBLIC_API_URL` está configurada na Vercel
- [ ] URL não tem barra final
- [ ] Seed foi executado (`npm run seed`)
- [ ] Logs do Railway mostram que o servidor iniciou corretamente
- [ ] Console do navegador mostra as tentativas de conexão

## 🆘 Se Nada Funcionar

1. **Limpar cache do navegador** (Ctrl+Shift+Delete)
2. **Fazer novo deploy no Railway** (clicar em "Redeploy")
3. **Fazer novo deploy na Vercel** (fazer um commit vazio: `git commit --allow-empty -m "redeploy" && git push`)
4. **Verificar se o domínio do Railway está correto** (pode ter mudado)
5. **Testar localmente** para isolar se é problema de deploy ou código

## 📞 Informações para Debug

Quando reportar um erro, inclua:

1. Mensagem de erro exata (do navegador)
2. Logs do console do navegador (F12 → Console)
3. Logs do Railway (últimas 50 linhas)
4. URL do backend que está sendo usada
5. Status do serviço no Railway

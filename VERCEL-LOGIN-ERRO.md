# Como Resolver Erro "Failed to fetch" no Login

## 🔍 Diagnóstico

O erro "Failed to fetch" geralmente acontece quando o frontend não consegue se conectar ao backend. Siga estes passos:

### 1. Verificar URL da API na Vercel

**IMPORTANTE:** A variável `NEXT_PUBLIC_API_URL` precisa estar configurada na Vercel!

1. Acesse o painel da Vercel: https://vercel.com
2. Vá no seu projeto `Agenda_Alcantara`
3. Clique em **Settings** → **Environment Variables**
4. Verifique se existe `NEXT_PUBLIC_API_URL`
5. O valor deve ser a URL do seu backend no Railway, por exemplo:
   ```
   https://agenda-alcantara-backend-production.up.railway.app
   ```
6. **Importante:** Não inclua barra final (`/`) na URL
7. Salve e faça um novo deploy

### 2. Verificar se o Backend está Rodando

1. Acesse o painel do Railway: https://railway.app
2. Verifique se o serviço está **Running** (não crashed)
3. Teste o endpoint de health:
   ```
   https://sua-url-railway.railway.app/api/health
   ```
   Deve retornar: `{"ok":true,"timestamp":"..."}`

### 3. Verificar CORS no Backend

No Railway, vá em **Settings** → **Variables** e verifique:

```
CORS_ORIGIN=https://agenda-alcantara.vercel.app
```

**IMPORTANTE:** Substitua pela URL real do seu frontend na Vercel!

### 4. Verificar Logs

**Na Vercel:**

- Vá em **Deployments** → clique no deploy mais recente
- Veja os logs do build
- Procure por erros

**No Railway:**

- Vá em **Deployments** → clique no deploy mais recente
- Veja os logs
- Procure por erros de conexão MongoDB

### 5. Testar no Console do Navegador

1. Abra a aplicação na Vercel
2. Abra o Console do navegador (F12)
3. Tente fazer login
4. Veja os logs no console:
   - `🔗 Tentando login em: ...` - mostra a URL usada
   - `📡 Resposta do servidor: ...` - mostra o status
   - `❌ Erro no login: ...` - mostra o erro detalhado

## ✅ Checklist de Configuração

### Vercel (Frontend)

- [ ] `NEXT_PUBLIC_API_URL` configurada com URL do Railway
- [ ] URL sem barra final (`/`)
- [ ] Deploy realizado após configurar a variável

### Railway (Backend)

- [ ] Serviço está rodando (não crashed)
- [ ] `MONGODB_URI` configurada
- [ ] `JWT_SECRET` configurado
- [ ] `CORS_ORIGIN` configurado com URL da Vercel
- [ ] Health check funcionando: `/api/health`

### MongoDB Atlas

- [ ] Network Access permite conexões do Railway (0.0.0.0/0)
- [ ] Usuários criados via seed

## 🐛 Erros Comuns

### "Failed to fetch"

**Causa:** Frontend não consegue conectar ao backend
**Solução:**

- Verifique `NEXT_PUBLIC_API_URL` na Vercel
- Verifique se o backend está rodando no Railway
- Verifique CORS no Railway

### "Email ou senha incorretos"

**Causa:** Credenciais erradas ou usuário não existe
**Solução:**

- Execute o seed no backend: `npm run seed`
- Use: `caiocralcantara@gmail.com` / `Senha123`

### "Servidor indisponível"

**Causa:** Backend crashed ou não está respondendo
**Solução:**

- Verifique logs do Railway
- Verifique se MongoDB está acessível
- Verifique variáveis de ambiente no Railway

## 📝 Exemplo de Configuração

### Vercel (Environment Variables)

```
NEXT_PUBLIC_API_URL=https://agenda-alcantara-backend-production.up.railway.app
```

### Railway (Environment Variables)

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=seu-segredo-aqui
PORT=5000
CORS_ORIGIN=https://agenda-alcantara.vercel.app
```

## 🔧 Debug

Se ainda não funcionar, abra o Console do navegador (F12) e verifique:

1. Qual URL está sendo usada (deve aparecer nos logs)
2. Qual erro está aparecendo
3. Se o backend está respondendo (teste manualmente a URL)

**Teste manual do backend:**

```bash
curl https://sua-url-railway.railway.app/api/health
```

Deve retornar: `{"ok":true,"timestamp":"..."}`

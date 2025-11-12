# Changelog

## [2024-11-12] - Migração para Vercel (API Routes)

### ✅ Mudanças Realizadas

#### Migração para Vercel

- Backend migrado para API Routes do Next.js (Serverless Functions)
- Frontend e backend agora rodam na mesma aplicação Next.js
- Removida dependência de servidor Express separado
- Tudo configurado para rodar na Vercel

#### Estrutura do Projeto

- API Routes criadas em `frontend/src/app/api/`
- Modelos MongoDB movidos para `frontend/src/models/`
- Lógica de conexão MongoDB em `frontend/src/lib/db.ts`
- Autenticação JWT em `frontend/src/lib/auth.ts`
- Seed automático executado no primeiro login

#### Configuração

- Variáveis de ambiente: `MONGODB_URI` e `JWT_SECRET`
- Removida necessidade de `NEXT_PUBLIC_API_URL` (usa rotas relativas)
- Removida necessidade de `CORS_ORIGIN` (mesmo domínio)
- Removida necessidade de `PORT` (gerenciado pela Vercel)

#### Documentação

- `VERCEL-SETUP.md` - Guia completo de deploy na Vercel
- `README.md` - Atualizado para refletir nova estrutura
- Removidas referências ao Railway e Render
- Atualizado `MONGODB-ATLAS-SETUP.md` para Vercel

### 🗑️ Arquivos Removidos

- `backend/` - Backend Express removido (não é mais necessário)
- `RAILWAY-SETUP.md` - Guia do Railway removido
- `railway.json` - Configuração do Railway removida
- `render.yaml` - Configuração do Render removida
- `CHECKLIST-DEPLOY.md` - Checklist antigo removido
- `CONFIGURACAO-DEPLOY.md` - Configuração antiga removida

### 📝 Arquivos Mantidos

- `README.md` - Documentação principal atualizada
- `MONGODB-ATLAS-SETUP.md` - Guia do MongoDB Atlas atualizado
- `VERCEL-SETUP.md` - Guia de deploy na Vercel
- `CHANGELOG.md` - Este arquivo

### 🔧 Configuração Necessária

- Arquivo `.env.local` no diretório `frontend` com `MONGODB_URI` e `JWT_SECRET`
- MongoDB Atlas configurado com cluster ativo
- Network Access configurado no MongoDB Atlas (0.0.0.0/0)
- Variáveis de ambiente configuradas na Vercel para deploy

### 🚀 Próximos Passos

1. Configurar MongoDB Atlas (se ainda não feito)
2. Configurar variáveis de ambiente no `.env.local` (desenvolvimento)
3. Configurar variáveis de ambiente na Vercel (produção)
4. Fazer deploy na Vercel
5. Testar a aplicação

---

## [2024-11-12] - Configuração MongoDB Atlas e Limpeza do Projeto

### ✅ Mudanças Realizadas

#### Configuração MongoDB Atlas

- Removida connection string hardcoded do código
- Configuração agora exige `MONGODB_URI` nas variáveis de ambiente
- Melhorias na conexão MongoDB com opções otimizadas
- Mensagens de erro mais descritivas
- Graceful shutdown implementado

#### Modelos de Dados

- Índices adicionados aos modelos para melhor performance
- Índices em `User.email` para buscas rápidas
- Índices em `Event.startDateTime`, `Event.endDateTime`, `Event.ownerId`
- Índices compostos para consultas por período e usuário
- Timestamps automáticos (createdAt, updatedAt) adicionados

#### Scripts e Ferramentas

- Script `validate:config` para validar configuração
- Script `test:connection` para testar conexão com MongoDB
- Arquivo `env.example` criado como referência

#### Documentação

- `MONGODB-ATLAS-SETUP.md` - Guia completo passo a passo
- `RAILWAY-SETUP.md` - Guia de configuração do Railway
- `README.md` - Atualizado com instruções sobre MongoDB Atlas
- Seção de troubleshooting atualizada

#### Limpeza do Projeto

- Removidos arquivos de diagnóstico temporários
- Removida documentação duplicada
- Removidos scripts não utilizados
- `.gitignore` atualizado e melhorado
- Build limpo e recompilado

### 🗑️ Arquivos Removidos

- `DIAGNOSTICO-LOGIN.md` - Diagnóstico temporário
- `FRONTEND-TS-ERROS.md` - Erros temporários
- `VERCEL-LOGIN-ERRO.md` - Erro temporário
- `RAILWAY-TROUBLESHOOTING.md` - Troubleshooting específico
- `README-deploy.md` - Documentação duplicada
- `DEPLOY-QUICK-START.md` - Documentação duplicada
- `backend/CONFIGURACAO-COMPLETA.md` - Documentação duplicada
- `backend/MONGODB-REQUIREMENTS.md` - Documentação duplicada
- `SETUP-COMPLETO.md` - Documentação duplicada
- `backend/src/scripts/test-mongo-simple.ts` - Script duplicado
- `backend/tsconfig.node.json` - Configuração não necessária

### 📝 Arquivos Mantidos

- `README.md` - Documentação principal
- `MONGODB-ATLAS-SETUP.md` - Guia completo do MongoDB Atlas
- `RAILWAY-SETUP.md` - Guia de configuração do Railway
- `backend/env.example` - Exemplo de configuração
- `railway.json` - Configuração do Railway
- `render.yaml` - Configuração do Render
- `backend/nixpacks.toml` - Configuração do Railway
- `.gitignore` - Atualizado e melhorado

### 🔧 Configuração Necessária

- Arquivo `.env` no diretório `backend` com `MONGODB_URI`
- MongoDB Atlas configurado com cluster ativo
- Network Access configurado no MongoDB Atlas
- Variáveis de ambiente configuradas no deploy

### 🚀 Próximos Passos

1. Configurar MongoDB Atlas (se ainda não feito)
2. Testar conexão: `npm run test:connection`
3. Validar configuração: `npm run validate:config`
4. Iniciar servidor: `npm run dev`
5. Fazer commit das mudanças
6. Fazer deploy (se aplicável)

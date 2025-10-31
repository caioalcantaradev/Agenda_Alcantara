# Família Alcantara (Frontend Only)

Aplicativo web de agenda compartilhada usando apenas frontend (Next.js) integrado diretamente ao Google Calendar. Você e sua esposa fazem login com suas contas Google e usam a mesma agenda compartilhada.

## 🚀 Tecnologias

- **Next.js 14** (React)
- **TypeScript**
- **TailwindCSS**
- **date-fns**
- **Google Identity Services** (OAuth 2.0 no navegador)
- **Google Calendar API** (chamada direta do client)

## 📋 Pré-requisitos

- Node.js (18 ou superior)
- Conta Google com acesso ao Google Calendar
- Projeto no Google Cloud com a Calendar API habilitada

## 🔧 Configuração do Google Cloud

1) Crie/seleciona um projeto em `Google Cloud Console`
2) Habilite a API: Google Calendar API
3) Crie um OAuth 2.0 Client ID (Application type: Web application)
   - Authorized JavaScript origins (exemplos):
     - `http://localhost:3000`
     - `https://seu-dominio.com`
   - Não é necessário Redirect URI neste fluxo baseado em token do Google Identity Services
4) Configure a OAuth consent screen e adicione os usuários de teste (você e sua esposa)
5) Copie o Client ID

## 📅 Agenda compartilhada no Google Calendar

Você pode:
- Usar a agenda principal (`primary`) de cada usuário, ou
- Criar uma agenda compartilhada específica e colocar o ID desta agenda no `.env`.

Passos para agenda compartilhada:
1. Em `https://calendar.google.com`, crie uma nova agenda (ex.: "Família Alcantara")
2. Compartilhe com os dois e-mails (permissão "Fazer alterações nos eventos")
3. Copie o ID da agenda nas configurações da agenda

## 🛠️ Instalação e execução (somente frontend)

1) Clone o repositório

```bash
git clone https://github.com/caioalcantaradev/Agenda_Alcantara.git
cd Agenda_Alcantara/frontend
npm install
```

2) Crie o arquivo `frontend/.env.local` (baseado em `env.local.example`)

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_google_client_id
# Use "primary" ou o ID da agenda compartilhada
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=primary
```

3) Rode o app

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## 📱 Como usar

1. Clique em "Entrar com Google" e autorize os escopos solicitados
2. A agenda carregará os eventos do calendário configurado
3. Crie, edite e exclua eventos diretamente do app
4. Todos os eventos aparecerão para os usuários com acesso à agenda

## 🔐 Escopos e segurança

- O app usa Google Identity Services no navegador e solicita os escopos:
  - `openid email profile`
  - `https://www.googleapis.com/auth/calendar.events`
- Os tokens ficam apenas no browser do usuário; não há backend ou banco de dados.

## 🚀 Deploy

- Em provedores como Vercel, configure as variáveis de ambiente do projeto:
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
  - `NEXT_PUBLIC_GOOGLE_CALENDAR_ID`
- Adicione o domínio de produção em "Authorized JavaScript origins" no Google Cloud.

## 📝 Funcionalidades

- ✅ Login com Google (sem backend)
- ✅ Visualização mensal, semanal e diária
- ✅ Criar, editar e excluir eventos
- ✅ Modal de detalhes do evento
- ✅ Modo claro/escuro
- ✅ Feriados brasileiros destacados
- ✅ Detecção de conflitos de horário

## 🐛 Solução de Problemas

- "A autenticação não abre/funciona":
  - Verifique `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
  - Confirme que o domínio está em Authorized JavaScript origins
- "Eventos não carregam":
  - Verifique se a Calendar API está habilitada
  - Confirme `NEXT_PUBLIC_GOOGLE_CALENDAR_ID` (use `primary` ou o ID correto)
  - Garanta que a agenda está compartilhada com a conta logada

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.


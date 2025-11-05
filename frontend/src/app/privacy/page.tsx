export const metadata = {
  title: "Política de Privacidade | Agenda Alcantara",
  description:
    "Política de Privacidade do aplicativo Agenda Alcantara: como coletamos, usamos e protegemos seus dados ao integrar com o Google Calendar.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Política de Privacidade
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="space-y-6 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-xl font-semibold mb-2">Visão geral</h2>
            <p>
              O aplicativo Agenda Alcantara é um projeto de agenda compartilhada que
              integra diretamente com o Google Calendar. O aplicativo funciona 100%
              no navegador do usuário (sem backend próprio) e solicita permissão
              para ler e gerenciar eventos no calendário escolhido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Dados coletados</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Informações básicas da conta Google (nome, e-mail e foto de perfil)
                via Google Identity Services (escopos: <code>openid</code>, <code>email</code>, <code>profile</code>).
              </li>
              <li>
                Eventos do Google Calendar por meio do escopo
                <code> https://www.googleapis.com/auth/calendar.events</code>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Como usamos seus dados</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Exibir eventos do calendário selecionado.</li>
              <li>Criar, editar e excluir eventos a seu pedido.</li>
              <li>Identificar o usuário logado para a experiência no app.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Armazenamento e retenção</h2>
            <p>
              Os tokens de acesso do Google são mantidos apenas no seu navegador
              (armazenamento local) e usados para se comunicar diretamente com a
              Google Calendar API. O aplicativo não possui servidor próprio e não
              armazena seus dados em bancos de dados externos. Os eventos residem
              exclusivamente no Google Calendar vinculado à sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Compartilhamento de dados</h2>
            <p>
              Não vendemos nem compartilhamos seus dados com terceiros. O acesso a
              dados ocorre somente entre o seu navegador e os serviços do Google,
              conforme as permissões concedidas por você.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Segurança</h2>
            <p>
              Adotamos as melhores práticas do Google Identity Services para
              autenticação. Recomendamos que você mantenha sua conta Google segura
              (senha forte e autenticação em duas etapas) e revogue o acesso do
              aplicativo nas configurações de segurança do Google se não quiser
              mais utilizá-lo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Seus direitos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Revogar o acesso do app à sua conta Google a qualquer momento.</li>
              <li>Gerenciar e excluir eventos diretamente no Google Calendar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Revogação de acesso</h2>
            <p>
              Você pode revogar o acesso do aplicativo acessando
              {" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                https://myaccount.google.com/permissions
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Contato</h2>
            <p>
              Para questões sobre esta política, entre em contato pelo e-mail
              {" "}
              <a
                href="mailto:seu-email@exemplo.com"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                seu-email@exemplo.com
              </a>
              . (Substitua este e-mail pelo seu antes de publicar.)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Mudanças materiais
              serão publicadas nesta página com a data de atualização.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}



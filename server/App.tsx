import { Switch, Route, Redirect } from "wouter";
import { LoginPage } from "./pages/Login";
import { UserManagementPage } from "./pages/UserManagement";
import { Toaster } from "@/components/ui/toaster";

/**
 * Um componente de layout simples para rotas autenticadas.
 * Em uma aplicação real, isso conteria a barra lateral, cabeçalho, etc.
 */
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Exemplo: <Sidebar /> */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export function App() {
  // Para este exemplo estático, vamos assumir que o usuário está "logado".
  // Em uma aplicação real, este valor viria de um contexto de autenticação.
  const isAuthenticated = true;

  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        {/* Rotas Autenticadas */}
        <Route path="/users">
          {isAuthenticated ? (
            <AppLayout>
              <UserManagementPage />
            </AppLayout>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        {/* Rota padrão: redireciona para a página de usuários */}
        <Route>
          <Redirect to="/users" />
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}
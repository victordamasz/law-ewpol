import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ClientManagement } from "@/components/ClientManagement";
import { CalendarView } from "@/components/CalendarView";
import { KanbanBoard } from "@/components/KanbanBoard";
import { ProcessManagement } from "@/components/ProcessManagement";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { FinancialManagement } from "@/components/FinancialManagement";
import { FileManager } from "@/components/FileManager";
import { Settings } from "@/components/Settings";
import { Login } from "@/components/Login";
import { UserModule } from "@/components/UserModule";
import { ClientCreatePage } from "@/pages/ClientCreatePage";
import { ClientEditPage } from "@/pages/ClientEditPage";
import { ClientViewPage } from "@/pages/ClientViewPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardOverview} />
      <Route path="/login" component={Login} />
      
      {/* Client routes */}
      <Route path="/clients" component={ClientManagement} />
      <Route path="/clients/create" component={ClientCreatePage} />
      <Route path="/clients/:id/edit" component={ClientEditPage} />
      <Route path="/clients/:id/view" component={ClientViewPage} />
      
      {/* Legacy route for backwards compatibility */}
      <Route path="/clientes" component={ClientManagement} />
      
      <Route path="/agenda" component={CalendarView} />
      <Route path="/tarefas" component={KanbanBoard} />
      <Route path="/processos" component={ProcessManagement} />
      <Route path="/audiencias" component={ProcessManagement} />
      <Route path="/inss" component={ProcessManagement} />
      <Route path="/casos" component={ProcessManagement} />
      <Route path="/documentos" component={DocumentGenerator} />
      <Route path="/financeiro" component={FinancialManagement} />
      <Route path="/arquivos" component={FileManager} />
      <Route path="/usuarios" component={UserModule} />
      <Route path="/configuracoes" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Custom sidebar width for law firm dashboard
  const sidebarStyle = {
    "--sidebar-width": "20rem",       // 320px for better content organization
    "--sidebar-width-icon": "4rem",   // default icon width
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={sidebarStyle}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <TopBar />
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

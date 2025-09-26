import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ClientManagement } from "@/components/ClientManagement";
import { CalendarView } from "@/components/CalendarView";
import { KanbanBoard } from "@/components/KanbanBoard";
import { ProcessManagement } from "@/components/ProcessManagement";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { FinancialManagement } from "@/components/FinancialManagement";
import { FileManager } from "@/components/FileManager";
import { Settings } from "@/components/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardOverview} />
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
      <Route path="/usuarios" component={Settings} />
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
              <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </header>
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

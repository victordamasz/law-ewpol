import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Scale,
  Gavel,
  BookOpen,
  FolderOpen,
  ClipboardList,
  Receipt,
  Bell,
  Archive
} from "lucide-react";

export function DashboardOverview() {
  // Todo: remove mock functionality
  const mockStats = {
    totalClients: 147,
    activeProcesses: 89, 
    todayHearings: 5,
    monthlyRevenue: 85420.50,
    pendingTasks: 23,
    completedTasks: 156,
    pendingPublications: 12,
    inssRequests: 34,
    activeContracts: 28,
    recentDocuments: 15,
    overdueTasks: 8,
    totalDocuments: 342
  };

  const recentActivities = [
    { id: 1, type: "process", title: "Processo 1234567-89.2024.8.26.0100", status: "updated", time: "2 horas atrás" },
    { id: 2, type: "hearing", title: "Audiência - Silva vs. Santos", status: "scheduled", time: "4 horas atrás" },
    { id: 3, type: "client", title: "Novo cliente: Maria Oliveira", status: "added", time: "6 horas atrás" },
    { id: 4, type: "document", title: "Contrato de honorários gerado", status: "completed", time: "1 dia atrás" }
  ];

  const upcomingHearings = [
    { id: 1, case: "Silva vs. Santos", court: "1ª Vara Cível", time: "14:30", date: "Hoje" },
    { id: 2, case: "Oliveira & Co.", court: "2ª Vara Trabalhista", time: "09:00", date: "Amanhã" },
    { id: 3, case: "Costa Imóveis", court: "3ª Vara Cível", time: "16:00", date: "15/12" }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do escritório</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-export-report">
            <FileText className="h-4 w-4 mr-2" />
            Relatório
          </Button>
          <Button size="sm" data-testid="button-new-case">
            <Scale className="h-4 w-4 mr-2" />
            Novo Caso
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">+12%</span> desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeProcesses}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+8%</span> em andamento
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audiências Hoje</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.todayHearings}</div>
            <p className="text-xs text-muted-foreground">
              Próxima às <span className="font-semibold">14:30</span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockStats.monthlyRevenue.toLocaleString('pt-BR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">+15%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicações Pendentes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingPublications}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">3</span> com prazo hoje
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos INSS</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.inssRequests}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+5</span> novos este mês
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">R$ 45.2K</span> valor total
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">{mockStats.recentDocuments}</span> criados recentemente
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Vencidas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockStats.overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Requer atenção imediata
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">+3%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Task Progress */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Progresso das Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Concluídas</span>
              <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                {mockStats.completedTasks}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pendentes</span>
              <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                {mockStats.pendingTasks}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vencidas</span>
              <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                {mockStats.overdueTasks}
              </Badge>
            </div>
            <Progress 
              value={Math.round((mockStats.completedTasks / (mockStats.completedTasks + mockStats.pendingTasks)) * 100)} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground text-center">
              {Math.round((mockStats.completedTasks / (mockStats.completedTasks + mockStats.pendingTasks)) * 100)}% concluído
            </p>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="mt-1">
                    {activity.status === 'completed' && <CheckCircle className="h-4 w-4 text-chart-3" />}
                    {activity.status === 'updated' && <AlertTriangle className="h-4 w-4 text-chart-2" />}
                    {activity.status === 'scheduled' && <Calendar className="h-4 w-4 text-primary" />}
                    {activity.status === 'added' && <Users className="h-4 w-4 text-chart-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Hearings */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximas Audiências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingHearings.map((hearing) => (
                <div key={hearing.id} className="p-3 rounded-md border bg-card hover-elevate">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{hearing.case}</span>
                    <Badge variant="outline" className="text-xs">
                      {hearing.date}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{hearing.court}</p>
                  <p className="text-xs font-semibold text-primary">{hearing.time}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4" 
              data-testid="button-view-all-hearings"
              onClick={() => console.log('View all hearings clicked')}
            >
              Ver todas as audiências
            </Button>
          </CardContent>
        </Card>
        
        {/* Publications Status */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Publicações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Intimação - Processo 123456</p>
                  <p className="text-xs text-muted-foreground">Prazo: 15 dias - Vence hoje</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <CheckCircle className="h-4 w-4 text-chart-3 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Sentença Favorável - Silva vs Santos</p>
                  <p className="text-xs text-muted-foreground">Publicada ontem</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <Calendar className="h-4 w-4 text-primary mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Citação - ABC Ltda</p>
                  <p className="text-xs text-muted-foreground">Há 2 dias</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* INSS Requests Status */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Status INSS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Deferidos</span>
                  <span className="text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="text-right text-xs text-muted-foreground">
                  22 de 34 pedidos
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Em Análise</span>
                  <span className="text-muted-foreground">24%</span>
                </div>
                <Progress value={24} className="h-2" />
                <div className="text-right text-xs text-muted-foreground">
                  8 pedidos
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Indeferidos</span>
                  <span className="text-muted-foreground">11%</span>
                </div>
                <Progress value={11} className="h-2" />
                <div className="text-right text-xs text-muted-foreground">
                  4 pedidos
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
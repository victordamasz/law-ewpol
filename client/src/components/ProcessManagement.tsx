import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Plus, 
  Filter, 
  Scale, 
  Calendar, 
  FileText, 
  Eye,
  Edit,
  Clock,
  AlertTriangle,
  CheckCircle,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProcessManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  // Todo: remove mock functionality
  const mockProcesses = [
    {
      id: 1,
      number: "1234567-89.2024.8.26.0100",
      title: "Silva vs. Empresa ABC Ltda",
      client: "Maria Silva Santos",
      court: "1ª Vara Cível - São Paulo",
      type: "Trabalhista",
      status: "ativo",
      phase: "Instrução",
      priority: "alta",
      startDate: "2024-01-15",
      lastMovement: "2024-12-10",
      nextHearing: "2024-12-22",
      progress: 65,
      lawyer: "Dr. João Silva",
      value: "R$ 45.000,00"
    },
    {
      id: 2,
      number: "9876543-21.2024.8.26.0200",
      title: "Oliveira & Co vs. Construtora XYZ",
      client: "João Oliveira Costa",
      court: "2ª Vara Empresarial - São Paulo",
      type: "Civil",
      status: "ativo",
      phase: "Execução",
      priority: "media",
      startDate: "2024-02-10",
      lastMovement: "2024-12-08",
      nextHearing: null,
      progress: 85,
      lawyer: "Dra. Ana Costa",
      value: "R$ 120.000,00"
    },
    {
      id: 3,
      number: "5555444-33.2024.8.26.0300",
      title: "Ferreira vs. Banco Nacional",
      client: "Ana Paula Ferreira",
      court: "3ª Vara Cível - São Paulo",
      type: "Bancário",
      status: "suspenso",
      phase: "Recurso",
      priority: "baixa",
      startDate: "2023-11-20",
      lastMovement: "2024-11-30",
      nextHearing: null,
      progress: 40,
      lawyer: "Dr. Carlos Lima",
      value: "R$ 15.000,00"
    },
    {
      id: 4,
      number: "7777888-99.2024.8.26.0400",
      title: "Lima & Associados vs. Prefeitura",
      client: "Carlos Eduardo Lima",
      court: "Vara da Fazenda Pública - São Paulo",
      type: "Administrativo",
      status: "arquivado",
      phase: "Sentença",
      priority: "media",
      startDate: "2023-08-05",
      lastMovement: "2024-10-15",
      nextHearing: null,
      progress: 100,
      lawyer: "Dr. João Silva",
      value: "R$ 80.000,00"
    }
  ];

  const filteredProcesses = mockProcesses.filter(process => {
    const matchesSearch = process.number.includes(searchTerm) ||
                         process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || process.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-chart-3/10 text-chart-3";
      case "suspenso": return "bg-chart-2/10 text-chart-2";
      case "arquivado": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo": return <CheckCircle className="h-4 w-4" />;
      case "suspenso": return <AlertTriangle className="h-4 w-4" />;
      case "arquivado": return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-destructive/10 text-destructive";
      case "media": return "bg-chart-2/10 text-chart-2";
      case "baixa": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getProcessTypeColor = (type: string) => {
    switch (type) {
      case "Trabalhista": return "bg-chart-1/10 text-chart-1";
      case "Civil": return "bg-chart-2/10 text-chart-2";
      case "Bancário": return "bg-chart-3/10 text-chart-3";
      case "Administrativo": return "bg-primary/10 text-primary";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Processos</h1>
          <p className="text-muted-foreground">Gerencie processos judiciais e acompanhamentos</p>
        </div>
        <Button data-testid="button-add-process" onClick={() => console.log('Add process clicked')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Processo
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por número, título ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-processes"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-filter-processes">
              <Filter className="h-4 w-4 mr-2" />
              Status: {selectedFilter === "todos" ? "Todos" : selectedFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("ativo")}>
              Ativo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("suspenso")}>
              Suspenso
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("arquivado")}>
              Arquivado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Processes List */}
      <div className="space-y-4">
        {filteredProcesses.map((process) => (
          <Card key={process.id} className="hover-elevate" data-testid={`card-process-${process.id}`}>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg truncate">{process.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    Processo: {process.number}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(process.status)}>
                    {getStatusIcon(process.status)}
                    <span className="ml-1 capitalize">{process.status}</span>
                  </Badge>
                  <Badge className={getPriorityColor(process.priority)}>
                    Prioridade {process.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{process.client}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tribunal</p>
                  <span className="text-sm">{process.court}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tipo</p>
                  <Badge variant="outline" className={getProcessTypeColor(process.type)}>
                    {process.type}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Advogado</p>
                  <span className="text-sm font-medium">{process.lawyer}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Fase Processual</p>
                  <span className="text-sm font-medium">{process.phase}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Valor da Causa</p>
                  <span className="text-sm font-semibold text-primary">{process.value}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Progresso</p>
                  <div className="flex items-center gap-2">
                    <Progress value={process.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium">{process.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Início</p>
                    <p className="font-medium">{formatDate(process.startDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Último movimento</p>
                    <p className="font-medium">{formatDate(process.lastMovement)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Próxima audiência</p>
                    <p className="font-medium">
                      {process.nextHearing ? formatDate(process.nextHearing) : "Não agendada"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button 
                  variant="default" 
                  size="sm"
                  data-testid={`button-view-process-${process.id}`}
                  onClick={() => console.log(`View process ${process.id}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-edit-process-${process.id}`}
                  onClick={() => console.log(`Edit process ${process.id}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-movements-process-${process.id}`}
                  onClick={() => console.log(`View movements ${process.id}`)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Movimentações
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-schedule-hearing-${process.id}`}
                  onClick={() => console.log(`Schedule hearing ${process.id}`)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Audiência
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProcesses.length === 0 && (
        <div className="text-center py-12">
          <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Nenhum processo encontrado</p>
          <Button 
            variant="outline" 
            onClick={() => console.log('Clear search clicked')}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
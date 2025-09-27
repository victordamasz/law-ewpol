import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Pagination } from "@/components/Pagination";
import { 
  Search, 
  Plus, 
  Edit,
  Eye,
  Filter,
  FileText,
  MoreHorizontal,
  Scale,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Grid,
  List
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface Process {
  id: string;
  processNumber: string;
  processType: string;
  court: string;
  subject: string;
  status: string;
  clientName: string;
  startDate: string;
  value?: number;
  responsibleLawyer: string;
  phase: string;
  priority: string;
  lastMovement: string;
  nextHearing?: string;
  progress: number;
}

export function ProcessManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProcess, setNewProcess] = useState({
    processNumber: "",
    processType: "",
    court: "",
    subject: "",
    clientId: "",
    value: "",
    description: ""
  });

  // Dados fictícios dos processos
  const mockProcesses: Process[] = [
    {
      id: "1",
      processNumber: "1001234-56.2024.8.26.0100",
      processType: "Cível",
      court: "1ª Vara Cível Central - São Paulo",
      subject: "Indenização por Danos Morais",
      status: "ativo",
      clientName: "Maria Silva Santos",
      startDate: "2024-01-15",
      value: 50000,
      responsibleLawyer: "Dr. João Silva",
      phase: "Instrução",
      priority: "alta",
      lastMovement: "2024-12-10",
      nextHearing: "2024-12-22",
      progress: 65
    },
    {
      id: "2", 
      processNumber: "2002345-67.2024.5.02.0001",
      processType: "Trabalhista",
      court: "3ª Vara do Trabalho - São Paulo",
      subject: "Rescisão Indireta",
      status: "ativo",
      clientName: "Carlos Eduardo Lima",
      startDate: "2024-02-20",
      value: 75000,
      responsibleLawyer: "Dra. Ana Costa",
      phase: "Execução",
      priority: "media",
      lastMovement: "2024-12-08",
      progress: 85
    },
    {
      id: "3",
      processNumber: "3003456-78.2024.8.26.0224",
      processType: "Família",
      court: "2ª Vara de Família - Guarulhos",
      subject: "Divórcio Consensual",
      status: "concluido",
      clientName: "Ana Paula Ferreira",
      startDate: "2024-03-10",
      value: 8000,
      responsibleLawyer: "Dr. João Silva",
      phase: "Sentença",
      priority: "baixa",
      lastMovement: "2024-11-30",
      progress: 100
    },
    {
      id: "4",
      processNumber: "4004567-89.2024.4.03.6100",
      processType: "Criminal",
      court: "1ª Vara Criminal Federal - São Paulo",
      subject: "Defesa em Processo Criminal",
      status: "suspenso",
      clientName: "Roberto Santos",
      startDate: "2024-01-05",
      value: 120000,
      responsibleLawyer: "Dr. Pedro Oliveira",
      phase: "Recurso",
      priority: "urgente",
      lastMovement: "2024-10-15",
      progress: 40
    }
  ];

  const columns: ColumnDef<Process>[] = [
    {
      accessorKey: "processNumber",
      header: "Número do Processo",
      cell: ({ row }) => (
        <div className="font-mono text-sm">
          {row.original.processNumber}
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Assunto",
      cell: ({ row }) => (
        <div className="max-w-40 truncate">
          {row.original.subject}
        </div>
      ),
    },
    {
      accessorKey: "processType",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.processType}
        </Badge>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Cliente",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={getStatusColor(row.original.status)}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {row.original.value ? 
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(row.original.value) : '-'
          }
        </div>
      ),
    },
    {
      accessorKey: "responsibleLawyer",
      header: "Responsável",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/processes/${row.original.id}/view`}>
            <Button variant="outline" size="sm" data-testid={`button-view-process-${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/processes/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-process-${row.original.id}`}>
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </DropdownMenuItem>
              <DropdownMenuItem>
                Movimentações
              </DropdownMenuItem>
              <DropdownMenuItem>
                Audiências
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredProcesses = mockProcesses.filter(process => {
    const matchesSearch = process.processNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || process.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProcesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProcesses = filteredProcesses.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-chart-3/10 text-chart-3";
      case "concluido": return "bg-chart-1/10 text-chart-1";
      case "suspenso": return "bg-chart-5/10 text-chart-5";
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
      case "urgente": return "bg-destructive/10 text-destructive";
      case "alta": return "bg-orange-100 text-orange-800";
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
      case "Cível": return "bg-chart-2/10 text-chart-2";
      case "Família": return "bg-chart-3/10 text-chart-3";
      case "Criminal": return "bg-primary/10 text-primary";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const handleNewProcess = () => {
    toast({
      title: "Processo criado!",
      description: `Processo ${newProcess.processNumber} foi criado com sucesso.`,
    });
    setShowNewModal(false);
    setNewProcess({
      processNumber: "",
      processType: "",
      court: "",
      subject: "",
      clientId: "",
      value: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Processos</h1>
          <p className="text-muted-foreground">Gerencie processos judiciais e acompanhe andamentos</p>
        </div>
        <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-process">
              <Plus className="h-4 w-4 mr-2" />
              Novo Processo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Processo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="processNumber">Número do Processo</Label>
                <Input
                  id="processNumber"
                  value={newProcess.processNumber}
                  onChange={(e) => setNewProcess({...newProcess, processNumber: e.target.value})}
                  placeholder="0000000-00.0000.0.00.0000"
                  data-testid="input-process-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processType">Tipo</Label>
                <Select onValueChange={(value) => setNewProcess({...newProcess, processType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="civel">Cível</SelectItem>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="criminal">Criminal</SelectItem>
                    <SelectItem value="familia">Família</SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Vara/Tribunal</Label>
                <Input
                  id="court"
                  value={newProcess.court}
                  onChange={(e) => setNewProcess({...newProcess, court: e.target.value})}
                  placeholder="Digite a vara ou tribunal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  value={newProcess.subject}
                  onChange={(e) => setNewProcess({...newProcess, subject: e.target.value})}
                  placeholder="Assunto do processo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor da Causa</Label>
                <Input
                  id="value"
                  value={newProcess.value}
                  onChange={(e) => setNewProcess({...newProcess, value: e.target.value})}
                  placeholder="R$ 0,00"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newProcess.description}
                  onChange={(e) => setNewProcess({...newProcess, description: e.target.value})}
                  placeholder="Descrição adicional do processo"
                  className="min-h-20"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNewProcess} data-testid="button-save-process">
                  Salvar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por número, assunto ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-processes"
          />
        </div>
        
        <div className="flex items-center gap-2">
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
              <DropdownMenuItem onClick={() => setSelectedFilter("concluido")}>
                Concluído
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("suspenso")}>
                Suspenso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("arquivado")}>
                Arquivado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              data-testid="button-grid-view"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              data-testid="button-list-view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Processes Display */}
      {viewMode === "list" ? (
        <DataTable
          columns={columns}
          data={filteredProcesses}
          searchKey="processNumber"
          searchPlaceholder="Pesquisar processos..."
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedProcesses.map((process) => (
              <Card key={process.id} className="hover-elevate" data-testid={`card-process-${process.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg truncate">{process.subject}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        Processo: {process.processNumber}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Cliente</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{process.clientName}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Tribunal</p>
                      <span className="text-sm">{process.court}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Tipo</p>
                      <Badge variant="outline" className={getProcessTypeColor(process.processType)}>
                        {process.processType}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Advogado</p>
                      <span className="text-sm font-medium">{process.responsibleLawyer}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Fase Processual</p>
                      <span className="text-sm font-medium">{process.phase}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Valor da Causa</p>
                      <span className="text-sm font-semibold text-primary">
                        {process.value ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(process.value) : '-'}
                      </span>
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
                      <Calendar className="h-4 w-4" />
                      <div>
                        <p className="text-xs">Próxima audiência</p>
                        <p className="font-medium">
                          {process.nextHearing ? formatDate(process.nextHearing) : "Não agendada"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                    <Link href={`/processes/${process.id}/view`}>
                      <Button variant="outline" size="sm" data-testid={`button-view-process-${process.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/processes/${process.id}/edit`}>
                      <Button variant="outline" size="sm" data-testid={`button-edit-process-${process.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Documentos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Movimentações
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Audiências
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination for Grid View */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProcesses.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {filteredProcesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum processo encontrado</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("todos");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { 
  Search, 
  Plus, 
  Edit,
  Eye,
  Filter,
  FileText,
  MoreHorizontal
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
}

export function ProcessManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
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
      responsibleLawyer: "Dr. João Silva"
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
      responsibleLawyer: "Dra. Ana Costa"
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
      responsibleLawyer: "Dr. João Silva"
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
      responsibleLawyer: "Dr. Pedro Oliveira"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-chart-3/10 text-chart-3";
      case "concluido": return "bg-chart-1/10 text-chart-1";
      case "suspenso": return "bg-chart-5/10 text-chart-5";
      case "arquivado": return "bg-muted text-muted-foreground";
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-filter-processes">
              <Filter className="h-4 w-4 mr-2" />
              {selectedFilter === "todos" ? "Todos" : selectedFilter}
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
      </div>

      {/* Processes Table */}
      <DataTable
        columns={columns}
        data={filteredProcesses}
        searchKey="processNumber"
        searchPlaceholder="Pesquisar processos..."
      />

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
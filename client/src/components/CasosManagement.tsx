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
  MoreHorizontal,
  Briefcase
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

interface Caso {
  id: string;
  caseNumber: string;
  title: string;
  caseType: string;
  status: string;
  priority: string;
  clientName: string;
  responsibleLawyer: string;
  createdAt: string;
  description: string;
}

export function CasosManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCaso, setNewCaso] = useState({
    caseNumber: "",
    title: "",
    caseType: "",
    priority: "media",
    clientId: "",
    description: ""
  });

  // Dados fictícios dos casos
  const mockCasos: Caso[] = [
    {
      id: "1",
      caseNumber: "CASO-2024-001",
      title: "Consultoria Empresarial - Fusão de Empresas",
      caseType: "Empresarial",
      status: "em_andamento",
      priority: "alta",
      clientName: "Maria Silva Santos",
      responsibleLawyer: "Dr. João Silva",
      createdAt: "2024-01-15",
      description: "Consultoria jurídica para processo de fusão entre duas empresas do setor tecnológico"
    },
    {
      id: "2",
      caseNumber: "CASO-2024-002", 
      title: "Análise Contratual - Acordo de Fornecimento",
      caseType: "Contratual",
      status: "aberto",
      priority: "media",
      clientName: "Carlos Eduardo Lima",
      responsibleLawyer: "Dra. Ana Costa",
      createdAt: "2024-02-20",
      description: "Revisão e análise de contrato de fornecimento de matérias-primas"
    },
    {
      id: "3",
      caseNumber: "CASO-2024-003",
      title: "Questão Trabalhista - Demissão por Justa Causa",
      caseType: "Trabalhista",
      status: "concluido",
      priority: "baixa",
      clientName: "Ana Paula Ferreira",
      responsibleLawyer: "Dr. João Silva",
      createdAt: "2024-03-10",
      description: "Consultoria sobre procedimentos para demissão por justa causa"
    },
    {
      id: "4",
      caseNumber: "CASO-2024-004",
      title: "Investigação Criminal - Fraude Corporativa",
      caseType: "Criminal",
      status: "arquivado",
      priority: "urgente",
      clientName: "Roberto Santos",
      responsibleLawyer: "Dr. Pedro Oliveira", 
      createdAt: "2024-01-05",
      description: "Investigação interna sobre suspeita de fraude financeira"
    }
  ];

  const columns: ColumnDef<Caso>[] = [
    {
      accessorKey: "caseNumber",
      header: "Número do Caso",
      cell: ({ row }) => (
        <div className="font-mono text-sm">
          {row.original.caseNumber}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div className="max-w-48 truncate font-medium">
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: "caseType",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.caseType}
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
          {getStatusLabel(row.original.status)}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => (
        <Badge className={getPriorityColor(row.original.priority)}>
          {row.original.priority}
        </Badge>
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
          <Link href={`/casos/${row.original.id}/view`}>
            <Button variant="outline" size="sm" data-testid={`button-view-caso-${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/casos/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-caso-${row.original.id}`}>
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
                Tarefas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredCasos = mockCasos.filter(caso => {
    const matchesSearch = caso.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.caseType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || caso.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberto": return "bg-blue-100 text-blue-800";
      case "em_andamento": return "bg-yellow-100 text-yellow-800";
      case "concluido": return "bg-green-100 text-green-800";
      case "arquivado": return "bg-gray-100 text-gray-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "aberto": return "Aberto";
      case "em_andamento": return "Em Andamento";
      case "concluido": return "Concluído";
      case "arquivado": return "Arquivado";
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente": return "bg-red-100 text-red-800";
      case "alta": return "bg-orange-100 text-orange-800";
      case "media": return "bg-yellow-100 text-yellow-800";
      case "baixa": return "bg-green-100 text-green-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const handleNewCaso = () => {
    toast({
      title: "Caso criado!",
      description: `Caso ${newCaso.caseNumber} foi criado com sucesso.`,
    });
    setShowNewModal(false);
    setNewCaso({
      caseNumber: "",
      title: "",
      caseType: "",
      priority: "media",
      clientId: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-8 w-8" />
            Casos Jurídicos
          </h1>
          <p className="text-muted-foreground">Gerencie casos jurídicos e consultorias</p>
        </div>
        <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-caso">
              <Plus className="h-4 w-4 mr-2" />
              Novo Caso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Caso Jurídico</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">Número do Caso</Label>
                <Input
                  id="caseNumber"
                  value={newCaso.caseNumber}
                  onChange={(e) => setNewCaso({...newCaso, caseNumber: e.target.value})}
                  placeholder="CASO-2024-XXX"
                  data-testid="input-case-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Título do Caso</Label>
                <Input
                  id="title"
                  value={newCaso.title}
                  onChange={(e) => setNewCaso({...newCaso, title: e.target.value})}
                  placeholder="Título descritivo do caso"
                  data-testid="input-case-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caseType">Tipo de Caso</Label>
                <Select onValueChange={(value) => setNewCaso({...newCaso, caseType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empresarial">Empresarial</SelectItem>
                    <SelectItem value="contratual">Contratual</SelectItem>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="criminal">Criminal</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                    <SelectItem value="consultoria">Consultoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={newCaso.priority} onValueChange={(value) => setNewCaso({...newCaso, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientId">Cliente</Label>
                <Select onValueChange={(value) => setNewCaso({...newCaso, clientId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Maria Silva Santos</SelectItem>
                    <SelectItem value="2">João Oliveira Costa</SelectItem>
                    <SelectItem value="3">Ana Paula Ferreira</SelectItem>
                    <SelectItem value="4">Carlos Eduardo Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCaso.description}
                  onChange={(e) => setNewCaso({...newCaso, description: e.target.value})}
                  placeholder="Descrição detalhada do caso"
                  className="min-h-20"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNewCaso} data-testid="button-save-caso">
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
            placeholder="Pesquisar por número, título, cliente ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-casos"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-filter-casos">
              <Filter className="h-4 w-4 mr-2" />
              {selectedFilter === "todos" ? "Todos" : getStatusLabel(selectedFilter)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("aberto")}>
              Aberto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("em_andamento")}>
              Em Andamento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("concluido")}>
              Concluído
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("arquivado")}>
              Arquivado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Casos Table */}
      <DataTable
        columns={columns}
        data={filteredCasos}
        searchKey="caseNumber"
        searchPlaceholder="Pesquisar casos..."
      />

      {filteredCasos.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum caso jurídico encontrado</p>
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
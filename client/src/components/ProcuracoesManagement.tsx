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
  Download,
  Printer,
  UserCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface Procuracao {
  id: string;
  name: string;
  clientName: string;
  type: string;
  scope: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  processId?: string;
  expirationDate?: string;
}

export function ProcuracoesManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  // Dados fictícios das procurações
  const mockProcuracoes: Procuracao[] = [
    {
      id: "1",
      name: "Procuração Ad Judicia - Maria Silva Santos",
      clientName: "Maria Silva Santos",
      type: "Ad Judicia",
      scope: "Judicial",
      status: "ativa",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      author: "Dr. João Silva",
      processId: "1",
      expirationDate: "2025-01-15"
    },
    {
      id: "2",
      name: "Procuração Geral - Carlos Eduardo Lima",
      clientName: "Carlos Eduardo Lima", 
      type: "Geral",
      scope: "Geral",
      status: "ativa",
      createdAt: "2024-02-20",
      updatedAt: "2024-11-10",
      author: "Dra. Ana Costa",
      processId: "2",
      expirationDate: "2025-02-20"
    },
    {
      id: "3",
      name: "Procuração Específica - Ana Paula Ferreira",
      clientName: "Ana Paula Ferreira",
      type: "Específica",
      scope: "Divórcio",
      status: "revogada",
      createdAt: "2024-03-10",
      updatedAt: "2024-12-05",
      author: "Dr. João Silva",
      processId: "3"
    },
    {
      id: "4",
      name: "Procuração Ad Judicia - Roberto Santos",
      clientName: "Roberto Santos",
      type: "Ad Judicia",
      scope: "Criminal",
      status: "em_revisao",
      createdAt: "2024-01-05",
      updatedAt: "2024-12-01",
      author: "Dr. Pedro Oliveira",
      processId: "4",
      expirationDate: "2025-01-05"
    }
  ];

  const columns: ColumnDef<Procuracao>[] = [
    {
      accessorKey: "name",
      header: "Nome da Procuração",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.type}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Cliente",
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "scope",
      header: "Abrangência",
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
      accessorKey: "author",
      header: "Advogado",
    },
    {
      accessorKey: "expirationDate",
      header: "Vencimento",
      cell: ({ row }) => (
        <div>
          {row.original.expirationDate ? 
            new Date(row.original.expirationDate).toLocaleDateString('pt-BR') : 
            "Sem vencimento"
          }
        </div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleViewProcuracao(row.original)}
            data-testid={`button-view-procuracao-${row.original.id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/documents/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-procuracao-${row.original.id}`}>
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
              <DropdownMenuItem onClick={() => handleDownload(row.original.id)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePrint(row.original.id)}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRevoke(row.original.id)}>
                Revogar
              </DropdownMenuItem>
              <DropdownMenuItem>
                Ver Processo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredProcuracoes = mockProcuracoes.filter(procuracao => {
    const matchesSearch = procuracao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procuracao.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procuracao.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procuracao.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || procuracao.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativa": return "bg-green-100 text-green-800";
      case "revogada": return "bg-red-100 text-red-800";
      case "em_revisao": return "bg-yellow-100 text-yellow-800";
      case "vencida": return "bg-gray-100 text-gray-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativa": return "Ativa";
      case "revogada": return "Revogada";
      case "em_revisao": return "Em Revisão";
      case "vencida": return "Vencida";
      default: return status;
    }
  };

  const handleViewProcuracao = (procuracao: Procuracao) => {
    toast({
      title: "Visualizar procuração",
      description: `Abrindo procuração: ${procuracao.name}`,
    });
  };

  const handleDownload = (id: string) => {
    toast({
      title: "Download iniciado",
      description: "A procuração está sendo baixada.",
    });
  };

  const handlePrint = (id: string) => {
    toast({
      title: "Imprimindo procuração",
      description: "A procuração foi enviada para impressão.",
    });
  };

  const handleRevoke = (id: string) => {
    toast({
      title: "Procuração revogada",
      description: "A procuração foi revogada com sucesso.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UserCheck className="h-8 w-8" />
            Procurações
          </h1>
          <p className="text-muted-foreground">Gerencie procurações e poderes de representação</p>
        </div>
        <Link href="/documents/new">
          <Button data-testid="button-add-procuracao">
            <Plus className="h-4 w-4 mr-2" />
            Nova Procuração
          </Button>
        </Link>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, cliente, tipo ou advogado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-procuracoes"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-filter-procuracoes">
              <Filter className="h-4 w-4 mr-2" />
              {selectedFilter === "todos" ? "Todos" : getStatusLabel(selectedFilter)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("ativa")}>
              Ativa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("em_revisao")}>
              Em Revisão
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("revogada")}>
              Revogada
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("vencida")}>
              Vencida
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Procurações Table */}
      <DataTable
        columns={columns}
        data={filteredProcuracoes}
        searchKey="name"
        searchPlaceholder="Pesquisar procurações..."
      />

      {filteredProcuracoes.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma procuração encontrada</p>
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
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
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface ContratoHonorario {
  id: string;
  name: string;
  clientName: string;
  value: number;
  paymentType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  processId?: string;
}

export function ContratosHonorariosManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  // Dados fictícios dos contratos de honorários
  const mockContratos: ContratoHonorario[] = [
    {
      id: "1",
      name: "Contrato de Honorários - Maria Silva Santos",
      clientName: "Maria Silva Santos",
      value: 15000,
      paymentType: "Fixo",
      status: "ativo",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      author: "Dr. João Silva",
      processId: "1"
    },
    {
      id: "2",
      name: "Contrato de Honorários - Carlos Lima",
      clientName: "Carlos Eduardo Lima", 
      value: 25000,
      paymentType: "Êxito",
      status: "ativo",
      createdAt: "2024-02-20",
      updatedAt: "2024-11-10",
      author: "Dra. Ana Costa",
      processId: "2"
    },
    {
      id: "3",
      name: "Contrato de Honorários - Ana Ferreira",
      clientName: "Ana Paula Ferreira",
      value: 8000,
      paymentType: "Fixo",
      status: "concluido",
      createdAt: "2024-03-10",
      updatedAt: "2024-12-05",
      author: "Dr. João Silva",
      processId: "3"
    },
    {
      id: "4",
      name: "Contrato de Honorários - Roberto Santos",
      clientName: "Roberto Santos",
      value: 50000,
      paymentType: "Misto",
      status: "em_revisao",
      createdAt: "2024-01-05",
      updatedAt: "2024-12-01",
      author: "Dr. Pedro Oliveira",
      processId: "4"
    }
  ];

  const columns: ColumnDef<ContratoHonorario>[] = [
    {
      accessorKey: "name",
      header: "Nome do Contrato",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">
              Contrato de Honorários
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
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => (
        <div className="text-right font-medium text-primary">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(row.original.value)}
        </div>
      ),
    },
    {
      accessorKey: "paymentType",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.paymentType}
        </Badge>
      ),
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
      accessorKey: "updatedAt",
      header: "Última Atualização",
      cell: ({ row }) => (
        <div>{new Date(row.original.updatedAt).toLocaleDateString('pt-BR')}</div>
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
            onClick={() => handleViewContract(row.original)}
            data-testid={`button-view-contract-${row.original.id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/documents/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-contract-${row.original.id}`}>
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
              <DropdownMenuItem>
                Ver Processo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredContratos = mockContratos.filter(contrato => {
    const matchesSearch = contrato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || contrato.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-800";
      case "concluido": return "bg-blue-100 text-blue-800";
      case "em_revisao": return "bg-yellow-100 text-yellow-800";
      case "cancelado": return "bg-red-100 text-red-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo": return "Ativo";
      case "concluido": return "Concluído";
      case "em_revisao": return "Em Revisão";
      case "cancelado": return "Cancelado";
      default: return status;
    }
  };

  const handleViewContract = (contrato: ContratoHonorario) => {
    toast({
      title: "Visualizar contrato",
      description: `Abrindo contrato: ${contrato.name}`,
    });
  };

  const handleDownload = (id: string) => {
    toast({
      title: "Download iniciado",
      description: "O contrato está sendo baixado.",
    });
  };

  const handlePrint = (id: string) => {
    toast({
      title: "Imprimindo contrato",
      description: "O contrato foi enviado para impressão.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <DollarSign className="h-8 w-8" />
            Contratos de Honorários
          </h1>
          <p className="text-muted-foreground">Gerencie contratos de prestação de serviços advocatícios</p>
        </div>
        <Link href="/documents/new">
          <Button data-testid="button-add-contract">
            <Plus className="h-4 w-4 mr-2" />
            Novo Contrato
          </Button>
        </Link>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, cliente ou advogado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-contracts"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-filter-contracts">
              <Filter className="h-4 w-4 mr-2" />
              {selectedFilter === "todos" ? "Todos" : getStatusLabel(selectedFilter)}
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
            <DropdownMenuItem onClick={() => setSelectedFilter("em_revisao")}>
              Em Revisão
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedFilter("cancelado")}>
              Cancelado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Contratos Table */}
      <DataTable
        columns={columns}
        data={filteredContratos}
        searchKey="name"
        searchPlaceholder="Pesquisar contratos..."
      />

      {filteredContratos.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum contrato de honorários encontrado</p>
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
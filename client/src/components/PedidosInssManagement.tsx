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
  Shield,
  Calendar,
  Clock,
  User,
  Grid,
  List,
  CheckCircle,
  XCircle,
  AlertTriangle
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

interface PedidoInss {
  id: string;
  requestNumber: string;
  requestType: string;
  clientName: string;
  status: string;
  requestDate: string;
  responseDate?: string;
  value?: number;
  responsibleLawyer: string;
  description: string;
}

export function PedidosInssManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPedido, setNewPedido] = useState({
    requestNumber: "",
    requestType: "",
    clientId: "",
    value: "",
    description: ""
  });

  // Dados fictícios dos pedidos INSS
  const mockPedidos: PedidoInss[] = [
    {
      id: "1",
      requestNumber: "87654321098",
      requestType: "Auxílio-Doença",
      clientName: "Maria Silva Santos",
      status: "em_analise",
      requestDate: "2024-01-15",
      value: 1500,
      responsibleLawyer: "Dr. João Silva",
      description: "Pedido de auxílio-doença por lesão na coluna"
    },
    {
      id: "2",
      requestNumber: "98765432109", 
      requestType: "Aposentadoria por Tempo de Contribuição",
      clientName: "Carlos Eduardo Lima",
      status: "deferido",
      requestDate: "2024-02-20",
      responseDate: "2024-12-10",
      value: 2800,
      responsibleLawyer: "Dra. Ana Costa",
      description: "Aposentadoria por tempo de contribuição - 35 anos"
    },
    {
      id: "3",
      requestNumber: "11223344556",
      requestType: "Pensão por Morte",
      clientName: "Ana Paula Ferreira",
      status: "indeferido",
      requestDate: "2024-03-10",
      responseDate: "2024-11-25",
      responsibleLawyer: "Dr. João Silva",
      description: "Pensão por morte do cônjuge"
    },
    {
      id: "4",
      requestNumber: "55443322110",
      requestType: "Auxílio-Acidente",
      clientName: "Roberto Santos",
      status: "recurso",
      requestDate: "2024-01-05",
      value: 1200,
      responsibleLawyer: "Dr. Pedro Oliveira",
      description: "Auxílio-acidente por acidente de trabalho"
    }
  ];

  const columns: ColumnDef<PedidoInss>[] = [
    {
      accessorKey: "requestNumber",
      header: "Número do Pedido",
      cell: ({ row }) => (
        <div className="font-mono text-sm">
          {row.original.requestNumber}
        </div>
      ),
    },
    {
      accessorKey: "requestType",
      header: "Tipo de Benefício",
      cell: ({ row }) => (
        <div className="max-w-40 truncate">
          {row.original.requestType}
        </div>
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
      accessorKey: "requestDate",
      header: "Data do Pedido",
      cell: ({ row }) => (
        <div>{new Date(row.original.requestDate).toLocaleDateString('pt-BR')}</div>
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
          <Link href={`/pedidos-inss/${row.original.id}/view`}>
            <Button variant="outline" size="sm" data-testid={`button-view-pedido-${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/pedidos-inss/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-pedido-${row.original.id}`}>
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
                Perícias
              </DropdownMenuItem>
              <DropdownMenuItem>
                Recursos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredPedidos = mockPedidos.filter(pedido => {
    const matchesSearch = pedido.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || pedido.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPedidos = filteredPedidos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_analise": return "bg-blue-100 text-blue-800";
      case "deferido": return "bg-green-100 text-green-800";
      case "indeferido": return "bg-red-100 text-red-800";
      case "recurso": return "bg-yellow-100 text-yellow-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deferido": return <CheckCircle className="h-4 w-4" />;
      case "indeferido": return <XCircle className="h-4 w-4" />;
      case "recurso": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em_analise": return "Em Análise";
      case "deferido": return "Deferido";
      case "indeferido": return "Indeferido";
      case "recurso": return "Em Recurso";
      default: return status;
    }
  };

  const handleNewPedido = () => {
    toast({
      title: "Pedido INSS criado!",
      description: `Pedido ${newPedido.requestNumber} foi criado com sucesso.`,
    });
    setShowNewModal(false);
    setNewPedido({
      requestNumber: "",
      requestType: "",
      clientId: "",
      value: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Pedidos INSS
          </h1>
          <p className="text-muted-foreground">Gerencie pedidos de benefícios previdenciários</p>
        </div>
        <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-pedido">
              <Plus className="h-4 w-4 mr-2" />
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Pedido INSS</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requestNumber">Número do Pedido</Label>
                <Input
                  id="requestNumber"
                  value={newPedido.requestNumber}
                  onChange={(e) => setNewPedido({...newPedido, requestNumber: e.target.value})}
                  placeholder="00000000000"
                  data-testid="input-request-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestType">Tipo de Benefício</Label>
                <Select onValueChange={(value) => setNewPedido({...newPedido, requestType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auxilio_doenca">Auxílio-Doença</SelectItem>
                    <SelectItem value="aposentadoria_tempo">Aposentadoria por Tempo de Contribuição</SelectItem>
                    <SelectItem value="aposentadoria_idade">Aposentadoria por Idade</SelectItem>
                    <SelectItem value="aposentadoria_invalidez">Aposentadoria por Invalidez</SelectItem>
                    <SelectItem value="pensao_morte">Pensão por Morte</SelectItem>
                    <SelectItem value="auxilio_acidente">Auxílio-Acidente</SelectItem>
                    <SelectItem value="bpc">Benefício de Prestação Continuada (BPC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientId">Cliente</Label>
                <Select onValueChange={(value) => setNewPedido({...newPedido, clientId: value})}>
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
                <Label htmlFor="value">Valor Estimado</Label>
                <Input
                  id="value"
                  value={newPedido.value}
                  onChange={(e) => setNewPedido({...newPedido, value: e.target.value})}
                  placeholder="R$ 0,00"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newPedido.description}
                  onChange={(e) => setNewPedido({...newPedido, description: e.target.value})}
                  placeholder="Descrição do pedido de benefício"
                  className="min-h-20"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNewPedido} data-testid="button-save-pedido">
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
            placeholder="Pesquisar por número, tipo ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-pedidos"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="button-filter-pedidos">
                <Filter className="h-4 w-4 mr-2" />
                Status: {selectedFilter === "todos" ? "Todos" : getStatusLabel(selectedFilter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("em_analise")}>
                Em Análise
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("deferido")}>
                Deferido
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("indeferido")}>
                Indeferido
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("recurso")}>
                Em Recurso
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

      {/* Pedidos Display */}
      {viewMode === "list" ? (
        <DataTable
          columns={columns}
          data={filteredPedidos}
          searchKey="requestNumber"
          searchPlaceholder="Pesquisar pedidos..."
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedPedidos.map((pedido) => (
              <Card key={pedido.id} className="hover-elevate" data-testid={`card-pedido-${pedido.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg truncate">{pedido.requestType}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        Pedido: {pedido.requestNumber}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(pedido.status)}>
                        {getStatusIcon(pedido.status)}
                        <span className="ml-1">{getStatusLabel(pedido.status)}</span>
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
                        <span className="text-sm font-medium">{pedido.clientName}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Advogado Responsável</p>
                      <span className="text-sm font-medium">{pedido.responsibleLawyer}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Valor Estimado</p>
                      <span className="text-sm font-semibold text-primary">
                        {pedido.value ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(pedido.value) : '-'}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Data do Pedido</p>
                      <span className="text-sm">{formatDate(pedido.requestDate)}</span>
                    </div>
                  </div>

                  {pedido.responseDate && (
                    <div className="grid grid-cols-1 gap-4 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p className="text-xs">Data da Resposta</p>
                          <p className="font-medium">{formatDate(pedido.responseDate)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Descrição</p>
                    <p className="text-sm">{pedido.description}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                    <Link href={`/pedidos-inss/${pedido.id}/view`}>
                      <Button variant="outline" size="sm" data-testid={`button-view-pedido-${pedido.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/pedidos-inss/${pedido.id}/edit`}>
                      <Button variant="outline" size="sm" data-testid={`button-edit-pedido-${pedido.id}`}>
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
                          Perícias
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Recursos
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
            totalItems={filteredPedidos.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {filteredPedidos.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum pedido INSS encontrado</p>
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
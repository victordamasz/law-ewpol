import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/Pagination";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Edit,
  MoreHorizontal,
  Filter,
  Calendar,
  Grid,
  List,
  Eye,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  status: string;
  totalProcesses: number;
  lastContact: string;
}

export function ClientManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Definir colunas para a datatable
  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={row.original.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Telefone",
    },
    {
      accessorKey: "cpf",
      header: "CPF",
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
      accessorKey: "totalProcesses",
      header: "Processos",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.totalProcesses}
        </div>
      ),
    },
    {
      accessorKey: "lastContact",
      header: "Último Contato",
      cell: ({ row }) => (
        <div>{new Date(row.original.lastContact).toLocaleDateString('pt-BR')}</div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/clients/${row.original.id}/view`}>
            <Button variant="outline" size="sm" data-testid={`button-view-client-${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/clients/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-client-${row.original.id}`}>
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleDeleteClick(row.original)}
            data-testid={`button-delete-client-${row.original.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Todo: remove mock functionality
  const mockClients: Client[] = [
    {
      id: 1,
      name: "Maria Silva Santos",
      email: "maria.silva@email.com",
      phone: "(11) 99999-1234",
      cpf: "123.456.789-01",
      address: "Rua das Flores, 123 - São Paulo, SP",
      status: "ativo",
      totalProcesses: 3,
      lastContact: "2024-12-10"
    },
    {
      id: 2,
      name: "João Oliveira Costa",
      email: "joao.costa@email.com", 
      phone: "(11) 88888-5678",
      cpf: "987.654.321-09",
      address: "Av. Paulista, 1000 - São Paulo, SP",
      status: "ativo",
      totalProcesses: 2,
      lastContact: "2024-12-08"
    },
    {
      id: 3,
      name: "Ana Paula Ferreira",
      email: "ana.ferreira@email.com",
      phone: "(11) 77777-9999",
      cpf: "456.789.123-45",
      address: "Rua Augusta, 500 - São Paulo, SP", 
      status: "inativo",
      totalProcesses: 1,
      lastContact: "2024-11-20"
    },
    {
      id: 4,
      name: "Carlos Eduardo Lima",
      email: "carlos.lima@email.com",
      phone: "(11) 66666-3333",
      cpf: "789.123.456-78",
      address: "Rua Oscar Freire, 200 - São Paulo, SP",
      status: "ativo",
      totalProcesses: 4,
      lastContact: "2024-12-12"
    }
  ];

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.cpf.includes(searchTerm);
    
    const matchesFilter = selectedFilter === "todos" || client.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      toast({
        title: "Cliente excluído",
        description: `${clientToDelete.name} foi removido do sistema.`,
        variant: "destructive",
      });
      setShowDeleteModal(false);
      setClientToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-chart-3/10 text-chart-3";
      case "inativo": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie informações de clientes e contatos</p>
        </div>
        <Link href="/clients/create">
          <Button data-testid="button-add-client">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, email ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-clients"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="button-filter-clients">
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
              <DropdownMenuItem onClick={() => setSelectedFilter("inativo")}>
                Inativo
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
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              data-testid="button-table-view"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Clients Display */}
      {viewMode === "table" ? (
        <DataTable
          columns={columns}
          data={filteredClients}
          searchKey="name"
          searchPlaceholder="Pesquisar clientes por nome..."
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedClients.map((client) => (
            <Card key={client.id} className="hover-elevate" data-testid={`card-client-${client.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={client.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight truncate">{client.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate mt-1">{client.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate text-xs">{client.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Processos ativos</span>
                  <span className="font-semibold text-primary">{client.totalProcesses}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Último contato</span>
                  <span>{new Date(client.lastContact).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/clients/${client.id}/view`}>
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="flex-1"
                      data-testid={`button-view-client-${client.id}`}
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline"
                    data-testid={`button-contact-client-${client.id}`}
                    onClick={() => console.log(`Contact client ${client.id}`)}
                  >
                    Contatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedClients.map((client) => (
            <Card key={client.id} className="hover-elevate" data-testid={`card-client-${client.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={client.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{client.name}</h3>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{client.phone}</span>
                      </div>
                      <span>{client.totalProcesses} processos</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      data-testid={`button-view-client-${client.id}`}
                      onClick={() => console.log(`View client ${client.id} details`)}
                    >
                      Ver Detalhes
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log(`Edit client ${client.id}`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`View documents ${client.id}`)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Documentos
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Schedule meeting ${client.id}`)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredClients.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* Paginação para grid e list views */}
      {viewMode !== "table" && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredClients.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum cliente encontrado</p>
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

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && clientToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Confirmar Exclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Tem certeza que deseja excluir o cliente <strong>{clientToDelete.name}</strong>?
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Esta ação não pode ser desfeita. Todos os dados relacionados serão removidos.
              </p>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteModal(false)}
                  data-testid="button-cancel-delete"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDelete}
                  data-testid="button-confirm-delete"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
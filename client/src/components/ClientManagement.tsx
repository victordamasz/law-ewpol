import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  // Todo: remove mock functionality
  const mockClients = [
    {
      id: 1,
      name: "Maria Silva Santos",
      email: "maria.santos@email.com",
      phone: "(11) 99999-1234",
      cpf: "123.456.789-00",
      address: "Rua das Flores, 123, São Paulo, SP",
      status: "ativo",
      totalProcesses: 3,
      joinDate: "2023-01-15",
      lastContact: "2024-12-10"
    },
    {
      id: 2,
      name: "João Oliveira Costa",
      email: "joao.costa@email.com",
      phone: "(11) 88888-5678",
      cpf: "987.654.321-00",
      address: "Av. Paulista, 456, São Paulo, SP",
      status: "ativo",
      totalProcesses: 5,
      joinDate: "2023-03-22",
      lastContact: "2024-12-08"
    },
    {
      id: 3,
      name: "Ana Paula Ferreira",
      email: "ana.ferreira@email.com",
      phone: "(11) 77777-9012",
      cpf: "456.789.123-00",
      address: "Rua Augusta, 789, São Paulo, SP",
      status: "inativo",
      totalProcesses: 1,
      joinDate: "2022-08-10",
      lastContact: "2024-10-15"
    },
    {
      id: 4,
      name: "Carlos Eduardo Lima",
      email: "carlos.lima@email.com",
      phone: "(11) 66666-3456",
      cpf: "321.654.987-00",
      address: "Alameda Santos, 321, São Paulo, SP",
      status: "ativo",
      totalProcesses: 7,
      joinDate: "2023-06-05",
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
          <p className="text-muted-foreground">Gerencie seus clientes e histórico</p>
        </div>
        <Button data-testid="button-add-client" onClick={() => console.log('Add client clicked')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-filter-clients">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar: {selectedFilter === "todos" ? "Todos" : selectedFilter}
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
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover-elevate" data-testid={`card-client-${client.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={client.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{client.name}</h3>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </div>
                </div>
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
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{client.phone}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{client.address}</span>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Processos ativos</span>
                  <span className="font-semibold text-primary">{client.totalProcesses}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Último contato</span>
                  <span>{new Date(client.lastContact).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="default" 
                  className="flex-1"
                  data-testid={`button-view-client-${client.id}`}
                  onClick={() => console.log(`View client ${client.id} details`)}
                >
                  Ver Detalhes
                </Button>
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

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum cliente encontrado</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => console.log('Clear search clicked')}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
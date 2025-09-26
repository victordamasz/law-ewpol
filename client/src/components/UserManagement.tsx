import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck,
  UserX,
  Settings,
  User
} from "lucide-react";

// Dados mockados de usuários
const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@sistema.com",
    nomeCompleto: "João Administrador Silva",
    perfil: "administrador",
    active: true,
    ultimoLogin: "2024-01-20 09:30:00",
    cpf: "123.456.789-00",
    numeroOab: "123456",
    ufOab: "SP",
    whatsapp: "(11) 99999-9999",
    imgPerfil: null
  },
  {
    id: 2,
    username: "dr.santos",
    email: "santos@escritorio.com",
    nomeCompleto: "Maria dos Santos Oliveira",
    perfil: "advogado",
    active: true,
    ultimoLogin: "2024-01-20 08:15:00",
    cpf: "987.654.321-00",
    numeroOab: "654321",
    ufOab: "RJ",
    whatsapp: "(21) 88888-8888",
    imgPerfil: null
  },
  {
    id: 3,
    username: "ana.assist",
    email: "ana@escritorio.com",
    nomeCompleto: "Ana Paula Assistente Costa",
    perfil: "assistente",
    active: true,
    ultimoLogin: "2024-01-19 17:45:00",
    cpf: "456.789.123-00",
    numeroOab: null,
    ufOab: null,
    whatsapp: "(11) 77777-7777",
    imgPerfil: null
  },
  {
    id: 4,
    username: "carlos.estag",
    email: "carlos@escritorio.com",
    nomeCompleto: "Carlos Eduardo Estagiário Lima",
    perfil: "estagiario",
    active: true,
    ultimoLogin: "2024-01-19 16:20:00",
    cpf: "789.123.456-00",
    numeroOab: null,
    ufOab: null,
    whatsapp: "(11) 66666-6666",
    imgPerfil: null
  },
  {
    id: 5,
    username: "dr.ferreira",
    email: "ferreira@escritorio.com",
    nomeCompleto: "Roberto Ferreira Souza",
    perfil: "advogado",
    active: false,
    ultimoLogin: "2024-01-15 14:30:00",
    cpf: "321.654.987-00",
    numeroOab: "789123",
    ufOab: "MG",
    whatsapp: "(31) 55555-5555",
    imgPerfil: null
  }
];

const profileColors = {
  administrador: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  advogado: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  assistente: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  estagiario: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
};

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<typeof mockUsers[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterUsers(value, profileFilter);
  };

  const handleProfileFilter = (value: string) => {
    setProfileFilter(value);
    filterUsers(searchTerm, value);
  };

  const filterUsers = (search: string, profile: string) => {
    let filtered = users.filter(user => 
      user.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    );

    if (profile !== "todos") {
      filtered = filtered.filter(user => user.perfil === profile);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleToggleActive = (userId: number) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    
    const user = updatedUsers.find(u => u.id === userId);
    toast({
      title: "Status atualizado",
      description: `Usuário ${user?.nomeCompleto} foi ${user?.active ? 'ativado' : 'desativado'}`,
      variant: "default"
    });
  };

  const handleDelete = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Usuário excluído",
        description: `${user.nomeCompleto} foi removido do sistema`,
        variant: "destructive"
      });
    }
  };

  const handleViewUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUserForView(user);
      setIsViewDialogOpen(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
        </div>
        <Button data-testid="button-add-user">
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.active).length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inativos</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => !u.active).length}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Advogados</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.perfil === 'advogado').length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filtros de Busca</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Buscar por nome, email ou usuário</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Digite para buscar..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Filtrar por perfil</Label>
                <Select value={profileFilter} onValueChange={handleProfileFilter}>
                  <SelectTrigger data-testid="select-profile-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os perfis</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="advogado">Advogado</SelectItem>
                    <SelectItem value="assistente">Assistente</SelectItem>
                    <SelectItem value="estagiario">Estagiário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>OAB</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.imgPerfil || ""} />
                        <AvatarFallback>
                          {user.nomeCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.nomeCompleto}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={profileColors[user.perfil as keyof typeof profileColors]}
                      variant="secondary"
                    >
                      {user.perfil.charAt(0).toUpperCase() + user.perfil.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.active ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">Inativo</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.ultimoLogin).toLocaleString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.numeroOab ? (
                      <div className="text-sm">
                        <div>{user.numeroOab}</div>
                        <div className="text-muted-foreground">{user.ufOab}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.whatsapp}</div>
                      <div className="text-muted-foreground">{user.cpf}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleToggleActive(user.id)}
                        >
                          {user.active ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {currentUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-4" />
              <p>Nenhum usuário encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={() => {}}
          />
        </div>
      )}

      {/* Modal de Visualização do Usuário */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Detalhes do Usuário
            </DialogTitle>
            <DialogDescription>
              Informações completas de {selectedUserForView?.nomeCompleto}
            </DialogDescription>
          </DialogHeader>

          {selectedUserForView && (
            <div className="space-y-6">
              {/* Cabeçalho com Avatar */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUserForView.imgPerfil || ""} />
                  <AvatarFallback className="text-lg">
                    {selectedUserForView.nomeCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{selectedUserForView.nomeCompleto}</h3>
                  <div className="flex gap-2">
                    <Badge 
                      className={profileColors[selectedUserForView.perfil as keyof typeof profileColors]}
                      variant="secondary"
                    >
                      {selectedUserForView.perfil.charAt(0).toUpperCase() + selectedUserForView.perfil.slice(1)}
                    </Badge>
                    {selectedUserForView.active ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">Inativo</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Informações em Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dados de Acesso */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dados de Acesso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Username</Label>
                      <p className="text-sm text-muted-foreground">{selectedUserForView.username}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-muted-foreground">{selectedUserForView.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Último Login</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedUserForView.ultimoLogin).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados Pessoais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dados Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">CPF</Label>
                      <p className="text-sm text-muted-foreground">{selectedUserForView.cpf}</p>
                    </div>
                    {selectedUserForView.numeroOab && (
                      <>
                        <div>
                          <Label className="text-sm font-medium">Número OAB</Label>
                          <p className="text-sm text-muted-foreground">{selectedUserForView.numeroOab}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">UF OAB</Label>
                          <p className="text-sm text-muted-foreground">{selectedUserForView.ufOab}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Contato */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">{selectedUserForView.whatsapp}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Processos Ativos</Label>
                      <Badge variant="outline">15</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Clientes</Label>
                      <Badge variant="outline">8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Audiências</Label>
                      <Badge variant="outline">3</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
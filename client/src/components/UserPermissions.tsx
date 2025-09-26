import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Link,
  Unlink,
  Eye,
  Settings,
  UserCheck,
  UserX,
  Crown,
  UserCog,
  Edit,
  Save,
  X
} from "lucide-react";

// Interface para usuário com permissões
interface UserWithPermissions {
  id: number;
  username: string;
  nomeCompleto: string;
  email: string;
  perfil: string;
  active: boolean;
  isMaster: boolean;
  subordinados: number[];
  supervisores: number[];
}

// Dados mockados de usuários para permissões
const mockUsersForPermissions: UserWithPermissions[] = [
  {
    id: 1,
    username: "admin",
    nomeCompleto: "João Administrador Silva",
    email: "admin@sistema.com",
    perfil: "administrador",
    active: true,
    isMaster: true,
    subordinados: [],
    supervisores: []
  },
  {
    id: 2,
    username: "dr.santos",
    nomeCompleto: "Maria dos Santos Oliveira",
    email: "santos@escritorio.com",
    perfil: "advogado",
    active: true,
    isMaster: true,
    subordinados: [3, 4], // Ana e Carlos
    supervisores: []
  },
  {
    id: 5,
    username: "dr.ferreira",
    nomeCompleto: "Roberto Ferreira Souza",
    email: "ferreira@escritorio.com",
    perfil: "advogado",
    active: true,
    isMaster: true,
    subordinados: [],
    supervisores: []
  },
  {
    id: 3,
    username: "ana.assist",
    nomeCompleto: "Ana Paula Assistente Costa",
    email: "ana@escritorio.com",
    perfil: "assistente",
    active: true,
    isMaster: false,
    subordinados: [],
    supervisores: [2] // Dr. Santos
  },
  {
    id: 4,
    username: "carlos.estag",
    nomeCompleto: "Carlos Eduardo Estagiário Lima",
    email: "carlos@escritorio.com",
    perfil: "estagiario",
    active: true,
    isMaster: false,
    subordinados: [],
    supervisores: [2] // Dr. Santos
  }
];

const profileColors = {
  administrador: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  advogado: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  assistente: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  estagiario: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
};

// Interface para permissões de módulos
interface ModulePermissions {
  modulo: string;
  ver: boolean;
  criar: boolean;
  editar: boolean;
  excluir: boolean;
  exportar: boolean;
}

const defaultModulePermissions: ModulePermissions[] = [
  { modulo: "Dashboard", ver: true, criar: false, editar: false, excluir: false, exportar: false },
  { modulo: "Clientes", ver: true, criar: true, editar: true, excluir: false, exportar: true },
  { modulo: "Processos", ver: true, criar: true, editar: true, excluir: false, exportar: true },
  { modulo: "Agenda", ver: true, criar: true, editar: true, excluir: true, exportar: false },
  { modulo: "Tarefas", ver: true, criar: true, editar: true, excluir: true, exportar: false },
  { modulo: "Documentos", ver: true, criar: true, editar: false, excluir: false, exportar: true },
  { modulo: "Financeiro", ver: true, criar: false, editar: false, excluir: false, exportar: true },
  { modulo: "Arquivos", ver: true, criar: true, editar: false, excluir: false, exportar: false },
  { modulo: "Usuários", ver: false, criar: false, editar: false, excluir: false, exportar: false },
  { modulo: "Configurações", ver: false, criar: false, editar: false, excluir: false, exportar: false }
];

export function UserPermissions() {
  const [users, setUsers] = useState<UserWithPermissions[]>(mockUsersForPermissions);
  const [filteredUsers, setFilteredUsers] = useState<UserWithPermissions[]>(mockUsersForPermissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("todos");
  const [selectedUser, setSelectedUser] = useState<UserWithPermissions | null>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isEditPermissionsOpen, setIsEditPermissionsOpen] = useState(false);
  const [selectedSupervisors, setSelectedSupervisors] = useState<number[]>([]);
  const [modulePermissions, setModulePermissions] = useState<ModulePermissions[]>(defaultModulePermissions);
  const { toast } = useToast();

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
  };

  const getUserById = (id: number) => {
    return users.find(user => user.id === id);
  };

  const getAvailableSupervisors = (userId: number) => {
    return users.filter(user => 
      user.id !== userId && 
      (user.perfil === "administrador" || user.perfil === "advogado") &&
      user.active
    );
  };

  const handleLinkUsers = (subordinateId: number) => {
    const user = users.find(u => u.id === subordinateId);
    if (user) {
      setSelectedUser(user);
      setSelectedSupervisors(user.supervisores);
      setIsLinkDialogOpen(true);
    }
  };

  const handleSaveLinking = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        // Atualiza supervisores do subordinado
        return { ...user, supervisores: selectedSupervisors };
      }
      
      // Remove o subordinado de todos os supervisores
      if (user.subordinados.includes(selectedUser.id)) {
        return {
          ...user,
          subordinados: user.subordinados.filter(id => id !== selectedUser.id)
        };
      }

      // Adiciona o subordinado aos novos supervisores
      if (selectedSupervisors.includes(user.id)) {
        return {
          ...user,
          subordinados: [...user.subordinados, selectedUser.id]
        };
      }

      return user;
    });

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsLinkDialogOpen(false);
    setSelectedUser(null);
    setSelectedSupervisors([]);

    const supervisorNames = selectedSupervisors
      .map(id => getUserById(id)?.nomeCompleto)
      .filter(name => name)
      .join(", ");

    toast({
      title: "Vinculação atualizada",
      description: selectedSupervisors.length > 0 
        ? `${selectedUser.nomeCompleto} foi vinculado a: ${supervisorNames}`
        : `${selectedUser.nomeCompleto} foi desvinculado de todos os supervisores`,
      variant: "default"
    });
  };

  const handleUnlinkUser = (subordinateId: number) => {
    const user = users.find(u => u.id === subordinateId);
    if (!user) return;

    const updatedUsers = users.map(u => {
      if (u.id === subordinateId) {
        return { ...u, supervisores: [] };
      }
      if (u.subordinados.includes(subordinateId)) {
        return {
          ...u,
          subordinados: u.subordinados.filter(id => id !== subordinateId)
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    toast({
      title: "Usuário desvinculado",
      description: `${user.nomeCompleto} foi desvinculado de todos os supervisores`,
      variant: "default"
    });
  };

  const handleToggleSupervisor = (supervisorId: number) => {
    setSelectedSupervisors(prev => 
      prev.includes(supervisorId)
        ? prev.filter(id => id !== supervisorId)
        : [...prev, supervisorId]
    );
  };

  const handleEditPermissions = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setModulePermissions([...defaultModulePermissions]);
      setIsEditPermissionsOpen(true);
    }
  };

  const handlePermissionChange = (moduleIndex: number, permission: keyof Omit<ModulePermissions, 'modulo'>, value: boolean) => {
    setModulePermissions(prev => 
      prev.map((mod, index) => 
        index === moduleIndex 
          ? { ...mod, [permission]: value }
          : mod
      )
    );
  };

  const handleSavePermissions = () => {
    if (!selectedUser) return;

    toast({
      title: "Permissões atualizadas",
      description: `Permissões de ${selectedUser.nomeCompleto} foram atualizadas com sucesso`,
      variant: "default"
    });

    setIsEditPermissionsOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Gestão de Permissões</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Masters</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.isMaster).length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subordinados</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => !u.isMaster).length}
                </p>
              </div>
              <UserCog className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vinculados</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.supervisores.length > 0).length}
                </p>
              </div>
              <Link className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sem Vínculo</p>
                <p className="text-2xl font-bold text-orange-600">
                  {users.filter(u => !u.isMaster && u.supervisores.length === 0).length}
                </p>
              </div>
              <Unlink className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Explicação do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona o Sistema de Permissões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Crown className="h-4 w-4 text-red-500" />
                Usuários Master
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Administradores:</strong> Acesso total ao sistema</li>
                <li>• <strong>Advogados:</strong> Podem supervisionar assistentes e estagiários</li>
                <li>• Não precisam de supervisão</li>
                <li>• Veem todos os registros próprios e de subordinados</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <UserCog className="h-4 w-4 text-blue-500" />
                Usuários Subordinados
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Assistentes:</strong> Podem ser vinculados a advogados</li>
                <li>• <strong>Estagiários:</strong> Podem ser vinculados a advogados</li>
                <li>• Veem apenas registros próprios e de seus supervisores</li>
                <li>• Podem ser vinculados a múltiplos advogados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filtros de Busca</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Buscar por nome, email ou usuário</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite para buscar..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-permissions"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Filtrar por perfil</Label>
              <Select value={profileFilter} onValueChange={handleProfileFilter}>
                <SelectTrigger data-testid="select-profile-filter-permissions">
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
      </Card>

      {/* Tabela de Permissões */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Supervisores</TableHead>
                <TableHead>Subordinados</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
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
                    {user.isMaster ? (
                      <Badge variant="default" className="bg-red-100 text-red-800">
                        <Crown className="mr-1 h-3 w-3" />
                        Master
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <UserCog className="mr-1 h-3 w-3" />
                        Subordinado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.supervisores.length > 0 ? (
                      <div className="space-y-1">
                        {user.supervisores.map(supervisorId => {
                          const supervisor = getUserById(supervisorId);
                          return supervisor ? (
                            <Badge key={supervisorId} variant="outline" className="text-xs">
                              {supervisor.nomeCompleto.split(' ')[0]}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.subordinados.length > 0 ? (
                      <div className="space-y-1">
                        {user.subordinados.map(subordinadoId => {
                          const subordinado = getUserById(subordinadoId);
                          return subordinado ? (
                            <Badge key={subordinadoId} variant="outline" className="text-xs">
                              {subordinado.nomeCompleto.split(' ')[0]}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPermissions(user.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Permissões
                        </DropdownMenuItem>
                        {!user.isMaster && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => handleLinkUsers(user.id)}
                            >
                              <Link className="mr-2 h-4 w-4" />
                              Gerenciar Vínculos
                            </DropdownMenuItem>
                            {user.supervisores.length > 0 && (
                              <DropdownMenuItem 
                                onClick={() => handleUnlinkUser(user.id)}
                                className="text-red-600"
                              >
                                <Unlink className="mr-2 h-4 w-4" />
                                Desvincular Todos
                              </DropdownMenuItem>
                            )}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="mx-auto h-12 w-12 mb-4" />
              <p>Nenhum usuário encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Vinculação */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gerenciar Vínculos</DialogTitle>
            <DialogDescription>
              Selecione os advogados que supervisionarão {selectedUser?.nomeCompleto}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Supervisores Disponíveis</Label>
              {selectedUser && getAvailableSupervisors(selectedUser.id).map(supervisor => (
                <div key={supervisor.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`supervisor-${supervisor.id}`}
                    checked={selectedSupervisors.includes(supervisor.id)}
                    onCheckedChange={() => handleToggleSupervisor(supervisor.id)}
                    data-testid={`checkbox-supervisor-${supervisor.id}`}
                  />
                  <Label htmlFor={`supervisor-${supervisor.id}`} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs">
                        {supervisor.nomeCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{supervisor.nomeCompleto}</p>
                      <p className="text-xs text-muted-foreground">{supervisor.perfil}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
            
            {selectedUser && getAvailableSupervisors(selectedUser.id).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum supervisor disponível
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveLinking} data-testid="button-save-linking">
              <Link className="mr-2 h-4 w-4" />
              Salvar Vínculos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Permissões */}
      <Dialog open={isEditPermissionsOpen} onOpenChange={setIsEditPermissionsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Editar Permissões
            </DialogTitle>
            <DialogDescription>
              Configurar permissões de acesso para {selectedUser?.nomeCompleto}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* Cabeçalho do Usuário */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {selectedUser.nomeCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedUser.nomeCompleto}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge 
                          className={profileColors[selectedUser.perfil as keyof typeof profileColors]}
                          variant="secondary"
                        >
                          {selectedUser.perfil.charAt(0).toUpperCase() + selectedUser.perfil.slice(1)}
                        </Badge>
                        <Badge variant={selectedUser.isMaster ? "default" : "secondary"}>
                          {selectedUser.isMaster ? "Master" : "Subordinado"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Permissões */}
              <Card>
                <CardHeader>
                  <CardTitle>Permissões por Módulo</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Configure as permissões de acesso para cada módulo do sistema
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Módulo</TableHead>
                        <TableHead className="text-center w-[100px]">Ver</TableHead>
                        <TableHead className="text-center w-[100px]">Criar</TableHead>
                        <TableHead className="text-center w-[100px]">Editar</TableHead>
                        <TableHead className="text-center w-[100px]">Excluir</TableHead>
                        <TableHead className="text-center w-[100px]">Exportar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {modulePermissions.map((module, index) => (
                        <TableRow key={module.modulo}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Settings className="h-4 w-4 text-muted-foreground" />
                              {module.modulo}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={module.ver}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(index, 'ver', checked as boolean)
                              }
                              data-testid={`checkbox-ver-${module.modulo}`}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={module.criar}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(index, 'criar', checked as boolean)
                              }
                              disabled={!module.ver}
                              data-testid={`checkbox-criar-${module.modulo}`}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={module.editar}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(index, 'editar', checked as boolean)
                              }
                              disabled={!module.ver}
                              data-testid={`checkbox-editar-${module.modulo}`}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={module.excluir}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(index, 'excluir', checked as boolean)
                              }
                              disabled={!module.ver || !module.editar}
                              data-testid={`checkbox-excluir-${module.modulo}`}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={module.exportar}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(index, 'exportar', checked as boolean)
                              }
                              disabled={!module.ver}
                              data-testid={`checkbox-exportar-${module.modulo}`}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Resumo das Permissões */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resumo das Permissões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {modulePermissions.filter(m => m.ver).length}
                      </div>
                      <div className="text-muted-foreground">Podem Ver</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {modulePermissions.filter(m => m.criar).length}
                      </div>
                      <div className="text-muted-foreground">Podem Criar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {modulePermissions.filter(m => m.editar).length}
                      </div>
                      <div className="text-muted-foreground">Podem Editar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {modulePermissions.filter(m => m.excluir).length}
                      </div>
                      <div className="text-muted-foreground">Podem Excluir</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {modulePermissions.filter(m => m.exportar).length}
                      </div>
                      <div className="text-muted-foreground">Podem Exportar</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditPermissionsOpen(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSavePermissions}
                  data-testid="button-save-permissions"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Permissões
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
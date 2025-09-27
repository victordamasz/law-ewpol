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
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Trash2,
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
import { useToast } from "@/hooks/use-toast";

interface Audiencia {
  id: string;
  processNumber: string;
  processSubject: string;
  clientName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  location: string;
  judge: string;
  observations?: string;
}

export function AudienciaManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAudiencia, setEditingAudiencia] = useState<Audiencia | null>(null);
  const [newAudiencia, setNewAudiencia] = useState({
    processId: "",
    date: "",
    time: "",
    type: "",
    location: "",
    judge: "",
    observations: ""
  });

  // Dados fictícios das audiências
  const mockAudiencias: Audiencia[] = [
    {
      id: "1",
      processNumber: "1001234-56.2024.8.26.0100",
      processSubject: "Indenização por Danos Morais",
      clientName: "Maria Silva Santos",
      date: "2024-12-20",
      time: "14:00",
      type: "Conciliação",
      status: "agendada",
      location: "Sala 201 - 1ª Vara Cível",
      judge: "Dr. Roberto Almeida",
      observations: "Cliente deve comparecer com documentos originais"
    },
    {
      id: "2",
      processNumber: "2002345-67.2024.5.02.0001", 
      processSubject: "Rescisão Indireta",
      clientName: "Carlos Eduardo Lima",
      date: "2024-12-18",
      time: "09:30",
      type: "Instrução",
      status: "agendada",
      location: "Sala 105 - 3ª Vara do Trabalho",
      judge: "Dra. Fernanda Santos",
      observations: ""
    },
    {
      id: "3",
      processNumber: "3003456-78.2024.8.26.0224",
      processSubject: "Divórcio Consensual", 
      clientName: "Ana Paula Ferreira",
      date: "2024-12-05",
      time: "16:00",
      type: "Audiência de Ratificação",
      status: "realizada",
      location: "Sala 302 - 2ª Vara de Família",
      judge: "Dr. Paulo César",
      observations: "Acordo homologado"
    },
    {
      id: "4",
      processNumber: "4004567-89.2024.4.03.6100",
      processSubject: "Defesa em Processo Criminal",
      clientName: "Roberto Santos",
      date: "2024-11-28",
      time: "10:00", 
      type: "Interrogatório",
      status: "cancelada",
      location: "Sala 401 - 1ª Vara Criminal Federal",
      judge: "Dr. Marcelo Rocha",
      observations: "Cancelada a pedido da defesa"
    }
  ];

  const columns: ColumnDef<Audiencia>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{new Date(row.original.date).toLocaleDateString('pt-BR')}</span>
        </div>
      ),
    },
    {
      accessorKey: "time",
      header: "Horário",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{row.original.time}</span>
        </div>
      ),
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
      accessorKey: "processNumber",
      header: "Processo",
      cell: ({ row }) => (
        <div>
          <div className="font-mono text-sm">{row.original.processNumber}</div>
          <div className="text-xs text-muted-foreground truncate max-w-32">
            {row.original.processSubject}
          </div>
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
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "location",
      header: "Local",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{row.original.location}</span>
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
            onClick={() => handleViewAudiencia(row.original)}
            data-testid={`button-view-audiencia-${row.original.id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEditAudiencia(row.original)}
            data-testid={`button-edit-audiencia-${row.original.id}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDeleteAudiencia(row.original.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
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

  const filteredAudiencias = mockAudiencias.filter(audiencia => {
    const matchesSearch = audiencia.processNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audiencia.processSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audiencia.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audiencia.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || audiencia.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAudiencias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAudiencias = filteredAudiencias.slice(startIndex, startIndex + itemsPerPage);

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
      case "agendada": return "bg-blue-100 text-blue-800";
      case "realizada": return "bg-green-100 text-green-800";
      case "cancelada": return "bg-red-100 text-red-800";
      case "adiada": return "bg-yellow-100 text-yellow-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "realizada": return <CheckCircle className="h-4 w-4" />;
      case "cancelada": return <XCircle className="h-4 w-4" />;
      case "adiada": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleNewAudiencia = () => {
    toast({
      title: "Audiência agendada!",
      description: `Audiência foi agendada para ${newAudiencia.date} às ${newAudiencia.time}.`,
    });
    setShowNewModal(false);
    setNewAudiencia({
      processId: "",
      date: "",
      time: "",
      type: "",
      location: "",
      judge: "",
      observations: ""
    });
  };

  const handleEditAudiencia = (audiencia: Audiencia) => {
    setEditingAudiencia(audiencia);
    setShowEditModal(true);
  };

  const handleUpdateAudiencia = () => {
    toast({
      title: "Audiência atualizada!",
      description: "As informações da audiência foram atualizadas com sucesso.",
    });
    setShowEditModal(false);
    setEditingAudiencia(null);
  };

  const handleViewAudiencia = (audiencia: Audiencia) => {
    toast({
      title: "Visualizar audiência",
      description: `Audiência: ${audiencia.type} - ${audiencia.date}`,
    });
  };

  const handleDeleteAudiencia = (id: string) => {
    toast({
      title: "Audiência excluída",
      description: "A audiência foi removida do sistema.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audiências</h1>
          <p className="text-muted-foreground">Gerencie audiências e acompanhe agendamentos</p>
        </div>
        <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-audiencia">
              <Plus className="h-4 w-4 mr-2" />
              Nova Audiência
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Audiência</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="processId">Processo</Label>
                <Select onValueChange={(value) => setNewAudiencia({...newAudiencia, processId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o processo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1001234-56.2024.8.26.0100 - Indenização por Danos Morais</SelectItem>
                    <SelectItem value="2">2002345-67.2024.5.02.0001 - Rescisão Indireta</SelectItem>
                    <SelectItem value="3">3003456-78.2024.8.26.0224 - Divórcio Consensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAudiencia.date}
                    onChange={(e) => setNewAudiencia({...newAudiencia, date: e.target.value})}
                    data-testid="input-audiencia-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAudiencia.time}
                    onChange={(e) => setNewAudiencia({...newAudiencia, time: e.target.value})}
                    data-testid="input-audiencia-time"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Audiência</Label>
                <Select onValueChange={(value) => setNewAudiencia({...newAudiencia, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conciliacao">Conciliação</SelectItem>
                    <SelectItem value="instrucao">Instrução</SelectItem>
                    <SelectItem value="julgamento">Julgamento</SelectItem>
                    <SelectItem value="ratificacao">Ratificação</SelectItem>
                    <SelectItem value="interrogatorio">Interrogatório</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  value={newAudiencia.location}
                  onChange={(e) => setNewAudiencia({...newAudiencia, location: e.target.value})}
                  placeholder="Sala e vara/tribunal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="judge">Juiz</Label>
                <Input
                  id="judge"
                  value={newAudiencia.judge}
                  onChange={(e) => setNewAudiencia({...newAudiencia, judge: e.target.value})}
                  placeholder="Nome do juiz"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={newAudiencia.observations}
                  onChange={(e) => setNewAudiencia({...newAudiencia, observations: e.target.value})}
                  placeholder="Observações sobre a audiência"
                  className="min-h-20"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNewAudiencia} data-testid="button-save-audiencia">
                  Agendar
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
            placeholder="Pesquisar por processo, cliente ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-audiencias"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="button-filter-audiencias">
                <Filter className="h-4 w-4 mr-2" />
                Status: {selectedFilter === "todos" ? "Todos" : selectedFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("agendada")}>
                Agendada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("realizada")}>
                Realizada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("cancelada")}>
                Cancelada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("adiada")}>
                Adiada
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

      {/* Audiencias Display */}
      {viewMode === "list" ? (
        <DataTable
          columns={columns}
          data={filteredAudiencias}
          searchKey="processNumber"
          searchPlaceholder="Pesquisar audiências..."
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedAudiencias.map((audiencia) => (
              <Card key={audiencia.id} className="hover-elevate" data-testid={`card-audiencia-${audiencia.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg truncate">{audiencia.type}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        Processo: {audiencia.processNumber}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(audiencia.status)}>
                        {getStatusIcon(audiencia.status)}
                        <span className="ml-1 capitalize">{audiencia.status}</span>
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
                        <span className="text-sm font-medium">{audiencia.clientName}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Assunto</p>
                      <span className="text-sm">{audiencia.processSubject}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Data e Horário</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{formatDate(audiencia.date)} às {audiencia.time}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Juiz</p>
                      <span className="text-sm font-medium">{audiencia.judge}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Local</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{audiencia.location}</span>
                      </div>
                    </div>
                  </div>

                  {audiencia.observations && (
                    <div className="space-y-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">Observações</p>
                      <p className="text-sm">{audiencia.observations}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewAudiencia(audiencia)}
                      data-testid={`button-view-audiencia-${audiencia.id}`}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditAudiencia(audiencia)}
                      data-testid={`button-edit-audiencia-${audiencia.id}`}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDeleteAudiencia(audiencia.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Ver Processo
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
            totalItems={filteredAudiencias.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {/* Modal de Edição */}
      {editingAudiencia && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Audiência</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Data</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    defaultValue={editingAudiencia.date}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Horário</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    defaultValue={editingAudiencia.time}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={editingAudiencia.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="realizada">Realizada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                    <SelectItem value="adiada">Adiada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-observations">Observações</Label>
                <Textarea
                  id="edit-observations"
                  defaultValue={editingAudiencia.observations}
                  className="min-h-20"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdateAudiencia}>
                  Atualizar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {filteredAudiencias.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma audiência encontrada</p>
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
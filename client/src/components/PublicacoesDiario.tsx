import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pagination } from "@/components/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Eye,
  Plus,
  CheckSquare,
  Scale,
  User,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  CalendarPlus,
  ListTodo,
  Grid,
  List
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function PublicacoesDiario() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<any>(null);
  
  // Form states para adicionar compromisso/tarefa
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium"
  });
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    duration: "60"
  });

  // Dados estáticos de exemplo para publicações no diário
  const publicacoes = [
    {
      id: 1,
      processo: {
        numero: "5005692-67.2024.4.03.6109",
        cliente: "Maria Silva Santos",
        assunto: "Benefício por Incapacidade Permanente"
      },
      publicacao: {
        data: "2024-12-15",
        orgao: "TRF3 - Tribunal Regional Federal da 3ª Região",
        tipo: "Intimação",
        prazo: "15 dias",
        teor: "INTIMAÇÃO para apresentar CONTRARRAZÕES no prazo de 15 (quinze) dias, nos termos do art. 1012, §1º, do Código de Processo Civil. A parte é intimada para, querendo, apresentar contrarrazões ao recurso interposto, no prazo legal. Considera-se efetivada a intimação pela consulta ao teor da intimação. São Paulo, 15 de dezembro de 2024.",
        status: "pendente"
      },
      advogados: [
        {
          nome: "Dr. João Silva",
          oab: "SP 123456",
          avatar: "/api/placeholder/32/32",
          responsavel: true
        },
        {
          nome: "Dra. Ana Costa", 
          oab: "SP 234567",
          avatar: "/api/placeholder/32/32",
          responsavel: false
        }
      ]
    },
    {
      id: 2,
      processo: {
        numero: "1008734-12.2024.5.02.0011",
        cliente: "Pedro Oliveira",
        assunto: "Rescisão Indireta de Contrato de Trabalho"
      },
      publicacao: {
        data: "2024-12-14",
        orgao: "TRT2 - Tribunal Regional do Trabalho da 2ª Região",
        tipo: "Decisão",
        prazo: "",
        teor: "DECISÃO: Defiro o pedido de tutela de urgência para determinar o depósito do valor correspondente ao FGTS e às verbas rescisórias em conta vinculada. A empresa ré tem o prazo de 48 horas para cumprir a determinação, sob pena de multa diária de R$ 500,00. Cite-se a ré para apresentar defesa no prazo de 20 dias.",
        status: "cumprida"
      },
      advogados: [
        {
          nome: "Dr. Carlos Lima",
          oab: "SP 345678", 
          avatar: "/api/placeholder/32/32",
          responsavel: true
        }
      ]
    },
    {
      id: 3,
      processo: {
        numero: "0002451-88.2024.8.26.0100",
        cliente: "Empresa ABC Ltda",
        assunto: "Ação de Cobrança"
      },
      publicacao: {
        data: "2024-12-13",
        orgao: "TJSP - Tribunal de Justiça de São Paulo",
        tipo: "Citação",
        prazo: "15 dias",
        teor: "CITAÇÃO por EDITAL da empresa requerida XYZ COMÉRCIO LTDA, CNPJ 12.345.678/0001-90, para responder à presente ação no prazo de 15 (quinze) dias, advertindo-a de que, não sendo contestada a ação, se presumirão aceitos como verdadeiros os fatos alegados pelo autor.",
        status: "pendente"
      },
      advogados: [
        {
          nome: "Dra. Mariana Santos",
          oab: "SP 456789",
          avatar: "/api/placeholder/32/32",
          responsavel: true
        },
        {
          nome: "Dr. Roberto Alves",
          oab: "SP 567890", 
          avatar: "/api/placeholder/32/32",
          responsavel: false
        }
      ]
    },
    {
      id: 4,
      processo: {
        numero: "5012876-44.2024.4.03.6106",
        cliente: "José Carlos Pereira",
        assunto: "Aposentadoria por Idade"
      },
      publicacao: {
        data: "2024-12-12",
        orgao: "TRF3 - Tribunal Regional Federal da 3ª Região", 
        tipo: "Sentença",
        prazo: "",
        teor: "SENTENÇA: Julgo PROCEDENTE o pedido para condenar o INSS a conceder aposentadoria por idade ao autor, a partir de 15/08/2024, com pagamento das parcelas vencidas acrescidas de juros e correção monetária nos termos da Lei 11.960/2009. Condeno ainda o réu ao pagamento de honorários advocatícios fixados em 10% sobre as parcelas vencidas.",
        status: "favoravel"
      },
      advogados: [
        {
          nome: "Dr. Fernando Rocha",
          oab: "SP 678901",
          avatar: "/api/placeholder/32/32", 
          responsavel: true
        }
      ]
    },
    {
      id: 5,
      processo: {
        numero: "1009123-55.2024.5.02.0013",
        cliente: "Sindicato dos Trabalhadores",
        assunto: "Dissídio Coletivo"
      },
      publicacao: {
        data: "2024-12-11",
        orgao: "TRT2 - Tribunal Regional do Trabalho da 2ª Região",
        tipo: "Acórdão",
        prazo: "8 dias",
        teor: "ACÓRDÃO: Por unanimidade, conhecer do recurso e negar-lhe provimento. Mantém-se a decisão de primeiro grau que deferiu reajuste salarial de 8,5% para a categoria, retroativo a janeiro de 2024. Recurso ao TST no prazo de 8 dias. Custas pelo recorrente.",
        status: "favoravel"
      },
      advogados: [
        {
          nome: "Dr. Paulo Mendes",
          oab: "SP 789012", 
          avatar: "/api/placeholder/32/32",
          responsavel: true
        },
        {
          nome: "Dra. Lucia Ferreira",
          oab: "SP 890123",
          avatar: "/api/placeholder/32/32",
          responsavel: false
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "cumprida": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "favoravel": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "desfavoravel": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente": return <Clock className="h-3 w-3" />;
      case "cumprida": return <CheckSquare className="h-3 w-3" />;
      case "favoravel": return <CheckSquare className="h-3 w-3" />;
      case "desfavoravel": return <AlertTriangle className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Intimação": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Decisão": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Citação": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Sentença": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Acórdão": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredPublications = publicacoes.filter(pub => {
    const matchesSearch = 
      pub.processo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.processo.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.publicacao.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.publicacao.orgao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todas" || 
      pub.publicacao.status === selectedFilter ||
      pub.publicacao.tipo.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPublications = filteredPublications.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleViewPublication = (publication: any) => {
    setSelectedPublication(publication);
    setShowViewModal(true);
  };

  const handleAddTask = (publication: any) => {
    setSelectedPublication(publication);
    setNewTask({
      title: `Cumprir prazo - ${publication.publicacao.tipo} - Processo ${publication.processo.numero}`,
      description: `Prazo de ${publication.publicacao.prazo} para ${publication.publicacao.tipo.toLowerCase()} no processo ${publication.processo.numero} (${publication.processo.cliente})`,
      dueDate: "",
      priority: publication.publicacao.prazo ? "high" : "medium"
    });
    setShowAddTaskModal(true);
  };

  const handleAddEvent = (publication: any) => {
    setSelectedPublication(publication);
    setNewEvent({
      title: `${publication.publicacao.tipo} - ${publication.processo.cliente}`,
      description: `${publication.publicacao.tipo} referente ao processo ${publication.processo.numero}`,
      startDate: "",
      startTime: "09:00",
      duration: "60"
    });
    setShowAddEventModal(true);
  };

  const handleConfirmTask = () => {
    toast({
      title: "Tarefa adicionada!",
      description: `Nova tarefa "${newTask.title}" foi criada com sucesso.`,
    });
    setShowAddTaskModal(false);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium"
    });
  };

  const handleConfirmEvent = () => {
    toast({
      title: "Evento adicionado!",
      description: `Novo compromisso "${newEvent.title}" foi adicionado à agenda.`,
    });
    setShowAddEventModal(false);
    setNewEvent({
      title: "",
      description: "",
      startDate: "",
      startTime: "09:00",
      duration: "60"
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Publicações no Diário</h1>
          <p className="text-muted-foreground">Acompanhe publicações oficiais e gerencie prazos processuais</p>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por processo, cliente, tipo ou órgão..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-publications"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-1 bg-muted/50">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              data-testid="button-view-cards"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              data-testid="button-view-table"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="button-filter-publications">
                <Filter className="h-4 w-4 mr-2" />
                {selectedFilter === "todas" ? "Todas" : selectedFilter === "pendente" ? "Pendentes" : selectedFilter === "cumprida" ? "Cumpridas" : selectedFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter("todas")}>
                Todas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("pendente")}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("cumprida")}>
                Cumpridas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("favoravel")}>
                Favoráveis
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("intimação")}>
                Intimações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("decisão")}>
                Decisões
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("sentença")}>
                Sentenças
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Publications Display */}
      {viewMode === "cards" ? (
        <div className="space-y-4">
          {paginatedPublications.map((publication) => (
            <Card 
              key={publication.id} 
              className="hover-elevate"
              data-testid={`publication-card-${publication.id}`}
            >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header com processo e data */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold truncate">{publication.processo.numero}</h3>
                      <Badge className={getTipoColor(publication.publicacao.tipo)}>
                        {publication.publicacao.tipo}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <User className="h-3 w-3 inline mr-1" />
                      Cliente: {publication.processo.cliente}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Assunto: {publication.processo.assunto}
                    </p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(publication.publicacao.status)}>
                      {getStatusIcon(publication.publicacao.status)}
                      <span className="ml-1 capitalize">{publication.publicacao.status}</span>
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(publication.publicacao.data)}
                    </div>
                  </div>
                </div>

                {/* Órgão e prazo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Órgão:</Label>
                    <p className="font-medium">{publication.publicacao.orgao}</p>
                  </div>
                  {publication.publicacao.prazo && (
                    <div>
                      <Label className="text-muted-foreground">Prazo:</Label>
                      <p className="font-medium text-orange-600 dark:text-orange-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {publication.publicacao.prazo}
                      </p>
                    </div>
                  )}
                </div>

                {/* Advogados responsáveis */}
                <div>
                  <Label className="text-muted-foreground text-xs">Advogados:</Label>
                  <div className="flex items-center gap-3 mt-2">
                    {publication.advogados.map((advogado, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={advogado.avatar} alt={advogado.nome} />
                          <AvatarFallback>
                            {advogado.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <p className={`font-medium ${advogado.responsavel ? 'text-primary' : 'text-muted-foreground'}`}>
                            {advogado.nome} {advogado.responsavel && '(Resp.)'}
                          </p>
                          <p className="text-muted-foreground">OAB: {advogado.oab}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teor resumido */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <Label className="text-muted-foreground text-xs">Resumo:</Label>
                  <p className="text-sm mt-1 line-clamp-2">{publication.publicacao.teor.substring(0, 150)}...</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => handleViewPublication(publication)}
                    data-testid={`button-view-publication-${publication.id}`}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Teor Completo
                  </Button>
                  
                  {publication.publicacao.prazo && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddTask(publication)}
                        data-testid={`button-add-task-${publication.id}`}
                      >
                        <ListTodo className="h-4 w-4 mr-2" />
                        Adicionar Tarefa
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddEvent(publication)}
                        data-testid={`button-add-event-${publication.id}`}
                      >
                        <CalendarPlus className="h-4 w-4 mr-2" />
                        Agendar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Processo</TableHead>
                <TableHead>Cliente/Assunto</TableHead>
                <TableHead className="w-[120px]">Tipo</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[100px]">Prazo</TableHead>
                <TableHead className="w-[100px]">Data</TableHead>
                <TableHead className="w-[160px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPublications.map((publication) => (
                <TableRow 
                  key={publication.id}
                  data-testid={`publication-row-${publication.id}`}
                  className="hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm truncate max-w-[180px]">
                          {publication.processo.numero}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {publication.advogados.slice(0, 2).map((advogado, index) => (
                            <Avatar key={index} className="h-5 w-5">
                              <AvatarImage src={advogado.avatar} alt={advogado.nome} />
                              <AvatarFallback className="text-xs">
                                {advogado.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {publication.advogados.length > 2 && (
                            <span className="text-xs text-muted-foreground ml-1">+{publication.advogados.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{publication.processo.cliente}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {publication.processo.assunto}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {publication.publicacao.orgao}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getTipoColor(publication.publicacao.tipo)}>
                      {publication.publicacao.tipo}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(publication.publicacao.status)}>
                      {getStatusIcon(publication.publicacao.status)}
                      <span className="ml-1 capitalize">{publication.publicacao.status}</span>
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    {publication.publicacao.prazo ? (
                      <div className="text-xs">
                        <Clock className="h-3 w-3 inline mr-1 text-orange-600" />
                        <span className="font-medium text-orange-600">
                          {publication.publicacao.prazo}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(publication.publicacao.data)}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-7 px-2"
                        onClick={() => handleViewPublication(publication)}
                        data-testid={`button-view-publication-${publication.id}`}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      
                      {publication.publicacao.prazo && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-7 px-2"
                            onClick={() => handleAddTask(publication)}
                            data-testid={`button-add-task-${publication.id}`}
                          >
                            <ListTodo className="h-3 w-3" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-7 px-2"
                            onClick={() => handleAddEvent(publication)}
                            data-testid={`button-add-event-${publication.id}`}
                          >
                            <CalendarPlus className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPublications.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {filteredPublications.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Nenhuma publicação encontrada</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("todas");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}

      {/* View Publication Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Publicação Completa</DialogTitle>
            <DialogDescription>
              {selectedPublication?.publicacao.tipo} - Processo {selectedPublication?.processo.numero}
            </DialogDescription>
          </DialogHeader>
          {selectedPublication && (
            <div className="space-y-6">
              {/* Informações do processo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dados do Processo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Número do Processo:</Label>
                      <p className="font-medium">{selectedPublication.processo.numero}</p>
                    </div>
                    <div>
                      <Label>Cliente:</Label>
                      <p className="font-medium">{selectedPublication.processo.cliente}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Assunto:</Label>
                    <p className="font-medium">{selectedPublication.processo.assunto}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Informações da publicação */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detalhes da Publicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Data:</Label>
                      <p className="font-medium">{formatDate(selectedPublication.publicacao.data)}</p>
                    </div>
                    <div>
                      <Label>Tipo:</Label>
                      <Badge className={getTipoColor(selectedPublication.publicacao.tipo)}>
                        {selectedPublication.publicacao.tipo}
                      </Badge>
                    </div>
                    <div>
                      <Label>Status:</Label>
                      <Badge className={getStatusColor(selectedPublication.publicacao.status)}>
                        {getStatusIcon(selectedPublication.publicacao.status)}
                        <span className="ml-1 capitalize">{selectedPublication.publicacao.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Órgão:</Label>
                    <p className="font-medium">{selectedPublication.publicacao.orgao}</p>
                  </div>
                  {selectedPublication.publicacao.prazo && (
                    <div>
                      <Label>Prazo:</Label>
                      <p className="font-medium text-orange-600 dark:text-orange-400">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {selectedPublication.publicacao.prazo}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Teor completo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teor da Publicação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedPublication.publicacao.teor}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Advogados */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advogados Responsáveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPublication.advogados.map((advogado: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={advogado.avatar} alt={advogado.nome} />
                          <AvatarFallback>
                            {advogado.nome.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className={`font-medium ${advogado.responsavel ? 'text-primary' : ''}`}>
                            {advogado.nome} {advogado.responsavel && '(Responsável)'}
                          </p>
                          <p className="text-sm text-muted-foreground">OAB: {advogado.oab}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewModal(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Task Modal */}
      <Dialog open={showAddTaskModal} onOpenChange={setShowAddTaskModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Tarefa</DialogTitle>
            <DialogDescription>
              Crie uma nova tarefa relacionada a esta publicação.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taskTitle">Título da Tarefa</Label>
              <Input
                id="taskTitle"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Título da tarefa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taskDescription">Descrição</Label>
              <Textarea
                id="taskDescription"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Descrição detalhada da tarefa..."
                className="min-h-20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskDueDate">Data de Vencimento</Label>
                <Input
                  id="taskDueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskPriority">Prioridade</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">⬇️ Baixa</SelectItem>
                    <SelectItem value="medium">➡️ Média</SelectItem>
                    <SelectItem value="high">⬆️ Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTaskModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmTask} data-testid="button-confirm-task">
              <ListTodo className="h-4 w-4 mr-2" />
              Criar Tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Event Modal */}
      <Dialog open={showAddEventModal} onOpenChange={setShowAddEventModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Compromisso</DialogTitle>
            <DialogDescription>
              Adicione um compromisso na agenda relacionado a esta publicação.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Título do Compromisso</Label>
              <Input
                id="eventTitle"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Título do compromisso"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDescription">Descrição</Label>
              <Textarea
                id="eventDescription"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Descrição do compromisso..."
                className="min-h-20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventStartDate">Data</Label>
                <Input
                  id="eventStartDate"
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventStartTime">Horário</Label>
                <Input
                  id="eventStartTime"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDuration">Duração (minutos)</Label>
              <Select value={newEvent.duration} onValueChange={(value) => setNewEvent({...newEvent, duration: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                  <SelectItem value="240">4 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmEvent} data-testid="button-confirm-event">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
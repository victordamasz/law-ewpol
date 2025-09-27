import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  User, 
  Flag,
  Calendar,
  MessageCircle,
  Edit,
  Eye,
  Filter,
  UserPlus,
  Send
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department?: string;
}

interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "baixa" | "media" | "alta" | "urgente";
  assignee: User;
  reviewer?: User;
  participants: User[];
  dueDate: string;
  tags: string[];
  comments: TaskComment[];
  status: "aguardando" | "em-andamento" | "em-revisao" | "finalizado";
  category?: string;
  estimatedHours?: number;
  actualHours?: number;
  clientId?: string;
  clientName?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<"all" | "my" | "team">("all");
  const [newComment, setNewComment] = useState("");

  // Mock users data
  const mockUsers: User[] = [
    { id: "1", name: "Dr. João Silva", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face", role: "Advogado Senior", department: "Cível" },
    { id: "2", name: "Dra. Ana Costa", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face", role: "Advogada Pleno", department: "Trabalhista" },
    { id: "3", name: "Dr. Carlos Lima", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face", role: "Advogado Especialista", department: "Criminal" },
    { id: "4", name: "Dra. Maria Santos", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face", role: "Estagiária", department: "Geral" },
    { id: "5", name: "Dr. Roberto Alves", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=32&h=32&fit=crop&crop=face", role: "Advogado Junior", department: "Empresarial" }
  ];

  const currentUser = mockUsers[0]; // Simular usuário logado

  // Enhanced mock tasks with complete structure
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Análise de Processo Trabalhista",
      description: "Revisar documentos do processo Silva vs. Empresa ABC para preparação de defesa. Análise completa de jurisprudência e precedentes.",
      priority: "alta",
      assignee: mockUsers[1],
      reviewer: mockUsers[0],
      participants: [mockUsers[1], mockUsers[3]],
      dueDate: "2024-12-20",
      tags: ["trabalhista", "defesa"],
      status: "aguardando",
      category: "Processo",
      estimatedHours: 8,
      clientId: "c1",
      clientName: "Silva & Associados",
      createdBy: mockUsers[0],
      createdAt: "2024-12-15T09:00:00Z",
      updatedAt: "2024-12-15T14:30:00Z",
      comments: [
        {
          id: "c1",
          userId: "1",
          userName: "Dr. João Silva",
          userAvatar: mockUsers[0].avatar,
          content: "Verificar os documentos mais recentes enviados pelo cliente.",
          isInternal: true,
          createdAt: "2024-12-15T10:00:00Z"
        },
        {
          id: "c2",
          userId: "2",
          userName: "Dra. Ana Costa",
          userAvatar: mockUsers[1].avatar,
          content: "Já solicitei os documentos adicionais. Aguardando retorno do cliente.",
          isInternal: true,
          createdAt: "2024-12-15T11:30:00Z"
        },
        {
          id: "c3",
          userId: "4",
          userName: "Dra. Maria Santos",
          userAvatar: mockUsers[3].avatar,
          content: "Encontrei jurisprudência favorável. Vou anexar no relatório.",
          isInternal: true,
          createdAt: "2024-12-15T14:00:00Z"
        }
      ]
    },
    {
      id: "2", 
      title: "Elaboração de Parecer Jurídico",
      description: "Parecer sobre contrato de prestação de serviços para cliente Maria Santos. Análise de cláusulas contratuais e riscos.",
      priority: "media",
      assignee: mockUsers[1],
      participants: [mockUsers[1], mockUsers[4]],
      dueDate: "2024-12-18",
      tags: ["contrato", "parecer"],
      status: "em-andamento",
      category: "Consultoria",
      estimatedHours: 6,
      actualHours: 3,
      clientId: "c2",
      clientName: "Maria Santos",
      createdBy: mockUsers[1],
      createdAt: "2024-12-14T08:00:00Z",
      updatedAt: "2024-12-15T16:00:00Z",
      comments: [
        {
          id: "c4",
          userId: "2",
          userName: "Dra. Ana Costa",
          userAvatar: mockUsers[1].avatar,
          content: "Parecer 70% concluído. Aguardando esclarecimentos do cliente sobre cláusula de exclusividade.",
          isInternal: false,
          createdAt: "2024-12-15T16:00:00Z"
        }
      ]
    },
    {
      id: "3",
      title: "Preparação para Audiência",
      description: "Reunir documentos e preparar estratégia para audiência do dia 22/12. Preparação de argumentação e testemunhas.",
      priority: "urgente",
      assignee: mockUsers[2],
      reviewer: mockUsers[0],
      participants: [mockUsers[2], mockUsers[0], mockUsers[3]],
      dueDate: "2024-12-22",
      tags: ["audiencia", "preparacao"],
      status: "em-andamento",
      category: "Processo",
      estimatedHours: 12,
      actualHours: 8,
      clientId: "c3",
      clientName: "Carlos Lima Ltda",
      createdBy: mockUsers[2],
      createdAt: "2024-12-10T09:00:00Z",
      updatedAt: "2024-12-15T18:00:00Z",
      comments: [
        {
          id: "c5",
          userId: "3",
          userName: "Dr. Carlos Lima",
          userAvatar: mockUsers[2].avatar,
          content: "Documentos organizados. Preciso revisar a estratégia com o Dr. João.",
          isInternal: true,
          createdAt: "2024-12-15T09:00:00Z"
        },
        {
          id: "c6",
          userId: "1",
          userName: "Dr. João Silva",
          userAvatar: mockUsers[0].avatar,
          content: "Vamos nos reunir amanhã às 14h para alinhar a estratégia.",
          isInternal: true,
          createdAt: "2024-12-15T10:30:00Z"
        },
        {
          id: "c7",
          userId: "4",
          userName: "Dra. Maria Santos",
          userAvatar: mockUsers[3].avatar,
          content: "Organizei todas as jurisprudências por tema. Está na pasta compartilhada.",
          isInternal: true,
          createdAt: "2024-12-15T16:30:00Z"
        },
        {
          id: "c8",
          userId: "3",
          userName: "Dr. Carlos Lima",
          userAvatar: mockUsers[2].avatar,
          content: "Excelente trabalho, Maria! Isso vai acelerar muito nossa preparação.",
          isInternal: true,
          createdAt: "2024-12-15T17:00:00Z"
        },
        {
          id: "c9",
          userId: "1",
          userName: "Dr. João Silva",
          userAvatar: mockUsers[0].avatar,
          content: "Lembrem-se de confirmar a presença das testemunhas até quinta-feira.",
          isInternal: true,
          createdAt: "2024-12-15T18:00:00Z"
        }
      ]
    },
    {
      id: "4",
      title: "Revisão de Petição Inicial",
      description: "Revisão e correção de petição inicial para processo civil. Verificação de procedimentos e fundamentação.",
      priority: "media",
      assignee: mockUsers[0],
      reviewer: mockUsers[1],
      participants: [mockUsers[0]],
      dueDate: "2024-12-19",
      tags: ["peticao", "civil"],
      status: "em-revisao",
      category: "Documento",
      estimatedHours: 4,
      actualHours: 4,
      clientId: "c4",
      clientName: "Empresa ABC",
      createdBy: mockUsers[0],
      createdAt: "2024-12-12T10:00:00Z",
      updatedAt: "2024-12-15T12:00:00Z",
      comments: []
    },
    {
      id: "5",
      title: "Atualização de Cadastro Cliente",
      description: "Atualizar dados cadastrais e documentos do cliente Oliveira & Co. Verificação de documentação corporativa.",
      priority: "baixa", 
      assignee: mockUsers[3],
      participants: [mockUsers[3]],
      dueDate: "2024-12-25",
      tags: ["cadastro", "cliente"],
      status: "finalizado",
      category: "Administrativo",
      estimatedHours: 2,
      actualHours: 1.5,
      clientId: "c5",
      clientName: "Oliveira & Co.",
      createdBy: mockUsers[3],
      createdAt: "2024-12-13T14:00:00Z",
      updatedAt: "2024-12-14T15:30:00Z",
      comments: [
        {
          id: "c10",
          userId: "4",
          userName: "Dra. Maria Santos",
          userAvatar: mockUsers[3].avatar,
          content: "Cadastro atualizado com sucesso. Todos os documentos validados.",
          isInternal: false,
          createdAt: "2024-12-14T15:30:00Z"
        },
        {
          id: "c11",
          userId: "1",
          userName: "Dr. João Silva",
          userAvatar: mockUsers[0].avatar,
          content: "Ótimo trabalho, Maria! Cliente muito satisfeito com a agilidade.",
          isInternal: true,
          createdAt: "2024-12-14T16:00:00Z"
        }
      ]
    }
  ]);

  const columns = [
    { id: "aguardando", title: "Aguardando", color: "bg-muted" },
    { id: "em-andamento", title: "Em Andamento", color: "bg-chart-1/10" },
    { id: "em-revisao", title: "Em Revisão", color: "bg-chart-2/10" },
    { id: "finalizado", title: "Finalizado", color: "bg-chart-3/10" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente": return "bg-destructive/10 text-destructive";
      case "alta": return "bg-chart-2/10 text-chart-2";
      case "media": return "bg-chart-1/10 text-chart-1";
      case "baixa": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgente": return <Flag className="h-3 w-3 fill-current" />;
      case "alta": return <Flag className="h-3 w-3 fill-current" />;
      case "media": return <Flag className="h-3 w-3" />;
      case "baixa": return <Flag className="h-3 w-3" />;
      default: return <Flag className="h-3 w-3" />;
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== 'string') return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const openTaskEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filterBy) {
      case "my":
        return task.assignee.id === currentUser.id || 
               task.participants.some(p => p.id === currentUser.id);
      case "team":
        return task.assignee.department === currentUser.department;
      case "all":
      default:
        return true;
    }
  });

  const addComment = (taskId: string, content: string, isInternal: boolean = true) => {
    const newComment: TaskComment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      isInternal,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, comments: [...task.comments, newComment] }
        : task
    ));
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    console.log(`Task ${taskId} moved to ${newStatus}`);
  };

  const getTasksForColumn = (status: Task["status"]) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tarefas</h1>
          <p className="text-muted-foreground">Gerencie tarefas e acompanhe o progresso</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterBy} onValueChange={(value: "all" | "my" | "team") => setFilterBy(value)}>
            <SelectTrigger className="w-40" data-testid="select-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Tarefas</SelectItem>
              <SelectItem value="my">Minhas Tarefas</SelectItem>
              <SelectItem value="team">Minha Equipe</SelectItem>
            </SelectContent>
          </Select>
          <Button data-testid="button-add-task" onClick={() => console.log('Add task clicked')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksForColumn(column.id as Task["status"]);
          
          return (
            <div key={column.id} className="space-y-4">
              <div className={`p-4 rounded-lg ${column.color}`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">{column.title}</h2>
                  <Badge variant="secondary" className="font-normal">
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 min-h-[400px]">
                {columnTasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className="hover-elevate cursor-pointer"
                    data-testid={`task-card-${task.id}`}
                    onClick={() => openTaskDetails(task)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-medium leading-tight">
                          {task.title}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {columns.map((col) => (
                              <DropdownMenuItem 
                                key={col.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveTask(task.id, col.id as Task["status"]);
                                }}
                              >
                                Mover para {col.title}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex items-center gap-1 flex-wrap">
                        <Badge className={getPriorityColor(task.priority)}>
                          {getPriorityIcon(task.priority)}
                          <span className="ml-1 capitalize">{task.priority}</span>
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {getInitials(task.assignee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground truncate">
                            {task.assignee.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {task.comments.length > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{task.comments.length}</span>
                            </div>
                          )}
                          <div className={`flex items-center gap-1 ${
                            isOverdue(task.dueDate) ? 'text-destructive' : ''
                          }`}>
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button for Column */}
                <Button
                  variant="ghost"
                  className="w-full border-2 border-dashed border-muted-foreground/25 h-20 hover:border-muted-foreground/50 hover:bg-muted/50"
                  onClick={() => console.log(`Add task to ${column.title}`)}
                  data-testid={`button-add-task-${column.id}`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar tarefa
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Detalhes da Tarefa */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTask && getPriorityIcon(selectedTask.priority)}
              {selectedTask?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-6">
              {/* Informações básicas */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Responsável</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                        <AvatarFallback>{getInitials(selectedTask.assignee.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedTask.assignee.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedTask.assignee.role}</p>
                      </div>
                    </div>
                  </div>

                  {selectedTask.reviewer && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Revisor</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedTask.reviewer.avatar} alt={selectedTask.reviewer.name} />
                          <AvatarFallback>{getInitials(selectedTask.reviewer.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedTask.reviewer.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedTask.reviewer.role}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Cliente</Label>
                    <p className="mt-1 font-medium">{selectedTask.clientName}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getPriorityColor(selectedTask.priority)}>
                        {getPriorityIcon(selectedTask.priority)}
                        <span className="ml-1 capitalize">{selectedTask.priority}</span>
                      </Badge>
                      <Badge variant="outline">{
                        columns.find(c => c.id === selectedTask.status)?.title
                      }</Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Prazo</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span className={isOverdue(selectedTask.dueDate) ? 'text-destructive font-medium' : ''}>
                        {formatDate(selectedTask.dueDate)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Categoria</Label>
                    <p className="mt-1">{selectedTask.category}</p>
                  </div>

                  {selectedTask.estimatedHours && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Horas Estimadas</Label>
                      <p className="mt-1">{selectedTask.estimatedHours}h</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                <p className="mt-1 text-sm">{selectedTask.description}</p>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tags</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedTask.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Participantes */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Participantes ({selectedTask.participants.length})
                </Label>
                <div className="flex flex-wrap gap-3">
                  {selectedTask.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/20">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback className="text-xs">{getInitials(participant.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comentários */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Comentários ({selectedTask.comments.length})
                  </Label>
                </div>
                
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {selectedTask.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-3 rounded-md bg-muted/20">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                        <AvatarFallback className="text-xs">{getInitials(comment.userName)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString('pt-BR')}
                          </span>
                          {comment.isInternal && (
                            <Badge variant="outline" className="text-xs">Interno</Badge>
                          )}
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adicionar comentário */}
                <div className="mt-4 space-y-2">
                  <Textarea
                    placeholder="Adicionar comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    data-testid="textarea-new-comment"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (newComment.trim()) {
                          addComment(selectedTask.id, newComment, false);
                          setNewComment("");
                        }
                      }}
                      disabled={!newComment.trim()}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Comentário Público
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newComment.trim()) {
                          addComment(selectedTask.id, newComment, true);
                          setNewComment("");
                        }
                      }}
                      disabled={!newComment.trim()}
                      data-testid="button-add-comment"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Comentário Interno
                    </Button>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                  Fechar
                </Button>
                <Button 
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  data-testid="button-edit-from-details"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição (básico) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Título</Label>
                <Input 
                  id="edit-title"
                  defaultValue={selectedTask.title}
                  data-testid="input-edit-task-title"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea 
                  id="edit-description"
                  defaultValue={selectedTask.description}
                  rows={3}
                  data-testid="textarea-edit-task-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-priority">Prioridade</Label>
                  <Select defaultValue={selectedTask.priority}>
                    <SelectTrigger data-testid="select-edit-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedTask.status}>
                    <SelectTrigger data-testid="select-edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-due-date">Data de Vencimento</Label>
                <Input 
                  id="edit-due-date"
                  type="date"
                  defaultValue={selectedTask.dueDate}
                  data-testid="input-edit-due-date"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={() => {
                    setIsEditModalOpen(false);
                    console.log('Task updated');
                  }}
                  data-testid="button-save-task"
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
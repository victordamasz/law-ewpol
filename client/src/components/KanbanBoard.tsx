import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  User, 
  Flag,
  Calendar,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "baixa" | "media" | "alta" | "urgente";
  assignee: string;
  dueDate: string;
  tags: string[];
  comments: number;
  status: "aguardando" | "em-andamento" | "em-revisao" | "finalizado";
}

export function KanbanBoard() {
  // Todo: remove mock functionality
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Análise de Processo Trabalhista",
      description: "Revisar documentos do processo Silva vs. Empresa ABC para preparação de defesa",
      priority: "alta",
      assignee: "Dr. João Silva",
      dueDate: "2024-12-20",
      tags: ["trabalhista", "defesa"],
      comments: 3,
      status: "aguardando"
    },
    {
      id: "2", 
      title: "Elaboração de Parecer Jurídico",
      description: "Parecer sobre contrato de prestação de serviços para cliente Maria Santos",
      priority: "media",
      assignee: "Dra. Ana Costa",
      dueDate: "2024-12-18",
      tags: ["contrato", "parecer"],
      comments: 1,
      status: "em-andamento"
    },
    {
      id: "3",
      title: "Preparação para Audiência",
      description: "Reunir documentos e preparar estratégia para audiência do dia 22/12",
      priority: "urgente",
      assignee: "Dr. Carlos Lima", 
      dueDate: "2024-12-22",
      tags: ["audiencia", "preparacao"],
      comments: 5,
      status: "em-andamento"
    },
    {
      id: "4",
      title: "Revisão de Petição Inicial",
      description: "Revisão e correção de petição inicial para processo civil",
      priority: "media",
      assignee: "Dr. João Silva",
      dueDate: "2024-12-19",
      tags: ["peticao", "civil"],
      comments: 0,
      status: "em-revisao"
    },
    {
      id: "5",
      title: "Atualização de Cadastro Cliente",
      description: "Atualizar dados cadastrais e documentos do cliente Oliveira & Co.",
      priority: "baixa", 
      assignee: "Assistente Legal",
      dueDate: "2024-12-25",
      tags: ["cadastro", "cliente"],
      comments: 2,
      status: "finalizado"
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    console.log(`Task ${taskId} moved to ${newStatus}`);
  };

  const getTasksForColumn = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status);
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
        <Button data-testid="button-add-task" onClick={() => console.log('Add task clicked')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
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
                    onClick={() => console.log(`Task ${task.id} clicked`)}
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
                        <Badge className={getPriorityColor(task.priority)} size="sm">
                          {getPriorityIcon(task.priority)}
                          <span className="ml-1 capitalize">{task.priority}</span>
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" size="sm" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="" alt={task.assignee} />
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {getInitials(task.assignee)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground truncate">
                            {task.assignee}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{task.comments}</span>
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
    </div>
  );
}
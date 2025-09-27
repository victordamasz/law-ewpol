import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { 
  ArrowLeft, 
  Edit, 
  Calendar,
  FileText,
  CheckSquare,
  Users,
  ClipboardList,
  Scale,
  Eye,
  Download,
  Plus,
  Clock,
  User
} from "lucide-react";
import { Link } from "wouter";

export function ProcessViewPage() {
  const [activeTab, setActiveTab] = useState("dados");

  // Dados fictícios do processo
  const processData = {
    id: "1",
    processNumber: "1001234-56.2024.8.26.0100",
    processType: "Cível",
    court: "1ª Vara Cível Central - São Paulo",
    subject: "Indenização por Danos Morais",
    status: "ativo",
    clientName: "Maria Silva Santos",
    startDate: "2024-01-15",
    value: 50000,
    responsibleLawyer: "Dr. João Silva",
    description: "Processo de indenização por danos morais decorrentes de acidente de trânsito. Cliente foi vítima de colisão causada por terceiro.",
    phase: "Instrução",
    progress: 65
  };

  // Dados fictícios dos movimentos
  const movements = [
    {
      id: "1",
      date: "2024-12-15",
      description: "Juntada de documentos pela parte autora",
      type: "Juntada",
      author: "Dr. João Silva"
    },
    {
      id: "2", 
      date: "2024-12-10",
      description: "Citação da parte requerida",
      type: "Citação",
      author: "Oficial de Justiça"
    },
    {
      id: "3",
      date: "2024-11-25",
      description: "Distribuição do processo",
      type: "Distribuição",
      author: "Sistema"
    }
  ];

  // Dados fictícios das audiências
  const hearings = [
    {
      id: "1",
      date: "2024-12-20",
      time: "14:00",
      type: "Audiência de Conciliação",
      status: "agendada",
      location: "Sala 201 - 1ª Vara Cível"
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "10:00", 
      type: "Audiência de Instrução",
      status: "realizada",
      location: "Sala 201 - 1ª Vara Cível"
    }
  ];

  // Dados fictícios dos documentos
  const documents = [
    {
      id: "1",
      name: "Petição Inicial",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "2024-01-15",
      category: "Petições"
    },
    {
      id: "2",
      name: "Procuração",
      type: "PDF", 
      size: "0.8 MB",
      uploadDate: "2024-01-15",
      category: "Procurações"
    },
    {
      id: "3",
      name: "Laudo Médico",
      type: "PDF",
      size: "2.1 MB", 
      uploadDate: "2024-02-10",
      category: "Documentos"
    }
  ];

  // Dados fictícios das tarefas
  const tasks = [
    {
      id: "1",
      title: "Preparar contestação",
      description: "Elaborar peça de contestação com base nos documentos juntados",
      status: "pendente",
      priority: "alta",
      dueDate: "2024-12-25",
      assignedTo: "Dr. João Silva"
    },
    {
      id: "2",
      title: "Revisar documentos médicos",
      description: "Analisar laudos médicos apresentados pela parte contrária",
      status: "em_andamento", 
      priority: "media",
      dueDate: "2024-12-22",
      assignedTo: "Dra. Ana Costa"
    },
    {
      id: "3",
      title: "Agendar perícia técnica",
      description: "Solicitar agendamento de perícia técnica no veículo",
      status: "concluida",
      priority: "baixa",
      dueDate: "2024-12-15",
      assignedTo: "Dr. João Silva"
    }
  ];

  const movementColumns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString('pt-BR')
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.type}</Badge>
      )
    },
    {
      accessorKey: "description", 
      header: "Descrição"
    },
    {
      accessorKey: "author",
      header: "Autor"
    }
  ];

  const hearingColumns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString('pt-BR')
    },
    {
      accessorKey: "time",
      header: "Horário"
    },
    {
      accessorKey: "type",
      header: "Tipo"
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={row.original.status === "agendada" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
          {row.original.status}
        </Badge>
      )
    },
    {
      accessorKey: "location",
      header: "Local"
    }
  ];

  const documentColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Nome"
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      )
    },
    {
      accessorKey: "type",
      header: "Tipo"
    },
    {
      accessorKey: "size",
      header: "Tamanho"
    },
    {
      accessorKey: "uploadDate",
      header: "Data",
      cell: ({ row }) => new Date(row.original.uploadDate).toLocaleDateString('pt-BR')
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const taskColumns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Título"
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case "pendente": return "bg-yellow-100 text-yellow-800";
            case "em_andamento": return "bg-blue-100 text-blue-800";
            case "concluida": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
          }
        };
        return (
          <Badge className={getStatusColor(row.original.status)}>
            {row.original.status.replace("_", " ")}
          </Badge>
        );
      }
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => {
        const getPriorityColor = (priority: string) => {
          switch (priority) {
            case "alta": return "bg-red-100 text-red-800";
            case "media": return "bg-yellow-100 text-yellow-800";
            case "baixa": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
          }
        };
        return (
          <Badge className={getPriorityColor(row.original.priority)}>
            {row.original.priority}
          </Badge>
        );
      }
    },
    {
      accessorKey: "dueDate",
      header: "Prazo",
      cell: ({ row }) => new Date(row.original.dueDate).toLocaleDateString('pt-BR')
    },
    {
      accessorKey: "assignedTo",
      header: "Responsável"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-chart-3/10 text-chart-3";
      case "concluido": return "bg-chart-1/10 text-chart-1";
      case "suspenso": return "bg-chart-5/10 text-chart-5";
      case "arquivado": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/processes">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Detalhes do Processo</h1>
          <p className="text-muted-foreground font-mono">{processData.processNumber}</p>
        </div>
        <Link href={`/processes/${processData.id}/edit`}>
          <Button data-testid="button-edit-process">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      {/* Informações básicas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              {processData.subject}
            </CardTitle>
            <Badge className={getStatusColor(processData.status)}>
              {processData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{processData.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p className="font-medium">{processData.processType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor da Causa</p>
              <p className="font-medium text-primary">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(processData.value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responsável</p>
              <p className="font-medium">{processData.responsibleLawyer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs com detalhes */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dados" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Dados
          </TabsTrigger>
          <TabsTrigger value="movimentos" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Movimentos
          </TabsTrigger>
          <TabsTrigger value="audiencias" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Audiências
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="tarefas" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Tarefas
          </TabsTrigger>
          <TabsTrigger value="outros" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Outros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Detalhadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tribunal/Vara</p>
                  <p className="font-medium">{processData.court}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Início</p>
                  <p className="font-medium">{new Date(processData.startDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fase Processual</p>
                  <p className="font-medium">{processData.phase}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progresso</p>
                  <p className="font-medium">{processData.progress}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="mt-1">{processData.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimentações Processuais</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={movementColumns}
                data={movements}
                searchKey="description"
                searchPlaceholder="Pesquisar movimentações..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audiencias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Audiências</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Audiência
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={hearingColumns}
                data={hearings}
                searchKey="type"
                searchPlaceholder="Pesquisar audiências..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documentos</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Documento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={documentColumns}
                data={documents}
                searchKey="name"
                searchPlaceholder="Pesquisar documentos..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tarefas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tarefas</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={taskColumns}
                data={tasks}
                searchKey="title"
                searchPlaceholder="Pesquisar tarefas..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outros" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Vinculados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{processData.clientName}</p>
                    <p className="text-sm text-muted-foreground">Cliente Principal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipe Jurídica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{processData.responsibleLawyer}</p>
                      <p className="text-sm text-muted-foreground">Advogado Responsável</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
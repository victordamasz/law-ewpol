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
  FileText,
  CheckSquare,
  Users,
  ClipboardList,
  Shield,
  Eye,
  Download,
  Plus,
  Stethoscope,
  Clock,
  User
} from "lucide-react";
import { Link } from "wouter";

export function PedidoInssViewPage() {
  const [activeTab, setActiveTab] = useState("dados");

  // Dados fictícios do pedido INSS
  const pedidoData = {
    id: "1",
    requestNumber: "87654321098",
    requestType: "Auxílio-Doença",
    clientName: "Maria Silva Santos",
    status: "em_analise",
    requestDate: "2024-01-15",
    value: 1500,
    responsibleLawyer: "Dr. João Silva",
    description: "Pedido de auxílio-doença por lesão na coluna decorrente de acidente de trabalho.",
    medicalEvidence: "Laudo médico comprovando lesão na coluna vertebral",
    workHistory: "15 anos de contribuição como operário da construção civil"
  };

  // Dados fictícios dos movimentos
  const movements = [
    {
      id: "1",
      date: "2024-12-15",
      description: "Análise médica agendada",
      type: "Perícia Médica",
      author: "INSS"
    },
    {
      id: "2", 
      date: "2024-02-10",
      description: "Documentação complementar enviada",
      type: "Juntada",
      author: "Dr. João Silva"
    },
    {
      id: "3",
      date: "2024-01-15",
      description: "Pedido protocolado no INSS",
      type: "Protocolo",
      author: "Sistema INSS"
    }
  ];

  // Dados fictícios das perícias
  const pericias = [
    {
      id: "1",
      date: "2024-12-20",
      type: "Perícia Médica",
      status: "agendada",
      doctor: "Dr. Carlos Medeiros",
      location: "APS - Agência da Previdência Social SP"
    },
    {
      id: "2",
      date: "2024-03-15",
      type: "Avaliação Inicial",
      status: "realizada", 
      doctor: "Dra. Fernanda Lima",
      location: "APS - Agência da Previdência Social SP"
    }
  ];

  // Dados fictícios dos documentos
  const documents = [
    {
      id: "1",
      name: "Formulário de Requerimento",
      type: "PDF",
      size: "0.8 MB",
      uploadDate: "2024-01-15",
      category: "Requerimentos"
    },
    {
      id: "2",
      name: "Laudo Médico - Ortopedia",
      type: "PDF", 
      size: "1.2 MB",
      uploadDate: "2024-01-15",
      category: "Laudos Médicos"
    },
    {
      id: "3",
      name: "CTPS - Carteira de Trabalho",
      type: "PDF",
      size: "2.1 MB", 
      uploadDate: "2024-01-16",
      category: "Documentos Pessoais"
    },
    {
      id: "4",
      name: "Exames Radiológicos",
      type: "PDF",
      size: "3.5 MB", 
      uploadDate: "2024-02-10",
      category: "Exames"
    }
  ];

  // Dados fictícios das tarefas
  const tasks = [
    {
      id: "1",
      title: "Acompanhar perícia médica",
      description: "Acompanhar cliente na perícia médica agendada",
      status: "pendente",
      priority: "alta",
      dueDate: "2024-12-20",
      assignedTo: "Dr. João Silva"
    },
    {
      id: "2",
      title: "Preparar documentação adicional",
      description: "Reunir documentos complementares solicitados pelo INSS",
      status: "em_andamento", 
      priority: "media",
      dueDate: "2024-12-18",
      assignedTo: "Paralegal Maria"
    },
    {
      id: "3",
      title: "Análise do CNIS",
      description: "Revisar Cadastro Nacional de Informações Sociais",
      status: "concluida",
      priority: "alta",
      dueDate: "2024-02-05",
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

  const periciaColumns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString('pt-BR')
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
      accessorKey: "doctor",
      header: "Médico"
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
      case "em_analise": return "bg-blue-100 text-blue-800";
      case "deferido": return "bg-green-100 text-green-800";
      case "indeferido": return "bg-red-100 text-red-800";
      case "recurso": return "bg-yellow-100 text-yellow-800";
      default: return "bg-secondary text-secondary-foreground";
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/pedidos-inss">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Detalhes do Pedido INSS
          </h1>
          <p className="text-muted-foreground font-mono">{pedidoData.requestNumber}</p>
        </div>
        <Link href={`/pedidos-inss/${pedidoData.id}/edit`}>
          <Button data-testid="button-edit-pedido">
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
              <Shield className="h-5 w-5" />
              {pedidoData.requestType}
            </CardTitle>
            <Badge className={getStatusColor(pedidoData.status)}>
              {getStatusLabel(pedidoData.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{pedidoData.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo de Benefício</p>
              <p className="font-medium">{pedidoData.requestType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Estimado</p>
              <p className="font-medium text-primary">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(pedidoData.value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responsável</p>
              <p className="font-medium">{pedidoData.responsibleLawyer}</p>
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
          <TabsTrigger value="pericias" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Perícias
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Detalhadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data do Pedido</p>
                  <p className="font-medium">{new Date(pedidoData.requestDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Descrição</p>
                  <p className="mt-1">{pedidoData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações Médicas e Trabalhistas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Evidências Médicas</p>
                  <p className="mt-1">{pedidoData.medicalEvidence}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Histórico Trabalhista</p>
                  <p className="mt-1">{pedidoData.workHistory}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movimentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimentações do Pedido</CardTitle>
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

        <TabsContent value="pericias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Perícias Médicas</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Perícia
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={periciaColumns}
                data={pericias}
                searchKey="type"
                searchPlaceholder="Pesquisar perícias..."
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
                <CardTitle>Cliente Vinculado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{pedidoData.clientName}</p>
                    <p className="text-sm text-muted-foreground">Requerente do Benefício</p>
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
                      <p className="font-medium">{pedidoData.responsibleLawyer}</p>
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
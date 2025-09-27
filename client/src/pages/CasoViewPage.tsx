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
  Briefcase,
  Eye,
  Download,
  Plus,
  Gavel,
  Target
} from "lucide-react";
import { Link } from "wouter";

export function CasoViewPage() {
  const [activeTab, setActiveTab] = useState("dados");

  // Dados fictícios do caso
  const casoData = {
    id: "1",
    caseNumber: "CASO-2024-001",
    title: "Consultoria Empresarial - Fusão de Empresas",
    caseType: "Empresarial",
    status: "em_andamento",
    priority: "alta",
    clientName: "Maria Silva Santos",
    responsibleLawyer: "Dr. João Silva",
    createdAt: "2024-01-15",
    description: "Consultoria jurídica para processo de fusão entre duas empresas do setor tecnológico",
    facts: "Cliente possui duas empresas que desejam se fundir. Ambas atuam no setor de tecnologia e há necessidade de análise regulatória.",
    legalBasis: "Lei das S.A., regulamentações do CADE",
    strategy: "Análise prévia dos aspectos concorrenciais, estruturação da operação e acompanhamento regulatório",
    expectedOutcome: "Fusão aprovada pelos órgãos competentes sem restrições"
  };

  // Dados fictícios dos movimentos
  const movements = [
    {
      id: "1",
      date: "2024-12-15",
      description: "Reunião com cliente para definir estrutura da operação",
      type: "Reunião",
      author: "Dr. João Silva"
    },
    {
      id: "2", 
      date: "2024-12-10",
      description: "Análise preliminar da documentação societária",
      type: "Análise",
      author: "Paralegal Maria"
    },
    {
      id: "3",
      date: "2024-01-15",
      description: "Abertura do caso e primeira análise",
      type: "Abertura",
      author: "Dr. João Silva"
    }
  ];

  // Dados fictícios das perícias/pareceres
  const pericias = [
    {
      id: "1",
      date: "2024-12-20",
      type: "Parecer Concorrencial",
      status: "em_andamento",
      expert: "Dr. Roberto Concorrência",
      subject: "Análise de impacto concorrencial da fusão"
    },
    {
      id: "2",
      date: "2024-02-15",
      type: "Due Diligence Jurídica",
      status: "concluido", 
      expert: "Equipe Jurídica",
      subject: "Análise completa da documentação das empresas"
    }
  ];

  // Dados fictícios dos documentos
  const documents = [
    {
      id: "1",
      name: "Contrato Social - Empresa A",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-15",
      category: "Documentos Societários"
    },
    {
      id: "2",
      name: "Contrato Social - Empresa B",
      type: "PDF", 
      size: "1.5 MB",
      uploadDate: "2024-01-15",
      category: "Documentos Societários"
    },
    {
      id: "3",
      name: "Parecer Jurídico Preliminar",
      type: "PDF",
      size: "2.1 MB", 
      uploadDate: "2024-02-10",
      category: "Pareceres"
    },
    {
      id: "4",
      name: "Minuta de Protocolo de Fusão",
      type: "DOC",
      size: "0.8 MB", 
      uploadDate: "2024-12-05",
      category: "Minutas"
    }
  ];

  // Dados fictícios das tarefas
  const tasks = [
    {
      id: "1",
      title: "Submeter operação ao CADE",
      description: "Preparar e submeter notificação de ato de concentração",
      status: "pendente",
      priority: "alta",
      dueDate: "2024-12-25",
      assignedTo: "Dr. João Silva"
    },
    {
      id: "2",
      title: "Revisar minuta de protocolo",
      description: "Revisar e ajustar minuta de protocolo de fusão",
      status: "em_andamento", 
      priority: "media",
      dueDate: "2024-12-20",
      assignedTo: "Dra. Ana Costa"
    },
    {
      id: "3",
      title: "Due diligence inicial",
      description: "Realizar análise inicial da documentação",
      status: "concluida",
      priority: "alta",
      dueDate: "2024-02-15",
      assignedTo: "Equipe Jurídica"
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
        <Badge className={row.original.status === "em_andamento" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
          {row.original.status.replace("_", " ")}
        </Badge>
      )
    },
    {
      accessorKey: "expert",
      header: "Especialista"
    },
    {
      accessorKey: "subject",
      header: "Objeto"
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
      case "aberto": return "bg-blue-100 text-blue-800";
      case "em_andamento": return "bg-yellow-100 text-yellow-800";
      case "concluido": return "bg-green-100 text-green-800";
      case "arquivado": return "bg-gray-100 text-gray-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente": return "bg-red-100 text-red-800";
      case "alta": return "bg-orange-100 text-orange-800";
      case "media": return "bg-yellow-100 text-yellow-800";
      case "baixa": return "bg-green-100 text-green-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/casos">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-8 w-8" />
            Detalhes do Caso
          </h1>
          <p className="text-muted-foreground font-mono">{casoData.caseNumber}</p>
        </div>
        <Link href={`/casos/${casoData.id}/edit`}>
          <Button data-testid="button-edit-caso">
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
              <Briefcase className="h-5 w-5" />
              {casoData.title}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={getStatusColor(casoData.status)}>
                {casoData.status.replace("_", " ")}
              </Badge>
              <Badge className={getPriorityColor(casoData.priority)}>
                {casoData.priority}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{casoData.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo de Caso</p>
              <p className="font-medium">{casoData.caseType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Abertura</p>
              <p className="font-medium">{new Date(casoData.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responsável</p>
              <p className="font-medium">{casoData.responsibleLawyer}</p>
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
            <Gavel className="h-4 w-4" />
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
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Descrição</p>
                  <p className="mt-1">{casoData.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fatos Relevantes</p>
                  <p className="mt-1">{casoData.facts}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise Jurídica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Base Legal</p>
                  <p className="mt-1">{casoData.legalBasis}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estratégia</p>
                  <p className="mt-1">{casoData.strategy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resultado Esperado</p>
                  <p className="mt-1">{casoData.expectedOutcome}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movimentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimentações do Caso</CardTitle>
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
                <CardTitle>Perícias e Pareceres</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Perícia
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
                    <p className="font-medium">{casoData.clientName}</p>
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
                      <p className="font-medium">{casoData.responsibleLawyer}</p>
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
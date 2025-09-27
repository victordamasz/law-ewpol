import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Printer, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Calendar,
  FileText,
  DollarSign,
  Folder,
  Clock,
  CheckSquare
} from "lucide-react";
import { Link, useParams } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  profession: string;
  maritalStatus: string;
  nationality: string;
  address: string;
  status: string;
  createdAt: string;
  notes: string;
}

export function ClientViewPage() {
  const { toast } = useToast();
  const params = useParams();
  const clientId = params.id;
  
  const [client, setClient] = useState<ClientData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Dados estáticos simulando o cliente
  useEffect(() => {
    const mockClient: ClientData = {
      id: clientId || "1",
      name: "Maria Silva Santos",
      email: "maria.silva@email.com",
      phone: "(11) 99999-1234",
      cpf: "123.456.789-01",
      rg: "12.345.678-9",
      birthDate: "1985-03-15",
      profession: "Professora",
      maritalStatus: "Casada",
      nationality: "Brasileira",
      address: "Rua das Flores, 123 - Centro - São Paulo, SP - 01234-567",
      status: "ativo",
      createdAt: "2023-01-15",
      notes: "Cliente preferencial. Sempre pontual nos pagamentos. Tem histórico de casos trabalhistas."
    };
    
    setClient(mockClient);
  }, [clientId]);

  // Dados estáticos para as abas
  const mockProcesses = [
    {
      id: "1",
      number: "1234567-89.2024.5.02.0001",
      type: "Trabalhista",
      court: "2ª Vara do Trabalho de São Paulo",
      subject: "Horas extras não pagas",
      status: "Em andamento",
      startDate: "2024-01-15",
      value: "R$ 25.000,00"
    },
    {
      id: "2", 
      number: "9876543-21.2023.8.26.0100",
      type: "Cível",
      court: "1ª Vara Cível Central SP",
      subject: "Cobrança de honorários",
      status: "Arquivado",
      startDate: "2023-08-20",
      value: "R$ 15.000,00"
    }
  ];

  const mockCases = [
    {
      id: "1",
      number: "CASO-2024-001",
      title: "Rescisão Indevida",
      description: "Análise de rescisão contratual sem justa causa",
      type: "Trabalhista",
      status: "Em andamento",
      priority: "Alta",
      lawyer: "Dr. João Oliveira"
    },
    {
      id: "2",
      number: "CASO-2023-045",
      title: "Acidente de Trabalho",
      description: "Processo de indenização por acidente de trabalho",
      type: "Previdenciário",
      status: "Concluído",
      priority: "Média",
      lawyer: "Dra. Ana Costa"
    }
  ];

  const mockInssRequests = [
    {
      id: "1",
      number: "87654321/2024-01",
      type: "Aposentadoria por Tempo de Contribuição",
      status: "Em análise",
      requestDate: "2024-02-10",
      expectedValue: "R$ 3.500,00"
    },
    {
      id: "2",
      number: "12345678/2023-12",
      type: "Auxílio-doença",
      status: "Deferido",
      requestDate: "2023-12-05",
      expectedValue: "R$ 1.200,00"
    }
  ];

  const mockFinancials = [
    {
      id: "1",
      type: "Receita",
      description: "Honorários contratuais - Janeiro/2024",
      amount: "R$ 2.500,00",
      dueDate: "2024-01-31",
      status: "Pago",
      category: "Honorários"
    },
    {
      id: "2",
      type: "Despesa",
      description: "Custas processuais",
      amount: "R$ 450,00",
      dueDate: "2024-02-15",
      status: "Pendente",
      category: "Custas"
    }
  ];

  const mockDocuments = [
    {
      id: "1",
      name: "Contrato de Prestação de Serviços",
      type: "Contrato",
      uploadDate: "2024-01-15",
      size: "2.3 MB"
    },
    {
      id: "2",
      name: "Procuração",
      type: "Procuração",
      uploadDate: "2024-01-15",
      size: "1.2 MB"
    },
    {
      id: "3",
      name: "Certidão de Nascimento",
      type: "Documento Pessoal",
      uploadDate: "2024-01-20",
      size: "0.8 MB"
    }
  ];

  const mockSchedule = [
    {
      id: "1",
      title: "Audiência Trabalhista",
      type: "Audiência",
      date: "2024-03-15",
      time: "14:30",
      location: "2ª Vara do Trabalho de São Paulo",
      status: "Agendado"
    },
    {
      id: "2",
      title: "Reunião de acompanhamento",
      type: "Reunião",
      date: "2024-03-10",
      time: "10:00",
      location: "Escritório",
      status: "Realizado"
    }
  ];

  const mockTasks = [
    {
      id: "1",
      title: "Preparar documentos para audiência",
      description: "Organizar toda documentação necessária",
      priority: "Alta",
      status: "Em andamento",
      dueDate: "2024-03-12",
      assignedTo: "Dr. João Oliveira"
    },
    {
      id: "2",
      title: "Análise de contratos",
      description: "Revisar cláusulas contratuais",
      priority: "Média", 
      status: "Pendente",
      dueDate: "2024-03-20",
      assignedTo: "Dra. Ana Costa"
    }
  ];

  const handlePrint = () => {
    window.print();
    toast({
      title: "Imprimindo dados do cliente",
      description: "A página será impressa com todas as informações do cliente.",
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    toast({
      title: "Cliente excluído",
      description: "Os dados do cliente foram removidos do sistema.",
      variant: "destructive",
    });
    setShowDeleteModal(false);
    // Redirecionar para lista de clientes
    window.location.href = "/clients";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ativo": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inativo": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "em andamento": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "arquivado": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "concluído": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pendente": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "pago": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  if (!client) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="space-y-6 p-6 print:p-0">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/clients">
            <Button variant="outline" size="sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Perfil do Cliente</h1>
            <p className="text-muted-foreground">Informações completas e histórico</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} data-testid="button-print">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Link href={`/clients/${client.id}/edit`}>
            <Button variant="outline" data-testid="button-edit">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Button variant="outline" onClick={handleDelete} data-testid="button-delete">
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Informações Básicas */}
      <Card className="print:shadow-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={client.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{client.name}</h2>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{client.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>CPF: {client.cpf}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>RG: {client.rg}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Nascimento: {new Date(client.birthDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">Profissão:</span>
                  <p className="text-muted-foreground">{client.profession}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Estado Civil:</span>
                  <p className="text-muted-foreground">{client.maritalStatus}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Nacionalidade:</span>
                  <p className="text-muted-foreground">{client.nationality}</p>
                </div>
              </div>
              
              {client.notes && (
                <>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Observações:</span>
                    <p className="text-muted-foreground mt-1">{client.notes}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas de Conteúdo */}
      <Tabs defaultValue="processes" className="print:hidden">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="processes">Processos</TabsTrigger>
          <TabsTrigger value="cases">Casos</TabsTrigger>
          <TabsTrigger value="inss">INSS</TabsTrigger>
          <TabsTrigger value="financials">Financeiro</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="schedule">Agenda</TabsTrigger>
        </TabsList>

        {/* Processos */}
        <TabsContent value="processes" className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Processos Vinculados</h3>
          </div>
          {mockProcesses.map((process) => (
            <Card key={process.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{process.number}</h4>
                    <p className="text-sm text-muted-foreground">{process.subject}</p>
                  </div>
                  <Badge className={getStatusColor(process.status)}>
                    {process.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p className="text-muted-foreground">{process.type}</p>
                  </div>
                  <div>
                    <span className="font-medium">Comarca:</span>
                    <p className="text-muted-foreground">{process.court}</p>
                  </div>
                  <div>
                    <span className="font-medium">Início:</span>
                    <p className="text-muted-foreground">{new Date(process.startDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Valor:</span>
                    <p className="text-muted-foreground">{process.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Casos */}
        <TabsContent value="cases" className="space-y-4">
          <div className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Casos Vinculados</h3>
          </div>
          {mockCases.map((case_item) => (
            <Card key={case_item.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{case_item.title}</h4>
                    <p className="text-sm text-muted-foreground">{case_item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(case_item.status)}>
                      {case_item.status}
                    </Badge>
                    <Badge variant="outline">
                      {case_item.priority}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Número:</span>
                    <p className="text-muted-foreground">{case_item.number}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p className="text-muted-foreground">{case_item.type}</p>
                  </div>
                  <div>
                    <span className="font-medium">Responsável:</span>
                    <p className="text-muted-foreground">{case_item.lawyer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* INSS */}
        <TabsContent value="inss" className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Pedidos INSS</h3>
          </div>
          {mockInssRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{request.type}</h4>
                    <p className="text-sm text-muted-foreground">Protocolo: {request.number}</p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Data do Pedido:</span>
                    <p className="text-muted-foreground">{new Date(request.requestDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Valor Esperado:</span>
                    <p className="text-muted-foreground">{request.expectedValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Financeiro */}
        <TabsContent value="financials" className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Movimentação Financeira</h3>
          </div>
          {mockFinancials.map((financial) => (
            <Card key={financial.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{financial.description}</h4>
                    <p className="text-sm text-muted-foreground">Categoria: {financial.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${financial.type === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {financial.type === 'Receita' ? '+' : '-'} {financial.amount}
                    </p>
                    <Badge className={getStatusColor(financial.status)}>
                      {financial.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Vencimento:</span>
                  <span className="text-muted-foreground ml-2">{new Date(financial.dueDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Documentos */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Documentos</h3>
          </div>
          {mockDocuments.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{document.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {document.type} • {document.size} • {new Date(document.uploadDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Visualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Agenda */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Agenda e Tarefas</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Compromissos
              </h4>
              {mockSchedule.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('pt-BR')} às {item.time}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Tarefas
              </h4>
              {mockTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold">{task.title}</h5>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge variant="outline">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Prazo:</span>
                        <p className="text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <span className="font-medium">Responsável:</span>
                        <p className="text-muted-foreground">{task.assignedTo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Confirmar Exclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Tem certeza que deseja excluir o cliente <strong>{client.name}</strong>?
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Esta ação não pode ser desfeita. Todos os dados relacionados serão removidos.
              </p>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteModal(false)}
                  data-testid="button-cancel-delete"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDelete}
                  data-testid="button-confirm-delete"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
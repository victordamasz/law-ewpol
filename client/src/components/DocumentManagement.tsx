import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { 
  Search, 
  Plus, 
  Edit,
  Eye,
  Filter,
  FileText,
  MoreHorizontal,
  Download,
  Printer,
  Trash2,
  Copy,
  FileType
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: "template" | "document";
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  status: string;
  clientId?: string;
  processId?: string;
}

export function DocumentManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [activeTab, setActiveTab] = useState("documentos");
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    content: ""
  });
  const [newDocument, setNewDocument] = useState({
    name: "",
    templateId: "",
    clientId: "",
    processId: "",
    content: ""
  });

  // Dados fictícios dos documentos
  const mockDocuments: Document[] = [
    {
      id: "1",
      name: "Procuração Ad Judicia - Maria Silva",
      type: "document",
      category: "Procurações",
      content: "Conteúdo da procuração...",
      createdAt: "2024-12-15",
      updatedAt: "2024-12-15",
      author: "Dr. João Silva",
      status: "finalizado",
      clientId: "1",
      processId: "1"
    },
    {
      id: "2",
      name: "Template - Contrato de Honorários",
      type: "template",
      category: "Contratos",
      content: "Template de contrato de honorários advocatícios...",
      createdAt: "2024-01-10",
      updatedAt: "2024-12-10",
      author: "Dra. Ana Costa",
      status: "ativo"
    },
    {
      id: "3",
      name: "Petição Inicial - Danos Morais",
      type: "document",
      category: "Petições",
      content: "Petição inicial para ação de danos morais...",
      createdAt: "2024-12-12",
      updatedAt: "2024-12-14",
      author: "Dr. João Silva",
      status: "em_revisao",
      clientId: "1",
      processId: "1"
    },
    {
      id: "4",
      name: "Template - Procuração Geral",
      type: "template",
      category: "Procurações",
      content: "Template de procuração geral...",
      createdAt: "2024-02-15",
      updatedAt: "2024-11-20",
      author: "Dr. Pedro Oliveira",
      status: "ativo"
    },
    {
      id: "5",
      name: "Contrato de Honorários - Carlos Lima",
      type: "document",
      category: "Contratos",
      content: "Contrato de prestação de serviços advocatícios...",
      createdAt: "2024-12-08",
      updatedAt: "2024-12-08",
      author: "Dra. Ana Costa",
      status: "finalizado",
      clientId: "4"
    }
  ];

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileType className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.type === "template" ? "Template" : "Documento"}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "author",
      header: "Autor",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={getStatusColor(row.original.status)}>
          {getStatusLabel(row.original.status)}
        </Badge>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Última Atualização",
      cell: ({ row }) => (
        <div>{new Date(row.original.updatedAt).toLocaleDateString('pt-BR')}</div>
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
            onClick={() => handleViewDocument(row.original)}
            data-testid={`button-view-doc-${row.original.id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/documents/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" data-testid={`button-edit-doc-${row.original.id}`}>
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownload(row.original.id)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePrint(row.original.id)}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </DropdownMenuItem>
              {row.original.type === "template" && (
                <DropdownMenuItem onClick={() => handleDuplicateTemplate(row.original.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicar
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "todos" || 
                         (selectedFilter === "templates" && doc.type === "template") ||
                         (selectedFilter === "documents" && doc.type === "document") ||
                         doc.status === selectedFilter;
    
    const matchesTab = activeTab === "documentos" || 
                      (activeTab === "templates" && doc.type === "template") ||
                      (activeTab === "recentes" && isRecent(doc.updatedAt));
    
    return matchesSearch && matchesFilter && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-800";
      case "finalizado": return "bg-blue-100 text-blue-800";
      case "em_revisao": return "bg-yellow-100 text-yellow-800";
      case "rascunho": return "bg-gray-100 text-gray-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo": return "Ativo";
      case "finalizado": return "Finalizado";
      case "em_revisao": return "Em Revisão";
      case "rascunho": return "Rascunho";
      default: return status;
    }
  };

  const isRecent = (date: string) => {
    const docDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - docDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Últimos 7 dias
  };

  const handleNewTemplate = () => {
    toast({
      title: "Template criado!",
      description: `Template "${newTemplate.name}" foi criado com sucesso.`,
    });
    setShowNewTemplateModal(false);
    setNewTemplate({
      name: "",
      category: "",
      content: ""
    });
  };

  const handleNewDocument = () => {
    toast({
      title: "Documento criado!",
      description: `Documento "${newDocument.name}" foi criado com sucesso.`,
    });
    setShowNewDocumentModal(false);
    setNewDocument({
      name: "",
      templateId: "",
      clientId: "",
      processId: "",
      content: ""
    });
  };

  const handleViewDocument = (doc: Document) => {
    toast({
      title: "Visualizar documento",
      description: `Abrindo documento: ${doc.name}`,
    });
  };

  const handleDownload = (id: string) => {
    toast({
      title: "Download iniciado",
      description: "O documento está sendo baixado.",
    });
  };

  const handlePrint = (id: string) => {
    toast({
      title: "Imprimindo documento",
      description: "O documento foi enviado para impressão.",
    });
  };

  const handleDuplicateTemplate = (id: string) => {
    toast({
      title: "Template duplicado",
      description: "Uma cópia do template foi criada.",
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Documento excluído",
      description: "O documento foi removido do sistema.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Documentos
          </h1>
          <p className="text-muted-foreground">Gerencie documentos, templates e contratos</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showNewTemplateModal} onOpenChange={setShowNewTemplateModal}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-add-template">
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Nome do Template</Label>
                    <Input
                      id="templateName"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="Nome do template"
                      data-testid="input-template-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateCategory">Categoria</Label>
                    <Select onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contratos">Contratos</SelectItem>
                        <SelectItem value="procuracoes">Procurações</SelectItem>
                        <SelectItem value="peticoes">Petições</SelectItem>
                        <SelectItem value="pareceres">Pareceres</SelectItem>
                        <SelectItem value="oficios">Ofícios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="templateContent">Conteúdo do Template</Label>
                  <Textarea
                    id="templateContent"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    placeholder="Digite o conteúdo do template..."
                    className="min-h-32"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewTemplateModal(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleNewTemplate} data-testid="button-save-template">
                    Salvar Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewDocumentModal} onOpenChange={setShowNewDocumentModal}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-document">
                <Plus className="h-4 w-4 mr-2" />
                Novo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Documento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentName">Nome do Documento</Label>
                    <Input
                      id="documentName"
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                      placeholder="Nome do documento"
                      data-testid="input-document-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateId">Template Base</Label>
                    <Select onValueChange={(value) => setNewDocument({...newDocument, templateId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">Template - Contrato de Honorários</SelectItem>
                        <SelectItem value="4">Template - Procuração Geral</SelectItem>
                        <SelectItem value="">Documento em Branco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Cliente (Opcional)</Label>
                    <Select onValueChange={(value) => setNewDocument({...newDocument, clientId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Maria Silva Santos</SelectItem>
                        <SelectItem value="2">João Oliveira Costa</SelectItem>
                        <SelectItem value="3">Ana Paula Ferreira</SelectItem>
                        <SelectItem value="4">Carlos Eduardo Lima</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processId">Processo (Opcional)</Label>
                    <Select onValueChange={(value) => setNewDocument({...newDocument, processId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um processo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1001234-56.2024.8.26.0100</SelectItem>
                        <SelectItem value="2">2002345-67.2024.5.02.0001</SelectItem>
                        <SelectItem value="3">3003456-78.2024.8.26.0224</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewDocumentModal(false)}>
                    Cancelar
                  </Button>
                  <Link href="/documents/new">
                    <Button onClick={handleNewDocument} data-testid="button-create-document">
                      Criar e Editar
                    </Button>
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documentos">Todos os Documentos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="recentes">Recentes</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar por nome, categoria ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-documents"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" data-testid="button-filter-documents">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedFilter === "todos" ? "Todos" : getStatusLabel(selectedFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("templates")}>
                  Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("documents")}>
                  Documentos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("finalizado")}>
                  Finalizados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("em_revisao")}>
                  Em Revisão
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("rascunho")}>
                  Rascunhos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Documents Table */}
          <DataTable
            columns={columns}
            data={filteredDocuments}
            searchKey="name"
            searchPlaceholder="Pesquisar documentos..."
          />

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum documento encontrado</p>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
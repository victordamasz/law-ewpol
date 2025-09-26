import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Copy,
  Trash2,
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DocumentGenerator() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientDocument: "",
    caseTitle: "",
    value: "",
    description: ""
  });

  // Todo: remove mock functionality
  const documentTemplates = [
    {
      id: 1,
      name: "Contrato de Honorários Advocatícios",
      category: "Contratos",
      description: "Modelo padrão para contratação de serviços jurídicos",
      lastUpdated: "2024-12-10",
      usageCount: 45,
      status: "ativo"
    },
    {
      id: 2,
      name: "Procuração Ad Judicia",
      category: "Procurações", 
      description: "Procuração para representação em processos judiciais",
      lastUpdated: "2024-12-08",
      usageCount: 67,
      status: "ativo"
    },
    {
      id: 3,
      name: "Declaração de Hipossuficiência",
      category: "Declarações",
      description: "Declaração para concessão de gratuidade da justiça",
      lastUpdated: "2024-12-05",
      usageCount: 23,
      status: "ativo"
    },
    {
      id: 4,
      name: "Petição Inicial Trabalhista",
      category: "Petições",
      description: "Modelo para ações trabalhistas básicas",
      lastUpdated: "2024-11-30",
      usageCount: 34,
      status: "ativo"
    },
    {
      id: 5,
      name: "Acordo Extrajudicial",
      category: "Contratos",
      description: "Modelo para acordos entre as partes",
      lastUpdated: "2024-11-28",
      usageCount: 12,
      status: "rascunho"
    }
  ];

  const recentDocuments = [
    {
      id: 1,
      name: "Contrato_Silva_20241210.pdf",
      template: "Contrato de Honorários Advocatícios",
      client: "Maria Silva",
      createdAt: "2024-12-10 14:30",
      status: "finalizado"
    },
    {
      id: 2,
      name: "Procuracao_Costa_20241210.pdf", 
      template: "Procuração Ad Judicia",
      client: "João Costa",
      createdAt: "2024-12-10 10:15",
      status: "finalizado"
    },
    {
      id: 3,
      name: "Declaracao_Ferreira_20241209.pdf",
      template: "Declaração de Hipossuficiência",
      client: "Ana Ferreira",
      createdAt: "2024-12-09 16:45",
      status: "rascunho"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Contratos": return "bg-chart-1/10 text-chart-1";
      case "Procurações": return "bg-chart-2/10 text-chart-2";
      case "Declarações": return "bg-chart-3/10 text-chart-3";
      case "Petições": return "bg-primary/10 text-primary";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-chart-3/10 text-chart-3";
      case "rascunho": return "bg-chart-2/10 text-chart-2";
      case "finalizado": return "bg-chart-1/10 text-chart-1";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredTemplates = documentTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateDocument = () => {
    console.log('Generating document with:', formData);
    setIsDialogOpen(false);
    // Reset form
    setFormData({
      clientName: "",
      clientDocument: "",
      caseTitle: "",
      value: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerador de Documentos</h1>
          <p className="text-muted-foreground">Crie documentos jurídicos usando templates personalizados</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-template">
              <Plus className="h-4 w-4 mr-2" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Nome do Template</Label>
                <Input id="templateName" placeholder="Ex: Contrato de Prestação de Serviços" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateCategory">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contratos">Contratos</SelectItem>
                    <SelectItem value="procuracoes">Procurações</SelectItem>
                    <SelectItem value="declaracoes">Declarações</SelectItem>
                    <SelectItem value="peticoes">Petições</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateDesc">Descrição</Label>
                <Textarea 
                  id="templateDesc" 
                  placeholder="Descreva o propósito deste template..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => console.log('Create template clicked')}>
                Criar Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-templates"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Templates Disponíveis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover-elevate" data-testid={`template-card-${template.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight mb-2 truncate">
                        {template.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(template.category)} size="sm">
                          {template.category}
                        </Badge>
                        <Badge className={getStatusColor(template.status)} size="sm">
                          {template.status}
                        </Badge>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Atualizado em {new Date(template.lastUpdated).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <span>{template.usageCount} usos</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="flex-1"
                          data-testid={`button-use-template-${template.id}`}
                        >
                          Usar Template
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{template.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="clientName">Nome do Cliente</Label>
                              <Input 
                                id="clientName"
                                value={formData.clientName}
                                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                placeholder="Ex: João Silva"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="clientDocument">CPF/CNPJ</Label>
                              <Input 
                                id="clientDocument"
                                value={formData.clientDocument}
                                onChange={(e) => setFormData({...formData, clientDocument: e.target.value})}
                                placeholder="000.000.000-00"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="caseTitle">Título do Caso</Label>
                            <Input 
                              id="caseTitle"
                              value={formData.caseTitle}
                              onChange={(e) => setFormData({...formData, caseTitle: e.target.value})}
                              placeholder="Ex: Ação Trabalhista"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="value">Valor (R$)</Label>
                            <Input 
                              id="value"
                              value={formData.value}
                              onChange={(e) => setFormData({...formData, value: e.target.value})}
                              placeholder="0,00"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="description">Descrição Adicional</Label>
                            <Textarea 
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              placeholder="Informações adicionais para o documento..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleGenerateDocument}>
                            Gerar Documento
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      data-testid={`button-edit-template-${template.id}`}
                      onClick={() => console.log(`Edit template ${template.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Documentos Recentes</h2>
          
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="text-base">Últimos Gerados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="p-3 rounded-md border hover-elevate"
                    data-testid={`recent-doc-${doc.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{doc.template}</p>
                      </div>
                      <Badge className={getStatusColor(doc.status)} size="sm">
                        {doc.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Cliente: {doc.client}</span>
                      <span>{doc.createdAt}</span>
                    </div>

                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        data-testid={`button-download-doc-${doc.id}`}
                        onClick={() => console.log(`Download ${doc.name}`)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        data-testid={`button-preview-doc-${doc.id}`}
                        onClick={() => console.log(`Preview ${doc.name}`)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
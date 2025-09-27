import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Save, 
  X, 
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Download,
  Printer,
  Eye
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function DocumentEditorPage() {
  const { toast } = useToast();
  const [documentData, setDocumentData] = useState({
    name: "Novo Documento",
    category: "contratos",
    clientId: "",
    processId: "",
    templateId: "",
    content: "Digite o conteúdo do documento aqui...\n\nEste é um editor WYSIWYG simples onde você pode:\n- Formatar texto\n- Adicionar listas\n- Alinhar parágrafos\n- Definir tamanhos de fonte",
    status: "rascunho"
  });

  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setDocumentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Documento salvo!",
      description: `Documento "${documentData.name}" foi salvo com sucesso.`,
    });
  };

  const handleFormatText = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (selectedText) {
      let formattedText = selectedText;
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `__${selectedText}__`;
          break;
        default:
          break;
      }
      
      const newContent = 
        textarea.value.substring(0, start) + 
        formattedText + 
        textarea.value.substring(end);
      
      setDocumentData(prev => ({
        ...prev,
        content: newContent
      }));
      
      toast({
        title: "Formatação aplicada",
        description: `Texto formatado como ${format}`,
      });
    } else {
      toast({
        title: "Selecione o texto",
        description: "Selecione o texto que deseja formatar",
        variant: "destructive",
      });
    }
  };

  const handleInsertList = (type: 'bullet' | 'numbered') => {
    const newItem = type === 'bullet' ? '\n• Item da lista' : '\n1. Item da lista';
    setDocumentData(prev => ({
      ...prev,
      content: prev.content + newItem
    }));
  };

  const handleExport = (format: 'pdf' | 'word') => {
    toast({
      title: "Exportando documento",
      description: `Documento sendo exportado como ${format.toUpperCase()}`,
    });
  };

  const handlePrint = () => {
    toast({
      title: "Enviando para impressão",
      description: "Documento enviado para a impressora",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/documents">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Editor de Documentos
          </h1>
          <p className="text-muted-foreground">Crie e edite documentos com formatação avançada</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? "Editar" : "Visualizar"}
          </Button>
          <Button onClick={handleSave} data-testid="button-save-document">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configurações do Documento */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Documento</Label>
              <Input
                id="name"
                value={documentData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome do documento"
                data-testid="input-document-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={documentData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
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
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={documentData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="em_revisao">Em Revisão</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientId">Cliente (Opcional)</Label>
              <Select value={documentData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
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
              <Select value={documentData.processId} onValueChange={(value) => handleInputChange('processId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o processo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1001234-56.2024.8.26.0100</SelectItem>
                  <SelectItem value="2">2002345-67.2024.5.02.0001</SelectItem>
                  <SelectItem value="3">3003456-78.2024.8.26.0224</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />
            
            {/* Ações de Exportação */}
            <div className="space-y-2">
              <Label>Exportar</Label>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('word')}>
                  <Download className="h-4 w-4 mr-2" />
                  Word
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editor de Conteúdo */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Conteúdo do Documento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Barra de Ferramentas de Formatação */}
            {!isPreview && (
              <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFormatText('bold')}
                  data-testid="button-bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFormatText('italic')}
                  data-testid="button-italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFormatText('underline')}
                  data-testid="button-underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                
                <Separator orientation="vertical" className="h-6" />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertList('bullet')}
                  data-testid="button-bullet-list"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertList('numbered')}
                  data-testid="button-numbered-list"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                <Select defaultValue="14">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12pt</SelectItem>
                    <SelectItem value="14">14pt</SelectItem>
                    <SelectItem value="16">16pt</SelectItem>
                    <SelectItem value="18">18pt</SelectItem>
                    <SelectItem value="20">20pt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Área de Edição/Visualização */}
            {isPreview ? (
              <Card className="min-h-96">
                <CardContent className="p-6">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: documentData.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/__(.*?)__/g, '<u>$1</u>')
                        .replace(/\n/g, '<br>')
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <Textarea
                id="content-editor"
                value={documentData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Digite o conteúdo do documento..."
                className="min-h-96 font-mono text-sm"
                data-testid="textarea-content"
              />
            )}

            {/* Informações de Formatação */}
            {!isPreview && (
              <div className="text-xs text-muted-foreground p-2 bg-muted/20 rounded">
                <p><strong>Dicas de formatação:</strong></p>
                <p>• **texto** para negrito</p>
                <p>• *texto* para itálico</p>
                <p>• __texto__ para sublinhado</p>
                <p>• Selecione o texto e use os botões da barra de ferramentas</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
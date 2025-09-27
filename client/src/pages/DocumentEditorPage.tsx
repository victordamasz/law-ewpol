import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WysiwygEditor } from "@/components/WysiwygEditor";
import { 
  Save, 
  FileText, 
  ArrowLeft, 
  Download, 
  Printer, 
  Eye,
  Share2
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function DocumentEditorPage() {
  const [, params] = useRoute("/documents/:id/edit");
  const { toast } = useToast();
  
  const [document, setDocument] = useState({
    id: params?.id || "new",
    name: "Novo Documento",
    content: "<p>Digite aqui o conteúdo do seu documento...</p>",
    status: "rascunho",
    category: "contratos",
    lastSaved: new Date().toISOString(),
    clientId: "",
    processId: "",
    templateId: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Simular carregamento de documento existente
    if (params?.id && params.id !== "new") {
      setDocument(prev => ({
        ...prev,
        name: "Procuração Ad Judicia - Maria Silva",
        content: `
          <h2>PROCURAÇÃO AD JUDICIA</h2>
          <br>
          <p>Por este instrumento particular de procuração, <strong>MARIA SILVA SANTOS</strong>, brasileira, casada, portadora do CPF nº 123.456.789-00 e RG nº 12.345.678-9, residente e domiciliada na Rua das Flores, 123, São Paulo/SP, CEP 01234-567, nomeia e constitui como seu bastante procurador o(a) Dr(a). <strong>JOÃO SILVA</strong>, advogado, inscrito na OAB/SP sob o nº 123.456, com escritório na Rua dos Advogados, 456, São Paulo/SP.</p>
          <br>
          <p>Outorga-lhe os mais amplos poderes para:</p>
          <ul>
            <li>Propor, acompanhar e defender ações judiciais;</li>
            <li>Receber citações, intimações e notificações;</li>
            <li>Confessar, reconhecer a procedência do pedido, transigir, desistir;</li>
            <li>Firmar compromissos, dar e receber quitação;</li>
            <li>Substabelecer esta procuração, no todo ou em parte;</li>
            <li>Praticar todos os demais atos necessários ao bom e fiel desempenho do mandato.</li>
          </ul>
          <br>
          <p>Por ser verdade, firma a presente.</p>
          <br>
          <p>São Paulo, ${new Date().toLocaleDateString('pt-BR')}.</p>
          <br>
          <p style="text-align: center;">
            _________________________________<br>
            MARIA SILVA SANTOS<br>
            Outorgante
          </p>
        `,
        status: "em_revisao",
        category: "procuracoes",
        clientId: "1",
        processId: "1"
      }));
    }
  }, [params?.id]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular salvamento
    setTimeout(() => {
      setLastSavedTime(new Date());
      setIsSaving(false);
      toast({
        title: "Documento salvo!",
        description: "Suas alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  const handleDownload = () => {
    // Criar blob com o conteúdo HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${document.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1, h2 { color: #333; }
          p { margin: 10px 0; }
        </style>
      </head>
      <body>
        ${document.content}
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.name}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado",
      description: "O documento está sendo baixado.",
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${document.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1, h2 { color: #333; }
            p { margin: 10px 0; }
            @media print {
              body { margin: 20px; }
            }
          </style>
        </head>
        <body>
          ${document.content}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    
    toast({
      title: "Imprimindo documento",
      description: "O documento foi enviado para impressão.",
    });
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "rascunho": return "bg-gray-100 text-gray-800";
      case "em_revisao": return "bg-yellow-100 text-yellow-800";
      case "finalizado": return "bg-green-100 text-green-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "rascunho": return "Rascunho";
      case "em_revisao": return "Em Revisão";
      case "finalizado": return "Finalizado";
      default: return status;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/documents">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{document.name}</h1>
              <Badge className={getStatusColor(document.status)}>
                {getStatusLabel(document.status)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Editor WYSIWYG - Formatação completa de documentos jurídicos
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handlePreview}
            data-testid="button-preview-document"
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? "Editar" : "Visualizar"}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handlePrint}
            data-testid="button-print-document"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDownload}
            data-testid="button-download-document"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            data-testid="button-save-document"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="docName">Nome do Documento</Label>
              <Input
                id="docName"
                value={document.name}
                onChange={(e) => setDocument(prev => ({ ...prev, name: e.target.value }))}
                data-testid="input-document-name"
              />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select 
                value={document.category} 
                onValueChange={(value) => setDocument(prev => ({ ...prev, category: value }))}
              >
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
              <Label>Status</Label>
              <Select 
                value={document.status} 
                onValueChange={(value) => setDocument(prev => ({ ...prev, status: value }))}
                data-testid="select-document-status"
              >
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
              <Label>Cliente (Opcional)</Label>
              <Select 
                value={document.clientId} 
                onValueChange={(value) => setDocument(prev => ({ ...prev, clientId: value }))}
              >
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
              <Label>Processo (Opcional)</Label>
              <Select 
                value={document.processId} 
                onValueChange={(value) => setDocument(prev => ({ ...prev, processId: value }))}
              >
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
            
            {lastSavedTime && (
              <div className="space-y-2">
                <Label>Última Modificação</Label>
                <div className="text-xs text-muted-foreground">
                  {lastSavedTime.toLocaleString('pt-BR')}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Editor content */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo do Documento</CardTitle>
            </CardHeader>
            <CardContent>
              {isPreview ? (
                <div className="min-h-[500px] p-6 border rounded-lg bg-white">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: document.content }}
                  />
                </div>
              ) : (
                <WysiwygEditor
                  content={document.content}
                  onChange={(content) => setDocument(prev => ({ ...prev, content }))}
                  placeholder="Digite o conteúdo do documento..."
                  className="min-h-[500px]"
                />
              )}
            </CardContent>
          </Card>
          
          {/* Auto-save indicator */}
          {lastSavedTime && (
            <div className="text-xs text-muted-foreground text-center">
              Última alteração salva: {lastSavedTime.toLocaleString('pt-BR')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
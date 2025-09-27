import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function CasoEditPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    caseNumber: "CASO-2024-001",
    title: "Consultoria Empresarial - Fusão de Empresas",
    caseType: "empresarial",
    status: "em_andamento",
    priority: "alta",
    description: "Consultoria jurídica para processo de fusão entre duas empresas do setor tecnológico",
    clientId: "1",
    responsibleLawyer: "1",
    facts: "Cliente possui duas empresas que desejam se fundir. Ambas atuam no setor de tecnologia e há necessidade de análise regulatória.",
    legalBasis: "Lei das S.A., regulamentações do CADE",
    strategy: "Análise prévia dos aspectos concorrenciais, estruturação da operação e acompanhamento regulatório",
    expectedOutcome: "Fusão aprovada pelos órgãos competentes sem restrições",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Caso atualizado!",
      description: `Caso ${formData.caseNumber} foi atualizado com sucesso.`,
    });
    console.log('Caso atualizado:', formData);
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
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-8 w-8" />
            Editar Caso Jurídico
          </h1>
          <p className="text-muted-foreground">Atualize as informações do caso</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados Básicos do Caso */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caseNumber">Número do Caso *</Label>
                  <Input
                    id="caseNumber"
                    value={formData.caseNumber}
                    onChange={(e) => handleInputChange('caseNumber', e.target.value)}
                    placeholder="CASO-2024-XXX"
                    required
                    data-testid="input-case-number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseType">Tipo de Caso *</Label>
                  <Select value={formData.caseType} onValueChange={(value) => handleInputChange('caseType', value)}>
                    <SelectTrigger data-testid="select-case-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                      <SelectItem value="contratual">Contratual</SelectItem>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                      <SelectItem value="criminal">Criminal</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="tributario">Tributário</SelectItem>
                      <SelectItem value="consultoria">Consultoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger data-testid="select-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aberto">Aberto</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger data-testid="select-priority">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Título do Caso *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Título descritivo do caso"
                  required
                  data-testid="input-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição geral do caso..."
                  className="min-h-24"
                  required
                  data-testid="textarea-description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vinculações */}
          <Card>
            <CardHeader>
              <CardTitle>Vinculações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Cliente *</Label>
                <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                  <SelectTrigger data-testid="select-client">
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
                <Label htmlFor="responsibleLawyer">Advogado Responsável</Label>
                <Select value={formData.responsibleLawyer} onValueChange={(value) => handleInputChange('responsibleLawyer', value)}>
                  <SelectTrigger data-testid="select-lawyer">
                    <SelectValue placeholder="Selecione o advogado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. João Silva</SelectItem>
                    <SelectItem value="2">Dra. Ana Costa</SelectItem>
                    <SelectItem value="3">Dr. Pedro Oliveira</SelectItem>
                    <SelectItem value="4">Dra. Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Análise Jurídica */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Análise Jurídica</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facts">Fatos Relevantes</Label>
                  <Textarea
                    id="facts"
                    value={formData.facts}
                    onChange={(e) => handleInputChange('facts', e.target.value)}
                    placeholder="Descrição detalhada dos fatos relevantes ao caso..."
                    className="min-h-32"
                    data-testid="textarea-facts"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalBasis">Base Legal</Label>
                  <Textarea
                    id="legalBasis"
                    value={formData.legalBasis}
                    onChange={(e) => handleInputChange('legalBasis', e.target.value)}
                    placeholder="Legislação aplicável, jurisprudência, doutrinas..."
                    className="min-h-24"
                    data-testid="textarea-legal-basis"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strategy">Estratégia Jurídica</Label>
                  <Textarea
                    id="strategy"
                    value={formData.strategy}
                    onChange={(e) => handleInputChange('strategy', e.target.value)}
                    placeholder="Estratégia e abordagem jurídica para o caso..."
                    className="min-h-32"
                    data-testid="textarea-strategy"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedOutcome">Resultado Esperado</Label>
                  <Textarea
                    id="expectedOutcome"
                    value={formData.expectedOutcome}
                    onChange={(e) => handleInputChange('expectedOutcome', e.target.value)}
                    placeholder="Resultado esperado e objetivos do caso..."
                    className="min-h-24"
                    data-testid="textarea-expected-outcome"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Observações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Internas</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Notas internas e observações sobre o caso..."
                  className="min-h-24"
                  data-testid="textarea-notes"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/casos">
            <Button variant="outline" data-testid="button-cancel">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </Link>
          <Button type="submit" data-testid="button-save">
            <Save className="h-4 w-4 mr-2" />
            Salvar Caso
          </Button>
        </div>
      </form>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X, Shield } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function PedidoInssEditPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    requestNumber: "87654321098",
    requestType: "auxilio_doenca",
    status: "em_analise",
    requestDate: "2024-01-15",
    responseDate: "",
    value: "1500",
    description: "Pedido de auxílio-doença por lesão na coluna decorrente de acidente de trabalho.",
    clientId: "1",
    responsibleLawyer: "1",
    medicalEvidence: "Laudo médico comprovando lesão na coluna vertebral",
    workHistory: "15 anos de contribuição como operário da construção civil",
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
      title: "Pedido INSS atualizado!",
      description: `Pedido ${formData.requestNumber} foi atualizado com sucesso.`,
    });
    console.log('Pedido atualizado:', formData);
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
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Editar Pedido INSS
          </h1>
          <p className="text-muted-foreground">Atualize as informações do pedido de benefício</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados Básicos do Pedido */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requestNumber">Número do Pedido *</Label>
                  <Input
                    id="requestNumber"
                    value={formData.requestNumber}
                    onChange={(e) => handleInputChange('requestNumber', e.target.value)}
                    placeholder="00000000000"
                    required
                    data-testid="input-request-number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestType">Tipo de Benefício *</Label>
                  <Select value={formData.requestType} onValueChange={(value) => handleInputChange('requestType', value)}>
                    <SelectTrigger data-testid="select-request-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auxilio_doenca">Auxílio-Doença</SelectItem>
                      <SelectItem value="aposentadoria_tempo">Aposentadoria por Tempo de Contribuição</SelectItem>
                      <SelectItem value="aposentadoria_idade">Aposentadoria por Idade</SelectItem>
                      <SelectItem value="aposentadoria_invalidez">Aposentadoria por Invalidez</SelectItem>
                      <SelectItem value="pensao_morte">Pensão por Morte</SelectItem>
                      <SelectItem value="auxilio_acidente">Auxílio-Acidente</SelectItem>
                      <SelectItem value="bpc">Benefício de Prestação Continuada (BPC)</SelectItem>
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
                      <SelectItem value="em_analise">Em Análise</SelectItem>
                      <SelectItem value="deferido">Deferido</SelectItem>
                      <SelectItem value="indeferido">Indeferido</SelectItem>
                      <SelectItem value="recurso">Em Recurso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Valor do Benefício</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    placeholder="0,00"
                    data-testid="input-value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestDate">Data do Pedido</Label>
                  <Input
                    id="requestDate"
                    type="date"
                    value={formData.requestDate}
                    onChange={(e) => handleInputChange('requestDate', e.target.value)}
                    data-testid="input-request-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responseDate">Data da Resposta</Label>
                  <Input
                    id="responseDate"
                    type="date"
                    value={formData.responseDate}
                    onChange={(e) => handleInputChange('responseDate', e.target.value)}
                    data-testid="input-response-date"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição detalhada do pedido de benefício..."
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

          {/* Informações Médicas e Trabalhistas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações Médicas e Trabalhistas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalEvidence">Evidências Médicas</Label>
                <Textarea
                  id="medicalEvidence"
                  value={formData.medicalEvidence}
                  onChange={(e) => handleInputChange('medicalEvidence', e.target.value)}
                  placeholder="Laudos médicos, exames e evidências que comprovam a condição..."
                  className="min-h-20"
                  data-testid="textarea-medical-evidence"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workHistory">Histórico Trabalhista</Label>
                <Textarea
                  id="workHistory"
                  value={formData.workHistory}
                  onChange={(e) => handleInputChange('workHistory', e.target.value)}
                  placeholder="Histórico de trabalho, tempo de contribuição, empresas..."
                  className="min-h-20"
                  data-testid="textarea-work-history"
                />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Internas</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Notas internas e observações sobre o pedido..."
                  className="min-h-24"
                  data-testid="textarea-notes"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/pedidos-inss">
            <Button variant="outline" data-testid="button-cancel">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </Link>
          <Button type="submit" data-testid="button-save">
            <Save className="h-4 w-4 mr-2" />
            Salvar Pedido
          </Button>
        </div>
      </form>
    </div>
  );
}
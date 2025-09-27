import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function ProcessEditPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    processNumber: "1001234-56.2024.8.26.0100",
    processType: "civel",
    court: "1ª Vara Cível Central - São Paulo",
    subject: "Indenização por Danos Morais",
    status: "ativo",
    startDate: "2024-01-15",
    expectedEndDate: "",
    value: "50000",
    description: "Processo de indenização por danos morais decorrentes de acidente de trânsito. Cliente foi vítima de colisão causada por terceiro.",
    clientId: "1",
    responsibleLawyer: "1",
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
      title: "Processo atualizado!",
      description: `Processo ${formData.processNumber} foi atualizado com sucesso.`,
    });
    console.log('Processo atualizado:', formData);
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
        <div>
          <h1 className="text-2xl font-bold text-foreground">Editar Processo</h1>
          <p className="text-muted-foreground">Atualize as informações do processo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados Básicos do Processo */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="processNumber">Número do Processo *</Label>
                  <Input
                    id="processNumber"
                    value={formData.processNumber}
                    onChange={(e) => handleInputChange('processNumber', e.target.value)}
                    placeholder="0000000-00.0000.0.00.0000"
                    required
                    data-testid="input-process-number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processType">Tipo de Processo *</Label>
                  <Select value={formData.processType} onValueChange={(value) => handleInputChange('processType', value)}>
                    <SelectTrigger data-testid="select-process-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civel">Cível</SelectItem>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                      <SelectItem value="criminal">Criminal</SelectItem>
                      <SelectItem value="familia">Família</SelectItem>
                      <SelectItem value="tributario">Tributário</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="court">Vara/Tribunal *</Label>
                  <Input
                    id="court"
                    value={formData.court}
                    onChange={(e) => handleInputChange('court', e.target.value)}
                    placeholder="Digite a vara ou tribunal"
                    required
                    data-testid="input-court"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger data-testid="select-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    data-testid="input-start-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedEndDate">Previsão de Término</Label>
                  <Input
                    id="expectedEndDate"
                    type="date"
                    value={formData.expectedEndDate}
                    onChange={(e) => handleInputChange('expectedEndDate', e.target.value)}
                    data-testid="input-expected-end-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Valor da Causa</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    placeholder="0,00"
                    data-testid="input-value"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Assunto principal do processo"
                  required
                  data-testid="input-subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição detalhada do processo..."
                  className="min-h-24"
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
                  placeholder="Notas internas e observações sobre o processo..."
                  className="min-h-24"
                  data-testid="textarea-notes"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/processes">
            <Button variant="outline" data-testid="button-cancel">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </Link>
          <Button type="submit" data-testid="button-save">
            <Save className="h-4 w-4 mr-2" />
            Salvar Processo
          </Button>
        </div>
      </form>
    </div>
  );
}
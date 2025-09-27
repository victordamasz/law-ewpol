import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import { Link, useParams } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function ClientEditPage() {
  const { toast } = useToast();
  const params = useParams();
  const clientId = params.id;
  
  // Dados estáticos simulando um cliente existente
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    rg: "",
    birthDate: "",
    profession: "",
    maritalStatus: "",
    nationality: "Brasileira",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });

  // Simular carregamento dos dados do cliente
  useEffect(() => {
    // Dados mock baseados no ID
    const mockClientData = {
      name: "Maria Silva Santos",
      email: "maria.silva@email.com",
      phone: "(11) 99999-1234",
      cpf: "123.456.789-01",
      rg: "12.345.678-9",
      birthDate: "1985-03-15",
      profession: "Professora",
      maritalStatus: "casado",
      nationality: "Brasileira",
      street: "Rua das Flores",
      number: "123",
      complement: "Apt 45",
      district: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      notes: "Cliente preferencial. Sempre pontual nos pagamentos.",
    };

    setFormData(mockClientData);
  }, [clientId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular atualização do cliente
    toast({
      title: "Cliente atualizado com sucesso!",
      description: `As informações de ${formData.name} foram atualizadas.`,
    });
    console.log('Cliente atualizado:', formData);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/clients">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Editar Cliente</h1>
          <p className="text-muted-foreground">Atualize as informações do cliente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados Pessoais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite o nome completo"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="exemplo@email.com"
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    placeholder="000.000.000-00"
                    required
                    data-testid="input-cpf"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={formData.rg}
                    onChange={(e) => handleInputChange('rg', e.target.value)}
                    placeholder="00.000.000-0"
                    data-testid="input-rg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    data-testid="input-birth-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profissão</Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    placeholder="Informe a profissão"
                    data-testid="input-profession"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                    <SelectTrigger data-testid="select-marital-status">
                      <SelectValue placeholder="Selecione o estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      <SelectItem value="uniao_estavel">União Estável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nacionalidade</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  data-testid="input-nationality"
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="00000-000"
                  data-testid="input-zip-code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Logradouro</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Rua, Avenida, etc."
                  data-testid="input-street"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="123"
                    data-testid="input-number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={formData.complement}
                    onChange={(e) => handleInputChange('complement', e.target.value)}
                    placeholder="Apto, Casa, etc."
                    data-testid="input-complement"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Bairro</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="Nome do bairro"
                  data-testid="input-district"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Nome da cidade"
                  data-testid="input-city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
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
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Informações adicionais sobre o cliente..."
                  className="min-h-24"
                  data-testid="textarea-notes"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/clients">
            <Button variant="outline" data-testid="button-cancel">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </Link>
          <Button type="submit" data-testid="button-save">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Plus,
  Filter,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FinancialManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes");
  const [searchTerm, setSearchTerm] = useState("");

  // Todo: remove mock functionality
  const financialSummary = {
    totalRevenue: 185420.50,
    totalExpenses: 87350.25,
    netProfit: 98070.25,
    pendingReceivables: 45600.00,
    overdueBills: 8900.00,
    cashFlow: 142320.75
  };

  const transactions = [
    {
      id: 1,
      type: "receber",
      description: "Honorários - Silva vs. ABC Ltda",
      client: "Maria Silva",
      amount: 15000.00,
      dueDate: "2024-12-15",
      status: "pendente",
      category: "Honorários"
    },
    {
      id: 2,
      type: "pagar", 
      description: "Aluguel do Escritório - Dezembro",
      client: "Imobiliária Santos",
      amount: 8500.00,
      dueDate: "2024-12-10",
      status: "vencido",
      category: "Infraestrutura"
    },
    {
      id: 3,
      type: "receber",
      description: "Consultoria Jurídica - João Costa",
      client: "João Costa", 
      amount: 3200.00,
      dueDate: "2024-12-20",
      status: "pago",
      category: "Consultoria"
    },
    {
      id: 4,
      type: "pagar",
      description: "Assinatura Software Jurídico",
      client: "LegalTech Solutions",
      amount: 890.00,
      dueDate: "2024-12-18",
      status: "pendente",
      category: "Software"
    },
    {
      id: 5,
      type: "receber",
      description: "Acordo Extrajudicial - Ana Ferreira",
      client: "Ana Ferreira",
      amount: 7500.00,
      dueDate: "2024-12-12",
      status: "pago",
      category: "Acordos"
    }
  ];

  const revenueByCategory = [
    { name: "Honorários", value: 125000, percentage: 67 },
    { name: "Consultoria", value: 35000, percentage: 19 },
    { name: "Acordos", value: 25420, percentage: 14 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "receber": return "text-chart-3";
      case "pagar": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "receber": return <ArrowUpCircle className="h-4 w-4 text-chart-3" />;
      case "pagar": return <ArrowDownCircle className="h-4 w-4 text-destructive" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago": return "bg-chart-3/10 text-chart-3";
      case "pendente": return "bg-chart-2/10 text-chart-2";
      case "vencido": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago": return <CheckCircle className="h-3 w-3" />;
      case "pendente": return <Calendar className="h-3 w-3" />;
      case "vencido": return <AlertTriangle className="h-3 w-3" />;
      default: return <DollarSign className="h-3 w-3" />;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isOverdue = (dateString: string, status: string) => {
    return status !== 'pago' && new Date(dateString) < new Date();
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">Controle financeiro e fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-export-financial">
            Exportar
          </Button>
          <Button data-testid="button-add-transaction" onClick={() => console.log('Add transaction clicked')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">
              {formatCurrency(financialSummary.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">+15%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(financialSummary.totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+8%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(financialSummary.netProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">+22%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {formatCurrency(financialSummary.pendingReceivables)}
            </div>
            <p className="text-xs text-muted-foreground">Valores pendentes</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(financialSummary.overdueBills)}
            </div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              {formatCurrency(financialSummary.cashFlow)}
            </div>
            <p className="text-xs text-muted-foreground">Saldo atual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Movimentações Financeiras</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48"
                  data-testid="input-search-transactions"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => console.log('Filter all')}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Filter receber')}>
                    A Receber
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Filter pagar')}>
                    A Pagar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Filter vencido')}>
                    Vencidos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card 
                key={transaction.id} 
                className={`hover-elevate ${isOverdue(transaction.dueDate, transaction.status) ? 'border-destructive/20' : ''}`}
                data-testid={`transaction-card-${transaction.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getTypeIcon(transaction.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium truncate">{transaction.description}</p>
                          <Badge variant="outline" size="sm">
                            {transaction.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Cliente: {transaction.client}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span className={isOverdue(transaction.dueDate, transaction.status) ? 'text-destructive font-medium' : ''}>
                              Vencimento: {formatDate(transaction.dueDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
                        {transaction.type === 'pagar' ? '-' : '+'}{formatCurrency(transaction.amount)}
                      </div>
                      <Badge className={getStatusColor(transaction.status)} size="sm">
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1 capitalize">{transaction.status}</span>
                      </Badge>
                    </div>
                  </div>

                  {transaction.status !== 'pago' && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                      <Button 
                        size="sm" 
                        variant="default"
                        data-testid={`button-pay-transaction-${transaction.id}`}
                        onClick={() => console.log(`Pay transaction ${transaction.id}`)}
                      >
                        {transaction.type === 'receber' ? 'Marcar como Recebido' : 'Marcar como Pago'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        data-testid={`button-edit-transaction-${transaction.id}`}
                        onClick={() => console.log(`Edit transaction ${transaction.id}`)}
                      >
                        Editar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Revenue by Category */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg">Receita por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueByCategory.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="text-right text-xs text-muted-foreground">
                  {formatCurrency(category.value)}
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">
                  {formatCurrency(revenueByCategory.reduce((sum, cat) => sum + cat.value, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
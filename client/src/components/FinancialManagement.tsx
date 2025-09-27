import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pagination } from "@/components/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  CheckCircle,
  Grid,
  List,
  Receipt,
  Download,
  FileBarChart,
  Wallet,
  X,
  Edit,
  CreditCard,
  Banknote,
  PiggyBank,
  Settings
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function FinancialManagement() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("mes");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  
  // Modal states
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
  const [showCashManagementModal, setShowCashManagementModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  
  // Form states
  const [newTransaction, setNewTransaction] = useState({
    type: "receber",
    description: "",
    client: "",
    amount: "",
    dueDate: "",
    category: "Honorários",
    notes: ""
  });
  
  const [editTransaction, setEditTransaction] = useState({
    id: "",
    type: "receber",
    description: "",
    client: "",
    amount: "",
    dueDate: "",
    category: "Honorários",
    notes: ""
  });

  const [cashMovement, setCashMovement] = useState({
    type: "entrada",
    amount: "",
    description: "",
    category: "Operacional",
    paymentMethod: "dinheiro",
    accountType: "caixa",
    date: new Date().toISOString().split('T')[0]
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "dinheiro",
    accountType: "caixa",
    paymentDate: new Date().toISOString().split('T')[0],
    notes: "",
    generateCashEntry: true
  });

  // Dados estáticos expandidos para categorias e formas de pagamento
  const categories = [
    { value: "Honorários", label: "Honorários", icon: "💰" },
    { value: "Consultoria", label: "Consultoria", icon: "🗣️" },
    { value: "Acordos", label: "Acordos", icon: "🤝" },
    { value: "Infraestrutura", label: "Infraestrutura", icon: "🏢" },
    { value: "Software", label: "Software", icon: "💻" },
    { value: "Marketing", label: "Marketing", icon: "📈" },
    { value: "Tributário", label: "Tributário", icon: "📋" },
    { value: "Pessoal", label: "Pessoal", icon: "👥" },
    { value: "Operacional", label: "Operacional", icon: "⚙️" }
  ];

  const paymentMethods = [
    { value: "dinheiro", label: "Dinheiro", icon: "💵" },
    { value: "pix", label: "PIX", icon: "📱" },
    { value: "cartao_credito", label: "Cartão de Crédito", icon: "💳" },
    { value: "cartao_debito", label: "Cartão de Débito", icon: "💳" },
    { value: "transferencia", label: "Transferência", icon: "🏦" },
    { value: "boleto", label: "Boleto", icon: "📄" },
    { value: "cheque", label: "Cheque", icon: "📝" }
  ];

  const accountTypes = [
    { value: "caixa", label: "Caixa", icon: "🏪" },
    { value: "conta_corrente", label: "Conta Corrente", icon: "🏦" },
    { value: "conta_poupanca", label: "Conta Poupança", icon: "💰" },
    { value: "investimento", label: "Investimento", icon: "📈" }
  ];

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

  // Pagination logic  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleExportReport = (format: string) => {
    toast({
      title: "Relatório exportado!",
      description: `Relatório financeiro exportado como ${format.toUpperCase()}.`,
    });
  };

  const handleCreateTransaction = () => {
    toast({
      title: "Transação criada!",
      description: `${newTransaction.type === 'receber' ? 'Receita' : 'Despesa'} de ${formatCurrency(parseFloat(newTransaction.amount))} criada com sucesso.`,
    });
    setShowNewTransactionModal(false);
    setNewTransaction({
      type: "receber",
      description: "",
      client: "",
      amount: "",
      dueDate: "",
      category: "Honorários",
      notes: ""
    });
  };
  
  const handleCashMovement = () => {
    const method = paymentMethods.find(m => m.value === cashMovement.paymentMethod);
    const account = accountTypes.find(a => a.value === cashMovement.accountType);
    
    toast({
      title: "Movimentação registrada!",
      description: `${cashMovement.type === 'entrada' ? 'Entrada' : 'Saída'} de ${formatCurrency(parseFloat(cashMovement.amount))} via ${method?.label} em ${account?.label}.`,
    });
    setShowCashManagementModal(false);
    setCashMovement({
      type: "entrada",
      amount: "",
      description: "",
      category: "Operacional",
      paymentMethod: "dinheiro",
      accountType: "caixa",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleMarkAsPaid = () => {
    if (!selectedTransaction) return;
    
    const paymentMethod = paymentMethods.find(m => m.value === paymentData.paymentMethod);
    const accountType = accountTypes.find(a => a.value === paymentData.accountType);
    
    toast({
      title: "Pagamento registrado!",
      description: `${selectedTransaction.type === 'receber' ? 'Recebimento' : 'Pagamento'} de ${formatCurrency(selectedTransaction.amount)} registrado via ${paymentMethod?.label} em ${accountType?.label}.`,
    });
    
    setShowPaymentModal(false);
    setPaymentData({
      paymentMethod: "dinheiro",
      accountType: "caixa",
      paymentDate: new Date().toISOString().split('T')[0],
      notes: "",
      generateCashEntry: true
    });
  };

  const handleEditTransaction = (transaction: any) => {
    setEditTransaction({
      id: transaction.id,
      type: transaction.type,
      description: transaction.description,
      client: transaction.client,
      amount: transaction.amount.toString(),
      dueDate: transaction.dueDate,
      category: transaction.category,
      notes: ""
    });
    setShowEditTransactionModal(true);
  };

  const handleUpdateTransaction = () => {
    toast({
      title: "Transação atualizada!",
      description: `${editTransaction.type === 'receber' ? 'Receita' : 'Despesa'} de ${formatCurrency(parseFloat(editTransaction.amount))} atualizada com sucesso.`,
    });
    setShowEditTransactionModal(false);
    setEditTransaction({
      id: "",
      type: "receber",
      description: "",
      client: "",
      amount: "",
      dueDate: "",
      category: "Honorários",
      notes: ""
    });
  };
  
  const handleDownloadReceipt = () => {
    toast({
      title: "Recibo baixado!",
      description: "O recibo foi gerado e baixado com sucesso.",
    });
  };
  
  const handlePrintReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    if (receiptWindow && selectedTransaction) {
      receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Recibo - ${selectedTransaction.description}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .amount { font-size: 24px; font-weight: bold; color: #2563eb; }
            .details { margin: 20px 0; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ESCRITÓRIO JURÍDICO</h1>
            <p>Recibo de ${selectedTransaction.type === 'receber' ? 'Pagamento' : 'Despesa'}</p>
          </div>
          <div class="details">
            <p><strong>Descrição:</strong> ${selectedTransaction.description}</p>
            <p><strong>Cliente:</strong> ${selectedTransaction.client}</p>
            <p><strong>Data:</strong> ${formatDate(selectedTransaction.dueDate)}</p>
            <p><strong>Categoria:</strong> ${selectedTransaction.category}</p>
            <div class="amount">
              <p>Valor: ${formatCurrency(selectedTransaction.amount || 0)}</p>
            </div>
          </div>
          <div class="footer">
            <p>Recibo gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
          </div>
        </body>
        </html>
      `);
      receiptWindow.document.close();
      receiptWindow.print();
    }
    
    toast({
      title: "Recibo impresso!",
      description: "O recibo foi enviado para a impressora.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">Controle financeiro e fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="button-financial-menu">
                <FileBarChart className="h-4 w-4 mr-2" />
                Relatórios
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setShowReportsModal(true)}>
                <FileBarChart className="h-4 w-4 mr-2" />
                Ver Relatórios
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportReport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportReport('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            onClick={() => setShowCashManagementModal(true)}
            data-testid="button-cash-management"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Gestão de Caixa
          </Button>
          
          <Button 
            onClick={() => setShowNewTransactionModal(true)}
            data-testid="button-add-transaction"
          >
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

          {viewMode === "list" ? (
            <div className="space-y-3">
              {paginatedTransactions.map((transaction) => (
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
                          <Badge variant="outline">
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
                      <Badge className={getStatusColor(transaction.status)}>
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1 capitalize">{transaction.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    {transaction.status !== 'pago' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          data-testid={`button-pay-transaction-${transaction.id}`}
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowPaymentModal(true);
                          }}
                        >
                          {transaction.type === 'receber' ? 'Marcar como Recebido' : 'Marcar como Pago'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          data-testid={`button-edit-transaction-${transaction.id}`}
                          onClick={() => handleEditTransaction(transaction)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </>
                    )}
                    
                    {transaction.status === 'pago' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        data-testid={`button-receipt-transaction-${transaction.id}`}
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowReceiptModal(true);
                        }}
                      >
                        <Receipt className="h-4 w-4 mr-1" />
                        Gerar Recibo
                      </Button>
                    )}
                  </div>

                </CardContent>
              </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedTransactions.map((transaction) => (
                <Card 
                  key={transaction.id} 
                  className={`hover-elevate ${isOverdue(transaction.dueDate, transaction.status) ? 'border-destructive/20' : ''}`}
                  data-testid={`transaction-card-${transaction.id}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(transaction.type)}
                          <Badge variant="outline">
                            {transaction.category}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm truncate">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">Cliente: {transaction.client}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
                          {transaction.type === 'pagar' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-xs text-muted-foreground text-right">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span className={isOverdue(transaction.dueDate, transaction.status) ? 'text-destructive font-medium' : ''}>
                              {formatDate(transaction.dueDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {transaction.status !== 'pago' && (
                        <div className="flex gap-2 pt-2 border-t border-border">
                          <Button 
                            size="sm" 
                            variant="default"
                            className="flex-1"
                            data-testid={`button-pay-transaction-${transaction.id}`}
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setShowPaymentModal(true);
                            }}
                          >
                            {transaction.type === 'receber' ? 'Recebido' : 'Pago'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

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

      {/* Modals */}
      {/* New Transaction Modal */}
      <Dialog open={showNewTransactionModal} onOpenChange={setShowNewTransactionModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogDescription>
              Adicione uma nova receita ou despesa ao sistema financeiro.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Transação</Label>
              <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receber">A Receber</SelectItem>
                  <SelectItem value="pagar">A Pagar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                placeholder="Descrição da transação"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="0,00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTransaction.dueDate}
                  onChange={(e) => setNewTransaction({...newTransaction, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={newTransaction.client} onValueChange={(value) => setNewTransaction({...newTransaction, client: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maria Silva">Maria Silva</SelectItem>
                  <SelectItem value="João Costa">João Costa</SelectItem>
                  <SelectItem value="Ana Ferreira">Ana Ferreira</SelectItem>
                  <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTransactionModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTransaction} data-testid="button-create-transaction">
              Criar Transação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cash Management Modal */}
      <Dialog open={showCashManagementModal} onOpenChange={setShowCashManagementModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gestão de Caixa</DialogTitle>
            <DialogDescription>
              Registre entradas e saídas do fluxo de caixa.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cashType">Tipo de Movimento</Label>
              <Select value={cashMovement.type} onValueChange={(value) => setCashMovement({...cashMovement, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cashAmount">Valor</Label>
              <Input
                id="cashAmount"
                type="number"
                value={cashMovement.amount}
                onChange={(e) => setCashMovement({...cashMovement, amount: e.target.value})}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cashDescription">Descrição</Label>
              <Textarea
                id="cashDescription"
                value={cashMovement.description}
                onChange={(e) => setCashMovement({...cashMovement, description: e.target.value})}
                placeholder="Descrição da movimentação"
                className="min-h-20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cashCategory">Categoria</Label>
                <Select value={cashMovement.category} onValueChange={(value) => setCashMovement({...cashMovement, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cashDate">Data</Label>
                <Input
                  id="cashDate"
                  type="date"
                  value={cashMovement.date}
                  onChange={(e) => setCashMovement({...cashMovement, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                <Select value={cashMovement.paymentMethod} onValueChange={(value) => setCashMovement({...cashMovement, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.icon} {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Conta/Origem</Label>
                <Select value={cashMovement.accountType} onValueChange={(value) => setCashMovement({...cashMovement, accountType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((account) => (
                      <SelectItem key={account.value} value={account.value}>
                        {account.icon} {account.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCashManagementModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCashMovement} data-testid="button-register-cash">
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Modal */}
      <Dialog open={showEditTransactionModal} onOpenChange={setShowEditTransactionModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
            <DialogDescription>
              Atualize os dados da transação selecionada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editType">Tipo de Transação</Label>
              <Select value={editTransaction.type} onValueChange={(value) => setEditTransaction({...editTransaction, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receber">A Receber</SelectItem>
                  <SelectItem value="pagar">A Pagar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Descrição</Label>
              <Input
                id="editDescription"
                value={editTransaction.description}
                onChange={(e) => setEditTransaction({...editTransaction, description: e.target.value})}
                placeholder="Descrição da transação"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editAmount">Valor</Label>
                <Input
                  id="editAmount"
                  type="number"
                  value={editTransaction.amount}
                  onChange={(e) => setEditTransaction({...editTransaction, amount: e.target.value})}
                  placeholder="0,00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDueDate">Data de Vencimento</Label>
                <Input
                  id="editDueDate"
                  type="date"
                  value={editTransaction.dueDate}
                  onChange={(e) => setEditTransaction({...editTransaction, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editClient">Cliente</Label>
              <Select value={editTransaction.client} onValueChange={(value) => setEditTransaction({...editTransaction, client: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maria Silva">Maria Silva</SelectItem>
                  <SelectItem value="João Costa">João Costa</SelectItem>
                  <SelectItem value="Ana Ferreira">Ana Ferreira</SelectItem>
                  <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editCategory">Categoria</Label>
              <Select value={editTransaction.category} onValueChange={(value) => setEditTransaction({...editTransaction, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editNotes">Observações</Label>
              <Textarea
                id="editNotes"
                value={editTransaction.notes}
                onChange={(e) => setEditTransaction({...editTransaction, notes: e.target.value})}
                placeholder="Observações adicionais..."
                className="min-h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditTransactionModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateTransaction} data-testid="button-update-transaction">
              <Edit className="h-4 w-4 mr-2" />
              Atualizar Transação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Modal */}
      <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Recibo de Pagamento</DialogTitle>
            <DialogDescription>
              Visualize e baixe o recibo da transação.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">ESCRITÓRIO JURÍDICO</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Recibo de {selectedTransaction.type === 'receber' ? 'Pagamento' : 'Despesa'}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Descrição:</Label>
                      <p className="font-medium">{selectedTransaction.description}</p>
                    </div>
                    <div>
                      <Label>Cliente:</Label>
                      <p className="font-medium">{selectedTransaction.client}</p>
                    </div>
                    <div>
                      <Label>Data:</Label>
                      <p className="font-medium">{formatDate(selectedTransaction.dueDate)}</p>
                    </div>
                    <div>
                      <Label>Categoria:</Label>
                      <p className="font-medium">{selectedTransaction.category}</p>
                    </div>
                  </div>
                  <div className="text-center py-4 border-t border-border">
                    <Label>Valor Total:</Label>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Recibo gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handlePrintReceipt} data-testid="button-print-receipt">
              Imprimir
            </Button>
            <Button variant="outline" onClick={handleDownloadReceipt} data-testid="button-download-receipt">
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
            <Button onClick={() => setShowReceiptModal(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reports Modal */}
      <Dialog open={showReportsModal} onOpenChange={setShowReportsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Relatórios Financeiros</DialogTitle>
            <DialogDescription>
              Visualize e exporte relatórios financeiros detalhados.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do Período</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total de Receitas:</span>
                    <span className="font-bold text-green-600">{formatCurrency(185420.50)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total de Despesas:</span>
                    <span className="font-bold text-red-600">{formatCurrency(87350.25)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Lucro Líquido:</span>
                    <span className="font-bold text-primary">{formatCurrency(98070.25)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Indicadores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Margem de Lucro:</span>
                    <span className="font-bold">52.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className="font-bold">112.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fluxo de Caixa:</span>
                    <span className="font-bold text-primary">Positivo</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Análise por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueByCategory.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-muted-foreground">
                          {formatCurrency(category.value)} ({category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleExportReport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('excel')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Excel
            </Button>
            <Button onClick={() => setShowReportsModal(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedTransaction?.type === 'receber' ? 'Marcar como Recebido' : 'Marcar como Pago'}
            </DialogTitle>
            <DialogDescription>
              Registre o {selectedTransaction?.type === 'receber' ? 'recebimento' : 'pagamento'} e faça o lançamento no caixa.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{selectedTransaction.description}</span>
                  <Badge className={getTypeColor(selectedTransaction.type)}>
                    {selectedTransaction.type === 'receber' ? 'Receita' : 'Despesa'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">Cliente: {selectedTransaction.client}</p>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(selectedTransaction.amount)}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Data do Pagamento</Label>
                <Input
                  type="date"
                  value={paymentData.paymentDate}
                  onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Forma de Pagamento</Label>
                <Select value={paymentData.paymentMethod} onValueChange={(value) => setPaymentData({...paymentData, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.icon} {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Conta/Caixa</Label>
                <Select value={paymentData.accountType} onValueChange={(value) => setPaymentData({...paymentData, accountType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((account) => (
                      <SelectItem key={account.value} value={account.value}>
                        {account.icon} {account.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Observações (opcional)</Label>
                <Textarea
                  value={paymentData.notes}
                  onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                  placeholder="Adicione observações sobre este pagamento..."
                  className="min-h-20"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="generateCashEntry"
                  checked={paymentData.generateCashEntry}
                  onChange={(e) => setPaymentData({...paymentData, generateCashEntry: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="generateCashEntry" className="text-sm">
                  Gerar lançamento automático no fluxo de caixa
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleMarkAsPaid} data-testid="button-confirm-payment">
              <CheckCircle className="h-4 w-4 mr-2" />
              {selectedTransaction?.type === 'receber' ? 'Confirmar Recebimento' : 'Confirmar Pagamento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
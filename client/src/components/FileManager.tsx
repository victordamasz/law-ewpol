import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import { 
  FolderOpen,
  File,
  Upload,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Image,
  FileArchive,
  Eye,
  Edit,
  Trash2,
  Share,
  Calendar,
  User,
  Grid,
  List,
  Plus,
  FolderPlus,
  Move,
  Copy,
  ArrowLeft,
  Home,
  ChevronRight,
  X,
  FileUp
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function FileManager() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentFolder, setCurrentFolder] = useState("root");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showFileViewModal, setShowFileViewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  
  // Form states
  const [uploadFile, setUploadFile] = useState({
    name: "",
    folder: "root",
    description: "",
    tags: "",
    client: ""
  });
  
  const [newFolder, setNewFolder] = useState({
    name: "",
    parent: "root",
    description: ""
  });

  // Breadcrumb navigation
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "Início", path: "root" }
  ]);

  // Dados estáticos expandidos
  const folders = [
    { id: 1, name: "Clientes", fileCount: 156, lastModified: "2024-12-10", path: "root/clientes" },
    { id: 2, name: "Processos", fileCount: 89, lastModified: "2024-12-09", path: "root/processos" },
    { id: 3, name: "Contratos", fileCount: 45, lastModified: "2024-12-08", path: "root/contratos" },
    { id: 4, name: "Modelos", fileCount: 23, lastModified: "2024-12-05", path: "root/modelos" },
    { id: 5, name: "Audiências", fileCount: 67, lastModified: "2024-12-07", path: "root/audiencias" },
    { id: 6, name: "Correspondências", fileCount: 134, lastModified: "2024-12-06", path: "root/correspondencias" }
  ];

  const clients = [
    { value: "Maria Silva", label: "Maria Silva" },
    { value: "João Costa", label: "João Costa" }, 
    { value: "Ana Ferreira", label: "Ana Ferreira" },
    { value: "Carlos Lima", label: "Carlos Lima" },
    { value: "Pedro Santos", label: "Pedro Santos" }
  ];

  const files = [
    {
      id: 1,
      name: "Contrato_Silva_20241210.pdf",
      type: "pdf",
      size: "2.3 MB",
      client: "Maria Silva",
      category: "Contratos",
      uploadDate: "2024-12-10",
      lastModified: "2024-12-10 14:30",
      tags: ["honorários", "trabalhista"]
    },
    {
      id: 2,
      name: "Procuracao_Costa.pdf", 
      type: "pdf",
      size: "1.8 MB",
      client: "João Costa",
      category: "Procurações",
      uploadDate: "2024-12-09",
      lastModified: "2024-12-09 16:20",
      tags: ["procuração", "civil"]
    },
    {
      id: 3,
      name: "Evidencias_Processo_123.zip",
      type: "zip", 
      size: "15.7 MB",
      client: "Ana Ferreira",
      category: "Evidências",
      uploadDate: "2024-12-08",
      lastModified: "2024-12-08 10:15",
      tags: ["evidências", "processo"]
    },
    {
      id: 4,
      name: "Foto_Acidente_Local.jpg",
      type: "jpg",
      size: "5.2 MB", 
      client: "Carlos Lima",
      category: "Evidências",
      uploadDate: "2024-12-07",
      lastModified: "2024-12-07 15:45",
      tags: ["foto", "acidente", "evidência"]
    },
    {
      id: 5,
      name: "Parecer_Juridico_Oliveira.docx",
      type: "docx",
      size: "890 KB",
      client: "João Oliveira",
      category: "Pareceres",
      uploadDate: "2024-12-06",
      lastModified: "2024-12-06 11:30",
      tags: ["parecer", "empresarial"]
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-8 w-8 text-destructive" />;
      case "docx":
      case "doc": return <FileText className="h-8 w-8 text-chart-1" />;
      case "jpg":
      case "png":
      case "gif": return <Image className="h-8 w-8 text-chart-3" />;
      case "zip":
      case "rar": return <FileArchive className="h-8 w-8 text-chart-2" />;
      default: return <File className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "pdf": return "bg-destructive/10 text-destructive";
      case "docx": 
      case "doc": return "bg-chart-1/10 text-chart-1";
      case "jpg":
      case "png":
      case "gif": return "bg-chart-3/10 text-chart-3";
      case "zip":
      case "rar": return "bg-chart-2/10 text-chart-2";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === "todos" || file.category.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  // Handlers para novas funcionalidades
  const handleUploadFile = () => {
    toast({
      title: "Arquivo enviado!",
      description: `Arquivo "${uploadFile.name}" foi carregado na pasta ${uploadFile.folder} com sucesso.`,
    });
    setShowUploadModal(false);
    setUploadFile({
      name: "",
      folder: "root",
      description: "",
      tags: "",
      client: ""
    });
  };

  const handleCreateFolder = () => {
    toast({
      title: "Pasta criada!",
      description: `Nova pasta "${newFolder.name}" criada com sucesso.`,
    });
    setShowCreateFolderModal(false);
    setNewFolder({
      name: "",
      parent: "root",
      description: ""
    });
  };

  const handleNavigateToFolder = (folderName: string, folderPath: string) => {
    setCurrentFolder(folderName);
    const newBreadcrumbs = [...breadcrumbs, { name: folderName, path: folderPath }];
    setBreadcrumbs(newBreadcrumbs);
  };

  const handleBreadcrumbClick = (index: number) => {
    const targetBreadcrumb = breadcrumbs[index];
    setCurrentFolder(targetBreadcrumb.name);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const handleFileView = (file: any) => {
    setSelectedFile(file);
    setShowFileViewModal(true);
  };

  const handleMoveFile = (file: any) => {
    setSelectedFile(file);
    setShowMoveModal(true);
  };

  const handleConfirmMove = () => {
    toast({
      title: "Arquivo movido!",
      description: `"${selectedFile?.name}" foi movido com sucesso.`,
    });
    setShowMoveModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciador de Arquivos</h1>
          <p className="text-muted-foreground">Organize documentos, evidências e arquivos do escritório</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            data-testid="button-new-folder"
            onClick={() => setShowCreateFolderModal(true)}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            Nova Pasta
          </Button>
          <Button 
            data-testid="button-upload-file" 
            onClick={() => setShowUploadModal(true)}
          >
            <FileUp className="h-4 w-4 mr-2" />
            Enviar Arquivo
          </Button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4" />
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.path} className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 px-2 ${index === breadcrumbs.length - 1 ? 'font-medium' : 'text-muted-foreground'}`}
              onClick={() => handleBreadcrumbClick(index)}
              data-testid={`breadcrumb-${breadcrumb.name.toLowerCase()}`}
            >
              {breadcrumb.name}
            </Button>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar arquivos, clientes ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-files"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" data-testid="button-filter-files">
                <Filter className="h-4 w-4 mr-2" />
                {selectedFilter === "todos" ? "Todos" : selectedFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter("todos")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("contratos")}>
                Contratos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("procurações")}>
                Procurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("evidências")}>
                Evidências
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("pareceres")}>
                Pareceres
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              data-testid="button-grid-view"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              data-testid="button-list-view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Folders */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Pastas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {folders.map((folder) => (
            <Card 
              key={folder.id} 
              className="hover-elevate cursor-pointer"
              data-testid={`folder-card-${folder.id}`}
              onClick={() => handleNavigateToFolder(folder.name, folder.path)}
            >
              <CardContent className="p-4 text-center">
                <FolderOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-medium text-sm text-foreground truncate">{folder.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {folder.fileCount} arquivos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Files */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Arquivos</h2>
        
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedFiles.map((file) => (
              <Card 
                key={file.id} 
                className="hover-elevate"
                data-testid={`file-card-${file.id}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      {getFileIcon(file.type)}
                      <div className="mt-2 w-full">
                        <h3 className="font-medium text-xs text-center text-foreground truncate">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFileView(file)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Download ${file.name}`)}>
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMoveFile(file)}>
                          <Move className="h-4 w-4 mr-2" />
                          Mover
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Copy ${file.name}`)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Share ${file.name}`)}>
                          <Share className="h-4 w-4 mr-2" />
                          Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Edit ${file.name}`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Renomear
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => console.log(`Delete ${file.name}`)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getFileTypeColor(file.type)} size="sm">
                      {file.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Cliente: <span className="font-medium">{file.client}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(file.uploadDate)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {file.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" size="sm" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {file.tags.length > 2 && (
                      <Badge variant="outline" size="sm" className="text-xs">
                        +{file.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {paginatedFiles.map((file) => (
              <Card key={file.id} className="hover-elevate" data-testid={`file-row-${file.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {getFileIcon(file.type)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {file.name}
                        </h3>
                        <Badge className={getFileTypeColor(file.type)} size="sm">
                          {file.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{file.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(file.uploadDate)}</span>
                        </div>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {file.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="sm" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        data-testid={`button-view-file-${file.id}`}
                        onClick={() => handleFileView(file)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        data-testid={`button-download-file-${file.id}`}
                        onClick={() => console.log(`Download ${file.name}`)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleMoveFile(file)}>
                            <Move className="h-4 w-4 mr-2" />
                            Mover
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log(`Copy ${file.name}`)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log(`Share ${file.name}`)}>
                            <Share className="h-4 w-4 mr-2" />
                            Compartilhar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log(`Edit ${file.name}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Renomear
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => console.log(`Delete ${file.name}`)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredFiles.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Nenhum arquivo encontrado</p>
            <Button 
              variant="outline" 
              onClick={() => console.log('Clear search clicked')}
            >
              Limpar filtros
            </Button>
          </div>
        )}

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Arquivo</DialogTitle>
            <DialogDescription>
              Faça upload de um novo arquivo com informações detalhadas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fileName">Nome do Arquivo</Label>
              <Input
                id="fileName"
                value={uploadFile.name}
                onChange={(e) => setUploadFile({...uploadFile, name: e.target.value})}
                placeholder="Nome do arquivo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileFolder">Pasta de Destino</Label>
              <Select value={uploadFile.folder} onValueChange={(value) => setUploadFile({...uploadFile, folder: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a pasta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">📁 Raiz</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name.toLowerCase()}>
                      📁 {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileClient">Cliente Relacionado</Label>
              <Select value={uploadFile.client} onValueChange={(value) => setUploadFile({...uploadFile, client: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.value} value={client.value}>
                      👤 {client.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileDescription">Descrição</Label>
              <Textarea
                id="fileDescription"
                value={uploadFile.description}
                onChange={(e) => setUploadFile({...uploadFile, description: e.target.value})}
                placeholder="Descrição do arquivo..."
                className="min-h-16"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileTags">Tags (separadas por vírgula)</Label>
              <Input
                id="fileTags"
                value={uploadFile.tags}
                onChange={(e) => setUploadFile({...uploadFile, tags: e.target.value})}
                placeholder="contrato, honorários, trabalhista"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUploadFile} data-testid="button-confirm-upload">
              <FileUp className="h-4 w-4 mr-2" />
              Enviar Arquivo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Folder Modal */}
      <Dialog open={showCreateFolderModal} onOpenChange={setShowCreateFolderModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Pasta</DialogTitle>
            <DialogDescription>
              Crie uma nova pasta para organizar seus arquivos.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folderName">Nome da Pasta</Label>
              <Input
                id="folderName"
                value={newFolder.name}
                onChange={(e) => setNewFolder({...newFolder, name: e.target.value})}
                placeholder="Nome da nova pasta"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="folderParent">Pasta Pai</Label>
              <Select value={newFolder.parent} onValueChange={(value) => setNewFolder({...newFolder, parent: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">📁 Raiz</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name.toLowerCase()}>
                      📁 {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="folderDescription">Descrição</Label>
              <Textarea
                id="folderDescription"
                value={newFolder.description}
                onChange={(e) => setNewFolder({...newFolder, description: e.target.value})}
                placeholder="Descrição da pasta..."
                className="min-h-16"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateFolderModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateFolder} data-testid="button-create-folder">
              <FolderPlus className="h-4 w-4 mr-2" />
              Criar Pasta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move File Modal */}
      <Dialog open={showMoveModal} onOpenChange={setShowMoveModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mover Arquivo</DialogTitle>
            <DialogDescription>
              Selecione a pasta de destino para mover "{selectedFile?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pasta de Destino</Label>
              <div className="grid grid-cols-2 gap-2">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="outline"
                    className="h-20 flex-col"
                    onClick={handleConfirmMove}
                    data-testid={`move-to-${folder.name.toLowerCase()}`}
                  >
                    <FolderOpen className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-xs truncate">{folder.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveModal(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File View Modal */}
      <Dialog open={showFileViewModal} onOpenChange={setShowFileViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visualizar Arquivo</DialogTitle>
            <DialogDescription>
              Detalhes e preview de "{selectedFile?.name}".
            </DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getFileIcon(selectedFile.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium truncate">{selectedFile.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">Tipo:</Label>
                      <p className="font-medium">{selectedFile.type.toUpperCase()}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Tamanho:</Label>
                      <p className="font-medium">{selectedFile.size}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Cliente:</Label>
                      <p className="font-medium">{selectedFile.client}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Categoria:</Label>
                      <p className="font-medium">{selectedFile.category}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Modificado:</Label>
                      <p className="font-medium">{selectedFile.lastModified}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Upload:</Label>
                      <p className="font-medium">{formatDate(selectedFile.uploadDate)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label className="text-muted-foreground">Tags:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedFile.tags?.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                    <div className="min-h-32 bg-muted rounded flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        {getFileIcon(selectedFile.type)}
                        <p className="mt-2 text-sm">Preview não disponível</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => console.log('Edit file')}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" onClick={() => console.log('Download file')}>
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
            <Button onClick={() => setShowFileViewModal(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  List
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FileManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentFolder, setCurrentFolder] = useState("root");

  // Todo: remove mock functionality
  const folders = [
    { id: 1, name: "Clientes", fileCount: 156, lastModified: "2024-12-10" },
    { id: 2, name: "Processos", fileCount: 89, lastModified: "2024-12-09" },
    { id: 3, name: "Contratos", fileCount: 45, lastModified: "2024-12-08" },
    { id: 4, name: "Modelos", fileCount: 23, lastModified: "2024-12-05" },
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciador de Arquivos</h1>
          <p className="text-muted-foreground">Organize documentos, evidências e arquivos do escritório</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-new-folder">
            <FolderOpen className="h-4 w-4 mr-2" />
            Nova Pasta
          </Button>
          <Button data-testid="button-upload-file" onClick={() => console.log('Upload file clicked')}>
            <Upload className="h-4 w-4 mr-2" />
            Enviar Arquivo
          </Button>
        </div>
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
              onClick={() => {
                setCurrentFolder(folder.name);
                console.log(`Navigate to folder: ${folder.name}`);
              }}
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
            {filteredFiles.map((file) => (
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
                        <DropdownMenuItem onClick={() => console.log(`View ${file.name}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Download ${file.name}`)}>
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
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
            {filteredFiles.map((file) => (
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
                        onClick={() => console.log(`View ${file.name}`)}
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
      </div>
    </div>
  );
}
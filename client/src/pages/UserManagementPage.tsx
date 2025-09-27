import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  Users,
  UserCog,
  ShieldCheck,
} from "lucide-react";
import { UserList } from "@/components/UserList";
import { UserForm } from "@/components/UserForm";
import { PermissionsManagement } from "@/components/PermissionsManagement";

type User = {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: "assistente" | "estagiario" | "advogado" | "administrador";
  active: boolean;
  ultimoLogin: string;
  imgPerfil?: string;
};

export function UserManagementPage() {
  // Mock data
  const users: User[] = [
    {
      id: 1,
      nomeCompleto: "Dr. João Silva",
      email: "joao.silva@escritorio.com.br",
      perfil: "advogado",
      active: true,
      ultimoLogin: "28/07/2024 10:00",
    },
    {
      id: 2,
      nomeCompleto: "Ana Costa",
      email: "ana.costa@escritorio.com.br",
      perfil: "assistente",
      active: true,
      ultimoLogin: "28/07/2024 09:45",
    },
    {
      id: 3,
      nomeCompleto: "Carlos Lima",
      email: "carlos.lima@escritorio.com.br",
      perfil: "estagiario",
      active: false,
      ultimoLogin: "25/07/2024 18:00",
    },
    {
      id: 4,
      nomeCompleto: "Admin Master",
      email: "admin@escritorio.com.br",
      perfil: "administrador",
      active: true,
      ultimoLogin: "28/07/2024 11:00",
    },
  ];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Adicione, edite e gerencie usuários e suas permissões.
          </p>
        </div>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">
            <UserCog className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Permissões
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os usuários cadastrados.
                </CardDescription>
              </div>
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNew}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingUser ? "Editar Usuário" : "Criar Novo Usuário"}</DialogTitle>
                  </DialogHeader>
                  <UserForm 
                    initialData={editingUser || undefined} 
                    onClose={() => setIsFormOpen(false)} 
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <UserList users={users} onEdit={handleEdit} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Permissões</CardTitle>
              <CardDescription>
                Vincule assistentes e estagiários aos seus advogados
                responsáveis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PermissionsManagement users={users} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
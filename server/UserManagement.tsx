import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  PlusCircle,
  MoreHorizontal,
  Users,
  UserCog,
  ShieldCheck,
} from "lucide-react";
import { Pagination } from "@/components/Pagination";

export function UserManagementPage() {
  // Mock data
  const users = [
    {
      id: 1,
      name: "Dr. João Silva",
      email: "joao.silva@escritorio.com.br",
      profile: "advogado",
      status: "ativo",
      lastLogin: "2024-07-28 10:00",
    },
    {
      id: 2,
      name: "Ana Costa",
      email: "ana.costa@escritorio.com.br",
      profile: "assistente",
      status: "ativo",
      lastLogin: "2024-07-28 09:45",
    },
    {
      id: 3,
      name: "Carlos Lima",
      email: "carlos.lima@escritorio.com.br",
      profile: "estagiario",
      status: "inativo",
      lastLogin: "2024-07-25 18:00",
    },
    {
      id: 4,
      name: "Admin",
      email: "admin@escritorio.com.br",
      profile: "administrador",
      status: "ativo",
      lastLogin: "2024-07-28 11:00",
    },
  ];

  const getProfileBadge = (profile: string) => {
    switch (profile) {
      case "administrador":
        return "bg-destructive text-destructive-foreground";
      case "advogado":
        return "bg-primary text-primary-foreground";
      case "assistente":
        return "bg-secondary text-secondary-foreground";
      case "estagiario":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-gray-400";
    }
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
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os usuários cadastrados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for User CRUD component */}
              <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">
                  O componente de CRUD de usuários será inserido aqui.
                </p>
              </div>
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
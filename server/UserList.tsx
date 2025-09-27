import { useState, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Search } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { toast } from "./ui/use-toast";

type User = {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: string;
  active: boolean;
  ultimoLogin: string;
};

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
}

const perfis = ["todos", "assistente", "advogado", "estagiario", "administrador"];

const getProfileBadgeVariant = (profile: string) => {
  switch (profile) {
    case "administrador":
      return "destructive";
    case "advogado":
      return "default";
    case "assistente":
      return "secondary";
    case "estagiario":
      return "outline";
    default:
      return "secondary";
  }
};

export function UserList({ users, onEdit }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("todos");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProfile =
        profileFilter === "todos" || user.perfil === profileFilter;
      return matchesSearch && matchesProfile;
    });
  }, [users, searchTerm, profileFilter]);

  const handleDelete = (userId: number) => {
    console.log(`Deleting user with id: ${userId}`);
    toast({
      title: "Ação Estática",
      description: `A exclusão do usuário ${userId} foi simulada.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={profileFilter} onValueChange={setProfileFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por perfil" />
          </SelectTrigger>
          <SelectContent>
            {perfis.map((perfil) => (
              <SelectItem key={perfil} value={perfil} className="capitalize">
                {perfil}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Login</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="font-bold">{user.nomeCompleto}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={getProfileBadgeVariant(user.perfil)} className="capitalize">{user.perfil}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.active ? "default" : "outline"}>{user.active ? "Ativo" : "Inativo"}</Badge>
                </TableCell>
                <TableCell>{user.ultimoLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(user)}>Editar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)}>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
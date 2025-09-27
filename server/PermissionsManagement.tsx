import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { Save, User, Users, Link as LinkIcon } from "lucide-react";

type User = {
  id: number;
  nomeCompleto: string;
  perfil: "assistente" | "estagiario" | "advogado" | "administrador";
  imgPerfil?: string;
};

interface PermissionsManagementProps {
  users: User[];
}

export function PermissionsManagement({ users }: PermissionsManagementProps) {
  const [selectedSubordinate, setSelectedSubordinate] = useState<User | null>(
    null
  );
  const [linkedLawyers, setLinkedLawyers] = useState<Record<number, boolean>>(
    {}
  );

  const subordinates = useMemo(
    () => users.filter((u) => ["assistente", "estagiario"].includes(u.perfil)),
    [users]
  );

  const lawyers = useMemo(
    () => users.filter((u) => u.perfil === "advogado"),
    [users]
  );

  const handleSubordinateSelect = (user: User) => {
    setSelectedSubordinate(user);
    // In a real app, you would fetch and set the currently linked lawyers here.
    // For this static version, we'll just reset the state.
    setLinkedLawyers({
      1: user.id === 2, // Mock: Ana Costa is linked to Dr. João Silva
    });
  };

  const handleLawyerLinkToggle = (lawyerId: number) => {
    setLinkedLawyers((prev) => ({
      ...prev,
      [lawyerId]: !prev[lawyerId],
    }));
  };

  const handleSaveChanges = () => {
    if (!selectedSubordinate) return;

    console.log(
      `Saving permissions for ${selectedSubordinate.nomeCompleto}.`,
      {
        subordinateId: selectedSubordinate.id,
        linkedLawyerIds: Object.keys(linkedLawyers).filter(
          (id) => linkedLawyers[Number(id)]
        ),
      }
    );

    toast({
      title: "Sucesso!",
      description: `Permissões para ${selectedSubordinate.nomeCompleto} foram salvas.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1: Subordinates List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Equipe
          </CardTitle>
          <CardDescription>
            Selecione um assistente ou estagiário.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {subordinates.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSubordinateSelect(user)}
                  className={`w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors ${
                    selectedSubordinate?.id === user.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.imgPerfil} />
                    <AvatarFallback>
                      {user.nomeCompleto.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.nomeCompleto}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {user.perfil}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Column 2: Lawyers Linking */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Vincular Advogados Responsáveis
          </CardTitle>
          <CardDescription>
            {selectedSubordinate
              ? `Selecione os advogados aos quais ${selectedSubordinate.nomeCompleto} responderá.`
              : "Selecione um membro da equipe para definir suas permissões."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedSubordinate ? (
            <div className="space-y-4">
              <ScrollArea className="h-80 pr-4">
                <div className="space-y-3">
                  {lawyers.map((lawyer) => (
                    <div key={lawyer.id} className="flex items-center space-x-3 p-3 rounded-md border">
                      <Checkbox
                        id={`lawyer-${lawyer.id}`}
                        checked={!!linkedLawyers[lawyer.id]}
                        onCheckedChange={() => handleLawyerLinkToggle(lawyer.id)}
                      />
                      <Label htmlFor={`lawyer-${lawyer.id}`} className="font-medium flex-1 cursor-pointer">{lawyer.nomeCompleto}</Label>
                      <Badge variant="outline">Advogado</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Permissões
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Nenhum usuário selecionado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
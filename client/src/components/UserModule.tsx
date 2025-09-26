import { useState } from "react";
import { UserManagement } from "./UserManagement";
import { UserForm } from "./UserForm";
import { UserPermissions } from "./UserPermissions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, Plus, ArrowLeft } from "lucide-react";

export function UserModule() {
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'permissions'>('list');
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleNewUser = () => {
    setEditingUser(null);
    setCurrentView('form');
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setEditingUser(null);
    setCurrentView('list');
  };

  if (currentView === 'form') {
    return (
      <UserForm
        user={editingUser}
        mode={editingUser ? 'edit' : 'create'}
        onCancel={handleBackToList}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Módulo de Usuários</h1>
          </div>
          <Button onClick={handleNewUser} data-testid="button-new-user">
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Gestão de Usuários
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissões
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="permissions" className="mt-6">
          <UserPermissions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
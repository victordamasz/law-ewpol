import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Mail,
  Phone,
  MapPin,
  Building,
  Save,
  Camera,
  Globe,
  Database,
  Key,
  Users,
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Settings() {
  const [userSettings, setUserSettings] = useState({
    name: "João Silva",
    email: "joao.silva@escritorio.com.br",
    phone: "(11) 99999-1234",
    oabNumber: "OAB/SP 123.456",
    firmName: "Silva & Associados",
    address: "Av. Paulista, 1000, São Paulo, SP"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    hearingReminders: true,
    taskDeadlines: true,
    newMessages: false,
    weeklyReports: true
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    autoSave: true,
    backupFrequency: "daily"
  });

  const handleUserSettingsChange = (field: string, value: string) => {
    setUserSettings(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}: ${value}`);
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    console.log(`Notification ${field}: ${value}`);
  };

  const handleSystemSettingsChange = (field: string, value: string | boolean) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
    console.log(`System ${field}: ${value}`);
  };

  const saveSettings = (section: string) => {
    console.log(`Saving ${section} settings`);
    // Here would be the actual save logic
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie configurações do sistema e perfil</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" data-testid="tab-profile">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="system" data-testid="tab-system">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="users" data-testid="tab-users">
            <Users className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {userSettings.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Foto do Perfil</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-testid="button-change-avatar"
                    onClick={() => console.log('Change avatar clicked')}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </Button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={userSettings.name}
                    onChange={(e) => handleUserSettingsChange('name', e.target.value)}
                    data-testid="input-full-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleUserSettingsChange('email', e.target.value)}
                    data-testid="input-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={userSettings.phone}
                    onChange={(e) => handleUserSettingsChange('phone', e.target.value)}
                    data-testid="input-phone"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oab">Número da OAB</Label>
                  <Input
                    id="oab"
                    value={userSettings.oabNumber}
                    onChange={(e) => handleUserSettingsChange('oabNumber', e.target.value)}
                    data-testid="input-oab"
                  />
                </div>
              </div>

              {/* Firm Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informações do Escritório</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firmName">Nome do Escritório</Label>
                    <Input
                      id="firmName"
                      value={userSettings.firmName}
                      onChange={(e) => handleUserSettingsChange('firmName', e.target.value)}
                      data-testid="input-firm-name"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Textarea
                      id="address"
                      value={userSettings.address}
                      onChange={(e) => handleUserSettingsChange('address', e.target.value)}
                      rows={2}
                      data-testid="textarea-address"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => saveSettings('profile')}
                  data-testid="button-save-profile"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações importantes por email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                    data-testid="switch-email-notifications"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações no navegador e dispositivos
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(value) => handleNotificationChange('pushNotifications', value)}
                    data-testid="switch-push-notifications"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Lembretes de Audiências</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas sobre audiências próximas
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.hearingReminders}
                    onCheckedChange={(value) => handleNotificationChange('hearingReminders', value)}
                    data-testid="switch-hearing-reminders"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Prazos de Tarefas</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre vencimento de tarefas
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.taskDeadlines}
                    onCheckedChange={(value) => handleNotificationChange('taskDeadlines', value)}
                    data-testid="switch-task-deadlines"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Novas Mensagens</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas para novas mensagens e comentários
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newMessages}
                    onCheckedChange={(value) => handleNotificationChange('newMessages', value)}
                    data-testid="switch-new-messages"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Relatórios Semanais</Label>
                    <p className="text-sm text-muted-foreground">
                      Resumo semanal das atividades do escritório
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(value) => handleNotificationChange('weeklyReports', value)}
                    data-testid="switch-weekly-reports"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => saveSettings('notifications')}
                  data-testid="button-save-notifications"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Digite sua senha atual"
                    data-testid="input-current-password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Digite uma nova senha"
                    data-testid="input-new-password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua nova senha"
                    data-testid="input-confirm-password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="space-y-1">
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                </div>
                <Button 
                  variant="outline"
                  data-testid="button-setup-2fa"
                  onClick={() => console.log('Setup 2FA clicked')}
                >
                  Configurar 2FA
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => saveSettings('security')}
                  data-testid="button-save-password"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
                <Button 
                  variant="outline"
                  data-testid="button-view-sessions"
                  onClick={() => console.log('View sessions clicked')}
                >
                  Ver Sessões Ativas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select
                    value={systemSettings.theme}
                    onValueChange={(value) => handleSystemSettingsChange('theme', value)}
                  >
                    <SelectTrigger data-testid="select-theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) => handleSystemSettingsChange('language', value)}
                  >
                    <SelectTrigger data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => handleSystemSettingsChange('timezone', value)}
                  >
                    <SelectTrigger data-testid="select-timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup">Frequência de Backup</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => handleSystemSettingsChange('backupFrequency', value)}
                  >
                    <SelectTrigger data-testid="select-backup">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Salvamento Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Salvar alterações automaticamente enquanto trabalha
                  </p>
                </div>
                <Switch
                  checked={systemSettings.autoSave}
                  onCheckedChange={(value) => handleSystemSettingsChange('autoSave', value)}
                  data-testid="switch-auto-save"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => saveSettings('system')}
                  data-testid="button-save-system"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card className="hover-elevate">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciamento de Usuários
                </CardTitle>
                <Button data-testid="button-add-user" onClick={() => console.log('Add user clicked')}>
                  Adicionar Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>Funcionalidade de gerenciamento de usuários</p>
                  <p className="text-sm">Controle de permissões e acessos do escritório</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
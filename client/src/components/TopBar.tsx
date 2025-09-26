import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, User, Settings, LogOut, Shield, HelpCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Nova audiência marcada",
    message: "Audiência para o caso Silva vs. Estado marcada para 15/01",
    time: "5 min atrás",
    unread: true
  },
  {
    id: 2,
    title: "Documento aprovado",
    message: "Petição inicial do caso #2024-001 foi aprovada",
    time: "1 hora atrás",
    unread: true
  },
  {
    id: 3,
    title: "Prazo próximo do vencimento",
    message: "Resposta à contestação vence em 2 dias",
    time: "3 horas atrás",
    unread: false
  },
  {
    id: 4,
    title: "Pagamento recebido",
    message: "Cliente João Santos efetuou pagamento de R$ 2.500,00",
    time: "1 dia atrás",
    unread: false
  }
];

export function TopBar() {
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    console.log('Logout realizado');
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger data-testid="button-sidebar-toggle" />
      
      <div className="flex items-center gap-3">
        {/* Menu de Notificações */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Notificações</h4>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} novas
                  </Badge>
                )}
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md border text-sm space-y-1 ${
                      notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className={`font-medium ${notification.unread ? 'text-blue-900' : 'text-gray-900'}`}>
                        {notification.title}
                      </h5>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className={`text-xs ${notification.unread ? 'text-blue-700' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <p className={`text-xs ${notification.unread ? 'text-blue-500' : 'text-gray-500'}`}>
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Ver todas as notificações
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Menu do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="João Silva" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">João Silva</p>
                <p className="text-xs leading-none text-muted-foreground">
                  joao.silva@advocacia.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>Segurança</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ajuda</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  );
}
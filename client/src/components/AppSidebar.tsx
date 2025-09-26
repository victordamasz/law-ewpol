import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Scale, 
  Briefcase, 
  DollarSign, 
  FolderOpen,
  Settings,
  LogOut,
  Gavel,
  Clock,
  UserPlus
} from "lucide-react";

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Agenda",
    url: "/agenda", 
    icon: Calendar,
  },
  {
    title: "Tarefas",
    url: "/tarefas",
    icon: Clock,
  },
];

const legalMenuItems = [
  {
    title: "Processos",
    url: "/processos",
    icon: Scale,
  },
  {
    title: "Audiências",
    url: "/audiencias",
    icon: Gavel,
  },
  {
    title: "Pedidos INSS",
    url: "/inss",
    icon: FileText,
  },
  {
    title: "Casos",
    url: "/casos",
    icon: Briefcase,
  },
];

const adminMenuItems = [
  {
    title: "Documentos",
    url: "/documentos",
    icon: FileText,
  },
  {
    title: "Financeiro", 
    url: "/financeiro",
    icon: DollarSign,
  },
  {
    title: "Arquivos",
    url: "/arquivos", 
    icon: FolderOpen,
  },
  {
    title: "Usuários",
    url: "/usuarios",
    icon: UserPlus,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  
  const isActive = (url: string) => {
    return location === url || (url !== "/" && location.startsWith(url));
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-primary rounded-md">
            <Scale className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Sistema Jurídico</span>
            <span className="text-xs text-muted-foreground">Advocacia Moderna</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    data-testid={`sidebar-${item.title.toLowerCase()}`}
                    className={isActive(item.url) ? "bg-sidebar-accent" : ""}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Jurídico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {legalMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    data-testid={`sidebar-${item.title.toLowerCase()}`}
                    className={isActive(item.url) ? "bg-sidebar-accent" : ""}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    data-testid={`sidebar-${item.title.toLowerCase()}`}
                    className={isActive(item.url) ? "bg-sidebar-accent" : ""}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent/50">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Usuário" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">João Silva</p>
            <p className="text-xs text-muted-foreground truncate">Administrador</p>
          </div>
          <LogOut 
            className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" 
            data-testid="button-logout"
            onClick={() => console.log('Logout clicked')}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
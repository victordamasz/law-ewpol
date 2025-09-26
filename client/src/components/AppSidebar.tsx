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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  UserPlus,
  ChevronRight
} from "lucide-react";

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    badge: "3",
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
    badge: "12",
    submenu: [
      { title: "Lista de Clientes", url: "/clientes/lista" },
      { title: "Novo Cliente", url: "/clientes/novo" },
      { title: "Relatórios", url: "/clientes/relatorios" },
    ]
  },
  {
    title: "Agenda",
    url: "/agenda", 
    icon: Calendar,
    badge: "5",
  },
  {
    title: "Tarefas",
    url: "/tarefas",
    icon: Clock,
    badge: "8",
  },
];

const legalMenuItems = [
  {
    title: "Processos",
    url: "/processos",
    icon: Scale,
    badge: "24",
    submenu: [
      { title: "Em Andamento", url: "/processos/andamento" },
      { title: "Finalizados", url: "/processos/finalizados" },
      { title: "Aguardando", url: "/processos/aguardando" },
    ]
  },
  {
    title: "Audiências",
    url: "/audiencias",
    icon: Gavel,
    badge: "3",
  },
  {
    title: "Pedidos INSS",
    url: "/inss",
    icon: FileText,
    badge: "7",
  },
  {
    title: "Casos",
    url: "/casos",
    icon: Briefcase,
    badge: "15",
  },
];

const adminMenuItems = [
  {
    title: "Documentos",
    url: "/documentos",
    icon: FileText,
    submenu: [
      { title: "Contratos", url: "/documentos/contratos" },
      { title: "Petições", url: "/documentos/peticoes" },
      { title: "Modelos", url: "/documentos/modelos" },
    ]
  },
  {
    title: "Financeiro", 
    url: "/financeiro",
    icon: DollarSign,
    badge: "2",
    submenu: [
      { title: "Contas a Receber", url: "/financeiro/receber" },
      { title: "Contas a Pagar", url: "/financeiro/pagar" },
      { title: "Relatórios", url: "/financeiro/relatorios" },
    ]
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const isActive = (url: string) => {
    return location === url || (url !== "/" && location.startsWith(url));
  };

  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (itemTitle: string) => {
    setOpenSubmenus(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  const SidebarMenuItemWithTooltip = ({ item, children }: { item: any; children: React.ReactNode }) => {
    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      );
    }
    return <>{children}</>;
  };

  const renderMenuItem = (item: any) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenus.includes(item.title);

    if (hasSubmenu && !isCollapsed) {
      return (
        <Collapsible key={item.title} open={isSubmenuOpen} onOpenChange={() => toggleSubmenu(item.title)}>
          <SidebarMenuItem>
            <CollapsibleTrigger className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors hover:bg-sidebar-accent ${
              isActive(item.url) ? 'bg-sidebar-accent' : ''
            }`}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">
                  {item.badge}
                </Badge>
              )}
              <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${
                isSubmenuOpen ? 'rotate-90' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.submenu.map((subItem: any) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton 
                      asChild
                      className={isActive(subItem.url) ? "bg-sidebar-accent" : ""}
                    >
                      <Link href={subItem.url}>
                        {subItem.title}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuItemWithTooltip item={item}>
          <SidebarMenuButton 
            asChild
            data-testid={`sidebar-${item.title.toLowerCase()}`}
            className={isActive(item.url) ? "bg-sidebar-accent" : ""}
          >
            <Link href={item.url}>
              <item.icon className="h-4 w-4" />
              {!isCollapsed && (
                <>
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItemWithTooltip>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-primary rounded-md">
            <Scale className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">Sistema Jurídico</span>
              <span className="text-xs text-muted-foreground">Advocacia Moderna</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Principal</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Jurídico</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {legalMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Administração</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent/50">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Usuário" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              JS
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">João Silva</p>
              <p className="text-xs text-muted-foreground truncate">Administrador</p>
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <LogOut 
                className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" 
                data-testid="button-logout"
                onClick={() => console.log('Logout clicked')}
              />
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Sair</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
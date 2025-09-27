import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { 
  MessageCircle,
  Phone,
  Video,
  MoreVertical,
  Search,
  Paperclip,
  Smile,
  Send,
  Settings,
  UserCheck,
  Clock,
  CheckCheck,
  Camera,
  Mic,
  Users,
  Archive,
  Trash2,
  Star,
  VolumeX,
  Bell,
  Shield,
  Palette
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function ChatModule() {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Dados estáticos de conversas
  const conversations = [
    {
      id: 1,
      contact: {
        name: "Maria Silva Santos",
        phone: "(11) 99999-1234",
        avatar: "/api/placeholder/40/40",
        status: "online",
        lastSeen: "online",
        info: "Cliente - Processo trabalhista"
      },
      lastMessage: {
        text: "Boa tarde, Dr. João! Conseguiu analisar os documentos que enviei?",
        time: "14:25",
        isRead: false,
        fromMe: false
      },
      unreadCount: 2,
      messages: [
        {
          id: 1,
          text: "Boa tarde, Dr. João! Tudo bem?",
          time: "14:20",
          fromMe: false,
          status: "read"
        },
        {
          id: 2,
          text: "Boa tarde, Maria! Tudo bem sim, e você?",
          time: "14:22",
          fromMe: true,
          status: "read"
        },
        {
          id: 3,
          text: "Conseguiu analisar os documentos que enviei?",
          time: "14:25",
          fromMe: false,
          status: "delivered"
        }
      ]
    },
    {
      id: 2,
      contact: {
        name: "Carlos Oliveira",
        phone: "(11) 98888-5678",
        avatar: "/api/placeholder/40/40",
        status: "offline",
        lastSeen: "hoje às 12:45",
        info: "Cliente - Direito Civil"
      },
      lastMessage: {
        text: "Dr., quando será a próxima audiência?",
        time: "12:45",
        isRead: true,
        fromMe: false
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Bom dia, Dr. João!",
          time: "12:30",
          fromMe: false,
          status: "read"
        },
        {
          id: 2,
          text: "Bom dia, Carlos! Como posso ajudá-lo?",
          time: "12:35",
          fromMe: true,
          status: "read"
        },
        {
          id: 3,
          text: "Dr., quando será a próxima audiência?",
          time: "12:45",
          fromMe: false,
          status: "read"
        }
      ]
    },
    {
      id: 3,
      contact: {
        name: "Ana Costa Ferreira",
        phone: "(11) 97777-9012",
        avatar: "/api/placeholder/40/40",
        status: "offline",
        lastSeen: "ontem às 18:20",
        info: "Cliente - Processo Previdenciário"
      },
      lastMessage: {
        text: "Muito obrigada pelo esclarecimento!",
        time: "ontem",
        isRead: true,
        fromMe: false
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Dr., tenho uma dúvida sobre meu benefício",
          time: "18:15",
          fromMe: false,
          status: "read"
        },
        {
          id: 2,
          text: "Claro, Ana! Pode me explicar qual é a dúvida?",
          time: "18:18",
          fromMe: true,
          status: "read"
        },
        {
          id: 3,
          text: "Muito obrigada pelo esclarecimento!",
          time: "18:20",
          fromMe: false,
          status: "read"
        }
      ]
    },
    {
      id: 4,
      contact: {
        name: "Pedro Santos Lima",
        phone: "(11) 96666-3456",
        avatar: "/api/placeholder/40/40",
        status: "online",
        lastSeen: "online",
        info: "Colega Advogado"
      },
      lastMessage: {
        text: "Podemos marcar para amanhã às 15h?",
        time: "13:50",
        isRead: false,
        fromMe: false
      },
      unreadCount: 1,
      messages: [
        {
          id: 1,
          text: "João, preciso conversar sobre aquele processo",
          time: "13:45",
          fromMe: false,
          status: "read"
        },
        {
          id: 2,
          text: "Claro, Pedro! Quando você tem disponibilidade?",
          time: "13:48",
          fromMe: true,
          status: "read"
        },
        {
          id: 3,
          text: "Podemos marcar para amanhã às 15h?",
          time: "13:50",
          fromMe: false,
          status: "delivered"
        }
      ]
    },
    {
      id: 5,
      contact: {
        name: "Escritório Silva & Associados",
        phone: "(11) 95555-7890",
        avatar: "/api/placeholder/40/40",
        status: "offline",
        lastSeen: "hoje às 10:30",
        info: "Parceiro Comercial"
      },
      lastMessage: {
        text: "Enviamos a proposta por e-mail",
        time: "10:30",
        isRead: true,
        fromMe: false
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Bom dia! Temos uma proposta interessante",
          time: "10:15",
          fromMe: false,
          status: "read"
        },
        {
          id: 2,
          text: "Bom dia! Estou interessado em ouvir",
          time: "10:20",
          fromMe: true,
          status: "read"
        },
        {
          id: 3,
          text: "Enviamos a proposta por e-mail",
          time: "10:30",
          fromMe: false,
          status: "read"
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contact.phone.includes(searchTerm)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Clock className="h-3 w-3 text-muted-foreground" />;
      case "delivered": return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case "read": return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      fromMe: true,
      status: "sent"
    };

    // Simulação de envio - em um app real, isso seria uma API
    selectedChat.messages.push(newMsg);
    setNewMessage("");

    toast({
      title: "Mensagem enviada!",
      description: `Mensagem enviada para ${selectedChat.contact.name}`,
    });
  };

  const handleContactInfo = () => {
    setShowContactModal(true);
  };

  const formatTime = (timeStr: string) => {
    if (timeStr.includes(':')) return timeStr;
    return timeStr;
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col lg:flex-row gap-2 lg:gap-4 p-2 lg:p-4">
      {/* Conversas Sidebar */}
      <div className="w-full lg:w-80 flex flex-col bg-background rounded-lg border max-h-96 lg:max-h-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Conversas
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettingsModal(true)}
              data-testid="button-chat-settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-chats"
            />
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <div className="overflow-y-auto max-h-full">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedChat?.id === conversation.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => setSelectedChat(conversation)}
                data-testid={`conversation-${conversation.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
                      <AvatarFallback>
                        {conversation.contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.contact.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.contact.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessage.time)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-green-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className={`text-xs truncate ${!conversation.lastMessage.isRead ? 'font-medium' : 'text-muted-foreground'}`}>
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background rounded-lg border">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.contact.avatar} alt={selectedChat.contact.name} />
                      <AvatarFallback>
                        {selectedChat.contact.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {selectedChat.contact.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-background"></div>
                    )}
                  </div>
                  
                  <div className="cursor-pointer" onClick={handleContactInfo}>
                    <p className="font-medium text-sm">{selectedChat.contact.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.contact.status === 'online' ? 'online' : `visto por último ${selectedChat.contact.lastSeen}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" data-testid="button-voice-call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" data-testid="button-video-call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleContactInfo}
                    data-testid="button-contact-info"
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" data-testid="button-chat-menu">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Favoritar conversa
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <VolumeX className="h-4 w-4 mr-2" />
                        Silenciar notificações
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Arquivar conversa
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deletar conversa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-muted/10">
              <div className="space-y-4">
                {selectedChat.messages.map((message: any) => (
                  <div
                    key={message.id}
                    className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.fromMe
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background border'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.fromMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        <span className="text-xs">{message.time}</span>
                        {message.fromMe && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" data-testid="button-attach-file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" data-testid="button-camera">
                  <Camera className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                    data-testid="input-message"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    data-testid="button-emoji"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>

                {newMessage.trim() ? (
                  <Button onClick={handleSendMessage} data-testid="button-send-message">
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" data-testid="button-voice-message">
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Selecione uma conversa para começar</p>
              <p className="text-sm text-muted-foreground">
                Escolha uma conversa da lista à esquerda para visualizar as mensagens
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Info Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Informações do Contato</DialogTitle>
            <DialogDescription>
              Detalhes e configurações do contato selecionado.
            </DialogDescription>
          </DialogHeader>
          {selectedChat && (
            <div className="space-y-6">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={selectedChat.contact.avatar} alt={selectedChat.contact.name} />
                  <AvatarFallback className="text-lg">
                    {selectedChat.contact.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{selectedChat.contact.name}</h3>
                <p className="text-muted-foreground">{selectedChat.contact.info}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Telefone:</Label>
                  <p className="text-sm">{selectedChat.contact.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status:</Label>
                  <p className="text-sm">
                    {selectedChat.contact.status === 'online' ? (
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Online
                      </span>
                    ) : (
                      `Visto por último ${selectedChat.contact.lastSeen}`
                    )}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Informações:</Label>
                  <p className="text-sm">{selectedChat.contact.info}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Notificações</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Conversa favorita</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Bloquear contato</Label>
                  <Switch />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Fechar
            </Button>
            <Button onClick={() => {
              toast({ title: "Configurações salvas!", description: "As configurações do contato foram atualizadas." });
              setShowContactModal(false);
            }}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configurações do Chat</DialogTitle>
            <DialogDescription>
              Configure suas preferências de mensagens e notificações.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-3 block">Notificações</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label className="text-sm">Sons de notificação</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <Label className="text-sm">Notificações em grupo</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Privacidade</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <Label className="text-sm">Confirmações de leitura</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <Label className="text-sm">Mostrar quando estou online</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Aparência</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <Label className="text-sm">Tema escuro</Label>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({ title: "Configurações salvas!", description: "Suas preferências foram atualizadas com sucesso." });
              setShowSettingsModal(false);
            }}>
              Salvar Configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
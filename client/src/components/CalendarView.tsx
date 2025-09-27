import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Users,
  Phone,
  Edit,
  Eye,
  MoreHorizontal,
  UserPlus
} from "lucide-react";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock users data
  const mockUsers = [
    { id: 1, name: "Dr. João Silva", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face", role: "Advogado" },
    { id: 2, name: "Dra. Ana Costa", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face", role: "Advogada" },
    { id: 3, name: "Dr. Carlos Lima", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face", role: "Advogado" },
    { id: 4, name: "Dra. Maria Santos", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face", role: "Estagiária" }
  ];

  // Enhanced mock events with participants
  const mockEvents = [
    {
      id: 1,
      title: "Audiência - Silva vs. Santos",
      type: "hearing",
      date: new Date(2024, 11, 15, 14, 30),
      duration: 60,
      location: "1ª Vara Cível - Fórum Central",
      client: "Maria Silva",
      clientPhone: "(11) 99999-1111",
      clientEmail: "maria.silva@email.com",
      status: "confirmed",
      description: "Audiência de instrução e julgamento referente ao processo de divórcio. Preparar documentos relacionados à partilha de bens.",
      participants: [
        { ...mockUsers[0], role: "Advogado Responsável" },
        { ...mockUsers[1], role: "Advogada Assistente" },
        { id: 5, name: "Maria Silva", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face", role: "Cliente" }
      ],
      organizer: mockUsers[0]
    },
    {
      id: 2,
      title: "Reunião com Cliente - João Costa",
      type: "meeting",
      date: new Date(2024, 11, 16, 10, 0),
      duration: 90,
      location: "Escritório - Sala 1",
      client: "João Costa",
      clientPhone: "(11) 99999-2222",
      clientEmail: "joao.costa@email.com",
      status: "confirmed",
      description: "Discussão sobre estratégia de defesa em processo trabalhista. Análise de documentos e preparação de contestação.",
      participants: [
        { ...mockUsers[2], role: "Advogado Responsável" },
        { ...mockUsers[3], role: "Estagiária" },
        { id: 6, name: "João Costa", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face", role: "Cliente" }
      ],
      organizer: mockUsers[2]
    },
    {
      id: 3,
      title: "Análise de Processo",
      type: "task",
      date: new Date(2024, 11, 16, 15, 0),
      duration: 120,
      location: "Escritório",
      client: "Ana Ferreira",
      clientPhone: "(11) 99999-3333",
      clientEmail: "ana.ferreira@email.com",
      status: "pending",
      description: "Revisão completa dos autos do processo n° 1234567-89.2024.8.26.0001. Análise de jurisprudência e preparação de parecer.",
      participants: [
        { ...mockUsers[1], role: "Advogada Responsável" },
        { ...mockUsers[3], role: "Estagiária de Apoio" }
      ],
      organizer: mockUsers[1]
    },
    {
      id: 4,
      title: "Audiência Trabalhista",
      type: "hearing",
      date: new Date(2024, 11, 17, 9, 0),
      duration: 90,
      location: "2ª Vara Trabalhista",
      client: "Carlos Lima",
      clientPhone: "(11) 99999-4444",
      clientEmail: "carlos.lima@email.com",
      status: "confirmed",
      description: "Audiência de conciliação em processo trabalhista. Buscar acordo favorável para o cliente.",
      participants: [
        { ...mockUsers[2], role: "Advogado Responsável" },
        { ...mockUsers[0], role: "Advogado Consultor" },
        { id: 7, name: "Carlos Lima", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=32&h=32&fit=crop&crop=face", role: "Cliente" }
      ],
      organizer: mockUsers[2]
    },
    {
      id: 5,
      title: "Consulta Jurídica",
      type: "consultation",
      date: new Date(2024, 11, 18, 11, 0),
      duration: 60,
      location: "Escritório - Sala 2",
      client: "Empresa XYZ",
      clientPhone: "(11) 3333-4444",
      clientEmail: "contato@empresaxyz.com",
      status: "tentative",
      description: "Consulta sobre questões contratuais e compliance. Análise de minuta de contrato comercial.",
      participants: [
        { ...mockUsers[0], role: "Advogado Senior" },
        { ...mockUsers[1], role: "Advogada Especialista" },
        { id: 8, name: "Ricardo Oliveira", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face", role: "Representante Legal" }
      ],
      organizer: mockUsers[0]
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "hearing": return "bg-destructive/10 text-destructive border-destructive/20";
      case "meeting": return "bg-primary/10 text-primary border-primary/20";
      case "consultation": return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "task": return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      default: return "bg-muted text-muted-foreground border-muted/20";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "hearing": return <Gavel className="h-4 w-4" />;
      case "meeting": return <Users className="h-4 w-4" />;
      case "consultation": return <Phone className="h-4 w-4" />;
      case "task": return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "hearing": return "Audiência";
      case "meeting": return "Reunião";
      case "consultation": return "Consulta";
      case "task": return "Tarefa";
      default: return "Evento";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-chart-3/10 text-chart-3";
      case "tentative": return "bg-chart-2/10 text-chart-2";
      case "pending": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    console.log(`Navigate ${direction} to ${formatDate(newDate)}`);
  };

  const todayEvents = mockEvents.filter(event => {
    const today = new Date();
    return event.date.toDateString() === today.toDateString();
  });

  const upcomingEvents = mockEvents
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const openEventDetails = (event: any) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const openEventEdit = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = mockEvents.filter(event => 
        event.date.toDateString() === date.toDateString()
      );
      days.push({
        date,
        day,
        events: dayEvents,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    
    return days;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">Gerencie audiências, reuniões e compromissos</p>
        </div>
        <Button data-testid="button-add-event" onClick={() => console.log('Add event clicked')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Compromisso
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigateMonth('prev')}
            data-testid="button-prev-month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground min-w-[200px] text-center">
            {currentDate.toLocaleDateString('pt-BR', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigateMonth('next')}
            data-testid="button-next-month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          {(['month', 'week', 'day'] as const).map((view) => (
            <Button
              key={view}
              variant={selectedView === view ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedView(view);
                console.log(`View changed to ${view}`);
              }}
              data-testid={`button-view-${view}`}
            >
              {view === 'month' && 'Mês'}
              {view === 'week' && 'Semana'}
              {view === 'day' && 'Dia'}
            </Button>
          ))}
        </div>
      </div>

      {/* Calendar Grid View */}
      {selectedView === "month" && (
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg">Calendário Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Week headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <div 
                  key={index} 
                  className={`
                    min-h-[120px] p-2 border rounded-md
                    ${day?.isToday ? 'bg-primary/5 border-primary' : 'border-border/20'}
                    ${day ? 'hover:bg-muted/30 transition-colors' : ''}
                  `}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${day.isToday ? 'text-primary' : 'text-foreground'}`}>
                        {day.day}
                      </div>
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map((event) => (
                          <div 
                            key={event.id}
                            className={`text-xs p-1 rounded cursor-pointer ${getEventTypeColor(event.type)} hover:opacity-80`}
                            onClick={() => openEventDetails(event)}
                            data-testid={`calendar-event-${event.id}`}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              {getEventTypeIcon(event.type)}
                              <span className="truncate">{event.title}</span>
                            </div>
                            <div className="text-xs opacity-75">{formatTime(event.date)}</div>
                            {/* Participants avatars */}
                            <div className="flex -space-x-1 mt-1">
                              {event.participants.slice(0, 3).map((participant, idx) => (
                                <Avatar key={participant.id} className="h-4 w-4 border border-background">
                                  <AvatarImage src={participant.avatar} alt={participant.name} />
                                  <AvatarFallback className="text-[8px]">
                                    {participant.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {event.participants.length > 3 && (
                                <div className="h-4 w-4 rounded-full bg-muted text-[8px] flex items-center justify-center border border-background">
                                  +{event.participants.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {day.events.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{day.events.length - 2} mais
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Events */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Hoje ({formatDate(new Date())})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhum compromisso hoje</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`p-3 rounded-md border-l-4 cursor-pointer hover:bg-muted/20 ${getEventTypeColor(event.type)}`}
                    onClick={() => openEventDetails(event)}
                    data-testid={`today-event-${event.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getEventTypeIcon(event.type)}
                        <span className="text-sm font-medium">{event.title}</span>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status === 'confirmed' && 'Confirmado'}
                        {event.status === 'tentative' && 'Tentativo'}
                        {event.status === 'pending' && 'Pendente'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatTime(event.date)} - {event.client}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                    {/* Participants */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {event.participants.slice(0, 3).map((participant) => (
                          <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={participant.avatar} alt={participant.name} />
                            <AvatarFallback className="text-xs">
                              {participant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {event.participants.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{event.participants.length - 3} participantes
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="hover-elevate lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Próximos Compromissos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center gap-4 p-4 rounded-md border hover-elevate cursor-pointer"
                  onClick={() => openEventDetails(event)}
                  data-testid={`event-card-${event.id}`}
                >
                  <div className={`p-2 rounded-md ${getEventTypeColor(event.type)}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">Cliente: {event.client}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {event.participants.slice(0, 4).map((participant) => (
                          <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={participant.avatar} alt={participant.name} />
                            <AvatarFallback className="text-xs">
                              {participant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {event.participants.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{event.participants.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(event.status)}>
                      {event.status === 'confirmed' && 'Confirmado'}
                      {event.status === 'tentative' && 'Tentativo'}
                      {event.status === 'pending' && 'Pendente'}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEventEdit(event);
                      }}
                      data-testid={`button-edit-event-${event.id}`}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {upcomingEvents.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                Nenhum compromisso agendado
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de Detalhes do Evento */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent && getEventTypeIcon(selectedEvent.type)}
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              {/* Informações básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Tipo</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getEventTypeColor(selectedEvent.type)}>
                      {getEventTypeLabel(selectedEvent.type)}
                    </Badge>
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {selectedEvent.status === 'confirmed' && 'Confirmado'}
                      {selectedEvent.status === 'tentative' && 'Tentativo'}
                      {selectedEvent.status === 'pending' && 'Pendente'}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Cliente</Label>
                  <p className="mt-1 font-medium">{selectedEvent.client}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.clientPhone}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.clientEmail}</p>
                </div>
              </div>

              {/* Data, hora e local */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Horário</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(selectedEvent.date)} ({selectedEvent.duration}min)</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Local</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                <p className="mt-1 text-sm">{selectedEvent.description}</p>
              </div>

              {/* Participantes */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Participantes ({selectedEvent.participants.length})
                </Label>
                <div className="space-y-3">
                  {selectedEvent.participants.map((participant: Participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/20">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organizador */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Organizador</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedEvent.organizer.avatar} alt={selectedEvent.organizer.name} />
                    <AvatarFallback>{selectedEvent.organizer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedEvent.organizer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.organizer.role}</p>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                  Fechar
                </Button>
                <Button 
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  data-testid="button-edit-from-details"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição do Evento */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              {/* Formulário de edição */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Título</Label>
                  <Input 
                    id="edit-title"
                    defaultValue={selectedEvent.title}
                    data-testid="input-edit-title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-type">Tipo</Label>
                  <Select defaultValue={selectedEvent.type}>
                    <SelectTrigger data-testid="select-edit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hearing">Audiência</SelectItem>
                      <SelectItem value="meeting">Reunião</SelectItem>
                      <SelectItem value="consultation">Consulta</SelectItem>
                      <SelectItem value="task">Tarefa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-date">Data</Label>
                  <Input 
                    id="edit-date"
                    type="date"
                    defaultValue={selectedEvent.date.toISOString().split('T')[0]}
                    data-testid="input-edit-date"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-time">Horário</Label>
                  <Input 
                    id="edit-time"
                    type="time"
                    defaultValue={selectedEvent.date.toTimeString().slice(0, 5)}
                    data-testid="input-edit-time"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-duration">Duração (min)</Label>
                  <Input 
                    id="edit-duration"
                    type="number"
                    defaultValue={selectedEvent.duration}
                    data-testid="input-edit-duration"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-location">Local</Label>
                <Input 
                  id="edit-location"
                  defaultValue={selectedEvent.location}
                  data-testid="input-edit-location"
                />
              </div>

              <div>
                <Label htmlFor="edit-client">Cliente</Label>
                <Input 
                  id="edit-client"
                  defaultValue={selectedEvent.client}
                  data-testid="input-edit-client"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea 
                  id="edit-description"
                  defaultValue={selectedEvent.description}
                  rows={3}
                  data-testid="textarea-edit-description"
                />
              </div>

              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedEvent.status}>
                  <SelectTrigger data-testid="select-edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="tentative">Tentativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Participantes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Participantes</Label>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Participante
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedEvent.participants.map((participant: Participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/20">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={() => {
                    setIsEditModalOpen(false);
                    console.log('Event updated');
                  }}
                  data-testid="button-save-event"
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
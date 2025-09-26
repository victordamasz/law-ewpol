import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Users,
  Phone
} from "lucide-react";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">("month");

  // Todo: remove mock functionality
  const mockEvents = [
    {
      id: 1,
      title: "Audiência - Silva vs. Santos",
      type: "hearing",
      date: new Date(2024, 11, 15, 14, 30),
      duration: 60,
      location: "1ª Vara Cível - Fórum Central",
      client: "Maria Silva",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Reunião com Cliente - João Costa",
      type: "meeting",
      date: new Date(2024, 11, 16, 10, 0),
      duration: 90,
      location: "Escritório - Sala 1",
      client: "João Costa",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Análise de Processo",
      type: "task",
      date: new Date(2024, 11, 16, 15, 0),
      duration: 120,
      location: "Escritório",
      client: "Ana Ferreira",
      status: "pending"
    },
    {
      id: 4,
      title: "Audiência Trabalhista",
      type: "hearing",
      date: new Date(2024, 11, 17, 9, 0),
      duration: 90,
      location: "2ª Vara Trabalhista",
      client: "Carlos Lima",
      status: "confirmed"
    },
    {
      id: 5,
      title: "Consulta Jurídica",
      type: "consultation",
      date: new Date(2024, 11, 18, 11, 0),
      duration: 60,
      location: "Escritório - Sala 2",
      client: "Empresa XYZ",
      status: "tentative"
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
                  <div key={event.id} className={`p-3 rounded-md border-l-4 ${getEventTypeColor(event.type)}`}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getEventTypeIcon(event.type)}
                        <span className="text-sm font-medium">{event.title}</span>
                      </div>
                      <Badge className={getStatusColor(event.status)} size="sm">
                        {event.status === 'confirmed' && 'Confirmado'}
                        {event.status === 'tentative' && 'Tentativo'}
                        {event.status === 'pending' && 'Pendente'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {formatTime(event.date)} - {event.client}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
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
                  className="flex items-center gap-4 p-4 rounded-md border hover-elevate"
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
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                      onClick={() => console.log(`Edit event ${event.id}`)}
                      data-testid={`button-edit-event-${event.id}`}
                    >
                      Editar
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
    </div>
  );
}
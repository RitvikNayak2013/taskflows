
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  attendees?: string[];
  color: string;
}

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Standup",
      date: new Date(2024, 0, 15),
      time: "10:00 AM",
      attendees: ["John", "Sarah", "Mike"],
      color: "bg-blue-500"
    },
    {
      id: "2",
      title: "Client Review",
      date: new Date(2024, 0, 16),
      time: "2:00 PM",
      location: "Conference Room A",
      color: "bg-green-500"
    },
    {
      id: "3",
      title: "Project Deadline",
      date: new Date(2024, 0, 20),
      time: "5:00 PM",
      color: "bg-red-500"
    }
  ]);
  
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    attendees: ""
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: new Date(newEvent.date),
      time: newEvent.time,
      location: newEvent.location || undefined,
      attendees: newEvent.attendees ? newEvent.attendees.split(",").map(a => a.trim()) : undefined,
      color: "bg-blue-500"
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({ title: "", date: "", time: "", location: "", attendees: "" });
    setShowAddEvent(false);
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Calendar</h2>
        <p className="text-slate-600">Manage your schedule and upcoming events.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day && 
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentDate.getMonth() &&
                  new Date().getFullYear() === currentDate.getFullYear();
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-1 border border-slate-200 ${
                      day ? "bg-white hover:bg-slate-50" : "bg-slate-50"
                    } ${isToday ? "bg-blue-50 border-blue-300" : ""}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? "text-blue-600" : "text-slate-800"
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                              title={`${event.title} at ${event.time}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-slate-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Add Event */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Quick Add</span>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddEvent(!showAddEvent)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Event
                </Button>
              </CardTitle>
            </CardHeader>
            
            {showAddEvent && (
              <CardContent className="space-y-3">
                <Input
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                />
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                />
                <Input
                  placeholder="Location (optional)"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                />
                <Input
                  placeholder="Attendees (comma separated)"
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={addEvent} size="sm" className="flex-1">
                    Add
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAddEvent(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-slate-500">No upcoming events</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
                        <Clock className="h-3 w-3" />
                        {event.date.toLocaleDateString()} at {event.time}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
                          <Users className="h-3 w-3" />
                          {event.attendees.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

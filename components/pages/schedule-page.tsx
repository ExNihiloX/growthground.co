'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, Plus, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { mockScheduleEvents } from '@/lib/data';
import { ScheduleEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

export function SchedulePage() {
  const { scheduleEvents, setScheduleEvents } = useAppStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (scheduleEvents.length === 0) {
      setScheduleEvents(mockScheduleEvents);
    }
  }, [scheduleEvents.length, setScheduleEvents]);

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = scheduleEvents.filter(event => 
    event.startTime.split('T')[0] === today
  );

  const upcomingEvents = scheduleEvents.filter(event => 
    event.startTime.split('T')[0] > today && !event.completed
  ).slice(0, 5);

  const overdue = scheduleEvents.filter(event => 
    event.startTime.split('T')[0] < today && !event.completed
  );

  const getEventTypeIcon = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'lesson': return Clock;
      case 'assignment': return AlertCircle;
      case 'reminder': return Bell;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-red-100 text-red-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const EventCard = ({ event }: { event: ScheduleEvent }) => {
    const Icon = getEventTypeIcon(event.type);
    const isOverdue = event.startTime.split('T')[0] < today && !event.completed;

    return (
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md",
        event.completed && "opacity-60",
        isOverdue && "border-red-200 bg-red-50"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              event.completed ? "bg-green-100" : isOverdue ? "bg-red-100" : "bg-gray-100"
            )}>
              {event.completed ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Icon className={cn(
                  "h-4 w-4",
                  isOverdue ? "text-red-600" : "text-gray-600"
                )} />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  "font-semibold",
                  event.completed ? "line-through text-gray-500" : "text-gray-900"
                )}>
                  {event.title}
                </h3>
                <Badge className={getEventTypeColor(event.type)}>
                  {event.type}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">Overdue</Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{formatTime(event.startTime)}</span>
                {event.startTime !== event.endTime && (
                  <span>- {formatTime(event.endTime)}</span>
                )}
              </div>
            </div>
            
            {!event.completed && (
              <Button size="sm" variant="outline">
                Mark Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600 mt-1">
            Manage your learning schedule and stay on track
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{todayEvents.length}</h3>
            <p className="text-gray-600">Today's Events</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {scheduleEvents.filter(e => e.completed).length}
            </h3>
            <p className="text-gray-600">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-yellow-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</h3>
            <p className="text-gray-600">Upcoming</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-red-100 p-3 rounded-xl w-fit mx-auto mb-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{overdue.length}</h3>
            <p className="text-gray-600">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No events today
                </h3>
                <p className="text-gray-600">
                  Enjoy your free time or add a new learning session!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No upcoming events
                </h3>
                <p className="text-gray-600">
                  Schedule your next learning session to stay on track!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overdue Items */}
      {overdue.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              Overdue Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdue.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar View Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Full Calendar Coming Soon
            </h3>
            <p className="text-gray-600">
              Interactive calendar view with drag-and-drop scheduling
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import Event from '@/components/Event';
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface EventType {
  _id: string;
  title: string;
  description: string;
  category: string;
  organizer: string;
  group: string;
  venue: string;
  eventDate: string;
  capacity: number;
}

export function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');  // Get current user from localStorage
  
  // Check if user is an organizer
  const isOrganizer = user.role === 'organizer';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get<EventType[]>('/events'); // Fetch events from API
        setEvents(response.data); // Update events state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        {isOrganizer && (
          <Button className="flex items-center" onClick={() => navigate('/createevent')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event
              key={event._id}
              title={event.title}
              description={event.description}
              date={format(new Date(event.eventDate), 'MMMM d, yyyy')}
              time={format(new Date(event.eventDate), 'h:mm a')}
              location={event.venue}
              attendees={event.capacity}
              onRSVP={() => alert(`RSVP’d to ${event.title}`)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No events found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import axiosInstance from '@/lib/axiosInstance'; // Import your axios instance
import Event from '@/components/Event'; // Assuming you have the Event component
import { format } from 'date-fns';
import Group from '@/components/Group';

export function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]); // State for events
  const [groups, setGroups] = useState<any[]>([]); // State for groups
  const [eventError, setEventError] = useState<string>(''); // Separate error for events
  const [groupError, setGroupError] = useState<string>(''); // Separate error for groups

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/events'); // Fetch events from API
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventError('Failed to load events. Please try again later.');
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get('/groups'); // Fetch groups from API
        setGroups(response.data.groups); // Access the 'groups' array in the response
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroupError('Failed to load groups. Please try again later.');
      }
    };

    fetchEvents();
    fetchGroups();
  }, []);

  return (
    <div className="space-y-8">
      <section className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Students collaborating"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Connect. Collaborate. Create.
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-100">
            Join the vibrant community of students, discover exciting events, and make lasting connections
            on campus.
          </p>
          <div className="mt-10 flex space-x-4">
            {/* Navigate to Registration Page */}
            <Button onClick={() => navigate('/groups')} size="lg" className="font-semibold">
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* Navigate to About Us Page */}
            <Button onClick={() => navigate('/about')} size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          {/* Display error message if fetching events failed */}
          {eventError && <p className="text-red-500">{eventError}</p>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.length > 0 ? (
              events.map((event: any) => (
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
              <p className="text-gray-500 text-center col-span-3">No upcoming events found.</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Groups</h2>
          {/* Display error message if fetching groups failed */}
          {groupError && <p className="text-red-500">{groupError}</p>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.length > 0 ? (
              groups.map((group: any) => (
                <Group
                  key={group._id} // Use _id for unique key
                  name={group.name}
                  description={group.description}
                  membersCount={group.members.length} // Use length of members array for count
                  category={group.category}
                  onJoin={() => alert(`Joined ${group.name}!`)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">No popular groups found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

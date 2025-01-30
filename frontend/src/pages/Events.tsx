import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Search, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';

export function Events() {
  const today = new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80`}
              alt="Event cover"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Tech Meetup {i}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(today, 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  {format(today, 'h:mm a')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-2 h-4 w-4" />
                  Student Center
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">50 attending</span>
                <Button>RSVP</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
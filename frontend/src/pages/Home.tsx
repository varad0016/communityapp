
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Home() {
  const navigate = useNavigate();
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
            <Button onClick={() => navigate('/register')} size="lg" className="font-semibold">
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
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          {/* Event cards will go here */}
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900">Popular Groups</h2>
          {/* Group cards will go here */}
        </div>
      </section>
    </div>
  );
}

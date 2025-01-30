import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AboutUs() {
     const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Community collaboration"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-100">
            A platform built for students, by students—where collaboration meets opportunity.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to <strong>Campus Connect</strong>, a dynamic and inclusive community platform designed exclusively for college students. 
            Our mission is to foster collaboration, engagement, and meaningful connections by providing a seamless way to create or join groups, 
            find flatmates, and participate in college events.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
          <p className="mt-4 text-lg text-gray-600">
            We believe that college life is more than just academics—it's about building lifelong connections, 
            exploring new opportunities, and making unforgettable memories. Our platform is designed to empower students 
            by offering tools that enhance networking, teamwork, and event participation.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center">What We Offer</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Find & Join Communities", description: "Explore and connect with groups based on shared interests—hackathons, tech clubs, study groups, or flatmate searches." },
              { title: "Seamless Event Management", description: "Organize and participate in college events with easy RSVP options, reminders, and updates." },
              { title: "Engaging Discussions & Announcements", description: "Stay informed with real-time updates, chat with members, and collaborate through forums." },
              { title: "Event Organizer Tools", description: "Manage event logistics, track attendance, and collect feedback effortlessly." },
              { title: "AI-Powered Personalization", description: "Get smart recommendations for events and groups based on your interests and behavior." },
              { title: "Intelligent Matching System", description: "Our AI suggests the best flatmates or hackathon teammates based on preferences, availability, and compatibility." }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600">{feature.title}</h3>
                <p className="mt-2 text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { title: "✅ Student-Centric Approach", description: "Designed by students, for students." },
              { title: "✅ User-Friendly Interface", description: "A clean, modern, and intuitive design for effortless navigation." },
              { title: "✅ Innovative AI Features", description: "Personalized suggestions to make networking and collaboration easier." },
              { title: "✅ Secure & Reliable", description: "We prioritize privacy, security, and a positive community experience." }
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600">{reason.title}</h3>
                <p className="mt-2 text-gray-700">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-blue-600 py-12 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Join Us Today!</h2>
          <p className="mt-4 text-lg">
            Be part of a thriving college network where collaboration meets opportunity. Whether you're looking to form a hackathon team, 
            find a roommate, or attend exciting events, <strong>[Platform Name]</strong> is here to help you make the most of your college journey.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a href="/register" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
              Sign Up Now
            </a>
            <a onClick={() => navigate('/groups')} href="/events" className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white/10">
              Explore Events
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

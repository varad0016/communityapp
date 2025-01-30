import React from 'react';
import { Mail, Briefcase, GraduationCap, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="px-6 pb-6">
          <div className="relative flex items-end space-x-4">
            <div className="-mt-16">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQGBJya-LNa2Ug/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727883743066?e=1743638400&v=beta&t=bzWJ72SIDuYTGbeLJmcwa_8wB8xy7qcjo5A-MXs-UlE"
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 pt-4">
              <h1 className="text-2xl font-bold text-gray-900">Kunal Kande</h1>
              <p className="text-sm text-gray-500">Computer Science • Class of 2025</p>
            </div>
            <div className="pt-4">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-gray-400" />
                <span>kunal.22420273@viit.ac.in</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design'].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600">
              Computer Science student passionate about web development and AI. Looking to collaborate
              on innovative projects and meet fellow tech enthusiasts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Groups</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Coding Club</h3>
                      <p className="text-sm text-gray-500">25 members</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Hackathon {i}</h3>
                      <p className="text-sm text-gray-500">This Weekend • Student Center</p>
                    </div>
                  </div>
                  <Button size="sm">RSVP</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
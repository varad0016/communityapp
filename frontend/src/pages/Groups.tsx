import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Groups() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sample group cards - will be dynamic */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Study Group {i}</h3>
              <p className="mt-1 text-sm text-gray-500">Computer Science • 25 members</p>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                A group for students to collaborate on projects and share resources.
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full">Join Group</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Group from '@/components/Group';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define types for group and response structure
interface GroupType {
  _id: string;
  name: string;
  description: string;
  category: string;
  members: { _id: string; name: string }[];
}

interface ApiResponse {
  status: string;
  groups: GroupType[];
}

export function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCategory, setFilteredCategory] = useState<string>('');

  // Get user information from localStorage and check their role
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isOrganizer = user.role === 'organizer';

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get<ApiResponse>('http://localhost:8000/api/groups', { headers });
    
        // Check if the content type is JSON
        if (response.headers['content-type']?.includes('application/json')) {
          if (response.data.status === 'success') {
            setGroups(response.data.groups);
          } else {
            console.error('Error fetching groups:', response.data);
          }
        } else {
          console.error('Expected JSON response, but got:', response);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Categories from the fetched groups data
  const categories = ['All', ...new Set(groups.map((group) => group.category))];

  // Filter groups based on search term and category
  const filteredGroups = groups.filter(
    (group) =>
      (group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filteredCategory === '' || filteredCategory === 'All' || group.category === filteredCategory)
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
        {isOrganizer && (
          <Button className="flex items-center" onClick={() => navigate('/creategroup')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        )}
      </div>

      {/* Search & Filter Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Group List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <Group
              key={index}
              name={group.name}
              description={group.description}
              membersCount={group.members.length} // Use length of members array for count
              category={group.category}
              onJoin={() => alert(`Joined ${group.name}!`)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No groups found. Try a different search or filter.</p>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';

export function CreateGroup() {
  const navigate = useNavigate();
  const [groupImage, setGroupImage] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState('');
  const [groupName, setGroupName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user._id;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGroupImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const groupData = {
      name: groupName,
      description,
      category,  // category can be selected via dropdown
      createdBy: userId,  // Replace with actual user ID (e.g., from Auth context)
      members: [],  // Initially empty, can be updated as members are added
    };

    console.log(groupData);

    try {
      const response = await axiosInstance.post("/groups", {
        name: groupData.name,
        description: groupData.description,
        category: groupData.category
      });
      console.log("Group Created:", response.data);
      navigate("/groups");  // Correct redirection to the groups page
    } catch (error) {
      console.error("Error creating group:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
        <Button variant="ghost" onClick={() => navigate('/groups')}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="space-y-4">
          {/* Group Cover Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Group Cover Image</label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center h-32 w-full rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors"
              >
                {groupImage ? (
                  <img src={groupImage} alt="Preview" className="h-full w-full object-cover rounded-md" />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="mx-auto h-8 w-8" />
                    <p className="mt-1 text-sm">Upload Image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Group Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              required
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter group name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Describe the purpose of the group"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="hackathon">Hackathon</option>
              <option value="housing">Housing</option>
              <option value="study">Study</option>
              <option value="sports">Sports</option>
              <option value="project">Project</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate('/groups')}>
            Cancel
          </Button>
          <Button type="submit">
            Create Group
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import axios from 'axios';

export function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);  // Ensure this is an array
    const [groups, setGroups] = useState<any[]>([]);

    // Default fallback values
    const defaultProfile = {
        name: 'Unknown User',
        major: 'Not Specified',
        classYear: 'N/A',
        email: 'No email provided',
        phone: 'Not provided',
        about: 'No information available.',
        skills: [],
        profilePicture: 'https://via.placeholder.com/150',
    };

    useEffect(() => {
        // Load data from local storage
        const storedProfile = localStorage.getItem('user');
        let parsedProfile = defaultProfile;

        try {
            if (storedProfile) {
                // Attempt to parse the stored JSON string
                parsedProfile = JSON.parse(storedProfile);
            }
        } catch (error) {
            console.error("Error parsing stored profile data:", error);
        }

        // Update state with the profile data from localStorage (or default)
        setProfileData(parsedProfile);
    }, []);

    useEffect(() => {
        // Fetch the user's events
        const fetchUserEvents = async () => {
            try {
                const response = await axios.get('/api/user/events');
                // Ensure response data is an array
                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setEvents([]); // fallback to an empty array if the data is not an array
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]); // Set empty array in case of error
            }
        };

        // Fetch the user's groups
        const fetchUserGroups = async () => {
            try {
                const response = await axios.get('/api/user/groups');
                // Handle null or invalid group data
                setGroups(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching groups:', error);
                setGroups([]); // Fallback to empty array if an error occurs
            }
        };

        fetchUserEvents();
        fetchUserGroups();
    }, []);

    // Fallback to defaultProfile if profileData is null
    const data = profileData || defaultProfile;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
                <div className="px-6 pb-6">
                    <div className="relative flex items-end space-x-4">
                        <div className="-mt-16">
                            <img
                                src={data.profilePicture}
                                alt="Profile"
                                className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0 pt-4">
                            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
                            <p className="text-sm text-gray-500">Computer Engineering • Class of 2025</p>
                        </div>
                        <div className="pt-4">
                            <Button onClick={() => navigate('/edit_prf')} variant="outline">Edit Profile</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="grid gap-8 md:grid-cols-3">
                {/* Contact & Skills */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
                        <div className="space-y-3">
                            <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-gray-400" />
                                <span>{data.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Phone className="mr-2 h-4 w-4 text-gray-400" />
                                <span>{data.phone || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills && data.skills.length > 0 ? (
                                data.skills.map((skill: any) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500">No skills added</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* About, Groups, and Events */}
                <div className="md:col-span-2 space-y-6">
                    {/* About Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                        <p className="text-gray-600">{data.bio || 'No information available.'}</p>
                    </div>

                    {/* My Groups */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Groups</h2>
                        <div className="space-y-4">
                            {groups && groups.length > 0 ? (
                                groups.map((group) => (
                                    <div key={group._id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600" />
                                            <div>
                                                <h3 className="font-medium text-gray-900">{group.name}</h3>
                                                <p className="text-sm text-gray-500">{group.members.length} members</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">View</Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">You are not part of any groups yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
                        <div className="space-y-4">
                            {events && events.length > 0 ? (
                                events.map((event) => (
                                    <div key={event._id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600" />
                                            <div>
                                                <h3 className="font-medium text-gray-900">{event.title}</h3>
                                                <p className="text-sm text-gray-500">{event.eventDate} • {event.venue}</p>
                                            </div>
                                        </div>
                                        <Button size="sm">RSVP</Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">You have no upcoming events.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function EditProfile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    const [tempSkill, setTempSkill] = useState<string>('');
    const [profileData, setProfileData] = useState<any>(user);  // Initialize with stored user data

    // Ensure profile data exists in localStorage before loading
    useEffect(() => {
        if (!user || !user._id) {
            alert('No profile data found. Please log in again.');
            navigate('/login');
        }
    }, [user, navigate]);

    // Handle changes in fields like name and phone number
    const handleFieldChange = (field: string, value: string) => {
        setProfileData((prevProfile: any) => ({
            ...prevProfile,
            [field]: value,
        }));
    };

    const handleSkillAdd = () => {
        if (tempSkill.trim() && !profileData.skills.includes(tempSkill.trim())) {
            const updatedProfile = {
                ...profileData,
                skills: [...profileData.skills, tempSkill.trim()],
            };
            setProfileData(updatedProfile);
            setTempSkill('');
        }
    };

    const handleSkillRemove = (skillToRemove: string) => {
        const updatedProfile = {
            ...profileData,
            skills: profileData.skills.filter((skill: string) => skill !== skillToRemove),
        };
        setProfileData(updatedProfile);
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    const updatedProfile = { ...profileData, profilePicture: reader.result };
                    setProfileData(updatedProfile);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfilePicture = () => {
        const updatedProfile = { ...profileData, profilePicture: '' };
        setProfileData(updatedProfile);
    };

    const handleSave = () => {
        try {
            localStorage.setItem('user', JSON.stringify(profileData));
            alert('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
                <div className="px-6 pb-6">
                    <div className="relative flex items-end space-x-4">
                        <div className="-mt-16 relative">
                            {profileData.profilePicture ? (
                                <>
                                    <img
                                        src={profileData.profilePicture}
                                        alt="Profile"
                                        className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover"
                                    />
                                    <button
                                        onClick={handleRemoveProfilePicture}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-500">No Profile Picture</p>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 pt-4 space-y-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                className="text-2xl font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-md border border-gray-300 w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Contact</h2>
                <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className="bg-gray-50 px-2 py-1 rounded-md border border-gray-300 flex-1"
                        placeholder="Enter phone number"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                    {profileData.skills.map((skill: string) => (
                        <span key={skill} className="flex items-center bg-blue-50 px-3 py-1 text-sm rounded-full">
                            {skill}
                            <button onClick={() => handleSkillRemove(skill)} className="ml-1 p-1">
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={tempSkill}
                        onChange={(e) => setTempSkill(e.target.value)}
                        placeholder="Add skill"
                        className="flex-1 text-sm px-2 py-1 border rounded-md"
                    />
                    <Button variant="outline" size="sm" onClick={handleSkillAdd}>Add</Button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">About</h2>
                <textarea
                    value={profileData.bio}
                    onChange={(e) => handleFieldChange('bio', e.target.value)}
                    className="w-full h-32 px-3 py-2 border rounded-md bg-gray-50"
                    placeholder="Tell us about yourself..."
                />
            </div>

            <div className="flex justify-end gap-4">
                <Button onClick={() => navigate('/profile')} variant="outline">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
}

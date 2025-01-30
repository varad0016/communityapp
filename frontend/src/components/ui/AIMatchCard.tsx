import React from 'react';
import { Sparkles, Users, Star } from 'lucide-react';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Badge } from './Badge';

interface MatchCardProps {
  type: 'flatmate' | 'hackathon';
  matchScore: number;
  user: {
    name: string;
    avatar?: string;
    major?: string;
    skills?: string[];
    preferences?: {
      [key: string]: string;
    };
  };
  onConnect: () => void;
}

export function AIMatchCard({ type, matchScore, user, onConnect }: MatchCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar src={user.avatar} size="lg" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            {user.major && <p className="text-sm text-gray-500">{user.major}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-blue-50 rounded-full px-3 py-1">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">{matchScore}% Match</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {type === 'hackathon' && user.skills && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        {type === 'flatmate' && user.preferences && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preferences</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(user.preferences).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{key}:</span>
                  <span className="text-sm font-medium text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button onClick={onConnect} className="w-full">
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
}
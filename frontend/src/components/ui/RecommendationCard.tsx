import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

interface RecommendationProps {
  type: 'event' | 'group';
  title: string;
  description: string;
  matchScore: number;
  details: {
    date?: string;
    location?: string;
    members?: number;
    category: string;
  };
  image?: string;
  onViewMore: () => void;
}

export function RecommendationCard({
  type,
  title,
  description,
  matchScore,
  details,
  image,
  onViewMore
}: RecommendationProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      {image && (
        <div className="h-48 w-full relative">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="success" className="bg-blue-500 text-white">
              {matchScore}% Match
            </Badge>
          </div>
        </div>
      )}
      <Card.Body>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        
        <div className="mt-4 space-y-2">
          {details.date && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {details.date}
            </div>
          )}
          {details.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {details.location}
            </div>
          )}
          {details.members && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {details.members} members
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Badge variant="secondary" className="mt-2">
              {details.category}
            </Badge>
          </div>
        </div>

        <Button
          onClick={onViewMore}
          className="w-full mt-4 flex items-center justify-center"
        >
          View More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card.Body>
    </Card>
  );
}
import React from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  title: string;
  description: string;
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress?: number;
  className?: string;
}

export function AchievementBadge({
  title,
  description,
  level = 'bronze',
  progress,
  className
}: AchievementBadgeProps) {
  const levelColors = {
    bronze: 'bg-amber-100 text-amber-800 ring-amber-500',
    silver: 'bg-gray-100 text-gray-800 ring-gray-500',
    gold: 'bg-yellow-100 text-yellow-800 ring-yellow-500',
    platinum: 'bg-blue-100 text-blue-800 ring-blue-500'
  };

  return (
    <div className={cn(
      'relative flex items-center space-x-4 rounded-lg p-4',
      levelColors[level],
      className
    )}>
      <div className="flex-shrink-0">
        <div className={cn(
          'h-12 w-12 rounded-full ring-2 flex items-center justify-center',
          levelColors[level]
        )}>
          <Award className="h-6 w-6" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
        {typeof progress === 'number' && (
          <div className="mt-2">
            <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-current transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs opacity-90">{progress}% Complete</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { Avatar } from './Avatar';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar?: string;
    points: number;
    trend?: 'up' | 'down' | 'stable';
  };
}

interface LeaderboardCardProps {
  title: string;
  entries: LeaderboardEntry[];
  className?: string;
}

export function LeaderboardCard({ title, entries, className }: LeaderboardCardProps) {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800';
      case 2:
        return 'bg-gray-100 text-gray-800';
      case 3:
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-blue-50 text-blue-800';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-500 rotate-0';
      case 'down':
        return 'text-red-500 rotate-180';
      default:
        return 'text-gray-400 rotate-90';
    }
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold',
                getRankStyle(entry.rank)
              )}>
                {entry.rank}
              </div>
              <Avatar src={entry.user.avatar} size="sm" />
              <span className="font-medium text-gray-900">{entry.user.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-900">{entry.user.points}</span>
              {entry.user.trend && (
                <TrendingUp className={cn('h-4 w-4 transition-transform', getTrendColor(entry.user.trend))} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
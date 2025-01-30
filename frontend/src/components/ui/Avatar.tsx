import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn(
      'relative rounded-full overflow-hidden bg-gray-100',
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <User className="h-1/2 w-1/2 text-gray-400" />
        </div>
      )}
    </div>
  );
}
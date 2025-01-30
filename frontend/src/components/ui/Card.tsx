import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 bg-gray-50 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};
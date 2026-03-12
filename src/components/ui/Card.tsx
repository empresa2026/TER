import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => (
  <div className={cn('glass rounded-3xl p-8', className)} onClick={onClick}>
    {children}
  </div>
);

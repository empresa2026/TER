import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-gold text-black hover:bg-gold/90',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    outline: 'border border-gold/50 text-gold hover:bg-gold/10',
    ghost: 'text-white/60 hover:text-white hover:bg-white/5',
  };
  
  return (
    <button 
      className={cn(
        'px-6 py-3 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2', 
        variants[variant], 
        className
      )} 
      {...props} 
    />
  );
};

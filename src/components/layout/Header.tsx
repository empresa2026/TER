import React from 'react';
import { Crown, LogOut } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  profile: UserProfile | null;
  onLogout: () => void;
  onHome: () => void;
}

export function Header({ profile, onLogout, onHome }: HeaderProps) {
  return (
    <header className="p-6 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onHome}>
        <Crown className="w-8 h-8 text-gold" />
        <h1 className="text-2xl font-serif tracking-tight gold-text">The Ego Reset</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium">{profile?.displayName}</div>
          <div className="text-[10px] uppercase tracking-widest text-gold font-bold">
            {profile?.role === 'admin' ? 'Acesso Master' : 'Membro Premium'}
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

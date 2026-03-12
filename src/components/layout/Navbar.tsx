import React from 'react';
import { BookOpen, History, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  view: 'library' | 'admin' | 'quiz' | 'history';
  setView: (view: 'library' | 'admin' | 'quiz' | 'history') => void;
  isAdmin: boolean;
}

export function Navbar({ view, setView, isAdmin }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 p-4 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <button 
          onClick={() => setView('library')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'library' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Biblioteca</span>
        </button>
        
        <button 
          onClick={() => setView('history')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'history' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <History className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Histórico</span>
        </button>

        {isAdmin && (
          <button 
            onClick={() => setView('admin')}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              view === 'admin' ? "text-gold" : "text-white/20 hover:text-white/40"
            )}
          >
            <Plus className="w-6 h-6" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Gestão</span>
          </button>
        )}
      </div>
    </nav>
  );
}

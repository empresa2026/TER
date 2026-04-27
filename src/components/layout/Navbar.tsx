import React from 'react';
import { BookOpen, History, Plus, LayoutGrid, Crown, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  view: 'library' | 'admin' | 'quiz' | 'history' | 'matrices' | 'plan' | 'protocols';
  setView: (view: 'library' | 'admin' | 'quiz' | 'history' | 'matrices' | 'plan' | 'protocols') => void;
  isAdmin: boolean;
}

export function Navbar({ view, setView, isAdmin }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 p-4 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <button 
          onClick={() => setView('plan')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'plan' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <Crown className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Plano</span>
        </button>

        <button 
          onClick={() => setView('library')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'library' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">IA</span>
        </button>

        <button 
          onClick={() => setView('matrices')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'matrices' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Checkpoint</span>
        </button>

        <button 
          onClick={() => setView('protocols')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'protocols' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <ShieldAlert className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Processos</span>
        </button>
        
        <button 
          onClick={() => setView('history')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            view === 'history' ? "text-gold" : "text-white/20 hover:text-white/40"
          )}
        >
          <History className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Raio-X</span>
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

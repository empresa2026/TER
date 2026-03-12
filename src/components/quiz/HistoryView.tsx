import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Quiz, UserResult } from '../../types';
import { Card } from '../ui/Card';

interface HistoryViewProps {
  history: UserResult[];
  quizzes: Quiz[];
  onBack: () => void;
}

export function HistoryView({ history, quizzes, onBack }: HistoryViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="py-8"
    >
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-4xl font-serif">Seu Histórico</h2>
      </div>

      <div className="space-y-4">
        {history.map((result) => {
          const quiz = quizzes.find(q => q.id === result.quizId);
          if (!quiz) return null;

          return (
            <Card key={result.id} className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif mb-1">{quiz.title}</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gold uppercase font-bold tracking-widest">Protocolo Realizado</div>
              </div>
            </Card>
          );
        })}
        {history.length === 0 && (
          <div className="text-center py-20 text-white/20">
            Nenhum resultado encontrado. Comece seu primeiro quiz!
          </div>
        )}
      </div>
    </motion.div>
  );
}
